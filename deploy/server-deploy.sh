#!/usr/bin/env bash
set -euo pipefail

###############################################################################
# CAJAIDT Server Deploy Script (NO ROOT REQUIRED)
# Deploys everything under /var/www/diyor using only user permissions.
# Nginx config must be set up separately by an admin, or we use Gunicorn
# directly on port 8000.
###############################################################################

DEPLOY_DIR="/var/www/diyor"
BRANCH="${DEPLOY_BRANCH:-claude/exciting-dijkstra-1eiifi}"
REPO="${DEPLOY_REPO:-https://github.com/yusufjonovdiyorbek0103-rgb/cargo-hub.git}"

echo "============================================"
echo " CAJAIDT Deploy (no-root): $BRANCH"
echo "============================================"

# ── Check if we can write to /var/www/diyor ──
if [ ! -d "$DEPLOY_DIR" ]; then
  echo "Creating $DEPLOY_DIR..."
  mkdir -p "$DEPLOY_DIR" 2>/dev/null || {
    echo "Cannot create $DEPLOY_DIR — trying home directory instead"
    DEPLOY_DIR="$HOME/diyor"
    mkdir -p "$DEPLOY_DIR"
    echo "Using: $DEPLOY_DIR"
  }
fi

if [ ! -w "$DEPLOY_DIR" ]; then
  echo "$DEPLOY_DIR is not writable — using home directory"
  DEPLOY_DIR="$HOME/diyor"
  mkdir -p "$DEPLOY_DIR"
  echo "Using: $DEPLOY_DIR"
fi

mkdir -p "$DEPLOY_DIR"/{backend,frontend,logs,media,static,source}

# ── Clone or update ──
if [ ! -d "$DEPLOY_DIR/source/.git" ]; then
  echo "[1/6] Cloning repository..."
  git clone -b "$BRANCH" "$REPO" "$DEPLOY_DIR/source"
else
  echo "[1/6] Updating repository..."
  cd "$DEPLOY_DIR/source"
  git fetch origin "$BRANCH"
  git checkout "$BRANCH"
  git reset --hard "origin/$BRANCH"
fi

# ── Check Python ──
PYTHON=""
for p in python3 python; do
  if command -v "$p" &>/dev/null; then
    PYTHON="$p"
    break
  fi
done
if [ -z "$PYTHON" ]; then
  echo "ERROR: Python 3 is not installed. Ask your server admin to install python3 python3-venv python3-pip"
  exit 1
fi
echo "  Python: $($PYTHON --version)"

