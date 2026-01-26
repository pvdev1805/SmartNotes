'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FileText, BookOpen, CircleChevronLeft, Notebook } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { QuizAttempt } from '@/types/quiz-attempt.type'
import { Quiz } from '@/types/quiz.type'
import { getAllQuizAttempts, getQuiz, startQuizAttempt } from '@/services/quiz.service'
import AnimatedSection from '@/components/landing/animated-section'
import Pagination from '@/components/pagination'
import useQueryConfig from '@/hooks/use-query-config'
import useUpdateQueryParam from '@/hooks/use-update-query-param'
import AttemptCard from '@/components/quizzes/attempt-card'
import { useNav } from '@/hooks/use-nav'
import { PageInfo } from '@/types/util.type'
import FadeInSection from '@/components/animations/fade-in-section'

const QuizPage = () => {
  const nav = useNav()
  const { quizId } = useParams()

  const [quiz, setQuiz] = useState<Quiz | null>(null)
  const [attempts, setAttempts] = useState<QuizAttempt[]>([])
  const [page, setPage] = useState<PageInfo>({ currentPage: 1, pageSize: 6, totalPages: 0, totalElements: 0 })

  const [loading, setLoading] = useState(true)

  const [error, setError] = useState('')

  // ------ Fetching data ------ //
  const fetchData = async (id: number, pageNum: number) => {
    setLoading(true)
    setError('')

    try {
      const [quizData, attemptsData] = await Promise.all([
        getQuiz(id),
        getAllQuizAttempts(id, pageNum, page.pageSize)
      ])

      setQuiz(quizData)
      setAttempts(attemptsData.pageData)
      setPage(attemptsData.pageInfo)
    } catch (error : any) {
      setQuiz(null)
      setAttempts([])
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData(Number(quizId), page.currentPage);
  }, [quizId])

  // ------ Handle AFTER deletion (update list) ------ //
  const handleDeleted = (deletedId: number) => {
    setAttempts((prevAttempts) =>
      prevAttempts.filter((attempt) => attempt.id !== deletedId)
    )
  }

  // ------ Handle start new attempt ------ //
  const handleStartNewAttempt = async () => {
    setError('')

    if (!quiz) return
    try {
      const newAttempt = await startQuizAttempt(quiz.id)
      nav.toNewQuizAttempt(quiz.id, newAttempt.id)
    } catch (error : any) {
      setError(error.message)
    }
  }

  // ------ Pagination ------ //
  const handlePageChange = (pageNumber: number) => {
    setPage((prevState) => ({ ...prevState, currentPage: pageNumber }))
    fetchData(Number(quizId), pageNumber);
  }

  return (
    <>
      {/* Back to previous */}
      <div className='flex items-center justify-between mb-4'>
        <Button variant={'outline'} onClick={nav.toQuizList} className='flex items-center'>
          <CircleChevronLeft className='w-5 h-5' /> Back to Quizzes
        </Button>
      </div>

      <div className='min-h-screen flex flex-col items-center'>
        <Card className='w-full shadow-lg rounded-xl p-6 bg-white pb-8'>
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
                <p className='text-lg'>No attempts found. Let's start a new attempt!</p>
              </div>
            ) : (
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {attempts.map((attempt) => (
                  <AttemptCard
                    quizId={attempt.quizId}
                    quizTitle={quiz?.title || ""}
                    key={attempt.id}
                    id={attempt.id}
                    score={attempt.score}
                    totalQuestions={attempt.totalQuestion}
                    attemptAt={new Date(attempt.attemptAt)}
                    onFinishDelete={() => handleDeleted(attempt.id)}
                  />
                ))}
              </div>
            )}
          </AnimatedSection>

          {/* Pagination */}
          {page.totalPages > 1 && (
            <FadeInSection>
              <Pagination
                total={page.totalElements}
                pageSize={page.pageSize}
                totalPages={page.totalPages}
                currentPage={page.currentPage}
                onPageChange={handlePageChange}
              />
            </FadeInSection>
          )}
          {/* End - Pagination */}
        </Card>
      </div>
    </>
  )
}

export default QuizPage
