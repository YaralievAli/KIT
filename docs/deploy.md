# Deploy foundation

This document captures the production deployment baseline for the KIT site. It is documentation-only: it does not include Docker, Nginx, systemd, PM2, managed-platform config, or deploy automation.

## Runtime

This project requires a Node.js server runtime. Do not use static export for production.

Reasons:

- `/api/health` is a server route.
- `/api/leads` is a server route with validation, abuse protection, persistence, and notifications.
- Lead forms depend on server-side logic.

Baseline:

- Node.js: `22`
- npm with the committed `package-lock.json`
- Install dependencies with `npm ci`

Use `.nvmrc` locally:

```bash
nvm use
```

## Build and start

Run checks before deployment:

```bash
npm ci
npm run typecheck
npm run lint
npm run build
```

Start the production server:

```bash
npm run start
```

For a custom host/port:

```bash
npm run start -- --hostname 127.0.0.1 -p 3000
```

## Environment variables

Do not commit secrets. Use server, hosting provider, or CI secret storage.

### Public build/runtime env

`NEXT_PUBLIC_SITE_URL` is public and required for production:

```bash
NEXT_PUBLIC_SITE_URL=https://kuhni-kit.ru
```

It is used by canonical URLs, OpenGraph URLs, `robots.txt`, `sitemap.xml`, and JSON-LD. It should match the final production domain.

### Server-only runtime env

`LEADS_ALLOWED_ORIGINS` is server-only and required for production lead submissions:

```bash
LEADS_ALLOWED_ORIGINS=https://kuhni-kit.ru,https://www.kuhni-kit.ru
```

It should include the final production origins. Local development allows `http://localhost:*` and `http://127.0.0.1:*`. Production requests without a valid `Origin` or `Referer` are rejected.

`NODE_ENV=production` should be provided by the production runtime or hosting platform.

### Server-only integration env

Directus is recommended for durable production lead storage:

```bash
DIRECTUS_URL=
DIRECTUS_TOKEN=
```

These values are server-only and must not be exposed as `NEXT_PUBLIC_`. Directus may also be needed during build if Directus-backed content or assets are fetched while building.

If Directus is disabled or unavailable, `/api/leads` falls back to `output/leads.jsonl`. That fallback is not durable on serverless or other ephemeral filesystems unless the deployment explicitly preserves and backs up that directory.

Telegram notifications are optional and server-only:

```bash
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
```

SMTP notifications are optional and server-only:

```bash
SMTP_HOST=
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=
SMTP_PASS=
SMTP_FROM=
SMTP_TO=
```

Optional advanced SMTP settings supported by the current code:

```bash
# SMTP_HELO_NAME=kuhni-kit.ru
# SMTP_REJECT_UNAUTHORIZED=true
```

Telegram and SMTP are best-effort notification channels only. They help operators see leads, but they are not durable storage.

### Webmaster verification env

Search console verification values are server-only and optional. Set them only when real verification codes exist:

```bash
GOOGLE_SITE_VERIFICATION=
YANDEX_WEBMASTER_VERIFICATION=
```

Do not use fake verification codes.

### Deferred analytics env

`NEXT_PUBLIC_YANDEX_METRIKA_ID` is wired for the analytics foundation, but it must remain empty in production until the owner approves the legal/cookie approach and consent banner. If analytics is activated later, set the numeric Yandex Metrica counter ID before build/deploy. Do not enable Webvisor, form analytics, ecommerce, userParams, userID, or clientID enrichment in this phase.

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

Use it for:

- deployment smoke checks;
- reverse proxy or load-balancer checks;
- future uptime monitoring.

The endpoint does not call Directus, lead storage, SMTP, Telegram, or external services.

## VPS deployment notes

A basic VPS deployment can use:

- Node.js 22;
- `npm ci`;
- `npm run build`;
- `npm run start`;
- a process manager such as systemd or PM2;
- Nginx as a reverse proxy in front of the Next.js server.

This phase does not include Dockerfile, Nginx config, systemd/PM2 files, managed-platform config, or CI deploy automation. Those can be added later as separate implementation phases.

## Smoke checklist

Use [production-checklist.md](production-checklist.md) for the full deploy checklist.

Minimum smoke checks:

- `/` returns `200` and renders the public homepage.
- `/api/health` returns `200` with `{ "ok": true, "service": "kit-site" }`.
- `/api/leads` accepts one controlled test lead from the production origin.
- `/thank-you` renders and does not expose personal data.
- `/robots.txt` and `/sitemap.xml` are reachable.
- OpenGraph image, favicon, icons, and manifest load.
- Baseline security headers are present.
- Mobile and desktop viewports render without visible breakage.
- Browser console has no new production errors.

## Rollback notes

Keep rollback manual and simple:

- identify the previous working commit or tag before deployment;
- if the deploy fails, redeploy the previous working commit/release;
- use GitHub PR history to revert documentation or code changes if needed;
- do not create deployment automation in this phase;
- do not create a release tag in this phase.

Reserve `v1.0.0` for the real public production launch. If a pre-launch tag is useful, consider a pre-1.0 tag only after production smoke tests pass.

## Deferred production work

Already in place:

- baseline low-risk security headers in Next.js;
- `/api/leads` content-type/body-size/origin guards;
- honeypot and temporary in-memory rate limiting;
- safer lead delivery logs;
- `/api/health`;
- CI typecheck/lint/build.

Deferred:

- HSTS after HTTPS behavior is confirmed;
- CSP Report-Only;
- distributed Redis/Upstash/WAF/CAPTCHA rate limiting;
- CDN/WAF throttling;
- production monitoring and alerting;
- queue/retry delivery;
- CRM/database decision beyond Directus;
- legal/privacy finalization;
- analytics and cookie consent;
- Docker/Nginx/systemd/PM2 implementation;
- CI deploy workflow.
