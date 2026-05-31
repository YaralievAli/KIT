# Repo Inspiration Map

This file records which ideas from public AI workflow repositories are useful for KIT and what should not be copied blindly.

## AGENTS.md Standard

Useful idea:
- `AGENTS.md` as a predictable repository-level instruction file for coding agents;
- keep it minimal and actionable.

Use in KIT:
- root `AGENTS.md`;
- `docs/ai-workflows/agents-md-minimalism-guide.md`.

Do not copy blindly:
- do not turn `AGENTS.md` into a huge project encyclopedia.

## Spec-Driven Workflow

Useful idea:
- requirements -> design -> tasks -> implementation -> verification;
- planning before coding for risky tasks.

Use in KIT:
- `docs/ai-workflows/spec-driven-development-workflow.md`;
- `docs/ai-prompts/codex-spec-first-feature-plan.md`.

Do not copy blindly:
- do not install MCP servers or external tools without separate audit;
- do not overcomplicate small tasks.

## SEO/GEO Skill Repositories

Useful idea:
- technical SEO;
- content quality;
- Schema.org;
- local SEO;
- AI search optimization;
- prioritized action plans.

Use in KIT:
- SEO audit workflow;
- doorway risk checklist;
- internal linking audits;
- content briefs.

Do not copy blindly:
- do not generate mass SEO pages;
- do not create doorway pages;
- do not add fake schema.

## DESIGN.md / Design System Repositories

Useful idea:
- plain markdown design system for AI coding agents;
- palette, typography, components, imagery, and mobile rules;
- prevent generic AI UI.

Use in KIT:
- `docs/design/DESIGN.md`;
- `docs/ai-workflows/design-system-workflow.md`;
- `docs/ai-prompts/codex-design-system-audit.md`.

Do not copy blindly:
- do not replace KIT's visual direction with another brand;
- do not mix several incompatible design systems.

## Guide-Not-Execute Command Repositories

Useful idea:
- AI provides analysis and recommendations;
- human decides sensitive actions;
- no secrets/PII handling;
- sensitive operations require explicit approval.

Use in KIT:
- `docs/ai-workflows/safe-ai-command-workflow.md`.

Do not copy blindly:
- do not give AI commands authority to auto-deploy;
- do not hide dangerous shell scripts inside helper commands.

## HTML Slides Repositories

Useful idea:
- standalone HTML presentations;
- inline CSS/JS when appropriate;
- useful for commercial proposals and pitch decks.

Use in KIT:
- `docs/ai-workflows/html-presentation-workflow.md`;
- `docs/ai-prompts/codex-html-presentation.md`;
- `docs/presentation-templates/kit-html-presentation-brief.md`.

Do not copy blindly:
- do not integrate presentation code into the production site;
- do not use fake claims or images.

## Security Review Repositories/Actions

Useful idea:
- PR-focused security review;
- check vulnerabilities and sensitive changes before merge;
- use AI as reviewer, not sole authority.

Use in KIT:
- `docs/ai-workflows/security-review-workflow.md`;
- `docs/ai-prompts/codex-security-review.md`.

Do not copy blindly:
- do not run third-party actions with access to secrets without separate audit.
