import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { ChevronDown } from 'lucide-react'

const Header = () => {
  return (
    <>
      <header className='flex items-center justify-between bg-white dark:bg-gray-800 shadow-md border-b dark:border-gray-700'>
        {/* Logo */}
        <div className='flex items-center gap-2 px-8 py-3 select-none'>
          <img
            src='/logo.svg'
            alt='SmartNotes Logo'
            className='w-8 h-8 rounded shadow-sm bg-gradient-to-tr from-blue-500 to-purple-500 p-1'
          />
          <span className='text-2xl font-bold text-gray-800 dark:text-white tracking-tight drop-shadow-sm'>
            Smart<span className='text-blue-600 dark:text-blue-400'>Notes</span>
          </span>
        </div>
        {/* End - Logo */}

        {/* User Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger className='flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors'>
            <Avatar className='cursor-pointer flex items-center gap-2'>
              <AvatarImage src='/avatar.svg' alt='John Smith' />
              <AvatarFallback>JS</AvatarFallback>
            </Avatar>
            <span className='text-sm font-medium'>John Smith</span>
            <ChevronDown className='w-4 h-4' />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align='end'
            className='w-44 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-2 space-y-0'
          >
            <DropdownMenuItem className='hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors border-b border-gray-200 dark:border-gray-700'>
              <a href='/profile' className='flex items-center gap-2 w-full px-2 py-2'>
                <img src='/profile-icon.svg' alt='Profile Icon' className='w-4 h-4' />
                <span className='text-sm'>Profile</span>
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem className='hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors'>
              <a href='/logout' className='flex items-center gap-2 text-red-600 w-full px-2 py-2'>
                <img
                  src='/logout-icon.svg'
                  alt='Logout Icon'
                  className='w-4 h-4'
                  style={{
                    filter: 'invert(32%) sepia(98%) saturate(7492%) hue-rotate(357deg) brightness(97%) contrast(107%)'
                  }}
                />
                <span className='text-sm'>Logout</span>
              </a>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {/* End - User Profile */}
      </header>
    </>
  )
}

export default Header
