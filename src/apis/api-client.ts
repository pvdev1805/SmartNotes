import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'
import { deleteCookie, getCookie, setCookie } from 'cookies-next'

const BASE_URL = 'http://localhost:8080/api'

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true // Include cookies for cross-origin requests
})

const refreshTokenClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true // Include cookies for cross-origin requests
})

let isRefreshing = false
let failedQueue: {
  resolve: (value?: unknown) => void
  reject: (reason?: any) => void
}[] = []

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((p) => {
    if (error) p.reject(error)
    else p.resolve(token)
  })
  failedQueue = []
}

// Interceptor to add Authorization header with access token from cookies
apiClient.interceptors.request.use(
  (config) => {
    const accessToken = getCookie('accessToken')

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// apiClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       console.error('Unauthorized! Please log in again.')
//     }
//     return Promise.reject(error)
//   }
// )

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean
    }

    // If error is not 401, reject immediately
    if (error.response?.status !== 401) {
      return Promise.reject(error)
    }

    // Prevent infinite loops
    if (originalRequest._retry) {
      return Promise.reject(error)
    }

    const refreshToken = getCookie('refreshToken')
    if (!refreshToken) {
      // Without refresh token, logout user
      deleteCookie('accessToken')
      deleteCookie('refreshToken')
      return Promise.reject(error)
    }

    if (isRefreshing) {
      // If a refresh request is already in progress, queue the request
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject })
      })
        .then((newToken) => {
          originalRequest.headers.Authorization = `Bearer ${newToken}`
          return apiClient(originalRequest)
        })
        .catch((error) => {
          return Promise.reject(error)
        })
    }

    // Mark the request as a retry and start refreshing
    originalRequest._retry = true
    isRefreshing = true

    try {
      const refreshResponse = await refreshTokenClient.post('/auth/refresh', {
        refreshToken: refreshToken
      })

      const data = (
        refreshResponse.data as {
          code: number
          message: string
          data: {
            accessToken: string
            refreshToken: string
          }
        }
      ).data

      console.log('Refresh token response data:', data)

      const newAccessToken = data?.accessToken
      const newRefreshToken = data?.refreshToken

      if (!newAccessToken || !newRefreshToken) {
        throw new Error('Error: Failed to refresh token from server')
      }

      // Update cookies with new tokens
      setCookie('accessToken', newAccessToken)
      setCookie('refreshToken', newRefreshToken)

      // Send again the request
      processQueue(null, newAccessToken)

      // Retry the original request with new token
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
      return apiClient(originalRequest)
    } catch (refreshError) {
      // On refresh failure, logout user
      processQueue(refreshError, null)
      deleteCookie('accessToken')
      deleteCookie('refreshToken')

      return Promise.reject(refreshError)
    } finally {
      isRefreshing = false
    }
  }
)

export default apiClient
