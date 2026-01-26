import { Quiz } from '@/types/quiz.type'
import { PageInfo } from '@/types/util.type'

export interface QuizSet {
  id: number
  title: string
  originType: string
  quizzes?: Quiz[]
  createdAt: string
  updatedAt?: string
}

export interface QuizSetPage {
  pageData: QuizSet[]
  pageInfo: PageInfo
}

// For frontend display
export interface QuizCollection {
  id: number
  title: string
}