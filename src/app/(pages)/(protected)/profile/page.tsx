import { Card, CardContent } from '@/components/ui/card'

const UserProfilePage = () => {
  const user = {
    name: 'Jack Smith',
    email: 'jack.smith@example.com'
  }

  return (
    <>
      <div className='min-h-screen flex flex-col items-center bg-gray-50 px-2 py-4 rounded-lg'>
        <Card className='w-full shadow-lg rounded-xl p-6 bg-white'>
          <CardContent>
            <h2 className='text-2xl font-bold text-gray-900 mb-1'>Profile Settings</h2>
            <p className='text-sm text-gray-600 mb-6'>Manage your account information and preferences</p>
            <div className='mb-4'>
              <div className='font-semibold'>Name:</div>
              <div>{user.name}</div>
            </div>
            <div className='mb-4'>
              <div className='font-semibold'>Email:</div>
              <div>{user.email}</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default UserProfilePage
