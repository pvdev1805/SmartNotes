import RegisterForm from '@/components/auth/register-form'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Register | SmartNotes',
  description: 'Create your SmartNotes account'
}

const RegisterPage = () => {
  return (
    <>
      <div className='min-h-screen flex items-center justify-center bg-transparent p-4'>
        <div className='w-full max-w-md'>
          {/* Register Form */}
          <RegisterForm />
          {/* End - Register Form */}
        </div>
      </div>
    </>
  )
}

export default RegisterPage
