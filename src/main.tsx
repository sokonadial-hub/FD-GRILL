import { StrictMode } from "react"
import { createRoot, hydrateRoot } from "react-dom/client"

import "./index.css"
import { App } from "./App"

const root = document.getElementById("root")!
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// The build pre-renders the page into #root; hydrate it. In dev it starts empty.
if (root.firstElementChild) hydrateRoot(root, app)
else createRoot(root).render(app)
