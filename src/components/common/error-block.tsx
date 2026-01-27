import AnimatedSection from '@/components/landing/animated-section'

interface ErrorBlockProps {
  errorMessage?: string
}

const ErrorBlock = ({ errorMessage } : ErrorBlockProps) => {
  return (
    <>
      {errorMessage != '' && (
        <AnimatedSection delay={0.2}>
          <div className='bg-red-50 border border-red-200 rounded-lg p-6 mb-6'>
            <div className='flex items-start gap-3'>
              <div className='flex-1'>
                <h3 className='text-red-900 font-semibold mb-1'>Error When Loading Data!</h3>
                <p className='text-red-700 mb-4'>{errorMessage}</p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      )}
    </>
  )
}

export default ErrorBlock