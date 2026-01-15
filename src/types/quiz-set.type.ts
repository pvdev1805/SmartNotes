import { Quiz } from '@/types/quiz.type'

export interface QuizSet {
  id: number
  title: string
  originType: string
  quizzes?: Quiz[]
  createdAt: string
  updatedAt?: string
}