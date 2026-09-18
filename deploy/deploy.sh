#!/usr/bin/env bash
set -euo pipefail

###############################################################################
# CAJAIDT Deployment Script
# Deploys frontend + backend to /var/www/diyor on Ubuntu/Debian
#
# Usage:
#   chmod +x deploy.sh
#   sudo ./deploy.sh
#
# Prerequisites: Git, Python 3.10+, Node.js 18+, Nginx, PostgreSQL
###############################################################################

DEPLOY_DIR="/var/www/diyor"
REPO_URL="https://github.com/yusufjonovdiyorbek0103-rgb/cargo-hub.git"
BRANCH="claude/exciting-dijkstra-1eiifi"
DOMAIN="cajaidt.org"  # Change this to your actual domain
APP_USER="diyorbek"

echo "============================================"
echo " CAJAIDT Deployment"
echo "============================================"

# ─── 1. Install system dependencies ──────────────────────────────────────────

echo "[1/9] Installing system dependencies..."
apt-get update -qq
apt-get install -y -qq \
  python3 python3-venv python3-pip python3-dev \
  nodejs npm \
  nginx \
  postgresql postgresql-contrib libpq-dev \
  git curl certbot python3-certbot-nginx \
  build-essential

# Check versions
echo "  Python: $(python3 --version)"
echo "  Node:   $(node --version)"
echo "  npm:    $(npm --version)"
echo "  Nginx:  $(nginx -v 2>&1)"

# ─── 2. Create directory structure ───────────────────────────────────────────

echo "[2/9] Setting up directory structure..."
mkdir -p "$DEPLOY_DIR"
cd "$DEPLOY_DIR"

# Clone or update repo
if [ -d "$DEPLOY_DIR/source" ]; then
  echo "  Updating existing source..."
  cd "$DEPLOY_DIR/source"
  git fetch origin "$BRANCH"
  git checkout "$BRANCH"
  git pull origin "$BRANCH"
else
  echo "  Cloning repository..."
  git clone -b "$BRANCH" "$REPO_URL" "$DEPLOY_DIR/source"
fi

# Create separate directories for frontend and backend
mkdir -p "$DEPLOY_DIR/backend"
mkdir -p "$DEPLOY_DIR/frontend"
mkdir -p "$DEPLOY_DIR/logs"
mkdir -p "$DEPLOY_DIR/media"
mkdir -p "$DEPLOY_DIR/static"

# ─── 3. Set up PostgreSQL database ──────────────────────────────────────────

echo "[3/9] Setting up PostgreSQL database..."

DB_NAME="cajaidt"
DB_USER="cajaidt"
DB_PASS="$(openssl rand -base64 24 | tr -d '/+=' | head -c 32)"

# Check if database already exists
if sudo -u postgres psql -lqt | cut -d \| -f 1 | grep -qw "$DB_NAME"; then
  echo "  Database '$DB_NAME' already exists, skipping creation."
  echo "  NOTE: Using existing database. If you need the password, check $DEPLOY_DIR/.env"
else
  sudo -u postgres psql -c "CREATE USER $DB_USER WITH PASSWORD '$DB_PASS';" 2>/dev/null || true
  sudo -u postgres psql -c "CREATE DATABASE $DB_NAME OWNER $DB_USER;" 2>/dev/null || true
  sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $DB_USER;"
  echo "  Database created: $DB_NAME"
fi

# ─── 4. Set up backend ──────────────────────────────────────────────────────

echo "[4/9] Setting up backend..."
cd "$DEPLOY_DIR"

# Copy backend files
rsync -a --delete "$DEPLOY_DIR/source/backend/" "$DEPLOY_DIR/backend/"

# Create virtual environment
if [ ! -d "$DEPLOY_DIR/backend/venv" ]; then
  python3 -m venv "$DEPLOY_DIR/backend/venv"
fi

# Install Python dependencies
"$DEPLOY_DIR/backend/venv/bin/pip" install --upgrade pip -q
"$DEPLOY_DIR/backend/venv/bin/pip" install -r "$DEPLOY_DIR/backend/requirements.txt" -q
"$DEPLOY_DIR/backend/venv/bin/pip" install gunicorn psycopg2-binary -q

# Generate a secure secret key if .env doesn't exist
if [ ! -f "$DEPLOY_DIR/.env" ]; then
  SECRET_KEY="$(openssl rand -base64 50 | tr -d '/+=' | head -c 50)"
  cat > "$DEPLOY_DIR/.env" <<ENVEOF
# CAJAIDT Environment Configuration
# Generated on $(date -u +"%Y-%m-%d %H:%M:%S UTC")

SECRET_KEY=$SECRET_KEY
DEBUG=False
DJANGO_SETTINGS_MODULE=ejournal.settings.prod

# Database
DATABASE_URL=postgres://$DB_USER:$DB_PASS@localhost:5432/$DB_NAME

# Hosts & Security
ALLOWED_HOSTS=$DOMAIN,www.$DOMAIN,65.108.123.199,localhost
CSRF_TRUSTED_ORIGINS=https://$DOMAIN,https://www.$DOMAIN
CORS_ALLOWED_ORIGINS=https://$DOMAIN,https://www.$DOMAIN
FRONTEND_URL=https://$DOMAIN
SECURE_SSL_REDIRECT=False

# Email (console for now — switch to SMTP/API for production email)
EMAIL_BACKEND=django.core.mail.backends.console.EmailBackend

