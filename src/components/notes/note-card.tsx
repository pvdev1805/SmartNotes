'use client'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Edit, Trash, Tag, MoreVertical } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import TimeAgo from '@/components/time-ago'
import { useEffect, useRef, useState } from 'react'

interface NoteCardProps {
  id: number
  title: string
  description: string
  createdAt: Date
  tags: string[]
}

const NoteCard = ({ id, title, description, createdAt, tags }: NoteCardProps) => {
  const [actionsOpen, setActionsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const cancelButtonRef = useRef<HTMLButtonElement>(null)

  const handleClickOutside = (event: MouseEvent) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target as Node) &&
      cancelButtonRef.current &&
      !cancelButtonRef.current.contains(event.target as Node) &&
      actionsOpen
    ) {
      setActionsOpen(false)
    }
  }

  const handleActionsToggle = () => {
    setActionsOpen((prev) => !prev)
  }

  // Close actions menu when clicking outside
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [actionsOpen])

  return (
    <>
      <Card className='border shadow-sm hover:shadow-lg transition-shadow duration-300 rounded-lg relative'>
        <CardContent>
          <div className='flex items-start justify-between'>
            <h3 className='font-semibold text-foreground truncate max-w-[200px] sm:max-w-[220px]'>{title}</h3>
            <Button
              ref={cancelButtonRef}
              variant={'ghost'}
              size={'icon'}
              className=''
              onClick={handleActionsToggle}
              aria-label='More actions'
            >
              <MoreVertical className='w-4 h-4 text-muted-foreground' />
            </Button>
          </div>

          <TimeAgo date={createdAt} className='mb-3' />

          <p className='mb-4 text-sm text-muted-foreground lg:min-h-10 line-clamp-2'>{description}</p>

          <div className='flex items-center gap-2'>
            <Tag className='w-4 h-4 text-muted-foreground' />
            <div className='flex gap-2'>
              {tags.map((tag) => (
                <Badge key={tag} variant={'secondary'} className='text-xs'>
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>

        {/* Actions Menu */}
        {actionsOpen && (
          <>
            {/* Desktop: Dropdown menu */}
            <div
              ref={menuRef}
              className='hidden md:block absolute right-4 top-12 z-20 bg-white border rounded shadow-lg w-24'
            >
              <Button
                variant='ghost'
                className='w-full flex items-center gap-2 px-3 py-2 text-sm justify-start border-b'
                onClick={() => {
                  setActionsOpen(false)
                }}
              >
                <Edit className='w-4 h-4' />
                <span>Edit</span>
              </Button>
              <Button
                variant='ghost'
                className='w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 justify-start hover:bg-red-50 hover:text-red-600'
                onClick={() => {
                  setActionsOpen(false)
                }}
              >
                <Trash className='w-4 h-4' />
                <span>Delete</span>
              </Button>
            </div>
            {/* Mobile: Bottom sheet */}
            <div className='md:hidden fixed inset-x-0 bottom-0 z-30 bg-white border-t rounded-t-lg shadow-lg p-4 flex flex-col gap-2'>
              <Button
                variant='outline'
                className='w-full flex items-center gap-2 justify-center'
                onClick={() => {
                  setActionsOpen(false)
                }}
              >
                <Edit className='w-4 h-4' /> Edit
              </Button>
              <Button
                variant='outline'
                className='w-full flex items-center gap-2 justify-center text-white bg-red-600 hover:text-red-600 hover:bg-red-50'
                onClick={() => {
                  setActionsOpen(false)
                }}
              >
                <Trash className='w-4 h-4' /> Delete
              </Button>
              <Button
                variant='ghost'
                className='w-full flex items-center gap-2 justify-center text-red-600'
                onClick={() => setActionsOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </>
        )}
        {/* End - Actions Menu */}
      </Card>
    </>
  )
}

export default NoteCard
