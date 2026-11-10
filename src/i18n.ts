import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import navbarEn from "./locales/en/navbar";
import navbarEs from "./locales/es/navbar";
import heroEn from "./locales/en/hero";
import heroEs from "./locales/es/hero";
import aboutEn from "./locales/en/about";
import aboutEs from "./locales/es/about";
import servicesEn from "./locales/en/services";
import servicesEs from "./locales/es/services";
import tourismDentalEn from "./locales/en/tourismDental";
import tourismDentalEs from "./locales/es/tourismDental";
import contactEn from "./locales/en/contact";
import contactEs from "./locales/es/contact";
import seoEn from "./locales/en/seo";
import seoEs from "./locales/es/seo";
import privacyEn from "./locales/en/privacy";
import privacyEs from "./locales/es/privacy";
import footerEn from "./locales/en/footer";
import footerEs from "./locales/es/footer";

const resources = {
  en: {
    navbar: navbarEn,
    hero: heroEn,
    about: aboutEn,
    services: servicesEn,
    tourismDental: tourismDentalEn,
    contact: contactEn,
    seo: seoEn,
    privacy: privacyEn,
    footer: footerEn,
  },
  es: {
    navbar: navbarEs,
    hero: heroEs,
    about: aboutEs,
    services: servicesEs,
    tourismDental: tourismDentalEs,
    contact: contactEs,
    seo: seoEs,
    privacy: privacyEs,
    footer: footerEs,
  },
} as const;

const SITE_URL = "https://drapaulagalvis.com/";
const STORAGE_KEY = "language";
const isBrowser = typeof window !== "undefined";

const pathForLanguage = (lng: string) => (lng === "es" ? "/es/" : "/");

// El idioma lo define la URL; la redirección inicial por preferencia está en index.html
const languageFromUrl = () =>
  window.location.pathname.startsWith("/es") ? "es" : "en";

i18n.use(initReactI18next).init({
  resources,
  lng: isBrowser ? languageFromUrl() : "en",
  fallbackLng: "en",
  ns: ["navbar", "hero"],
  defaultNS: "navbar",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;

// localStorage puede lanzar error en modo privado o con almacenamiento bloqueado
const storeLanguage = (lng: string) => {
  try {
    localStorage.setItem(STORAGE_KEY, lng);
  } catch {
    // El idioma simplemente no se recordará en la próxima visita
  }
};

/**
 * Sincroniza el documento con el idioma activo: atributo lang
 * (lectores de pantalla), título, descripción, URL y canónica.
 */
const syncDocument = (lng: string) => {
  document.documentElement.lang = lng;
  document.title = i18n.t("title", { ns: "seo", lng });
  document
    .querySelector('meta[name="description"]')
    ?.setAttribute("content", i18n.t("description", { ns: "seo", lng }));

  const path = pathForLanguage(lng);
  if (window.location.pathname !== path) {
    window.history.replaceState(null, "", `${path}${window.location.search}${window.location.hash}`);
  }

  document
    .querySelector('link[rel="canonical"]')
    ?.setAttribute("href", `${SITE_URL}${path.slice(1)}`);
};

if (isBrowser) {
  // Aplicar el idioma inicial y escuchar cambios futuros
  syncDocument(i18n.language);
  i18n.on("languageChanged", (lng) => {
    syncDocument(lng);
    storeLanguage(lng);
  });
}
