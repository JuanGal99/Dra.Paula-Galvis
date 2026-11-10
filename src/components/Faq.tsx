import { useTranslation } from "react-i18next";
import SectionHeading from "./SectionHeading";

type FaqItem = {
  question: string;
  answer: string;
};

/**
 * Preguntas frecuentes de pacientes que viajan desde el exterior.
 * Usa <details> nativo: se abre con teclado y lectores de pantalla sin JavaScript.
 */
const Faq = () => {
  const { t } = useTranslation("faq");
  const items = t("items", { returnObjects: true }) as FaqItem[];

  // Datos estructurados para que los buscadores entiendan preguntas y respuestas
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <section
      id="faq"
      className="bg-white text-[#1A1A2E] px-6 py-24 scroll-mt-20"
      aria-labelledby="faq-heading"
    >
      <div className="max-w-3xl mx-auto">
        <SectionHeading id="faq-heading" title={t("title")} />

        <div className="divide-y divide-[#C9A84C]/25 border-y border-[#C9A84C]/25">
          {items.map((item) => (
            <details key={item.question} className="group">
              <summary className="flex items-center justify-between gap-6 py-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden font-semibold text-[#0B1527] hover:text-[#806419] focus:outline-none focus-visible:text-[#806419] focus-visible:underline">
                {item.question}
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 shrink-0 text-[#806419] transition-transform duration-200 group-open:rotate-45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </summary>
              <p className="pb-6 pr-10 text-slate-600 leading-relaxed">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </section>
  );
};

export default Faq;
