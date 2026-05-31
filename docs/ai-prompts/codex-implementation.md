# Codex Prompt - Scoped Implementation

```md
[CHOOSE ONE]
Option A: Plan Mode first. Give a plan and do not modify files until approved.
Option B: Implementation allowed now because scope is narrow and files are listed below.

Context:
KIT is a custom kitchen website for Saint Petersburg and Leningrad Region. Follow AGENTS.md and the relevant workflow docs.

Task:
[DESCRIBE TASK]

Allowed scope:
- You may change only:
  - [FILE/PATH 1]
  - [FILE/PATH 2]
- Do not change:
  - production/server/deploy files;
  - unrelated dirty files;
  - app areas outside scope;
  - lead payload shape unless explicitly stated;
  - analytics/privacy/legal unless explicitly stated;
  - Directus/API/calculator unless explicitly stated.

Requirements:
1. Make the smallest safe change for the task.
2. Do not do unrelated refactors.
3. Do not add dependencies without approval.
4. Do not use git add .
5. Do not stage, commit, or push unless explicitly requested.
6. Do not run production/deploy/server commands.
7. If visual-only, do not change business logic.
8. If SEO, do not add fake reviews, ratings, projects, prices, counters, guarantees, or fake schema.

Verification:
- Show git status before and after.
- Run relevant checks:
  - typecheck if code/types changed;
  - lint if code changed;
  - build if production-sensitive;
  - browser/mobile screenshots if UI changed.
- If a check cannot run, explain why.

Output:
1. Summary.
2. Changed files.
3. Verification results.
4. Screenshots path, if any.
5. Risks/limitations.
6. Whether staging/commit/push/deploy happened.
```
