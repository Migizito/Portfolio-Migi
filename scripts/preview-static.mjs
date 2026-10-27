import { createServer } from "node:http";
import { createReadStream } from "node:fs";
import { realpath, stat } from "node:fs/promises";
import { extname, isAbsolute, relative, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const mime = {
  ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8", ".json": "application/json",
  ".txt": "text/plain; charset=utf-8", ".svg": "image/svg+xml",
  ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg",
  ".gif": "image/gif", ".webp": "image/webp", ".ico": "image/x-icon",
  ".mp4": "video/mp4", ".woff2": "font/woff2", ".glb": "model/gltf-binary",
};

export async function createStaticServer(directory = "out") {
  const root = await realpath(directory);
  return createServer((request, response) => {
    async function serve() {
      if (!["GET", "HEAD"].includes(request.method)) {
        response.writeHead(405, { Allow: "GET, HEAD" });
        return response.end();
      }
      let pathname;
      try { pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname); }
      catch { response.writeHead(400); return response.end(); }
      if (pathname.includes("\\") || pathname.includes("\0") || pathname.split("/").some(part => part.startsWith("."))) {
        response.writeHead(403); return response.end();
      }
      let file = resolve(root, `.${pathname}`);
      let status = 200;
      try {
        if ((await stat(file)).isDirectory()) file = resolve(file, "index.html");
        file = await realpath(file);
      } catch {
        status = 404;
        file = resolve(root, "404.html");
        try { file = await realpath(file); }
        catch { response.writeHead(404); return response.end("Not found"); }
      }
      const rel = relative(root, file);
      if (rel === ".." || rel.startsWith(`..${process.platform === "win32" ? "\\" : "/"}`) || isAbsolute(rel)) {
        response.writeHead(403); return response.end();
      }
      const info = await stat(file);
      if (!info.isFile()) { response.writeHead(404); return response.end(); }
      let start = 0, end = info.size - 1;
      const headers = {
        "Content-Type": mime[extname(file).toLowerCase()] ?? "application/octet-stream",
        "Content-Length": info.size,
        "Accept-Ranges": "bytes",
        "X-Content-Type-Options": "nosniff",
      };
      if (request.headers.range && status === 200) {
        const match = /^bytes=(\d*)-(\d*)$/.exec(request.headers.range);
        if (match && (match[1] || match[2])) {
          start = match[1] ? Number(match[1]) : Math.max(0, info.size - Number(match[2]));
          end = match[1] && match[2] ? Math.min(Number(match[2]), end) : end;
        } else { start = info.size; }
        if (!Number.isSafeInteger(start) || !Number.isSafeInteger(end) || start < 0 || start > end || start >= info.size) {
          response.writeHead(416, { "Content-Range": `bytes */${info.size}` });
          return response.end();
        }
        status = 206;
        headers["Content-Range"] = `bytes ${start}-${end}/${info.size}`;
        headers["Content-Length"] = end - start + 1;
      }
      response.writeHead(status, headers);
      if (request.method === "HEAD" || info.size === 0) return response.end();
      const stream = createReadStream(file, { start, end });
      stream.on("error", () => response.destroy());
      response.on("close", () => stream.destroy());
      stream.pipe(response);
    }
    serve().catch(() => {
      if (!response.headersSent) response.writeHead(500);
      response.end();
    });
  });
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  try {
    const server = await createStaticServer();
    const port = Number(process.env.PORT ?? 3000);
    server.on("error", error => { console.error(error.message); process.exitCode = 1; });
    server.listen(port, "127.0.0.1", () => console.log(`Static portfolio: http://localhost:${port}`));
  } catch (error) {
    console.error(`Cannot preview out/. Run npm run build first. ${error.message}`);
    process.exitCode = 1;
  }
}
