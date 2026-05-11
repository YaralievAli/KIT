export type Range = {
  min: number;
  max: number;
};

export type KitchenLayout = "straight" | "corner" | "uShape" | "island";

export type FacadeMaterial = "ldsp" | "mdfFilm" | "mdfEnamel" | "hplPlastic" | "veneerPremium";

export type CountertopMaterial = "ldsp" | "waterResistant" | "compact" | "acrylic" | "quartz";

export type FittingsLevel = "basic" | "standard" | "premium";

export type KitchenCalculatorInput = {
  layout: KitchenLayout;
  dimensions: {
    wallACm: number;
    wallBCm?: number;
    wallCCm?: number;
    islandLengthCm?: number;
  };
  facadeMaterial: FacadeMaterial;
  countertopMaterial: CountertopMaterial;
  fittingsLevel: FittingsLevel;
  fittingsOptions?: {
    softClose?: boolean;
    extraDrawers?: boolean;
    cornerMechanism?: boolean;
    liftMechanisms?: boolean;
    cargoBottleRack?: boolean;
    worktopLighting?: boolean;
  };
  extraWork?: {
    toCeiling?: boolean;
    dismantling?: boolean;
    deliveryLift?: boolean;
    sinkCutout?: boolean;
    cooktopCutout?: boolean;
    complexInstallation?: boolean;
    nonStandardSizes?: boolean;
  };
};

export type NormalizedDimensions = {
  wallA: DimensionValue;
  wallB?: DimensionValue;
  wallC?: DimensionValue;
  islandLength?: DimensionValue;
  effectiveMeters: Range;
};

export type KitchenCalculatorResult = {
  title: "Предварительный диапазон";
  minPrice: number;
  maxPrice: number;
  normalizedDimensions: NormalizedDimensions;
  selectedOptions: string[];
  breakdown: {
    layoutAndSize: Range;
    facades: Range;
    countertop: Range;
    fittings: Range;
    extraWork: Range;
    installation: Range;
    minimumAdjustment?: Range;
  };
  includedItems: string[];
  excludedItems: string[];
  warnings: string[];
  disclaimer: string;
};

export type CalculatorResult = KitchenCalculatorResult;

type DimensionValue = {
  cm: number;
  meters: number;
};

type MeterCalculation = {
  wallA: DimensionValue;
  wallB?: DimensionValue;
  wallC?: DimensionValue;
  islandLength?: DimensionValue;
  effectiveMeters: Range;
};

type MinimumProjectPriceResult = {
  total: Range;
  minimumAdjustment?: Range;
  minimumApplied: boolean;
};

const resultTitle = "Предварительный диапазон" as const;
const CORNER_DEDUCTION_METERS = 0.6;
const MIN_WALL_CM = 100;
const MAX_WALL_CM = 800;
const MIN_ISLAND_CM = 80;
const MAX_ISLAND_CM = 400;
const SMALL_EFFECTIVE_METERS = 2;
const LARGE_EFFECTIVE_METERS = 7;
const moneyStep = 5_000;

const layouts: KitchenLayout[] = ["straight", "corner", "uShape", "island"];
const facadeMaterials: FacadeMaterial[] = ["ldsp", "mdfFilm", "mdfEnamel", "hplPlastic", "veneerPremium"];
const countertopMaterials: CountertopMaterial[] = ["ldsp", "waterResistant", "compact", "acrylic", "quartz"];
const fittingsLevels: FittingsLevel[] = ["basic", "standard", "premium"];

const layoutLabels: Record<KitchenLayout, string> = {
  straight: "прямая",
  corner: "угловая",
  uShape: "П-образная",
  island: "с островом",
};

const facadeLabels: Record<FacadeMaterial, string> = {
  ldsp: "фасады ЛДСП",
  mdfFilm: "фасады МДФ плёнка",
  mdfEnamel: "фасады МДФ эмаль",
  hplPlastic: "фасады пластик / HPL",
  veneerPremium: "фасады шпон / премиум",
};

const countertopLabels: Record<CountertopMaterial, string> = {
  ldsp: "столешница ЛДСП",
  waterResistant: "влагостойкая / улучшенная столешница",
  compact: "компакт-плита",
  acrylic: "акриловая столешница",
  quartz: "столешница кварц",
};

const fittingsLevelLabels: Record<FittingsLevel, string> = {
  basic: "базовая фурнитура",
  standard: "средняя фурнитура",
  premium: "премиальная фурнитура",
};

