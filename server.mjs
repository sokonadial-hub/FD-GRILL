// Serves the built site (dist/) with Node's built-in http module, for hosts
// that run a Node.js app (Hostinger, Render, a VPS...). GitHub Pages doesn't
// need this: it serves dist/ directly. Run `npm run build` first, then `npm start`.
import { createReadStream } from "node:fs"
import { stat } from "node:fs/promises"
import { createServer } from "node:http"
import { extname, join, normalize, sep } from "node:path"
import { fileURLToPath } from "node:url"
import { createGzip } from "node:zlib"

const ROOT = fileURLToPath(new URL("./dist/", import.meta.url))
const PORT = Number(process.env.PORT) || 3000

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
}
const COMPRESSIBLE = new Set([".html", ".css", ".js", ".json", ".xml", ".txt", ".svg"])

async function findFile(urlPath) {
  // Resolve inside dist/ only; anything that escapes it is treated as missing
  let decoded
  try {
    decoded = decodeURIComponent(urlPath)
  } catch {
    return null // malformed escapes like /%E0
  }
  const path = normalize(join(ROOT, decoded))
  if (path !== ROOT.slice(0, -1) && !path.startsWith(ROOT)) return null
  try {
    const info = await stat(path)
    if (info.isDirectory()) return findFile(join(urlPath, "index.html"))
    return { path, size: info.size }
  } catch {
    return null
  }
}

const server = createServer(async (req, res) => {
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.writeHead(405, { Allow: "GET, HEAD" }).end()
    return
  }
  const urlPath = new URL(req.url ?? "/", "http://localhost").pathname
  let file = await findFile(urlPath)
  let status = 200
  if (!file) {
    file = await findFile("/404.html")
    status = 404
    if (!file) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" }).end("Not found. Did you run npm run build?")
      return
    }
  }

  const ext = extname(file.path)
  const headers = {
    "Content-Type": TYPES[ext] ?? "application/octet-stream",
    "X-Content-Type-Options": "nosniff",
    // Vite fingerprints everything in assets/, so those files never change
    "Cache-Control": file.path.includes(`${sep}assets${sep}`) ? "public, max-age=31536000, immutable" : "public, max-age=600",
  }
  const gzip = COMPRESSIBLE.has(ext) && /\bgzip\b/.test(req.headers["accept-encoding"] ?? "")
  if (gzip) {
    headers["Content-Encoding"] = "gzip"
    headers.Vary = "Accept-Encoding"
  } else {
    headers["Content-Length"] = file.size
  }
  res.writeHead(status, headers)
  if (req.method === "HEAD") return res.end()
  const stream = createReadStream(file.path)
  ;(gzip ? stream.pipe(createGzip()) : stream).pipe(res)
})

server.listen(PORT, () => console.log(`FD Grill site running at http://localhost:${PORT}`))
