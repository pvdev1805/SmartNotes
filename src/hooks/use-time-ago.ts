'use client'

import { formatTimeAgo } from '@/utils/time'
import { useEffect, useState } from 'react'

export const useTimeAgo = (date: Date, updateInterval = 60000): string => {
  const [timeAgo, setTimeAgo] = useState(() => formatTimeAgo(date))

  const updateTimeAgo = () => {
    setTimeAgo(formatTimeAgo(date))
  }

  useEffect(() => {
    updateTimeAgo()

    const interval = setInterval(updateTimeAgo, updateInterval)

    return () => clearInterval(interval)
  }, [date, updateInterval])

  return timeAgo
}
