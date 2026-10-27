import assert from "node:assert/strict";
import test from "node:test";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { tmpdir } from "node:os";
import { basename, join } from "node:path";
import { fileURLToPath } from "node:url";

test("Netlify rechaza medios que siguen siendo punteros LFS", async t => {
  const fixture = await mkdtemp(join(tmpdir(), "portfolio-lfs-test-"));
  t.after(async () => {
    assert.ok(basename(fixture).startsWith("portfolio-lfs-test-"));
    await rm(fixture, { recursive: true, force: true });
  });
  await mkdir(join(fixture, "public"));
  await writeFile(join(fixture, "public", "sample.mp4"), "version https://git-lfs.github.com/spec/v1\noid sha256:test\nsize 100\n");
  const script = fileURLToPath(new URL("../scripts/check-public-assets.mjs", import.meta.url));
  const options = { cwd: fixture, env: { ...process.env, NETLIFY: "true" }, stdio: "pipe" };
  assert.throws(() => execFileSync(process.execPath, [script], options), error => {
    assert.equal(error.status, 1);
    assert.match(error.stderr.toString(), /GIT_LFS_ENABLED=true/);
    return true;
  });
  await writeFile(join(fixture, "public", "sample.mp4"), Buffer.from([0, 0, 0, 20, 102, 116, 121, 112]));
  assert.doesNotThrow(() => execFileSync(process.execPath, [script], options));
});