# ── Check Node.js ──
if ! command -v node &>/dev/null; then
  echo "  Node.js not found. Installing via nvm (no root needed)..."
  export NVM_DIR="$HOME/.nvm"
  if [ ! -d "$NVM_DIR" ]; then
    curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
  fi
  [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
  nvm install 22
  nvm use 22
fi
echo "  Node: $(node --version)"
echo "  npm:  $(npm --version)"

# ── Backend ──
echo "[2/6] Setting up backend..."
rsync -a --delete \
  --exclude='venv' \
  --exclude='__pycache__' \
  --exclude='.env' \
  --exclude='db.sqlite3' \
  "$DEPLOY_DIR/source/backend/" "$DEPLOY_DIR/backend/"

if [ ! -d "$DEPLOY_DIR/backend/venv" ]; then
  $PYTHON -m venv "$DEPLOY_DIR/backend/venv"
fi

"$DEPLOY_DIR/backend/venv/bin/pip" install -q --upgrade pip
"$DEPLOY_DIR/backend/venv/bin/pip" install -q -r "$DEPLOY_DIR/backend/requirements.txt"
"$DEPLOY_DIR/backend/venv/bin/pip" install -q gunicorn whitenoise

# ── .env (only created once) ──
if [ ! -f "$DEPLOY_DIR/.env" ]; then
  echo "[3/6] Generating .env..."
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
SERVE_FRONTEND=True
EMAIL_BACKEND=django.core.mail.backends.console.EmailBackend
MEDIA_ROOT=$DEPLOY_DIR/media
EOF
  chmod 600 "$DEPLOY_DIR/.env"
else
  echo "[3/6] .env exists, keeping it"
fi

ln -sf "$DEPLOY_DIR/.env" "$DEPLOY_DIR/backend/.env"

# ── Migrate & static ──
echo "[4/6] Running migrations..."
cd "$DEPLOY_DIR/backend"
set -a; source "$DEPLOY_DIR/.env"; set +a
"$DEPLOY_DIR/backend/venv/bin/python" manage.py migrate --noinput
"$DEPLOY_DIR/backend/venv/bin/python" manage.py collectstatic --noinput --clear 2>/dev/null || true

# ── Frontend ──
echo "[5/6] Building frontend..."
# Make sure nvm is loaded if we installed it
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" 2>/dev/null || true

cd "$DEPLOY_DIR/source"
npm install --silent 2>/dev/null
npm run build
rsync -a --delete "$DEPLOY_DIR/source/dist/" "$DEPLOY_DIR/frontend/"

# Also copy dist to where Django can serve it (SERVE_FRONTEND=True)
rsync -a --delete "$DEPLOY_DIR/source/dist/" "$DEPLOY_DIR/backend/../dist/" 2>/dev/null || true
# The FRONTEND_DIST_DIR in base.py is BASE_DIR.parent / "dist"
# BASE_DIR = backend/, so parent = project root. We need dist next to backend/
mkdir -p "$(dirname "$DEPLOY_DIR/backend")/dist"
rsync -a --delete "$DEPLOY_DIR/source/dist/" "$(dirname "$DEPLOY_DIR/backend")/dist/" 2>/dev/null || true

# ── Start Gunicorn ──
echo "[6/6] Starting Gunicorn..."

# Kill any existing Gunicorn for this project
pkill -f "gunicorn.*ejournal" 2>/dev/null || true
sleep 1

# Start Gunicorn in background on port 8000
cd "$DEPLOY_DIR/backend"
nohup "$DEPLOY_DIR/backend/venv/bin/gunicorn" \
  ejournal.wsgi:application \
  --bind 0.0.0.0:8000 \
  --workers 3 \
  --timeout 120 \
  --access-logfile "$DEPLOY_DIR/logs/access.log" \
  --error-logfile "$DEPLOY_DIR/logs/error.log" \
  --pid "$DEPLOY_DIR/gunicorn.pid" \
  --daemon

sleep 2

if [ -f "$DEPLOY_DIR/gunicorn.pid" ] && kill -0 "$(cat "$DEPLOY_DIR/gunicorn.pid")" 2>/dev/null; then
  echo "  Gunicorn started (PID: $(cat "$DEPLOY_DIR/gunicorn.pid"))"
else
  echo "  WARNING: Gunicorn may not have started. Check logs:"
  echo "  tail -f $DEPLOY_DIR/logs/error.log"
fi

# ── Create helper scripts ──
cat > "$DEPLOY_DIR/start.sh" <<'STARTEOF'
#!/usr/bin/env bash
cd "$(dirname "$0")/backend"
set -a; source "$(dirname "$0")/.env"; set +a
pkill -f "gunicorn.*ejournal" 2>/dev/null || true
sleep 1
"$(dirname "$0")/backend/venv/bin/gunicorn" \
  ejournal.wsgi:application \
  --bind 0.0.0.0:8000 \
  --workers 3 \
  --timeout 120 \
  --access-logfile "$(dirname "$0")/logs/access.log" \
  --error-logfile "$(dirname "$0")/logs/error.log" \
  --pid "$(dirname "$0")/gunicorn.pid" \
  --daemon
echo "Gunicorn started on port 8000"
STARTEOF
chmod +x "$DEPLOY_DIR/start.sh"

cat > "$DEPLOY_DIR/stop.sh" <<'STOPEOF'
#!/usr/bin/env bash
pkill -f "gunicorn.*ejournal" 2>/dev/null && echo "Gunicorn stopped" || echo "Gunicorn was not running"
STOPEOF
chmod +x "$DEPLOY_DIR/stop.sh"

cat > "$DEPLOY_DIR/status.sh" <<'STATUSEOF'
#!/usr/bin/env bash
if pgrep -f "gunicorn.*ejournal" > /dev/null; then
  echo "Gunicorn is RUNNING (PIDs: $(pgrep -f 'gunicorn.*ejournal' | tr '\n' ' '))"
else
  echo "Gunicorn is STOPPED"
fi
echo "Logs: tail -f $(dirname "$0")/logs/error.log"
STATUSEOF
chmod +x "$DEPLOY_DIR/status.sh"

# ── Done ──
echo ""
echo "============================================"
echo " Deployment complete!"
echo "============================================"
echo ""
echo " Directory: $DEPLOY_DIR"
echo ""
echo " Site URL: http://65.108.123.199:8000"
echo ""
echo " Helper commands:"
echo "   $DEPLOY_DIR/start.sh    - Start Gunicorn"
echo "   $DEPLOY_DIR/stop.sh     - Stop Gunicorn"
echo "   $DEPLOY_DIR/status.sh   - Check status"
echo ""
echo " Logs:  tail -f $DEPLOY_DIR/logs/error.log"
echo ""
echo " Create admin user:"
echo "   cd $DEPLOY_DIR/backend"
echo "   source ../. env"
echo "   ./venv/bin/python manage.py createsuperuser"
echo ""
echo " NOTE: Site runs on port 8000 (no root = no port 80)."
echo " Ask your server admin to set up Nginx to proxy"
echo " port 80 -> 8000, or access via :8000 directly."
echo "============================================"
