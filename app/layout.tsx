import type { Metadata } from "next";
import { LanguageProvider } from "./components/LanguageProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Portfolio — Diseño + Desarrollo",
  description: "Portafolio de diseño y desarrollo de experiencias digitales.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body><LanguageProvider>{children}</LanguageProvider></body>
    </html>
  );
}
