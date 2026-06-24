# N.O.T UI — Deployment automation

Production-only deploy: **GitHub Actions → GHCR → SSH → Docker Compose on VPS**.

**Same VPS as MyHotel** (`172.232.102.130`, user `deploy`). Reuse the MyHotel deploy key (`~/me/MyHotel/myhotel_deploy_ci_ed25519`) for local SSH and the same `SSH_PRIVATE_KEY_PRODUCTION` / `SSH_HOST_PRODUCTION` GitHub secrets as MyHotel.

Unlike MyHotel (Vite static + nginx), this app is **Next.js** and runs `node server.js` inside the container on port **3000**.

## Server layout

```
/var/www/N.O.T/
├── NOT_UI/               ← REMOTE_APP_DIR_UI
│   ├── deploy/
│   │   └── docker-compose.yml
│   └── deploy.sh
└── deployments/
    └── ui-deploy-info.txt
```

## GitHub secrets

| Secret | Value |
|--------|-------|
| `SSH_HOST_PRODUCTION` | `172.232.102.130` (same as MyHotel) |
| `SSH_USER_PRODUCTION` | `deploy` |
| `SSH_PRIVATE_KEY_PRODUCTION` | Same ed25519 key as MyHotel (`myhotel_deploy_ci_ed25519`) |
| `REMOTE_APP_DIR_UI` | `/var/www/N.O.T/NOT_UI` |
| `GHCR_PULL_USERNAME` | GitHub username (optional for CI) |
| `GHCR_PULL_TOKEN` | PAT with `read:packages` (optional for CI) |

Deploy triggers on push to `main` or `master` only.

## Port (localhost only — host nginx is public entry)

| Service | Port |
|---------|------|
| N.O.T UI | `127.0.0.1:8083` |

Host nginx must **proxy** `/` to this port. MyHotel uses `8081`/`8082`, so N.O.T uses `8083`.

Domain: **neworigin.tech** (and `www.neworigin.tech`). Install nginx with `scripts/install-nginx.sh` after DNS points at the VPS and certbot has issued a cert for `neworigin.tech`.

## Local container test

```bash
docker build -t not-ui:local .
docker run --rm -p 3000:3000 not-ui:local
# open http://localhost:3000
```

## Manual deploy on VPS

```bash
cd /var/www/N.O.T/NOT_UI
IMAGE_TAG=<git-sha> UI_IMAGE_REPO=ghcr.io/mariosturyasingura/not-ui ./deploy.sh
```

## Before VPS is ready

Push to GitHub is fine; deploy steps fail until secrets and VPS directories exist. Use a feature branch to avoid triggering deploy until the server is ready.
