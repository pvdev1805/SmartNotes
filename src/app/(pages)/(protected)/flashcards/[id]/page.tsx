'use client'

import FlashcardDetail from '@/components/flashcards/flashcard-detail'
import { Button } from '@/components/ui/button'
import { getFlashcardById, updateFlashcard } from '@/services/flashcards'
import { Flashcard } from '@/types/flashcard.type'
import { CircleChevronLeft, Info } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const FlashcardDetailPage = () => {
  const router = useRouter()
  const params = useParams()
  const id = Number(params.id)
  const [flashcard, setFlashcard] = useState<Flashcard | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Fetch flashcard by id (simulate fetching)
  // In real app, replace with API call to fetch flashcard
  useEffect(() => {
    const card = getFlashcardById(id)
    if (card) setFlashcard(card)
    else setError('Flashcard not found.')
  }, [id])

  const handleSave = (values: { question: string; answer: string; collectionIds: number[] }) => {
    if (!flashcard) return

    // Update flashcard logic here

    updateFlashcard(flashcard.id, {
      question: values.question,
      answer: values.answer,
      collections: values.collectionIds.map((cid) => ({ id: cid, name: `Collection ${cid}` }))
    })

    // Refresh local state
    const updated = getFlashcardById(flashcard.id)
    setFlashcard(updated ?? null)

    router.push('/flashcards') // back to list
  }

  if (error) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-50'>
        <div className='text-lg text-red-500'>{error}</div>
      </div>
    )
  }

  return (
    <>
      <div className='min-h-screen flex flex-col items-center bg-gray-50 px-4 py-8'>
        <div className='w-full max-w-2xl flex flex-col gap-6'>
          <div className='flex items-center mb-4'>
            <Button variant='outline' onClick={() => router.push('/flashcards')} className='flex items-center gap-1'>
              <CircleChevronLeft className='w-4 h-4' /> Back
            </Button>
          </div>
          {flashcard && (
            <div className='bg-white rounded-xl shadow-lg p-6'>
              <h2 className='text-xl font-bold mb-4 text-center'>{flashcard.question}</h2>
              <hr className='my-4' />
              <div className='flex items-center justify-center gap-2 mb-4 text-emerald-700 text-sm'>
                <Info className='w-4 h-4' />
                Click the card below to flip between question (front side) and answer (back side).
              </div>
              <FlashcardDetail flashcard={flashcard} onSave={handleSave} />
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default FlashcardDetailPage
