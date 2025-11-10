import { Question } from '@/types/quesiton.type'

export interface Quiz {
  id: number
  title: string
  quizSetId: number
  sourceDocumentId: string
  questions?: Question[]
  createdAt: string
  updatedAt?: string
}