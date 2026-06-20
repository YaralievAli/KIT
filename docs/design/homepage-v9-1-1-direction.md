# KIT Homepage V9.1.1 Direction

## Status

Accepted as the visual and structural direction for the next homepage redesign phases.
This is a design decision, not production implementation or deploy approval.

## Decision

Use V9.1.1 as the reference for a balanced/action-first homepage. Rebuild the
approved ideas within the existing Next.js architecture and KIT guardrails through
small, reviewable PRs.

## Why V9.1.1

- It balances fast access to calculation with trust and product explanation.
- It keeps the calculator early without turning the homepage into a quiz-only page.
- It supports the accepted warm-light and dark-teal KIT identity.
- It gives price, process, production, and trust content a clear hierarchy.
- It can be adapted to mobile without relying on prototype-specific behavior.

## Homepage Strategy

- Homepage: balanced/action-first.
- `/stoimost-kuhni-na-zakaz`: price-first.
- Future advertising or quiz landing: quiz-first and separate from the homepage.
- Keep the calculator early.
- Place “Почему расчёту можно верить” immediately after the calculator.
- Place “Из чего складывается стоимость” after the calculator and trust explanation.

## Fixed Section Order

1. Hero
2. Trust strip
3. Calculator / подбор
4. Почему расчёту можно верить
5. Из чего складывается стоимость
6. Планировки кухни
7. Примеры с понятной комплектацией
8. Честное сравнение
9. Спокойный маршрут / как всё проходит
10. Производственная база
11. Слова клиентов / отзывы
12. FAQ + Почему с КИТ спокойно
13. Финальная форма
14. Footer

## What To Borrow

- Warm light page surfaces with dark teal visual anchors.
- Clear teal actions and restrained champagne micro-accents.
- Strong editorial hierarchy and calmer section transitions.
- Early calculator access followed by evidence and price explanation.
- Compact trust signals, clear comparison, and understandable process steps.
- Inter plus selective Spectral display typography if performance checks support it.

## What Not To Copy

- Standalone HTML, CSS, or JavaScript.
- Inline styles, bundled prototype runtime, or fake form behavior.
- Prototype-only interactions that bypass existing components or accessibility.
- Unsupported claims, invented data, placeholder trust signals, or fake schema.

## Guardrails

- Do not rewrite the calculator engine.
- Do not change lead flow, API behavior, or Directus wiring.
- Do not add WhatsApp.
- Do not fabricate reviews, ratings, counters, projects, prices, or guarantees.
- Do not add `Review` or `AggregateRating` schema.
- Do not add `Product` or `Offer` schema without separate verification and approval.
- Preserve consent-gated analytics and current legal guardrails.
- Verify mobile density, readability, overflow, sticky UI, and form usability.
- Production deploy remains a separate owner-authorized action.

## Future Page Strategy

- Keep the homepage broad enough to explain the offer and move users toward action.
- Keep the price page focused on price factors, estimate limits, and calculation.
- Build any future quiz/ad landing as a separate focused route.
- Reuse the visual system across SEO pages without duplicating homepage content or
  creating thin doorway pages.

## Implementation Sequence

1. DESIGN-1: visual foundation only — tokens, typography feasibility, and image direction.
2. Implement hero and trust strip in a small isolated PR.
3. Update calculator framing, estimate-trust explanation, and price anatomy without
   changing calculator logic.
4. Implement product, comparison, process, production, reviews, and FAQ sections in
   small scoped PRs.
5. Finish final form/footer alignment and full desktop/mobile accessibility QA.

Each implementation phase requires its own scope, review, checks, and explicit
approval. This document does not authorize commit, push, or production deploy.
