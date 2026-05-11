export type Range = {
  min: number;
  max: number;
};

export type KitchenLayout = "straight" | "corner" | "uShape" | "island";
export type FinishLevel = "basic" | "standard" | "comfort" | "premium" | "unknown";
export type CountertopLevel = "practical" | "durable" | "stone" | "unknown";
export type HardwareLevel = "basic" | "softClose" | "premium" | "unknown";

export type KitchenCalculatorInput = {
  layout: KitchenLayout;
  wall1Cm: number;
  wall2Cm?: number;
  wall3Cm?: number;
  islandLengthCm?: number;
  finishLevel: FinishLevel;
  countertopLevel: CountertopLevel;
  hardwareLevel: HardwareLevel;
  options: {
    // true when customer wants cabinets up to the ceiling / антресольный верхний ярус.
    toCeiling?: boolean;
    lighting?: boolean;
    sinkIntegration?: boolean;
    applianceIntegration?: boolean;
    complexInstall?: boolean;
    nonStandard?: boolean;
    demolition?: boolean;
    deliveryLift?: boolean;
  };
};

export type CalculatorResult = {
  calculatorVersion: "kit-kitchen-estimate-v1";
  resultTitle: "Предварительный диапазон";
  meters: {
    linearMeters: number;
    linearMetersMin: number;
    linearMetersMax: number;
    islandMeters?: number;
  };
  total: Range;
  breakdown: {
    bodyAndFacades: Range;
    countertop: Range;
    hardware: Range;
    layoutAdjusted: Range;
    options: Range;
    assembly: Range;
    minimumAdjustment?: Range;
  };
  included: string[];
  excluded: string[];
  warnings: string[];
  disclaimerShort: string;
  disclaimerDetails: string[];
};

type MeterRange = {
  linearMetersMin: number;
  linearMetersMax: number;
  islandMeters?: number;
};

type MinimumProjectPriceResult = {
  total: Range;
  minimumAdjustment?: Range;
  minimumApplied: boolean;
};

const calculatorVersion = "kit-kitchen-estimate-v1" as const;
const resultTitle = "Предварительный диапазон" as const;
const CORNER_DEDUCTION_METERS = 0.6;
const MIN_LINEAR_METERS = 1.8;
const MIN_WALL_CM = 100;
const MAX_WALL_CM = 800;
const MIN_ISLAND_CM = 80;
const MAX_ISLAND_CM = 400;
const moneyStep = 5_000;

const layouts: KitchenLayout[] = ["straight", "corner", "uShape", "island"];
const finishLevels: FinishLevel[] = ["basic", "standard", "comfort", "premium", "unknown"];
const countertopLevels: CountertopLevel[] = ["practical", "durable", "stone", "unknown"];
const hardwareLevels: HardwareLevel[] = ["basic", "softClose", "premium", "unknown"];

