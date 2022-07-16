import { motion } from "framer-motion"
import React from "react"
import FakeNews from "url:~/assets/How_to_Spot_Fake_News.jpg"

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
          Identifying fake news
        </div>
        <p>
          Identifying fake news can be challenging. Installing trumpy will help,
          but you should still stay vigilant. Here are some tips to help you (CC
          BY http://www.ifla.org/publications/node/11174):
        </p>
        <img src={FakeNews} style={{ width: "100%" }} />
      </div>
    </motion.div>
  )
}
