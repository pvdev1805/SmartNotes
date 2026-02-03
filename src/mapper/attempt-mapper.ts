import { QuizAttemptDetail } from '@/types/quiz-attempt.type'

export const toAttemptQuestion = (attempts: QuizAttemptDetail[]) => {
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