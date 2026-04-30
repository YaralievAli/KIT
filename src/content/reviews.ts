import type { Review } from "@/types/content";

export const reviews: Review[] = [
  {
    id: "local-review-1",
    name: "Анна П.",
    district: "Санкт-Петербург",
    text: "Команда внимательно отнеслась к деталям и спокойно объяснила, от чего зависит итоговая стоимость кухни.",
    source: "Яндекс.Карты",
    verified: false,
    visible: true,
  },
  {
    id: "local-review-2",
    name: "Дмитрий К.",
    district: "Ленинградская область",
    text: "Понравилось, что расчёт обсуждали без давления: сначала планировка и материалы, затем понятные следующие шаги.",
    source: "2ГИС",
    verified: false,
    visible: true,
  },
  {
    id: "local-review-3",
    name: "Мария С.",
    district: "Василеостровский район",
    text: "Уточнили пожелания по хранению и подсветке, предложили несколько вариантов без давления и лишней спешки.",
    source: "ВКонтакте",
    verified: false,
    visible: true,
  },
];
