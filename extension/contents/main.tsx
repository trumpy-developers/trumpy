import type { PlasmoContentScript } from "plasmo"

import { App } from "../app/App"
import "../style.css"

export const config: PlasmoContentScript = {
  // Regex to match all URLs.
  matches: [
    "https://*/*",
    "http://*/*",
  ]
}

export default App
