# AGENTS.md

Durable rules for AI coding agents working in the KIT website repository.

## Project

KIT is a commercial website for custom kitchens in Saint Petersburg and Leningrad Region.

Primary goals:
- trustworthy local SEO and conversion;
- clean mobile-first UX;
- measurable lead generation;
- safe production operations;
- honest content without fabricated trust signals.

Primary user-facing language is Russian.

## Non-Negotiable Rules

- Do not run production deploy, production server commands, PM2 reload/restart, Docker production commands, migrations, destructive database actions, or secret-changing commands unless the owner explicitly says: `Разрешаю deploy на production`.
- Do not use `git add .`.
- Use selective staging only, and only when commit/staging is explicitly requested.
- Do not commit, push, deploy, or touch production unless explicitly requested and scoped.
- Do not include secrets, tokens, full env values, real lead PII, or raw lead payloads in output.
- Do not submit real forms or create production leads during QA without explicit owner approval.
- No GA4/GTM or new analytics/tracking platforms unless separately approved. Existing consent-gated Yandex Metrica foundation remains governed by `docs/analytics-goals.md`.
- No WhatsApp CTA changes or reintroduction without a separate owner decision.
- Reviews remain on the site; do not remove or hide review sections without explicit owner approval.
- Do not fabricate reviews, ratings, counters, completed-project claims, prices, awards, guarantees, deadlines, legal claims, or other unsupported claims.
- Do not add `Review` or `AggregateRating` schema unless a separate verified owner decision approves it. Do not add fake `Product`, `Offer`, or unsupported structured data.
- Do not partially fill production Directus content collections. Directus CMS fill/wiring requires a separate phase.
- Keep unrelated workstreams separate: SEO/content, visual/UI, calculator, API/leads, Directus, analytics/consent/legal, deploy, CI, and security.

## Workflow

Normal code workflow:
1. Create a feature/fix/docs branch.
2. Keep changes scoped.
3. Run relevant checks.
4. Stage only specific files or hunks when staging is requested.
5. Commit only when explicitly requested.
6. Push and open PR only when explicitly requested.
7. Wait for CI: `Typecheck, lint, build`.
8. Production deploy is a separate action and requires the exact owner phrase.

Use `git --no-pager` for large Git output. If a pager opens, exit with `q`.

## Task Modes

- Review-only or audit-only means no file changes.
- Plan Mode is separate. Request it for broad, risky, architecture, security, production, SEO strategy tasks, or when the owner explicitly asks for a plan before execution.
- Direct implementation is acceptable only for narrow, approved tasks with clear scope.
- Visual/UI changes require desktop and mobile browser checks when feasible.
- Production/deploy tasks remain forbidden without the exact owner phrase.

## Verification

Choose checks based on the task:
- TypeScript: `npm run typecheck`
- lint: `npm run lint`
- production-sensitive changes: `npm run build`
- UI changes: browser checks and mobile/desktop screenshots
- SEO route/schema changes: route, title, canonical, robots, sitemap, and structured data checks
- forms/leads: validation and safe test lead flow only when in scope

If a check cannot be run, report the exact limitation.

## Deeper Docs

- Implementation workflow: `docs/ai-workflows/codex-implementation-workflow.md`
- QA checklist: `docs/ai-workflows/qa-checklist.md`
- Production guardrails: `docs/ai-workflows/production-deploy-guardrails.md`
- SEO workflow: `docs/ai-workflows/seo-audit-workflow.md`
- Doorway risk: `docs/ai-workflows/doorway-risk-checklist.md`
- Visual review: `docs/ai-workflows/visual-review-workflow.md`
- Security review: `docs/ai-workflows/security-review-workflow.md`
- Design system: `docs/design/DESIGN.md`
- Prompt templates: `docs/ai-prompts/`

## Final Report

For completed work, report:
- summary;
- files changed;
- verification performed;
- risks or limitations;
- whether commit/push/deploy happened.
