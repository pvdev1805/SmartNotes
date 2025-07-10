import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { FileText, Book, GraduationCap, Zap, LineChart, Tag, CheckCircle, ArrowRightIcon } from 'lucide-react'
import Link from 'next/link'

const features = [
  {
    title: 'Create Notes',
    description:
      'Write and format rich text notes with our intuitive editor. Add images, links, and organize your thoughts beautifully.',
    icon: FileText,
    style: 'w-7 h-7 text-blue-600'
  },
  {
    title: 'Create Flashcards',
    description: 'Easily generate flashcards from your notes. Perfect for memorization and quick review sessions.',
    icon: Zap,
    style: 'w-7 h-7 text-green-600'
  },
  {
    title: 'Organize by Categories',
    description:
      'Group your notes and flashcards into categories for better organization. Keep everything structured and accessible.',
    icon: Book,
    style: 'w-7 h-7 text-pink-500'
  },
  {
    title: 'Add Tags',
    description: 'Tag your notes and flashcards for lightning-fast filtering and search. Find what you need instantly.',
    icon: Tag,
    style: 'w-7 h-7 text-orange-400'
  },
  {
    title: 'Generate Quiz',
    description: 'Use AI to automatically generate quiz questions from your notes. Test your knowledge effortlessly.',
    icon: GraduationCap,
    style: 'w-7 h-7 text-purple-600'
  },
  {
    title: 'Track Progress',
    description:
      'View your quiz history and score trends over time. Monitor your learning journey with detailed analytics.',
    icon: LineChart,
    style: 'w-7 h-7 text-cyan-600'
  }
]

const benefits = [
  'Centralized knowledge management',
  'Cross-device synchronization',
  'Progress tracking & analytics',
  'AI-powered study tools',
  'Advanced search capabilities',
  'Collaborative features'
]

const LandingPage = () => {
  return (
    <div className='bg-gray-50 min-h-screen flex flex-col'>
      {/* Hero Section */}
      <section className='w-full bg-blue-50 py-12 px-4 border-b rounded-lg'>
        <div className='flex flex-col items-center'>
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
      {/* End - Hero Section */}

      {/* Features Section */}
      <section className='w-full py-12 px-4 rounded-lg'>
        <div className='flex flex-col items-center'>
          <div className='max-w-3xl mx-auto text-center'>
            <h2 className='mb-2 text-2xl md:text-3xl lg:text-4xl text-gray-900 font-bold'>
              Everything you need to learn smarter
            </h2>
            <p className='lg:text-lg text-gray-600 mb-4'>
              Powerful features designed to enhance your learning experience and boost retention
            </p>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {features.map((item) => (
              <Card
                key={item.title}
                className='border shadow-sm hover:shadow-lg transition-shadow duration-300 rounded-lg'
              >
                <CardContent>
                  <div className='flex gap-2 items-center justify-start space-y-2'>
                    <div className='bg-blue-50 p-2 rounded-lg flex items-center justify-center'>
                      <item.icon className={`${item.style}`} />
                    </div>
                    <h3 className='font-semibold text-foreground'>{item.title}</h3>
                  </div>
                  <p className='text-sm text-muted-foreground lg:min-h-10'>{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* End - Features Section */}

      {/* Why Choose Section */}
      <section className='w-full bg-blue-50 py-12 px-4 border-b rounded-lg'>
        <div className='flex flex-col items-center space-y-4'>
          <div className='max-w-3xl mx-auto text-center'>
            <h2 className='mb-2 text-2xl md:text-3xl lg:text-4xl text-gray-900 font-bold'>Why Choose SmartNotes?</h2>
            <p className='lg:text-lg text-gray-600 mb-4'>
              SmartNotes keeps everything in sync, searchable, and ready for review anytime. Our AI-powered tools help
              you learn more efficiently and retain information longer.
            </p>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {benefits.map((benefit, index) => (
              <div key={index} className='flex items-center'>
                <CheckCircle className='w-5 h-5 text-green-600 mr-2' />
                <span className='text-sm text-gray-700'>{benefit}</span>
              </div>
            ))}
          </div>
          <Button asChild size='lg'>
            <Link
              href='/register'
              className='flex items-center bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600  hover:to-purple-600 text-white font-medium px-6 py-2 rounded-lg'
            >
              Start Your Journey
              <ArrowRightIcon className='w-4 h-4' />
            </Link>
          </Button>
        </div>
      </section>
      {/* End - Why Choose Section */}
    </div>
  )
}

export default LandingPage
