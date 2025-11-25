'use client'

import { useEffect } from 'react'
import LoginForm from '@/components/auth/login-form'
import { useAuth } from '@/hooks/use-auth'

const LoginPage = () => {
  const { isAuthenticated, isLoading } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      window.location.replace('/home')
    }
  }, [isAuthenticated])

  if (isLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-transparent p-4'>
        <div className='text-gray-500'>Loading...</div>
      </div>
    )
  }

  if (isAuthenticated) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-transparent p-4'>
        <div className='animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-500'></div>
        <span className='ml-2 text-gray-500'>Redirecting...</span>
      </div>
    )
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-transparent p-4'>
      <div className='w-full max-w-md'>
        <LoginForm />
      </div>
    </div>
  )
}

export default LoginPage
