import { mkdir, writeFile } from "node:fs/promises";

const directory = new URL("../public/fonts/", import.meta.url);
await mkdir(directory, { recursive: true });
const response = await fetch("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap", {
  headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36" },
});
if (!response.ok) throw new Error(`Font stylesheet: ${response.status}`);
const css = await response.text();
const blocks = Array.from(css.matchAll(/\/\* latin \*\/\s*@font-face\s*\{([^}]+)\}/g));
if (blocks.length !== 6) throw new Error("Expected six Latin font weights.");
await Promise.all(blocks.map(async ([, block]) => {
  const weight = block.match(/font-weight:\s*(\d+)/)?.[1];
  const url = block.match(/url\(([^)]+)\)/)?.[1];
  if (!weight || !url || !url.startsWith("https://fonts.gstatic.com/")) throw new Error("Unexpected font source.");
  const font = await fetch(url);
  if (!font.ok) throw new Error(`Font ${weight}: ${font.status}`);
  await writeFile(new URL(`poppins-${weight}.woff2`, directory), new Uint8Array(await font.arrayBuffer()));
  console.log(`Poppins ${weight} saved.`);
}));
const license = await fetch("https://raw.githubusercontent.com/google/fonts/main/ofl/poppins/OFL.txt");
if (!license.ok) throw new Error(`License: ${license.status}`);
await writeFile(new URL("OFL-Poppins.txt", directory), await license.text());
