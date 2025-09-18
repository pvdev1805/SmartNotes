export interface Flashcard {
  id: number
  question: string
  answer: string
  collections?: Collection[]
}

export interface FlashcardCollection {
  id: number
  name: string
}
