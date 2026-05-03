# La Provincia · Sitio Web

Sitio oficial de **La Provincia**, firma de consultoría política basada en Antioquia. Construido con Next.js 15 y desplegado en Vercel.

## 🏛️ Estructura del proyecto

```
app/
├── page.tsx                          # Home (landing original)
├── layout.tsx                        # Layout root con fuentes y metadatos
├── globals.css                       # Estilos compartidos (header, footer, paleta)
├── components/
│   ├── SiteHeader.tsx                # Header con navegación
│   ├── SiteFooter.tsx                # Footer
│   └── TarjetaCita.tsx               # Cita destacada con botones de descarga
├── columnas/
│   ├── page.tsx                      # Índice de columnas
│   └── [slug]/
│       ├── page.tsx                  # Página de columna individual
│       └── cita/[id]/page.tsx        # Página individual por cita (para Open Graph)
└── api/og/cita/
    └── route.tsx                     # Generador dinámico de imágenes 1080×1350 / 1080×1920

content/
├── columnas.ts                       # Registro central de columnas
└── columnas/
    └── confusion-constitucional.ts   # Una columna por archivo

public/
├── logo.png                          # Logo de La Provincia
└── Foto_Allan.jpeg                   # Foto del columnista Allan A. Arias
```

## 🎨 Identidad visual

Paleta oficial del manual de marca:

- `--verde-montana: #15672E` — color principal
- `--verde-oscuro: #001E06` — texto y acentos
- `--crema: #DCD0BA` — fondo
- `--crema-claro: #E8DFCC` — fondos secundarios

Tipografías: **Cormorant Garamond** (serif editorial, alternativa libre a Nyala) + **Roboto** (sans-serif).

## 📰 Cómo agregar una columna nueva

1. Crear archivo en `content/columnas/[slug-de-la-columna].ts` siguiendo el modelo de `confusion-constitucional.ts`.
2. Importarlo y registrarlo en el array `columnas` de `content/columnas.ts`.
3. Si el autor es nuevo, subir su foto a `/public/` y referenciarla en el campo `autor.foto`.
4. Hacer commit. Vercel despliega automáticamente.

Estructura mínima de una columna:

```ts
export const miColumna: Columna = {
  slug: "mi-columna",
  titulo: "Título",
  resumen: "Descripción breve para SEO y redes",
  fecha: "2026-MM-DD",
  fechaLegible: "X de mes de 2026",
  autor: {
    nombre: "Nombre del autor",
    bio: "Bio corta",
    foto: "/foto-autor.jpeg",
  },
  citas: [
    { id: 1, texto: "Frase clave 1" },
    { id: 2, texto: "Frase clave 2" },
    { id: 3, texto: "Frase clave 3" },
  ],
  cuerpo: [
    { tipo: "parrafo", texto: "..." },
    { tipo: "cita", citaId: 1 },
    { tipo: "parrafo", texto: "..." },
    // ...
  ],
  tags: ["Tag 1", "Tag 2"],
};
```

## 📲 Sistema de citas compartibles

Cada cita destacada tiene **tres botones funcionales**:

1. **Descargar para feed** — genera un PNG 1080×1350 (formato vertical de Instagram feed) listo para subir.
2. **Descargar para historia** — genera un PNG 1080×1920 (formato 9:16 de stories).
3. **Copiar enlace** — copia la URL única de la cita; al pegarla en WhatsApp, X, Instagram DMs o cualquier red, aparece automáticamente la imagen como vista previa gracias a Open Graph.

### URLs únicas por cita

- Página de cita: `https://www.laprovinciaco.com/columnas/[slug]/cita/[id]`
- API de imagen: `https://www.laprovinciaco.com/api/og/cita?slug=[slug]&id=[id]&format=feed|story`

Las imágenes se generan **al vuelo** con `@vercel/og` — no hay archivos PNG estáticos que mantener. Cualquier cambio en el texto de la cita actualiza automáticamente todas las versiones.

## 🚀 Desarrollo local

```bash
npm install
npm run dev
```

Sitio disponible en `http://localhost:3000`.

## 🌐 Despliegue

Vercel detecta automáticamente cualquier push a `main` y despliega. Las ramas de feature generan deploys de preview con URLs propias.
