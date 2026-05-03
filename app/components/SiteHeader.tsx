import Link from "next/link";

interface SiteHeaderProps {
  active?: "home" | "columnas";
}

export function SiteHeader({ active }: SiteHeaderProps) {
  return (
    <header className="site-header">
      <div className="site-header__left">
        <Link href="/" className="site-header__brand">
          La Provincia
        </Link>
        <nav className="site-header__nav" aria-label="Navegación principal">
          <Link href="/" className={active === "home" ? "active" : ""}>
            Inicio
          </Link>
          <Link
            href="/columnas"
            className={active === "columnas" ? "active" : ""}
          >
            Columnas
          </Link>
        </nav>
      </div>
      <div className="site-header__location">Antioquia · Colombia</div>
    </header>
  );
}
