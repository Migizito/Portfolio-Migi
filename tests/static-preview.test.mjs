import assert from "node:assert/strict";
import test from "node:test";
import { createStaticServer } from "../scripts/preview-static.mjs";

test("la exportación sirve rutas, errores y videos con rangos", async t => {
  const server = await createStaticServer();
  await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
  t.after(() => {
    server.closeAllConnections();
    return new Promise(resolve => server.close(resolve));
  });
  const origin = `http://127.0.0.1:${server.address().port}`;
  const page = await fetch(`${origin}/motion-design/ia/`);
  assert.equal(page.status, 200);
  assert.match(await page.text(), /motion-video-gallery/);

  const missing = await fetch(`${origin}/does-not-exist/`);
  assert.equal(missing.status, 404);
  await missing.arrayBuffer();

  const forbidden = await fetch(`${origin}/..%5cpackage.json`);
  assert.equal(forbidden.status, 403);
  await forbidden.arrayBuffer();

  const head = await fetch(`${origin}/motion/motion-001.mp4`, { method: "HEAD" });
  assert.equal(head.status, 200);
  assert.equal(head.headers.get("content-type"), "video/mp4");
  const range = await fetch(`${origin}/motion/motion-001.mp4`, { headers: { Range: "bytes=0-31" } });
  assert.equal(range.status, 206);
  assert.match(range.headers.get("content-range"), /^bytes 0-31\/\d+$/);
  assert.equal((await range.arrayBuffer()).byteLength, 32);

  const badRange = await fetch(`${origin}/motion/motion-001.mp4`, { headers: { Range: "bytes=99999999999-" } });
  assert.equal(badRange.status, 416);
  await badRange.arrayBuffer();
});
