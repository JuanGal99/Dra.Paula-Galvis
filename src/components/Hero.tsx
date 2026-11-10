import { useTranslation } from "react-i18next";

/**
 * Hero: la foto de la doctora es el fondo y su sonrisa nunca queda bajo el texto.
 * En celular la foto ocupa la parte de arriba y el texto va debajo, sobre el navy.
 * Desde tablet la foto cubre todo y el texto ocupa la mitad derecha, donde está el lago.
 */
const Hero = () => {
  const { t } = useTranslation("hero");

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-[#0B1527] md:min-h-[80vh] md:flex md:items-center scroll-mt-20"
      aria-labelledby="hero-heading"
    >
      <div className="relative h-[58vh] min-h-[360px] max-h-[540px] md:absolute md:inset-0 md:h-auto md:min-h-0 md:max-h-none">
        <img
          src="/images/hero-1800.webp"
          srcSet="/images/hero-1080.webp 1080w, /images/hero-1800.webp 1800w"
          sizes="100vw"
          alt={t("imageAlt")}
          fetchPriority="high"
          decoding="auto"
          className="absolute inset-0 w-full h-full object-cover object-[24%_32%] md:object-[18%_34%]"
        />
        {/* Celular: la foto se funde con el fondo donde empieza el texto */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0B1527] to-transparent md:hidden" />
        {/* Tablet y escritorio: solo se oscurece el lado del texto */}
        <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-transparent from-40% via-[#0B1527]/70 via-55% to-[#0B1527]/90" />
      </div>

      <div className="relative z-10 w-full px-5 sm:px-6 lg:px-8 -mt-8 pb-14 md:mt-0 md:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="md:w-1/2 md:ml-auto md:pl-8 lg:pl-12 text-white">
            <h1
              id="hero-heading"
              className="text-[2.6rem] sm:text-6xl lg:text-7xl font-semibold leading-[1.02] tracking-tight"
            >
              {t("title")}
            </h1>

            <p className="mt-5 text-lg md:text-xl text-white/85 leading-relaxed max-w-lg">
              {t("subtitle")}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row md:flex-col lg:flex-row md:items-start gap-3 sm:gap-4">
              <a
                href="#contact"
                className="inline-flex items-center justify-center bg-[#C9A84C] text-[#0B1527] px-7 py-3.5 rounded-full font-semibold hover:bg-[#E0BC6A] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#C9A84C]/50 transition-colors duration-200 text-base"
              >
                {t("ctaPrimary")}
              </a>

              <a
                href="#services"
                className="inline-flex items-center justify-center border border-white/60 text-white px-7 py-3.5 rounded-full font-semibold hover:border-[#C9A84C] hover:text-[#C9A84C] focus:outline-none focus-visible:ring-4 focus-visible:ring-white/40 transition-colors duration-200 text-base"
              >
                {t("ctaSecondary")}
              </a>
            </div>

            <p className="mt-7 text-sm text-white/70">{t("credential")}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
