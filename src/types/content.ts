export type ImageAsset = {
  image: string;
  alt: string;
  sizes: string;
  fallback?: string;
  loading?: "lazy" | "eager";
  preload?: boolean;
};

export type Claim = {
  id: string;
  text: string;
  cautiousText?: string;
  verified: boolean;
  sourceNote?: string;
  visible: boolean;
};

export type Project = ImageAsset & {
  id: string;
  title: string;
  district: string;
  area: string;
  style: string;
  layout: string;
  materials: string;
  productionTime: string;
  priceFrom: string;
  description: string;
  tags: string[];
  budgetGroup: "до 300 тыс." | "300-500 тыс." | "от 500 тыс.";
  isRealProject: boolean;
  label: string;
};

export type HeroContent = {
  location: string;
  title: string;
  subtitle: string;
  primaryCta: string;
  secondaryCta: string;
  credibility: string;
  image: ImageAsset;
  trustCards: string[];
};

export type TextCard = {
  title: string;
  text: string;
};

export type ImageCard = ImageAsset & {
  title: string;
  description?: string;
};

export type Review = {
  id: string;
  name: string;
  district: string;
  text: string;
  source: "Яндекс.Карты" | "2ГИС" | "ВКонтакте";
  sourceUrl?: string;
  verified: boolean;
  visible: boolean;
};

export type FAQItem = {
  id: string;
  question: string;
  answer: string;
  order: number;
  visible: boolean;
};

export type QuizAnswer = {
  step: number;
  question: string;
  value: string;
  label: string;
};

export type LeadPayload = {
  name: string;
  phone: string;
  communicationMethod: "whatsapp" | "call" | "telegram";
  comment?: string;
  consent: boolean;
  honeypot?: string;
  quizAnswers?: QuizAnswer[];
  selectedProjectId?: string;
  sourcePage: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  referrer?: string;
  timestamp: string;
};

export type DistrictPage = {
  slug: string;
  title: string;
  description: string;
  details: string[];
  cta: string;
  relatedProjectIds: string[];
  isDraft: boolean;
  hasUniqueContent: boolean;
  approved: boolean;
  seoTitle: string;
  seoDescription: string;
};

export type DirectionPage = DistrictPage & {
  layoutType?: string;
  styleType?: string;
};

export type SiteSettings = {
  companyName: string;
  description: string;
  phone: string;
  phoneHref: string;
  whatsappHref: string;
  telegramHref: string;
  vkHref: string;
  email: string;
  address: string;
  workingHours: string;
};

export type HomePageContent = {
  settings: SiteSettings;
  hero: HeroContent;
  benefits: TextCard[];
  comparison: string[][];
  projects: Project[];
  styles: ImageCard[];
  layouts: ImageCard[];
  materials: ImageCard[];
  process: Array<[string, string]>;
  production: {
    stats: string[];
    images: ImageCard[];
  };
  cta: ImageAsset;
  guarantees: Array<[string, string]>;
  reviews: Review[];
  faq: FAQItem[];
  resultBenefits: string[];
  priceFactors: string[];
};
