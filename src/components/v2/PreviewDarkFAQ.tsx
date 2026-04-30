"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import type { FAQItem } from "@/types/content";
import { cn } from "@/lib/helpers";

export function PreviewDarkFAQ({ items }: { items: FAQItem[] }) {
  const [open, setOpen] = useState(items[0]?.id ?? "");

  return (
    <div id="faq">
      <h2 className="text-3xl font-semibold text-navy">Часто задаваемые вопросы</h2>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {items.slice(0, 8).map((item) => {
          const isOpen = item.id === open;
          return (
            <article key={item.id} className="rounded-2xl border border-border bg-surface">
              <button
                type="button"
                className="flex min-h-14 w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm font-semibold text-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? "" : item.id)}
              >
                {item.question}
                <ChevronDown className={cn("shrink-0 transition", isOpen && "rotate-180")} size={18} aria-hidden="true" />
              </button>
              {isOpen ? <p className="px-4 pb-4 text-sm leading-6 text-muted">{item.answer}</p> : null}
            </article>
          );
        })}
      </div>
    </div>
  );
}
