#!/usr/bin/env bash
set -euo pipefail

###############################################################################
# CAJAIDT Update Script
# Pulls latest changes and redeploys
#
# Usage: sudo /var/www/diyor/deploy-update.sh
###############################################################################

DEPLOY_DIR="/var/www/diyor"
BRANCH="claude/exciting-dijkstra-1eiifi"
APP_USER="diyorbek"

echo "Updating CAJAIDT..."

# Pull latest code
cd "$DEPLOY_DIR/source"
git fetch origin "$BRANCH"
git checkout "$BRANCH"
git pull origin "$BRANCH"

# Update backend
echo "Updating backend..."
rsync -a --delete --exclude='venv' "$DEPLOY_DIR/source/backend/" "$DEPLOY_DIR/backend/"
ln -sf "$DEPLOY_DIR/.env" "$DEPLOY_DIR/backend/.env"
"$DEPLOY_DIR/backend/venv/bin/pip" install -r "$DEPLOY_DIR/backend/requirements.txt" -q
cd "$DEPLOY_DIR/backend"
"$DEPLOY_DIR/backend/venv/bin/python" manage.py migrate --noinput
"$DEPLOY_DIR/backend/venv/bin/python" manage.py collectstatic --noinput --clear
rsync -a "$DEPLOY_DIR/backend/staticfiles/" "$DEPLOY_DIR/static/"

# Rebuild frontend
echo "Rebuilding frontend..."
cd "$DEPLOY_DIR/source"
npm install --silent
npm run build
rsync -a --delete "$DEPLOY_DIR/source/dist/" "$DEPLOY_DIR/frontend/"

# Fix permissions
chown -R "$APP_USER:$APP_USER" "$DEPLOY_DIR"

# Restart services
systemctl restart cajaidt
systemctl reload nginx

echo "Update complete!"
