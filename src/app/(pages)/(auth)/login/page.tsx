'use client'

import LoginForm from '@/components/auth/login-form'
import { useAuth } from '@/hooks/use-auth'

const LoginPage = () => {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <>
        <div className='min-h-screen flex items-center justify-center bg-transparent p-4'>
          <div className='text-gray-500'>Loading...</div>
        </div>
      </>
    )
  }

  if (isAuthenticated) {
    return null
  }

  return (
    <>
      <div className='min-h-screen flex items-center justify-center bg-transparent p-4'>
        <div className='w-full max-w-md'>
          {/* Login Form */}
          <LoginForm />
          {/* End - Login Form */}
        </div>
      </div>
    </>
  )
}

export default LoginPage
