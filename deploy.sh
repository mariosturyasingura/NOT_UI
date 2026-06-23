#!/bin/bash
# deploy.sh - production container deployment

set -euo pipefail

_script_dir="$(cd "$(dirname "${BASH_SOURCE[0]:-$0}")" && pwd)"
APP_DIR="${APP_DIR:-$_script_dir}"
COMPOSE_FILE="${COMPOSE_FILE:-deploy/docker-compose.yml}"
COMPOSE_PROJECT="${COMPOSE_PROJECT:-not-ui}"
IMAGE_TAG="${IMAGE_TAG:?set IMAGE_TAG to the Git commit SHA (GHCR tag). See deploy/DEPLOY_AUTOMATION.md}"
UI_IMAGE_REPO="${UI_IMAGE_REPO:-not-ui}"
UI_HOST_PORT="${UI_HOST_PORT:-8083}"
DEPLOY_INFO_FILE="${DEPLOY_INFO_FILE:-/var/www/N.O.T/deployments/ui-deploy-info.txt}"

cd "$APP_DIR"

LOCK_FILE="${DEPLOY_LOCK_FILE:-/var/www/N.O.T/deployments/locks/not-ui.deploy.lock}"
mkdir -p "$(dirname "$LOCK_FILE")"
exec 9>"$LOCK_FILE"
if ! flock -n 9; then
    echo "❌ Another N.O.T UI deploy is in progress (lock: ${LOCK_FILE})."
    exit 1
fi

if ! command -v docker >/dev/null 2>&1; then
    echo "❌ docker is required on the server"
    exit 1
fi

if ! docker compose version >/dev/null 2>&1; then
    echo "❌ docker compose is required on the server"
    exit 1
fi

if [ ! -f "$COMPOSE_FILE" ]; then
    echo "❌ Missing compose file: $COMPOSE_FILE"
    exit 1
fi

echo "🚀 Deploying UI image ${UI_IMAGE_REPO}:${IMAGE_TAG}"
PREVIOUS_IMAGE="$(docker ps --filter "name=not-ui" --format '{{.Image}}' | head -n 1 || true)"
export IMAGE_TAG UI_IMAGE_REPO UI_HOST_PORT
if [ "${SKIP_COMPOSE_PULL:-0}" != "1" ]; then
    docker compose -p "$COMPOSE_PROJECT" -f "$COMPOSE_FILE" pull
else
    echo "⏭️ Skipping compose pull (image loaded by CI via docker load)"
fi

docker rm -f not-ui 2>/dev/null || true

docker compose -p "$COMPOSE_PROJECT" -f "$COMPOSE_FILE" up -d --remove-orphans

echo "🌐 Verifying containerized UI on localhost:${UI_HOST_PORT}..."
_HEALTH_URL="http://127.0.0.1:${UI_HOST_PORT}/"
_MAX_ATT="${DEPLOY_HEALTH_MAX_ATTEMPTS:-45}"
HTTP_STATUS=""
for ((_attempt = 1; _attempt <= _MAX_ATT; _attempt++)); do
    HTTP_STATUS="$(curl -sS --connect-timeout 2 -o /dev/null -w "%{http_code}" "${_HEALTH_URL}" 2>/dev/null || printf '000')"
    if [ "$HTTP_STATUS" = "200" ]; then
        [ "$_attempt" -gt 1 ] && echo "✅ UI OK after ${_attempt}s"
        break
    fi
    sleep 1
done
if [ "$HTTP_STATUS" != "200" ]; then
    echo "❌ UI health check failed on port ${UI_HOST_PORT} after ${_MAX_ATT}s (last status=${HTTP_STATUS})"
    exit 1
fi

mkdir -p "$(dirname "$DEPLOY_INFO_FILE")"
{
    echo "service=ui"
    echo "environment=production"
    echo "previous_image=${PREVIOUS_IMAGE:-none}"
    echo "image=${UI_IMAGE_REPO}:${IMAGE_TAG}"
    echo "deployed_at_utc=$(date -u +"%Y-%m-%dT%H:%M:%SZ")"
} > "$DEPLOY_INFO_FILE"

echo "✅ UI deployment complete"
