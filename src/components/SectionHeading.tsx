type SectionHeadingProps = {
  id: string;
  title: string;
  lead?: string;
  tone?: "light" | "dark";
};

/** Encabezado común de sección: título y, si hace falta, una frase que explica la sección. */
const SectionHeading = ({ id, title, lead, tone = "light" }: SectionHeadingProps) => (
  <div className="mb-12 md:mb-16 max-w-2xl">
    <h2
      id={id}
      className={`text-4xl md:text-5xl font-semibold tracking-tight leading-[1.1] ${
        tone === "dark" ? "text-white" : "text-[#0B1527]"
      }`}
    >
      {title}
    </h2>
    {lead && (
      <p className={`mt-4 text-lg leading-relaxed ${tone === "dark" ? "text-white/70" : "text-slate-600"}`}>
        {lead}
      </p>
    )}
  </div>
);

export default SectionHeading;
