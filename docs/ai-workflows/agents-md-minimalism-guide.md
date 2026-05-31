# AGENTS.md Minimalism Guide

`AGENTS.md` should be short, durable, and executable. It is not a full roadmap or project history.

## Purpose

The file should quickly tell an AI coding agent:
- what the project is;
- which safety rules are non-negotiable;
- how Git workflow works;
- which checks to run;
- where deeper docs live;
- what to report at the end.

## Recommended Structure

```md
# AGENTS.md

## Project
Short description of KIT, stack, and main goals.

## Non-Negotiable Rules
Production lock, no git add ., selective staging, no fake claims/schema, no unrelated changes.

## Workflow
Branch -> changes -> verification -> selective staging -> PR.

## Task Modes
Review/audit, Plan Mode, implementation, visual, deploy.

## Verification
Relevant commands and browser checks.

## Deeper Docs
Links to docs/ai-workflows and docs/ai-prompts.

## Final Report
Expected summary format.
```

## Keep Out Of AGENTS.md

Do not put:
- long phase history;
- full roadmap;
- old decisions no longer relevant;
- long prompts;
- deep SEO research;
- production secrets;
- lead PII;
- exhaustive file maps.

Use separate docs for detailed workflows:
- `docs/ai-workflows/`;
- `docs/ai-prompts/`;
- `docs/design/`;
- `docs/references/`.

## Size Target

Aim for 150-250 lines maximum. If the file grows:
- move details to workflow docs;
- delete duplicate wording;
- remove outdated phase history;
- keep only durable rules.

## Minimum KIT Safety Block

```md
- Do not run production deploy, PM2 reload/restart, Docker production commands, migrations, or server mutation commands unless the owner explicitly says: `Разрешаю deploy на production`.
- Do not use `git add .`.
- Use selective staging only.
- Do not commit unrelated or untracked handoff files.
- Do not fabricate reviews, ratings, guarantees, case studies, certifications, prices, deadlines, counters, or legal claims.
- Do not add fake Review, AggregateRating, Product, Offer, or unsupported schema.
- Review-only and audit-only mean no file changes.
```
