import type { Metadata } from "next";
import { CategoryPage } from "../../components/CategoryPage";

export const metadata: Metadata = {
  title: "IA — Motion Design Portfolio",
  description: "Galería de inteligencia artificial y dirección visual generativa.",
};

const projects = Array.from({ length: 46 }, (_, index) => {
  const itemNumber = index + 1;
  const paddedNumber = String(itemNumber).padStart(3, "0");

  return {
    number: `IA.${itemNumber}`,
    title: {
      es: `Pieza de IA ${paddedNumber}`,
      en: `AI piece ${paddedNumber}`,
    },
    type: "AI Motion",
    video: `/ai-motion/ai-${paddedNumber}.mp4`,
  };
});

export default function AiMotionPage() {
  return (
    <CategoryPage
      category={{ es: "IA", en: "AI" }}
      description={{
        es: "Exploraciones creadas con inteligencia artificial, concepto y dirección de arte.",
        en: "Explorations created through artificial intelligence, concept and art direction.",
      }}
      currentHref="/motion-design"
      accent="motion"
      projects={projects}
      variant="video-gallery"
    />
  );
}
