const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className='min-h-screen p-4 bg-gradient-to-b from-[#faf5ff] to-[#cae1ff]'>
        <div className='flex items-center justify-center'>{children}</div>
      </div>
    </>
  )
}

export default AuthLayout