// Temporary commercial placeholders. Must be validated against KIT real costs,
// supplier prices, margin model, and positioning before production UI launch.
export const PRICING = {
  baseCabinetPerMeter: { min: 22_000, max: 34_000 },
  facadePerMeter: {
    ldsp: { min: 14_000, max: 24_000 },
    mdfFilm: { min: 22_000, max: 36_000 },
    mdfEnamel: { min: 38_000, max: 68_000 },
    hplPlastic: { min: 34_000, max: 58_000 },
    veneerPremium: { min: 62_000, max: 105_000 },
  },
  countertopPerMeter: {
    ldsp: { min: 7_000, max: 12_000 },
    waterResistant: { min: 12_000, max: 22_000 },
    compact: { min: 24_000, max: 46_000 },
    acrylic: { min: 30_000, max: 58_000 },
    quartz: { min: 42_000, max: 85_000 },
  },
  fittingsPerMeter: {
    basic: { min: 8_000, max: 14_000 },
    standard: { min: 15_000, max: 28_000 },
    premium: { min: 30_000, max: 58_000 },
  },
  layoutMultiplier: {
    straight: { min: 1, max: 1 },
    corner: { min: 1.06, max: 1.14 },
    uShape: { min: 1.12, max: 1.24 },
    island: { min: 1.18, max: 1.34 },
  },
  islandMeterFactor: { min: 1.15, max: 1.35 },
  installationRate: { min: 0.1, max: 0.16 },
  minimumProjectPrice: { min: 180_000, max: 230_000 },
  fittingsOptions: {
    softClose: { min: 10_000, max: 25_000 },
    extraDrawers: { min: 18_000, max: 60_000 },
    cornerMechanism: { min: 20_000, max: 70_000 },
    liftMechanisms: { min: 16_000, max: 65_000 },
    cargoBottleRack: { min: 12_000, max: 35_000 },
    worktopLighting: { min: 15_000, max: 45_000 },
  },
  extraWork: {
    toCeilingPerMeter: { min: 12_000, max: 26_000 },
    dismantling: { min: 8_000, max: 30_000 },
    deliveryLift: { min: 5_000, max: 20_000 },
    sinkCutout: { min: 6_000, max: 18_000 },
    cooktopCutout: { min: 6_000, max: 18_000 },
    complexInstallation: { min: 25_000, max: 85_000 },
    nonStandardSizes: { min: 20_000, max: 90_000 },
  },
} as const;

export class KitchenCalculatorInputError extends Error {
  readonly errors: string[];

  constructor(errors: string[]) {
    super(errors.join(" "));
    this.name = "KitchenCalculatorInputError";
    this.errors = errors;
  }
}

export function addRange(a: Range, b: Range): Range {
  return {
    min: a.min + b.min,
    max: a.max + b.max,
  };
}

export function multiplyRange(a: Range, factor: Range): Range {
  return {
    min: a.min * factor.min,
    max: a.max * factor.max,
  };
}

export function multiplyRangeByScalar(a: Range, value: number): Range {
  return {
    min: a.min * value,
    max: a.max * value,
  };
}

export function roundRangeToNearest5000(range: Range): Range {
  const rounded = {
    min: roundToNearest(range.min, moneyStep),
    max: roundToNearest(range.max, moneyStep),
  };

  return normalizeRange(rounded);
}

export function validateKitchenCalculatorInput(input: KitchenCalculatorInput): string[] {
  const errors: string[] = [];

  if (!input || typeof input !== "object") {
    return ["Заполните параметры калькулятора."];
  }

  if (!layouts.includes(input.layout)) {
    errors.push("Выберите планировку кухни.");
  }

  if (!facadeMaterials.includes(input.facadeMaterial)) {
    errors.push("Выберите материал фасадов.");
  }

  if (!countertopMaterials.includes(input.countertopMaterial)) {
    errors.push("Выберите материал столешницы.");
  }

  if (!fittingsLevels.includes(input.fittingsLevel)) {
    errors.push("Выберите уровень фурнитуры.");
  }

  const dimensions = input.dimensions ?? {};

  validateWallDimension(errors, dimensions.wallACm, "Укажите длину основной линии");

  if (input.layout === "corner" || input.layout === "uShape") {
    validateWallDimension(errors, dimensions.wallBCm, "Укажите длину второй стены");
  }

  if (input.layout === "uShape") {
    validateWallDimension(errors, dimensions.wallCCm, "Укажите длину третьей стены");
  }

  if (input.layout === "island") {
    validateIslandDimension(errors, dimensions.islandLengthCm);
  }

  return errors;
}

