import type { LegalDocument } from "@/content/legal";

export function LegalDocumentPage({ document }: { document: LegalDocument }) {
  return (
    <main className="bg-[#f5f7f7] pt-[76px] text-navy">
      <section className="mx-auto w-full max-w-[1180px] px-4 py-10 sm:px-6 lg:px-10 lg:py-14">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft md:p-10 lg:p-12">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal">Юридическая информация</p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-navy md:text-5xl">{document.title}</h1>
            <p className="mt-5 text-base leading-8 text-muted md:text-lg">{document.description}</p>
          </div>

          <div className="mt-8 grid gap-3 rounded-3xl border border-teal/15 bg-teal/5 p-5 text-sm leading-6 text-muted md:grid-cols-2">
            <p><span className="font-semibold text-navy">Дата публикации:</span> {document.meta.publishedAt}</p>
            <p><span className="font-semibold text-navy">Редакция:</span> {document.meta.version}</p>
            {document.meta.notice ? <p className="md:col-span-2">{document.meta.notice}</p> : null}
          </div>

          <section className="mt-8 rounded-3xl border border-slate-200 bg-[#f8fbfb] p-5 md:p-6">
            <h2 className="text-2xl font-semibold text-navy">Оператор</h2>
            <dl className="mt-5 grid gap-4 text-sm leading-6 text-muted md:grid-cols-2">
              <LegalField label="Наименование" value={document.operator.name} />
              <LegalField label="Регион" value={document.operator.region} />
              <LegalField label="ОГРНИП" value={document.operator.ogrnip} />
              <LegalField label="ИНН" value={document.operator.inn} />
              <LegalField label="Адрес для обращений" value={document.operator.address} />
              <LegalField label="Email" value={document.operator.email} />
              <LegalField label="Телефон" value={document.operator.phone} />
              <LegalField label="Орган регистрации ИП" value={document.operator.registrationAuthority} />
              <LegalField label="Дата регистрации ИП" value={document.operator.registrationDate} />
            </dl>
          </section>

          <div className="mt-10 grid gap-8">
            {document.sections.map((section) => (
              <section key={section.title} className="border-t border-slate-200 pt-8">
                <h2 className="text-2xl font-semibold tracking-tight text-navy">{section.title}</h2>
                {section.paragraphs?.length ? (
                  <div className="mt-4 grid gap-4 text-base leading-8 text-muted">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                ) : null}
                {section.items?.length ? (
                  <ul className="mt-4 grid gap-2 text-base leading-8 text-muted">
                    {section.items.map((item) => (
                      <li key={item} className="relative pl-5 before:absolute before:left-0 before:top-[0.85em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-teal">
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function LegalField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-semibold text-navy">{label}</dt>
      <dd className="mt-1">{value}</dd>
    </div>
  );
}
