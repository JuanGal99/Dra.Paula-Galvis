import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

const EMPTY_FORM = {
  _gotcha: "", // Campo trampa para robots; Formspree descarta los envíos que lo traen lleno
  name: "",
  email: "",
  phone: "",
  country: "",
  treatment: "",
  message: "",
};

const TREATMENTS = [
  "ortodoncia",
  "estetica",
  "armonizacion",
  "rehabilitacion",
  "general",
  "turismo",
] as const;

const COUNTRIES = [
  "US", "CA", "GB", "ES", "MX", "PR", "DO", "PA", "CR", "EC", "PE", "CL", "AR", "CO", "OTHER",
] as const;

type ContactProps = {
  onOpenPrivacyPolicy: () => void;
};

// Se envía con cada mensaje como prueba de qué política aceptó el titular
const PRIVACY_POLICY_VERSION = "2026-11";

/**
 * Componente Contact (Contacto):
 * Panel izquierdo navy con info de contacto, panel derecho con formulario.
 * Paleta: navy #0B1527 + acentos dorados #C9A84C.
 * Botón flotante de WhatsApp en la esquina inferior derecha.
 */
const Contact = ({ onOpenPrivacyPolicy }: ContactProps) => {
  const { t, i18n } = useTranslation("contact");

  // Estado del formulario
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [hasConsented, setHasConsented] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [errors, setErrors] = useState<{ email?: string; country?: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  // Oculta WhatsApp mientras el botón de enviar pasa por la franja inferior donde flota
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const [isSubmitUnderWhatsApp, setIsSubmitUnderWhatsApp] = useState(false);

  useEffect(() => {
    const submitButton = submitButtonRef.current;
    if (!submitButton) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsSubmitUnderWhatsApp(entry.isIntersecting),
      { rootMargin: "-85% 0px 0px 0px" }
    );
    observer.observe(submitButton);

    return () => {
      observer.disconnect();
      setIsSubmitUnderWhatsApp(false);
    };
  }, [submitted]);

  // Validación básica de email
  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Envío del formulario a Formspree
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: typeof errors = {};
    if (!formData.country) newErrors.country = "validation.countryRequired";
    if (!validateEmail(formData.email))
      newErrors.email = "validation.invalidEmail";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setSubmitError(null);
    setIsSending(true);

    try {
      const response = await fetch("https://formspree.io/f/mkgqpqey", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          autorizacion_datos: `${t("form.consent")} ${t("form.consentLink")}`,
          fecha_autorizacion: new Date().toISOString(),
          version_politica: PRIVACY_POLICY_VERSION,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData(EMPTY_FORM);
        setHasConsented(false);
      } else {
        setSubmitError("form.errorSend");
      }
    } catch (error) {
      console.error("Error:", error);
      setSubmitError("form.errorConnection");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section
      id="contact"
      className="bg-[#F3F2EF] text-[#1A1A2E] px-6 py-24 scroll-mt-20"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-6xl mx-auto">

        {/* Encabezado */}
        <div className="text-center mb-14">
          <span className="inline-block mb-4 text-xs font-semibold tracking-[0.2em] uppercase text-[#806419]">
            — {t("sectionLabel")}
          </span>
          <h2
            id="contact-heading"
            className="text-4xl md:text-5xl font-extrabold text-[#0B1527] tracking-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {t("title")}
          </h2>
          <div className="w-16 h-[3px] bg-gradient-to-r from-[#C9A84C] to-[#E0BC6A] mx-auto mt-5 rounded-full" />
        </div>

        {/* Contenedor principal — panel izquierdo + formulario */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-[#C9A84C]/10 flex flex-col md:flex-row">

          {/* PANEL IZQUIERDO — información de contacto (navy) */}
          <div className="bg-[#0B1527] text-white p-10 md:p-14 md:w-2/5 flex flex-col justify-between relative overflow-hidden">
            {/* Decoraciones de fondo */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#C9A84C]/5 rounded-full -mr-32 -mt-32 blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#C9A84C]/5 rounded-full -ml-32 -mb-32 blur-2xl pointer-events-none" />

            <div className="relative z-10 space-y-10">

              {/* Dirección */}
              <div>
                <h3 className="text-sm font-semibold tracking-widest uppercase text-[#C9A84C] mb-3">
                  {t("contactInfo.title")}
                </h3>
                <p className="text-base flex items-start gap-3 text-white/80">
                  <svg aria-hidden="true" className="w-5 h-5 mt-0.5 flex-shrink-0 text-[#C9A84C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {t("contactInfo.address")}
                </p>
              </div>

              {/* Teléfono */}
              <div>
                <h3 className="text-sm font-semibold tracking-widest uppercase text-[#C9A84C] mb-3">
                  {t("contactInfo.phoneTitle")}
                </h3>
                <a
                  href={`tel:${t("contactInfo.phone").replace(/\s/g, "")}`}
                  className="text-base hover:text-[#C9A84C] transition flex items-center gap-3 text-white/80"
                >
                  <svg aria-hidden="true" className="w-5 h-5 flex-shrink-0 text-[#C9A84C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {t("contactInfo.phone")}
                </a>
              </div>

              {/* Email */}
              <div>
                <h3 className="text-sm font-semibold tracking-widest uppercase text-[#C9A84C] mb-3">
                  {t("contactInfo.emailTitle")}
                </h3>
                <a
                  href={`mailto:${t("contactInfo.email")}`}
                  className="text-base hover:text-[#C9A84C] transition flex items-center gap-3 text-white/80"
                >
                  <svg aria-hidden="true" className="w-5 h-5 flex-shrink-0 text-[#C9A84C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {t("contactInfo.email")}
                </a>
              </div>
            </div>

            {/* Separador dorado + redes sociales */}
            <div className="relative z-10 mt-12 pt-8 border-t border-[#C9A84C]/25">
              <h3 className="text-sm font-semibold tracking-widest uppercase text-[#C9A84C] mb-5">
                {t("contactInfo.socialTitle")}
              </h3>
              <a
                href="https://instagram.com/dragalvis"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-white/80 hover:text-[#C9A84C] transition-colors duration-200"
                aria-label="Instagram"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  className="w-5 h-5"
                  aria-hidden="true"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37a4 4 0 1 1-4.94-4.94 4 4 0 0 1 4.94 4.94z" />
                  <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" strokeLinecap="round" strokeWidth="2" />
                </svg>
                <span className="text-sm font-medium">Dra. Paula Galvis</span>
              </a>
            </div>
          </div>

          {/* PANEL DERECHO — formulario */}
          <div className="p-10 md:p-14 md:w-3/5 bg-white">
            {submitted ? (
              /* Mensaje de éxito */
              <div className="h-full flex flex-col items-center justify-center text-center gap-4">
                <div className="w-20 h-20 bg-[#C9A84C]/10 text-[#C9A84C] rounded-full flex items-center justify-center">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#0B1527]">{t("form.successTitle")}</h3>
                <p className="text-slate-600 text-base max-w-xs">{t("form.successMessage")}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">

                {/* Campo trampa: invisible para personas, los robots suelen llenarlo */}
                <div aria-hidden="true" className="absolute -left-[9999px]">
                  <label htmlFor="company-website">Website</label>
                  <input
                    type="text"
                    name="_gotcha"
                    id="company-website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData._gotcha}
                    onChange={handleChange}
                  />
                </div>

                {/* Nombre */}
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-[#0B1527] mb-2 tracking-wide">
                    {t("form.name")}
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#F3F2EF] border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#C9A84C]/50 focus:border-[#C9A84C] transition-colors outline-none text-sm"
                    placeholder={t("form.placeholders.name")}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-[#0B1527] mb-2 tracking-wide">
                      {t("form.email")}
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-[#F3F2EF] border rounded-xl focus:ring-2 focus:ring-[#C9A84C]/50 focus:border-[#C9A84C] transition-colors outline-none text-sm ${errors.email ? "border-red-400 focus:ring-red-400/50" : "border-slate-200"
                        }`}
                      placeholder={t("form.placeholders.email")}
                    />
                    {errors.email && (
                      <p className="text-red-700 mt-1.5 text-xs font-semibold" role="alert">{t(errors.email)}</p>
                    )}
                  </div>

                  {/* País */}
                  <div>
                    <label htmlFor="country" className="block text-sm font-semibold text-[#0B1527] mb-2 tracking-wide">
                      {t("form.country")}
                    </label>
                    <select
                      id="country"
                      name="country"
                      required
                      value={formData.country}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-[#F3F2EF] border rounded-xl focus:ring-2 focus:ring-[#C9A84C]/50 focus:border-[#C9A84C] transition-colors outline-none text-sm ${errors.country ? "border-red-400 focus:ring-red-400/50" : "border-slate-200"
                        }`}
                    >
                      <option value="">{t("form.selectCountry")}</option>
                      {COUNTRIES.map((country) => (
                        <option key={country} value={country}>
                          {t(`form.countries.${country}`)}
                        </option>
                      ))}
                    </select>
                    {errors.country && (
                      <p className="text-red-700 mt-1.5 text-xs font-semibold" role="alert">{t(errors.country)}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  {/* Teléfono (opcional, formato internacional) */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-[#0B1527] mb-2 tracking-wide">
                      {t("form.phone")}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      autoComplete="tel"
                      pattern="\+?[0-9\s\(\)\-]{7,20}"
                      title={t("form.invalidPhone")}
                      aria-describedby="phone-hint"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#F3F2EF] border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#C9A84C]/50 focus:border-[#C9A84C] transition-colors outline-none text-sm"
                      placeholder={t("form.placeholders.phone")}
                    />
                    <p id="phone-hint" className="text-slate-600 mt-1.5 text-xs">{t("form.phoneHint")}</p>
                  </div>

                  {/* Tratamiento de interés (opcional) */}
                  <div>
                    <label htmlFor="treatment" className="block text-sm font-semibold text-[#0B1527] mb-2 tracking-wide">
                      {t("form.treatment")}
                    </label>
                    <select
                      id="treatment"
                      name="treatment"
                      value={formData.treatment}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#F3F2EF] border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#C9A84C]/50 focus:border-[#C9A84C] transition-colors outline-none text-sm"
                    >
                      <option value="">{t("form.selectTreatment")}</option>
                      {TREATMENTS.map((treatment) => (
                        <option key={treatment} value={treatment}>
                          {t(`${treatment}.title`, { ns: "services" })}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Mensaje */}
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-[#0B1527] mb-2 tracking-wide">
                    {t("form.message")}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#F3F2EF] border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#C9A84C]/50 focus:border-[#C9A84C] transition-colors outline-none resize-none text-sm"
                    placeholder={t("form.placeholders.message")}
                  />
                </div>

                {/* Autorización de tratamiento de datos (Ley 1581 de 2012) — sin marcar por defecto */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="data-consent"
                    required
                    checked={hasConsented}
                    onChange={(e) => setHasConsented(e.target.checked)}
                    className="mt-0.5 w-5 h-5 shrink-0 accent-[#806419]"
                  />
                  <p className="text-xs leading-relaxed text-slate-600">
                    <label htmlFor="data-consent">{t("form.consent")}</label>{" "}
                    <button
                      type="button"
                      onClick={onOpenPrivacyPolicy}
                      className="underline font-semibold text-[#0B1527] hover:text-[#806419]"
                    >
                      {t("form.consentLink")}
                    </button>
                    .
                  </p>
                </div>

                {submitError && (
                  <p className="text-red-700 text-sm font-semibold" role="alert">{t(submitError)}</p>
                )}

                {/* Botón submit — dorado */}
                <button
                  ref={submitButtonRef}
                  type="submit"
                  disabled={isSending}
                  className="w-full bg-[#C9A84C] text-[#0B1527] font-bold px-6 py-4 rounded-xl hover:bg-[#E0BC6A] hover:shadow-[0_8px_30px_-4px_rgba(201,168,76,0.4)] focus:ring-4 focus:ring-[#C9A84C]/40 transition-all duration-300 disabled:opacity-70 flex justify-center items-center gap-2 tracking-wide text-sm"
                >
                  {isSending ? (
                    <>
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      {t("form.sending")}
                    </>
                  ) : (
                    t("form.submit")
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Botón flotante de WhatsApp — mensaje traducido según idioma activo */}
      <a
        href={`https://wa.me/573178870588?text=${encodeURIComponent(t("whatsappMessage"))}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t("whatsappLabel")}
        onClick={() => navigator.sendBeacon(`/api/whatsapp-clicks?lang=${i18n.language}`)}
        className={`fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 hover:shadow-[0_8px_30px_-4px_rgba(34,197,94,0.5)] transition-all duration-300 z-50 ${isSubmitUnderWhatsApp ? "max-xl:invisible max-xl:opacity-0" : ""}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-7 h-7">
          <path d="M20.52 3.48A11.79 11.79 0 0 0 12 0C5.373 0 0 5.373 0 12a11.958 11.958 0 0 0 2.11 6.47L0 24l5.7-2.11A11.932 11.932 0 0 0 12 24c6.627 0 12-5.373 12-12a11.8 11.8 0 0 0-3.48-8.52zM12 22a9.955 9.955 0 0 1-5.26-1.56l-.38-.23-3.39 1.25 1.26-3.31-.24-.38A9.965 9.965 0 0 1 2 12c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10zm5.37-7.42c-.29-.14-1.72-.85-1.98-.95-.26-.1-.45-.14-.64.14-.2.28-.77.95-.95 1.15-.18.2-.35.22-.64.07-.29-.15-1.22-.45-2.32-1.44-.86-.77-1.44-1.73-1.61-2.02-.17-.29-.02-.44.13-.59.14-.15.29-.35.43-.52.14-.17.17-.29.26-.48.08-.2.04-.37-.02-.52-.07-.14-.64-1.54-.88-2.1-.23-.55-.46-.48-.64-.49-.16 0-.35-.01-.54-.01s-.52.07-.79.37c-.27.3-1.04 1.02-1.04 2.5s1.07 2.9 1.22 3.1c.15.2 2.1 3.21 5.08 4.5.71.31 1.26.49 1.69.63.71.23 1.35.2 1.86.12.57-.09 1.72-.7 1.97-1.37.24-.66.24-1.22.17-1.34-.06-.12-.25-.19-.54-.33z" />
        </svg>
      </a>
    </section>
  );
};

export default Contact;
