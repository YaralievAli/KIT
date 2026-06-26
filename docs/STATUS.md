# Project Status — KIT

Last updated: 2026-06-21

Maintainer note: this file is the current-state handoff for the repository. Replace content on update; do not append long history. History lives in Git, PRs, and releases. Verify facts against the repository before trusting them because this file can lag behind `main`.

## How to use

Source priority:

1. Actual repository state.
2. This file.
3. Owner messages in the active task.

Old roadmap/handoff files outside the repository are historical references and must not override the repository, `AGENTS.md`, `CLAUDE.md`, this file, or `docs/DECISIONS.md`.

## Current repo state

- Current `main` after PR #42: `e7b8ddf` — Merge PR #42 (CALC-GOV-1 Telegram-first calculator consistency).
- Recent merged PRs:
  - PR #35 — D1A: fixed stale facts in `README.md`, `docs/deploy.md`, and `docs/analytics-goals.md`.
  - PR #37 — D1B: strengthened `AGENTS.md` and added minimal `CLAUDE.md` pointer.
  - PR #38 — D1C: added `docs/STATUS.md` and `docs/DECISIONS.md`.
  - PR #39 — D1C follow-up: linked the memory-system docs from root instructions and refreshed status.
  - PR #40 — DESIGN-0: documented the accepted V9.1.1 homepage direction.
  - PR #41 — DESIGN-1: added visual foundation tokens without intentional visual changes.
  - PR #42 — CALC-GOV-1: made the public V2 calculator Telegram-first.
- Production: `cac0908` / tag `v1.1.6` (owner-provided; requires server verification before relying on it for release decisions).
- Production is behind repository `main` by changes merged after `cac0908`; verify current `main` and production state before release decisions.
- No production deploy has been performed as part of the PR #40-#42 docs/code sequence in this status update.
- PR #34 is a one-file metadata change. The owner decided not to deploy it separately; it should ship with the next meaningful release.
- Expected local state after sync: clean `main`, no uncommitted changes. If a mounted Linux/WSL view shows whole-file CRLF modifications, verify against Git blobs before treating the tree as dirty.

## Active phase

Post-PR #42 cleanup and validation planning:

- DESIGN-0 is completed and merged via PR #40.
- DESIGN-1 is completed and merged via PR #41.
- CALC-GOV-1 is completed and merged via PR #42.
- The public V2 calculator is Telegram-first by default and in generic submit-failure copy.
- WhatsApp remains selectable and accepted for compatibility.
- Production deploy remains out of scope unless the owner writes exactly: `Разрешаю deploy на production`.

## Recently completed context

- v1.1.5 — five SEO landing pages live:
  - `/kuhni-na-zakaz-spb`
  - `/stoimost-kuhni-na-zakaz`
  - `/uglovye-kuhni`
  - `/pryamye-kuhni`
  - `/sovremennye-kuhni`
- v1.1.6 — AI workflow docs foundation and homepage H1 fix; deployed.
- PR #32 — 7AI-3 expert board / SEO-GEO / local SEO docs.
- FABLE-1 audits completed in conversation:
  - instruction architecture audit;
  - design feasibility review;
  - hybrid design direction accepted as a direction, not as implementation.

## Next planned steps

1. Local cleanup after PR #42 if not done yet.
2. PRICING validation owner task before making the calculator more commercially prominent:
   - minimum project price;
   - base cabinet/per-meter values;
   - layout multipliers;
   - facade tiers;
   - countertop tiers;
   - fittings tiers/options;
   - extra works;
   - installation rate/percent;
   - included/excluded items.
3. Analytics production/browser verification, read-only:
   - consent rejected/accepted behavior;
   - script absent before consent;
   - valid numeric ID behavior;
   - no PII in goals;
   - no real production lead submissions.
4. DESIGN-1B — typography feasibility and screenshot comparison before any Inter/Spectral loading.
5. CALC-1 — calculator shell polish only after PRICING validation:
   - dimension presets/inputmode;
   - progressive disclosure for fittings/extra works;
   - mobile density.
6. CALC-2 — price anatomy using the existing breakdown, after PRICING validation.
7. HERO-TRUST / homepage V9.1.1 implementation later, not before calculator/pricing trust is safe.
8. SEO — Phase 7SEO-2A current-copy SEO/GEO audit, review-only first.
9. QA — browser QA foundation for route smoke, viewports, and no real lead submission.
10. D1D — evaluate consolidation of `docs/ai-workflows/` and `docs/ai-prompts/` later only after separate review, traceability table, and owner approval.

## Pending production notes

- `main` is ahead of production; no urgent deploy is needed for the docs-only changes.
- Any production deploy/restart/server mutation requires the exact owner phrase from `docs/DECISIONS.md` and `AGENTS.md`.

## Open backlog, not scheduled

- Analytics/consent: the code foundation is implemented; the next step is read-only production/browser verification, not a new implementation PR. Activation still requires valid numeric `NEXT_PUBLIC_YANDEX_METRIKA_ID` and accepted browser consent.
- Calculator pricing: live range, breakdown, included/excluded/warnings, and lead context are already present, but pricing values remain temporary placeholders until owner validation.
- Directus: governance per `docs/directus-cms-governance.md`; no partial production content fill; CMS wiring is a separate future phase.
- Google Sheets lead sync: future backlog only. Directus/Postgres remains source of truth.
- PM2/graceful deploy 502 monitoring.
- Dependency audit: moderate vulnerabilities, separate patch-review track.
- `/preview-dark` X-Robots-Tag header: only if strict SEO verification ever requires it.
- Design hybrid implementation.
- SEO/GEO content expansion, including future candidates such as `/malenkie-kuhni`.

## Canonical docs

- `AGENTS.md` — root project rules and guardrails.
- `CLAUDE.md` — minimal pointer for Claude Code; does not override `AGENTS.md`.
- `docs/DECISIONS.md` — durable owner decisions.
- `docs/deploy.md` and `docs/ai-workflows/production-deploy-guardrails.md` — deploy baseline and production guardrails.
- `docs/analytics-goals.md` — analytics/consent rules.
- `docs/directus-cms-governance.md` — CMS governance.
- `docs/design/DESIGN.md` — design system notes.
- `docs/seo/local-seo-checklist.md` — local SEO checklist.
- `docs/ai-workflows/` — task workflows.
- `docs/ai-prompts/` — prompt templates.
