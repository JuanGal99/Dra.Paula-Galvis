import type { JSX } from "react";
import { useTranslation } from "react-i18next";

// Claves de servicios
const services = [
  "estetica",
  "armonizacion",
  "ortodoncia",
  "rehabilitacion",
  "general",
  "turismo",
] as const;

type ServiceKey = (typeof services)[number];

// Iconos SVG más acordes por servicio
const serviceIcons: Record<ServiceKey, JSX.Element> = {
  // Ícono de diente para Estética Dental
  estetica: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M12 3C9.5 3 7.5 4.5 7 6.5c-.3 1.2-.5 2.5-.6 3.7C6.2 12.5 6 14 5 16c-.5 1.2-.8 2.5-.5 3.5.3 1 1.2 1.5 2 1.5.8 0 1.5-.5 2-1.2L12 17l3.5 2.8c.5.7 1.2 1.2 2 1.2.8 0 1.7-.5 2-1.5.3-1 0-2.3-.5-3.5-1-2-1.2-3.5-1.4-5.8-.1-1.2-.3-2.5-.6-3.7C16.5 4.5 14.5 3 12 3z"
    />
  ),
  armonizacion: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  ),
  ortodoncia: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
  ),
  rehabilitacion: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
      d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
  ),
  general: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
  ),
  turismo: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  ),
};

/**
 * Componente Services (Servicios):
 * Tarjetas premium sobre fondo navy oscuro.
 * Cada tarjeta tiene ícono dorado único, título, descripción y lista de beneficios.
 */
const Services = () => {
  const { t } = useTranslation("services");

  return (
    <section
      id="services"
      className="bg-[#0B1527] text-white px-6 py-24 scroll-mt-20"
      aria-labelledby="services-heading"
      role="region"
    >
      <div className="max-w-7xl mx-auto">

        {/* Encabezado de sección — texto desde i18n para respetar el idioma activo */}
        <div className="text-center mb-16">
          <span className="inline-block mb-4 text-xs font-semibold tracking-[0.2em] uppercase text-[#C9A84C]">
            — {t("sectionLabel")}
          </span>
          <h2
            id="services-heading"
            className="text-4xl md:text-5xl font-extrabold text-white tracking-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {t("title")}
          </h2>
          {/* Línea dorada decorativa */}
          <div className="mt-5 mx-auto w-16 h-[3px] bg-gradient-to-r from-[#C9A84C] to-[#E0BC6A] rounded-full" />
        </div>

        {/* Grid de tarjetas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, idx) => {
            const title = t(`${service}.title`);
            const description = t(`${service}.description`);
            const benefits = t(`${service}.benefits`, {
              returnObjects: true,
            }) as string[];

            return (
              <article
                key={service}
                className="relative bg-[#111D35] rounded-2xl p-8 flex flex-col border border-[#C9A84C]/15 group overflow-hidden
                  transition-all duration-300 ease-out
                  hover:border-[#C9A84C]/45
                  hover:shadow-[0_12px_48px_-8px_rgba(201,168,76,0.22)]
                  hover:-translate-y-1.5"
              >
                {/* Barra superior dorada animada */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#C9A84C] to-[#E0BC6A] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                {/* Número de tarjeta */}
                <span className="absolute top-5 right-5 text-xs font-bold text-[#C9A84C]/30 tracking-widest select-none">
                  0{idx + 1}
                </span>

                {/* Ícono + Título en la misma línea */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-[#C9A84C]/10 border border-[#C9A84C]/20 flex items-center justify-center group-hover:bg-[#C9A84C]/20 transition-colors duration-300">
                    <svg
                      className="w-5 h-5 text-[#C9A84C]"
                      aria-hidden="true"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      {serviceIcons[service]}
                    </svg>
                  </div>

                  {/* Título */}
                  <h3 className="text-lg font-bold text-white group-hover:text-[#C9A84C] transition-colors duration-300 leading-snug">
                    {title}
                  </h3>
                </div>

                {/* Descripción — text-white/65 cumple ratio WCAG AA */}
                <p className="text-white/65 text-sm mb-6 leading-relaxed font-light">
                  {description}
                </p>

                {/* Línea separadora */}
                <div className="h-px w-full bg-[#C9A84C]/10 mb-6 group-hover:bg-[#C9A84C]/25 transition-colors duration-300" />

                {/* Lista de beneficios */}
                <ul className="space-y-3 mt-auto">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center text-sm text-white/75 font-light gap-3">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#C9A84C]/10 flex items-center justify-center">
                        <svg
                          aria-hidden="true"
                          className="w-3 h-3 text-[#C9A84C]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