# Media files
MEDIA_ROOT=$DEPLOY_DIR/media
ENVEOF
  echo "  Created .env with secure secret key"
else
  echo "  .env already exists, keeping existing configuration"
fi

# Symlink .env into the backend directory
ln -sf "$DEPLOY_DIR/.env" "$DEPLOY_DIR/backend/.env"

# Run migrations and collect static files
cd "$DEPLOY_DIR/backend"
"$DEPLOY_DIR/backend/venv/bin/python" manage.py migrate --noinput
"$DEPLOY_DIR/backend/venv/bin/python" manage.py collectstatic --noinput --clear

# Move static files to the shared static directory
rsync -a "$DEPLOY_DIR/backend/staticfiles/" "$DEPLOY_DIR/static/"

echo "  Backend setup complete"

# ─── 5. Build frontend ──────────────────────────────────────────────────────

echo "[5/9] Building frontend..."
cd "$DEPLOY_DIR/source"

# Install Node dependencies and build
npm install --silent
npm run build

# Copy built frontend to the frontend directory
rsync -a --delete "$DEPLOY_DIR/source/dist/" "$DEPLOY_DIR/frontend/"

echo "  Frontend build complete"

# ─── 6. Set file permissions ────────────────────────────────────────────────

echo "[6/9] Setting file permissions..."
chown -R "$APP_USER:$APP_USER" "$DEPLOY_DIR"
chmod -R 755 "$DEPLOY_DIR"
chmod 600 "$DEPLOY_DIR/.env"
chown "$APP_USER:$APP_USER" "$DEPLOY_DIR/.env"

# ─── 7. Create systemd service for Gunicorn ──────────────────────────────────

echo "[7/9] Creating systemd service..."

cat > /etc/systemd/system/cajaidt.service <<SERVICEEOF
[Unit]
Description=CAJAIDT Django Backend (Gunicorn)
After=network.target postgresql.service
Wants=postgresql.service

[Service]
User=$APP_USER
Group=$APP_USER
WorkingDirectory=$DEPLOY_DIR/backend
EnvironmentFile=$DEPLOY_DIR/.env
ExecStart=$DEPLOY_DIR/backend/venv/bin/gunicorn \
    ejournal.wsgi:application \
    --bind 127.0.0.1:8000 \
    --workers 3 \
    --timeout 120 \
    --access-logfile $DEPLOY_DIR/logs/gunicorn-access.log \
    --error-logfile $DEPLOY_DIR/logs/gunicorn-error.log
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
SERVICEEOF

systemctl daemon-reload
systemctl enable cajaidt
systemctl restart cajaidt

echo "  Gunicorn service created and started"

# ─── 8. Configure Nginx ─────────────────────────────────────────────────────

echo "[8/9] Configuring Nginx..."

cat > /etc/nginx/sites-available/cajaidt <<NGINXEOF
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN 65.108.123.199;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Max upload size (for manuscript submissions)
    client_max_body_size 50M;

    # Django static files
    location /static/ {
        alias $DEPLOY_DIR/static/;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    # Django media files (uploaded manuscripts, etc.)
    location /media/ {
        alias $DEPLOY_DIR/media/;
        expires 7d;
    }

    # Django admin
    location /admin/ {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }

    # API endpoints
    location /api/ {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_read_timeout 120s;
    }

    # Frontend static assets (JS, CSS, images with hashed names)
    location /assets/ {
        alias $DEPLOY_DIR/frontend/assets/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Frontend SPA — serve index.html for all other routes
    location / {
        root $DEPLOY_DIR/frontend;
        try_files \$uri \$uri/ /index.html;
    }
}
NGINXEOF

# Enable the site
ln -sf /etc/nginx/sites-available/cajaidt /etc/nginx/sites-enabled/cajaidt

# Remove default site if it exists
rm -f /etc/nginx/sites-enabled/default

# Test and reload Nginx
nginx -t
systemctl reload nginx

echo "  Nginx configured and reloaded"

# ─── 9. Summary ─────────────────────────────────────────────────────────────

echo ""
echo "============================================"
echo " Deployment Complete!"
echo "============================================"
echo ""
echo " Directory structure:"
echo "   $DEPLOY_DIR/"
echo "   ├── backend/     Django app + venv"
echo "   ├── frontend/    Built Vite SPA"
echo "   ├── static/      Django static files"
echo "   ├── media/       Uploaded files"
echo "   ├── logs/        Gunicorn logs"
echo "   ├── source/      Git repository"
echo "   └── .env         Environment config"
echo ""
echo " Services:"
echo "   - Gunicorn: systemctl status cajaidt"
echo "   - Nginx:    systemctl status nginx"
echo ""
echo " URLs:"
echo "   - http://$DOMAIN  (after DNS is pointed)"
echo "   - http://65.108.123.199"
echo ""
echo " Next steps:"
echo "   1. Point your domain DNS A record to 65.108.123.199"
echo "   2. Run: sudo certbot --nginx -d $DOMAIN -d www.$DOMAIN"
echo "      (for free HTTPS via Let's Encrypt)"
echo "   3. Update .env with real email settings when ready"
echo "   4. Create a superuser:"
echo "      cd $DEPLOY_DIR/backend"
echo "      ./venv/bin/python manage.py createsuperuser"
echo ""
echo " To update the deployment later:"
echo "   sudo $DEPLOY_DIR/deploy-update.sh"
echo ""
