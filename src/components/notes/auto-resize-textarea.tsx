'use client'
import { useEffect, useRef, ChangeEvent } from 'react'

interface AutoResizeTextareaProps {
  value: string
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
  placeholder?: string
  className?: string
  minHeight?: number
}

const AutoResizeTextarea = ({ value, onChange, placeholder, className = '', minHeight = 100 }: AutoResizeTextareaProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current) {
      // Reset height to auto to get correct scrollHeight
      textareaRef.current.style.height = 'auto'

      // Set height based on content
      textareaRef.current.style.height = `${Math.max(textareaRef.current.scrollHeight, minHeight)}px`
    }
  }, [value, minHeight])

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full resize-none overflow-hidden ${className}`}
      style={{ minHeight: `${minHeight}px` }}
    />
  )
}

export default AutoResizeTextarea