import axios from 'axios'
import { getCookie } from 'cookies-next'

const BASE_URL = 'http://localhost:8080/api'

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true // Include cookies for cross-origin requests
})

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

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error('Unauthorized! Please log in again.')
    }
    return Promise.reject(error)
  }
)

export default apiClient
