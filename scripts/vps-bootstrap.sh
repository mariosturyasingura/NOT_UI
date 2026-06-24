#!/bin/bash
# One-time N.O.T VPS bootstrap. Run on Linode as:
#   sudo bash scripts/vps-bootstrap.sh

set -euo pipefail

if [ "$(id -u)" -ne 0 ]; then
  echo "Run with sudo: sudo bash $0"
  exit 1
fi

DEPLOY_USER="${DEPLOY_USER:-deploy}"
BASE="/var/www/N.O.T"
DOMAIN="${DOMAIN:-neworigin.tech}"
VPS_IP="$(ip -4 addr show scope global | awk '/inet / {print $2}' | head -n1 | cut -d/ -f1)"

echo "==> Creating directory layout under ${BASE}"
mkdir -p "${BASE}/NOT_UI"
mkdir -p "${BASE}/deployments/locks"
chown -R "${DEPLOY_USER}:${DEPLOY_USER}" "${BASE}"

echo ""
echo "✅ Bootstrap complete."
echo "   App dir: ${BASE}/NOT_UI"
echo "   Deploy user: ${DEPLOY_USER}"
echo "   VPS IP: ${VPS_IP}"
echo ""
echo "Next steps:"
echo "  1. Point DNS for ${DOMAIN} (and www) at ${VPS_IP}"
echo "  2. Re-run the GitHub Actions deploy workflow"
echo "  3. After deploy: sudo certbot certonly --nginx -d ${DOMAIN} -d www.${DOMAIN}"
echo "  4. sudo bash ${BASE}/NOT_UI/scripts/install-nginx.sh"
