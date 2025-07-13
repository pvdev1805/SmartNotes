import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { CheckCircle, ArrowRightIcon } from 'lucide-react'

const benefits = [
  'Centralized knowledge management',
  'Cross-device synchronization',
  'Progress tracking & analytics',
  'AI-powered study tools',
  'Advanced search capabilities',
  'Collaborative features'
]

const WhyChooseSection = () => (
  <section className='w-full bg-blue-50 py-12 px-4 border-b rounded-lg' data-aos='fade-up' data-aos-delay='400'>
    <div className='flex flex-col items-center space-y-4'>
      <div className='max-w-3xl mx-auto text-center'>
        <h2 className='mb-2 text-2xl md:text-3xl lg:text-4xl text-gray-900 font-bold'>Why Choose SmartNotes?</h2>
        <p className='lg:text-lg text-gray-600 mb-4'>
          SmartNotes keeps everything in sync, searchable, and ready for review anytime. Our AI-powered tools help you
          learn more efficiently and retain information longer.
        </p>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {benefits.map((benefit, index) => (
          <div key={index} className='flex items-center' data-aos='fade-up' data-aos-delay={index * 100 + 500}>
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
)

export default WhyChooseSection
