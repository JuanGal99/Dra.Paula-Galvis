import { useTranslation } from "react-i18next";

const Hero = () => {
  const { t } = useTranslation("hero");

  return (
    <section
      id="hero"
      className="relative min-h-[82vh] md:min-h-[78vh] lg:min-h-[80vh] flex items-center scroll-mt-20 overflow-hidden"
      aria-labelledby="hero-heading"
      role="region"
    >
      <img
        src="/images/img_principal.jpg"
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        decoding="auto"
        className="absolute inset-0 w-full h-full object-cover object-[38%_80%] sm:object-[35%_50%] md:object-[35%_30%] lg:object-[32%_30%] xl:object-[30%_30%]"
      />

      <div className="absolute inset-0 bg-[#0B1527]/60" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0B1527]/10 via-[#0B1527]/35 to-[#0B1527]/85" />

      <div className="relative z-10 w-full px-5 sm:px-6 lg:px-8 py-14">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-[560px] mx-auto md:ml-auto md:mr-10 lg:mr-20 text-center md:text-right text-white">
            <h1
              id="hero-heading"
              className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight drop-shadow-lg"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {t("title")}
            </h1>

            <div className="mt-5 mx-auto md:ml-auto md:mr-0 w-16 h-[2px] bg-[#C9A84C] rounded-full" />

            <p
              className="mt-5 text-base sm:text-lg md:text-xl text-white/85 leading-relaxed max-w-lg mx-auto md:ml-auto md:mr-0"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              {t("subtitle")}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-end items-center">
              <a
                href="#contact"
                className="inline-flex items-center justify-center bg-[#C9A84C] text-[#0B1527] px-7 py-3.5 rounded-full font-bold shadow-xl hover:bg-[#E0BC6A] hover:-translate-y-1 transition-all duration-300 text-sm sm:text-base"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                {t("ctaPrimary")}
              </a>

              <a
                href="#services"
                className="inline-flex items-center justify-center border border-white/60 text-white px-7 py-3.5 rounded-full font-bold hover:border-[#C9A84C] hover:text-[#C9A84C] hover:-translate-y-1 transition-all duration-300 text-sm sm:text-base"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                {t("ctaSecondary")}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#C9A84C]/60 to-transparent" />
    </section>
  );
};

export default Hero;