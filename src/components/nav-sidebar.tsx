'use client'

import clsx from 'clsx'
import {
  BookOpenText,
  ChevronLeft,
  ChevronRight,
  FileText,
  GraduationCap,
  Home,
  LineChart,
  PieChart,
  Zap
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const navItems = [
  {
    title: 'Home',
    href: '/home',
    icon: Home
  },
  {
    title: 'Notes',
    href: '/notes',
    icon: FileText
  },
  {
    title: 'PDFs',
    href: '/pdfs',
    icon: BookOpenText
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
  const [expanded, setExpanded] = useState(true)

  return (
    <aside
      className={clsx(
        'h-full bg-sidebar border-r border-sidebar-border flex-col transition-all duration-300',
        expanded ? 'w-60' : 'w-16'
      )}
    >
      <nav className='flex flex-col p-4 space-y-1'>
        {/* Expand/Minimize Button */}
        <button
          className='w-10 h-10 bg-white border rounded-full shadow p-2 transition hover:bg-blue-50 flex items-center justify-center mb-4 self-end'
          onClick={() => setExpanded((prev) => !prev)}
          aria-label={expanded ? 'Minimize sidebar' : 'Expand sidebar'}
        >
          {expanded ? (
            <ChevronLeft className='w-5 h-5 text-blue-600' />
          ) : (
            <ChevronRight className='w-5 h-5 text-blue-600' />
          )}
        </button>

        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                'flex items-center rounded-lg transition-all duration-200 ease-in-out group border',
                expanded ? 'gap-3 px-2 py-2 w-full justify-start' : 'justify-center py-2 w-10 mx-auto',
                isActive
                  ? 'bg-blue-50 text-blue-600 border-blue-200 font-medium shadow-sm'
                  : 'text-sidebar-foreground border-transparent hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200'
              )}
            >
              <item.icon
                className={clsx(
                  'w-5 h-5 transition-transform duration-200 group-hover:scale-110',
                  isActive ? 'text-blue-600' : 'text-sidebar-foreground group-hover:text-blue-600'
                )}
              />
              {expanded && <span className='text-sm font-medium'>{item.title}</span>}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}

export default NavSidebar
