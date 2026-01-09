'use client'

import { motion } from 'framer-motion'

interface FadeInItemProps {
  children: React.ReactNode
  delay?: number
}

const FadeInItem = ({ children, delay = 0, ...props }: FadeInItemProps) => {
  return (
    <>
      <motion.div
        {...props}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.1, delay }}
        style={{
          willChange: 'opacity, transform'
        }}
      >
        {children}
      </motion.div>
    </>
  )
}

export default FadeInItem
