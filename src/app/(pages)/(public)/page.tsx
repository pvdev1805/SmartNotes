import AnimatedSection from '@/components/landing/animated-section'
import FeaturesSection from '@/components/landing/features-section'
import HeroSection from '@/components/landing/hero-section'
import WhyChooseSection from '@/components/landing/why-choose-section'

const LandingPage = () => {
  return (
    <div className='bg-gray-50 min-h-screen flex flex-col overflow-hidden'>
      {/* Hero Section */}
      <AnimatedSection delay={0.2}>
        <HeroSection />
      </AnimatedSection>

      {/* End - Hero Section */}

      {/* Features Section */}
      <AnimatedSection delay={0.2}>
        <FeaturesSection />
      </AnimatedSection>
      {/* End - Features Section */}

      {/* Why Choose Section */}
      <AnimatedSection delay={0.2}>
        <WhyChooseSection />
      </AnimatedSection>
      {/* End - Why Choose Section */}
    </div>
  )
}

export default LandingPage
