# Spec-Driven Development Workflow

Use this for complex tasks where scope, architecture, SEO, privacy, security, or behavior could drift.

## When To Use

Use for:
- new SEO pages;
- new site sections;
- calculator changes;
- Directus/API/lead pipeline work;
- analytics/cookie/legal changes;
- lead forms;
- navigation/catalog changes;
- major visual redesign;
- performance/image optimization;
- security/privacy changes.

Do not use for obvious one-line fixes or small text edits unless the owner asks.

## Chain

```text
1. Requirements
2. Design
3. Tasks
4. Implementation
5. Verification
6. PR summary
```

## Requirements

State:
- goal;
- in scope;
- out of scope;
- project constraints;
- likely affected files/areas;
- risks;
- definition of done.

## Design

Explain:
- approach;
- affected components/routes/data flow;
- visual and UX implications;
- SEO/security/privacy implications;
- how the result will be verified.

## Tasks

Break work into small, checkable steps:
- add route/content/component;
- add metadata/canonical/schema only when valid;
- update internal links if required;
- run checks;
- verify browser behavior.

## Implementation

During implementation:
- change only agreed files;
- do not touch unrelated dirty files;
- do not run production actions;
- do not use `git add .`;
- do not fix unrelated problems;
- do not add fake claims/schema.

## Verification

For SEO pages:
- route returns 200 locally;
- title/description/canonical correct;
- H1 exists and is unique;
- FAQ JSON-LD matches visible FAQ;
- no fake `Review`, `AggregateRating`, `Product`, or `Offer`;
- sitemap contains URL if required;
- no mobile/desktop overflow;
- no broken images;
- no console errors.

For visual tasks:
- desktop screenshot;
- mobile screenshot;
- no horizontal overflow;
- readable text;
- CTA visible.

For backend/API:
- targeted tests;
- no secret logging;
- no PII leakage;
- error paths checked.

## Plan Mode

Plan Mode should be requested for broad, risky, architecture, security, production, SEO strategy, or ambiguous tasks, or when the owner explicitly asks for a plan first.

Review-only and audit-only mean no file changes. They do not automatically require Plan Mode.
