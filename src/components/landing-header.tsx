import Logo from '@/components/logo'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const LandingHeader = () => {
  return (
    <>
      <header className='flex items-center justify-between bg-white dark:bg-gray-800 shadow-md border-b dark:border-gray-700'>
        <Logo />

        <div className='flex items-center gap-2'>
          <Button asChild variant={'outline'}>
            <Link href='/login' className='text-sm font-medium hover:bg-gray-800 hover:text-white transition-colors'>
              Sign In
            </Link>
          </Button>

          <Button asChild>
            <Link
              href='/register'
              className='text-sm font-medium bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600  hover:to-purple-600 transition-colors'
            >
              Sign Up
            </Link>
          </Button>
        </div>
      </header>
    </>
  )
}

export default LandingHeader
