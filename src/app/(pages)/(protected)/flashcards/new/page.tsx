'use client'

import FlashcardForm from '@/components/flashcards/flashcard-form'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { CircleChevronLeft, Diamond } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const NewFlashcardPage = () => {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleCreate = async (values: { question: string; answer: string; collectionIds: number[] }) => {
    try {
      setSubmitting(true)
      setError(null)

      // Simulate latency (remove in production)
      await new Promise((r) => setTimeout(r, 400))

      // addFlashcard(values)
      router.push('/flashcards') // back to list
    } catch (e: any) {
      setError('Failed to create flashcard.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <div className='min-h-screen flex flex-col items-center bg-gray-50 px-4 py-8'>
        <Card className='w-full max-w-2xl shadow-lg rounded-xl'>
          <CardContent className='p-8'>
            <div className='flex items-center justify-between mb-6'>
              <h1 className='text-2xl font-bold text-gray-900 flex items-center gap-2'>
                <Diamond className='w-6 h-6 text-emerald-500' />
                New Flashcard
              </h1>
              <Button variant='outline' onClick={() => router.push('/flashcards')} className='flex items-center gap-1'>
                <CircleChevronLeft className='w-4 h-4' /> Back
              </Button>
            </div>
            {error && (
              <div className='mb-4'>
                <Card className='border border-red-200 bg-red-50'>
                  <CardContent className='p-4 text-sm text-red-700'>{error}</CardContent>
                </Card>
              </div>
            )}
            <FlashcardForm onSubmit={handleCreate} submitting={submitting} />
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default NewFlashcardPage
