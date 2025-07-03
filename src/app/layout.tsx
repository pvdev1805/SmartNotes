import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Header from '@/components/header'
import NavSidebar from '@/components/nav-sidebar'
import Footer from '@/components/footer'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'SmartNotes',
  description: 'A smart note-taking application for better learning'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
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
      </body>
    </html>
  )
}
