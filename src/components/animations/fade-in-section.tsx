'use client'

import { motion } from 'framer-motion'

interface FadeInSectionProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

const FadeInSection = ({ children, delay = 0, className = '' }: FadeInSectionProps) => {
  return (
    <>
      <motion.section
        initial={{
          opacity: 0,
          y: 20
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          duration: 0.1,
          ease: 'easeOut',
          delay
        }}
        className={className}
        style={{
          willChange: 'opacity, transform'
        }}
      >
        {children}
      </motion.section>
    </>
  )
}

export default FadeInSection
