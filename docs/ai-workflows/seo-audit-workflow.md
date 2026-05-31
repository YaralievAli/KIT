# SEO And GEO Audit Workflow

Use this workflow for SEO page audits, content strategy, internal linking, schema, and AI-search visibility.

## Principles

KIT SEO must be useful, honest, commercial, and locally relevant. The site should help a real visitor understand kitchen options, pricing factors, process, service area, and next steps.

Do:
- keep each page intent distinct;
- write for visitors first;
- use SPb and Leningrad Region naturally;
- add internal links to genuinely related pages;
- use FAQ only when visible content matches JSON-LD;
- add breadcrumbs where appropriate;
- explain limitations and price uncertainty honestly.

Do not:
- create doorway pages or near-duplicate pages;
- keyword-stuff headings or paragraphs;
- invent reviews, ratings, projects, prices, guarantees, deadlines, production facts, or schema;
- add fake `Review`, `AggregateRating`, `Product`, or `Offer` schema;
- hide SEO text in low-quality blocks.

## Audit Steps

1. Identify search intent:
   - commercial, local, informational, comparison, or mixed;
   - how it differs from nearby KIT pages.
2. Check technical SEO:
   - H1;
   - title and description;
   - canonical;
   - robots/indexability;
   - sitemap inclusion;
   - OpenGraph/Twitter basics.
3. Check content quality:
   - clear offer;
   - useful sections;
   - pricing factors;
   - process;
   - materials/options;
   - honest limitations;
   - clear CTA.
4. Check internal linking:
   - related kitchen types;
   - price page;
   - calculator;
   - homepage sections;
   - footer links if appropriate.
5. Check schema:
   - `BreadcrumbList` when breadcrumbs are present;
   - `FAQPage` only when exact FAQ is visible;
   - avoid fake or unsupported schema types.
6. Check doorway risk:
   - compare with related pages;
   - flag duplicate sections;
   - recommend merge/rewrite/postpone when needed.

## Output

Return:
- verdict: ready / minor fixes / major fixes / risky;
- top risks;
- doorway risk verdict;
- metadata findings;
- content/UX findings;
- internal linking recommendations;
- schema recommendations;
- exact implementation brief for a future task if fixes are needed.
