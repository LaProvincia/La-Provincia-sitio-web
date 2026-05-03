"use client";

import { useState } from "react";

interface TarjetaCitaProps {
  texto: string;
  autor: string;
  columnaSlug: string;
  citaId: number;
  baseUrl?: string;
}

export function TarjetaCita({
  texto,
  autor,
  columnaSlug,
  citaId,
  baseUrl = "https://www.laprovinciaco.com",
}: TarjetaCitaProps) {
  const [estadoCopia, setEstadoCopia] = useState<"idle" | "copiado">("idle");

  const urlCita = `${baseUrl}/columnas/${columnaSlug}/cita/${citaId}`;
  const urlFeed = `/api/og/cita?slug=${columnaSlug}&id=${citaId}&format=feed`;
  const urlStory = `/api/og/cita?slug=${columnaSlug}&id=${citaId}&format=story`;

  async function copiarLink() {
    try {
      await navigator.clipboard.writeText(urlCita);
      setEstadoCopia("copiado");
      setTimeout(() => setEstadoCopia("idle"), 2000);
    } catch {
      window.prompt("Copia el enlace:", urlCita);
    }
  }

  function descargar(url: string, nombre: string) {
    const a = document.createElement("a");
    a.href = url;
    a.download = nombre;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  return (
    <figure className="tarjeta-cita">
      <div className="tarjeta-cita__contenido">
        <div className="tarjeta-cita__comilla" aria-hidden="true">
          “
        </div>
        <blockquote className="tarjeta-cita__texto">{texto}</blockquote>
        <figcaption className="tarjeta-cita__autor">— {autor}</figcaption>
      </div>

      <div className="tarjeta-cita__acciones">
        <button
          type="button"
          className="tarjeta-cita__boton"
          onClick={() =>
            descargar(urlFeed, `la-provincia-${columnaSlug}-cita-${citaId}-feed.png`)
          }
          aria-label="Descargar imagen para feed de Instagram"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
          </svg>
          <span>Descargar para feed</span>
        </button>

        <button
          type="button"
          className="tarjeta-cita__boton"
          onClick={() =>
            descargar(urlStory, `la-provincia-${columnaSlug}-cita-${citaId}-story.png`)
          }
          aria-label="Descargar imagen para historia de Instagram"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="6" y="2" width="12" height="20" rx="2" />
            <circle cx="12" cy="12" r="3" />
          </svg>
          <span>Descargar para historia</span>
        </button>

        <button
          type="button"
          className="tarjeta-cita__boton tarjeta-cita__boton--secundario"
          onClick={copiarLink}
          aria-label="Copiar enlace de esta cita"
        >
          {estadoCopia === "copiado" ? (
            <>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>¡Copiado!</span>
            </>
          ) : (
            <>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
              <span>Copiar enlace</span>
            </>
          )}
        </button>
      </div>

      <style>{`
        .tarjeta-cita {
          margin: 3rem 0;
          padding: 0;
          background: var(--crema-claro);
          border-left: 4px solid var(--verde-montana);
          border-radius: 2px;
          overflow: hidden;
        }
        .tarjeta-cita__contenido {
          padding: 2.5rem 2.5rem 1.5rem;
          position: relative;
        }
        .tarjeta-cita__comilla {
          position: absolute;
          top: 0.5rem;
          left: 1rem;
          font-family: var(--serif);
          font-size: 5rem;
          line-height: 1;
          color: var(--verde-montana);
          opacity: 0.25;
          pointer-events: none;
        }
        .tarjeta-cita__texto {
          font-family: var(--serif);
          font-size: clamp(1.15rem, 2.4vw, 1.5rem);
          font-weight: 500;
          font-style: italic;
          color: var(--verde-oscuro);
          line-height: 1.4;
          margin: 0 0 1rem;
          position: relative;
          z-index: 1;
        }
        .tarjeta-cita__autor {
          font-family: var(--sans);
          font-size: 0.8rem;
          font-weight: 500;
          color: var(--verde-montana);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
        .tarjeta-cita__acciones {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          padding: 1rem 2.5rem 1.75rem;
          border-top: 1px dashed rgba(21, 103, 46, 0.2);
        }
        .tarjeta-cita__boton {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.6rem 1rem;
          background: var(--verde-montana);
          color: var(--crema);
          border: 1px solid var(--verde-montana);
          border-radius: 2px;
          font-family: var(--sans);
          font-size: 0.78rem;
          font-weight: 500;
          letter-spacing: 0.04em;
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .tarjeta-cita__boton:hover {
          background: var(--verde-oscuro);
          border-color: var(--verde-oscuro);
          transform: translateY(-1px);
        }
        .tarjeta-cita__boton svg {
          width: 14px;
          height: 14px;
          flex-shrink: 0;
        }
        .tarjeta-cita__boton--secundario {
          background: transparent;
          color: var(--verde-montana);
        }
        .tarjeta-cita__boton--secundario:hover {
          background: var(--verde-montana);
          color: var(--crema);
        }
        @media (max-width: 600px) {
          .tarjeta-cita__contenido {
            padding: 2rem 1.5rem 1rem;
          }
          .tarjeta-cita__comilla {
            font-size: 3.5rem;
            top: 0.25rem;
            left: 0.5rem;
          }
          .tarjeta-cita__acciones {
            padding: 1rem 1.5rem 1.5rem;
          }
          .tarjeta-cita__boton {
            font-size: 0.72rem;
            padding: 0.55rem 0.85rem;
          }
        }
      `}</style>
    </figure>
  );
}
