const Logo = () => {
  return (
    <>
      <div className='flex items-center gap-2 px-4 md:px-6 lg:px-8 py-3 select-none'>
        <img
          src='/logo.svg'
          alt='SmartNotes Logo'
          className='w-8 h-8 rounded shadow-sm bg-gradient-to-tr from-blue-500 to-purple-500 p-1'
        />
        <span className='text-2xl font-bold text-gray-800 dark:text-white tracking-tight drop-shadow-sm'>
          Smart<span className='text-blue-600 dark:text-blue-400'>Notes</span>
        </span>
      </div>
    </>
  )
}

export default Logo
