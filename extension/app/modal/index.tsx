import { AnimatePresence, motion } from "framer-motion"
import React, { useContext } from "react"
import { BsFillArrowLeftCircleFill } from "react-icons/bs"
import { Outlet, useLocation, useNavigate } from "react-router-dom"

import { LoadingSpinner } from "~app/components/LoadingEffect"
import { useColor } from "~app/hooks/useColor"
import { animateVariants } from "~app/pages/ModalMain"
import { ctx } from "~contents/main"

export const Modal = () => {
  const {
    title,
    isPluginAvailable,
    showPlugin,
    reliabilityRatingPercentage,
    loading
  } = useContext(ctx)
  const color = useColor()

  const [showPluginStatus, setShowPluginStatus] = showPlugin
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <AnimatePresence>
      {isPluginAvailable && showPluginStatus && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0, transition: { duration: 0.7 } }}
          variants={animateVariants}
          transition={{ duration: 0.5, ease: [0, 0.9, 0, 0.9] }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10000000000
          }}>
          <div
            style={{
              width: "50vw",
              height: "70vh",
              backgroundColor: "white",
              boxShadow: "0 0 1rem rgba(0, 0, 0, 0.5)",
              borderRadius: "1rem",
              zIndex: 10000000000,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column"
            }}>
            {loading ? (
              <LoadingSpinner></LoadingSpinner>
            ) : (
              <>
                <div
                  style={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    overflowY: "hidden"
                  }}>
                  {/* <div
                    style={{
                      width: "100%",
                      height: "2rem",
                      backgroundColor: color,
                      flexShrink: 0
                    }}></div> */}
                  <div
                    style={{
                      width: "100%",
                      height: "2rem",
                      flexShrink: 0,
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                      fontFamily: "'Inter', sans-serif",
                      backgroundColor: color,
                      padding: "1rem"
                    }}>
                    <div
                      style={{
                        cursor: "pointer",
                        width: "fit-content",
                        color: "white",
                        fontWeight: "bold"
                      }}
                      onClick={() => {
                        if (location.pathname === "/") {
                          return
                        }
                        // Navigate back to the previous page
                        navigate(-1)
                      }}>
                      {location.pathname !== "/" ? (
                        <>
                          <BsFillArrowLeftCircleFill
                            width="20px"
                            height="20px"
                          />
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div
                    style={{
                      padding: "1rem",
                      overflowY: "auto"
                    }}>
                    <AnimatePresence>
                      <Outlet />
                    </AnimatePresence>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    padding: "1rem"
                  }}>
                  <div
                    style={{
                      padding: "1rem",
                      backgroundColor: color,
                      borderRadius: "0.5rem",
                      cursor: "pointer",
                      fontWeight: "bold",
                      color: "white",
                      fontFamily: "'Inter', sans-serif"
                    }}
                    onClick={() => {
                      setShowPluginStatus(false)
                    }}>
                    Close
                  </div>
                </div>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
