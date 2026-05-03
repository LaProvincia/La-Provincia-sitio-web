import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { columnas, getColumnaBySlug, getCita } from "@/content/columnas";

export async function generateStaticParams() {
  const params: { slug: string; id: string }[] = [];
  for (const c of columnas) {
    for (const cita of c.citas) {
      params.push({ slug: c.slug, id: String(cita.id) });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; id: string }>;
}): Promise<Metadata> {
  const { slug, id } = await params;
  const columna = getColumnaBySlug(slug);
  if (!columna) return {};
  const cita = getCita(columna, Number(id));
  if (!cita) return {};

  const ogImage = `/api/og/cita?slug=${slug}&id=${id}&format=feed`;
  const url = `https://www.laprovinciaco.com/columnas/${slug}/cita/${id}`;
  const tituloPreview = `${columna.autor.nombre} — ${columna.titulo}`;

  return {
    title: `${tituloPreview} · La Provincia`,
    description: cita.texto,
    openGraph: {
      title: tituloPreview,
      description: cita.texto,
      url,
      siteName: "La Provincia",
      images: [{ url: ogImage, width: 1080, height: 1350 }],
      locale: "es_CO",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: tituloPreview,
      description: cita.texto,
      images: [ogImage],
    },
  };
}

// Cuando alguien visita la página de cita en navegador, lo mandamos a la columna completa.
// La página solo existe para servir los meta tags Open Graph al compartir el link.
export default async function CitaPage({
  params,
}: {
  params: Promise<{ slug: string; id: string }>;
}) {
  const { slug, id } = await params;
  const columna = getColumnaBySlug(slug);
  if (!columna) notFound();
  const cita = getCita(columna, Number(id));
  if (!cita) notFound();

  redirect(`/columnas/${slug}#cita-${id}`);
}
