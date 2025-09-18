'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Pencil, RotateCcw } from 'lucide-react'
import FlashcardForm from './flashcard-form'
import { Flashcard } from '@/types/flashcard.type'

interface FlashcardDetailProps {
  flashcard: Flashcard
  onSave: (data: { question: string; answer: string; collectionIds: number[] }) => Promise<void> | void
}

const FlashcardDetail = ({ flashcard, onSave }: FlashcardDetailProps) => {
  const [flipped, setFlipped] = useState(false)
  const [editing, setEditing] = useState(false)

  const handleFlip = () => {
    setFlipped(!flipped)
  }

  if (editing) {
    return (
      <div>
        <h2 className='text-xl font-bold mb-4'>Edit Flashcard</h2>
        <FlashcardForm
          onSubmit={async (values) => {
            // // Save changes
            await onSave(values)

            setEditing(false)
          }}
          submitting={false}
          availableCollections={flashcard.collections}
        />
        <Button variant='outline' className='mt-4' onClick={() => setEditing(false)}>
          Cancel
        </Button>
      </div>
    )
  }

  return (
    <>
      <Card className='shadow-lg rounded-xl max-w-xl mx-auto'>
        <CardContent className='p-8 flex flex-col items-center'>
          <div className='mb-6'>
            <div className='perspective w-72 h-48 relative' style={{ minHeight: '12rem', minWidth: '18rem' }}>
              <div
                className={`flip-card w-full h-full ${flipped ? 'flipped' : ''}`}
                onClick={handleFlip}
                title='Click to flip'
              >
                {/* Front Side */}
                <div className='flip-card-side bg-gradient-to-br from-emerald-50 to-teal-50 text-gray-900'>
                  {flashcard.question}
                </div>
                {/* Back Side */}
                <div className='flip-card-side flip-card-back'>{flashcard.answer}</div>
              </div>
            </div>
            <div className='flex justify-center gap-2 mt-4'>
              <Button variant='outline' size='sm' onClick={handleFlip} className='flex items-center gap-1'>
                <RotateCcw className='w-4 h-4' />
                Flip
              </Button>
              <Button variant='outline' size='sm' onClick={() => setEditing(true)} className='flex items-center gap-1'>
                <Pencil className='w-4 h-4' />
                Edit
              </Button>
            </div>
          </div>
          <div className='flex flex-wrap gap-2 mt-2'>
            {flashcard.collections?.map((col) => (
              <span key={col.id} className='bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-medium'>
                {col.name}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default FlashcardDetail
