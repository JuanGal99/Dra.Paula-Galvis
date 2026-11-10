import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "@fontsource/fraunces/latin-600.css";
import "@fontsource/figtree/latin-400.css";
import "@fontsource/figtree/latin-600.css";
import "./index.css";
import App from "./App.tsx";
import { prepareLanguage } from "./i18n";

// Los textos deben estar cargados antes de hidratar para que coincidan con el HTML generado
await prepareLanguage();

const root = document.getElementById("root")!;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// En producción el HTML ya viene generado; en desarrollo la raíz llega vacía
if (root.hasChildNodes()) {
  hydrateRoot(root, app);
} else {
  createRoot(root).render(app);
}
