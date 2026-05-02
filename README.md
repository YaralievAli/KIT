# КИТ — кухни на заказ

Next.js App Router сайт для компании "КИТ": кухни на заказ в Санкт-Петербурге и Ленинградской области.

## Локальный запуск

```bash
npm install
npm run dev
```

По умолчанию сайт работает на локальном typed content и не требует Directus, Telegram, SMTP или приватных env-переменных.

## Проверки

```bash
npm run typecheck
npm run lint
npm run build
```

На Windows обычный sandbox-запуск `next build` может упираться в `spawn EPERM`; production build нужно повторить в обычной локальной среде.

## Environment

Скопируйте `.env.example` в `.env` для локальной разработки.

Важные публичные переменные:

```bash
NEXT_PUBLIC_SITE_URL=https://kit-kuhni.ru
NEXT_PUBLIC_YANDEX_METRIKA_ID=
```

`NEXT_PUBLIC_SITE_URL` используется для canonical URLs, OpenGraph URL, `robots.txt`, `sitemap.xml` и JSON-LD.

Приватные переменные (`DIRECTUS_TOKEN`, SMTP, Telegram, пароли Directus/PostgreSQL) нельзя коммитить.

## SEO Phase 4A

Реализовано:

- Metadata API для основных маршрутов.
- Canonical URLs через `alternates.canonical`.
- `robots` metadata:
  - `/thank-you` — `noindex,nofollow`;
  - `/preview-dark` — permanent redirect на `/`;
  - `/legacy-light-home` — internal legacy route, `noindex,nofollow`;
  - draft district/direction pages — `noindex,nofollow`.
- `src/app/robots.ts`.
- `src/app/sitemap.ts`.
- JSON-LD на главной:
  - `LocalBusiness`;
  - `Service`;
  - `FAQPage`;
  - `BreadcrumbList`.

В sitemap включаются:

- `/`;
- `/privacy`;
- `/personal-data-consent`;
- district/direction pages только если `approved=true`, `hasUniqueContent=true`, `isDraft=false`.

Черновые, placeholder, неутверждённые SEO-страницы, `/preview-dark` и `/legacy-light-home` не попадают в sitemap.

## Directus

Directus остаётся optional. Если `DIRECTUS_URL` или `DIRECTUS_TOKEN` не заданы, сайт использует local fallback content.

Schema readiness:

```bash
npm run directus:schema:apply
npm run directus:schema:snapshot
```

Подробнее:

- `directus/README.md`
- `directus/smoke-test.md`

## Контент и изображения

- Пути и alt-тексты изображений хранятся в `src/content/images-map.ts`.
- Контент fallback хранится в `src/content/*.ts`.
- Все content images должны выводиться через `next/image`.
- Текущие проекты являются примерами исполнения: `isRealProject=false`.

## Phase 4A ограничения

В этой ветке нельзя менять:

- визуальный дизайн;
- отзывы и claims logic;
- `isRealProject` safeguards;
- Directus schema;
- production Docker/Nginx;
- image optimization;
- Redis/rate limiting.
