import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.laprovinciaco.com"),
  title: "La Provincia · Consultoría política basada en datos",
  description:
    "La Provincia es una firma de consultoría política en Antioquia que integra análisis electoral, cartografía, contenido audiovisual y estrategia para candidatos y campañas.",
  authors: [{ name: "La Provincia" }],
  openGraph: {
    title: "La Provincia · Consultoría política basada en datos",
    description:
      "Datos, cartografía y narrativa estratégica para candidatos y campañas en Antioquia y Colombia.",
    url: "https://www.laprovinciaco.com",
    siteName: "La Provincia",
    images: [{ url: "/logo.png" }],
    locale: "es_CO",
    type: "website",
  },
  icons: { icon: "/logo.png" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Roboto:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
