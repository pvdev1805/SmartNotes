import apiClient from '@/apis/api-client'
import { ApiResponse } from '@/types/auth.type'
import { QuizSet } from '@/types/quiz-set.type'

const QUIZ_SET_BASE_API = '/quiz-sets'

export const getDefaultQuizSet = async (): Promise<QuizSet> => {
  const response = await apiClient.get(`${QUIZ_SET_BASE_API}/default`)
  const apiRes: ApiResponse<QuizSet> = response.data

  if (!apiRes.data && apiRes.code != 1000) {
    throw new Error(`Failed to update data: ${apiRes.message}`)
  }
  return apiRes.data
}

export const getAllQuizSets = async (): Promise<QuizSet[]> => {
  const response = await apiClient.get(`${QUIZ_SET_BASE_API}`)
  const apiRes: ApiResponse<QuizSet[]> = response.data

  if (!apiRes.data && apiRes.code != 1000) {
    throw new Error(`Failed to update data: ${apiRes.message}`)
  }
  return apiRes.data
}