# Deploy foundation

This document captures the current production deployment baseline for the KIT site. It is intentionally limited to build/start operations and environment setup.

## Runtime

- Node.js: `22`
- npm with the committed `package-lock.json`
- Install dependencies with `npm ci`

Use `.nvmrc` locally:

```bash
nvm use
```

## Build and start

```bash
npm ci
npm run typecheck
npm run lint
npm run build
npm run start
```

For a custom port:

```bash
npm run start -- --hostname 127.0.0.1 -p 3000
```

## Required environment

Set these for a public deployment:

```bash
NEXT_PUBLIC_SITE_URL=https://example.com
```

`NEXT_PUBLIC_SITE_URL` is used by canonical URLs, OpenGraph URLs, `robots.txt`, `sitemap.xml`, and JSON-LD.

Restrict browser submissions to `/api/leads` to the production site origins:

```bash
LEADS_ALLOWED_ORIGINS=https://kit-kuhni.ru,https://www.kit-kuhni.ru
```

Local development allows `http://localhost:*` and `http://127.0.0.1:*`. Production requests without a valid `Origin` or `Referer` are rejected.

## Optional environment

Directus is optional. Leave these empty to use local fallback content:

```bash
DIRECTUS_URL=
DIRECTUS_TOKEN=
```

Telegram notifications are optional:

```bash
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
```

SMTP notifications are optional:

```bash
SMTP_HOST=
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=
SMTP_PASS=
SMTP_FROM=
SMTP_TO=
```

Lead delivery reliability:

- Directus is the recommended durable production storage path for submitted leads.
- If Directus is disabled or unavailable, `/api/leads` falls back to `output/leads.jsonl`.
- The local `output/leads.jsonl` fallback is not durable on serverless or other ephemeral filesystems unless the deployment explicitly preserves and backs up that directory.
- Telegram and SMTP are best-effort notification channels only. They help operators see leads, but they are not durable storage.

Search console verification values are optional and should stay empty until real verification codes are issued:

```bash
GOOGLE_SITE_VERIFICATION=
YANDEX_WEBMASTER_VERIFICATION=
```

Do not commit secrets. Use server, hosting provider, or CI secret storage.

## Health endpoint

The app exposes a lightweight health check:

```txt
GET /api/health
```

Expected response:

```json
{
  "ok": true,
  "service": "kit-site"
}
```

The endpoint does not call Directus, lead storage, SMTP, Telegram, or external services.

## VPS deployment notes

A basic VPS deployment can use:

- Node.js 22
- `npm ci`
- `npm run build`
- `npm run start`
- a process manager such as systemd or PM2
- Nginx as a reverse proxy in front of the Next.js server

Docker and Nginx can be added later as a separate implementation. This phase does not include Dockerfile, Nginx, systemd, PM2, or CI deploy automation.

## Deferred production work

Baseline security headers are configured in Next.js. CSP and HSTS are intentionally deferred until production HTTPS behavior and third-party integrations are confirmed.

The following items are intentionally out of scope for this foundation phase:

- CSP/HSTS
- distributed Redis/Upstash/WAF/CAPTCHA rate limiting
- production lead storage
- legal finalization
- queue/retry delivery, monitoring, and logging
- CRM/database selection
- deploy automation

`/api/leads` has a temporary in-memory limiter for immediate abuse protection. It is not sufficient for multi-instance production and should be replaced or supplemented by Redis/Upstash, WAF/CDN throttling, or CAPTCHA if real spam appears.
