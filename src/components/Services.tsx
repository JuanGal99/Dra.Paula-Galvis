import type { JSX } from "react";
import { useTranslation } from "react-i18next";

// Claves de servicios
const services = [
  "ortodoncia",
  "estetica",
  "armonizacion",
  "rehabilitacion",
  "general",
  "turismo",
] as const;

type ServiceKey = (typeof services)[number];

const TOOTH_PATH =
  "M12 5.5C10.9 4.9 9.4 4 8 4 5.9 4 4 5.25 4 9c0 4.9 1.06 8.4 2.67 10.54.57.75 1.97.52 2.57-.24.4-.5.82-1.44 1.26-2.8.29-.77.89-1.5 1.5-1.5s1.21.74 1.5 1.5c.44 1.36.86 2.3 1.26 2.8.6.76 2 .99 2.57.24C18.94 17.4 20 13.9 20 9c0-3.74-1.9-5-4-5-1.42 0-2.92.91-4 1.5z";

// Iconos de línea sobre cuadrícula de 24: el trazo y las puntas se definen en el <svg>
const serviceIcons: Record<ServiceKey, JSX.Element> = {
  // Diente con destello
  estetica: (
    <>
      <path d={TOOTH_PATH} transform="translate(-1.6 3.4) scale(.82)" strokeWidth="1.83" />
      <path d="M18.3 2c.4 2.3 1.4 3.4 3.7 3.8-2.3.4-3.3 1.5-3.7 3.8-.4-2.3-1.4-3.4-3.7-3.8 2.3-.4 3.3-1.5 3.7-3.8z" />
    </>
  ),
  // Perfil con destello en la mejilla
  armonizacion: (
    <>
      <path d="M9.2 21.5v-2.2l-1.5.2c-1.7.2-2.9-.8-2.9-2.5v-1.8l-1.300-.4c-.5-.2-.7-.7-.4-1.100l1.700-2.900c.3-3.800 3.300-7.800 8.700-7.800 4.400 0 7.300 3 7.300 7 0 2.600-1.100 4.500-2.800 6v5.500" />
      <path d="M12.500 10.300c.3 1.500 1 2.200 2.400 2.500-1.400.3-2.100 1-2.400 2.500-.3-1.500-1-2.200-2.400-2.500 1.400-.3 2.100-1 2.400-2.500z" />
    </>
  ),
  // Diente con bracket y arco de alambre
  ortodoncia: (
    <>
      <path d={TOOTH_PATH} />
      <rect x="9.25" y="7.75" width="5.5" height="5.5" rx="1.1" />
      <path d="M4.1 10.5h5.15M14.75 10.5h5.15" />
    </>
  ),
  // Implante: corona, pilar y rosca
  rehabilitacion: (
    <>
      <path d="M8.2 2.5c1.3 0 2.5.7 3.8.7s2.5-.7 3.8-.7c1.7 0 2.7 1.2 2.7 3 0 2-.7 3.9-1.9 4.7H7.4C6.2 9.400 5.500 7.500 5.500 5.500c0-1.800 1-3 2.700-3z" />
      <path d="M9.800 10.200v2.300h4.400v-2.300" />
      <path d="M8.200 15h7.600" />
      <path d="M9 17.600h6" />
      <path d="M10 20.100h4" />
      <path d="M11.300 22.200h1.400" />
    </>
  ),
  // Diente sano
  general: (
    <>
      <path d={TOOTH_PATH} />
      <path d="M8.800 9.800l2.300 2.300 4-4.300" />
    </>
  ),
  // Avión
  turismo: (
    <path d="M17.800 19.200 16 11l3.500-3.500C21 6 21.500 4 21 3c-1-.5-3 0-4.500 1.500L13 8 4.800 6.200c-.5-.1-.9.1-1.100.5l-.3.5c-.2.5-.1 1 .3 1.300L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.500 5.300c.3.4.8.5 1.300.3l.5-.2c.4-.3.6-.7.5-1.200z" />
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
          {services.map((service) => {
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

                {/* Ícono + Título en la misma línea */}
                <div className="flex items-center gap-4 mb-4">
                  <svg
                    className="shrink-0 w-9 h-9 text-[#C9A84C]"
                    aria-hidden="true"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                  >
                    {serviceIcons[service]}
                  </svg>

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