// Draft values. Must be validated against KIT real production costs,
// supplier prices, margin model, and commercial positioning before launch.
export const PRICING = {
  bodyAndFacadePerMeter: {
    basic: { min: 35_000, max: 48_000 },
    standard: { min: 45_000, max: 62_000 },
    comfort: { min: 58_000, max: 82_000 },
    premium: { min: 78_000, max: 120_000 },
    unknown: { min: 45_000, max: 82_000 },
  },
  countertopPerMeter: {
    practical: { min: 8_000, max: 13_000 },
    durable: { min: 13_000, max: 24_000 },
    stone: { min: 32_000, max: 65_000 },
    unknown: { min: 13_000, max: 32_000 },
  },
  hardwarePerMeter: {
    basic: { min: 7_000, max: 11_000 },
    softClose: { min: 12_000, max: 22_000 },
    premium: { min: 26_000, max: 48_000 },
    unknown: { min: 12_000, max: 28_000 },
  },
  layoutMultiplier: {
    straight: { min: 1.0, max: 1.0 },
    corner: { min: 1.06, max: 1.12 },
    uShape: { min: 1.12, max: 1.22 },
    island: { min: 1.16, max: 1.3 },
  },
  islandMeterFactor: { min: 1.15, max: 1.35 },
  assemblyRate: { min: 0.1, max: 0.15 },
  minimumProjectPrice: { min: 180_000, max: 230_000 },
  options: {
    toCeilingPerMeter: { min: 12_000, max: 26_000 },
    lighting: { min: 15_000, max: 45_000 },
    sinkIntegration: { min: 12_000, max: 35_000 },
    applianceIntegration: { min: 18_000, max: 65_000 },
    complexInstall: { min: 25_000, max: 85_000 },
    nonStandard: { min: 20_000, max: 90_000 },
    demolition: { min: 8_000, max: 30_000 },
    deliveryLift: { min: 5_000, max: 20_000 },
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

  return {
    min: rounded.min,
    max: Math.max(rounded.max, rounded.min),
  };
}

export function validateKitchenCalculatorInput(input: KitchenCalculatorInput): string[] {
  const errors: string[] = [];

  if (!layouts.includes(input.layout)) {
    errors.push("Выберите планировку кухни.");
  }

  if (!finishLevels.includes(input.finishLevel)) {
    errors.push("Выберите уровень фасадов.");
  }

  if (!countertopLevels.includes(input.countertopLevel)) {
    errors.push("Выберите уровень столешницы.");
  }

  if (!hardwareLevels.includes(input.hardwareLevel)) {
    errors.push("Выберите уровень фурнитуры.");
  }

  validateWallDimension(errors, input.wall1Cm, "Укажите длину первой стены");

  if (input.layout === "corner" || input.layout === "uShape") {
    validateWallDimension(errors, input.wall2Cm, "Укажите длину второй стены");
  }

  if (input.layout === "uShape") {
    validateWallDimension(errors, input.wall3Cm, "Укажите длину третьей стены");
  }

  if (input.layout === "island") {
    validateIslandDimension(errors, input.islandLengthCm);
  }

  return errors;
}

export function calculateKitchenEstimate(input: KitchenCalculatorInput): CalculatorResult {
  const validationErrors = validateKitchenCalculatorInput(input);

  if (validationErrors.length) {
    throw new KitchenCalculatorInputError(validationErrors);
  }

  const meters = getMeterRange(input);
  const meterRange = toRange(meters.linearMetersMin, meters.linearMetersMax);
  const bodyAndFacades = multiplyRange(PRICING.bodyAndFacadePerMeter[input.finishLevel], meterRange);
  const countertop = multiplyRange(PRICING.countertopPerMeter[input.countertopLevel], meterRange);
  const hardware = multiplyRange(PRICING.hardwarePerMeter[input.hardwareLevel], meterRange);
  const baseCore = addRange(addRange(bodyAndFacades, countertop), hardware);
  const layoutAdjusted = multiplyRange(baseCore, PRICING.layoutMultiplier[input.layout]);
  const options = getOptionsTotal(input, meterRange);
  const assemblyBase = addRange(layoutAdjusted, options);
  const assembly = multiplyRange(assemblyBase, PRICING.assemblyRate);
  const rawTotal = addRange(assemblyBase, assembly);
  const minimumResult = applyMinimumProjectPrice(rawTotal);

  return {
    calculatorVersion,
    resultTitle,
    meters: {
      linearMeters: roundToPrecision((meters.linearMetersMin + meters.linearMetersMax) / 2, 1),
      linearMetersMin: roundToPrecision(meters.linearMetersMin, 1),
      linearMetersMax: roundToPrecision(meters.linearMetersMax, 1),
      islandMeters: meters.islandMeters ? roundToPrecision(meters.islandMeters, 1) : undefined,
    },
    total: roundRangeToNearest5000(minimumResult.total),
    breakdown: {
      bodyAndFacades: roundRangeToNearest5000(bodyAndFacades),
      countertop: roundRangeToNearest5000(countertop),
      hardware: roundRangeToNearest5000(hardware),
      layoutAdjusted: roundRangeToNearest5000(layoutAdjusted),
      options: roundRangeToNearest5000(options),
      assembly: roundRangeToNearest5000(assembly),
      minimumAdjustment: minimumResult.minimumAdjustment
        ? roundRangeToNearest5000(minimumResult.minimumAdjustment)
        : undefined,
    },
    included: getIncludedItems(input),
    excluded: getExcludedItems(),
    warnings: getWarnings(input, minimumResult.minimumApplied),
    disclaimerShort:
      "Это предварительный диапазон. Расчёт помогает понять порядок стоимости, а точная стоимость фиксируется после замера, проекта и выбора материалов.",
    disclaimerDetails: [
      "Онлайн-расчёт не заменяет замер и проект. Даже при одинаковой планировке стоимость может отличаться из-за точных размеров, выбранных материалов, наполнения шкафов, фурнитуры, столешницы, коммуникаций и особенностей монтажа.",
      "Мы показываем предварительный диапазон, чтобы вы понимали порядок бюджета до консультации. После замера и выбора материалов дизайнер подготовит точный расчёт.",
    ],
  };
}

function getMeterRange(input: KitchenCalculatorInput): MeterRange {
  const wall1 = input.wall1Cm / 100;
  const wall2 = input.wall2Cm ? input.wall2Cm / 100 : 0;
  const wall3 = input.wall3Cm ? input.wall3Cm / 100 : 0;
  const island = input.islandLengthCm ? input.islandLengthCm / 100 : 0;

  switch (input.layout) {
    case "straight": {
      const linearMeters = Math.max(wall1, MIN_LINEAR_METERS);
      return { linearMetersMin: linearMeters, linearMetersMax: linearMeters };
    }

    case "corner": {
      const linearMeters = Math.max(wall1 + wall2 - CORNER_DEDUCTION_METERS, MIN_LINEAR_METERS);
      return { linearMetersMin: linearMeters, linearMetersMax: linearMeters };
    }

    case "uShape": {
      const linearMeters = Math.max(wall1 + wall2 + wall3 - CORNER_DEDUCTION_METERS * 2, MIN_LINEAR_METERS);
      return { linearMetersMin: linearMeters, linearMetersMax: linearMeters };
    }

    case "island":
      return {
        linearMetersMin: Math.max(wall1 + island * PRICING.islandMeterFactor.min, MIN_LINEAR_METERS),
        linearMetersMax: Math.max(wall1 + island * PRICING.islandMeterFactor.max, MIN_LINEAR_METERS),
        islandMeters: island,
      };
  }
}

function getOptionsTotal(input: KitchenCalculatorInput, meterRange: Range): Range {
  let total: Range = { min: 0, max: 0 };
  const options = input.options;

  if (options.toCeiling) {
    total = addRange(total, multiplyRange(PRICING.options.toCeilingPerMeter, meterRange));
  }

  if (options.lighting) total = addRange(total, PRICING.options.lighting);
  if (options.sinkIntegration) total = addRange(total, PRICING.options.sinkIntegration);
  if (options.applianceIntegration) total = addRange(total, PRICING.options.applianceIntegration);
  if (options.complexInstall) total = addRange(total, PRICING.options.complexInstall);
  if (options.nonStandard) total = addRange(total, PRICING.options.nonStandard);
  if (options.demolition) total = addRange(total, PRICING.options.demolition);
  if (options.deliveryLift) total = addRange(total, PRICING.options.deliveryLift);

  return total;
}

function applyMinimumProjectPrice(total: Range): MinimumProjectPriceResult {
  const adjusted = {
    min: Math.max(total.min, PRICING.minimumProjectPrice.min),
    max: Math.max(total.max, PRICING.minimumProjectPrice.max),
  };
  const minimumApplied = adjusted.min !== total.min || adjusted.max !== total.max;

  return {
    total: adjusted,
    minimumApplied,
    minimumAdjustment: minimumApplied
      ? {
          min: adjusted.min - total.min,
          max: adjusted.max - total.max,
        }
      : undefined,
  };
}

function getIncludedItems(input: KitchenCalculatorInput) {
  const included = [
    "выбранная планировка",
    "примерные размеры",
    "уровень фасадов",
    "столешница",
    "фурнитура",
    "выбранные опции",
    "ориентировочная сборка",
  ];
  const options = input.options;

  if (options.toCeiling) included.push("шкафы до потолка");
  if (options.lighting) included.push("подсветка рабочей зоны");
  if (options.sinkIntegration) included.push("мойка / врезка");
  if (options.applianceIntegration) included.push("подготовка под встроенную технику");
  if (options.complexInstall) included.push("сложный монтаж");
  if (options.nonStandard) included.push("нестандартные размеры");
  if (options.demolition) included.push("демонтаж старой кухни");
  if (options.deliveryLift) included.push("доставка / подъём");

  return included;
}

function getExcludedItems() {
  return [
    "бытовая техника",
    "чистовой ремонт",
    "перенос коммуникаций",
    "нестандартные работы, которые видны только после замера",
  ];
}

function getWarnings(input: KitchenCalculatorInput, minimumApplied: boolean) {
  const warnings: string[] = [];

  if (minimumApplied) {
    warnings.push(
      "Минимальный диапазон применён из-за небольшого размера кухни. Точная стоимость зависит от комплектации и замера."
    );
  }

  if (input.options.toCeiling) {
    warnings.push(
      "Шкафы до потолка могут заметно повлиять на стоимость. После замера дизайнер уточнит высоту помещения, конструкцию верхних секций и подгонку."
    );
  }

  if (input.layout === "island") {
    warnings.push(
      "Остров рассчитан предварительно. Электрика, коммуникации, усиленная столешница, свесы и нестандартные решения рассчитываются отдельно после проекта."
    );
  }

  if (
    input.finishLevel === "unknown" ||
    input.countertopLevel === "unknown" ||
    input.hardwareLevel === "unknown"
  ) {
    warnings.push(
      "Для выбранных пунктов «Не знаю» использован расширенный диапазон. Дизайнер поможет подобрать подходящие материалы и комплектацию."
    );
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

function toRange(min: number, max: number): Range {
  return { min, max };
}

function roundToNearest(value: number, step: number) {
  return Math.round(value / step) * step;
}

function roundToPrecision(value: number, digits: number) {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}
