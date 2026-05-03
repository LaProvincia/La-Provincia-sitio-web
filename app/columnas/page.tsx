import type { Metadata } from "next";
import Link from "next/link";
import { columnas } from "@/content/columnas";
import { SiteHeader } from "@/app/components/SiteHeader";
import { SiteFooter } from "@/app/components/SiteFooter";

export const metadata: Metadata = {
  title: "Columnas · La Provincia",
  description:
    "Análisis político y opinión sobre la coyuntura colombiana, escrita por columnistas asociados a La Provincia.",
};

export default function ColumnasIndex() {
  const ordenadas = [...columnas].sort((a, b) =>
    b.fecha.localeCompare(a.fecha)
  );

  return (
    <>
      <SiteHeader active="columnas" />

      <main className="indice">
        <div className="indice__contenedor">
          <header className="indice__cabecera">
            <div className="indice__divider" />
            <h1 className="indice__titulo">Columnas</h1>
            <p className="indice__descripcion">
              Análisis político y opinión sobre la coyuntura colombiana,
              escritos por columnistas asociados a La Provincia.
            </p>
          </header>

          <ul className="indice__lista">
            {ordenadas.map((columna) => (
              <li key={columna.slug}>
                <Link
                  href={`/columnas/${columna.slug}`}
                  className="indice__item"
                >
                  <div className="indice__item-fecha">
                    {columna.fechaLegible}
                  </div>
                  <h2 className="indice__item-titulo">{columna.titulo}</h2>
                  <p className="indice__item-resumen">{columna.resumen}</p>
                  <div className="indice__item-autor">
                    Por {columna.autor.nombre}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>

      <SiteFooter />

      <style>{`
        .indice {
          flex: 1;
          padding: 2rem 1.5rem 4rem;
          position: relative;
          z-index: 1;
        }
        .indice__contenedor {
          max-width: 720px;
          margin: 0 auto;
        }
        .indice__cabecera {
          text-align: center;
          margin-bottom: 4rem;
        }
        .indice__divider {
          width: 60px;
          height: 1px;
          background: var(--verde-montana);
          margin: 0 auto 2rem;
        }
        .indice__titulo {
          font-family: var(--serif);
          font-size: clamp(2.5rem, 6vw, 3.75rem);
          font-weight: 500;
          font-style: italic;
          color: var(--verde-montana);
          margin-bottom: 1rem;
        }
        .indice__descripcion {
          font-family: var(--sans);
          font-size: 1rem;
          color: var(--verde-oscuro);
          max-width: 540px;
          margin: 0 auto;
          line-height: 1.7;
        }
        .indice__lista {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .indice__item {
          display: block;
          padding: 2rem 0;
          border-top: 1px solid rgba(21, 103, 46, 0.15);
          transition: background 0.25s ease;
        }
        .indice__lista li:last-child .indice__item {
          border-bottom: 1px solid rgba(21, 103, 46, 0.15);
        }
        .indice__item:hover {
          background: rgba(21, 103, 46, 0.03);
          padding-left: 1rem;
          padding-right: 1rem;
        }
        .indice__item-fecha {
          font-family: var(--sans);
          font-size: 0.75rem;
          color: var(--verde-montana);
          letter-spacing: 0.15em;
          text-transform: uppercase;
          opacity: 0.7;
          margin-bottom: 0.75rem;
        }
        .indice__item-titulo {
          font-family: var(--serif);
          font-size: clamp(1.5rem, 3vw, 2rem);
          font-weight: 600;
          color: var(--verde-oscuro);
          line-height: 1.2;
          margin-bottom: 0.75rem;
        }
        .indice__item-resumen {
          font-family: var(--sans);
          font-size: 1rem;
          color: var(--verde-oscuro);
          line-height: 1.6;
          margin-bottom: 1rem;
          opacity: 0.85;
        }
        .indice__item-autor {
          font-family: var(--sans);
          font-size: 0.85rem;
          color: var(--verde-montana);
          font-weight: 500;
        }
      `}</style>
    </>
  );
}
