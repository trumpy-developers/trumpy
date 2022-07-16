import { AnimatePresence, motion } from "framer-motion"
import React, { useContext } from "react"
import { Outlet } from "react-router-dom"

import { ctx } from "~contents/main"

export const Modal = () => {
  const { title, isPluginAvailable, showPlugin } = useContext(ctx)

  const [showPluginStatus, setShowPluginStatus] = showPlugin

  return (
    <AnimatePresence>
      {isPluginAvailable && showPluginStatus && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0, 0.9, 0, 0.9] }}
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
            alignItems: "center",
            zIndex: 10000000000
          }}>
          <div
            style={{
              width: "50vw",
              height: "50vh",
              backgroundColor: "white",
              boxShadow: "0 0 1px rgba(0, 0, 0, 0.5)",
              borderRadius: "1rem",
              padding: "1rem",
              zIndex: 10000000000
            }}>
            <div
              onClick={() => {
                setShowPluginStatus(false)
              }}>
              Close
            </div>
            <Outlet />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
