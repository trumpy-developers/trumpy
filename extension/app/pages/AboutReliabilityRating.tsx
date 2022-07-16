import React from "react"

import { useColor } from "~app/hooks/useColor"

export const AboutReliabilityRating: React.FC = () => {
  const color = useColor()
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontFamily: "'Inter', sans-serif"
        }}>
        <div
          style={{
            fontWeight: "bold",
            fontSize: "2rem",
            color: color
          }}>
          About Reliability Rating
        </div>
      </div>
    </>
  )
}
