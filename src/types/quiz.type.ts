import { PageInfo } from '@/types/util.type'

export interface Quiz {
  id: number
  title: string
  quizSetId: number
  sourceDocumentId: string
  questions?: Question[]
  createdAt: string
  updatedAt: string
}

export interface Question {
  id: number
  questionText: string
  optionA: string
  optionB: string
  optionC: string
  optionD: string
  correctAnswer: string
}

export interface QuizPage {
  pageData: Quiz[]
  pageInfo: PageInfo
}