import { ImageResponse } from "next/og";
import { getColumnaBySlug, getCita } from "@/content/columnas";

export const runtime = "edge";

// Carga la fuente Cormorant Garamond desde Google Fonts
async function loadFont(weight: number, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@${weight}&text=${encodeURIComponent(
    text
  )}`;
  const css = await (await fetch(url)).text();
  const match = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/);
  if (!match) throw new Error("No se pudo cargar la fuente");
  const fontResponse = await fetch(match[1]);
  return fontResponse.arrayBuffer();
}

async function loadSans(weight: number, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=Roboto:wght@${weight}&text=${encodeURIComponent(
    text
  )}`;
  const css = await (await fetch(url)).text();
  const match = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/);
  if (!match) throw new Error("No se pudo cargar la fuente sans");
  const fontResponse = await fetch(match[1]);
  return fontResponse.arrayBuffer();
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");
  const id = searchParams.get("id");
  const format = searchParams.get("format") ?? "feed";

  if (!slug || !id) {
    return new Response("Faltan parámetros: slug e id", { status: 400 });
  }

  const columna = getColumnaBySlug(slug);
  if (!columna) return new Response("Columna no encontrada", { status: 404 });
  const cita = getCita(columna, Number(id));
  if (!cita) return new Response("Cita no encontrada", { status: 404 });

  const ancho = format === "story" ? 1080 : 1080;
  const alto = format === "story" ? 1920 : 1350;

  // Texto a renderizar (lo necesitamos para el subset de fuente)
  const textoCompleto = `${cita.texto} ${columna.autor.nombre} ${columna.titulo} La Provincia ${columna.fechaLegible}`;

  const [serif500, serif600, sans400, sans500] = await Promise.all([
    loadFont(500, textoCompleto),
    loadFont(600, textoCompleto),
    loadSans(400, textoCompleto),
    loadSans(500, textoCompleto),
  ]);

  // Tamaños tipográficos: ajustan según formato y largo del texto
  const longitudCita = cita.texto.length;
  const fsCita =
    format === "story"
      ? longitudCita > 200
        ? 56
        : longitudCita > 120
        ? 64
        : 72
      : longitudCita > 200
      ? 50
      : longitudCita > 120
      ? 58
      : 66;

  // Paleta del manual de marca
  const VERDE_MONTANA = "#15672E";
  const VERDE_OSCURO = "#001E06";
  const CREMA = "#DCD0BA";
  const CREMA_CLARO = "#E8DFCC";

  // Padding base según formato
  const padding = format === "story" ? 100 : 90;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          backgroundColor: CREMA,
          padding: `${padding}px`,
          position: "relative",
          fontFamily: "Roboto",
        }}
      >
        {/* Marca de agua: gradientes sutiles del fondo */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "radial-gradient(circle at 20% 20%, rgba(21, 103, 46, 0.06) 0%, transparent 55%), radial-gradient(circle at 85% 85%, rgba(21, 103, 46, 0.05) 0%, transparent 55%)",
            display: "flex",
          }}
        />

        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            style={{
              fontFamily: "Cormorant Garamond",
              fontSize: 32,
              fontWeight: 500,
              color: VERDE_MONTANA,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            La Provincia
          </div>
          <div
            style={{
              fontSize: 22,
              color: VERDE_MONTANA,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              opacity: 0.7,
              fontWeight: 400,
            }}
          >
            Antioquia · Colombia
          </div>
        </div>

        {/* Línea divisoria */}
        <div
          style={{
            width: 60,
            height: 1,
            backgroundColor: VERDE_MONTANA,
            marginTop: 50,
            display: "flex",
          }}
        />

        {/* Cuerpo: comilla + cita */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            position: "relative",
            zIndex: 1,
            paddingTop: 40,
            paddingBottom: 40,
          }}
        >
          <div
            style={{
              fontFamily: "Cormorant Garamond",
              fontSize: format === "story" ? 220 : 180,
              lineHeight: 1,
              color: VERDE_MONTANA,
              opacity: 0.25,
              marginBottom: -60,
              fontWeight: 600,
              display: "flex",
            }}
          >
            “
          </div>
          <div
            style={{
              fontFamily: "Cormorant Garamond",
              fontSize: fsCita,
              fontWeight: 500,
              fontStyle: "italic",
              color: VERDE_OSCURO,
              lineHeight: 1.3,
              display: "flex",
            }}
          >
            {cita.texto}
          </div>
        </div>

        {/* Footer: autor + columna + fecha */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            position: "relative",
            zIndex: 1,
            borderTop: `1px solid ${VERDE_MONTANA}`,
            paddingTop: 30,
          }}
        >
          <div
            style={{
              fontSize: 26,
              fontWeight: 500,
              color: VERDE_MONTANA,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: 8,
            }}
          >
            {columna.autor.nombre}
          </div>
          <div
            style={{
              fontFamily: "Cormorant Garamond",
              fontSize: 30,
              fontStyle: "italic",
              color: VERDE_OSCURO,
              fontWeight: 500,
              marginBottom: 12,
              display: "flex",
            }}
          >
            «{columna.titulo}»
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 18,
              color: VERDE_MONTANA,
              opacity: 0.7,
              letterSpacing: "0.08em",
            }}
          >
            <div>{columna.fechaLegible}</div>
            <div>laprovinciaco.com</div>
          </div>
        </div>
      </div>
    ),
    {
      width: ancho,
      height: alto,
      fonts: [
        { name: "Cormorant Garamond", data: serif500, weight: 500, style: "normal" },
        { name: "Cormorant Garamond", data: serif600, weight: 600, style: "normal" },
        { name: "Roboto", data: sans400, weight: 400, style: "normal" },
        { name: "Roboto", data: sans500, weight: 500, style: "normal" },
      ],
    }
  );
}
