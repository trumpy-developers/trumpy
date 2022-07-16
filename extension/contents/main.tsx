// import type { PlasmoContentScript } from "plasmo"
// import React from "react"
// import { createRoot } from "react-dom/client"
// export default () => {
//   return <App />
// }
import type { PlasmoContentScript } from "plasmo"

import { App } from "../app/App"

export const config: PlasmoContentScript = {
  matches: ["https://*/*"],
  css: ["style.css"]
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = `
  #plasmo-shadow-container {
    position: fixed !important;
    z-index: 10000000000 !important;
  }
  `
  return style
}

// Idea for an UI API, for popup, notification badge, or mounting UI
// Idea for static mount
// Idea for styling injection support (inline or with custom emotion cache)

const PlasmoOverlay = () => {
  return <App></App>
}

export default PlasmoOverlay
