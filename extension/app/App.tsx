import React from "react"
import { MemoryRouter, Route, Router, Routes } from "react-router-dom"

import { Modal } from "./modal"
import { AboutReliabilityRating } from "./pages/AboutReliabilityRating"
import { ModalMain } from "./pages/ModalMain"
import { RatingButton } from "./components/RatingButton"

export const App = () => {
  return (
    <>
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<Modal />}>
            <Route path="" element={<ModalMain />} />
            <Route
              path="about-reliability-rating"
              element={<AboutReliabilityRating />}
            />
          </Route>
        </Routes>
      </MemoryRouter>
      <RatingButton />
    </>
  )
}
