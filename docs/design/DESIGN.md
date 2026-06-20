# KIT DESIGN.md

Plain-text design system for AI coding agents working on the KIT website and related presentation materials.

## Brand

KIT is a custom kitchen business in Saint Petersburg and Leningrad Region.

Desired feeling:
- premium but approachable;
- trustworthy local business;
- modern kitchen company, not generic SaaS;
- warm, practical, and commercial;
- clear enough for mobile users.

## Core Visual Direction

Use:
- dark teal hero areas;
- graphite and dark neutral backgrounds;
- champagne/gold micro-accents;
- warm kitchen photography;
- light content sections for readability;
- rounded cards;
- clean compact mobile layout;
- strong but not aggressive CTA buttons.

Avoid:
- random purple/blue SaaS gradients;
- overly glossy fake luxury;
- cluttered SEO article layout;
- tiny text;
- excessive animations;
- cartoon-like branding;
- fake review/rating UI.

## Homepage V9.1.1 Direction

The accepted homepage visual direction is documented in
`docs/design/homepage-v9-1-1-direction.md`.

Key direction:
- warm light backgrounds with dark teal anchors;
- teal primary CTA with restrained champagne accents;
- Inter for interface and body text, with Spectral considered for selected display headings;
- typography additions must be evaluated for loading and rendering performance before implementation;
- section density and text length must be checked at mobile widths;
- V9.1.1 is a visual reference, not source code to copy into the application.

## Color System

Approximate palette. Prefer existing project tokens/classes when available.

```text
Deep teal:        #0F3F3B / #0B3A36 / #0D4B45
Primary teal:     #0D9488
Teal hover:       #0F766E
Graphite:         #111827 / #161A1D
Soft graphite:    #1F2937
Champagne:        #D6B56D / #C9A95D
Warm cream:       #F7F3EA
Card white:       #FFFFFF
Muted border:     rgba(15, 63, 59, 0.12)
Muted text:       #5B6470 / #6B7280
```

Rules:
- champagne is an accent, not the main background;
- teal is the primary CTA and brand anchor;
- dark hero areas must remain readable;
- do not invent a new color direction without explicit task.

## Typography

Principles:
- Russian text must be readable on mobile;
- H1 should be strong and clear;
- H2 should be scannable;
- body copy should be broken into short paragraphs/cards;
- avoid long SEO text walls.

Suggested behavior:
- H1: large, compact line-height, clear commercial intent;
- H2: section headline plus short supporting text;
- body: normal readable size;
- cards: short labels and clear values;
- CTA: action-oriented human language.

## Layout

General:
- mobile first;
- no horizontal overflow;
- consistent section spacing;
- clear hierarchy;
- cards with generous but not bulky padding.

Hero:
- dark teal/graphite;
- location/trust chips;
- strong H1;
- clear CTA;
- optional secondary CTA;
- visual card/image or calculator teaser.

Content sections:
- mix light and dark sections;
- use cards for comparison/process/materials;
- avoid article-like endless paragraphs;
- include internal links where useful.

## Buttons And CTA

Primary CTA:
- teal background;
- high contrast;
- clear action such as `Рассчитать стоимость`, `Получить расчёт`, `Заказать замер`, or `Получить консультацию`.

Secondary CTA:
- outline or light treatment;
- visible but not stronger than the primary CTA.

Rules:
- do not create too many competing CTAs;
- CTA should match section intent;
- on mobile, CTA must be easy to tap.

## Imagery

Use:
- warm kitchen interiors;
- close-ups of materials, facades, countertops, and fittings;
- production/workshop only if real and appropriate;
- consistent aspect ratios.

Avoid:
- fake project labels;
- fake before/after;
- unrealistic AI-looking kitchens if real project proof is implied;
- images that imply unsupported business claims.

## SEO Landing Pages

SEO pages should feel like commercial landing pages, not text-heavy articles.

Recommended structure:
1. Hero with clear intent.
2. Practical explanation of the kitchen type/service.
3. Cards for fit, pros, and planning nuances.
4. Price factors.
5. Materials/options.
6. Process.
7. Related internal links.
8. CTA.
9. Visible FAQ.

Rules:
- H1 unique;
- H2s useful;
- content distinct from other SEO pages;
- no doorway-like duplicate pages;
- FAQ JSON-LD only mirrors visible FAQ;
- no fake `Review`, `AggregateRating`, `Product`, or `Offer`.

## Mobile Rules

Must:
- no horizontal overflow at 390px width;
- no clipped buttons;
- no tiny unreadable text;
- no overly dense cards;
- sticky header/sticky CTA must not cover critical content;
- forms must remain usable.

## Trust And Claims

Allowed when true:
- honest process explanations;
- `предварительный расчёт`;
- price is refined after measurement/project/materials;
- `СПб и ЛО` if service area is true;
- contract, measurement, design project, and installation claims only if actual business process supports them.

Not allowed:
- fake reviews;
- fake ratings;
- fake projects/cases;
- fake certificates;
- unsupported `лучшая цена`;
- unsupported exact deadlines;
- unsupported production claims.

## Accessibility And UX

- Contrast matters.
- Links should be visibly interactive.
- Buttons need clear labels.
- Important information must not rely only on color.
- Forms should be simple and honest.
- Consent should be visible and understandable.

## AI Agent Instruction

When editing UI:
1. Read this file.
2. Preserve KIT visual direction.
3. Keep scope narrow.
4. Verify mobile and desktop.
5. Do not add fake claims.
6. Report screenshots/checks in final output.
