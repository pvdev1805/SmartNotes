import type { Metadata } from 'next'
import Header from '@/components/header'
import NavSidebar from '@/components/nav-sidebar'
import Footer from '@/components/footer'

export const metadata: Metadata = {
  title: 'SmartNotes',
  description: 'A smart note-taking application for better learning'
}

const ProtectedLayout = ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <div className='min-h-screen w-full flex flex-col'>
      <Header />

      <div className='flex flex-1 overflow-hidden'>
        <div className='flex-shrink-0'>
          <NavSidebar />
        </div>
        <div className='flex flex-1 flex-col'>
          <main className='flex-1 p-4 overflow-auto'>{children}</main>
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default ProtectedLayout
