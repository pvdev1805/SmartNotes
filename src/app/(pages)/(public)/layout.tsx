import Footer from '@/components/footer'
import LandingHeader from '@/components/landing-header'

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='min-h-screen w-full flex flex-col'>
      <LandingHeader />

      <div className='flex flex-1 flex-col overflow-hidden'>
        <main className='flex-1 p-4 overflow-auto'>{children}</main>
        <Footer />
      </div>
    </div>
  )
}

export default PublicLayout
