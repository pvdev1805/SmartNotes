import apiClient from '@/apis/api-client'
import { ApiResponse } from '@/types/auth.type'
import { Quiz } from '@/types/quiz.type'
import { QuizAttempt } from '@/types/quiz-attempt'

const QUIZ_BASE_API = '/quizzes'
const QUIZ_ATTEMPT_BASE_API = '/quizzes'
const QUIZ_GENERATION_BASE_API = '/ai/generation/quiz-sets'

export const generateSingleQuiz = async (docId : number): Promise<Quiz> => {
  const request = {
    docId: docId
  }

  const response = await apiClient.post(`${QUIZ_GENERATION_BASE_API}/default`, request)
  const apiRes: ApiResponse<Quiz> = response.data

  if (!apiRes.data && apiRes.code != 1000) {
    throw new Error(`Failed to create data: ${apiRes.message}`)
  }
  return apiRes.data
}

export const getQuiz = async (quizId : number): Promise<Quiz> => {
  const response = await apiClient.get(`${QUIZ_BASE_API}/${quizId}`)
  const apiRes: ApiResponse<Quiz> = response.data

  if (!apiRes.data && apiRes.code != 1000) {
    throw new Error(`Failed to get data: ${apiRes.message}`)
  }
  return apiRes.data
}

export const getAllQuizAttempts = async (quizId : number): Promise<QuizAttempt[]> => {
  const response = await apiClient.get(`${QUIZ_BASE_API}/${quizId}/attempts`)
  const apiRes: ApiResponse<QuizAttempt[]> = response.data

  if (!apiRes.data && apiRes.code != 1000) {
    throw new Error(`Failed to get data: ${apiRes.message}`)
  }
  return apiRes.data
}

export const startQuizAttempt = async (quizId : number): Promise<QuizAttempt> => {
  const response = await apiClient.post(`${QUIZ_BASE_API}/${quizId}/attempts`)
  const apiRes: ApiResponse<QuizAttempt> = response.data

  if (!apiRes.data && apiRes.code != 1000) {
    throw new Error(`Failed to create data: ${apiRes.message}`)
  }
  return apiRes.data
}

export const getQuizAttempt = async (quizId : number, attemptId : number): Promise<QuizAttempt> => {
  const response = await apiClient.get(`${QUIZ_BASE_API}/${quizId}/attempts/${attemptId}`)
  const apiRes: ApiResponse<QuizAttempt> = response.data

  if (!apiRes.data && apiRes.code != 1000) {
    throw new Error(`Failed to get data: ${apiRes.message}`)
  }
  return apiRes.data
}

export const updateAttemptProgress = async (quizId : number, attemptId : number, request : { id : number , userAnswer: string }): Promise<QuizAttempt> => {
  const response = await apiClient.patch(`${QUIZ_BASE_API}/${quizId}/attempts/${attemptId}`, request)
  const apiRes: ApiResponse<QuizAttempt> = response.data

  if (!apiRes.data && apiRes.code != 1000) {
    throw new Error(`Failed to update data: ${apiRes.message}`)
  }
  return apiRes.data
}

export const finishAttempt = async (quizId : number, attemptId : number): Promise<QuizAttempt> => {
  const response = await apiClient.post(`${QUIZ_BASE_API}/${quizId}/attempts/${attemptId}/answer`)
  const apiRes: ApiResponse<QuizAttempt> = response.data

  if (!apiRes.data && apiRes.code != 1000) {
    throw new Error(`Failed to update data: ${apiRes.message}`)
  }
  return apiRes.data
}