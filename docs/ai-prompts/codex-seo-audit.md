# Codex Prompt - SEO Audit

```md
Mode:
- Review-only / audit-only.
- Do not modify files.
- Do not commit.
- Do not push.
- Do not run production commands.
- Use Plan Mode only if the audit is broad/risky or the owner explicitly asks for a plan.

Context:
KIT is a custom kitchen website for Saint Petersburg and Leningrad Region. SEO must be commercial, honest, useful, and safe. Do not invent reviews, ratings, projects, counters, prices, guarantees, deadlines, or schema data.

Task:
Audit SEO/GEO for:
[INSERT URLS OR FILE PATHS]

Check:
1. Search intent and difference from nearby pages.
2. H1/title/description/canonical/robots.
3. H2/H3 structure and readability.
4. Whether the page feels like useful commercial content, not a heavy SEO article.
5. Commercial usefulness: CTA, process, cost, materials, trust, limitations.
6. Doorway risk and duplication.
7. Internal linking: links to add/remove/rename.
8. Schema: BreadcrumbList and FAQPage only when valid and visible.
9. GEO/AI visibility: who, what, where, how, why choose, next step.
10. No fake Review, AggregateRating, Product, Offer, FAQ, or unsupported claims.

Output:
1. Verdict: ready / minor fixes / major fixes / risky.
2. Top risks.
3. Doorway risk verdict.
4. Metadata findings.
5. Content/UX findings.
6. Internal linking recommendations.
7. Schema recommendations.
8. Exact implementation brief for future Codex task if fixes are needed.
```
