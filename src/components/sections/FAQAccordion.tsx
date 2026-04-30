"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import type { FAQItem } from "@/types/content";
import { cn } from "@/lib/helpers";

export function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [open, setOpen] = useState(items[0]?.id);

  return (
    <section id="faq" className="section bg-surface">
      <div className="container-page">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">FAQ</p>
          <h2 className="section-title">Часто задаваемые вопросы</h2>
        </div>
        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {items.map((item) => {
            const isOpen = open === item.id;
            return (
              <div key={item.id} className="rounded-3xl border border-border bg-white p-5 shadow-sm">
                <button
                  className="flex w-full items-center justify-between gap-4 text-left text-base font-semibold text-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? "" : item.id)}
                >
                  {item.question}
                  <ChevronDown className={cn("shrink-0 transition", isOpen && "rotate-180")} size={20} aria-hidden="true" />
                </button>
                {isOpen ? <p className="mt-4 text-sm leading-7 text-muted">{item.answer}</p> : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
