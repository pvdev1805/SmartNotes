'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { QuizAttempt } from '@/types/quiz-attempt.type'
import { finishAttempt, getQuizAttempt, startQuizAttempt, updateAttemptProgress } from '@/services/quiz.service'
import { useParams } from 'next/navigation'
import { useNav } from '@/hooks/use-nav'
import { AttemptQuestion } from '@/types/quiz-attempt.type'
import { toAttemptQuestion } from '@/mapper/attempt-mapper'
import ErrorBlock from '@/components/common/error-block'

const QuizQuestionPage = () => {
  const nav = useNav()
  const { quizId, attemptId } = useParams()

  const [attempt, setAttempt] = useState<QuizAttempt | null>(); // Original attempts returned from backend
  const [questions, setQuestions] = useState<AttemptQuestion[]>([]); // Map to lists
  const [loading, setLoading] = useState(true)

  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<(string | null)[]>([])
  const [submitted, setSubmitted] = useState(false)

  const [error, setError] = useState('')

  // ------ Fetching data ------ //
  const fetchData = async (qid: number, aid: number) => {
    setLoading(true)
    setError('')

    try {
      const data = await getQuizAttempt(qid, aid)
      if (!data.attemptDetails) {
        throw new Error("This attempt has no information, please try again")
      }

      const mappedQuestions : AttemptQuestion[] = toAttemptQuestion(data.attemptDetails)
      setAttempt(data)
      setQuestions(mappedQuestions)
      setAnswers(Array(mappedQuestions.length).fill(null))
    } catch (error : any) {
      setAttempt(null)
      setQuestions([])
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData(Number(quizId), Number(attemptId));
  }, [quizId])

  // ------ Handle start new attempt (after completion) ------ //
  const handleNewQuizAttempt = async () => {
    setError('')

    try {
      const newAttempt = await startQuizAttempt(Number(quizId))
      nav.toNewQuizAttempt(Number(quizId), newAttempt.id)
    } catch (error : any) {
      setError(error.message)
    }
  }

  // ------ Handle attempt's progress ------ //
  const handleSelect = (optionKey: string) => {
    setAnswers((prev) => {
      const updated = [...prev]
      updated[current] = optionKey
      return updated
    })
  }

  const handlePrev = () => setCurrent((prev) => Math.max(0, prev - 1))

  const handleNext = async () => {
    const currentAnswer = answers[current]
    const currentQuestion = questions[current]

    // Only sync if user has selected an answer
    if (currentAnswer && quizId && attemptId) {
      try {
        await updateAttemptProgress(
          Number(quizId),
          Number(attemptId),
          {
            id: currentQuestion.id,
            userAnswer: currentAnswer
          }
        )
      } catch (error: any) {
        console.error('Failed to save answer:', error)
        setError(error.message)
      }
    }

    // Move to next question
    setCurrent((prev) => Math.min(questions.length - 1, prev + 1))
  }

  const handleSubmit = async (qid: number, aid: number) => {
    try {
      const result = await finishAttempt(qid, aid)

      if (!result.attemptDetails) {
        throw new Error("This attempt has no information, please try again")
      }

      const mappedQuestions : AttemptQuestion[] = toAttemptQuestion(result.attemptDetails)
      setAttempt(result)
      setQuestions(mappedQuestions)

      setSubmitted(true)
    } catch (error : any) {
      setError(error.message)
    }
  }

  // Calculate results
  const results = submitted
    ? questions.map((q, idx) => ({
        correct: answers[idx] === q.correctOption,
        answered: answers[idx] !== null
      }))
    : []

  const score = results.filter((r) => r.correct).length

  if (submitted) {
    return (
      <div className='min-h-screen flex flex-col items-center bg-gray-50 px-2 py-8'>
        <Card className='w-full max-w-xl shadow-lg rounded-xl p-8 bg-white'>
          <CardContent>
            <h2 className='text-2xl font-bold text-gray-900 mb-4'>Quiz Ended</h2>
            <div className='mb-4 text-lg'>
              You scored <span className='font-bold text-blue-700'>{score}</span> out of{' '}
              <span className='font-bold'>{questions.length}</span>
            </div>
            <div className='mb-6'>
              {questions.map((q, idx) => (
                <div
                  key={q.id}
                  className={`mb-3 p-3 rounded-lg border ${
                    results[idx].correct ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                  }`}
                >
                  <div className='font-semibold mb-1'>{q.text}</div>
                  <div>
                    Your answer:{' '}
                    <span className='font-medium'>
                      {answers[idx] ? (
                        q.options.find((o) => o.key === answers[idx])?.text
                      ) : (
                        <span className='italic text-gray-400'>No answer</span>
                      )}
                    </span>
                  </div>
                  <div>
                    Correct answer:{' '}
                    <span className='font-medium text-green-700'>
                      {q.options.find((o) => o.key === q.correctOption)?.text}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className='flex items-center justify-between mb-4'>
              {/*<Button onClick={() => window.location.reload()}>Try Again</Button>*/}
              <Button onClick={handleNewQuizAttempt}>Try New Attempt</Button>
              <Button variant={'outline'} onClick={() => nav.toQuiz(Number(quizId))} className='flex items-center'>
                Back to Quiz
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (loading) {
    return (
      <p className="text-gray-500">Loading quizzes...</p>
    )
  }

  const q = questions[current]

  return (
    <div className='min-h-screen flex flex-col items-center bg-gray-50 px-2 py-8'>
      <Card className='w-full max-w-xl shadow-lg rounded-xl p-8 bg-white'>
        <ErrorBlock errorMessage={error} />
        <CardContent>
          {/* Progress */}
          <div className='mb-4 flex items-center justify-between'>
            <span className='text-sm text-gray-500'>
              Question {current + 1} of {questions.length}
            </span>
            <div className='flex gap-1'>
              {questions.map((_, idx) => (
                <span
                  key={idx}
                  className={`w-2 h-2 rounded-full ${
                    idx === current ? 'bg-blue-600' : answers[idx] ? 'bg-green-400' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
          {/* Question */}
          <div className='text-lg font-medium text-gray-800 mb-4'>{q.text}</div>
          <div className='flex flex-col gap-3 mb-6'>
            {q.options.map((opt) => (
              <label
                key={opt.key}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg border cursor-pointer transition
                  ${answers[current] === opt.key ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-gray-50 hover:border-blue-300'}
                `}
              >
                <input
                  type='radio'
                  name={`option-${current}`}
                  value={opt.key}
                  checked={answers[current] === opt.key}
                  onChange={() => handleSelect(opt.key)}
                  className='accent-blue-600'
                />
                <span className='font-semibold'>{opt.key}.</span>
                <span>{opt.text}</span>
              </label>
            ))}
          </div>
          {/* Navigation */}
          <div className='flex justify-between items-center'>
            <Button variant='outline' onClick={handlePrev} disabled={current === 0}>
              Previous
            </Button>
            {current < questions.length - 1 ? (
              <Button onClick={handleNext}>Next</Button>
            ) : (
              <Button onClick={() => handleSubmit(Number(quizId), Number(attemptId))} variant='default' className='bg-green-600 hover:bg-green-700'>
                Submit
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default QuizQuestionPage
