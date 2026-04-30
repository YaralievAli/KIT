import type { Claim } from "@/types/content";

export const claims = {
  productionTime: {
    id: "productionTime",
    text: "30-35 дней",
    cautiousText: "сроки фиксируются в договоре",
    verified: false,
    sourceNote: "Уточнить и подтвердить перед публикацией как точный срок.",
    visible: true,
  },
  installment: {
    id: "installment",
    text: "Рассрочка 0%",
    cautiousText: "возможна оплата частями без переплат по условиям партнера",
    verified: false,
    sourceNote: "Нужно подтвердить актуальные условия рассрочки.",
    visible: true,
  },
  warranty: {
    id: "warranty",
    text: "гарантия до 5 лет",
    cautiousText: "гарантийные условия фиксируются в договоре",
    verified: false,
    sourceNote: "Нужно подтвердить срок гарантии по договору.",
    visible: true,
  },
  ownProduction: {
    id: "ownProduction",
    text: "собственное производство",
    cautiousText: "контроль качества на этапах проекта, изготовления и установки",
    verified: false,
    sourceNote: "Подтвердить описание производственной базы перед запуском.",
    visible: true,
  },
  freeDesignProject: {
    id: "freeDesignProject",
    text: "бесплатный дизайн-проект",
    cautiousText: "подготовим проектные решения после консультации",
    verified: false,
    sourceNote: "Уточнить условия бесплатного проекта.",
    visible: true,
  },
  fixedEstimate: {
    id: "fixedEstimate",
    text: "фиксированная смета",
    cautiousText: "стоимость фиксируется после замера, выбора материалов и согласования проекта",
    verified: false,
    visible: true,
  },
  measurement: {
    id: "measurement",
    text: "бесплатный замер",
    cautiousText: "условия замера уточняются у менеджера",
    verified: false,
    visible: true,
  },
} satisfies Record<string, Claim>;

export function claimText(claim: Claim) {
  if (!claim.visible) return null;
  if (claim.verified) return claim.text;
  return claim.cautiousText ?? null;
}
