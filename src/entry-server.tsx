import { StrictMode } from "react"
import { renderToString } from "react-dom/server"

import { App } from "./App"

/** Used at build time to pre-render the page, so content shows before JavaScript loads */
export function render() {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
