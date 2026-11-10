import { useTranslation } from "react-i18next";

/**
 * Componente About (Acerca de):
 * Presenta la doctora/clínica con foto y puntos clave.
 * Paleta: fondo marfil #FAFAF8, acentos dorados #C9A84C.
 */
const About = () => {
  const { t } = useTranslation("about");

  return (
    <section
      id="about"
      className="bg-[#FAFAF8] text-[#1A1A2E] px-6 py-24 scroll-mt-20"
      aria-labelledby="about-heading"
      role="region"
    >
      <div className="max-w-6xl mx-auto">
        <div className="lg:flex lg:items-center lg:gap-16">

          {/* Contenido textual */}
          <div className="lg:w-1/2 mb-12 lg:mb-0">

            <h2
              id="about-heading"
              className="text-4xl md:text-5xl font-semibold mb-6 text-[#0B1527] tracking-tight leading-[1.1]"
            >
              {t("title")}
            </h2>

            <p className="text-lg leading-relaxed text-slate-600 mb-8 font-light">
              {t("description")}
            </p>

            {/* Puntos destacados con ícono dorado */}
            <ul className="space-y-4 text-left">
              {[t("point1"), t("point2"), t("point3")].map((point, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-[#C9A84C]/15 flex items-center justify-center">
                    <svg
                      aria-hidden="true"
                      className="w-3.5 h-3.5 text-[#C9A84C]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-base text-slate-700 font-medium">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Foto con decoración dorada */}
          <div className="lg:w-1/2 max-w-lg mx-auto relative isolate">
            {/* Sombra decorativa detrás */}
            <div className="absolute inset-0 bg-[#C9A84C]/20 rounded-2xl transform translate-x-4 translate-y-4 -z-10" />
            {/* Borde dorado decorativo en esquina */}
            <div className="absolute -top-3 -left-3 w-16 h-16 border-t-2 border-l-2 border-[#C9A84C] rounded-tl-xl -z-0 pointer-events-none" />
            <div className="absolute -bottom-3 -right-3 w-16 h-16 border-b-2 border-r-2 border-[#C9A84C] rounded-br-xl -z-0 pointer-events-none" />
            <img
              src="/images/team.webp"
              srcSet="/images/team-640.webp 640w, /images/team.webp 1024w"
              sizes="(min-width: 1024px) 512px, calc(100vw - 48px)"
              alt={t("imageAlt")}
              className="relative rounded-2xl shadow-2xl object-cover w-full border-2 border-[#C9A84C]/20"
              loading="lazy"
              width={1024}
              height={790}
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
