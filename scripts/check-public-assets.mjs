import { open, readdir } from "node:fs/promises";
import { join } from "node:path";

// CI checks the source with LFS pointers to avoid downloading 1+ GB per test.
// A real Netlify deploy must contain the actual media, never those pointers.
if (process.env.NETLIFY === "true") {
  const missing = [];
  for (const relative of await readdir("public", { recursive: true })) {
    if (!/\.(mp4|gif|png|jpe?g|webp|glb)$/i.test(relative)) continue;
    const file = await open(join("public", relative), "r");
    try {
      const buffer = Buffer.alloc(128);
      const { bytesRead } = await file.read(buffer, 0, buffer.length, 0);
      if (buffer.subarray(0, bytesRead).toString().startsWith("version https://git-lfs.github.com/spec/v1")) {
        missing.push(relative);
      }
    } finally {
      await file.close();
    }
  }
  if (missing.length) {
    console.error(`Missing Git LFS media (${missing.length} files). Set GIT_LFS_ENABLED=true in the Netlify UI and retry with a cleared build cache. First missing file: ${missing[0]}`);
    process.exitCode = 1;
  }
}
