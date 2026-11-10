import i18n from "i18next";
import { initReactI18next } from "react-i18next";

type Language = "en" | "es";

// Cada idioma se descarga por separado y solo cuando se necesita
const loaders: Record<Language, () => Promise<{ default: Record<string, object> }>> = {
  en: () => import("./locales/en"),
  es: () => import("./locales/es"),
};

const SITE_URL = "https://drapaulagalvis.com/";
const STORAGE_KEY = "language";
const isBrowser = typeof window !== "undefined";

const pathForLanguage = (lng: string) => (lng === "es" ? "/es/" : "/");

// El idioma lo define la URL; la redirección por preferencia la hacen Netlify e index.html
const languageFromUrl = (): Language =>
  window.location.pathname.startsWith("/es") ? "es" : "en";

i18n.use(initReactI18next).init({
  lng: isBrowser ? languageFromUrl() : "en",
  fallbackLng: false,
  ns: ["navbar"],
  defaultNS: "navbar",
  partialBundledLanguages: true,
  resources: {},
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

export default i18n;

/** Descarga los textos de un idioma si todavía no están cargados. */
export const loadLanguage = async (lng: Language) => {
  if (i18n.hasResourceBundle(lng, "navbar")) return;
  const { default: namespaces } = await loaders[lng]();
  for (const [namespace, texts] of Object.entries(namespaces)) {
    i18n.addResourceBundle(lng, namespace, texts);
  }
};

/** Cambia de idioma cargando antes sus textos. */
export const switchLanguage = async (lng: Language) => {
  await loadLanguage(lng);
  await i18n.changeLanguage(lng);
};

// localStorage puede lanzar error en modo privado o con almacenamiento bloqueado
const storeLanguage = (lng: string) => {
  // Netlify lee esta cookie para no redirigir a /es/ a quien eligió inglés
  document.cookie = `nf_lang=${lng}; path=/; max-age=31536000; SameSite=Lax`;
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

/** Carga el idioma de la URL antes de mostrar la página en el navegador. */
export const prepareLanguage = async () => {
  await loadLanguage(i18n.language as Language);
  syncDocument(i18n.language);
  i18n.on("languageChanged", (lng) => {
    syncDocument(lng);
    storeLanguage(lng);
  });
};
