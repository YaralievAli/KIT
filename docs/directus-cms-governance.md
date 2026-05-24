# Directus CMS governance and safe fill plan

This document records the current Directus usage model for KIT and the safe rules for filling CMS collections without breaking the live site.

## Current verdict

Directus is connected as an optional CMS. If `DIRECTUS_URL` or `DIRECTUS_TOKEN` is missing, or a Directus request fails, the app falls back to local content from `src/content/*`.

The current visible v2 homepage is not CMS-driven. It imports static content directly from `src/content/*` in `PreviewDarkHomePage`. Directus-backed home content is currently used for homepage structured data and the legacy light homepage.

Do not expect production homepage visuals to change after filling Directus until a separate frontend wiring phase intentionally connects v2 sections to `getHomePageContent`.

## Source-of-truth decisions

- Keep the v2 homepage static for now.
- Do not seed production content collections partially.
- Do not move lead data, calculator logic, legal text, analytics, or production environment settings into Directus in this phase.
- Treat Directus content as draft/admin-managed content until a published-status policy and v2 CMS wiring are explicitly implemented.
- Use only real projects, real reviews, and verified claims. Do not create fake ratings, fake counters, fake reviews, or unsupported guarantees.

## Directus usage map

| Collection | Frontend usage | Consumer | Fallback behavior | Safe when empty |
| --- | --- | --- | --- | --- |
| `SiteSettings` | Read singleton | Homepage JSON-LD, legacy homepage | Merges non-empty Directus fields over local settings | Yes |
| `Hero` | Read singleton | Legacy homepage | Merges non-empty Directus fields over local hero | Yes |
| `Benefits` | Read list | Legacy homepage | Any valid Directus list replaces the full fallback list | Yes |
| `ComparisonItems` | Read list | Legacy homepage | Any valid Directus list replaces the full fallback list | Yes |
| `Projects` | Read list | Legacy homepage | Any valid Directus list replaces the full fallback list; missing item fields may use index fallback | Yes |
| `KitchenStyles` | Read list | Legacy homepage | Any valid Directus list replaces the full fallback list; missing item fields may use index fallback | Yes |
| `LayoutTypes` | Read list | Legacy homepage | Any valid Directus list replaces the full fallback list; missing item fields may use index fallback | Yes |
| `Materials` | Read list | Legacy homepage | Any valid Directus list replaces the full fallback list; missing item fields may use index fallback | Yes |
| `ProcessSteps` | Read list | Legacy homepage | Any valid Directus list replaces the full fallback list | Yes |
| `ProductionStats` | Read list | Legacy homepage | Directus stats replace fallback stats; production images remain local fallback | Yes |
| `Guarantees` | Read list | Legacy homepage | Any valid Directus list replaces the full fallback list | Yes |
| `Reviews` | Read list | Legacy homepage | Any valid Directus list replaces the full fallback list; only `name` and `text` are required for validity | Yes |
| `FAQ` | Read list | Homepage JSON-LD, legacy homepage | Any valid Directus list replaces the full fallback list; sorted by `order` | Yes |
| `DistrictPages` | Read by `slug` | Dynamic local SEO pages | Matching valid Directus page overrides local district fallback for that slug | Yes |
| `ThankYouRecommendations` | Not currently read | None | No frontend effect | Yes |
| `QuizSubmissions` | Not currently read or written | None | No frontend effect | Yes |
| `Leads` | Written by lead pipeline | `/api/leads` operations | Failed Directus save falls back where configured | No manual seed |

## Critical fallback rule

Most repeater collections do not merge Directus items with local fallback items.

If a collection is empty, the local fallback list is used. If a collection has one or more valid visible items, the valid Directus items become the entire CMS-backed list.

Examples:

- One valid `Benefits` item means CMS-backed consumers see one benefit, not the local fallback benefits plus that item.
- One valid `Projects` item means CMS-backed consumers see one project, not the full fallback project gallery plus that item.
- `SiteSettings` and `Hero` are exceptions because they are singleton-style and merge with fallback fields.

