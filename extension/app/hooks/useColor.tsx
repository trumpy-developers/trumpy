import React, { useContext } from "react"

import { ctx } from "~contents/main"

export const useColor = () => {
  const { reliabilityRatingPercentage: reliabilityRating } = useContext(ctx)
  if (reliabilityRating >= 75) {
    return "#04A777"
  }
  if (reliabilityRating >= 50) {
    // A even darker orange
    return "#FFAB00"
  }
  return "#FF0000"
}

export const useReliabilityRating = () => {
  const { reliabilityRatingPercentage: reliabilityRating } = useContext(ctx)
  return {
    reliabilityRating,
    description: (() => {
      if (reliabilityRating >= 75) {
        return "reliable"
      }
      if (reliabilityRating >= 50) {
        return "moderately reliable"
      }
      return "not reliable"
    })()
  }
}
