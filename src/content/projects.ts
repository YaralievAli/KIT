import { imageMap } from "@/content/images-map";
import type { Project } from "@/types/content";

const projectMeta = {
  "harmony-primorsky": {
    materials: "МДФ фасады, корпус ЛДСП, каменная столешница",
    productionTime: "срок согласуется в договоре",
    description: "Спокойная современная кухня с угловой планировкой и большим рабочим участком.",
    tags: ["Современные", "Угловые", "до 300 тыс."],
    budgetGroup: "до 300 тыс.",
  },
  "scandi-vasileostrovsky": {
    materials: "светлые фасады, древесная текстура, практичная фурнитура",
    productionTime: "срок согласуется в договоре",
    description: "Легкая скандинавская композиция для кухни без визуальной перегрузки.",
    tags: ["Скандинавские", "Прямые", "до 300 тыс."],
    budgetGroup: "до 300 тыс.",
  },
  "light-kalininsky": {
    materials: "светлые фасады, корпус ЛДСП, фурнитура с доводчиками",
    productionTime: "срок согласуется в договоре",
    description: "Кухня до потолка для аккуратного хранения и спокойного светлого интерьера.",
    tags: ["Современные", "До потолка", "до 300 тыс."],
    budgetGroup: "до 300 тыс.",
  },
  "elegance-moskovsky": {
    materials: "фасады с фрезеровкой, каменная столешница, скрытая подсветка",
    productionTime: "срок согласуется в договоре",
    description: "Неоклассический пример с мягкой геометрией и теплыми акцентами.",
    tags: ["Неоклассика", "Угловые", "до 300 тыс."],
    budgetGroup: "до 300 тыс.",
  },
  "graphite-petrogradsky": {
    materials: "графитовые фасады, древесные элементы, усиленная фурнитура",
    productionTime: "срок согласуется в договоре",
    description: "Темный выразительный пример для кухни с островным акцентом.",
    tags: ["Лофт", "С островом", "до 300 тыс."],
    budgetGroup: "до 300 тыс.",
  },
  "walnut-kudrovo": {
    materials: "древесная текстура, матовые фасады, износостойкая столешница",
    productionTime: "срок согласуется в договоре",
    description: "Теплый современный вариант с П-образной планировкой и большим хранением.",
    tags: ["Современные", "300-500 тыс."],
    budgetGroup: "300-500 тыс.",
  },
} as const;

export const projects: Project[] = imageMap.projects.map((project) => {
  const meta = projectMeta[project.id as keyof typeof projectMeta];

  return {
    id: project.id,
    title: project.title,
    district: project.district,
    area: project.area,
    style: project.style,
    layout: project.layout,
    priceFrom: project.priceFrom,
    image: project.image,
    alt: project.alt,
    isRealProject: project.isRealProject,
    label: project.label,
    loading: project.loading,
    sizes: project.sizes,
    fallback: project.fallback,
    materials: meta.materials,
    productionTime: meta.productionTime,
    description: meta.description,
    tags: [...meta.tags],
    budgetGroup: meta.budgetGroup,
  };
});

export function projectSectionTitle(items = projects) {
  return items.some((project) => project.isRealProject) ? "Реализованные проекты" : "Примеры кухонь";
}
