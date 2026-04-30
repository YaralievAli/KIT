type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  dark?: boolean;
};

export function SectionHeading({ eyebrow, title, description, align = "left", dark = false }: SectionHeadingProps) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow ? (
        <p className={dark ? "mb-3 text-sm font-semibold uppercase tracking-wide text-champagne" : "mb-3 text-sm font-semibold uppercase tracking-wide text-teal"}>
          {eyebrow}
        </p>
      ) : null}
      <h2 className={dark ? "text-3xl font-semibold text-white md:text-4xl" : "text-3xl font-semibold text-navy md:text-4xl"}>
        {title}
      </h2>
      {description ? (
        <p className={dark ? "mt-4 text-base leading-7 text-white/72 md:text-lg" : "mt-4 text-base leading-7 text-muted md:text-lg"}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
