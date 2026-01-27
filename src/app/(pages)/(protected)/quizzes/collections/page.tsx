'use client'
import { useState } from 'react'
import { Plus, CircleChevronLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import AnimatedSection from '@/components/landing/animated-section'

import { createQuizSet } from '@/services/quiz-set.service'
import { useNav } from '@/hooks/use-nav'
import QuizSetInfoModal from '@/components/quizzes/quiz-set-info-modal'
import QuizSetList from '@/components/quizzes/quiz-set-list'

const QuizSetsListPage = () => {
  const nav = useNav()

  const [reloadQuizSetTrigger, setReloadQuizSetTrigger] = useState(false)

  const [creationModalOpen, setCreationModalOpen] = useState(false)
  const [isCreating, setIsCreating] = useState(false)

  // ------ Handle create new quiz set ------ //
  const handleCreateQuizSet = async (title: string) => {
    setIsCreating(true)
    try {
      const createdSet = await createQuizSet({ title })
      setCreationModalOpen(false)
      setReloadQuizSetTrigger(!reloadQuizSetTrigger)
    } catch (error) {
      console.error('Failed to create quiz set:', error)
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <div className='min-h-screen bg-gray-50 px-4 py-4 overflow-hidden'>
      {/* Header */}
      <AnimatedSection delay={0}>
        <div className='flex items-center justify-between mb-8'>
          {/* Back to previous */}
          <div className='flex items-center justify-between mb-4'>
            <Button variant={'outline'} onClick={nav.toQuizList} className='flex items-center'>
              <CircleChevronLeft className='w-5 h-5' /> Back to Quizzes
            </Button>
          </div>
          <h1 className='text-3xl font-bold text-gray-900 flex items-center gap-2'>Quiz Collection</h1>
          <Button
            className='flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold px-4 py-2 rounded-lg shadow hover:from-blue-600 hover:to-purple-600 transition'
            onClick={() => {
              setCreationModalOpen(true)
            }}
          >
            <Plus className='w-5 h-5' />
            New Collection
          </Button>
        </div>
      </AnimatedSection>
      {/* End - Header */}

      <QuizSetList reloadTrigger={reloadQuizSetTrigger} />

      {/* Create Quiz Set Modal */}
      {creationModalOpen && (
        <QuizSetInfoModal
          isProcessing={isCreating}
          onCancel={() => setCreationModalOpen(false)}
          onConfirm={handleCreateQuizSet}
        />
      )}
      {/* End - Create Quiz Set Modal */}
    </div>
  )
}

export default QuizSetsListPage