import type { MouseEvent, RefObject } from "react";
import { useTranslation } from "react-i18next";

type PolicySection = {
  heading: string;
  paragraphs?: string[];
  items?: string[];
};

type PrivacyPolicyProps = {
  dialogRef: RefObject<HTMLDialogElement | null>;
};

/**
 * Política de tratamiento de datos (Ley 1581 de 2012) en un diálogo nativo,
 * para que el visitante la lea sin perder lo que ya escribió en el formulario.
 */
const PrivacyPolicy = ({ dialogRef }: PrivacyPolicyProps) => {
  const { t } = useTranslation("privacy");
  const sections = t("sections", { returnObjects: true }) as PolicySection[];

  // Un clic en el fondo oscuro cae sobre el propio <dialog>, no sobre su contenido
  const closeOnBackdropClick = (e: MouseEvent<HTMLDialogElement>) => {
    if (e.target === e.currentTarget) e.currentTarget.close();
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="privacy-title"
      tabIndex={-1}
      onClick={closeOnBackdropClick}
      className="outline-none m-auto w-[calc(100%-2rem)] max-w-2xl max-h-[85vh] rounded-2xl p-0 bg-white text-[#1A1A2E] shadow-2xl backdrop:bg-[#0B1527]/70"
    >
      <div className="p-6 sm:p-10">
        <h2
          id="privacy-title"
          className="text-2xl font-bold text-[#0B1527]"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {t("title")}
        </h2>
        <p className="mt-1 text-xs text-slate-500">{t("effectiveDate")}</p>
        <p className="mt-5 text-sm leading-relaxed text-slate-700">{t("intro")}</p>

        {sections.map((section) => (
          <section key={section.heading} className="mt-6">
            <h3 className="text-sm font-bold text-[#0B1527]">{section.heading}</h3>
            {section.paragraphs?.map((paragraph) => (
              <p key={paragraph} className="mt-2 text-sm leading-relaxed text-slate-700">
                {paragraph}
              </p>
            ))}
            {section.items && (
              <ul className="mt-2 list-disc pl-5 space-y-1 text-sm leading-relaxed text-slate-700">
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </section>
        ))}

        <form method="dialog" className="mt-8">
          <button
            type="submit"
            className="w-full bg-[#0B1527] text-white font-semibold px-6 py-3 rounded-xl hover:bg-[#111D35] focus:ring-4 focus:ring-[#C9A84C]/40 transition-colors text-sm"
          >
            {t("close")}
          </button>
        </form>
      </div>
    </dialog>
  );
};

export default PrivacyPolicy;
