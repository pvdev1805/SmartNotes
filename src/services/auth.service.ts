import apiClient from '@/apis/api-client'
import { ApiResponse, AuthResponse, LoginRequest, RegisterRequest, UserResponse } from '@/types/auth.type'
import { setCookie } from 'cookies-next'
import { toast } from 'react-toastify'

const AUTH_BASE_URL = '/auth'

export const login = async (request: LoginRequest): Promise<ApiResponse<AuthResponse>> => {
  try {
    const response = await apiClient.post(`${AUTH_BASE_URL}/login`, request)

    const authResponse: AuthResponse = response.data.data
    const message: string = response.data.message

    if (authResponse.accessToken) {
      setCookie('accessToken', authResponse.accessToken, { maxAge: 60 * 15 }) // 15 minutes

      setCookie('refreshToken', authResponse.refreshToken, { maxAge: 60 * 60 * 24 * 7 }) // 7 days
    }

    toast.success(message)

    return response.data
  } catch (error: any) {
    console.error('Login error:', error)
    const errorMessage = error.response?.data.message || 'Login failed. Please try again.'
    toast.error(errorMessage)
    throw error
  }
}

export const register = async (request: RegisterRequest): Promise<ApiResponse<UserResponse>> => {
  try {
    const response = await apiClient.post(`${AUTH_BASE_URL}/register`, request)
    const message: string = response.data.message

    toast.success(message)

    return response.data
  } catch (error: any) {
    console.error('Registration error:', error)
    const errorMessage = error.response?.data.message || 'Registration failed. Please try again.'
    toast.error(errorMessage)
    throw error
  }
}

export const logout = async (): Promise<void> => {
  try {
    await apiClient.post(`${AUTH_BASE_URL}/logout`)
  } catch (error: any) {
    console.error(
      'Server logout failed, likely due to expired token or network issue. Proceeding with client-side cleanup.',
      error
    )
  }
}
