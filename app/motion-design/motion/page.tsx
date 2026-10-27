import type { Metadata } from "next";
import { CategoryPage } from "../../components/CategoryPage";

export const metadata: Metadata = {
  title: "Motion — Motion Design Portfolio",
  description: "Galería de animación, identidad en movimiento y narrativa audiovisual.",
};

const projects = Array.from({ length: 43 }, (_, index) => {
  const itemNumber = index + 1;
  const paddedNumber = String(itemNumber).padStart(3, "0");

  return {
    number: `MO.${itemNumber}`,
    title: {
      es: `Pieza de motion ${paddedNumber}`,
      en: `Motion piece ${paddedNumber}`,
    },
    type: "Motion Design",
    video: `/motion/motion-${paddedNumber}.mp4`,
  };
});

export default function MotionProjectsPage() {
  return (
    <CategoryPage
      category={{ es: "Motion", en: "Motion" }}
      description={{
        es: "Movimiento, ritmo y narrativa visual aplicados a marcas, productos e interfaces.",
        en: "Motion, rhythm and visual storytelling applied to brands, products and interfaces.",
      }}
      currentHref="/motion-design"
      accent="motion"
      projects={projects}
      variant="video-gallery"
    />
  );
}
