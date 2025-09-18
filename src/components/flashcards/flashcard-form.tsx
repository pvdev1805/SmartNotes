'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Plus, X } from 'lucide-react'
import { useState } from 'react'
import { FlashcardCollection } from '@/types/flashcard.type'

interface FlashcardFormValues {
  question: string
  answer: string
  collectionIds: number[]
}

interface FlashcardFormProps {
  onSubmit: (values: FlashcardFormValues) => Promise<void> | void
  submitting?: boolean
  availableCollections?: FlashcardCollection[]
}

const defaultCollections: FlashcardCollection[] = [
  { id: 1, name: 'JavaScript' },
  { id: 2, name: 'React' },
  { id: 3, name: 'TypeScript' }
]

const FlashcardForm = (props: FlashcardFormProps) => {
  const { onSubmit, submitting = false, availableCollections = [] } = props

  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [newCollection, setNewCollection] = useState('')
  const [localCollections, setLocalCollections] = useState<FlashcardCollection[]>(
    availableCollections.length > 0 ? availableCollections : defaultCollections
  )
  const [selectedIds, setSelectedIds] = useState<number[]>([])

  const toggleCollection = (id: number) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((cid) => cid !== id) : [...prev, id]))
  }

  const handleAddCollection = () => {
    if (!newCollection.trim()) return
    const id = localCollections.length > 0 ? Math.max(...localCollections.map((c) => c.id)) + 1 : 1
    const created = { id, name: newCollection.trim() }
    setLocalCollections((prev) => [...prev, created])
    setSelectedIds((prev) => [...prev, id])
    setNewCollection('')
  }

  const handleRemoveCollection = (id: number) => {
    setSelectedIds((prev) => prev.filter((cid) => cid !== id))
  }

  const isValid = question.trim() !== '' && answer.trim() !== ''

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValid) return
    onSubmit({
      question: question.trim(),
      answer: answer.trim(),
      collectionIds: selectedIds
    })
  }

  return (
    <>
      <form onSubmit={handleSubmit} className='w-full flex flex-col gap-6'>
        <Card className='shadow-sm border border-gray-200'>
          <CardContent className='p-6 flex flex-col gap-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Question</label>
              <textarea
                required
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                rows={3}
                className='w-full resize-y rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 bg-white'
                placeholder='Enter the prompt or term...'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Answer</label>
              <textarea
                required
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                rows={4}
                className='w-full resize-y rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 bg-white'
                placeholder='Provide the explanation or definition...'
              />
            </div>

            <div className='flex flex-col gap-3'>
              <label className='text-sm font-medium text-gray-700'>Collections</label>

              {localCollections.length === 0 && (
                <div className='text-xs text-gray-500'>No collections yet. Add one below.</div>
              )}

              <div className='flex flex-wrap gap-2'>
                {localCollections.map((col) => {
                  const active = selectedIds.includes(col.id)
                  return (
                    <button
                      type='button'
                      key={col.id}
                      onClick={() => toggleCollection(col.id)}
                      className={`px-3 py-1 rounded-full text-xs font-medium border transition
                      ${
                        active
                          ? 'bg-emerald-500 text-white border-emerald-500'
                          : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
                      }`}
                    >
                      {col.name}
                    </button>
                  )
                })}
              </div>

              {selectedIds.length > 0 && (
                <div className='flex flex-wrap gap-2 mt-1'>
                  {selectedIds.map((id) => {
                    const col = localCollections.find((c) => c.id === id)
                    if (!col) return null
                    return (
                      <span
                        key={id}
                        className='inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-1 rounded text-xs'
                      >
                        {col.name}
                        <button
                          type='button'
                          aria-label='Remove collection'
                          onClick={() => handleRemoveCollection(id)}
                          className='hover:text-emerald-900'
                        >
                          <X className='w-3 h-3' />
                        </button>
                      </span>
                    )
                  })}
                </div>
              )}

              <div className='flex items-center gap-2 mt-2'>
                <input
                  type='text'
                  value={newCollection}
                  onChange={(e) => setNewCollection(e.target.value)}
                  placeholder='New collection name'
                  className='flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 bg-white'
                />
                <Button
                  type='button'
                  variant='outline'
                  onClick={handleAddCollection}
                  disabled={!newCollection.trim()}
                  className='flex items-center gap-1'
                >
                  <Plus className='w-4 h-4' /> Add
                </Button>
              </div>
            </div>

            <div className='flex justify-end pt-2'>
              <Button
                type='submit'
                disabled={!isValid || submitting}
                className='bg-gradient-to-r from-emerald-400 to-teal-600 text-white'
              >
                {submitting ? 'Saving...' : 'Create Flashcard'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </>
  )
}

export default FlashcardForm
