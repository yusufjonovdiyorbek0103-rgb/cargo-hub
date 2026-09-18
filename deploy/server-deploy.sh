#!/usr/bin/env bash
set -euo pipefail

###############################################################################
# CAJAIDT Server Deploy Script
# Run on the target server. Expects env vars: DEPLOY_BRANCH, DEPLOY_REPO
# Falls back to defaults if not set.
###############################################################################

DEPLOY_DIR="/var/www/diyor"
BRANCH="${DEPLOY_BRANCH:-claude/exciting-dijkstra-1eiifi}"
REPO="${DEPLOY_REPO:-https://github.com/yusufjonovdiyorbek0103-rgb/cargo-hub.git}"

echo "============================================"
echo " CAJAIDT Deploy: $BRANCH"
echo "============================================"

# ── Ensure directory structure ──
sudo mkdir -p "$DEPLOY_DIR"/{backend,frontend,logs,media,static,source}
sudo chown -R "$USER:$USER" "$DEPLOY_DIR"

# ── Clone or update ──
if [ ! -d "$DEPLOY_DIR/source/.git" ]; then
  echo "[1/7] Cloning repository..."
  git clone -b "$BRANCH" "$REPO" "$DEPLOY_DIR/source"
else
  echo "[1/7] Updating repository..."
  cd "$DEPLOY_DIR/source"
  git fetch origin "$BRANCH"
  git checkout "$BRANCH"
  git reset --hard "origin/$BRANCH"
fi

# ── System dependencies ──
echo "[2/7] Checking system dependencies..."
NEED_APT=false

if ! command -v python3 &>/dev/null; then NEED_APT=true; fi
if ! command -v nginx &>/dev/null; then NEED_APT=true; fi
if ! command -v node &>/dev/null; then NEED_APT=true; fi

if $NEED_APT; then
  echo "  Installing missing packages..."
  sudo apt-get update -qq

  if ! command -v python3 &>/dev/null; then
    sudo apt-get install -y -qq python3 python3-venv python3-pip python3-dev build-essential libpq-dev
  fi

  if ! command -v nginx &>/dev/null; then
    sudo apt-get install -y -qq nginx
  fi

  if ! command -v node &>/dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
    sudo apt-get install -y -qq nodejs
  fi
fi

echo "  Python: $(python3 --version)"
echo "  Node:   $(node --version 2>/dev/null || echo 'not found')"
echo "  Nginx:  $(nginx -v 2>&1 || echo 'not found')"

# ── Backend ──
echo "[3/7] Setting up backend..."
rsync -a --delete \
  --exclude='venv' \
  --exclude='__pycache__' \
  --exclude='.env' \
  --exclude='db.sqlite3' \
  "$DEPLOY_DIR/source/backend/" "$DEPLOY_DIR/backend/"

if [ ! -d "$DEPLOY_DIR/backend/venv" ]; then
  python3 -m venv "$DEPLOY_DIR/backend/venv"
fi

"$DEPLOY_DIR/backend/venv/bin/pip" install -q --upgrade pip
"$DEPLOY_DIR/backend/venv/bin/pip" install -q -r "$DEPLOY_DIR/backend/requirements.txt"
"$DEPLOY_DIR/backend/venv/bin/pip" install -q gunicorn psycopg2-binary whitenoise

# ── .env (only created once) ──
if [ ! -f "$DEPLOY_DIR/.env" ]; then
  echo "[4/7] Generating .env..."
  SK=$(openssl rand -base64 50 | tr -d '/+=' | head -c 50)
  cat > "$DEPLOY_DIR/.env" <<EOF
SECRET_KEY=$SK
DEBUG=False
DJANGO_SETTINGS_MODULE=ejournal.settings.prod
DATABASE_URL=sqlite:///$DEPLOY_DIR/backend/db.sqlite3
ALLOWED_HOSTS=*
CSRF_TRUSTED_ORIGINS=http://65.108.123.199,https://65.108.123.199
CORS_ALLOWED_ORIGINS=
FRONTEND_URL=http://65.108.123.199
SECURE_SSL_REDIRECT=False
EMAIL_BACKEND=django.core.mail.backends.console.EmailBackend
MEDIA_ROOT=$DEPLOY_DIR/media
EOF
  chmod 600 "$DEPLOY_DIR/.env"
else
  echo "[4/7] .env exists, keeping it"
fi

ln -sf "$DEPLOY_DIR/.env" "$DEPLOY_DIR/backend/.env"

# ── Migrate & collectstatic ──
echo "[5/7] Running migrations..."
cd "$DEPLOY_DIR/backend"
"$DEPLOY_DIR/backend/venv/bin/python" manage.py migrate --noinput
"$DEPLOY_DIR/backend/venv/bin/python" manage.py collectstatic --noinput --clear 2>/dev/null || true

if [ -d "$DEPLOY_DIR/backend/staticfiles" ]; then
  rsync -a "$DEPLOY_DIR/backend/staticfiles/" "$DEPLOY_DIR/static/"
fi

# ── Frontend ──
echo "[6/7] Building frontend..."
cd "$DEPLOY_DIR/source"
npm install --silent 2>/dev/null
npm run build
rsync -a --delete "$DEPLOY_DIR/source/dist/" "$DEPLOY_DIR/frontend/"

# ── Nginx config ──
echo "[7/7] Configuring Nginx & Gunicorn..."

cat > /tmp/cajaidt-nginx.conf <<'NGINXCONF'
server {
    listen 80 default_server;
    server_name _;
    client_max_body_size 50M;

    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;

    location /static/ {
        alias /var/www/diyor/static/;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    location /media/ {
        alias /var/www/diyor/media/;
        expires 7d;
    }

    location /admin/ {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /api/ {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 120s;
    }

    location /assets/ {
        alias /var/www/diyor/frontend/assets/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location / {
        root /var/www/diyor/frontend;
        try_files $uri $uri/ /index.html;
    }
}
NGINXCONF

sudo cp /tmp/cajaidt-nginx.conf /etc/nginx/sites-available/cajaidt
sudo ln -sf /etc/nginx/sites-available/cajaidt /etc/nginx/sites-enabled/cajaidt
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx

# ── Gunicorn systemd service ──
cat > /tmp/cajaidt.service <<EOF
[Unit]
Description=CAJAIDT Gunicorn
After=network.target

[Service]
User=$USER
WorkingDirectory=$DEPLOY_DIR/backend
EnvironmentFile=$DEPLOY_DIR/.env
ExecStart=$DEPLOY_DIR/backend/venv/bin/gunicorn ejournal.wsgi:application --bind 127.0.0.1:8000 --workers 3 --timeout 120 --access-logfile $DEPLOY_DIR/logs/access.log --error-logfile $DEPLOY_DIR/logs/error.log
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
EOF

sudo cp /tmp/cajaidt.service /etc/systemd/system/cajaidt.service
sudo systemctl daemon-reload
sudo systemctl enable cajaidt
sudo systemctl restart cajaidt

# ── Done ──
echo ""
echo "============================================"
echo " Deployment complete!"
echo "============================================"
echo " Site: http://65.108.123.199"
echo ""
echo " Gunicorn: sudo systemctl status cajaidt"
echo " Nginx:    sudo systemctl status nginx"
echo " Logs:     tail -f $DEPLOY_DIR/logs/error.log"
echo ""
echo " Create admin:"
echo "   cd $DEPLOY_DIR/backend"
echo "   ./venv/bin/python manage.py createsuperuser"
echo "============================================"
