import type { Metadata } from "next";
import { CategoryPage } from "../components/CategoryPage";

export const metadata: Metadata = {
  title: "Graphic Design — Portfolio",
  description: "Galería de proyectos de diseño gráfico y dirección visual.",
};

const jpgImages = new Set([40, 51]);

const projects = Array.from({ length: 64 }, (_, index) => {
  const itemNumber = index + 1;
  const extension = jpgImages.has(itemNumber) ? "jpg" : "png";
  const paddedNumber = String(itemNumber).padStart(3, "0");

  return {
    number: `03.${itemNumber}`,
    title: {
      es: `Pieza gráfica ${paddedNumber}`,
      en: `Graphic piece ${paddedNumber}`,
    },
    type: "Graphic Design",
    image: `/portfolio/graphic-${paddedNumber}.${extension}`,
  };
});

export default function GraphicDesignPage() {
  return (
    <CategoryPage
      category={{ es: "Graphic Design", en: "Graphic Design" }}
      description={{
        es: "Una galería de identidades, sistemas gráficos y composiciones visuales.",
        en: "A gallery of identities, graphic systems and visual compositions.",
      }}
      currentHref="/graphic-design"
      accent="graphic"
      projects={projects}
      variant="gallery"
    />
  );
}
