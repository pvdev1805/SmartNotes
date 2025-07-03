'use client'

import { useTimeAgo } from '@/hooks/use-time-ago'
import { Clock } from 'lucide-react'

interface TimeAgoProps {
  date: Date
  showIcon?: boolean
  className?: string
  updateInterval?: number
}

const TimeAgo = ({ date, showIcon = true, className = '', updateInterval = 60000 }: TimeAgoProps) => {
  const timeAgo = useTimeAgo(date, updateInterval)

  return (
    <div className={`flex items-center gap-2 text-sm text-muted-foreground ${className}`}>
      {showIcon && <Clock className='w-4 h-4' />}
      <span>{timeAgo}</span>
    </div>
  )
}

export default TimeAgo
