'use client'

import { FileText, GraduationCap, Home, LineChart, LogOut, Menu, PieChart, User, X, Zap } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import clsx from 'clsx'
import Link from 'next/link'

const navLinks = [
  {
    title: 'Home',
    href: '/',
    icon: Home
  },
  {
    title: 'Notes',
    href: '/notes',
    icon: FileText
  },
  {
    title: 'Flashcards',
    href: '/flashcards',
    icon: Zap
  },
  {
    title: 'Quiz',
    href: '/quiz',
    icon: GraduationCap
  },
  {
    title: 'Progress',
    href: '/progress',
    icon: LineChart
  },
  {
    title: 'Summary',
    href: '/summary',
    icon: PieChart
  }
]

const actionLinks = [
  {
    title: 'Logout',
    href: '/logout',
    icon: LogOut,
    className: 'hover:bg-red-100 dark:hover:bg-red-700 text-red-600 dark:text-red-400',
    iconClassName: 'text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200'
  }
]

const legalLinks = [
  {
    title: 'Terms of Service',
    href: '/terms'
  },
  {
    title: 'Privacy Policy',
    href: '/privacy'
  }
]

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpenMenu = () => {
    setIsOpen(true)
  }

  return (
    <>
      {/* Hamburger Menu Button */}
      <Button variant={'ghost'} size={'sm'} className='lg:hidden p-2' aria-label='Open menu' onClick={handleOpenMenu}>
        <Menu className='w-6 h-6' />
      </Button>
      {/* End - Hamburger Menu Button */}

      {/* Backdrop Overlay */}
      {isOpen && <div className='fixed inset-0 bg-black/50 z-10 lg:hidden' onClick={() => setIsOpen(false)}></div>}
      {/* End - Backdrop Overlay */}

      {/* Slide-in Mobile Menu */}
      <div
        className={clsx(
          'fixed top-0 right-0 h-full w-80 bg-white dark:bg-gray-800 shadow-xl z-20 transform duration-300 ease-in-out lg:hidden',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className='flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700'>
          <Button
            variant={'ghost'}
            size={'sm'}
            onClick={() => setIsOpen(false)}
            aria-label='Close menu'
            className='absolute top-4 right-4 z-30 bg-white dark:bg-gray-800 hover:bg-red-600 dark:hover:bg-red-600 rounded-full p-2 shadow-md transition-colors duration-300 flex items-center justify-center text-red-600 hover:text-white dark:text-red-400 dark:hover:text-white'
          >
            <X className='w-5 h-5' />
          </Button>
        </div>

        {/* Menu Contents */}
        <div className='flex flex-col h-full'>
          {/* User Profile Section */}
          <div className='flex flex-col items-center p-4 border-b border-gray-200 dark:border-gray-700'>
            <div className='p-4 border-b dark:border-gray-700'>
              <div className='flex items-center gap-3 mb-3'>
                <Avatar className='w-12 h-12'>
                  <AvatarImage src='/avatar.svg' alt='John Smith' />
                  <AvatarFallback>JS</AvatarFallback>
                </Avatar>
                <div className=''>
                  <h3 className='font-medium text-gray-800 dark:text-white'>John Smith</h3>
                  <p className='text-sm text-gray-600 dark:text-gray-400'>johnsmith@gmail.com</p>
                </div>
              </div>
            </div>

            <Link
              href={'/profile'}
              className='flex items-center gap-3 p-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 border-b border-gray-200 dark:border-gray-700 rounded-md w-full text-gray-800 dark:text-white'
              onClick={() => setIsOpen(false)}
            >
              <User className='w-5 h-5 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200' />
              <span className=''>View Profile</span>
            </Link>
          </div>
          {/* End - User Profile Section */}

          {/* Navigation Section */}
          <nav className='flex flex-col p-4 space-y-2'>
            {navLinks.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className='flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200'
                onClick={() => setIsOpen(false)}
              >
                <link.icon className='w-5 h-5 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200' />
                <span className='text-sm font-medium'>{link.title}</span>
              </Link>
            ))}
          </nav>
          {/* End - Navigation Section */}

          {/* Logout */}
          <div className='flex items-center justify-center p-4 border-t border-gray-200 dark:border-gray-700'>
            <div className='w-full'>
              {actionLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className={clsx(
                    'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200',
                    link.className
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  <link.icon className={clsx('w-5 h-5 transition-colors duration-200', link.iconClassName)} />
                  <span className='text-sm font-medium'>{link.title}</span>
                </Link>
              ))}
            </div>
          </div>
          {/* End - Logout */}

          {/* Footer Section */}
          <div className='p-4 border-t dark:border-gray-700'>
            <div className='flex flex-col items-center space-y-2'>
              <p className='text-sm text-gray-600 dark:text-gray-400'>© 2025 SmartNotes. All rights reserved.</p>
              <div className='flex gap-2 flex-wrap justify-center items-center'>
                {legalLinks.map((link) => (
                  <Link
                    key={link.title}
                    href={link.href}
                    className='text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-600 transition-colors'
                    onClick={() => setIsOpen(false)}
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          {/* End - Footer Section */}
        </div>
        {/* End - Menu Contents */}
      </div>
      {/* End - Slide-in Mobile Menu */}
    </>
  )
}

export default MobileMenu
