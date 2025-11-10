import apiClient from '@/apis/api-client'
import { ApiResponse, UserResponse } from '@/types/auth.type'

const USER_BASE_API = '/users'

export const getMe = async (): Promise<ApiResponse<UserResponse>> => {
  try {
    const response = await apiClient.get(`${USER_BASE_API}/me`)
    return response.data
  } catch (error) {
    console.error('Get me error:', error)
    throw error
  }
}
