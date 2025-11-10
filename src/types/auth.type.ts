export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest extends LoginRequest {
  name: string
}

export interface UserResponse {
  id: number
  email: string
  name: string
  avatarUrl?: string
  createdAt: string
  updatedAt?: string
}

export interface AuthResponse {
  isAuthenticated: boolean
  accessToken: string
  refreshToken: string
}

export interface ApiResponse<T> {
  code: number
  message: string
  data: T
}
