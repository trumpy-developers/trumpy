import { Link } from "react-router-dom"

export const ModalMain = () => {
  return (
    <div>
      <div
        style={{
          color: "red"
        }}>
        Hello, world! 2<Link to="/hello">to hello</Link>
      </div>
    </div>
  )
}


