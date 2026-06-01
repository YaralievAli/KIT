# AI Expert Board Workflow

Use this workflow when KIT needs a coordinated multi-angle review of a page, feature, PR, content plan, or release candidate.

This is a documentation and prompt workflow only. It does not create subagents, MCP servers, hooks, plugins, scripts, GitHub Actions, automation, or production actions.

## Roles

### Orchestrator

- defines scope, inputs, and output format;
- prevents unrelated fixes from entering the review;
- merges findings from all roles;
- resolves conflicts by project priorities: safety, honesty, conversion, SEO value, UX quality, implementation risk;
- returns one prioritized follow-up plan when implementation is needed.

### SEO/GEO Specialist

- checks search intent, metadata, canonical, indexability, sitemap expectations, internal links, and AI-search answerability;
- flags doorway/thin-page risk and duplicated content;
- checks structured data only when it matches visible page content.

### Conversion Copywriter

- checks whether the offer is clear, specific, and useful for a kitchen buyer;
- reviews CTA clarity, friction, trust wording, price expectations, and next-step language;
- flags vague claims, overpromises, unsupported guarantees, and fake proof.

### UX/UI Design Reviewer

- checks visual hierarchy, mobile readability, CTA visibility, layout rhythm, and KIT visual consistency;
- uses `docs/design/DESIGN.md` as the design reference;
- flags text overlap, horizontal overflow, clutter, poor contrast, and generic visual direction.

### Frontend Quality Reviewer

- checks implementation risk, component boundaries, accessibility basics, responsive behavior, console errors, broken images, and avoidable bundle/performance issues;
- flags risky refactors, dependency additions, and unrelated code changes.

### Security/Privacy Reviewer

- checks PII handling, analytics payloads, consent/privacy impact, secrets exposure, API risk, and production/deploy guardrails;
- uses `docs/ai-workflows/security-review-workflow.md` for deeper review when security is in scope.

### QA/Release Reviewer

- checks expected commands, browser smoke, mobile/desktop coverage, route coverage, and release readiness;
- uses `docs/ai-workflows/qa-checklist.md` and production guardrails when deploy is relevant.

## Review Order

1. Orchestrator states scope, inputs, constraints, and whether this is review-only or implementation.
2. SEO/GEO and conversion copy review the intent and content first.
3. UX/UI and frontend quality review the visible and technical implementation.
4. Security/privacy reviews only the areas affected by the task, with deeper detail for forms, analytics, API, legal/privacy, env, Directus, or deploy changes.
5. QA/release reviewer checks verification gaps and release readiness.
6. Orchestrator merges the findings and removes duplicates.

## Merging Findings

When roles disagree, prioritize:
1. production safety and privacy;
2. legal/consent consistency;
3. no fake claims, no fake schema, no doorway pages;
4. lead-flow and core UX stability;
5. SEO/conversion value;
6. visual polish;
7. optional improvements.

Do not turn role opinions into action items unless they are specific, evidence-based, and tied to user value or project risk.

## Required Output

Return:
- verdict: accept / accept with notes / needs fixes / block;
- role findings grouped by role;
- conflicts and tradeoffs;
- top prioritized actions;
- verification gaps;
- exact follow-up prompt if implementation is needed.

## Explicitly Forbidden

- No automation, subagents, MCP, hooks, plugins, scripts, GitHub Actions, or auto-review workflows.
- No production/deploy/server actions without the exact owner phrase: `Разрешаю deploy на production`.
- No staging, commit, or push unless explicitly requested and scoped.
- No `git add .`.
- No fake reviews, ratings, projects, counters, claims, guarantees, prices, deadlines, or schema.
- No doorway/thin pages or mass local page generation.
- No GA4/GTM or new trackers without separate approval.
- No WhatsApp CTA changes unless separately approved.
- No partial production Directus content filling.
- No analytics/API/legal/calculator/env/sitemap/package changes outside the explicit scope.
