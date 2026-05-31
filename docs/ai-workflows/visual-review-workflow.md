# Visual Review Workflow

Use this workflow for responsive UI, visual polish, and conversion-focused page checks.

## Baseline

KIT should feel:
- premium but approachable;
- local and trustworthy;
- modern kitchen company, not generic SaaS;
- readable on mobile;
- commercial without fake proof.

## Required Checks

Check at minimum:
- desktop around 1440px wide;
- mobile around 390px wide.

Verify:
- no horizontal overflow;
- no broken images;
- no console errors;
- Russian text is readable on mobile;
- CTA buttons are visible and not clipped;
- header/nav does not cover content;
- sticky CTA does not block key form actions;
- cards and sections have clear hierarchy;
- no text-heavy SEO article feel unless the page is intentionally informational;
- forms, calculator, and FAQ remain usable if present.

## Style Guardrails

Preserve:
- premium dark teal, graphite, and champagne accents;
- warm kitchen imagery;
- clean section rhythm;
- rounded cards with restrained shadows;
- strong primary CTA and clear secondary actions.

Avoid:
- random purple/blue SaaS gradients;
- fake luxury gloss;
- tiny text;
- excessive animation;
- decorative elements that reduce clarity;
- fake review/rating UI.

## Calculator-Specific Checks

If calculator UI changed:
- do not change pricing/result formula unless explicitly requested;
- do not change lead payload or submit behavior unless explicitly requested;
- verify field alignment, validation, mobile layout, and submit area;
- verify result card and sticky/mobile CTA behavior.

## Output

Return:
- verdict: pass / pass with notes / fail;
- screenshots path;
- desktop findings;
- mobile findings;
- severity-ranked issues;
- exact implementation brief for fixes if needed.
