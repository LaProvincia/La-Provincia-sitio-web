import { SiteHeader } from "./components/SiteHeader";
import { SiteFooter } from "./components/SiteFooter";

export default function Home() {
  return (
    <>
      <SiteHeader active="home" />

      <main className="hero">
        <img
          src="/logo.png"
          alt="La Provincia — Consultoría política"
          className="hero__logo"
        />
        <div className="hero__divider" />
        <h1 className="hero__tagline">
          Abogamos por la palabra,
          <br />
          no por la confrontación.
        </h1>
        <p className="hero__description">
          Consultoría política basada en datos, cartografía electoral y
          narrativa estratégica. Acompañamos a candidatos, campañas y
          movimientos que entienden que la política moderna se gana con
          información, disciplina y buena narrativa.
        </p>

        <div className="cta-group">
          <span className="cta-label">Contacto</span>
          <a
            href="mailto:somos@laprovinciaco.com?subject=Consulta%20-%20La%20Provincia"
            className="cta"
          >
            <span>somos@laprovinciaco.com</span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>
      </main>

      <SiteFooter />

      <style>{`
        .hero {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 2rem 2rem 4rem;
          text-align: center;
          position: relative;
          z-index: 1;
        }
        .hero__logo {
          max-width: 320px;
          width: 100%;
          height: auto;
          margin-bottom: 2.5rem;
          opacity: 0;
          animation: fadeInUp 1s ease-out 0.2s forwards;
        }
        .hero__divider {
          width: 60px;
          height: 1px;
          background: var(--verde-montana);
          margin: 0 auto 2rem;
          opacity: 0;
          animation: expandLine 0.8s ease-out 0.6s forwards;
        }
        .hero__tagline {
          font-family: var(--serif);
          font-size: clamp(1.5rem, 4vw, 2.25rem);
          font-weight: 400;
          font-style: italic;
          color: var(--verde-montana);
          line-height: 1.3;
          max-width: 700px;
          margin: 0 auto 1.5rem;
          opacity: 0;
          animation: fadeInUp 1s ease-out 0.8s forwards;
        }
        .hero__description {
          font-family: var(--sans);
          font-size: 1rem;
          font-weight: 400;
          color: var(--verde-oscuro);
          max-width: 580px;
          margin: 0 auto 3rem;
          line-height: 1.7;
          opacity: 0;
          animation: fadeInUp 1s ease-out 1s forwards;
        }
        .cta-group {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          opacity: 0;
          animation: fadeInUp 1s ease-out 1.2s forwards;
        }
        .cta-label {
          font-family: var(--sans);
          font-size: 0.7rem;
          font-weight: 500;
          color: var(--verde-montana);
          letter-spacing: 0.25em;
          text-transform: uppercase;
          opacity: 0.8;
        }
        .cta {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem 2.25rem;
          background: var(--verde-montana);
          color: var(--crema);
          text-decoration: none;
          font-family: var(--sans);
          font-size: 0.95rem;
          font-weight: 500;
          letter-spacing: 0.05em;
          border: 1px solid var(--verde-montana);
          border-radius: 2px;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          position: relative;
          overflow: hidden;
        }
        .cta::before {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--verde-oscuro);
          transform: translateX(-100%);
          transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          z-index: 0;
        }
        .cta:hover::before {
          transform: translateX(0);
        }
        .cta span,
        .cta svg {
          position: relative;
          z-index: 1;
        }
        .cta:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(0, 30, 6, 0.15);
        }
        .cta svg {
          width: 16px;
          height: 16px;
          transition: transform 0.4s ease;
        }
        .cta:hover svg {
          transform: translateX(3px);
        }
        @media (max-width: 768px) {
          .hero { padding: 1rem 1.5rem 3rem; }
          .hero__logo { max-width: 240px; margin-bottom: 2rem; }
          .hero__tagline { font-size: 1.5rem; padding: 0 0.5rem; }
          .hero__description { font-size: 0.95rem; padding: 0 0.5rem; }
          .cta { padding: 0.9rem 1.75rem; font-size: 0.85rem; }
        }
        @media (max-width: 480px) {
          .hero__logo { max-width: 200px; }
          .hero__tagline { font-size: 1.25rem; }
        }
      `}</style>
    </>
  );
}
