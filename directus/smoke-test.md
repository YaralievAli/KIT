# Directus smoke-test checklist

Use this checklist after starting a local Directus instance. Directus is optional; the site must still build without it.

## Startup

- [ ] Set strong local values in `.env` or your shell for `DIRECTUS_KEY`, `DIRECTUS_SECRET`, `DIRECTUS_ADMIN_EMAIL`, `DIRECTUS_ADMIN_PASSWORD`, and database credentials.
- [ ] Run `docker compose up -d postgres directus`.
- [ ] Open Directus at `http://localhost:8055`.
- [ ] Sign in with the configured admin account.

## Schema

- [ ] Run `npm run directus:schema:apply`.
- [ ] Confirm the command completes successfully.
- [ ] Confirm these collections exist: `SiteSettings`, `Hero`, `Benefits`, `ComparisonItems`, `Projects`, `KitchenStyles`, `LayoutTypes`, `Materials`, `ProcessSteps`, `ProductionStats`, `Guarantees`, `Reviews`, `FAQ`, `DistrictPages`, `Leads`, `QuizSubmissions`, `ThankYouRecommendations`.
- [ ] If schema apply fails, inspect the Directus CLI output and update `directus/schema/schema-snapshot.yaml` before treating it as validated.

## App integration

- [ ] Create a Directus static token with read access for public content and create access for `Leads`.
- [ ] Set `DIRECTUS_URL=http://localhost:8055` and `DIRECTUS_TOKEN=<token>` for the Next.js app.
- [ ] Add or edit one `Projects` item in Directus.
- [ ] Start the app and confirm project data can be fetched from Directus.
- [ ] Submit a test lead and confirm a new item appears in `Leads`.
- [ ] Stop Directus or remove `DIRECTUS_URL`/`DIRECTUS_TOKEN`.
- [ ] Run `npm run build` and confirm the site still builds on local fallback content.
