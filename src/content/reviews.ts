import type { Review } from "@/types/content";

export const reviewSourceLinks = [
  {
    source: "Яндекс.Карты",
    label: "Отзывы на Яндекс.Картах",
    href: "https://yandex.ru/maps/-/CPs8mZ5J",
  },
  {
    source: "2ГИС",
    label: "Отзывы в 2ГИС",
    href: "https://go.2gis.com/oGOPj",
  },
  {
    source: "ВКонтакте",
    label: "Отзывы ВКонтакте",
    href: "https://vk.com/topic-234845647_56089299",
  },
] satisfies Array<{ source: Review["source"]; label: string; href: string }>;

const reviewSourceUrlBySource: Record<Review["source"], string> = {
  "Яндекс.Карты": reviewSourceLinks[0].href,
  "2ГИС": reviewSourceLinks[1].href,
  "ВКонтакте": reviewSourceLinks[2].href,
};

export const reviews: Review[] = [
  {
    id: "local-review-1",
    name: "Анна П.",
    district: "Санкт-Петербург",
    text: "Команда внимательно отнеслась к деталям и спокойно объяснила, от чего зависит итоговая стоимость кухни.",
    source: "Яндекс.Карты",
    sourceUrl: reviewSourceUrlBySource["Яндекс.Карты"],
    verified: false,
    visible: true,
  },
  {
    id: "local-review-2",
    name: "Дмитрий К.",
    district: "Ленинградская область",
    text: "Понравилось, что расчёт обсуждали без давления: сначала планировка и материалы, затем понятные следующие шаги.",
    source: "2ГИС",
    sourceUrl: reviewSourceUrlBySource["2ГИС"],
    verified: false,
    visible: true,
  },
  {
    id: "local-review-3",
    name: "Мария С.",
    district: "Василеостровский район",
    text: "Уточнили пожелания по хранению и подсветке, предложили несколько вариантов без давления и лишней спешки.",
    source: "ВКонтакте",
    sourceUrl: reviewSourceUrlBySource["ВКонтакте"],
    verified: false,
    visible: true,
  },
];
