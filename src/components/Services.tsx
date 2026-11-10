import type { JSX } from "react";
import { useTranslation } from "react-i18next";
import SectionHeading from "./SectionHeading";

// Claves de servicios: la primera es su especialidad y se destaca sobre las demás
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
  // Diente con bracket y arco de alambre
  ortodoncia: (
    <>
      <path d={TOOTH_PATH} />
      <rect x="9.25" y="7.75" width="5.5" height="5.5" rx="1.1" />
      <path d="M4.1 10.5h5.15M14.75 10.5h5.15" />
    </>
  ),
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
      <path d="M9.2 21.5v-2.2l-1.5.2c-1.7.2-2.9-.8-2.9-2.5v-1.8l-1.3-.4c-.5-.2-.7-.7-.4-1.1l1.7-2.9c.3-3.8 3.3-7.8 8.7-7.8 4.4 0 7.3 3 7.3 7 0 2.6-1.1 4.5-2.8 6v5.5" />
      <path d="M12.5 10.3c.3 1.5 1 2.2 2.4 2.5-1.4.3-2.1 1-2.4 2.5-.3-1.5-1-2.2-2.4-2.5 1.4-.3 2.1-1 2.4-2.5z" />
    </>
  ),
  // Implante: corona, pilar y rosca
  rehabilitacion: (
    <>
      <path d="M8.2 2.5c1.3 0 2.5.7 3.8.7s2.5-.7 3.8-.7c1.7 0 2.7 1.2 2.7 3 0 2-.7 3.9-1.9 4.7H7.4C6.2 9.4 5.5 7.5 5.5 5.5c0-1.8 1-3 2.7-3z" />
      <path d="M9.8 10.2v2.3h4.4v-2.3" />
      <path d="M8.2 15h7.6" />
      <path d="M9 17.6h6" />
      <path d="M10 20.1h4" />
      <path d="M11.3 22.2h1.4" />
    </>
  ),
  // Diente sano
  general: (
    <>
      <path d={TOOTH_PATH} />
      <path d="M8.8 9.8l2.3 2.3 4-4.3" />
    </>
  ),
  // Avión
  turismo: (
    <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
  ),
};

const ServiceIcon = ({ service, className }: { service: ServiceKey; className: string }) => (
  <svg
    className={`shrink-0 text-[#C9A84C] ${className}`}
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
);

/**
 * Servicios sobre fondo navy: la ortodoncia ocupa un bloque propio
 * y el resto se lista debajo, separado por líneas finas en lugar de tarjetas.
 */
const Services = () => {
  const { t } = useTranslation("services");
  const [specialty, ...others] = services;
  const benefitsOf = (service: ServiceKey) =>
    t(`${service}.benefits`, { returnObjects: true }) as string[];

  return (
    <section
      id="services"
      className="bg-[#0B1527] text-white px-6 py-24 scroll-mt-20"
      aria-labelledby="services-heading"
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeading id="services-heading" title={t("title")} lead={t("lead")} tone="dark" />

        {/* Especialidad */}
        <article className="grid gap-8 md:grid-cols-[auto_1fr_1fr] md:items-start border-y border-[#C9A84C]/35 py-10">
          <ServiceIcon service={specialty} className="w-14 h-14" />
          <div>
            <p className="text-sm font-semibold text-[#C9A84C]">{t("specialtyLabel")}</p>
            <h3 className="mt-2 font-display text-3xl md:text-4xl font-semibold">{t(`${specialty}.title`)}</h3>
            <p className="mt-4 text-white/75 leading-relaxed max-w-md">{t(`${specialty}.description`)}</p>
          </div>
          <ul className="space-y-3 md:pt-8">
            {benefitsOf(specialty).map((benefit) => (
              <li key={benefit} className="flex items-center gap-3 text-white/85">
                <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] shrink-0" />
                {benefit}
              </li>
            ))}
          </ul>
        </article>

        {/* Demás servicios */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-12 mt-12">
          {others.map((service) => (
            <article key={service}>
              <div className="flex items-center gap-3">
                <ServiceIcon service={service} className="w-8 h-8" />
                <h3 className="text-lg font-semibold">{t(`${service}.title`)}</h3>
              </div>
              <p className="mt-3 text-white/70 text-[15px] leading-relaxed">{t(`${service}.description`)}</p>
              <p className="mt-3 text-sm text-white/55 leading-relaxed">{benefitsOf(service).join(", ")}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
