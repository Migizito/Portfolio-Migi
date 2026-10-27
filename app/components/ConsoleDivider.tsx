"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "./LanguageProvider";

type ConsoleDividerProps = {
  number: "01" | "02" | "03";
  title: string;
  eyebrow?: string;
  titleId?: string;
};

export function ConsoleDivider({ number, title, eyebrow, titleId }: ConsoleDividerProps) {
  const { language } = useLanguage();
  const dividerRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPaused(preference.matches);
    update();
    preference.addEventListener("change", update);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.15 });
    if (dividerRef.current) observer.observe(dividerRef.current);
    return () => {
      preference.removeEventListener("change", update);
      observer.disconnect();
    };
  }, []);

  const playing = visible && !paused;
  return (
    <header ref={dividerRef} className={`console-divider console-divider-${number}${playing ? " is-playing" : ""}`}>
      <div className="console-heading">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 id={titleId}>{title}</h2>
      </div>
      <div className="console-crop" aria-hidden="true">
        <img src={`/console-${number}${playing ? ".gif" : "-poster.png"}`} width="1400" height="547" alt="" loading="lazy" />
      </div>
      <button className="console-toggle" type="button" onClick={() => setPaused(!paused)} aria-pressed={paused} aria-label={language === "es" ? `${paused ? "Reproducir" : "Pausar"} consola ${number}` : `${paused ? "Play" : "Pause"} console ${number}`}><span aria-hidden="true">{paused ? "▶" : "Ⅱ"}</span></button>
    </header>
  );
}
