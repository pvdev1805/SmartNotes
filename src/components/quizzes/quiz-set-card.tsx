'use client'

import { Folder, FolderPlus, MoreVertical, Pencil, Trash } from 'lucide-react'
import { useNav } from '@/hooks/use-nav'
import { Button } from '@/components/ui/button'
import DeleteConfirmationModal from '@/components/modals/delete-confirmation'
import { MouseEvent, useEffect, useRef, useState } from 'react'
import { deleteQuizSet, updateQuizSet } from '@/services/quiz-set.service'
import { Card } from '@/components/ui/card'
import QuizSetInfoModal from '@/components/quizzes/quiz-set-info-modal'

interface QuizSetCardProps {
  id: number
  originType: string
  title: string
  onFinishRename: () => void
  onFinishDelete: () => void // callback to remove deleted item
}

const QuizSetCard = ({ id, originType, title, onFinishRename, onFinishDelete }: QuizSetCardProps) => {
  const nav = useNav()

  const [actionsOpen, setActionsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const cancelButtonRef = useRef<HTMLButtonElement>(null)

  // Modals
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const [renameModalOpen, setRenameModalOpen] = useState(false)
  const [isRenaming, setIsRenaming] = useState(false)

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

  // ------ Handle card click ------ //
  const handleCollectionClick = (collectionId: number) => {
    nav.toQuizCollection(collectionId)
  }

  // ------ Handle rename ------ //
  const handleRename = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    setActionsOpen(false)

    setRenameModalOpen(true)
  }

  const handleConfirmRename = async (newTitle: string) => {
    try {
      setIsRenaming(true)

      const updatedData = await updateQuizSet(id, { title: newTitle })

      console.log(updatedData)
      onFinishRename()
    } catch (error : any) {
      console.log(error.message)
    } finally {
      setIsRenaming(false)
      setRenameModalOpen(false)
    }
  }

  // ------ Handle delete ------ //
  const handleDelete = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    setActionsOpen(false)
    setDeleteConfirmationOpen(true)
  }

  const handleConfirmDelete = async () => {
    try {
      setIsDeleting(true)

      await deleteQuizSet(id)

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

          <div
            key={id}
            onClick={() => handleCollectionClick(id)}
            className={`
                    relative flex-shrink-0 min-w-[160px] p-4 rounded-lg cursor-pointer
                    transition-all duration-200 group
                    bg-white hover:border-gray-300 hover:shadow-md
                  `}
          >
            <div className='flex items-start justify-between'>
              <div className='flex-1'>
                <div className='flex items-center gap-2 mb-1'>
                  <Folder className='text-gray-400' />
                  <h3 className='font-semibold text-sm text-gray-900 truncate'>
                    {originType === "DEFAULT" ? "DEFAULT" : title}
                  </h3>
                </div>
              </div>
            </div>

          </div>
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
                onClick={handleRename}
                disabled={originType === "DEFAULT"}
              >
                <Pencil className='w-4 h-4' />
                <span>Rename</span>
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
              <Button variant='outline' className='w-full flex items-center gap-2 justify-center' onClick={handleRename}>
                <FolderPlus className='w-4 h-4' /> Rename
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

        {/* Update Quiz Set Modal */}
        {renameModalOpen && (
          <QuizSetInfoModal
            previousTitle={title}
            isProcessing={isRenaming}
            onCancel={() => setRenameModalOpen(false)}
            onConfirm={handleConfirmRename}
          />
        )}
        {/* End - Create Quiz Set Modal */}

        {/* Confirmation Modal */}
        {deleteConfirmationOpen &&
          <DeleteConfirmationModal
            type="quiz"
            id={id}
            title={title}
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

export default QuizSetCard