# КИТ — Directus/Postgres backup and restore notes

Last updated: 2026-05-11

## 1. Current production storage map

Production app directory:

```txt
/var/www/kit
```

Main app process:

```txt
PM2 process: kit-site
Next.js on port 3000
```

Directus/Postgres compose file:

```txt
/var/www/kit/docker-compose.directus.prod.yml
```

Directus env file:

```txt
/var/www/kit/.env.directus
```

Do not commit or print `.env.directus`.

Directus runs locally:

```txt
http://127.0.0.1:8055
```

Postgres container:

```txt
kit-postgres-1
postgres:16-alpine
```

Directus container:

```txt
kit-directus-1
directus/directus:11.5.1
```

Important Docker volumes:

```txt
kit_directus_postgres_data  -> /var/lib/postgresql/data
kit_directus_uploads        -> /directus/uploads
kit_directus_extensions     -> /directus/extensions
```

## 2. Current backup setup

Backup script:

```txt
/var/www/kit/scripts/backup-directus-postgres.sh
```

Backup directory:

```txt
/var/www/kit/backups
```

Backup log:

```txt
/var/www/kit/backups/backup.log
```

Cron schedule:

```cron
20 3 * * * /var/www/kit/scripts/backup-directus-postgres.sh
```

Meaning:

```txt
Every day at 03:20 UTC.
```

Retention:

```txt
14 days
```

Backup format:

```txt
PostgreSQL custom format dump: pg_dump -Fc
```

The script also verifies the archive with:

```txt
pg_restore --list
```

## 3. Manual backup command

Run from the app directory:

```bash
cd /var/www/kit
/var/www/kit/scripts/backup-directus-postgres.sh
```

Then check:

```bash
ls -lh /var/www/kit/backups
tail -40 /var/www/kit/backups/backup.log
```

A valid backup should:

```txt
exist as directus-postgres-YYYYMMDDTHHMMSSZ.dump
have non-zero size
appear in backup.log with "backup ok"
be readable by pg_restore --list
```

## 4. Verify a backup archive manually

Example:

```bash
cd /var/www/kit

BACKUP_FILE="/var/www/kit/backups/directus-postgres-YYYYMMDDTHHMMSSZ.dump"

test -s "$BACKUP_FILE"

docker compose --env-file .env.directus -f docker-compose.directus.prod.yml exec -T postgres \
  pg_restore --list < "$BACKUP_FILE" | head -80
```

Do not print secrets.

## 5. Download a backup from the server

From your local machine, not from the server:

```bash
scp deploy@SERVER_IP:/var/www/kit/backups/directus-postgres-YYYYMMDDTHHMMSSZ.dump .
```

Replace:

```txt
SERVER_IP
YYYYMMDDTHHMMSSZ
```

Keep at least one recent copy outside the server.

The provider-level server backup is useful, but it does not replace a database-level dump.

## 6. Restore checklist — do not run casually

Do not restore over production without:

1. Explicit confirmation from the owner.
2. A fresh backup of the current production database.
3. A clear reason for restore.
4. A maintenance window if real leads exist.
5. A rollback plan.

Before any restore attempt:

```bash
cd /var/www/kit

/var/www/kit/scripts/backup-directus-postgres.sh

ls -lh /var/www/kit/backups
tail -40 /var/www/kit/backups/backup.log
```

## 7. Example restore plan for a separate temporary database

This is safer than overwriting production.

The exact command depends on the target database name and container setup.

Conceptual flow:

```bash
# 1. Create a temporary database inside Postgres.
# 2. Restore the selected dump into that temporary database.
# 3. Inspect data.
# 4. Only then decide whether production restore is needed.
```

Do not run this without adapting and reviewing the exact commands.

## 8. Production restore warning

A production restore is destructive if it drops/replaces existing objects or data.

Do not run commands like these without explicit approval and a fresh backup:

```bash
dropdb
createdb
pg_restore --clean
pg_restore --if-exists
docker compose down -v
docker volume rm
```

## 9. Emergency signals

Check services:

```bash
cd /var/www/kit

pm2 status kit-site
curl -sS -o /dev/null -w "site_root=%{http_code}\n" https://kuhni-kit.ru/
curl -sS -o /dev/null -w "api_health=%{http_code}\n" https://kuhni-kit.ru/api/health
curl -sS http://127.0.0.1:8055/server/health || true
docker ps --format 'table {{.Names}}\t{{.Image}}\t{{.Status}}\t{{.Ports}}'
```

Check backup status:

```bash
ls -lh /var/www/kit/backups
tail -80 /var/www/kit/backups/backup.log
crontab -l
```

## 10. Current known backup state as of 2026-05-11

Confirmed:

```txt
Manual pg_dump works.
pg_restore --list works.
Cron is installed.
Backup script is committed to Git.
Provider server backup exists.
```

Latest confirmed commit at the time of writing:

```txt
a900ad9 Add Directus Postgres backup script
```

## 11. Rules

Do not:

```txt
print .env.directus
print Directus token
open Directus public read
run destructive SQL casually
run docker compose down -v casually
delete Docker volumes casually
restore production without a fresh backup and explicit confirmation
```

Prefer:

```txt
read-only diagnostics first
manual backup before risky work
restore test into a temporary database first
keep at least one backup copy outside the server
```
