import AnimatedSection from '@/components/landing/animated-section'
import FeaturesSection from '@/components/landing/features-section'
import HeroSection from '@/components/landing/hero-section'
import WhyChooseSection from '@/components/landing/why-choose-section'

const sections = [
  { Component: HeroSection, delay: 0.1 },
  { Component: FeaturesSection, delay: 0.2 },
  { Component: WhyChooseSection, delay: 0.3 }
]

const LandingPage = () => {
  return (
    <div className='bg-gray-50 min-h-screen flex flex-col overflow-hidden'>
      {sections.map(({ Component, delay }, index) => (
        <AnimatedSection key={index} delay={delay}>
          <Component />
        </AnimatedSection>
      ))}
    </div>
  )
}

export default LandingPage
