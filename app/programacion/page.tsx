import type { Metadata } from "next";
import { CategoryPage } from "../components/CategoryPage";

export const metadata: Metadata = {
  title: "Programación — Portfolio",
  description: "Selección de proyectos de programación y desarrollo creativo.",
};

const projects = [
  {
    number: "01.1",
    title: { es: "Experiencia web interactiva", en: "Interactive web experience" },
    type: "Creative Development",
  },
  {
    number: "01.2",
    title: { es: "Aplicación de producto", en: "Product application" },
    type: "Frontend",
  },
  {
    number: "01.3",
    title: { es: "Sistema digital", en: "Digital system" },
    type: "Web App",
  },
  {
    number: "01.4",
    title: { es: "Experimento generativo", en: "Generative experiment" },
    type: "Creative Coding",
  },
];

export default function ProgrammingPage() {
  return (
    <CategoryPage
      category={{ es: "Programación", en: "Programming" }}
      description={{
        es: "Interfaces, experiencias web y sistemas digitales construidos desde la lógica, el detalle y la interacción.",
        en: "Interfaces, web experiences and digital systems built through logic, detail and interaction.",
      }}
      currentHref="/programacion"
      accent="programming"
      projects={projects}
      variant="projects"
    />
  );
}
