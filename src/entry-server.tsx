import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import App from "./App";
import i18n from "./i18n";

/** Usado solo al compilar por scripts/prerender.mjs. */
export async function render(language: "en" | "es") {
  await i18n.changeLanguage(language);

  return {
    appHtml: renderToString(
      <StrictMode>
        <App />
      </StrictMode>
    ),
    title: i18n.t("title", { ns: "seo" }),
    description: i18n.t("description", { ns: "seo" }),
  };
}
