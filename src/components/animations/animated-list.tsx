'use client'
import { motion } from 'framer-motion'
import { Children, isValidElement } from 'react'

interface AnimatedListProps {
  children: React.ReactNode
  className?: string
}

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06
    }
  }
}

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 15
  },
  show: {
    opacity: 1,
    y: 0
  }
}

const AnimatedList = ({ children, className = '' }: AnimatedListProps) => {
  const items = Children.toArray(children)

  return (
    <>
      <motion.div variants={containerVariants} initial='hidden' animate={'show'} className={className}>
        {items.map((item, index) => (
          <motion.div key={isValidElement(item) && item.key != null ? item.key : index} variants={itemVariants}>
            {item}
          </motion.div>
        ))}
      </motion.div>
    </>
  )
}

export default AnimatedList
