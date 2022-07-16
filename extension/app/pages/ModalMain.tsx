import { useContext } from "react"
import { Link } from "react-router-dom"

import { ctx } from "~contents/main"

export const ModalMain = () => {
  const { title, isPluginAvailable } = useContext(ctx)
  return (
    <div
      style={{
        fontFamily: "'Inter', sans-serif"
      }}>
      <div>
        <div
          style={{
            fontWeight: "bold",
            fontSize: "2rem"
          }}>
          {title}
          This article may be unreliable.
        </div>
        {/* Hello, world! 2<Link to="/hello">to hello</Link> */}
      </div>
    </div>
  )
}
