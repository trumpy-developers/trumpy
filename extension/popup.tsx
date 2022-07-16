import { useState } from "react"

import "./style.css"

function IndexPopup() {
  return (
    <>
      <div
        className="p-8 rounded-lg w-max flex flex-col text-center"
        style={{}}>
        <div className="font-extrabold text-2xl">Trumpy v1.0</div>
        <div className="text-green-800 font-bold">
          You're protected from fake news.
        </div>
        <div className="text-gray-400">Make news great again!</div>
      </div>
    </>
  )
}

export default IndexPopup
