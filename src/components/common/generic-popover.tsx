import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'

interface GenericPopoverProps {
  children: React.ReactNode
  display: React.ReactNode
  onApply: () => void
}

const GenericPopover = ({ children, display, onApply }: GenericPopoverProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleApplyClick = () => {
    onApply()
    setIsOpen(false)
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant='outline' className='flex items-center gap-2'>
          {display}
        </Button>
      </PopoverTrigger>

      <PopoverContent className='w-64 p-4 space-y-4'>
        {children}
        <Button className='w-full' onClick={handleApplyClick}>
          Apply
        </Button>
      </PopoverContent>
    </Popover>
  )
}

export default GenericPopover