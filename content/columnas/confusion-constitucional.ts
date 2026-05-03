import type { Columna } from "../columnas";

export const confusionConstitucional: Columna = {
  slug: "confusion-constitucional",
  titulo: "¿Confusión constitucional?",
  resumen:
    "Sobre la propuesta de Asamblea Constituyente y la diferencia esencial entre reforma y poder originario.",
  fecha: "2026-05-02",
  fechaLegible: "2 de mayo de 2026",
  autor: {
    nombre: "Allan A. Arias",
    bio: "Columnista de La Provincia.",
    foto: "/Foto_Allan.jpeg",
  },
  citas: [
    {
      id: 1,
      texto:
        "Una reforma constitucional implica modificar aspectos puntuales de la Carta, mientras que una Asamblea Constituyente tiene poder originario, lo que implica que puede redefinir completamente las reglas de juego de la Nación.",
    },
    {
      id: 2,
      texto:
        "Activar este mecanismo sin un consenso amplio, profundo y genuino podría derivar en una crisis mayor.",
    },
    {
      id: 3,
      texto:
        "Yo prefiero seguir promocionando la defensa, la guarda y la Supremacía de nuestra actual Carta Política.",
    },
  ],
  cuerpo: [
    {
      tipo: "parrafo",
      texto:
        "Apreciados lectores, en las últimas semanas, el presidente Petro ha vuelto a traer a colación una idea que, lejos de ser novedosa, resulta profundamente inquietante: la convocatoria de una Asamblea Nacional Constituyente. No es la primera vez que el jefe de Gobierno lo sugiere, cuestión por la que no deja de ser preocupante su insistencia en ello, ya que actualmente vivimos un panorama político muy polarizado. Por lo anterior, la propuesta no puede leerse como un simple ejercicio democrático, sino como un movimiento de alto riesgo para la estabilidad del orden constitucional vigente. Así, pues, me gustaría aprovechar la escritura de esta columna, para precisar dos conceptos que el presidente parece confundir, o lo hace deliberadamente para confundir a la población.",
    },
    {
      tipo: "parrafo",
      texto:
        "Petro, con su propuesta de la Constituyente, pretende presentar este mecanismo como si se tratara de una reforma constitucional más. Sin embargo, esa equiparación es imprecisa y engañosa. Una reforma constitucional, tramitada por el Congreso, implica modificar aspectos puntuales de la Carta, siempre respetando su estructura esencial, mientras que una Asamblea Constituyente tiene poder originario, lo que implica que puede redefinir completamente las reglas de juego de la Nación, entonces confundir ambos escenarios no es un error leve.",
    },
    { tipo: "cita", citaId: 1 },
    {
      tipo: "parrafo",
      texto:
        "El peligro de la Constituyente es latente y activar este mecanismo sin un consenso amplio, profundo y genuino podría derivar en una crisis mayor. En tal sentido, esta propuesta no sería una solución sino el detonante de una inestabilidad prolongada, porque con ella nos estaríamos jugando el pacto institucional que ha regido en el país desde 1991.",
    },
    { tipo: "cita", citaId: 2 },
    {
      tipo: "parrafo",
      texto:
        "En síntesis, una Asamblea Constituyente en estos momentos es muy peligrosa, porque, así el gobierno actual quiera matizarlo, puede abrirle la puerta a la sustitución total de la Constitución. Por eso, yo prefiero seguir promocionando la defensa, la guarda y la Supremacía de nuestra actual Carta Política.",
    },
    { tipo: "cita", citaId: 3 },
  ],
  tags: ["Constitución", "Petro", "Opinión", "Análisis político"],
};
