'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Sparkles, FileText, BookOpen } from 'lucide-react'
import { useRouter } from 'next/navigation'

const QuizPage = () => {
  const router = useRouter()

  const handleRedirectToCreateQuiz = () => {
    router.push('/quiz/create')
  }

  return (
    <div className='min-h-screen flex flex-col items-center bg-gray-50'>
      <Card className='w-full shadow-lg rounded-xl p-8 bg-white'>
        <CardContent>
          <div className='flex items-center gap-3 mb-4'>
            <Sparkles className='w-8 h-8 text-blue-600' />
            <h2 className='text-2xl font-bold text-gray-900'>AI Quiz Generation</h2>
          </div>
          <p className='text-gray-700 mb-6'>
            Instantly generate quizzes from your notes or uploaded PDFs using advanced AI powered by{' '}
            <span className='font-semibold text-blue-600'>Google Gemma2</span> via{' '}
            <span className='font-semibold text-purple-600'>Nebius</span> on{' '}
            <span className='font-semibold text-pink-600'>HuggingFace</span>.
          </p>
          <div className='mb-6 flex flex-col gap-4'>
            <div className='flex items-center gap-2'>
              <FileText className='w-5 h-5 text-gray-500' />
              <span className='text-gray-800'>Select notes or uploaded PDFs document</span>
            </div>
            <div className='flex items-center gap-2'>
              <BookOpen className='w-5 h-5 text-gray-500' />
              <span className='text-gray-800'>Let AI analyze your content and create relevant quiz questions</span>
            </div>
            <div className='flex items-center gap-2'>
              <Sparkles className='w-5 h-5 text-blue-500' />
              <span className='text-gray-800'>Review, edit, and save quizzes for practice or sharing</span>
            </div>
          </div>
          <div className='flex gap-4 mt-8'>
            <Button onClick={handleRedirectToCreateQuiz}>Try Quiz Generation</Button>
            <Button
              variant='outline'
              onClick={() => {
                /* TODO: show documentation or help */
              }}
            >
              Learn More
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default QuizPage
