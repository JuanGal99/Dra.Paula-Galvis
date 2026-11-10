import { useState } from "react";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";

/**
 * Componente Navbar:
 * Representa la barra de navegación superior.
 * Incluye el logo, los enlaces de anclaje a las secciones,
 * el selector de idioma y el menú responsivo para móviles.
 * Paleta: fondo navy #0B1527, acentos dorados #C9A84C.
 */
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useTranslation("navbar");
  const currentLang = i18n.language as "en" | "es";

  const menuItems = [
    { key: "about", label: t("about") },
    { key: "services", label: t("services") },
    { key: "tourism", label: t("tourism") },
    { key: "contact", label: t("contact") },
  ];

  const changeLanguage = (lng: "en" | "es") => {
    i18n.changeLanguage(lng);
    setMenuOpen(false);
  };

  return (
    <nav
      className="fixed top-0 left-0 w-full bg-[#0B1527]/97 backdrop-blur-md border-b border-[#C9A84C]/15 z-50"
      role="navigation"
      aria-label={t("mainNavigation")}
    >
      {/* Acceso rápido para lectores de pantalla */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only absolute top-2 left-2 bg-[#C9A84C] text-[#0B1527] px-4 py-2 rounded-md z-50 font-semibold"
      >
        {t("skipToContent")}
      </a>

      <div className="max-w-7xl mx-auto h-[82px] px-6 lg:px-8 flex items-center justify-between">

        {/* LOGO */}
        <a
          href="#hero"
          className="flex items-center shrink-0 pr-4"
          aria-label={t("goHome")}
        >
          <img
            src="/logo.webp"
            alt="Paula Galvis"
            width={420}
            height={525}
            className="h-[155px] sm:h-[165px] lg:h-[175px] w-auto object-contain select-none mix-blend-lighten brightness-110 -translate-y-3 transition-all duration-300 hover:scale-105"
          />
        </a>

        {/* LINKS DESKTOP */}
        <div className="hidden lg:flex flex-1 justify-center">
          <ul className="flex items-center gap-9 xl:gap-11">
            {menuItems.map((item) => (
              <li key={item.key}>
                <a
                  href={`#${item.key}`}
                  className="text-white/80 text-[15px] xl:text-base font-medium relative pb-1 border-b-2 border-transparent hover:text-white hover:border-[#C9A84C] focus:outline-none focus:text-white focus:border-[#C9A84C] transition-all duration-300 tracking-wide"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* DERECHA DESKTOP — banderas + botón CTA */}
        <div className="hidden lg:flex items-center gap-4 xl:gap-5 shrink-0">
          {/* Selector de idioma */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => changeLanguage("en")}
              type="button"
              aria-label="Change language to English"
              className="rounded-full focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/70 transition-transform hover:scale-110"
            >
              <img
                src="/flags/us.svg"
                alt="English"
                className={`w-7 h-7 rounded-full transition ${currentLang === "en" ? "ring-2 ring-[#C9A84C] shadow-[0_0_8px_rgba(201,168,76,0.5)]" : "opacity-60 hover:opacity-100"
                  }`}
              />
            </button>

            <button
              onClick={() => changeLanguage("es")}
              type="button"
              aria-label="Cambiar idioma a español"
              className="rounded-full focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/70 transition-transform hover:scale-110"
            >
              <img
                src="/flags/co.svg"
                alt="Español"
                className={`w-7 h-7 rounded-full transition ${currentLang === "es" ? "ring-2 ring-[#C9A84C] shadow-[0_0_8px_rgba(201,168,76,0.5)]" : "opacity-60 hover:opacity-100"
                  }`}
              />
            </button>
          </div>

          {/* Botón CTA — borde dorado, hover relleno dorado */}
          <a
            href="#contact"
            className="inline-flex items-center justify-center border border-[#C9A84C] text-[#C9A84C] px-5 xl:px-6 py-2.5 text-sm font-semibold rounded-xl hover:bg-[#C9A84C] hover:text-[#0B1527] focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/60 transition-all duration-300 whitespace-nowrap tracking-wide"
          >
            {t("cta")}
          </a>
        </div>

        {/* MOBILE — banderas + hamburger */}
        <div className="flex items-center gap-3 lg:hidden">
          <button
            onClick={() => changeLanguage("en")}
            type="button"
            aria-label="Change language to English"
            className="rounded-full focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/70"
          >
            <img
              src="/flags/us.svg"
              alt="English"
              className={`w-6 h-6 rounded-full ${currentLang === "en" ? "ring-2 ring-[#C9A84C]" : "opacity-60"
                }`}
            />
          </button>

          <button
            onClick={() => changeLanguage("es")}
            type="button"
            aria-label="Cambiar idioma a español"
            className="rounded-full focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/70"
          >
            <img
              src="/flags/co.svg"
              alt="Español"
              className={`w-6 h-6 rounded-full ${currentLang === "es" ? "ring-2 ring-[#C9A84C]" : "opacity-60"
                }`}
            />
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 text-white/80 hover:text-[#C9A84C] rounded-md focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/70 transition-colors"
            type="button"
            aria-label={menuOpen ? t("closeMenu") : t("openMenu")}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <svg aria-hidden="true" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* MENÚ MOBILE desplegable */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="lg:hidden px-4 pb-5 pt-2 bg-[#0B1527] border-t border-[#C9A84C]/15"
        >
          <ul className="grid grid-cols-2 gap-3 mb-4">
            {menuItems.map((item) => (
              <li key={item.key}>
                <a
                  href={`#${item.key}`}
                  onClick={() => setMenuOpen(false)}
                  className="block px-3 py-2.5 text-white/80 rounded-lg hover:bg-[#C9A84C]/10 hover:text-[#C9A84C] transition-all duration-200"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="block w-full border border-[#C9A84C] text-[#C9A84C] px-4 py-3 rounded-xl text-center font-semibold hover:bg-[#C9A84C] hover:text-[#0B1527] transition-all duration-300"
          >
            {t("cta")}
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;