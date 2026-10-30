// Writes the server-rendered page into dist/index.html, then removes the SSR build.
import { readFile, rm, writeFile } from "node:fs/promises"
import { fileURLToPath, pathToFileURL } from "node:url"

const root = fileURLToPath(new URL("..", import.meta.url))
const { render } = await import(pathToFileURL(`${root}dist-ssr/entry-server.js`).href)

const file = `${root}dist/index.html`
const template = await readFile(file, "utf8")
if (!template.includes("<!--app-html-->")) throw new Error("dist/index.html is missing the <!--app-html--> marker")
await writeFile(file, template.replace("<!--app-html-->", render()))
await rm(`${root}dist-ssr`, { recursive: true, force: true })
console.log("Pre-rendered dist/index.html")
