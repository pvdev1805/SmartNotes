import LoginForm from '@/components/auth/login-form'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login | SmartNotes',
  description: 'Sign in to your SmartNotes account'
}

const LoginPage = () => {
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
