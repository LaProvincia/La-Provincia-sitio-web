import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { columnas, getColumnaBySlug, getCita } from "@/content/columnas";
import { SiteHeader } from "@/app/components/SiteHeader";
import { SiteFooter } from "@/app/components/SiteFooter";
import { TarjetaCita } from "@/app/components/TarjetaCita";

export async function generateStaticParams() {
  return columnas.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const columna = getColumnaBySlug(slug);
  if (!columna) return {};

  const ogImage = `/api/og/cita?slug=${columna.slug}&id=1&format=feed`;
  const url = `https://www.laprovinciaco.com/columnas/${columna.slug}`;

  return {
    title: `${columna.titulo} · La Provincia`,
    description: columna.resumen,
    authors: [{ name: columna.autor.nombre }],
    openGraph: {
      title: columna.titulo,
      description: columna.resumen,
      url,
      siteName: "La Provincia",
      images: [{ url: ogImage, width: 1080, height: 1350 }],
      locale: "es_CO",
      type: "article",
      publishedTime: columna.fecha,
      authors: [columna.autor.nombre],
    },
    twitter: {
      card: "summary_large_image",
      title: columna.titulo,
      description: columna.resumen,
      images: [ogImage],
    },
  };
}

export default async function ColumnaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const columna = getColumnaBySlug(slug);
  if (!columna) notFound();

  return (
    <>
      <SiteHeader active="columnas" />

      <main className="columna">
        <div className="columna__contenedor">
          <Link href="/columnas" className="columna__breadcrumb">
            ← Todas las columnas
          </Link>

          <header className="columna__cabecera">
            <div className="columna__tags">
              {columna.tags.map((tag) => (
                <span key={tag} className="columna__tag">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="columna__titulo">{columna.titulo}</h1>
            <p className="columna__resumen">{columna.resumen}</p>

            <div className="columna__autor">
              <img
                src={columna.autor.foto}
                alt={columna.autor.nombre}
                className="columna__autor-foto"
              />
              <div className="columna__autor-info">
                <div className="columna__autor-nombre">
                  Por {columna.autor.nombre}
                </div>
                <div className="columna__autor-fecha">
                  {columna.fechaLegible}
                </div>
              </div>
            </div>
          </header>

          <article className="columna__cuerpo">
            {columna.cuerpo.map((bloque, i) => {
              if (bloque.tipo === "parrafo") {
                return <p key={i}>{bloque.texto}</p>;
              }
              const cita = getCita(columna, bloque.citaId);
              if (!cita) return null;
              return (
                <TarjetaCita
                  key={i}
                  texto={cita.texto}
                  autor={columna.autor.nombre}
                  columnaSlug={columna.slug}
                  citaId={cita.id}
                />
              );
            })}
          </article>

          <footer className="columna__pie">
            <p className="columna__pie-texto">
              Las opiniones expresadas en esta columna son responsabilidad de
              su autor y no comprometen la línea editorial de La Provincia.
            </p>
          </footer>
        </div>
      </main>

      <SiteFooter />

      <style>{`
        .columna {
          flex: 1;
          padding: 2rem 1.5rem 4rem;
          position: relative;
          z-index: 1;
        }
        .columna__contenedor {
          max-width: 720px;
          margin: 0 auto;
        }
        .columna__breadcrumb {
          display: inline-block;
          margin-bottom: 2rem;
          font-family: var(--sans);
          font-size: 0.78rem;
          color: var(--verde-montana);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          opacity: 0.75;
          transition: opacity 0.2s ease;
        }
        .columna__breadcrumb:hover {
          opacity: 1;
        }
        .columna__cabecera {
          margin-bottom: 3rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid rgba(21, 103, 46, 0.15);
        }
        .columna__tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }
        .columna__tag {
          font-family: var(--sans);
          font-size: 0.7rem;
          font-weight: 500;
          color: var(--verde-montana);
          letter-spacing: 0.15em;
          text-transform: uppercase;
          padding: 0.3rem 0.7rem;
          border: 1px solid rgba(21, 103, 46, 0.3);
          border-radius: 2px;
        }
        .columna__titulo {
          font-family: var(--serif);
          font-size: clamp(2rem, 5vw, 3.25rem);
          font-weight: 600;
          color: var(--verde-oscuro);
          line-height: 1.15;
          margin-bottom: 1rem;
          letter-spacing: -0.01em;
        }
        .columna__resumen {
          font-family: var(--serif);
          font-size: clamp(1.05rem, 2vw, 1.25rem);
          font-style: italic;
          color: var(--verde-montana);
          line-height: 1.5;
          margin-bottom: 2rem;
          font-weight: 400;
        }
        .columna__autor {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .columna__autor-foto {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid var(--verde-montana);
        }
        .columna__autor-nombre {
          font-family: var(--sans);
          font-size: 0.95rem;
          font-weight: 500;
          color: var(--verde-oscuro);
        }
        .columna__autor-fecha {
          font-family: var(--sans);
          font-size: 0.8rem;
          color: var(--verde-montana);
          opacity: 0.75;
        }
        .columna__cuerpo p {
          font-family: var(--serif);
          font-size: clamp(1.05rem, 1.8vw, 1.2rem);
          line-height: 1.75;
          color: var(--verde-oscuro);
          margin-bottom: 1.5rem;
          font-weight: 400;
        }
        .columna__cuerpo p:first-child::first-letter {
          font-size: 3.5rem;
          float: left;
          line-height: 1;
          font-weight: 600;
          color: var(--verde-montana);
          padding: 0.25rem 0.5rem 0 0;
          font-family: var(--serif);
        }
        .columna__pie {
          margin-top: 4rem;
          padding-top: 2rem;
          border-top: 1px solid rgba(21, 103, 46, 0.15);
        }
        .columna__pie-texto {
          font-family: var(--sans);
          font-size: 0.8rem;
          font-style: italic;
          color: var(--verde-montana);
          opacity: 0.7;
          line-height: 1.6;
          text-align: center;
        }
        @media (max-width: 600px) {
          .columna {
            padding: 1rem 1.25rem 3rem;
          }
          .columna__cabecera {
            margin-bottom: 2rem;
            padding-bottom: 1.5rem;
          }
          .columna__cuerpo p:first-child::first-letter {
            font-size: 2.75rem;
          }
        }
      `}</style>
    </>
  );
}
