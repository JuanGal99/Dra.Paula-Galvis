// Casos de antes y después. La sección se muestra sola en cuanto haya al menos uno.
// Publica solo casos con autorización escrita del paciente.
// Las fotos van en public/images/casos/ en WebP, recortadas en proporción 2:1.
// El texto de cada caso está en src/locales/*/results.ts, bajo "cases", con el mismo id.

export type SmileCase = {
  id: string;
  before: string;
  after: string;
  // "during" cuando la segunda foto es del tratamiento en curso y no del resultado final
  secondStage: "after" | "during";
};

const photo = (id: string, stage: "antes" | "despues") => `/images/casos/${id}-${stage}.webp`;

const smileCase = (id: string, secondStage: SmileCase["secondStage"] = "after"): SmileCase => ({
  id,
  before: photo(id, "antes"),
  after: photo(id, "despues"),
  secondStage,
});

export const smileCases: SmileCase[] = [
  smileCase("ortodoncia-alineacion"),
  smileCase("ortodoncia-brackets", "during"),
  smileCase("diseno-sonrisa-1"),
  smileCase("diseno-sonrisa-2"),
  smileCase("blanqueamiento"),
  smileCase("relleno-labios"),
];
