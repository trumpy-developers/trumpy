import { useContext } from "react"
import { Link } from "react-router-dom"

import { useColor, useReliabilityRating } from "~app/hooks/useColor"
import { ctx } from "~contents/main"

export const ModalMain = () => {
  const { isPluginAvailable, title, showPlugin, totalCount, unreliableCount } =
    useContext(ctx)
  const color = useColor()
  const { description, reliabilityRating } = useReliabilityRating()

  return (
    <div
      style={{
        fontFamily: "'Inter', sans-serif"
      }}>
      <div>
        <div
          style={{
            fontWeight: "bold",
            fontSize: "2rem",
            color: color
          }}>
          This article is {description}.
        </div>
        <div
          style={{
            fontWeight: "bold",
            marginTop: "1rem"
          }}>
          Based on our data, {unreliableCount} out of {totalCount} users has
          flagged this article as unreliable.
        </div>
        <div
          style={{
            fontWeight: "bold",
            fontSize: "1.5rem",
            marginTop: "2rem",
            color: color
          }}>
          We've seen this story in those sources...
        </div>
      </div>
    </div>
  )
}
