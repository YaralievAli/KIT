# KIT QA Checklist

Use this before accepting a PR or production release.

## 1. Build And Code Checks

Run if relevant:
- `npm run typecheck`;
- `npm run lint`;
- `npm run build`;
- targeted tests, if present.

Report exact command results.

## 2. Browser Smoke Check

Check key pages when relevant:
- `/`;
- `/kuhni-na-zakaz-spb`;
- `/stoimost-kuhni-na-zakaz`;
- `/uglovye-kuhni`;
- `/pryamye-kuhni`;
- `/sovremennye-kuhni`;
- `/privacy`;
- `/personal-data-consent`;
- `/thank-you`;
- `/sitemap.xml`.

Adjust the list based on what changed. `/malenkie-kuhni` is a future/backlog candidate, not a current production route unless implemented later.

## 3. Desktop Visual Check

At about 1440px wide:
- page loads;
- no console errors;
- no broken images;
- no horizontal overflow;
- header/nav works;
- CTA buttons are visible;
- forms are usable;
- FAQ works;
- calculator works if in scope.

## 4. Mobile Visual Check

At 390px wide:
- no horizontal overflow;
- text is readable;
- header/menu works;
- sticky CTA does not block critical UI;
- CTA buttons fit;
- cards stack correctly;
- forms are usable;
- FAQ expand/collapse works;
- calculator steps/results are readable if in scope.

## 5. Lead-Flow Check

If lead forms changed:
- submit a safe controlled test lead only;
- confirm validation;
- confirm consent checkbox behavior;
- confirm Directus/Postgres save path if in scope;
- confirm notifications only if in scope;
- confirm no personal data is logged.

## 6. SEO Check

If routes/content/schema changed:
- correct H1;
- unique title and description;
- correct canonical;
- intended robots indexability;
- breadcrumbs visible if schema is emitted;
- FAQ visible and JSON-LD matches;
- sitemap contains intended URLs;
- no fake `Review`, `AggregateRating`, `Product`, or `Offer` schema.

## 7. Performance Sanity Check

Check:
- no obviously huge unoptimized images added;
- no unnecessary dependencies added;
- no large JS bundle increase without reason;
- no blocking external scripts added without approval.

## 8. Final QA Report

Return:
- verdict: pass / pass with notes / fail;
- environment;
- pages checked;
- commands run;
- screenshots path;
- issues found;
- must-fix before merge/deploy;
- optional follow-up backlog.
