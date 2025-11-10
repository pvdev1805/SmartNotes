import apiClient from '@/apis/api-client'
import { ApiResponse } from '@/types/auth.type'
import { Quiz } from '@/types/quiz.type'

const QUIZ_BASE_API = '/quizzes'
const QUIZ_GENERATION_BASE_API = '/ai/generation/quiz-sets'

export const generateSingleQuiz = async (id : number): Promise<Quiz> => {
  const request = {
    docId: id
  }

  const response = await apiClient.post(`${QUIZ_GENERATION_BASE_API}/default`, request)
  const apiRes: ApiResponse<Quiz> = response.data

  if (!apiRes.data && apiRes.code != 1000) {
    throw new Error(`Failed to update data: ${apiRes.message}`)
  }
  return apiRes.data
}