import { useTranslation } from "react-i18next";

// Type guard para arrays de strings
function isStringArray(value: unknown): value is string[] {
  return (
    Array.isArray(value) && value.every((item) => typeof item === "string")
  );
}

/**
 * Componente TourismDental (Turismo Dental):
 * Destaca el enfoque de turismo médico en Colombia.
 * Muestra información sobre el proceso y fotos de destinos turísticos.
 * Los testimonios de pacientes fueron eliminados.
 */
const TourismDental = () => {
  const { t } = useTranslation("tourismDental");

  const servicesIncluded = t("servicesIncluded", { returnObjects: true });
  const processSteps = t("processSteps", { returnObjects: true });

  return (
    <section
      id="tourism"
      className="bg-[#060F1E] text-white px-6 py-24 scroll-mt-20"
      aria-labelledby="tourism-heading"
      role="region"
    >
      <div className="max-w-6xl mx-auto">

        {/* Encabezado */}
        <div className="text-center mb-16">
          <span className="inline-block mb-4 text-xs font-semibold tracking-[0.2em] uppercase text-[#C9A84C]">
            — {t("sectionLabel")}
          </span>
          <h2
            id="tourism-heading"
            className="text-4xl md:text-5xl font-extrabold mb-5 tracking-tight text-white"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {t("title")}
          </h2>
          <div className="w-16 h-[3px] bg-gradient-to-r from-[#C9A84C] to-[#E0BC6A] mx-auto rounded-full" />
        </div>

        {/* Tarjetas info — Por qué Colombia + Servicios incluidos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">

          {/* Por qué Colombia */}
          <article className="bg-white/5 p-8 rounded-2xl border border-[#C9A84C]/20 hover:border-[#C9A84C]/40 transition-colors duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-[#C9A84C]/15 rounded-xl border border-[#C9A84C]/25 flex items-center justify-center flex-shrink-0">
                <svg aria-hidden="true" className="w-6 h-6 text-[#C9A84C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                    d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.800 6.200c-.5-.1-.9.1-1.100.5l-.3.5c-.2.5-.1 1 .3 1.300L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.500 5.300c.3.4.8.5 1.300.3l.5-.2c.4-.3.6-.7.5-1.200z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white">{t("whyTitle")}</h3>
            </div>
            <p className="text-white/65 text-base leading-relaxed font-light">{t("whyDescription")}</p>
          </article>

          {/* Servicios incluidos */}
          <article className="bg-white/5 p-8 rounded-2xl border border-[#C9A84C]/20 hover:border-[#C9A84C]/40 transition-colors duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-[#C9A84C]/15 rounded-xl border border-[#C9A84C]/25 flex items-center justify-center flex-shrink-0">
                <svg aria-hidden="true" className="w-6 h-6 text-[#C9A84C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white">{t("servicesIncludedTitle")}</h3>
            </div>
            <ul className="space-y-3 text-white/65 text-base font-light">
              {isStringArray(servicesIncluded)
                ? servicesIncluded.map((service, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-[#C9A84C] font-bold mt-0.5 flex-shrink-0">•</span>
                    {service}
                  </li>
                ))
                : null}
            </ul>
          </article>
        </div>

        {/* Galería de destinos turísticos */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8 text-white/90">
            {t("destinosTitle")}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

            {[
              { src: "/images/turismo-1.webp", key: "cartagena" },
              { src: "/images/turismo-2.webp", key: "sanAndres" },
              { src: "/images/turismo-3.webp", key: "chicamocha" },
              { src: "/images/turismo-4.webp", key: "mompox" },
            ].map((place) => (
              <div key={place.key} className="group relative overflow-hidden rounded-2xl shadow-lg border border-[#C9A84C]/10 hover:border-[#C9A84C]/30 transition-colors duration-300">
                <img
                  src={place.src}
                  alt={t(`destinations.${place.key}.name`)}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-72 object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1527]/85 via-[#0B1527]/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-5">
                  <p className="text-white text-base font-semibold">{t(`destinations.${place.key}.name`)}</p>
                  <p className="text-white/70 text-xs mt-0.5">{t(`destinations.${place.key}.description`)}</p>
                </div>
              </div>
            ))}

          </div>
        </div>

        {/* Proceso paso a paso */}
        <article className="bg-white text-[#0B1527] p-10 rounded-3xl shadow-2xl max-w-4xl mx-auto relative overflow-hidden border border-[#C9A84C]/20">
          {/* Decoración dorada de fondo */}
          <div className="absolute top-0 right-0 w-56 h-56 bg-[#C9A84C]/5 rounded-full -mr-28 -mt-28 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#C9A84C]/5 rounded-full -ml-20 -mb-20 pointer-events-none" />

          <h3
            className="text-2xl md:text-3xl font-bold mb-8 text-center relative z-10 text-[#0B1527]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {t("processTitle")}
          </h3>

          <ol className="relative border-l-2 border-[#C9A84C]/30 ml-4 space-y-8 z-10">
            {isStringArray(processSteps)
              ? processSteps.map((step, i) => (
                <li key={i} className="pl-8 relative">
                  <span className="absolute w-8 h-8 bg-[#C9A84C] rounded-full flex items-center justify-center text-[#0B1527] font-bold text-sm -left-[17px] ring-4 ring-white shadow-md">
                    {i + 1}
                  </span>
                  <p className="text-base text-slate-700 pt-1 font-light leading-relaxed">{step}</p>
                </li>
              ))
              : null}
          </ol>
        </article>

      </div>
    </section>
  );
};

export default TourismDental;
