"use client"

import { useEffect } from "react"
import { motion, useAnimate } from "framer-motion"

export default function LogoAnimation() {
  const [heartScope, animate] = useAnimate()

  useEffect(() => {
    const animateSequence = async () => {
      // Wait for text to finish animating
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Animate heart
      await animate(heartScope.current, { opacity: 1, scale: 1 }, { duration: 0.3 })
      await animate(heartScope.current, { y: [0, -5, 0] }, { duration: 0.6, repeat: 1, ease: "easeInOut" })
    }

    animateSequence()
  }, [animate])

  return (
    <div className="flex items-center">
      <div className="relative">
        {/* Logo text with staggered animation */}
        <div className="flex items-baseline">
          {/* Animate all letters with staggered delay */}
          {"ezalia".split("").map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: index * 0.08,
                ease: "easeOut",
              }}
              className="text-[#0099cc] text-3xl font-bold"
              style={{ position: "relative" }}
            >
              {char}

              {/* Heart above the "i" */}
              {char === "i" && (
                <motion.div
                  ref={heartScope}
                  initial={{ opacity: 0, scale: 0.5 }}
                  className="absolute top-0 left-1/2 -translate-x-1/2"
                >
                  <svg viewBox="0 0 100 100" className="w-3 h-3">
                    <path
                      d="M50,30 C35,10 0,15 0,50 C0,80 40,90 50,100 C60,90 100,80 100,50 C100,15 65,10 50,30 Z"
                      fill="#e41e26"
                    />
                  </svg>
                </motion.div>
              )}
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  )
}