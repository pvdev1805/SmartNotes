'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle, XCircle } from 'lucide-react'

const mockResult = {
  score: 8,
  total: 10,
  percent: 80,
  questions: [
    {
      text: 'Which one is NOT a JavaScript framework?',
      options: [
        { key: 'A', text: 'React' },
        { key: 'B', text: 'Angular' },
        { key: 'C', text: 'Vue' },
        { key: 'D', text: 'Laravel' }
      ],
      userAnswer: 'D',
      correctAnswer: 'D'
    },
    {
      text: 'What does HTML stand for?',
      options: [
        { key: 'A', text: 'Hyper Trainer Marking Language' },
        { key: 'B', text: 'Hyper Text Markup Language' },
        { key: 'C', text: 'Hyper Text Marketing Language' },
        { key: 'D', text: 'Hyper Text Markup Leveler' }
      ],
      userAnswer: 'A',
      correctAnswer: 'B'
    },
    {
      text: 'Which company developed TypeScript?',
      options: [
        { key: 'A', text: 'Facebook' },
        { key: 'B', text: 'Microsoft' },
        { key: 'C', text: 'Google' },
        { key: 'D', text: 'Apple' }
      ],
      userAnswer: 'B',
      correctAnswer: 'B'
    },
    {
      text: 'Which is a backend language?',
      options: [
        { key: 'A', text: 'Python' },
        { key: 'B', text: 'CSS' },
        { key: 'C', text: 'JavaScript' },
        { key: 'D', text: 'Ruby' }
      ],
      userAnswer: 'A',
      correctAnswer: 'A'
    },
    {
      text: 'Which HTML tag is used to define an unordered list?',
      options: [
        { key: 'A', text: '<ul>' },
        { key: 'B', text: '<ol>' },
        { key: 'C', text: '<li>' },
        { key: 'D', text: '<list>' }
      ],
      userAnswer: 'A',
      correctAnswer: 'A'
    },
    {
      text: 'What is the output of 2 + "2" in JavaScript?',
      options: [
        { key: 'A', text: '4' },
        { key: 'B', text: '"22"' },
        { key: 'C', text: 'NaN' },
        { key: 'D', text: 'undefined' }
      ],
      userAnswer: 'B',
      correctAnswer: 'B'
    },
    {
      text: 'Which of the following is a CSS framework?',
      options: [
        { key: 'A', text: 'Django' },
        { key: 'B', text: 'Bootstrap' },
        { key: 'C', text: 'Flask' },
        { key: 'D', text: 'Express' }
      ],
      userAnswer: 'B',
      correctAnswer: 'B'
    },
    {
      text: 'Which keyword is used to declare a constant in JavaScript?',
      options: [
        { key: 'A', text: 'let' },
        { key: 'B', text: 'var' },
        { key: 'C', text: 'const' },
        { key: 'D', text: 'static' }
      ],
      userAnswer: 'C',
      correctAnswer: 'C'
    },
    {
      text: 'What does CSS stand for?',
      options: [
        { key: 'A', text: 'Computer Style Sheets' },
        { key: 'B', text: 'Creative Style Sheets' },
        { key: 'C', text: 'Cascading Style Sheets' },
        { key: 'D', text: 'Colorful Style Sheets' }
      ],
      userAnswer: 'A',
      correctAnswer: 'C'
    },
    {
      text: 'Which of the following is NOT a programming language?',
      options: [
        { key: 'A', text: 'Python' },
        { key: 'B', text: 'HTML' },
        { key: 'C', text: 'Java' },
        { key: 'D', text: 'C++' }
      ],
      userAnswer: 'B',
      correctAnswer: 'B'
    }
  ]
}

const QuizResultPage = () => {
  const result = mockResult

  return (
    <div className='min-h-screen flex flex-col items-center bg-gray-50 px-2 py-8'>
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
              const isCorrect = q.userAnswer === q.correctAnswer
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
          <div className='flex gap-3 justify-end'>
            <Button
              variant='outline'
              onClick={() => {
                /* TODO: Back to Quizzes */
              }}
            >
              Back to Quizzes
            </Button>
            <Button
              onClick={() => {
                /* TODO: Retake Quiz */
              }}
            >
              Retake Quiz
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default QuizResultPage
