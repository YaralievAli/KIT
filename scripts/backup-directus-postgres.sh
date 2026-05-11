#!/usr/bin/env bash
set -euo pipefail

PATH="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
export PATH

APP_DIR="/var/www/kit"
BACKUP_DIR="$APP_DIR/backups"
LOG_FILE="$BACKUP_DIR/backup.log"
COMPOSE_FILE="$APP_DIR/docker-compose.directus.prod.yml"
ENV_FILE="$APP_DIR/.env.directus"
TIMESTAMP="$(date -u +%Y%m%dT%H%M%SZ)"
BACKUP_FILE="$BACKUP_DIR/directus-postgres-$TIMESTAMP.dump"
RETENTION_DAYS=14

mkdir -p "$BACKUP_DIR"
chmod 700 "$BACKUP_DIR"

{
  echo "[$(date -u +%Y-%m-%dT%H:%M:%SZ)] backup started: $BACKUP_FILE"

  cd "$APP_DIR"

  docker compose --env-file "$ENV_FILE" -f "$COMPOSE_FILE" exec -T postgres \
    pg_dump -U directus -d directus -Fc --no-owner --no-acl \
    > "$BACKUP_FILE"

  chmod 600 "$BACKUP_FILE"

  test -s "$BACKUP_FILE"

  docker compose --env-file "$ENV_FILE" -f "$COMPOSE_FILE" exec -T postgres \
    pg_restore --list < "$BACKUP_FILE" > /dev/null

  find "$BACKUP_DIR" \
    -maxdepth 1 \
    -type f \
    -name 'directus-postgres-*.dump' \
    -mtime +"$RETENTION_DAYS" \
    -print \
    -delete

  echo "[$(date -u +%Y-%m-%dT%H:%M:%SZ)] backup ok: $(ls -lh "$BACKUP_FILE" | awk '{print $5, $9}')"
} >> "$LOG_FILE" 2>&1
