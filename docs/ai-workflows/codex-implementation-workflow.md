# Codex Implementation Workflow

Use this workflow when Codex is allowed to edit repository files.

## 1. Decide Task Mode

Use Plan Mode first when the task is broad, risky, ambiguous, or touches architecture, security, production, SEO strategy, privacy/legal, Directus, API/leads, analytics, public routes, calculator logic, CI, or deploy.

Direct implementation is acceptable when:
- scope is narrow;
- files or directories are named;
- the expected result is clear;
- no production or secret access is needed;
- the owner explicitly allows implementation.

Review-only and audit-only mean no file changes. They do not automatically require Plan Mode unless the task is broad or the owner asks for it.

## 2. Define Scope

Every implementation task should state:
- goal;
- allowed files or areas;
- files or systems that must not be touched;
- whether logic may change or the task is visual/content-only;
- checks required;
- whether staging, commit, push, or deploy is allowed.

Default: do not stage, commit, push, or deploy unless explicitly requested.

## 3. Pre-Change Inspection

Before editing, inspect:
- current branch;
- `git status --short -uall`;
- relevant files and nearby patterns;
- related tests, routes, components, or docs.

Do not touch unrelated dirty files. Work with user changes rather than reverting them.

## 4. Implementation

Make the smallest safe change that satisfies the task.

Rules:
- do not refactor unrelated code;
- do not rename files unless required;
- do not change business logic in visual-only tasks;
- do not alter lead payload shape without explicit permission;
- do not add dependencies unless explicitly approved;
- do not add fake content, fake reviews, fake ratings, fake counters, or unsupported claims;
- do not change analytics, legal/privacy, env, API, Directus, or calculator logic outside scope.

## 5. Verification

Run checks appropriate to the change:
- `npm run typecheck`;
- `npm run lint`;
- `npm run build` for production-sensitive changes;
- browser check for UI changes;
- mobile and desktop screenshots for visual work;
- lead-flow checks only when form behavior changed and it is in scope;
- sitemap/canonical/schema checks for SEO changes.

If a check cannot be run, say why and list the manual follow-up.

## 6. Git

Only when explicitly requested:
- use selective staging only;
- never use `git add .`;
- inspect staged diff with `git --no-pager diff --cached --name-status` and `git --no-pager diff --cached --stat`;
- commit only relevant files;
- do not push unless explicitly requested.

## 7. Final Report

Return:
- summary;
- changed files;
- verification results;
- screenshots path if any;
- risks and limitations;
- whether staging, commit, push, or deploy happened.
