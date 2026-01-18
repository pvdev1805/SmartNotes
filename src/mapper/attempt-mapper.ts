import { AttemptDetail } from '@/types/quiz-attempt'

export const toAttemptQuestion = (attempts: AttemptDetail[]) => {
  return attempts.map((detail) => ({
    id: detail.id,
    text: detail.questionText,
    options: [
      { key: 'A', text: detail.optionA },
      { key: 'B', text: detail.optionB },
      { key: 'C', text: detail.optionC },
      { key: 'D', text: detail.optionD }
    ],
    correctOption: detail.correctAnswer,
    userAnswer: detail.userAnswer,
    isCorrect: detail.isCorrect
  }))
}