# Project Decisions — KIT

Durable owner-decision log. Record only decisions actually made by the owner or merged into the repository. One entry per decision. Newest entries should be placed near the top of each group. Do not record temporary chat context. If a decision is revised, update the entry and note the revision date; do not silently delete it.

## Production and deploy

- **Exact deploy phrase required.** Any production deploy/restart/server mutation requires the owner to write exactly: `Разрешаю deploy на production`. General approval such as “да”, “можно”, or “go” is not sufficient. This is a standing rule and is also recorded in `AGENTS.md`.
- **PM2 cluster reload is the normal deploy method.** Source `.env.production`, then use `pm2 reload ecosystem.config.cjs --only kit-site --update-env`; plain `pm2 restart` is legacy/emergency only. See `docs/ai-workflows/production-deploy-guardrails.md`.
- **PR #34 (`/preview-dark` noindex metadata) is not deployed separately.** It should ship with the next meaningful release.

## Git workflow

- **No `git add .`; selective staging only.** This is a standing rule and is also recorded in `AGENTS.md`.
- **Use branch → PR → CI → merge.** `main` is protected; the required check is `Typecheck, lint, build`.
- **Review-only / audit-only tasks make zero file changes.**

## Trust, content, and claims

- **Reviews remain on the site.** Present them cautiously with real text/source context. Removal or hiding requires explicit owner approval.
- **No fake ratings, counters, awards, completed-project claims, exact prices, or unsupported guarantees.** Projects are examples of execution with `isRealProject=false`; prices should remain cautious and framed as “от …” when used.
- **No `Review` or `AggregateRating` schema** unless separately verified and approved. Do not add fake `Product`, `Offer`, or unsupported structured data.

## Communication channels

- **Telegram-first; no WhatsApp CTA without a separate owner decision.** Mobile/sticky CTA and `/thank-you` should stay Telegram-first unless the owner explicitly changes this decision.

## Analytics and privacy

- **No GA4/GTM or new tracking platforms without separate approval.**
- **Yandex Metrica foundation is consent-gated.** Production activation remains blocked until the owner makes the legal/cookie decision. Events must stay allowlisted and must not send PII. See `docs/analytics-goals.md`.
- **No real form submissions or production leads during QA** without explicit owner approval.

## Data and integrations

- **Directus/Postgres is the source of truth for leads.**
- **No partial filling of production Directus content collections.** CMS fill/wiring is a separate dedicated phase. See `docs/directus-cms-governance.md`.
- **Google Sheets lead sync is future backlog only.** It may be an operational copy but must not replace Directus/Postgres, must not block lead saving, must not log PII, and must never be written from the frontend.

## Design

- **The standalone Code Design prototype is a visual reference only, not production code.** Bundled runtime, inline styles, and fake form behavior must not be copied directly into the Next.js app.
- **Hybrid design direction accepted as a direction.** Working concept: “Тёмные якоря на тёплой бумаге” — dark teal anchors on warm light paper while preserving KIT identity. Implementation is postponed until FABLE-1 docs cleanup stabilizes and must happen in small isolated PRs.

## AI workflow

- **Model roles:** Fable/Claude are used for strategic audits, instruction architecture, design feasibility, review, and QA. Codex is used for narrow scoped implementation. Do not spend Fable/Codex time on trivial git/admin tasks when the owner can do them safely.
- **Large prompts/ТЗ for Codex are provided as downloadable files**, not pasted as long inline markdown blocks.
- **FABLE-1 cleanup order:** D1A → D1B → D1C → D1D. Workflow/prompt consolidation (D1D) must not be rushed and requires a traceability table.
