'use client'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Edit, Trash, Tag, MoreVertical } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import TimeAgo from '@/components/time-ago'
import { MouseEvent, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { deleteNoteById } from '@/services/notes'

interface NoteCardProps {
  id: number
  title: string
  description: string
  createdAt: Date
  tags: string[]
  onFinishDelete?: (id: number) => void // callback to remove deleted note
}

const NoteCard = ({ id, title, description, createdAt, tags, onFinishDelete }: NoteCardProps) => {
  const router = useRouter()

  const [actionsOpen, setActionsOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [confirmationOpen, setConfirmationOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const cancelButtonRef = useRef<HTMLButtonElement>(null)

  const MAX_TAGS_DISPLAY = 2
  const visibleTags = tags.slice(0, MAX_TAGS_DISPLAY)
  const hiddenCount = tags.length - visibleTags.length

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

  const handleActionsToggle = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    setActionsOpen((prev) => !prev)
  }

  const handleEdit = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    setActionsOpen(false)
    // Logic to handle edit action, e.g., redirect to edit page
    router.push(`/notes/${id}`)
    console.log('Edit action triggered for note:', id)
  }

  const handleDelete = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    setActionsOpen(false)
    // Logic to handle delete action, e.g., show confirmation dialog
    setConfirmationOpen(true)
    console.log('Delete action triggered for note:', id)
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

  const handleCancel = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    setActionsOpen(false)
  }

  // Close actions menu when clicking outside
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside as EventListener)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside as EventListener)
    }
  }, [actionsOpen])

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
          <Link href={`/notes/${id}`} className='block p-4 hover:bg-gray-50 transition-colors duration-200 rounded-lg'>
            <CardContent className='p-0'>
              <div className='flex items-start justify-between mb-1'>
                <h3 className='font-semibold text-foreground truncate max-w-[200px] sm:max-w-[220px]'>{title}</h3>
              </div>

              <TimeAgo date={createdAt} className='mb-2' />

              <p className='mb-4 text-sm text-muted-foreground lg:min-h-10 line-clamp-2'>{description}</p>

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
                className='w-full flex items-center gap-2 px-3 py-2 text-sm justify-start border-b'
                onClick={handleEdit}
              >
                <Edit className='w-4 h-4' />
                <span>Edit</span>
              </Button>
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
              <Button variant='outline' className='w-full flex items-center gap-2 justify-center' onClick={handleEdit}>
                <Edit className='w-4 h-4' /> Edit
              </Button>
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
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 animate-in zoom-in-95 duration-200">
              {/* Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                    <Trash className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">Delete Note {id}</h3>
                    <p className="text-sm text-gray-500">This action cannot be undone</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-gray-700 leading-relaxed">
                  Are you sure you want to delete note <span className="font-semibold text-gray-900">"{title}"</span>?
                  This will permanently remove the note from your collection.
                </p>
              </div>

              {/* Footer */}
              <div className="p-6 bg-gray-50 rounded-b-xl flex gap-3 justify-end">
                <Button
                  variant="outline"
                  onClick={() => setConfirmationOpen(false)}
                  className="px-4 py-2 border-gray-300 text-gray-700 hover:bg-gray-100"
                  disabled={isDeleting}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleConfirmDelete}
                  className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 flex items-center gap-2"
                  disabled={isDeleting}
                >
                  {isDeleting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash className="w-4 h-4" />
                      Delete Note
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}
        {/* End - Confirmation Modal */}
      </Card>
    </>
  )
}

export default NoteCard
