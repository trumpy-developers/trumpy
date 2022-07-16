import { motion } from "framer-motion"
import React from "react"

import { useColor } from "~app/hooks/useColor"

import { animateVariants } from "./ModalMain"

export const AboutReliabilityRating: React.FC = () => {
  const color = useColor()
  return (
    <motion.div
      variants={animateVariants}
      initial="hidden"
      animate="visible"
      exit="hidden">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontFamily: "'Inter', sans-serif"
        }}>
        <div
          style={{
            fontWeight: "bold",
            fontSize: "2rem",
            color: color
          }}>
          About Reliability Rating
        </div>
      </div>
    </motion.div>
  )
}
