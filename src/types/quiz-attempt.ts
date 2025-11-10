export interface QuizAttempt {
  id: number
  quizId: number
  totalQuestion: number
  score: number
  attemptDetails?: AttemptDetail[]
  attemptAt: string
}

export interface AttemptDetail {
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