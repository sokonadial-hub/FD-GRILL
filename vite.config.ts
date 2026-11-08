import path from "node:path"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "vite"

// Relative base so the site works on fdgrill.com and on the
// sokonadial-hub.github.io/FD-GRILL/ project URL alike.
export default defineConfig({
  base: "./",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { "@": path.resolve(import.meta.dirname, "./src") },
  },
  // site/ holds the committed build; only scan the real entry page
  optimizeDeps: { entries: ["index.html"] },
  server: { watch: { ignored: ["**/site/**"] } },
})
