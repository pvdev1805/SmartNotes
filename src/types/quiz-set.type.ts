import { Quiz } from '@/types/quiz.type'

export interface QuizSet {
  id: number
  title: string
  originType: number
  quizzes?: Quiz[]
  createdAt: string
  updatedAt?: string
}