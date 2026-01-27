'use client'
import { useEffect, useState } from 'react'
import { Plus, Notebook } from 'lucide-react'
import { Button } from '@/components/ui/button'
import AnimatedSection from '@/components/landing/animated-section'

import { getRecentQuizSets } from '@/services/quiz-set.service'
import { useNav } from '@/hooks/use-nav'
import { QuizSet } from '@/types/quiz-set.type'
import QuizSetCard from '@/components/quizzes/quiz-set-card'
import AnimatedList from '@/components/animations/animated-list'
import QuizList from '@/components/quizzes/quiz-list'

const QuizzesListPage = () => {
  const nav = useNav()

  const [quizSets, setQuizSets] = useState<QuizSet[]>([])
  const [quizSetLoading, setQuizSetLoading] = useState(true)
  const [quizReload, setQuizReload] = useState(false)

  const [error, setError] = useState('')

  // ------ Fetching data (quiz sets) ------ //
  const fetchCollections = async () => {
    setQuizSetLoading(true)
    try {
      const data = await getRecentQuizSets()
      setQuizSets(data.pageData)
    } catch (error: any) {
      console.error('Failed to load collections:', error)
    } finally {
      setQuizSetLoading(false)
    }
  }

  useEffect(() => {
    fetchCollections()
  }, [])

  // ------ Handle AFTER renamed (update list) ------ //
  const handleQuizSetRenamed = () => {
    fetchCollections()
  }

  // ------ Handle AFTER deletion (update list) ------ //
  const handleQuizSetDeleted = (deletedId: number) => {
    // Delete a quiz set may result in deleting all quizzes in it
    fetchCollections()
    setQuizReload(!quizReload)
  }

  return (
    <div className='min-h-screen bg-gray-50 px-4 py-4 overflow-hidden'>
      {/* Header */}
      <AnimatedSection delay={0}>
        <div className='flex items-center justify-between mb-8'>
          <h1 className='text-3xl font-bold text-gray-900 flex items-center gap-2'>
            <Notebook className='w-7 h-7 text-blue-600' />
            Quizzes
          </h1>

          <div className='flex gap-2'>
            <Button
              className='flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold px-4 py-2 rounded-lg shadow hover:from-blue-600 hover:to-purple-600 transition'
              onClick={nav.toQuizGeneration}
            >
              <Plus className='w-5 h-5' />
              Generate
            </Button>
          </div>
        </div>
      </AnimatedSection>
      {/* End - Header */}

      {/* Error State */}
      {error != '' && (
        <AnimatedSection delay={0.2}>
          <div className='bg-red-50 border border-red-200 rounded-lg p-6 mb-6'>
            <div className='flex items-start gap-3'>
              <div className='flex-1'>
                <h3 className='text-red-900 font-semibold mb-1'>Error Loading Quizzes</h3>
                <p className='text-red-700 mb-4'>{error}</p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      )}
      {/* END: Error State */}

      {/* Collection Grid */}
      <AnimatedSection delay={0.2} className='mb-6'>
        <div className='flex items-center justify-between mb-3'>
          <h2 className='text-xl font-semibold text-gray-900'>Recent Quiz Sets</h2>
          <Button
            variant='ghost'
            size='sm'
            className='text-blue-600 hover:text-blue-700'
            onClick={nav.toQuizCollectionList}
          >
            View All
          </Button>
        </div>

        {quizSetLoading ? (
          <div className='gap-3  pb-2'>
            {[1, 2, 3].map((i) => (
              <div key={i}>
                <div className='h-20 w-40 bg-gray-200 rounded-lg'></div>
              </div>
            ))}
          </div>
        ) : !error && quizSets.length === 0 ? (
          <div className='text-center text-gray-500 py-16'>
            <Notebook className='w-12 h-12 mx-auto mb-4 text-gray-300' />
            <p className='text-lg'>No collection found.</p>
          </div>
        ) : (
          <AnimatedList className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3'>
            {quizSets.map((quizSet) => (
              <QuizSetCard
                key={quizSet.id}
                id={quizSet.id}
                originType={quizSet.originType}
                title={quizSet.title}
                onFinishRename={handleQuizSetRenamed}
                onFinishDelete={() => handleQuizSetDeleted(quizSet.id)}
              />
            ))}
          </AnimatedList>
        )}
      </AnimatedSection>
      {/* END: Collections Grid */}

      <QuizList
        heading="Recent Quizzes"
        reloadTrigger={quizReload}
      />
    </div>
  )
}

export default QuizzesListPage