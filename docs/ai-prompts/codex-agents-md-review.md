# Codex Prompt - AGENTS.md Review

```md
Mode:
- Review-only.
- Do not modify files.
- Do not run production/deploy commands.
- Do not commit.
- Do not push.
- Do not use git add .
- Use Plan Mode only if the owner explicitly asks for planning first.

Context:
KIT uses AGENTS.md and docs workflows to guide AI coding agents. Check whether AGENTS.md is compact, non-conflicting, and protective enough for production workflow.

Check:
1. Project and stack are clear.
2. Non-negotiable safety rules exist.
3. Production/deploy is forbidden without exact phrase: `Разрешаю deploy на production`.
4. `git add .` is forbidden.
5. Selective staging is required.
6. Branch -> PR -> CI -> merge workflow is present.
7. Task modes are clear: review/audit, Plan Mode, implementation, visual, deploy.
8. File is not overloaded with history or roadmap content.
9. No duplication conflicts with docs/ai-workflows.
10. No conflicts with current project rules.
11. Verification commands are sufficient.
12. Final report format is clear.

Output:
- Verdict: keep / shorten / supplement / rewrite.
- Critical missing rules.
- Redundant sections.
- Suggested structure.
- Compact implementation prompt if changes are needed.
```
