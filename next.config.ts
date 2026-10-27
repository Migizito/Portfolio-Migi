import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Netlify serves the generated HTML, scripts and media directly from out/.
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
