# Production Deploy Guardrails

Production deploy is separate from development, PR review, QA, and merge.

## Permission Rule

Do not deploy, reload, restart, migrate, run production server commands, edit production env, or touch production state unless the owner separately writes:

`Разрешаю deploy на production`

This exact phrase must be present in the current deploy context. General approval like "yes", "go", or "можно" is not enough.

## Before Deploy

Confirm:
- target commit is merged to `main`;
- CI passed: `Typecheck, lint, build`;
- release scope is clear;
- no unrelated changes are present;
- rollback point/tag is understood;
- env requirements are known without printing secrets.

## Normal PM2 Graceful Flow

After explicit production permission only:

```bash
cd /var/www/kit
git fetch origin main --tags
git checkout main
git pull --ff-only origin main
npm ci
set -a
. ./.env.production
set +a
npm run build
pm2 reload ecosystem.config.cjs --only kit-site --update-env
pm2 save
```

Then verify PM2 env presence without exposing values.

## Smoke Checks

Check at minimum:
- `/`;
- `/api/health`;
- `/privacy`;
- `/personal-data-consent`;
- `/thank-you`;
- all changed routes/pages;
- `/robots.txt` and `/sitemap.xml` when SEO/routes changed.

Also check:
- no obvious console errors;
- no broken images on changed pages;
- lead form path if forms/API changed;
- PM2 status and logs for immediate crashes.

## Legacy/Emergency Flow

`pm2 restart kit-site --update-env` is not the normal path.

It may be used only when:
- normal reload is impossible or unsafe;
- downtime risk is clearly stated;
- the owner has given the exact production permission phrase.

## Secrets And PII

Never print:
- API tokens;
- database passwords;
- SMTP/Telegram/notification secrets;
- full env output containing secrets;
- real lead names, phones, usernames, comments, or full payloads.

When verifying env, show only set/missing status.

## Deploy Report

Return:
- commit/hash deployed;
- commands run;
- PM2 status summary;
- pages checked;
- issues found;
- rollback note if needed.
