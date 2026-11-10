import { useTranslation } from "react-i18next";
import { smileCases } from "../data/smileCases";
import SectionHeading from "./SectionHeading";

/**
 * Casos reales de antes y después.
 * No se muestra nada mientras src/data/smileCases.ts esté vacío.
 */
const BeforeAfter = () => {
  const { t } = useTranslation("results");

  if (smileCases.length === 0) return null;

  return (
    <section
      id="results"
      className="bg-[#FAFAF8] text-[#1A1A2E] px-6 py-24 scroll-mt-20"
      aria-labelledby="results-heading"
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeading id="results-heading" title={t("title")} lead={t("lead")} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {smileCases.map((smileCase) => {
            const description = t(`cases.${smileCase.id}`);
            const photos = [
              { src: smileCase.before, label: t("before") },
              { src: smileCase.after, label: t(smileCase.secondStage) },
            ];

            return (
              <figure
                key={smileCase.id}
                className="bg-white rounded-2xl overflow-hidden border border-[#C9A84C]/20 shadow-sm"
              >
                <div className="flex flex-col gap-px bg-[#C9A84C]/30">
                  {photos.map((photo) => (
                    <div key={photo.src} className="relative bg-white">
                      <img
                        src={photo.src}
                        srcSet={`${photo.src.replace(".webp", "-400.webp")} 400w, ${photo.src} 800w`}
                        sizes="(min-width: 1024px) 360px, (min-width: 768px) 50vw, 100vw"
                        alt={`${photo.label}: ${description}`}
                        loading="lazy"
                        decoding="async"
                        width={800}
                        height={400}
                        className="w-full aspect-[2/1] object-cover"
                      />
                      <span className="absolute top-3 left-3 bg-[#0B1527]/85 text-white text-xs font-semibold px-3 py-1 rounded-full">
                        {photo.label}
                      </span>
                    </div>
                  ))}
                </div>
                <figcaption className="px-5 py-4 text-sm font-semibold text-[#0B1527]">
                  {description}
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BeforeAfter;
