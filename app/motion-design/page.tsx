import type { Metadata } from "next";
import { CategoryPage } from "../components/CategoryPage";

export const metadata: Metadata = {
  title: "Motion Design — Portfolio",
  description: "Selección de proyectos de motion design y animación.",
};

const projects = [
  {
    number: "02.1",
    title: { es: "IA", en: "AI" },
    type: "AI",
    group: "ai" as const,
  },
  {
    number: "02.2",
    title: { es: "Motion", en: "Motion" },
    type: "Motion",
    group: "motion" as const,
  },
];

export default function MotionDesignPage() {
  return (
    <CategoryPage
      category={{ es: "Motion Design", en: "Motion Design" }}
      description={{
        es: "Movimiento, ritmo y narrativa visual aplicados a marcas, productos e interfaces digitales.",
        en: "Motion, rhythm and visual storytelling applied to brands, products and digital interfaces.",
      }}
      currentHref="/motion-design"
      accent="motion"
      projects={projects}
      variant="motion"
    />
  );
}
