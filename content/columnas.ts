// Sistema de columnas — registro central
// Cada columna se define como un objeto con su contenido completo.
// Para agregar una columna nueva: crear un archivo en content/columnas/[slug].ts
// y registrarlo en el array `columnas` al final de este archivo.

export interface Cita {
  id: number;
  texto: string;
}

export interface Autor {
  nombre: string;
  bio: string;
  foto: string;
}

export interface Columna {
  slug: string;
  titulo: string;
  resumen: string;
  fecha: string; // ISO format YYYY-MM-DD
  fechaLegible: string; // ej. "2 de mayo de 2026"
  autor: Autor;
  // El cuerpo es un array de bloques: párrafos de texto y citas destacadas intercaladas
  cuerpo: Array<
    | { tipo: "parrafo"; texto: string }
    | { tipo: "cita"; citaId: number }
  >;
  citas: Cita[];
  tags: string[];
}

import { confusionConstitucional } from "@/content/columnas/confusion-constitucional";

export const columnas: Columna[] = [confusionConstitucional];

export function getColumnaBySlug(slug: string): Columna | undefined {
  return columnas.find((c) => c.slug === slug);
}

export function getCita(columna: Columna, citaId: number): Cita | undefined {
  return columna.citas.find((c) => c.id === citaId);
}
