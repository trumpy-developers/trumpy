import React from "react"

import { ctx } from "~contents/main"

export const RatingButton = () => {
  const [backgroundColor, setBackgroundColor] = React.useState("#fff")
  const [rating, setRating] = React.useState(0)
  const { isPluginAvailable, showPlugin } = React.useContext(ctx)
  console.log(isPluginAvailable)

  return (
    <>
      {isPluginAvailable && (
        <div
          style={{
            position: "fixed",
            bottom: "2rem",
            right: "2rem",
            borderRadius: "1rem",
            filter: "drop-shadow(0 0 2rem black)",
            backgroundColor: backgroundColor,
            padding: "1.5rem"
          }}>
          {/* <div
            style={{
              width: "400px"
            }}></div> */}
        </div>
      )}
    </>
  )
}
