'use client'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Trash, MoreVertical, FolderPlus } from 'lucide-react'
import TimeAgo from '@/components/time-ago'
import { MouseEvent, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ROUTES } from '@/hooks/use-nav'
import { deleteQuiz, updateQuiz } from '@/services/quiz.service'
import DeleteConfirmationModal from '@/components/modals/delete-confirmation'
import CollectionSelection from '@/components/modals/collection-selection'
import { getAllQuizSets, getRecentQuizSets } from '@/services/quiz-set.service'
import { QuizCollection } from '@/types/quiz-set.type'
import { PageInfo } from '@/types/util.type'

interface QuizCardProps {
  id: number
  title: string
  quizSetId: number
  totalQuestions?: number
  createdAt: Date
  updatedAt: Date
  onFinishCollectionChange: () => void
  onFinishDelete: () => void // callback to remove deleted note
}

const QuizCard = ({ id, title, quizSetId, totalQuestions, createdAt, updatedAt, onFinishCollectionChange, onFinishDelete }: QuizCardProps) => {
  const [actionsOpen, setActionsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const cancelButtonRef = useRef<HTMLButtonElement>(null)

  // Modals
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const [collectionSelectionOpen, setCollectionSelectionOpen] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const [collection, setCollection] = useState<QuizCollection[]>([])
  const [collectionPage, setCollectionPage] = useState<PageInfo>({ currentPage: 1, pageSize: 4, totalPages: 0, totalElements: 0 })

  const MAX_TAGS_DISPLAY = 2

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

  // ------ Handle add quiz to collection ------ //
  const handleAddToCollection = async (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    setActionsOpen(false)

    const result = await getAllQuizSets(collectionPage.currentPage, collectionPage.pageSize)
    const mappedCollection: QuizCollection[] = result.pageData.map((quizSet) => ({
      id: quizSet.id,
      title: quizSet.originType === "DEFAULT" ? "DEFAULT" : quizSet.title
    }))
    setCollection(mappedCollection)

    setCollectionSelectionOpen(true)
  }

  const handleCollectionPageChange = async (pageNumber: number) => {
    setCollectionPage((prevState) => ({ ...prevState, currentPage: pageNumber }))

    const result = await getAllQuizSets(pageNumber, collectionPage.pageSize)
    const mappedCollection: QuizCollection[] = result.pageData.map((quizSet) => ({
      id: quizSet.id,
      title: quizSet.originType === "DEFAULT" ? "DEFAULT" : quizSet.title
    }))
    setCollection(mappedCollection)
  }

  const handleConfirmSelection = async (newQuizSetId: number) => {
    try {
      setIsAdding(true)
      await updateQuiz(id, {
        quizSetId: newQuizSetId,
        topic: title
      })

      if (quizSetId !== newQuizSetId) {
        onFinishCollectionChange()
      }
    } catch (error : any) {
      console.log(error.message)
    } finally {
      setIsAdding(false)
      setCollectionSelectionOpen(false)
    }
  }

  // ------ Handle delete ------ //
  const handleDelete = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    setActionsOpen(false)
    // Logic to handle delete action, e.g., show confirmation dialog
    setDeleteConfirmationOpen(true)
    console.log('Delete action triggered for quiz:', id)
  }

  const handleConfirmDelete = async () => {
    try {
      setIsDeleting(true)

      await deleteQuiz(id)

      onFinishDelete()
    } catch (error : any) {
      console.log(error.message)
    } finally {
      setIsDeleting(false)
      setDeleteConfirmationOpen(false)
    }
  }

  // ------ Handle quiz edit (to be implemented) ------ //
  // const handleEdit = (event: MouseEvent<HTMLButtonElement>) => {
  //   event.stopPropagation()
  //   setActionsOpen(false)
  //   // Logic to handle edit action, e.g., redirect to edit page
  //   // useRouter().push(`/notes/${id}/edit`)
  //   console.log('Edit action triggered for quiz:', id)
  // }

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
          <Link href={ROUTES.QUIZ.DETAIL(id)} className='block p-4 hover:bg-gray-50 transition-colors duration-200 rounded-lg'>
            <CardContent className='p-0'>
              <div className='flex items-start justify-between mb-1'>
                <h3 className='font-semibold text-foreground truncate max-w-[200px] sm:max-w-[220px]'>{title}</h3>
              </div>

              <p className='mb-4 text-sm text-muted-foreground lg:min-h-10 line-clamp-2'>Total: {totalQuestions} questions</p>
              <TimeAgo date={createdAt} className='mb-2' />
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
                onClick={handleAddToCollection}
              >
                <FolderPlus className='w-4 h-4' />
                <span>Add</span>
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
              <Button variant='outline' className='w-full flex items-center gap-2 justify-center' onClick={handleAddToCollection}>
                <FolderPlus className='w-4 h-4' /> Add to collection
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

        {/* Collection Selection Modal */}
        {collectionSelectionOpen &&
          <CollectionSelection
            objId={id}
            objTitle={title}
            orgCollectionId={quizSetId}
            pageNumber={collectionPage.currentPage}
            totalPages={collectionPage.totalPages}
            isAdding={isAdding}
            collections={collection}
            onPageChange={handleCollectionPageChange}
            onCancel={() => setCollectionSelectionOpen(false)}
            onConfirm={handleConfirmSelection}
          />
        }
        {/* End - Collection Selection Modal */}
      </Card>
    </>
  )
}

export default QuizCard
