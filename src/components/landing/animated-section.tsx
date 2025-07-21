'use client'
import { motion } from 'motion/react'

interface AnimatedSectionProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

const AnimatedSection = ({ children, delay = 0, className = '' }: AnimatedSectionProps) => {
  return (
    <>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.3, delay, ease: 'easeOut' }}
        className={className}
      >
        {children}
      </motion.section>
    </>
  )
}

export default AnimatedSection
