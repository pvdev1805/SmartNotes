'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const mockQuestions = [
  {
    id: 1,
    text: 'Which one is NOT a JavaScript framework?',
    options: [
      { key: 'A', text: 'React' },
      { key: 'B', text: 'Angular' },
      { key: 'C', text: 'Vue' },
      { key: 'D', text: 'Laravel' }
    ],
    correctOption: 'D'
  },
  {
    id: 2,
    text: 'What does HTML stand for?',
    options: [
      { key: 'A', text: 'Hyper Trainer Marking Language' },
      { key: 'B', text: 'Hyper Text Markup Language' },
      { key: 'C', text: 'Hyper Text Marketing Language' },
      { key: 'D', text: 'Hyper Text Markup Leveler' }
    ],
    correctOption: 'B'
  },
  {
    id: 3,
    text: 'Which company developed TypeScript?',
    options: [
      { key: 'A', text: 'Facebook' },
      { key: 'B', text: 'Microsoft' },
      { key: 'C', text: 'Google' },
      { key: 'D', text: 'Amazon' }
    ],
    correctOption: 'B'
  },
  {
    id: 4,
    text: 'Which is a backend language?',
    options: [
      { key: 'A', text: 'Python' },
      { key: 'B', text: 'CSS' },
      { key: 'C', text: 'HTML' },
      { key: 'D', text: 'Sass' }
    ],
    correctOption: 'A'
  },
  {
    id: 5,
    text: 'What is the output of 2 + "2" in JavaScript?',
    options: [
      { key: 'A', text: '4' },
      { key: 'B', text: '"22"' },
      { key: 'C', text: 'NaN' },
      { key: 'D', text: 'undefined' }
    ],
    correctOption: 'B'
  },
  {
    id: 6,
    text: 'Which tag is used for the largest heading in HTML?',
    options: [
      { key: 'A', text: '<h1>' },
      { key: 'B', text: '<h6>' },
      { key: 'C', text: '<head>' },
      { key: 'D', text: '<header>' }
    ],
    correctOption: 'A'
  },
  {
    id: 7,
    text: 'Which of these is a NoSQL database?',
    options: [
      { key: 'A', text: 'MySQL' },
      { key: 'B', text: 'PostgreSQL' },
      { key: 'C', text: 'MongoDB' },
      { key: 'D', text: 'Oracle' }
    ],
    correctOption: 'C'
  },
  {
    id: 8,
    text: 'Which CSS property changes text color?',
    options: [
      { key: 'A', text: 'font-style' },
      { key: 'B', text: 'color' },
      { key: 'C', text: 'background-color' },
      { key: 'D', text: 'text-decoration' }
    ],
    correctOption: 'B'
  },
  {
    id: 9,
    text: 'Which is a JavaScript data type?',
    options: [
      { key: 'A', text: 'float' },
      { key: 'B', text: 'number' },
      { key: 'C', text: 'decimal' },
      { key: 'D', text: 'character' }
    ],
    correctOption: 'B'
  },
  {
    id: 10,
    text: 'Which HTML attribute is used for an image source?',
    options: [
      { key: 'A', text: 'src' },
      { key: 'B', text: 'href' },
      { key: 'C', text: 'alt' },
      { key: 'D', text: 'link' }
    ],
    correctOption: 'A'
  }
]

const QuizQuestionPage = () => {
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<(string | null)[]>(Array(mockQuestions.length).fill(null))
  const [submitted, setSubmitted] = useState(false)

  const handleSelect = (optionKey: string) => {
    setAnswers((prev) => {
      const updated = [...prev]
      updated[current] = optionKey
      return updated
    })
  }

  const handlePrev = () => setCurrent((prev) => Math.max(0, prev - 1))
  const handleNext = () => setCurrent((prev) => Math.min(mockQuestions.length - 1, prev + 1))

  const handleSubmit = () => setSubmitted(true)

  // Calculate results
  const results = submitted
    ? mockQuestions.map((q, idx) => ({
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
            <h2 className='text-2xl font-bold text-gray-900 mb-4'>Quiz Results</h2>
            <div className='mb-4 text-lg'>
              You scored <span className='font-bold text-blue-700'>{score}</span> out of{' '}
              <span className='font-bold'>{mockQuestions.length}</span>
            </div>
            <div className='mb-6'>
              {mockQuestions.map((q, idx) => (
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
            <Button onClick={() => window.location.reload()}>Try Again</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const q = mockQuestions[current]

  return (
    <div className='min-h-screen flex flex-col items-center bg-gray-50 px-2 py-8'>
      <Card className='w-full max-w-xl shadow-lg rounded-xl p-8 bg-white'>
        <CardContent>
          {/* Progress */}
          <div className='mb-4 flex items-center justify-between'>
            <span className='text-sm text-gray-500'>
              Question {current + 1} of {mockQuestions.length}
            </span>
            <div className='flex gap-1'>
              {mockQuestions.map((_, idx) => (
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
            {current < mockQuestions.length - 1 ? (
              <Button onClick={handleNext}>Next</Button>
            ) : (
              <Button onClick={handleSubmit} variant='default'>
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
