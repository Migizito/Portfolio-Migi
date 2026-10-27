"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type Language = "es" | "en";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("es");

  useEffect(() => {
    const saved = window.localStorage.getItem("portfolio-language");
    if (saved === "es" || saved === "en") {
      setLanguageState(saved);
      document.documentElement.lang = saved;
    }
  }, []);

  const setLanguage = (nextLanguage: Language) => {
    setLanguageState(nextLanguage);
    window.localStorage.setItem("portfolio-language", nextLanguage);
    document.documentElement.lang = nextLanguage;
  };

  const value = useMemo(() => ({ language, setLanguage }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }
  return context;
}

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      className="language-toggle"
      type="button"
      onClick={() => setLanguage(language === "es" ? "en" : "es")}
      aria-label={language === "es" ? "Cambiar el sitio a inglés" : "Switch the site to Spanish"}
      title={language === "es" ? "Cambiar a inglés" : "Switch to Spanish"}
    >
      <span className={language === "es" ? "active" : ""}>es</span>
      <i aria-hidden="true">/</i>
      <span className={language === "en" ? "active" : ""}>en</span>
    </button>
  );
}
