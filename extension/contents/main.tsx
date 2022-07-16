import type { PlasmoContentScript } from "plasmo"
import React, { useEffect, useState } from "react"
import Inter from "url:../assets/fonts/Inter.ttf"

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
  @font-face {
    font-family: 'Inter';
    src: local('Inter'), url(${Inter}) format('truetype');
  }
  `
  return style
}

// Find the title of the article
const getTitle = () => {
  const title = document.querySelector("h1")
  if (title) {
    return title.textContent
  }
  return ""
}

export interface Context {
  title?: string
  isPluginAvailable?: boolean
  showPlugin?: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
  reliabilityRatingPercentage?: number
  unreliableCount?: number
  totalCount?: number
  loading?: boolean
}

export const ctx = React.createContext<Context>({
  title: "",
  isPluginAvailable: false,
  loading: true
})

const fakeApi = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000))
  return {
    unreliableCount: 6,
    totalCount: 20
  }
}

const PlasmoOverlay = () => {
  const [showPlugin, setShowPlugin] = useState(true)
  const [reliabilityRating, setReliabilityRating] = useState(0)
  const [unreliableCount, setUnreliableCount] = useState(0)
  const [totalCount, setTotalCount] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fakeApi().then(({ unreliableCount, totalCount }) => {
      setReliabilityRating(((totalCount - unreliableCount) * 100) / totalCount)
      setUnreliableCount(unreliableCount)
      setTotalCount(totalCount)
      setLoading(false)
    })
  }, [])

  return (
    <ctx.Provider
      value={{
        title: getTitle(),
        isPluginAvailable: getIsPluginAvailable(),
        showPlugin: [showPlugin, setShowPlugin],
        reliabilityRatingPercentage: reliabilityRating,
        unreliableCount,
        totalCount,
        loading
      }}>
      <App></App>
    </ctx.Provider>
  )
}

export default PlasmoOverlay

function getIsPluginAvailable(): boolean {
  if (getTitle() === "") {
    return false
  }
  if (location.href.includes("news")) {
    return true
  }
  return false
}