export function calculateKitchenEstimate(input: KitchenCalculatorInput): KitchenCalculatorResult {
  const validationErrors = validateKitchenCalculatorInput(input);

  if (validationErrors.length) {
    throw new KitchenCalculatorInputError(validationErrors);
  }

  const meters = getMeterCalculation(input);
  const layoutAndSizeBase = multiplyRange(PRICING.baseCabinetPerMeter, meters.effectiveMeters);
  const layoutAndSize = multiplyRange(layoutAndSizeBase, PRICING.layoutMultiplier[input.layout]);
  const facades = multiplyRange(PRICING.facadePerMeter[input.facadeMaterial], meters.effectiveMeters);
  const countertop = multiplyRange(PRICING.countertopPerMeter[input.countertopMaterial], meters.effectiveMeters);
  const fittings = getFittingsTotal(input, meters.effectiveMeters);
  const extraWork = getExtraWorkTotal(input, meters.effectiveMeters);
  const subtotalBeforeInstall = addRange(addRange(addRange(addRange(layoutAndSize, facades), countertop), fittings), extraWork);
  const installation = multiplyRange(subtotalBeforeInstall, PRICING.installationRate);
  const rawTotal = addRange(subtotalBeforeInstall, installation);
  const minimumResult = applyMinimumProjectPrice(rawTotal);
  const roundedTotal = roundRangeToNearest5000(minimumResult.total);

  return {
    title: resultTitle,
    minPrice: roundedTotal.min,
    maxPrice: roundedTotal.max,
    normalizedDimensions: {
      wallA: meters.wallA,
      wallB: meters.wallB,
      wallC: meters.wallC,
      islandLength: meters.islandLength,
      effectiveMeters: roundRangeToPrecision(meters.effectiveMeters, 1),
    },
    selectedOptions: getSelectedOptions(input),
    breakdown: {
      layoutAndSize: roundRangeToNearest5000(layoutAndSize),
      facades: roundRangeToNearest5000(facades),
      countertop: roundRangeToNearest5000(countertop),
      fittings: roundRangeToNearest5000(fittings),
      extraWork: roundRangeToNearest5000(extraWork),
      installation: roundRangeToNearest5000(installation),
      minimumAdjustment: minimumResult.minimumAdjustment
        ? roundRangeToNearest5000(minimumResult.minimumAdjustment)
        : undefined,
    },
    includedItems: getIncludedItems(input),
    excludedItems: getExcludedItems(),
    warnings: getWarnings(input, meters.effectiveMeters, minimumResult.minimumApplied),
    disclaimer: "Точная стоимость зависит от замера, проекта, материалов, фурнитуры и состава работ.",
  };
}

function getMeterCalculation(input: KitchenCalculatorInput): MeterCalculation {
  const wallA = toDimensionValue(input.dimensions.wallACm);
  const wallB = input.dimensions.wallBCm ? toDimensionValue(input.dimensions.wallBCm) : undefined;
  const wallC = input.dimensions.wallCCm ? toDimensionValue(input.dimensions.wallCCm) : undefined;
  const islandLength = input.dimensions.islandLengthCm ? toDimensionValue(input.dimensions.islandLengthCm) : undefined;

  switch (input.layout) {
    case "straight":
      return {
        wallA,
        effectiveMeters: toRange(wallA.meters, wallA.meters),
      };

    case "corner": {
      const effectiveMeters = wallA.meters + requiredDimension(wallB).meters - CORNER_DEDUCTION_METERS;
      return {
        wallA,
        wallB,
        effectiveMeters: toRange(effectiveMeters, effectiveMeters),
      };
    }

    case "uShape": {
      const effectiveMeters =
        wallA.meters + requiredDimension(wallB).meters + requiredDimension(wallC).meters - CORNER_DEDUCTION_METERS * 2;
      return {
        wallA,
        wallB,
        wallC,
        effectiveMeters: toRange(effectiveMeters, effectiveMeters),
      };
    }

    case "island": {
      const island = requiredDimension(islandLength);
      return {
        wallA,
        islandLength: island,
        effectiveMeters: {
          min: wallA.meters + island.meters * PRICING.islandMeterFactor.min,
          max: wallA.meters + island.meters * PRICING.islandMeterFactor.max,
        },
      };
    }
  }
}

