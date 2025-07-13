import FeaturesSection from '@/components/landing/features-section'
import HeroSection from '@/components/landing/hero-section'
import WhyChooseSection from '@/components/landing/why-choose-section'

const LandingPage = () => {
  return (
    <div className='bg-gray-50 min-h-screen flex flex-col'>
      {/* Hero Section */}
      <HeroSection />
      {/* End - Hero Section */}

      {/* Features Section */}
      <FeaturesSection />
      {/* End - Features Section */}

      {/* Why Choose Section */}
      <WhyChooseSection />
      {/* End - Why Choose Section */}
    </div>
  )
}

export default LandingPage