## Publishing policy

The current code does not implement a universal `status=published` filter.

Current safeguards:

- Most repeater loaders exclude rows only when `visible === false`.
- `DistrictPages` have `isDraft`, `hasUniqueContent`, and `approved`, but those fields mainly control SEO/indexing behavior. They are not a full content publishing gate.

Operational rule until code changes:

- Keep unfinished repeater rows `visible=false`.
- Keep unfinished district pages `isDraft=true`, `approved=false`, and `hasUniqueContent=false`.
- Do not assume hidden/draft behavior unless it is verified in browser QA.

## Image policy

Image fields can use:

- a Directus file id or file object;
- a local static path such as `/images/...`;
- an external `https://...` URL.

If an image field is empty, loaders generally use fallback images where available. If an invalid Directus file id is entered, the site may render a broken Directus asset URL.

Because the production File Library is currently empty, do not activate image-heavy CMS collections such as `Projects`, `KitchenStyles`, `LayoutTypes`, or `Materials` until images are uploaded or existing local image paths are intentionally used.

## Safe fill order

1. `SiteSettings`
   - Add one complete record.
   - Minimum fields: `companyName`, `description`, `phone`, `phoneHref`, `telegramHref`, `vkHref`, `email`, `address`, `workingHours`.
   - Verify homepage structured data and contact consistency.

2. `FAQ`
   - Add a full set of 8-10 useful questions.
   - Required fields: `question`, `answer`, `order`, `visible=true`.
   - Verify JSON-LD output and do not publish partial one-question lists.

3. `Reviews`
   - Add only real, verifiable reviews.
   - Recommended count: 3-6.
   - Required fields: `name`, `text`, `source`, `visible=true`.
   - Use `sourceUrl` only when it points to the real review source.

4. `Projects`
   - Fill only after images and copy are ready.
   - Recommended count: at least 4-6 complete projects.
   - Required fields: `title`, `slug`, `district`, `area`, `style`, `layout`, `materials`, `productionTime`, `priceFrom`, `image`, `alt`, `description`, `tags`, `budgetGroup`, `isRealProject`, `visible=true`.
   - Use `isRealProject=false` for examples or concepts.

5. Homepage repeaters
   - Fill full section-sized lists, not one-off rows.
   - Recommended minimums: `Benefits` 4, `ComparisonItems` 5, `KitchenStyles` 4, `LayoutTypes` 4, `Materials` 4, `ProcessSteps` 5, `ProductionStats` 4, `Guarantees` 4-5.

6. `DistrictPages`
   - Postpone until SEO page architecture is approved.
   - Fill only unique pages with real local intent.
   - Keep drafts non-indexable until reviewed.
   - `relatedProjectIds` must match the currently used project ids, which are still static unless a later phase changes this.

7. Do not manually fill
   - `Leads`: operational data only.
   - `QuizSubmissions`: not used by current frontend.
   - `ThankYouRecommendations`: not used by current frontend.

## QA checklist after filling Directus

- Build still succeeds without Directus env.
- Build still succeeds with Directus env.
- Homepage `/` loads and visible content matches expectations.
- Homepage JSON-LD does not contradict visible page content.
- `/legacy-light-home` remains internal/noindex and does not become a public source of truth.
- District pages render correct index/noindex behavior.
- Images load without broken Directus asset URLs.
- Empty or unavailable Directus still falls back to local content.
- Lead submission still persists to `Leads` and does not expose PII in logs.

## Recommended next engineering phase

Phase `7CMS-2` should stay as governance and preparation unless the owner explicitly approves frontend CMS wiring.

Definition of done:

- Decide which v2 sections should become CMS-driven.
- Add or formalize a true published-status policy before broad CMS publishing.
- Prepare a small non-production Directus content set.
- Test fallback, full Directus content, and partial Directus content locally.
- Only after that, plan a separate frontend implementation to wire v2 homepage sections to `getHomePageContent`.
