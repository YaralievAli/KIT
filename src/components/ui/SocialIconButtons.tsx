import type { ComponentType, SVGProps } from "react";
import { cn } from "@/lib/helpers";
import type { SiteSettings } from "@/types/content";

type SocialIconButtonsProps = {
  settings: Pick<SiteSettings, "vkHref" | "telegramHref" | "whatsappHref" | "maxHref">;
  className?: string;
  linkClassName?: string;
};

const baseLinkClass =
  "inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/8 text-white/78 transition hover:border-teal hover:bg-teal hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal";

export function SocialIconButtons({ settings, className, linkClassName }: SocialIconButtonsProps) {
  const socials = [
    settings.vkHref ? { href: settings.vkHref, label: "ВКонтакте", Icon: VkIcon } : null,
    settings.telegramHref ? { href: settings.telegramHref, label: "Telegram", Icon: TelegramIcon } : null,
    settings.whatsappHref ? { href: settings.whatsappHref, label: "WhatsApp", Icon: WhatsAppIcon } : null,
    settings.maxHref ? { href: settings.maxHref, label: "MAX", Icon: MaxIcon } : null,
  ].filter(Boolean) as Array<{ href: string; label: string; Icon: ComponentType<SVGProps<SVGSVGElement>> }>;

  if (socials.length === 0) {
    return null;
  }

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      {socials.map(({ href, label, Icon }) => (
        <a key={label} href={href} className={cn(baseLinkClass, linkClassName)} aria-label={label}>
          <Icon className="h-5 w-5" aria-hidden="true" />
        </a>
      ))}
    </div>
  );
}

function VkIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12.75 17.2h-1.08c-3.67 0-5.76-2.52-7.33-6.72L3.9 9.3h2.52c.45 0 .65.2.78.58.86 2.46 2.02 4.3 2.55 4.3.2 0 .29-.1.29-.62v-2.42c-.07-1.1-.64-1.2-.64-1.6 0-.2.17-.4.44-.4h3.96c.37 0 .5.2.5.64v3.27c0 .35.15.47.26.47.2 0 .38-.12.76-.5.94-1.05 1.62-2.66 1.62-2.66.09-.23.28-.43.72-.43h2.52c.76 0 .93.39.76.93-.32 1.01-3.4 4.78-3.4 4.78-.27.34-.38.5 0 .98.27.35 1.17 1.14 1.77 1.85.44.51.77.94.86 1.24.1.36-.18.55-.65.55h-2.81c-.42 0-.62-.13-.86-.42-.34-.4-1.12-1.4-1.86-1.4-.38 0-.48.26-.48.66v.75c0 .4-.13.62-.76.62Z" />
    </svg>
  );
}

function TelegramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M21.74 4.58c.31-1.25-.9-1.05-.9-1.05L3.2 10.34c-1.2.48-1.18 1.15-.21 1.45l4.53 1.41 1.73 5.31c.22.61.11.86.74.86.48 0 .7-.22.97-.48l2.33-2.27 4.85 3.58c.9.5 1.54.24 1.76-.83l1.84-14.79ZM8.24 12.88l10.53-6.64c.51-.31.98-.14.6.2l-9 8.12-.35 3.69-1.78-5.37Z" />
    </svg>
  );
}

function WhatsAppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12.04 3.5a8.45 8.45 0 0 0-7.2 12.86L3.8 20.5l4.24-1a8.45 8.45 0 1 0 4-16Zm0 1.52a6.93 6.93 0 0 1 5.9 10.58 6.91 6.91 0 0 1-8.86 2.65l-.31-.15-2.5.59.62-2.43-.17-.33a6.93 6.93 0 0 1 5.32-10.91Zm-2.7 3.66c-.15 0-.4.06-.61.3-.21.23-.8.78-.8 1.9 0 1.12.82 2.2.93 2.35.12.15 1.58 2.53 3.93 3.44 1.95.77 2.35.61 2.78.58.42-.04 1.36-.56 1.55-1.1.19-.53.19-.99.13-1.08-.06-.1-.21-.15-.44-.27-.23-.11-1.36-.67-1.57-.75-.21-.08-.36-.11-.51.12-.15.23-.59.75-.72.9-.13.16-.27.17-.5.06-.23-.12-.97-.36-1.84-1.14-.68-.6-1.14-1.35-1.28-1.58-.13-.23-.01-.35.1-.46.1-.1.23-.27.34-.4.12-.13.15-.23.23-.38.08-.15.04-.29-.02-.4-.06-.12-.51-1.24-.7-1.7-.18-.45-.37-.39-.51-.4h-.48Z" />
    </svg>
  );
}

function MaxIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M7.2 14.8V9.2h1.35l1.55 2.3 1.55-2.3H13v5.6h-1.45v-3.18l-1.05 1.53h-.8l-1.05-1.53v3.18H7.2Zm6.2 0 2.05-5.6h1.48l2.05 5.6h-1.53l-.33-1.02h-1.88l-.33 1.02H13.4Zm2.2-2.18h1.16l-.58-1.78-.58 1.78Z" fill="currentColor" />
    </svg>
  );
}
