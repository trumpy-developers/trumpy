import React from "react"
import { MemoryRouter, Route, Router, Routes } from "react-router-dom"

import { Modal } from "./modal"
import { ModalMain } from "./pages/ModalMain"

export const App = () => {
  return (
    <MemoryRouter>
      <Routes>
        <Route path="/" element={<Modal />}>
          <Route path="" element={<ModalMain />} />
        </Route>
      </Routes>
    </MemoryRouter>
  )
}
