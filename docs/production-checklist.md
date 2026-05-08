# Production checklist

Use this checklist before and after deploying the KIT site to production.

## Pre-deploy

- PR is merged to `main`.
- GitHub Actions CI is green on `main`.
- Local `main` is pulled from origin.
- Working tree is clean before deploy.
- Previous working commit or tag is known for rollback.
- No release tag is created in this phase.

## Environment

- `NODE_ENV=production` is set by the runtime/platform.
- `NEXT_PUBLIC_SITE_URL` matches the final production domain.
- `LEADS_ALLOWED_ORIGINS` includes all final production origins.
- Directus env is set if durable production lead storage is required.
- Telegram env is set only if Telegram notifications should be active.
- SMTP env is set only if email notifications should be active.
- `GOOGLE_SITE_VERIFICATION` and `YANDEX_WEBMASTER_VERIFICATION` are empty unless real verification codes exist.
- `NEXT_PUBLIC_YANDEX_METRIKA_ID` is empty until the analytics/cookie-consent phase.
- No secrets are committed to the repository.

## Build and start

- Deployment environment uses Node.js `22`.
- Dependencies are installed with `npm ci`.
- `npm run typecheck` passes.
- `npm run lint` passes.
- `npm run build` passes in the deploy environment.
- Production server starts with `npm run start` or equivalent Node server runtime command.
- Static export is not used.

## Smoke tests

- `/` returns `200` and renders the public homepage.
- `/api/health` returns `200` and `{ "ok": true, "service": "kit-site" }`.
- `/thank-you` renders and shows no personal data.
- `/robots.txt` returns the expected robots file.
- `/sitemap.xml` returns public routes only.
- OpenGraph image loads.
- Favicon, app icons, and manifest load.
- Baseline security headers are present.
- Mobile viewport renders correctly.
- Desktop viewport renders correctly.
- Browser console has no new production errors.

## Lead form smoke test

- Send one controlled production test lead only.
- Verify it reaches the selected durable storage path, preferably Directus.
- If Telegram is enabled, verify it receives a notification only.
- If SMTP is enabled, verify it receives a notification only.
- Do not send repeated spammy test leads.
- Delete or mark the test lead afterward if appropriate.
- Confirm logs do not include phone, name, comment, quiz answers, request body, full IP, or raw provider response.

## SEO and indexing sanity

- `/preview-dark` redirects to `/`.
- `/legacy-light-home` remains hidden and noindex.
- `/thank-you` remains noindex.
- `/robots.txt` is reachable.
- `/sitemap.xml` excludes internal/legacy/draft routes.
- Page source has title, description, canonical, OpenGraph, Twitter image, icons, and manifest.

## Rollback

- If deploy fails, redeploy the previous working commit or previous release.
- If a bad change reached `main`, revert through GitHub PR history.
- Do not add rollback automation in this phase.
- Do not create a production release tag until smoke checks pass.
