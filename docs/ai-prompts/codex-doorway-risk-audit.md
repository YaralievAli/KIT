# Codex Prompt - Doorway Risk Audit

```md
Mode:
- Review-only / audit-only.
- Do not modify files.
- Do not commit.
- Do not push.
- Do not run production commands.
- Plan Mode only if this audit is broad or the owner explicitly asks for a plan first.

Context:
KIT is a custom kitchen website for Saint Petersburg and Leningrad Region. SEO pages must be useful commercial pages, not doorway pages, auto-generated filler, keyword stuffing, or near-duplicate landing pages.

Task:
Check doorway risk for:
[INSERT URLS / ROUTES / FILES]

Check:
1. Does each page have a distinct search intent?
2. Are pages more than keyword swaps?
3. Is there unique commercial value for visitors?
4. Are H1/title/sections/FAQ too similar?
5. Are there unique sections: cost, materials, layout, process, limits, FAQ, CTA?
6. Is there artificial local/category multiplication?
7. Should a page stay separate, merge with another, be rewritten, or be postponed?
8. What internal links should connect these pages?

Constraints:
- Do not change files.
- Do not propose grey-hat SEO methods.
- Do not invent reviews, ratings, projects, counters, prices, guarantees, deadlines, or schema.

Output:
1. Overall verdict: low / medium / high doorway risk.
2. Per-page verdict table.
3. Duplicate/overlap findings.
4. Must-fix uniqueness improvements.
5. Pages to keep / merge / rewrite / postpone.
6. Exact implementation brief if fixes are needed.
```
