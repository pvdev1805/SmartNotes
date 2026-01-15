import apiClient from '@/apis/api-client'
import { ApiResponse } from '@/types/auth.type'
import { QuizSet } from '@/types/quiz-set.type'
import { QuizAttempt } from '@/types/quiz-attempt'
import { Quiz } from '@/types/quiz.type'

const QUIZ_SET_BASE_API = '/quiz-sets'

export const createQuizSet = async (request: { title : string }): Promise<QuizSet> => {
  const response = await apiClient.post(`${QUIZ_SET_BASE_API}`, request)
  const apiRes: ApiResponse<QuizSet> = response.data

  if (!apiRes.data && apiRes.code != 1000) {
    throw new Error(`Failed to create data: ${apiRes.message}`)
  }
  return apiRes.data
}

export const updateQuizSet = async (id: number, request: { title : string }): Promise<QuizSet> => {
  const response = await apiClient.patch(`${QUIZ_SET_BASE_API}/${id}`, request)
  const apiRes: ApiResponse<QuizSet> = response.data

  if (!apiRes.data && apiRes.code != 1000) {
    throw new Error(`Failed to update data: ${apiRes.message}`)
  }
  return apiRes.data
}

export const deleteQuizSet = async (id : number) => {
  const response = await apiClient.delete(`${QUIZ_SET_BASE_API}/${id}`)
  const apiRes: ApiResponse<QuizSet> = response.data

  if (!apiRes.data && apiRes.code != 1000) {
    throw new Error(`Failed to delete data: ${apiRes.message}`)
  }
}

export const getDefaultQuizSet = async (): Promise<QuizSet> => {
  const response = await apiClient.get(`${QUIZ_SET_BASE_API}/default`)
  const apiRes: ApiResponse<QuizSet> = response.data

  if (!apiRes.data && apiRes.code != 1000) {
    throw new Error(`Failed to get data: ${apiRes.message}`)
  }
  return apiRes.data
}

export const getQuizSet = async (id: number): Promise<QuizSet> => {
  const response = await apiClient.get(`${QUIZ_SET_BASE_API}/${id}`)
  const apiRes: ApiResponse<QuizSet> = response.data

  if (!apiRes.data && apiRes.code != 1000) {
    throw new Error(`Failed to get data: ${apiRes.message}`)
  }
  return apiRes.data
}

export const getAllQuizSets = async (): Promise<QuizSet[]> => {
  const response = await apiClient.get(`${QUIZ_SET_BASE_API}`)
  const apiRes: ApiResponse<QuizSet[]> = response.data

  if (!apiRes.data && apiRes.code != 1000) {
    throw new Error(`Failed to get data: ${apiRes.message}`)
  }
  return apiRes.data
}