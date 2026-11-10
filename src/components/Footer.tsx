import { useTranslation } from "react-i18next";

type FooterProps = {
  onOpenPrivacyPolicy: () => void;
};

const linkClassName =
  "inline-block py-2 hover:text-[#C9A84C] focus:outline-none focus-visible:text-[#C9A84C] focus-visible:underline transition-colors";

const Footer = ({ onOpenPrivacyPolicy }: FooterProps) => {
  const { t } = useTranslation("footer");

  return (
    <footer className="bg-[#060F1E] text-white/70 text-sm border-t border-[#C9A84C]/15 px-6 pt-8 pb-24 xl:pb-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        <div>
          <p className="font-semibold text-white">{t("name")}</p>
          <p className="mt-1">{t("location")}</p>
        </div>

        <nav aria-label={t("linksLabel")} className="flex flex-wrap items-center justify-center gap-x-6">
          <button type="button" onClick={onOpenPrivacyPolicy} className={linkClassName}>
            {t("privacyPolicy")}
          </button>
          <a
            href="https://instagram.com/dragalvis"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClassName}
          >
            Instagram
          </a>
        </nav>

        <p>
          © <span suppressHydrationWarning>{new Date().getFullYear()}</span> {t("name")}. {t("rights")}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