function getFittingsTotal(input: KitchenCalculatorInput, effectiveMeters: Range): Range {
  let total = multiplyRange(PRICING.fittingsPerMeter[input.fittingsLevel], effectiveMeters);
  const options = input.fittingsOptions ?? {};

  if (options.softClose) total = addRange(total, PRICING.fittingsOptions.softClose);
  if (options.extraDrawers) total = addRange(total, PRICING.fittingsOptions.extraDrawers);
  if (options.cornerMechanism) total = addRange(total, PRICING.fittingsOptions.cornerMechanism);
  if (options.liftMechanisms) total = addRange(total, PRICING.fittingsOptions.liftMechanisms);
  if (options.cargoBottleRack) total = addRange(total, PRICING.fittingsOptions.cargoBottleRack);
  if (options.worktopLighting) total = addRange(total, PRICING.fittingsOptions.worktopLighting);

  return total;
}

function getExtraWorkTotal(input: KitchenCalculatorInput, effectiveMeters: Range): Range {
  let total: Range = { min: 0, max: 0 };
  const extraWork = input.extraWork ?? {};

  if (extraWork.toCeiling) total = addRange(total, multiplyRange(PRICING.extraWork.toCeilingPerMeter, effectiveMeters));
  if (extraWork.dismantling) total = addRange(total, PRICING.extraWork.dismantling);
  if (extraWork.deliveryLift) total = addRange(total, PRICING.extraWork.deliveryLift);
  if (extraWork.sinkCutout) total = addRange(total, PRICING.extraWork.sinkCutout);
  if (extraWork.cooktopCutout) total = addRange(total, PRICING.extraWork.cooktopCutout);
  if (extraWork.complexInstallation) total = addRange(total, PRICING.extraWork.complexInstallation);
  if (extraWork.nonStandardSizes) total = addRange(total, PRICING.extraWork.nonStandardSizes);

  return total;
}

function applyMinimumProjectPrice(total: Range): MinimumProjectPriceResult {
  const adjusted = {
    min: Math.max(total.min, PRICING.minimumProjectPrice.min),
    max: Math.max(total.max, PRICING.minimumProjectPrice.max),
  };
  const minimumApplied = adjusted.min !== total.min || adjusted.max !== total.max;
  const adjustmentMin = Math.max(0, adjusted.min - total.min);
  const adjustmentMax = Math.max(0, adjusted.max - total.max);

  return {
    total: adjusted,
    minimumApplied,
    minimumAdjustment: minimumApplied ? normalizeRange({ min: adjustmentMin, max: adjustmentMax }) : undefined,
  };
}

function getSelectedOptions(input: KitchenCalculatorInput) {
  const selected = [
    `Планировка: ${layoutLabels[input.layout]}`,
    `Фасады: ${facadeLabels[input.facadeMaterial]}`,
    `Столешница: ${countertopLabels[input.countertopMaterial]}`,
    `Фурнитура: ${fittingsLevelLabels[input.fittingsLevel]}`,
  ];
  const fittingsOptions = input.fittingsOptions ?? {};
  const extraWork = input.extraWork ?? {};

  if (fittingsOptions.softClose) selected.push("доводчики");
  if (fittingsOptions.extraDrawers) selected.push("больше выдвижных ящиков");
  if (fittingsOptions.cornerMechanism) selected.push("угловой механизм");
  if (fittingsOptions.liftMechanisms) selected.push("подъёмные механизмы");
  if (fittingsOptions.cargoBottleRack) selected.push("бутылочница / карго");
  if (fittingsOptions.worktopLighting) selected.push("подсветка рабочей зоны");
  if (extraWork.toCeiling) selected.push("шкафы до потолка");
  if (extraWork.dismantling) selected.push("демонтаж старой кухни");
  if (extraWork.deliveryLift) selected.push("доставка / подъём");
  if (extraWork.sinkCutout) selected.push("врезка мойки");
  if (extraWork.cooktopCutout) selected.push("врезка варочной панели");
  if (extraWork.complexInstallation) selected.push("сложный монтаж");
  if (extraWork.nonStandardSizes) selected.push("нестандартные размеры");

  return selected;
}

