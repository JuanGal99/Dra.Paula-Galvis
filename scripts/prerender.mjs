// Genera el HTML completo de cada idioma a partir del build, para que buscadores
// y vistas previas reciban el contenido sin tener que ejecutar JavaScript.
import { mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const SITE_URL = "https://drapaulagalvis.com/";
const DIST_DIR = path.resolve("dist");
const SSR_DIR = path.resolve("dist-ssr");

const PAGES = [
  { language: "en", directory: "", url: SITE_URL, locale: "en_US", alternateLocale: "es_CO" },
  { language: "es", directory: "es", url: `${SITE_URL}es/`, locale: "es_CO", alternateLocale: "en_US" },
];

const replaceOrFail = (html, pattern, replacement) => {
  if (!pattern.test(html)) throw new Error(`Prerender: no se encontró ${pattern}`);
  return html.replace(pattern, () => replacement);
};

const escapeAttribute = (value) => value.replace(/&/g, "&amp;").replace(/"/g, "&quot;");

const { render } = await import(pathToFileURL(path.join(SSR_DIR, "entry-server.js")).href);
const builtTemplate = await readFile(path.join(DIST_DIR, "index.html"), "utf-8");

// Los estilos van dentro del HTML: la página puede pintarse sin esperar otra descarga
const stylesheetPattern = /<link rel="stylesheet" crossorigin href="\/assets\/([^"]+\.css)">/;
const stylesheet = builtTemplate.match(stylesheetPattern);
if (!stylesheet) throw new Error("Prerender: no se encontró la hoja de estilos");
const css = await readFile(path.join(DIST_DIR, "assets", stylesheet[1]), "utf-8");
const template = builtTemplate.replace(stylesheetPattern, () => `<style>${css}</style>`);

// Las dos fuentes visibles al cargar: el título y el texto normal
const assets = await readdir(path.join(DIST_DIR, "assets"));
const fontPreloads = [/^fraunces-latin-600-normal.*\.woff2$/, /^figtree-latin-400-normal.*\.woff2$/]
  .map((pattern) => {
    const font = assets.find((asset) => pattern.test(asset));
    if (!font) throw new Error(`Prerender: no se encontró la fuente ${pattern}`);
    return `<link rel="preload" as="font" type="font/woff2" href="/assets/${font}" crossorigin />`;
  })
  .join("\n  ");

// Archivos JavaScript del navegador, para ubicar el de los textos de cada idioma
const scripts = await Promise.all(
  assets
    .filter((asset) => asset.endsWith(".js"))
    .map(async (asset) => ({ asset, code: await readFile(path.join(DIST_DIR, "assets", asset), "utf-8") }))
);

for (const page of PAGES) {
  const { appHtml, title, description } = await render(page.language);
  const safeTitle = escapeAttribute(title);
  const safeDescription = escapeAttribute(description);

  // Los textos del idioma se piden junto con el código principal, sin esperar a que este los solicite
  const localeScript = scripts.find(({ code }) => code.includes(title));
  if (!localeScript) throw new Error(`Prerender: no se encontraron los textos de ${page.language}`);
  const localePreload = `<link rel="modulepreload" crossorigin href="/assets/${localeScript.asset}" />`;

  const replacements = [
    [/<html lang="[^"]*"/, `<html lang="${page.language}"`],
    [/<title>[^<]*<\/title>/, `<title>${safeTitle}</title>`],
    [/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${safeDescription}" />`],
    [/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${page.url}" />`],
    [/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${page.url}" />`],
    [/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${safeTitle}" />`],
    [/<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${safeDescription}" />`],
    [/<meta property="og:locale" content="[^"]*" \/>/, `<meta property="og:locale" content="${page.locale}" />`],
    [/<meta property="og:locale:alternate" content="[^"]*" \/>/, `<meta property="og:locale:alternate" content="${page.alternateLocale}" />`],
    [/<\/head>/, `  ${fontPreloads}\n  ${localePreload}\n</head>`],
    [/<div id="root"><\/div>/, `<div id="root">${appHtml}</div>`],
  ];

  const html = replacements.reduce(
    (current, [pattern, replacement]) => replaceOrFail(current, pattern, replacement),
    template
  );

  const outputDirectory = path.join(DIST_DIR, page.directory);
  await mkdir(outputDirectory, { recursive: true });
  await writeFile(path.join(outputDirectory, "index.html"), html);
  console.log(`Prerender: ${page.url}`);
}

await rm(SSR_DIR, { recursive: true, force: true });
