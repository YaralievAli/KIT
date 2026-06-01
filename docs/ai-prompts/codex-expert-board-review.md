# Codex Prompt - Expert Board Review

```md
Task type:
review-only / audit-only.

Mode:
- Do not edit files.
- Do not stage files.
- Do not commit.
- Do not push.
- Do not deploy.
- Do not touch production.
- Review-only and audit-only mean no file changes.
- Plan Mode is separate and should be used only for broad/risky tasks or when the owner explicitly asks for a plan first.

Context:
KIT is a custom kitchen website for Saint Petersburg and Leningrad Region. Use AGENTS.md, docs/design/DESIGN.md, and relevant docs/ai-workflows/*.

Subject to review:
[INSERT PAGE / URL / ROUTE / PR / DIFF / FEATURE]

Run a controlled expert-board review with these roles:
1. Orchestrator.
2. SEO/GEO specialist.
3. Conversion copywriter.
4. UX/UI design reviewer.
5. Frontend quality reviewer.
6. Security/privacy reviewer.
7. QA/release reviewer.

Project rules:
- no fake reviews, ratings, projects, counters, unsupported claims, or fake schema;
- no doorway/thin pages;
- no GA4/GTM or new trackers;
- no WhatsApp CTA changes unless separately approved;
- no partial Directus production content filling;
- no production/deploy without the exact phrase `Разрешаю deploy на production`;
- no git add .;
- do not change analytics/API/legal/calculator/env/sitemap/package/config outside explicit scope.

For each role, check:
- findings with severity: Blocker / High / Medium / Low / Info;
- evidence from file, route, screenshot, command, or content;
- recommended fix or follow-up;
- whether the issue is blocking or optional.

The orchestrator must:
- remove duplicates;
- call out conflicts/tradeoffs;
- prioritize actions by risk and business value;
- avoid speculative or fake trust-signal recommendations;
- produce an exact follow-up implementation prompt if changes are needed.

Output:
1. Verdict: accept / accept with notes / needs fixes / block.
2. Role findings.
3. Conflicts/tradeoffs.
4. Top prioritized actions.
5. Verification gaps.
6. Exact follow-up prompt if implementation is needed.
7. Confirm no files changed.
```
