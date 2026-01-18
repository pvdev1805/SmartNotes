export interface Question {
  id: number
  questionText: string
  optionA: string
  optionB: string
  optionC: string
  optionD: string
  correctAnswer: string
}

// For easy frontend display
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