'use client'

import { login as loginApi, register as registerApi, logout as logoutApi } from '@/services/auth.service'
import { getMe } from '@/services/user.service'
import { LoginRequest, RegisterRequest, UserResponse } from '@/types/auth.type'
import { deleteCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

interface AuthContextType {
  user: UserResponse | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (data: LoginRequest) => Promise<void>
  register: (data: RegisterRequest) => Promise<void>
  logout: () => void
}

const authContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const checkAuth = async () => {
    try {
      const response = await getMe()
      setUser(response.data)
    } catch (error) {
      deleteCookie('accessToken')
      deleteCookie('refreshToken')
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    // Only run on client side
    if (typeof window !== 'undefined') {
      checkAuth()
    }
  }, [])

  const login = async (data: LoginRequest) => {
    const response = await loginApi(data)

    if (response.data.isAuthenticated) {
      // Refresh user data after login successfully
      await checkAuth()
      router.push('/home')
    }
  }

  const register = async (data: RegisterRequest) => {
    const response = await registerApi(data)

    if (response.code === 1000) {
      router.push('/login')
    }
  }

  const logout = async () => {
    await logoutApi()

    deleteCookie('accessToken')
    deleteCookie('refreshToken')
    setUser(null)

    toast.info('Logged out successfully.')

    router.push('/login')
  }

  const authContextValue = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout
  }

  if (isLoading) {
    return (
      <>
        <div className='min-h-screen flex items-center justify-center'>
          <div className='text-gray-500'>Loading...</div>
        </div>
      </>
    )
  }

  return <authContext.Provider value={authContextValue}>{children}</authContext.Provider>
}

export const useAuth = () => {
  const context = useContext(authContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  console.log('useAuth - context:', context)
  return context
}
