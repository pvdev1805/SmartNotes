'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Trash, MoreVertical } from 'lucide-react'
import TimeAgo from '@/components/time-ago'
import { MouseEvent, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ROUTES } from '@/hooks/use-nav'
import { deleteAttempt } from '@/services/quiz.service'
import DeleteConfirmationModal from '@/components/modals/delete-confirmation'

interface AttemptCardProps {
  quizId: number
  quizTitle: string
  id: number
  score: number
  totalQuestions: number
  attemptAt: Date
  onFinishDelete: () => void // callback to remove deleted note
}

const AttemptCard = ({ quizId, quizTitle, id, score, totalQuestions, attemptAt, onFinishDelete }: AttemptCardProps) => {
  const [actionsOpen, setActionsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const cancelButtonRef = useRef<HTMLButtonElement>(null)

  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const MAX_TAGS_DISPLAY = 2

  // ------ Handle action bar on each attempt cards ------ //
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

  // ------ Handle deletion ------ //
  const handleDelete = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    setActionsOpen(false)
    setDeleteConfirmationOpen(true)
  }

  const handleConfirmDelete = async () => {
    try {
      setIsDeleting(true)

      await deleteAttempt(quizId, id)

      onFinishDelete()
    } catch (error : any) {
      console.log(error.message)
    } finally {
      setIsDeleting(false)
      setDeleteConfirmationOpen(false)
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
          <Link href={ROUTES.QUIZ.ATTEMPT_RESULT(quizId, id)} className='block p-4 hover:bg-gray-50 transition-colors duration-200 rounded-lg'>
            <CardContent className='p-0'>
              <div className='flex items-start justify-between mb-1'>
                <h3 className='font-semibold text-foreground truncate max-w-[200px] sm:max-w-[220px]'>ID: {id}</h3>
              </div>
              <p className='mb-4 text-sm text-muted-foreground lg:min-h-10 line-clamp-2'>Score: {score | 0} / {totalQuestions}</p>
              <TimeAgo date={attemptAt} className='mb-2' />
            </CardContent>
          </Link>
        </div>

        {/* Actions Menu */}
        {actionsOpen && (
          <>
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
        {deleteConfirmationOpen &&
          <DeleteConfirmationModal
            type="attempt"
            id={id}
            title={quizTitle}
            isDeleting={isDeleting}
            onCancel={() => setDeleteConfirmationOpen(false)}
            onConfirm={handleConfirmDelete}
          ></DeleteConfirmationModal>
        }
        {/* End - Confirmation Modal */}
      </Card>
    </>
  )
}

export default AttemptCard
