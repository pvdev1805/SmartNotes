import { PageInfo } from '@/types/util.type'

export interface QuizAttempt {
  id: number
  quizId: number
  totalQuestion: number
  score: number
  attemptDetails?: QuizAttemptDetail[]
  attemptAt: string
}

export interface QuizAttemptDetail {
  id: number
  questionText: string
  optionA: string
  optionB: string
  optionC: string
  optionD: string
  correctAnswer?: string
  userAnswer?: string
  isCorrect?: boolean
}

export interface QuizAttemptPage {
  pageData: QuizAttempt[]
  pageInfo: PageInfo
}

// For easy frontend display (Map to list)
export interface AttemptQuestion {
  id: number
  text: string
  options: { key: string; text: string }[]
  correctOption?: string
  userAnswer?: string
  isCorrect?: boolean
}

export interface AttemptResult {
  score: number
  total: number
  percent: number
  questions: AttemptQuestion[]
}