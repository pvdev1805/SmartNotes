'use client'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Trash, Tag, MoreVertical } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import TimeAgo from '@/components/time-ago'
import { MouseEvent, useEffect, useRef, useState } from 'react'
import Link from 'next/link'

import { deleteNoteById } from '@/services/note.service'
import { ROUTES, useNav } from '@/hooks/use-nav'
import DeleteConfirmationModal from '@/components/modals/delete-confirmation'

interface NoteCardProps {
  id: number
  title: string
  description: string
  createdAt: Date
  updatedAt: Date
  tags: string[]
  onFinishDelete?: (id: number) => void // callback to remove deleted note
}

const NoteCard = ({ id, title, description, createdAt, updatedAt, tags, onFinishDelete }: NoteCardProps) => {
  const [actionsOpen, setActionsOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [confirmationOpen, setConfirmationOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const cancelButtonRef = useRef<HTMLButtonElement>(null)

  const MAX_TAGS_DISPLAY = 2
  const visibleTags = tags.slice(0, MAX_TAGS_DISPLAY)
  const hiddenCount = tags.length - visibleTags.length

  // ------ Handle action bar on each card ------ //
  const handleClickOutside = (event: MouseEvent | globalThis.MouseEvent) => {
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

  // Close actions menu when clicking outside
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside as EventListener)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside as EventListener)
    }
  }, [actionsOpen])

  const handleActionsToggle = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    setActionsOpen((prev) => !prev)
  }

  const handleCancel = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    setActionsOpen(false)
  }

  // ------ Handle delete ------ //
  const handleDelete = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    setActionsOpen(false)
    setConfirmationOpen(true)
  }

  const handleConfirmDelete = async () => {
    try {
      setIsDeleting(true)

      await deleteNoteById(id)

      if (onFinishDelete) {
        onFinishDelete(id)
      }
    } catch (error : any) {
      console.log(error.message)
    } finally {
      setIsDeleting(false)
      setConfirmationOpen(false)
    }
  }

  return (
    <>
      <Card className='p-0 border shadow-sm hover:shadow-lg transition-shadow duration-300 rounded-lg relative'>
        <div className='relative'>
          <Button
            ref={cancelButtonRef}
            variant={'ghost'}
            size={'icon'}
            className='absolute top-2 right-2 z-1'
            onClick={handleActionsToggle}
            aria-label='More actions'
          >
            <MoreVertical className='w-4 h-4 text-muted-foreground' />
          </Button>
          <Link href={ROUTES.NOTE.DETAIL(id)} className='block p-4 hover:bg-gray-50 transition-colors duration-200 rounded-lg'>
            <CardContent className='p-0'>
              <div className='flex items-start justify-between mb-1'>
                <h3 className='font-semibold text-foreground truncate max-w-[200px] sm:max-w-[220px]'>{title}</h3>
              </div>

              <TimeAgo date={updatedAt} className='mb-2' />

              <p className='mb-4 text-sm text-muted-foreground lg:min-h-10 line-clamp-2'>{description}</p>

              <div className='mb-2 text-sm text-gray-400'>
                Created on: {new Date(createdAt).toDateString()}
              </div>

              <div className='flex items-center gap-2'>
                <Tag className='w-4 h-4 text-muted-foreground' />
                <div className='flex gap-2 max-w-[180px]'>
                  {visibleTags.map((tag) => (
                    <Badge key={tag} variant={'secondary'} className='text-xs max-w-[80px] truncate'>
                      {tag.length > 12 ? `${tag.slice(0, 12)}...` : tag}
                    </Badge>
                  ))}
                  {hiddenCount > 0 && (
                    <Badge variant={'secondary'} className='text-xs bg-gray-200 text-gray-600'>
                      +{hiddenCount} more
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Link>
        </div>

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
                className='w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 justify-start hover:bg-red-50 hover:text-red-600'
                onClick={handleDelete}
              >
                <Trash className='w-4 h-4' />
                <span>Delete</span>
              </Button>
            </div>
            {/* Mobile: Bottom sheet */}
            <div className='md:hidden fixed inset-x-0 bottom-0 z-30 bg-white border-t rounded-t-lg shadow-lg p-4 flex flex-col gap-2'>
              <Button
                variant='outline'
                className='w-full flex items-center gap-2 justify-center text-white bg-red-600 hover:text-red-600 hover:bg-red-50'
                onClick={handleDelete}
              >
                <Trash className='w-4 h-4' /> Delete
              </Button>
              <Button
                variant='ghost'
                className='w-full flex items-center gap-2 justify-center text-red-600'
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </div>
          </>
        )}
        {/* End - Actions Menu */}

        {/* Confirmation Modal */}
        {confirmationOpen && (
          <DeleteConfirmationModal
            type="note"
            id={id}
            title={title}
            isDeleting={isDeleting}
            onCancel={() => setConfirmationOpen(false)}
            onConfirm={handleConfirmDelete}
          ></DeleteConfirmationModal>
        )}
        {/* End - Confirmation Modal */}
      </Card>
    </>
  )
}

export default NoteCard
