"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "./LanguageProvider";

export function HeroAnimation({ variant = "hero" }: { variant?: "hero" | "footer" }) {
  const [paused, setPaused] = useState(false);
  const { language } = useLanguage();
  const isFooter = variant === "footer";
  const imageName = isFooter ? "creative-footer" : "creative-hero";
  const description = isFooter
    ? { es: "Thank You: mano animada con un lápiz, formas 3D y un panel azul", en: "Thank You: animated hand holding a pen, 3D objects and a blue panel" }
    : { es: "Portfolio: ilustración de una mano con un lápiz y objetos creativos en 3D", en: "Portfolio: illustration of a hand holding a pen with playful 3D creative objects" };
  const animationLabel = language === "es"
    ? `${paused ? "Reproducir" : "Pausar"} animación${isFooter ? " final" : ""}`
    : `${paused ? "Play" : "Pause"} ${isFooter ? "footer " : ""}animation`;
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPaused(preference.matches);
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);
  return (
    <div className={isFooter ? "footer-artwork" : "hero-artwork"}>
      <img src={`/${imageName}${paused ? "-poster.png" : ".gif"}`} width="1400" height={isFooter ? 877 : 1089} alt={description[language]} loading={isFooter ? "lazy" : "eager"} fetchPriority={isFooter ? "auto" : "high"} />
      {isFooter && <>
        <a className="footer-sticker footer-sticker-email" href="mailto:hello@migueltapia.dev"><span aria-hidden="true">✉</span>hello@migueltapia.dev</a>
        <span className="footer-sticker footer-sticker-name">MIGUEL TAPIA</span>
        <a className="footer-sticker footer-sticker-github" href="https://github.com/" target="_blank" rel="noreferrer">GitHub ↗</a>
        <a className="footer-sticker footer-sticker-linkedin" href="https://www.linkedin.com/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
      </>}
      <button type="button" className="animation-toggle" onClick={() => setPaused(!paused)} aria-pressed={paused} aria-label={animationLabel}><span aria-hidden="true">{paused ? "▶" : "Ⅱ"}</span></button>
    </div>
  );
}
