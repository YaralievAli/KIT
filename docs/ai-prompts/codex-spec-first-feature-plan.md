# Codex Prompt - Spec-First Feature Plan

```md
Mode:
- Plan first.
- Do not modify files.
- Do not commit.
- Do not push.
- Do not run production/deploy commands.
- Do not use git add .

Context:
KIT is a custom kitchen website. Use spec-driven planning for broad/risky work before implementation.

Feature/task:
[DESCRIBE FEATURE]

Constraints:
- No production/deploy actions.
- No fake reviews, ratings, guarantees, counters, Product/Offer/Review/AggregateRating schema.
- Do not touch analytics/API/legal/calculator/Directus/env outside scope.

Create a decision-complete plan covering:
1. Requirements:
   - goal;
   - in scope;
   - out of scope;
   - definition of done.
2. Design:
   - architecture;
   - affected routes/components/data;
   - UX/content approach;
   - SEO/privacy/security considerations.
3. Tasks:
   - small implementation steps;
   - files likely involved.
4. Verification:
   - typecheck/lint/build;
   - browser checks;
   - SEO/schema checks if SEO;
   - security/privacy checks if forms/API/analytics.
5. Risks:
   - likely breakpoints;
   - rollback or follow-up notes.

Output:
- Proposed plan only.
- No code changes.
```
