import { Button } from '@/components/ui/button'
import Link from 'next/link'

const HeroSection = () => {
  return (
    <>
      <section className='w-full'>
        <div className='max-w-7xl flex flex-col items-center mx-auto bg-blue-50 py-12 px-4 border-b rounded-lg'>
          <div className='max-w-3xl mx-auto text-center'>
            <h1 className='mb-2 text-2xl md:text-3xl lg:text-4xl font-bold'>
              Smart, organized, and{' '}
              <span className='bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600  hover:to-purple-600 bg-clip-text text-transparent'>
                personalized{' '}
              </span>
              <span className='whitespace-nowrap'>note-taking</span>
            </h1>
            <p className='lg:text-lg text-gray-600 mb-4'>
              SmartNotes helps you create and manage notes, flashcards, and quizzes — all in one place. Transform your
              learning with AI-powered tools that adapt to your study style.
            </p>
          </div>
          <div className='flex justify-center gap-4'>
            <Button asChild size='lg'>
              <Link
                href='/register'
                className='bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600  hover:to-purple-600'
              >
                Get Started
              </Link>
            </Button>
            <Button asChild size='lg' variant='outline'>
              <Link href='/login' className='text-sm font-medium hover:bg-gray-800 hover:text-white transition-colors'>
                Login to Account
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}

export default HeroSection
