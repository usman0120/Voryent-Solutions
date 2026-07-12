"use client"

import { motion, useReducedMotion } from "framer-motion"
import type { HTMLMotionProps } from "framer-motion"
import type { ReactNode } from "react"

interface FadeInProps extends HTMLMotionProps<"div"> {
  children: ReactNode
  delay?: number
  direction?: "up" | "down" | "left" | "right" | "none"
  duration?: number
}

export function FadeIn({
  children,
  delay = 0,
  direction = "up",
  duration = 0.5,
  className,
  ...props
}: FadeInProps) {
  const shouldReduceMotion = useReducedMotion()

  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
    none: { x: 0, y: 0 },
  }

  const baseDirection = shouldReduceMotion ? directions.none : directions[direction]

  return (
    <motion.div
      initial={{
        opacity: 0,
        ...baseDirection,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{
        duration: shouldReduceMotion ? 0.1 : duration,
        delay: shouldReduceMotion ? 0 : delay,
        ease: [0.21, 0.47, 0.32, 0.98], // Custom ease for premium feel
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}
