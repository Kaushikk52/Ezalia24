import { useEffect, useRef } from "react"
import { motion, useAnimationControls } from "framer-motion"

export default function LogoAnimation() {
  const iRef = useRef<HTMLSpanElement>(null)
  const heartControls = useAnimationControls()

  useEffect(() => {
    const animateHeart = async () => {
      // Wait for text to animate in
      await new Promise((resolve) => setTimeout(resolve, 1200))

      // Start from left
      await heartControls.start({
        opacity: 1,
        x: -100,
      })

      // Move to position above the "i"
      await heartControls.start({
        x: 0,
        transition: {
          duration: 0.8,
          type: "spring",
          stiffness: 200,
          damping: 15,
        },
      })
    }

    animateHeart()
  }, [heartControls])

  return (
    <div className="flex items-center justify-center">
      <div className="relative">
        {/* Main logo text */}
        <div className="flex items-end relative">
          {/* Animate each letter with staggered delay */}
          {"ezal".split("").map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.3,
                delay: index * 0.15,
                ease: "easeOut",
              }}
              className="text-[#0099cc] text-3xl font-bold tracking-tighter"
              style={{
                fontFamily: "Arial, sans-serif",
                fontWeight: "bold",
                letterSpacing: "0.15em",
              }}
            >
              {char}
            </motion.span>
          ))}

          {/* The "i" character */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.3,
              delay: 4 * 0.15, // Same pattern as the previous letters
              ease: "easeOut",
            }}
          >
            <motion.span
              ref={iRef}
              className="text-[#0099cc] text-3xl font-bold tracking-tighter"
              style={{
                fontFamily: "Arial, sans-serif",
                fontWeight: "bold",
                letterSpacing: "0.15em",
              }}
            >
              i
            </motion.span>

            {/* Heart above the i */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={heartControls}
              className="absolute top-0 left-1/3 -translate-x-1/4 w-4 h-4"
            >
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path
                  d="M50,30 C35,10 0,15 0,50 C0,80 40,90 50,100 C60,90 100,80 100,50 C100,15 65,10 50,30 Z"
                  fill="#e41e26"
                />
              </svg>
            </motion.div>
          </motion.div>

          {/* Rest of text */}
          {"a".split("").map((char, index) => (
            <motion.span
              key={`a-${index}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.3,
                delay: (5 + index) * 0.15, // Continue the pattern
                ease: "easeOut",
              }}
              className="text-[#0099cc] text-3xl font-bold tracking-tighter"
              style={{
                fontFamily: "Arial, sans-serif",
                fontWeight: "bold",
                letterSpacing: "0.15em",
              }}
            >
              {char}
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  )
}