'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Sparkles, FileText, BookOpen, CircleChevronLeft, Notebook } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Note } from '@/types/note.type'
import { QuizAttempt } from '@/types/quiz-attempt'
import { Quiz } from '@/types/quiz.type'
import { getNoteById, updateNote } from '@/services/note.service'
import { getAllQuizAttempts, getQuiz, startQuizAttempt } from '@/services/quiz.service'
import AnimatedSection from '@/components/landing/animated-section'
import NoteCard from '@/components/notes/note-card'
import Pagination from '@/components/pagination'
import useQueryConfig from '@/hooks/use-query-config'
import useUpdateQueryParam from '@/hooks/use-update-query-param'
import AttemptCard from '@/components/quizzes/attempt-card'

const QuizPage = () => {
  const router = useRouter()

  const { quizId } = useParams()
  const [quiz, setQuiz] = useState<Quiz | null>(null)
  const [attempts, setAttempts] = useState<QuizAttempt[]>([])

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const allowLearnMore = false;

  const fetchData = async (id: number) => {
    setLoading(true)
    setError('')

    try {
      const [quizData, attemptsData] = await Promise.all([
        getQuiz(id),
        getAllQuizAttempts(id)
      ])

      setQuiz(quizData)
      setAttempts(attemptsData)
    } catch (error : any) {
      setQuiz(null)
      setAttempts([])
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData(Number(quizId));
  }, [quizId])

  const pageSize = 6
  const queryConfig = useQueryConfig()
  const setQueryParam = useUpdateQueryParam()
  const currentPage = Number(queryConfig.page) || 1

  const paginatedAttempts = attempts.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  const handlePageChange = (page: number) => {
    setQueryParam('page', String(page))
  }

  const handleBackToQuizzes = () => {
    router.push('/quiz')
  }

  const handleStartNewAttempt = async () => {
    setError('')

    if (!quiz) return
    try {
      const newAttempt = await startQuizAttempt(quiz.id)
      router.push(`/quiz/${quiz.id}/attempt/${newAttempt.id}`)
    } catch (error : any) {
      setError(error.message)
    }
  }

  return (
    <>
      {/* Back to previous */}
      <div className='flex items-center justify-between mb-4'>
        <Button variant={'outline'} onClick={handleBackToQuizzes} className='flex items-center'>
          <CircleChevronLeft className='w-5 h-5' /> Back to Quizzes
        </Button>
      </div>

      <div className='min-h-screen flex flex-col items-center bg-gray-50'>
        {/* Introduction */}
        <Card className='w-full shadow-lg rounded-xl p-8 bg-white pb-3'>
          <CardContent>
            <div className='flex items-center gap-3 mb-4'>
              <h2 className='text-2xl font-bold text-gray-900'>Quiz: {quiz?.title}</h2>
            </div>
            <div className='mb-6 flex flex-col gap-4'>
              <div className='flex items-center gap-2'>
                <FileText className='w-5 h-5 text-gray-500' />
                <span className='text-gray-800'>Total questions: {quiz?.questions?.length}</span>
              </div>
              <div className='flex items-center gap-2'>
                <BookOpen className='w-5 h-5 text-gray-500' />
                <span className='text-gray-800'>Total attempts: {attempts.length}</span>
              </div>
            </div>
            <div className='flex gap-4 mt-8'>
              <Button onClick={handleStartNewAttempt}>Start new attempt</Button>
            </div>
          </CardContent>


          {/* Attempts Grid */}
          <AnimatedSection delay={0.2}>
            {loading ? (
              <p className="text-gray-500">Loading attempts...</p>
            ) : !error && attempts.length === 0 ? (
              <div className='text-center text-gray-500 py-16'>
                <Notebook className='w-12 h-12 mx-auto mb-4 text-gray-300' />
                <p className='text-lg'>No notes found. Try a different search or add a new note!</p>
              </div>
            ) : (
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {paginatedAttempts.map((attempt) => (
                  <AttemptCard
                    key={attempt.id}
                    id={attempt.id}
                    score={attempt.score}
                    totalQuestions={attempt.score}
                    attemptAt={new Date(attempt.attemptAt)}
                  />
                ))}
              </div>
            )}
          </AnimatedSection>

          {/* Pagination */}
          <AnimatedSection delay={0.2}>
            {attempts.length > pageSize && (
              <Pagination
                total={attempts.length}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            )}
          </AnimatedSection>
          {/* End - Pagination */}
        </Card>
      </div>
    </>
  )
}

export default QuizPage
