import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";

async function render(pathname = "/") {
  const relative = pathname.replace(/^\/+|\/+$/g, "");
  const url = new URL(`../out/${relative ? `${relative}/` : ""}index.html`, import.meta.url);
  return new Response(await readFile(url, "utf8"), {
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

test("renderiza el portafolio", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Portfolio — Diseño \+ Desarrollo<\/title>/i);
  assert.match(html, /Ideas que/);
  assert.match(html, /Experiencias que/);
  assert.doesNotMatch(html, /Diseño con intención|Precisión técnica, materia digital e ideas inesperadas|Design with intention|Technical precision, digital matter and unexpected ideas/);
  assert.match(html, /Explorar proyectos/);
  assert.match(html, /proyecto-01/);
  assert.match(html, /Programación/);
  assert.match(html, /Motion Design/);
  assert.match(html, /Graphic Design/);
  for (const [number, title, href] of [
    ["01", "Programación", "/programacion"],
    ["02", "Motion Design", "/motion-design"],
    ["03", "Graphic Design", "/graphic-design"],
  ]) {
    const section = html.match(new RegExp(`<section[^>]+id="proyecto-${number}"[^>]*>([\\s\\S]*?)</section>`));
    assert.ok(section, `Existe la sección ${title}`);
    assert.match(section[1], new RegExp(`console-divider-${number}`));
    assert.match(section[1], new RegExp(`<h2 id="discipline-title-${number}">${title}</h2>`));
    assert.match(section[1], new RegExp(`href="${href}"`));
    if (number === "01") {
      assert.match(section[1], /src="\/programming-cover\.gif"/);
      assert.doesNotMatch(section[1], /code-preview|project-star/);
    }
  }
  assert.equal((html.match(/class="console-divider console-divider-/g) ?? []).length, 3);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/i);
});

for (const category of [
  ["/programacion", "Programación", "Creative Development"],
  ["/motion-design", "Motion Design", "motion-choice-ai"],
  ["/motion-design/ia", "IA", "motion-video-gallery"],
  ["/motion-design/motion", "Motion", "motion-video-gallery"],
  ["/graphic-design", "Graphic Design", "graphic-gallery"],
]) {
  test(`renderiza la categoría ${category[1]}`, async () => {
    const response = await render(category[0]);
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.match(html, new RegExp(category[1]));
    assert.match(html, new RegExp(category[2]));
    assert.match(html, /Volver al portafolio/);
    if (category[0] === "/motion-design/ia") {
      assert.equal((html.match(/<video\b/g) ?? []).length, 46);
    }
    if (category[0] === "/motion-design/motion") {
      assert.equal((html.match(/<video\b/g) ?? []).length, 43);
    }
    if (category[0] === "/graphic-design") {
      assert.equal((html.match(/<img\b/g) ?? []).length, 64);
    }
  });
}
