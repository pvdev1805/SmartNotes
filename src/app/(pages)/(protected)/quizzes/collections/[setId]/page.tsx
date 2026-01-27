'use client'
import { useEffect, useState } from 'react'
import { Plus, CircleChevronLeft, Folder } from 'lucide-react'
import { Button } from '@/components/ui/button'
import AnimatedSection from '@/components/landing/animated-section'

import { getQuizSet } from '@/services/quiz-set.service'
import { QuizSet } from '@/types/quiz-set.type'
import { useNav } from '@/hooks/use-nav'
import { useParams } from 'next/navigation'
import QuizList from '@/components/quizzes/quiz-list'
import ErrorBlock from '@/components/common/error-block'

const QuizSetPage = () => {
  const nav = useNav()
  const { setId } = useParams()

  const [quizSet, setQuizSet] = useState<QuizSet | null>(null)

  const [error, setError] = useState('')

  const fetchData = async (id: number) => {
    setError('')
    try {
      const data = await getQuizSet(id)
      setQuizSet(data)
    } catch (error : any) {
      setQuizSet(null)
      setError(error.message)
    }
  }

  useEffect(() => {
    fetchData(Number(setId))
  }, [])

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
          <h1 className='text-3xl font-bold text-gray-900 flex items-center gap-2'>
            {quizSet?.originType === "DEFAULT" ? "DEFAULT" : (quizSet?.title || "Quiz Collection")}
          </h1>
          <div className='flex gap-2'>
            <Button variant='outline' onClick={nav.toQuizCollectionList}>
              <Folder className='text-gray-400' />
              Collections
            </Button>
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
      <ErrorBlock errorMessage={error} />

      <QuizList quizSetId={Number(setId)}/>
    </div>
  )
}

export default QuizSetPage