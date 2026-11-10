import { getStore } from "@netlify/blobs";

const SITE_ORIGIN = "https://drapaulagalvis.com";

const todayInColombia = () =>
  new Intl.DateTimeFormat("en-CA", { timeZone: "America/Bogota" }).format(new Date());

const recordClick = async (store, language) => {
  const date = todayInColombia();
  const day = (await store.get(date, { type: "json" })) ?? { ingles: 0, espanol: 0 };
  day[language === "es" ? "espanol" : "ingles"] += 1;
  await store.setJSON(date, day);
};

const buildReport = async (store) => {
  const { blobs } = await store.list();
  const days = await Promise.all(
    blobs.map(async ({ key }) => ({ fecha: key, ...(await store.get(key, { type: "json" })) }))
  );
  days.sort((a, b) => b.fecha.localeCompare(a.fecha));

  const ingles = days.reduce((sum, day) => sum + day.ingles, 0);
  const espanol = days.reduce((sum, day) => sum + day.espanol, 0);
  return { total: ingles + espanol, ingles, espanol, por_dia: days };
};

// Solo guarda conteos por día e idioma: ni cookies ni datos de la persona
export default async (request) => {
  const store = getStore({ name: "whatsapp-clicks", consistency: "strong" });

  if (request.method === "GET") {
    return Response.json(await buildReport(store), {
      headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex" },
    });
  }

  if (request.method === "POST") {
    if (request.headers.get("origin") !== SITE_ORIGIN) {
      return new Response(null, { status: 403 });
    }
    await recordClick(store, new URL(request.url).searchParams.get("lang"));
    return new Response(null, { status: 204 });
  }

  return new Response(null, { status: 405 });
};

export const config = { path: "/api/whatsapp-clicks" };
