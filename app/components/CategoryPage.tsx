"use client";

import { LanguageToggle, useLanguage } from "./LanguageProvider";
import { MotionVideo } from "./MotionVideo";

type LocalizedText = {
  es: string;
  en: string;
};

type Project = {
  number: string;
  title: LocalizedText;
  type: string;
  group?: "ai" | "motion";
  image?: string;
  video?: string;
};

type CategoryPageProps = {
  category: LocalizedText;
  description: LocalizedText;
  currentHref: string;
  accent: "programming" | "motion" | "graphic";
  projects: Project[];
  variant?: "projects" | "motion" | "gallery" | "video-gallery";
};

const categories = [
  { label: { es: "Programación", en: "Programming" }, href: "/programacion" },
  { label: { es: "Motion Design", en: "Motion Design" }, href: "/motion-design" },
  { label: { es: "Graphic Design", en: "Graphic Design" }, href: "/graphic-design" },
];

const interfaceCopy = {
  es: {
    navLabel: "Navegación de categoría",
    back: "← Volver al portafolio",
    collection: "Disciplina / Colección",
    projectsLabel: "Proyectos de",
    projectsTitle: "Proyectos",
    galleryTitle: "Galería",
    aiDescription: "Exploraciones visuales creadas con inteligencia artificial y dirección de arte.",
    motionDescription: "Piezas animadas, sistemas de movimiento y narrativa audiovisual.",
    placeholder: "Proyecto listo para completar con imágenes, descripción, proceso y resultados.",
    next: "¿Siguiente disciplina?",
    all: "Ver las tres categorías ↗",
  },
  en: {
    navLabel: "Category navigation",
    back: "← Back to portfolio",
    collection: "Discipline / Collection",
    projectsLabel: "Projects in",
    projectsTitle: "Projects",
    galleryTitle: "Gallery",
    aiDescription: "Visual explorations created with artificial intelligence and art direction.",
    motionDescription: "Animated pieces, motion systems and audiovisual storytelling.",
    placeholder: "Project ready to be completed with images, description, process and results.",
    next: "Next discipline?",
    all: "View all three categories ↗",
  },
} as const;

export function CategoryPage({
  category,
  description,
  currentHref,
  accent,
  projects,
  variant = "projects",
}: CategoryPageProps) {
  const { language } = useLanguage();
  const text = interfaceCopy[language];

  const renderProject = (project: Project, index: number) => (
    <article className={`category-project glass category-project-${(index % 4) + 1}`} key={project.number}>
      <div className="category-project-art" aria-hidden="true"><i /><b /></div>
      <header>
        <span>{project.number}</span>
        <small>{project.type}</small>
      </header>
      <div>
        <h2>{project.title[language]}</h2>
        <p>{text.placeholder}</p>
      </div>
    </article>
  );

  return (
    <main className={`category-shell category-${accent}`}>
      <nav className="category-nav glass" aria-label={text.navLabel}>
        <a className="category-back" href="/#trabajo">{text.back}</a>
        <div className="category-nav-actions">
          <div className="category-switcher">
            {categories.map((item) => (
              <a className={item.href === currentHref ? "active" : ""} href={item.href} key={item.href}>
                {item.label[language]}
              </a>
            ))}
          </div>
          <LanguageToggle />
        </div>
      </nav>

      <header className="category-hero">
        <div>
          <p>{text.collection}</p>
          <h1>{category[language]}</h1>
        </div>
        <aside className="glass">
          <span>01—{String(projects.length).padStart(2, "0")}</span>
          <p>{description[language]}</p>
        </aside>
      </header>

      {variant === "projects" && (
        <section className="category-section" aria-label={`${text.projectsLabel} ${category[language]}`}>
          <header className="category-section-heading"><span>01</span><h2>{text.projectsTitle}</h2></header>
          <div className="category-projects">{projects.map(renderProject)}</div>
        </section>
      )}

      {variant === "motion" && (
        <div className="motion-choices" aria-label={`${text.projectsLabel} ${category[language]}`}>
          <a className="motion-choice motion-choice-ai glass" href="/motion-design/ia" aria-labelledby="ai-section-title">
            <span>01</span>
            <h2 id="ai-section-title">{language === "es" ? "IA" : "AI"}</h2>
            <strong aria-hidden="true">↗</strong>
            <div aria-hidden="true"><video src="/ai-motion/ai-001.mp4" muted autoPlay loop playsInline preload="metadata" /></div>
          </a>
          <a className="motion-choice motion-choice-motion glass" href="/motion-design/motion" aria-labelledby="motion-section-title">
            <span>02</span>
            <h2 id="motion-section-title">Motion</h2>
            <strong aria-hidden="true">↗</strong>
            <div aria-hidden="true"><video src="/motion/motion-001.mp4" muted autoPlay loop playsInline preload="metadata" /></div>
          </a>
        </div>
      )}

      {variant === "gallery" && (
        <section className="category-section" aria-label={text.galleryTitle}>
          <div className="graphic-gallery">
            {projects.map((project) => (
              <figure className="gallery-item glass" key={project.number}>
                <div className="gallery-image">
                  <img src={project.image} alt={project.title[language]} loading="lazy" />
                </div>
              </figure>
            ))}
          </div>
        </section>
      )}

      {variant === "video-gallery" && (
        <section className="category-section" aria-label={`${text.projectsLabel} ${category[language]}`}>
          <div className="motion-video-gallery">
            {projects.map((project) => (
              <figure className="motion-video-item glass" key={project.number}>
                <MotionVideo src={project.video ?? ""} label={project.title[language]} />
              </figure>
            ))}
          </div>
        </section>
      )}

      <footer className="category-footer glass">
        <p>{text.next}</p>
        <a href="/#trabajo">{text.all}</a>
      </footer>
    </main>
  );
}
