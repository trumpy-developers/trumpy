import axios from "axios"
import type { PlasmoContentScript } from "plasmo"
import React, { useEffect, useState } from "react"
import Inter from "url:../assets/fonts/Inter.ttf"

import { App } from "../app/App"

// Read UID
let UID = ""
chrome.storage.sync.get(["uid"], (result) => {
  if (result.uid) {
    UID = result.uid
  } else {
    UID =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    chrome.storage.sync.set({ uid: UID }, () => {})
  }
})

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
  updateCounts?: (props: {
    unreliableCount: number
    totalCount: number
  }) => void,
  userRating?: string
}

export const ctx = React.createContext<Context>({
  title: "",
  isPluginAvailable: false,
  loading: true
})

export const updateOrGetCounts = async (isFakeNews?: boolean) => {
  const { data } = await axios.post("https://trumpyapis.yyjlincoln.app/api", {
    url: location.protocol + "//" + location.host + location.pathname,
    uid: UID,
    ...(isFakeNews !== undefined
      ? {
          fakenews: isFakeNews ? "negative" : "positive"
        }
      : {})
  })

  let unreliable = data.fakenews.flagger
  let total = data.fakenews.total
  let userStatus = data.user_status

  if (total === 0) {
    unreliable = 0
    total = 1
  }

  return {
    unreliableCount: unreliable,
    totalCount: total,
    userRating: userStatus
  }
}

const PlasmoOverlay = () => {
  const [showPlugin, setShowPlugin] = useState(false)
  const [reliabilityRating, setReliabilityRating] = useState(0)
  const [unreliableCount, setUnreliableCount] = useState(0)
  const [totalCount, setTotalCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [userRating, setUserRating] = useState("")

  const updateCounts = (
    {
      unreliableCount,
      totalCount,
      userRating
    }: {
      unreliableCount: number
      totalCount: number
      userRating: string
    },
    showModalIfNegative = true
  ) => {
    setReliabilityRating(((totalCount - unreliableCount) * 100) / totalCount)
    setUnreliableCount(unreliableCount)
    setTotalCount(totalCount)
    setLoading(false)
    if (showModalIfNegative) {
      if (unreliableCount / totalCount > 0.25) {
        setShowPlugin(true)
      }
    }
    setUserRating(userRating)
  }

  useEffect(() => {
    setLoading(true)
    updateOrGetCounts().then((res) => {
      updateCounts(res, true)
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
        loading,
        updateCounts,
        userRating
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
