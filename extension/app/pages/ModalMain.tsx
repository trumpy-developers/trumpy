import { useContext } from "react"
import { Link } from "react-router-dom"
import { RadialChart } from "react-vis"

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
            color: color,
            fontStyle: "italic",
          }}>
          {title}
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
            marginTop: "1rem"
          }}>
          {reliabilityRating >= 75 && (
            <>
              While this article is reliable, please remember that you should
              not trust anything from the internet without verifying it
              yourself, especially with important information such as medical
              advices.
            </>
          )}
          {reliabilityRating < 75 && reliabilityRating > 50 && (
            <>
              A group of users have flagged this article as unreliable, but that
              is not the majority of the users. Please continue with caution,
              and remember to flag this article if you find it unreliable.
            </>
          )}
          {reliabilityRating <= 50 && (
            <>
              The majority of the users have flagged this article as unreliable.
              You should not trust this article.
            </>
          )}
        </div>
        <div>
          <Link
            style={{
              color: "black"
            }}
            to="/about-reliability-rating">
            Find out more about reliability rating.
          </Link>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "row",
            marginTop: "1rem",
            marginBottom: "1rem"
          }}>
          <RadialChart
            getLabel={(d) => d.label}
            data={[
              {
                angle: unreliableCount,
                color: "#FF0000",
                name: "Unreliable"
              },
              {
                angle: totalCount - unreliableCount,
                color: "#04A777",
                name: "Reliable"
              }
            ]}
            labelsRadiusMultiplier={1.6}
            labelsStyle={{ fontSize: 16, fill: "#222" }}
            width={250}
            height={250}
            colorType="literal"
          />
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
