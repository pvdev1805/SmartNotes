'use client'

import clsx from 'clsx'
import { FileText, GraduationCap, Home, LineChart, PieChart, Zap } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
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

const NavSidebar = () => {
  const pathname = usePathname()

  return (
    <aside className='w-64 h-full bg-sidebar border-r border-sidebar-border flex flex-col'>
      <nav className='flex flex-col p-4 space-y-1'>
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ease-in-out group border',
                isActive
                  ? 'bg-blue-50 text-blue-600 border-blue-200 font-medium shadow-sm'
                  : 'text-sidebar-foreground border-transparent hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200'
              )}
            >
              <item.icon
                className={clsx(
                  'w-4 h-4 transition-transform duration-200 group-hover:scale-110',
                  isActive ? 'text-blue-600' : 'text-sidebar-foreground group-hover:text-blue-600'
                )}
              />
              <span className='text-sm font-medium'>{item.title}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}

export default NavSidebar
