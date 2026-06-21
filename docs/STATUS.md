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

- Verified baseline before DESIGN-1: `main` at `7762750` — Merge PR #40 (DESIGN-0 homepage direction).
- Recent merged PRs:
  - PR #35 — D1A: fixed stale facts in `README.md`, `docs/deploy.md`, and `docs/analytics-goals.md`.
  - PR #37 — D1B: strengthened `AGENTS.md` and added minimal `CLAUDE.md` pointer.
  - PR #38 — D1C: added `docs/STATUS.md` and `docs/DECISIONS.md`.
  - PR #39 — D1C follow-up: linked the memory-system docs from root instructions and refreshed status.
  - PR #40 — DESIGN-0: documented the accepted V9.1.1 homepage direction.
- Production: `cac0908` / tag `v1.1.6` (owner-provided; requires server verification before relying on it for release decisions).
- Production is behind repository `main` by changes merged after `cac0908`; verify current `main` and production state before release decisions.
- The memory-system docs changes after `v1.1.6` are docs-only and do not require production deploy.
- PR #34 is a one-file metadata change. The owner decided not to deploy it separately; it should ship with the next meaningful release.
- Expected local state after sync: clean `main`, no uncommitted changes. If a mounted Linux/WSL view shows whole-file CRLF modifications, verify against Git blobs before treating the tree as dirty.

## Active phase

DESIGN-1 — visual foundation:

- Existing brand colors are mapped to RGB-channel CSS variables without intentional visual changes.
- Tailwind keeps current token names and gains unused semantic aliases for future redesign phases.
- Shared foundation values cover the existing 1760px site width, common card/panel radii, and soft card shadow.
- Component classes, homepage structure, calculator shell, business logic, and production remain unchanged.
- Inter/Spectral loading and component token migration are deferred to separate DESIGN-1B or DESIGN-2 tasks.

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

1. Complete DESIGN-1 through a small visual-foundation PR.
2. DESIGN-1B — typography feasibility and screenshot comparison before any Inter/Spectral loading.
3. DESIGN-2 — component-level token migration or homepage implementation only through separately approved small PRs.
4. SEO — Phase 7SEO-2A current-copy SEO/GEO audit, review-only first.
5. QA — browser QA foundation for route smoke, viewports, and no real lead submission.
6. D1D — evaluate consolidation of `docs/ai-workflows/` and `docs/ai-prompts/` later only after separate review, traceability table, and owner approval.

## Pending production notes

- `main` is ahead of production; no urgent deploy is needed for the docs-only changes.
- Any production deploy/restart/server mutation requires the exact owner phrase from `docs/DECISIONS.md` and `AGENTS.md`.

## Open backlog, not scheduled

- Analytics/consent: Yandex Metrica activation remains blocked until owner legal/cookie decision and accepted-consent flow.
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
