# Safe AI Command Workflow

Use AI commands and slash-style prompts as helpers for analysis, planning, and scoped implementation, not as autonomous agents for dangerous operations.

## Principle

Guide, verify, and execute only when scoped. Do not hide risky actions inside broad prompts.

## AI May

- analyze code;
- inspect diffs;
- propose plans;
- write reviews;
- create checklists;
- identify risks;
- suggest commands for manual production use;
- implement scoped local changes when explicitly allowed.

## AI Must Not

- deploy to production without the exact owner phrase;
- run server mutation commands without explicit production permission;
- change secrets/env;
- auto-merge;
- auto-push to `main`;
- run destructive commands without explicit approval;
- conceal risky shell behavior inside long scripts.

## Good Prompt Shapes

```md
Review-only. Do not modify files.
Analyze the diff and report risks.
```

```md
Plan Mode first. Do not modify files until the plan is approved.
```

```md
Implementation allowed, only for the files listed below.
Do not run production commands.
Do not commit or push.
```

Commit/push prompts are acceptable only when explicitly scoped:

```md
Commit only the listed files.
Do not use git add .
Do not push.
```

## Shell Safety

Prefer:

```bash
git --no-pager status --short
git --no-pager diff --stat
git --no-pager diff --name-status
git --no-pager log -1 --oneline
```

If a pager opens, press `q`.

## Review-Only Template

```md
Mode:
- Review-only.
- Do not modify files.
- Do not run production commands.
- Do not commit.
- Do not push.

Task:
- Analyze [specific scope].
- Report findings with severity, file paths, and recommended fixes.
```

## Implementation Template

```md
Mode:
- Implementation allowed.
- Keep changes limited to listed files/areas.
- Do not run production commands.
- Do not use git add .
- Do not commit unless explicitly asked.

Verification:
- Run relevant local checks.
- Report commands and results.
```
