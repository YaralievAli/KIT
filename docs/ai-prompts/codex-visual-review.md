# Codex Prompt - Visual Review

```md
Mode:
- Review-only.
- Do not modify files.
- Do not commit.
- Do not push.
- Do not run production commands.
- Use Plan Mode only if the review is broad/risky or the owner explicitly asks for a plan.

Context:
KIT is a custom kitchen website for Saint Petersburg and Leningrad Region. Visual style: premium dark teal / graphite / champagne accents, warm kitchen imagery, clean mobile layout, readable Russian text, rounded cards, clear CTA buttons. Pages should not feel like heavy SEO articles.

Task:
Perform visual and responsive audit for:
[INSERT URL / ROUTE / COMPONENT]

Check at minimum:
- desktop around 1440px wide;
- mobile around 390px wide.

Check:
1. No horizontal overflow.
2. No broken images.
3. No console errors.
4. Russian text readable on mobile.
5. CTA visible and not clipped.
6. Header/nav does not cover content.
7. Cards/sections have clear hierarchy.
8. FAQ does not break neighboring layout.
9. Page feels like commercial landing content, not a generic SEO article.
10. If calculator is affected: logic unchanged, result card/fields/buttons/steps stable.

Output:
1. Verdict: pass / pass with notes / fail.
2. Screenshots saved path.
3. Desktop findings.
4. Mobile findings.
5. Severity-ranked issues.
6. Exact implementation brief for fixes if needed.
```
