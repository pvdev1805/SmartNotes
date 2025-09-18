import { flashcards as mockFlashcards } from '@/data/flashcards'
import { Flashcard } from '@/types/flashcard.type'

export function getFlashcardById(id: number): Flashcard | undefined {
  return mockFlashcards.find((f) => f.id === id)
}

export function updateFlashcard(id: number, data: Partial<Flashcard>) {
  const idx = mockFlashcards.findIndex((f) => f.id === id)
  if (idx !== -1) {
    mockFlashcards[idx] = { ...mockFlashcards[idx], ...data }
    return mockFlashcards[idx]
  }
  return undefined
}
