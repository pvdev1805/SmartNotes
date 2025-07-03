export const formatTimeAgo = (date: Date): string => {
  const now = new Date()
  const timeDiff = now.getTime() - date.getTime()

  const timeUnits = [
    { unit: 'minute', ms: 60 * 1000 },
    { unit: 'hour', ms: 60 * 60 * 1000 },
    { unit: 'day', ms: 24 * 60 * 60 * 1000 }
  ]

  // Less than 1 minute
  if (timeDiff < timeUnits[0].ms) {
    return 'Just now'
  }

  // Check each time unit
  for (let i = 0; i < timeUnits.length - 1; i++) {
    const currentUnit = timeUnits[i]
    const nextUnit = timeUnits[i + 1]

    if (!nextUnit || timeDiff < nextUnit.ms) {
      const value = Math.floor(timeDiff / currentUnit.ms)
      return value === 1 ? `1 ${currentUnit.unit} ago` : `${value} ${currentUnit.unit}s ago`
    }
  }

  // If more than a day, return the date
  return date.toLocaleDateString('en-AU', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'Australia/Sydney'
  })
}
