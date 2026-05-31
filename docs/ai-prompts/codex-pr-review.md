# Codex Prompt - PR Review

```md
Mode:
- Review-only.
- Do not modify files.
- Do not commit.
- Do not push.
- Do not run production commands.
- Use Plan Mode only if the review is broad/risky or the owner explicitly asks for a plan.

Context:
KIT is a custom kitchen website. Normal flow: feature branch -> PR -> CI -> merge. Production deploy is separate and requires the exact phrase: `Разрешаю deploy на production`.

Task:
Review the current branch/PR:
[INSERT BRANCH / PR / DIFF CONTEXT]

Check:
1. Scope matches the task.
2. No unrelated changes.
3. No staged/untracked handoff files.
4. No broad staging or git add . usage if visible.
5. No production/deploy/server changes without separate scope.
6. No lead payload / analytics / privacy / legal / Directus changes unless explicitly scoped.
7. UI changes do not break desktop/mobile.
8. SEO changes do not add fake schema, reviews, ratings, products, offers, or unsupported claims.
9. Typecheck/lint/build status.
10. Whether docs need updating.

Output:
1. Verdict: approve / approve with notes / request changes / block.
2. Blocking issues.
3. Non-blocking notes.
4. Files that need attention.
5. Verification gaps.
6. Exact follow-up prompt if fixes are required.
```
