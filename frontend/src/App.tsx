import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Installation } from "./pages/Installation";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/install" element={<Installation />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