function getIncludedItems(input: KitchenCalculatorInput) {
  const included = [
    "размер и планировка",
    facadeLabels[input.facadeMaterial],
    countertopLabels[input.countertopMaterial],
    fittingsLevelLabels[input.fittingsLevel],
    "ориентировочный монтаж",
  ];
  const fittingsOptions = input.fittingsOptions ?? {};
  const extraWork = input.extraWork ?? {};

  if (fittingsOptions.softClose) included.push("доводчики");
  if (fittingsOptions.extraDrawers) included.push("дополнительные выдвижные ящики");
  if (fittingsOptions.cornerMechanism) included.push("угловой механизм");
  if (fittingsOptions.liftMechanisms) included.push("подъёмные механизмы");
  if (fittingsOptions.cargoBottleRack) included.push("бутылочница / карго");
  if (fittingsOptions.worktopLighting) included.push("подсветка рабочей зоны");
  if (extraWork.toCeiling) included.push("шкафы до потолка");
  if (extraWork.dismantling) included.push("демонтаж старой кухни");
  if (extraWork.deliveryLift) included.push("доставка / подъём");
  if (extraWork.sinkCutout) included.push("врезка мойки");
  if (extraWork.cooktopCutout) included.push("врезка варочной панели");
  if (extraWork.complexInstallation) included.push("сложный монтаж");
  if (extraWork.nonStandardSizes) included.push("нестандартные размеры");

  return included;
}

function getExcludedItems() {
  return [
    "бытовая техника",
    "мойка, смеситель и варочная панель как изделия",
    "чистовой ремонт",
    "перенос коммуникаций",
    "работы, которые можно оценить только после замера",
  ];
}

function getWarnings(input: KitchenCalculatorInput, effectiveMeters: Range, minimumApplied: boolean) {
  const warnings: string[] = [];
  const averageMeters = averageRangeValue(effectiveMeters);

  if (minimumApplied) {
    warnings.push(
      "Минимальный диапазон применён из-за небольшого размера кухни. Точная стоимость зависит от комплектации и замера."
    );
  }

  if (averageMeters < SMALL_EFFECTIVE_METERS) {
    warnings.push("Размер кухни небольшой, поэтому часть работ и материалов считается по минимальному проектному объёму.");
  }

  if (averageMeters > LARGE_EFFECTIVE_METERS) {
    warnings.push("Размер кухни большой, поэтому диапазон особенно зависит от наполнения, фурнитуры и монтажа.");
  }

  if (input.layout === "island") {
    warnings.push(
      "Остров рассчитан предварительно. Электрика, коммуникации, усиленная столешница, свесы и нестандартные решения уточняются после проекта."
    );
  }

  if (input.extraWork?.toCeiling) {
    warnings.push(
      "Шкафы до потолка могут заметно повлиять на стоимость. После замера дизайнер уточнит высоту помещения, конструкцию верхних секций и подгонку."
    );
  }

  if (input.extraWork?.complexInstallation) {
    warnings.push("Сложный монтаж рассчитан предварительно и зависит от стен, коммуникаций и условий помещения.");
  }

  if (input.extraWork?.nonStandardSizes) {
    warnings.push("Нестандартные размеры требуют уточнения конструкции и материалов после замера.");
  }

  return warnings;
}

function validateWallDimension(errors: string[], value: number | undefined, label: string) {
  if (!isValidDimension(value, MIN_WALL_CM, MAX_WALL_CM)) {
    errors.push(`${label} от ${MIN_WALL_CM} до ${MAX_WALL_CM} см.`);
  }
}

function validateIslandDimension(errors: string[], value: number | undefined) {
  if (!isValidDimension(value, MIN_ISLAND_CM, MAX_ISLAND_CM)) {
    errors.push(`Укажите длину острова от ${MIN_ISLAND_CM} до ${MAX_ISLAND_CM} см.`);
  }
}

function isValidDimension(value: number | undefined, min: number, max: number) {
  return typeof value === "number" && Number.isFinite(value) && value >= min && value <= max;
}

function toDimensionValue(cm: number): DimensionValue {
  return {
    cm,
    meters: roundToPrecision(cm / 100, 2),
  };
}

function requiredDimension(value: DimensionValue | undefined) {
  if (!value) {
    throw new KitchenCalculatorInputError(["Не хватает размеров для выбранной планировки."]);
  }

  return value;
}

function toRange(min: number, max: number): Range {
  return normalizeRange({ min, max });
}

function normalizeRange(range: Range): Range {
  return {
    min: Math.min(range.min, range.max),
    max: Math.max(range.min, range.max),
  };
}

function roundRangeToPrecision(range: Range, digits: number): Range {
  return {
    min: roundToPrecision(range.min, digits),
    max: roundToPrecision(range.max, digits),
  };
}

function averageRangeValue(range: Range) {
  return (range.min + range.max) / 2;
}

function roundToNearest(value: number, step: number) {
  return Math.round(value / step) * step;
}

function roundToPrecision(value: number, digits: number) {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}
