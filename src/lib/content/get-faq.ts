import { readDirectusItems } from "@/lib/content/directus-client";
import { localContent } from "@/lib/content/local-content";
import type { FAQItem } from "@/types/content";

type DirectusFAQItem = Partial<FAQItem> & {
  visible?: boolean;
};

export async function getFAQ(): Promise<FAQItem[]> {
  const items = await readDirectusItems<DirectusFAQItem>("FAQ", { sort: ["order", "sort"] });
  const faq = items
    ?.filter((item) => item.visible !== false && item.question && item.answer)
    .map((item, index) => ({
      id: item.id ?? `directus-faq-${index + 1}`,
      question: item.question ?? "",
      answer: item.answer ?? "",
      order: item.order ?? index + 1,
      visible: item.visible !== false,
    }));

  return faq?.length ? faq : localContent.faq;
}
