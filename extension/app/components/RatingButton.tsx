import React from "react"
import { TbArrowBigDownLines, TbArrowBigUpLines } from "react-icons/tb"

import { useColor, useReliabilityRating } from "~app/hooks/useColor"
import { updateOrGetCounts } from "~contents/main"
import { ctx } from "~contents/main"

export const RatingButton = () => {
  const [backgroundColor, setBackgroundColor] = React.useState("#fff")
  const [rating, setRating] = React.useState(0)
  const {
    isPluginAvailable,
    showPlugin,
    loading,
    reliabilityRatingPercentage,
    unreliableCount,
    updateCounts,
    userRating
  } = React.useContext(ctx)
  const [showPluginStatus, setShowPluginStatus] = showPlugin
  const { description, reliabilityRating } = useReliabilityRating()
  const color = useColor()

  return (
    <>
      {isPluginAvailable && !loading && (
        <div
          style={{
            position: "fixed",
            bottom: "2rem",
            right: "2rem",
            borderRadius: "1rem",
            overflow: "hidden",
            filter: "drop-shadow(0 1rem 1rem gray)",
            backgroundColor: color,
            fontFamily: "'Inter', sans-serif",
            fontWeight: "bold",
            color: "white",
            display: "flex",
            width: "fit-content",
            flexDirection: "row"
          }}>
          <div
            style={{
              flexShrink: 0,
              paddingLeft: "1rem",
              paddingRight: "1rem",
              paddingTop: "1rem",
              paddingBottom: "1rem",
              cursor: "pointer"
            }}
            onClick={() => {
              setShowPluginStatus(true)
            }}>
            {capitalizeFirstLetter(description)}
          </div>
          <div
            style={{
              paddingLeft: "0.7rem",
              paddingRight: "0.7rem",
              paddingTop: "1rem",
              paddingBottom: "1rem",
              borderLeft: "1px solid #fff",
              cursor: "pointer",
              backgroundColor:
                userRating === "positive" ? "rgba(0,0,0,0.2)" : "transparent"
            }}
            onClick={async () => {
              updateCounts(await updateOrGetCounts(false))
            }}>
            <TbArrowBigUpLines width="50px" height="50px"></TbArrowBigUpLines>
          </div>
          <div
            style={{
              paddingLeft: "0.7rem",
              paddingRight: "0.7rem",
              paddingTop: "1rem",
              paddingBottom: "1rem",
              borderLeft: "1px solid #fff",
              cursor: "pointer",
              backgroundColor:
                userRating === "negative" ? "rgba(0,0,0,0.2)" : "transparent"
            }}
            onClick={async () => {
              updateCounts(await updateOrGetCounts(true))
            }}>
            <TbArrowBigDownLines
              width="50px"
              height="50px"></TbArrowBigDownLines>
          </div>
        </div>
      )}
    </>
  )
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
