'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Logo from '@/components/logo'
import { Eye, EyeOff } from 'lucide-react'
import { ChangeEvent, FormEvent, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const LoginForm = () => {
  const router = useRouter()

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call for login
      // await new Promise((resolve) => setTimeout(resolve, 2000))
      const res = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      })
      const jsonResponse = await res.json()

      // store JWT securely
      localStorage.setItem('jwtToken', jsonResponse.data.accessToken) // or use cookies

      router.push('/')
    } catch (error) {
      console.error('Login failed:', error)
    } finally {
      setIsLoading(false)
      setFormData({ email: '', password: '' }) // Reset form after submission
    }
  }

  return (
    <>
      <Card className='shadow-xl border-0 bg-white dark:bg-gray-800 max-w-md mx-auto rounded-2xl'>
        <CardContent className='p-8'>
          <div className='flex flex-col items-center mb-4'>
            {/* Logo */}
            <Logo />
            {/* End - Logo */}

            <h1 className='text-2xl font-bold text-gray-900 mb-2'>Welcome back!</h1>
            <p className='text-sm text-gray-600'>Sign in to your account to continue</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className='space-y-4'>
            {/* Email Field */}
            <div className='space-y-2 flex flex-col'>
              <label htmlFor='email' className='ml-1 mb-1 text-sm font-medium text-gray-700 dark:text-gray-300'>
                Email
              </label>
              <input
                type='email'
                name='email'
                id='email'
                value={formData.email}
                onChange={handleInputChange}
                placeholder='Enter your email'
                className='w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 placeholder:text-sm placeholder:text-gray-400'
                required
              />
            </div>
            {/* End - Email Field */}

            {/* Password Field */}
            <div className='space-y-2 flex flex-col'>
              <label htmlFor='password' className='ml-1 mb-1 text-sm font-medium text-gray-700 dark:text-gray-300'>
                Password
              </label>
              <div className='relative'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name='password'
                  id='password'
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder='Enter your password'
                  className='w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 placeholder:text-sm placeholder:text-gray-400'
                  required
                />

                <button
                  type='button'
                  className='absolute inset-y-0 right-0 pr-4 flex items-center'
                  onClick={handleShowPassword}
                >
                  {showPassword ? (
                    <EyeOff className='w-5 h-5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors' />
                  ) : (
                    <Eye className='w-5 h-5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors' />
                  )}
                </button>
              </div>
            </div>
            {/* End - Password Field */}

            {/* Sign In Button */}
            <Button
              type='submit'
              disabled={isLoading}
              className='w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200'
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>
            {/* End - Sign In Button */}

            {/* Sign Up Link */}
            <div className='text-center'>
              <p className='text-sm text-gray-600 dark:text-gray-400'>
                Don't have an account?
                <Link
                  href='/register'
                  className='ml-2 text-blue-600 hover:text-blue-700 hover:underline dark:text-blue-400 font-medium'
                >
                  Sign Up
                </Link>
              </p>
            </div>
            {/* End - Sign Up Link */}
          </form>
          {/* End - Login Form */}
        </CardContent>
      </Card>
    </>
  )
}

export default LoginForm
