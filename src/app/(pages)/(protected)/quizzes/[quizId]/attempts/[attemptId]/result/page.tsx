'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle, CircleChevronLeft, XCircle } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getAttemptAnswer } from '@/services/quiz.service'
import { useNav } from '@/hooks/use-nav'

interface Result {
  score: number
  total: number
  percent: number
  questions: Question[]
}

interface Question {
  id: number
  text: string
  options: { key: string; text: string }[]
  correctAnswer?: string
  userAnswer?: string
  isCorrect?: boolean
}

const QuizResultPage = () => {
  const nav = useNav()

  const { quizId, attemptId } = useParams()

  const [result, setResult] = useState<Result>({score: 0, total: 0, percent: 0, questions: []});
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  const fetchData = async (qid: number, aid: number) => {
    setLoading(true)
    setError('')

    try {
      const data = await getAttemptAnswer(qid, aid)
      if (!data.attemptDetails) {
        throw new Error("This attempt has no information, please try again")
      }
      const mappedQuestion : Question[] = data.attemptDetails.map((detail) => ({
        id: detail.id,
        text: detail.questionText,
        options: [
          { key: 'A', text: detail.optionA },
          { key: 'B', text: detail.optionB },
          { key: 'C', text: detail.optionC },
          { key: 'D', text: detail.optionD }
        ],
        correctAnswer: detail.correctAnswer,
        userAnswer: detail.userAnswer,
        isCorrect: detail.isCorrect
      }))

      const score = mappedQuestion.filter(q => q.isCorrect).length
      const total = mappedQuestion.length
      const percent = Math.round((score / total) * 100)
      const result : Result = { score: score, total: total, percent: percent, questions: mappedQuestion }
      setResult(result)
    } catch (error : any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData(Number(quizId), Number(attemptId));
  }, [quizId])


  return (
    <>
      <div className='flex items-center justify-between mb-4'>
        <Button variant={'outline'} onClick={() => nav.toQuiz(Number(quizId))} className='flex items-center'>
          <CircleChevronLeft className='w-5 h-5' /> Back to Quiz
        </Button>
      </div>

      <div className='min-h-screen flex flex-col items-center px-2'>
        <Card className='w-full max-w-2xl shadow-lg rounded-xl p-8 bg-white'>
          <CardContent>
            <h2 className='text-2xl font-bold text-gray-900 mb-2'>Quiz Results</h2>
            <div className='flex flex-col items-center mb-6'>
              <div className='text-4xl font-bold text-blue-700 mb-2'>
                {result.score} / {result.total}
              </div>
              <div className='text-lg text-gray-700 mb-2'>{result.percent}% correct</div>
              <div className='w-full bg-gray-200 rounded-full h-3 mb-2'>
                <div className='bg-blue-500 h-3 rounded-full transition-all' style={{ width: `${result.percent}%` }} />
              </div>
              <div className='text-sm text-gray-500'>
                {result.percent >= 80
                  ? 'Excellent work!'
                  : result.percent >= 60
                    ? 'Good job, keep practicing!'
                    : 'Keep trying, you can do it!'}
              </div>
            </div>
            <div className='mb-6'>
              {result.questions.map((q, idx) => {
                const isCorrect = q.isCorrect
                return (
                  <div
                    key={idx}
                    className={`mb-3 p-3 rounded-lg border flex items-start gap-3 ${
                      isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                    }`}
                  >
                    {isCorrect ? (
                      <CheckCircle className='w-6 h-6 text-green-500 mt-1' />
                    ) : (
                      <XCircle className='w-6 h-6 text-red-500 mt-1' />
                    )}
                    <div>
                      <div className='font-semibold mb-1'>{q.text}</div>
                      <div>
                        Your answer:{' '}
                        <span className={isCorrect ? 'text-green-700 font-medium' : 'text-red-700 font-medium'}>
                        {q.userAnswer ? (
                          q.options.find((o) => o.key === q.userAnswer)?.text
                        ) : (
                          <span className='italic text-gray-400'>No answer</span>
                        )}
                      </span>
                      </div>
                      {!isCorrect && (
                        <div>
                          Correct answer:{' '}
                          <span className='text-green-700 font-medium'>
                          {q.options.find((o) => o.key === q.correctAnswer)?.text}
                        </span>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default QuizResultPage
