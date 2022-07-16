import { useState } from "react"

import "./style.css"

import logo from "url:~/assets/icon512.png"

function IndexPopup() {
  return (
    <>
      <div
        className="p-8 rounded-lg w-max flex flex-col text-center"
        style={{}}>
        <img src={logo} className="w-20 h-20 mx-auto"></img>
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
