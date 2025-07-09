'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Eye, EyeOff } from 'lucide-react'
import { ChangeEvent, FormEvent, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const RegisterForm = () => {
  const router = useRouter()

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
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

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call for login
      await new Promise((resolve) => setTimeout(resolve, 2000))

      router.push('/login') // Redirect to login page after successful registration
    } catch (error) {
      console.error('Registration failed:', error)
    } finally {
      setIsLoading(false)
      setFormData({ fullName: '', email: '', password: '', confirmPassword: '' }) // Reset form after submission
    }
  }

  return (
    <>
      <Card className='shadow-xl border-0 bg-white dark:bg-gray-800 max-w-md mx-auto rounded-2xl'>
        <CardContent className='p-8'>
          <div className='flex flex-col items-center mb-4'>
            {/* Logo */}
            <div className='flex items-center gap-2 px-4 md:px-6 lg:px-8 py-3 select-none'>
              <img
                src='/logo.svg'
                alt='SmartNotes Logo'
                className='w-8 h-8 rounded shadow-sm bg-gradient-to-tr from-blue-500 to-purple-500 p-1'
              />
              <span className='text-2xl font-bold text-gray-800 dark:text-white tracking-tight drop-shadow-sm'>
                Smart<span className='text-blue-600 dark:text-blue-400'>Notes</span>
              </span>
            </div>
            {/* End - Logo */}

            <h1 className='text-2xl font-bold text-gray-900 mb-2'>Create an Account</h1>
            <p className='text-sm text-gray-600'>Sign up to start using SmartNotes</p>
          </div>

          {/* Register Form */}
          <form onSubmit={handleSubmit} className='space-y-4'>
            {/* Full Name Field */}
            <div className='space-y-2 flex flex-col'>
              <label htmlFor='fullName' className='ml-1 mb-1 text-sm font-medium text-gray-700 dark:text-gray-300'>
                Full Name
              </label>
              <input
                type='text'
                name='fullName'
                id='fullName'
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder='Enter your full name'
                className='w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 placeholder:text-sm placeholder:text-gray-400'
                required
              />
            </div>
            {/* End - Full Name Field */}

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

            {/* Password Field */}
            <div className='space-y-2 flex flex-col'>
              <label
                htmlFor='confirmPassword'
                className='ml-1 mb-1 text-sm font-medium text-gray-700 dark:text-gray-300'
              >
                Confirm Password
              </label>
              <div className='relative'>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name='confirmPassword'
                  id='confirmPassword'
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder='Confirm your password'
                  className='w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 placeholder:text-sm placeholder:text-gray-400'
                  required
                />

                <button
                  type='button'
                  className='absolute inset-y-0 right-0 pr-4 flex items-center'
                  onClick={handleShowConfirmPassword}
                >
                  {showConfirmPassword ? (
                    <EyeOff className='w-5 h-5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors' />
                  ) : (
                    <Eye className='w-5 h-5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors' />
                  )}
                </button>
              </div>
            </div>
            {/* End - Password Field */}

            {/* Sign Up Button */}
            <Button
              type='submit'
              disabled={isLoading}
              className='w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200'
            >
              {isLoading ? 'Signing Up...' : 'Sign Up'}
            </Button>
            {/* End - Sign Up Button */}

            {/* Sign In Link */}
            <div className='text-center'>
              <p className='text-sm text-gray-600 dark:text-gray-400'>
                Already have an account?
                <Link
                  href='/login'
                  className='ml-2 text-blue-600 hover:text-blue-700 hover:underline dark:text-blue-400 font-medium'
                >
                  Sign In
                </Link>
              </p>
            </div>
            {/* End - Sign In Link */}
          </form>
          {/* End - Register Form */}
        </CardContent>
      </Card>
    </>
  )
}

export default RegisterForm
