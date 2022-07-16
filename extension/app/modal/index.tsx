import { motion } from "framer-motion"
import React from "react"
import { Outlet } from "react-router-dom"

export const Modal = () => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}>
        <div
          style={{
            minWidth: "50vw",
            minHeight: "50vh",
            backgroundColor: "white",
            boxShadow: "0 0 1px rgba(0, 0, 0, 0.5)",
            borderRadius: "1rem",
            padding: "1rem"
          }}>
          <Outlet />
        </div>
      </motion.div>
    </>
  )
}
