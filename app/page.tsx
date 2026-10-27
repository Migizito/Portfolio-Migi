"use client";

import { LanguageToggle, useLanguage } from "./components/LanguageProvider";
import { HeroAnimation } from "./components/HeroAnimation";
import { ConsoleDivider } from "./components/ConsoleDivider";

const projects = [
  { id: "01", title: { es: "Programación", en: "Programming" }, href: "/programacion", className: "project-one", type: "Creative development" },
  { id: "02", title: { es: "Motion Design", en: "Motion Design" }, href: "/motion-design", className: "project-two", type: "Motion + AI" },
  { id: "03", title: { es: "Graphic Design", en: "Graphic Design" }, href: "/graphic-design", className: "project-three", type: "Visual design" },
] as const;

const copy = {
  es: { navLabel: "Navegación principal", home: "Inicio", work: "Trabajo", profile: "Perfil", contact: "Contacto", eyebrow: "Diseñador + Developer", heroStart: "Ideas que", heroFeel: "se sienten.", heroExperience: "Experiencias que", heroWork: "funcionan.", noteTitle: "Diseño con intención", noteBody: "Precisión técnica, materia digital e ideas inesperadas.", ticker: "Diseño digital ✦ Desarrollo creativo ✦ Interacción ✦ Dirección visual ✦", selection: "Selección / 01—03", explore: "Explorar proyectos", openCategory: "Abrir categoría", enter: "Ver proyectos", email: "Correo", connect: "¿Creamos algo juntos?", credit: "Animación de portada" },
  en: { navLabel: "Main navigation", home: "Home", work: "Work", profile: "About", contact: "Contact", eyebrow: "Designer + Developer", heroStart: "Ideas you", heroFeel: "can feel.", heroExperience: "Experiences", heroWork: "that work.", noteTitle: "Design with intention", noteBody: "Technical precision, digital matter and unexpected ideas.", ticker: "Digital design ✦ Creative development ✦ Interaction ✦ Visual direction ✦", selection: "Selection / 01—03", explore: "Explore projects", openCategory: "Open category", enter: "View projects", email: "Email", connect: "Let's make something together.", credit: "Cover animation" },
} as const;

export default function Home() {
  const { language } = useLanguage();
  const text = copy[language];
  return (
    <main className="site-shell">
      <nav className="site-nav" aria-label={text.navLabel}>
        <a className="brand" href="#inicio" aria-label="Miguel Tapia — Portfolio"><span className="brand-symbol" aria-hidden="true">m.</span><span>MIGUEL<br />TAPIA</span></a>
        <div className="nav-links">
          <a href="#inicio">{text.home}</a><a href="#trabajo">{text.work}</a><a href="#perfil">{text.profile}</a><a href="#contacto">{text.contact}</a>
        </div>
        <LanguageToggle />
      </nav>

      <section className="hero" id="inicio" aria-labelledby="hero-title">
        <div className="hero-topline"><p>{text.eyebrow}</p><p>PORTFOLIO / 2026</p></div>
        <h1 id="hero-title" className="sr-only">Portfolio — Miguel Tapia</h1>
        <HeroAnimation />
        <div className="hero-bottomline">
          <div className="name-sticker"><strong>MIGUEL TAPIA</strong><span>{text.eyebrow}</span></div>
          <a className="primary-link" href="#trabajo">{text.enter}<span aria-hidden="true">↘</span></a>
          <span className="edition">2026<span aria-hidden="true">☺</span></span>
        </div>
      </section>

      <div className="ticker" aria-hidden="true"><div className="ticker-track">{[0, 1, 2, 3].map(item => <span key={item}>{text.ticker}</span>)}</div></div>

      <section className="introduction" id="perfil" aria-labelledby="intro-title">
        <img className="intro-star" src="/star.png" alt="" width="180" height="180" loading="lazy" />
        <h2 id="intro-title">{text.heroStart} <em>{text.heroFeel}</em><br />{text.heroExperience} <em>{text.heroWork}</em></h2>
      </section>

      <section className="work" id="trabajo" aria-labelledby="work-title">
        <h2 id="work-title" className="sr-only">{text.explore}</h2>
        <div className="discipline-sections">
          {projects.map(project => (
            <section className="discipline-section" id={`proyecto-${project.id}`} aria-labelledby={`discipline-title-${project.id}`} key={project.id}>
              <ConsoleDivider number={project.id} title={project.title[language]} titleId={`discipline-title-${project.id}`} />
              <a className={`project-card ${project.className}`} href={project.href} aria-label={`${text.openCategory} ${project.title[language]}`}>
              <div className="project-cover" aria-hidden="true">
                {project.id === "01" ? <img src="/programming-cover.gif" alt="" width="500" height="400" loading="lazy" /> : project.id === "02" ? <><video src="/motion/motion-001.mp4" muted loop autoPlay playsInline preload="metadata" /><span className="play-symbol">▶</span></> : <img src="/portfolio/graphic-001.png" alt="" loading="lazy" />}
                <span className="project-number">{project.id}</span>
              </div>
              <header><p>{project.type}</p><span className="project-entry-button"><span className="project-entry-label">{text.enter}</span><span className="card-arrow" aria-hidden="true">↗</span></span></header>
              </a>
            </section>
          ))}
        </div>
      </section>

      <footer className="profile" id="contacto" aria-labelledby="footer-title">
        <h2 id="footer-title" className="sr-only">Thank You</h2>
        <HeroAnimation variant="footer" />
      </footer>
    </main>
  );
}
