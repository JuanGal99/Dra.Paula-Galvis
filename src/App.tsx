import { useRef } from "react";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Services from "./components/Services";
import TourismDental from "./components/TourismDental";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import PrivacyPolicy from "./components/PrivacyPolicy";

/**
 * Componente principal de la aplicación (App).
 * Aquí se ensamblan todas las secciones principales de la landing page.
 * El Navbar permanece fijo en la parte superior, seguido por el contenido principal.
 */
function App() {
  const privacyDialogRef = useRef<HTMLDialogElement>(null);

  // showModal enfoca el botón Cerrar, que está al final: se vuelve al inicio del texto
  const openPrivacyPolicy = () => {
    const dialog = privacyDialogRef.current;
    if (!dialog) return;
    dialog.showModal();
    dialog.focus();
    dialog.scrollTop = 0;
  };

  return (
    <>
      <Navbar />
      <main id="main-content" className="pt-[83px]">
        <Hero />
        <About />
        <Services />
        <TourismDental />
        <Contact onOpenPrivacyPolicy={openPrivacyPolicy} />
      </main>
      <Footer onOpenPrivacyPolicy={openPrivacyPolicy} />
      <PrivacyPolicy dialogRef={privacyDialogRef} />
    </>
  );
}

export default App;
