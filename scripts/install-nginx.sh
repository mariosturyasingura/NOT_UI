#!/bin/bash
# Install N.O.T nginx on VPS. Run:
#   sudo bash scripts/install-nginx.sh
# Or with a custom conf path:
#   sudo bash scripts/install-nginx.sh /tmp/neworigin.conf

set -euo pipefail
[ "$(id -u)" -eq 0 ] || { echo "Run with sudo"; exit 1; }

_script_dir="$(cd "$(dirname "${BASH_SOURCE[0]:-$0}")" && pwd)"
CONF="${1:-${_script_dir}/../nginx/neworigin.conf}"
[ -f "$CONF" ] || { echo "Missing $CONF"; exit 1; }

cp "$CONF" /etc/nginx/sites-available/not-ui
ln -sf /etc/nginx/sites-available/not-ui /etc/nginx/sites-enabled/not-ui
nginx -t
systemctl reload nginx
echo "✅ N.O.T nginx active — https://neworigin.tech"
