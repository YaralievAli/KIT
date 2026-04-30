# Directus collections for Phase 3

Directus is optional. If `DIRECTUS_URL` or `DIRECTUS_TOKEN` is missing, or any request fails, the site renders local fallback content.

## SiteSettings

Singleton-style collection. Fields:

- `companyName` string
- `description` text
- `phone` string
- `phoneHref` string
- `whatsappHref` string
- `telegramHref` string
- `vkHref` string
- `email` string
- `address` string
- `workingHours` string

## Hero

Singleton-style collection. Fields:

- `location` string
- `title` string
- `subtitle` text
- `primaryCta` string
- `secondaryCta` string
- `credibility` text
- `backgroundImage` file
- `imageAlt` string
- `trustCards` json

## Homepage repeaters

Use `visible` boolean and `sort` or `order` number where possible.

- `Benefits`: `title`, `text`, `visible`
- `ComparisonItems`: `criterion`, `kit`, `salon`, `privateMaster`, `modular`, `visible`
- `Projects`: `title`, `slug`, `district`, `area`, `style`, `layout`, `materials`, `productionTime`, `priceFrom`, `image`, `alt`, `description`, `tags`, `budgetGroup`, `isRealProject`, `visible`
- `KitchenStyles`: `title`, `description`, `image`, `alt`, `visible`
- `LayoutTypes`: `title`, `description`, `image`, `alt`, `visible`
- `Materials`: `title`, `description`, `image`, `alt`, `visible`
- `ProcessSteps`: `title`, `text`, `visible`
- `ProductionStats`: `title` or `text`, `visible`
- `Guarantees`: `title`, `text`, `visible`
- `Reviews`: `name`, `district`, `text`, `source`, `sourceUrl`, `verified`, `visible`
- `FAQ`: `question`, `answer`, `order`, `visible`

## Pages

- `DistrictPages`: `slug`, `title`, `description`, `details`, `cta`, `relatedProjectIds`, `isDraft`, `hasUniqueContent`, `approved`, `seoTitle`, `seoDescription`
- `DirectionPages`: same fields as `DistrictPages`, plus `layoutType` and `styleType`

## Leads

The Phase 2 lead flow attempts to create `Leads` if Directus is configured. Missing or failed Directus saves fall back to `output/leads.jsonl`.

Fields:

- `name` string
- `phone` string
- `communicationMethod` string
- `comment` text
- `quizAnswers` json
- `selectedProjectId` string
- `sourcePage` string
- `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term` string
- `referrer` string
- `consent` boolean
- `createdAt` datetime
