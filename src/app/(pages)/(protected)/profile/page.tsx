'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Camera, Mail, Save, User } from 'lucide-react'
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react'

const mockFetchUser = async () => {
  // Simulate fetching user data from an API
  const user = await new Promise<{ id: string; name: string; email: string; avatar: string | null }>((resolve) => {
    setTimeout(() => {
      resolve({
        id: '1',
        name: 'Jack Smith',
        email: 'jack.smith@example.com',
        avatar: null
      })
    }, 1000)
  })
  return user
}

const mockUpdateUser = async (userData: { name: string; email: string; avatar: string | null }) => {
  // Simulate updating user data in an API
  return {
    success: true
  }
}

const UserProfilePage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [avatar, setAvatar] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [original, setOriginal] = useState<{ name: string; email: string; avatar: string | null } | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Fetch user data on mount
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true)
      const user = await mockFetchUser()
      setName(user.name)
      setEmail(user.email)
      setAvatar(user.avatar)
      setOriginal(user)
      setLoading(false)
    }
    fetchUser()
  }, [])

  const handleChangeAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatar(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleFileInputClick = () => {
    fileInputRef.current?.click()
  }

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handleCancel = () => {
    if (original) {
      setName(original.name)
      setEmail(original.email)
      setAvatar(original.avatar)
    }
  }

  const handleSave = async (e: FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const response = await mockUpdateUser({ name, email, avatar })
      if (response.success) {
        alert('Profile updated successfully!')
        setOriginal({ name, email, avatar }) // Update original state
      } else {
        alert('Failed to update profile.')
      }
    } catch (error) {
      console.error('Error updating profile:', error)
      alert('An error occurred while updating your profile.')
    } finally {
      setSaving(false)
    }
  }

  const hasChanges = original && (original.name !== name || original.email !== email || original.avatar !== avatar)

  if (loading) {
    return (
      <>
        <div className='flex justify-center items-center'>
          <p>Loading...</p>
        </div>
      </>
    )
  }

  return (
    <>
      <div className='flex flex-col items-center bg-gray-50 px-2 py-4</div> rounded-lg'>
        <Card className='w-full shadow-lg rounded-xl p-6 bg-white'>
          <CardContent>
            <h2 className='text-2xl font-bold text-gray-900 mb-1'>Profile Settings</h2>
            <p className='text-sm text-gray-600 md:text-base lg:text-lg max-w-2xl leading-relaxed mb-6'>
              Manage your account information and preferences
            </p>

            <form onSubmit={handleSave}>
              <div className='mb-8 border-2 border-gray-300 p-4 rounded-lg shadow-sm'>
                <h3 className='text-lg font-semibold text-gray-800 mb-1'>Personal Information</h3>
                <p className='text-xs text-gray-600 mb-6'>Update your personal information and profile picture</p>
                <div className='flex items-center gap-6 mb-6'>
                  <div className='w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden'>
                    {avatar ? (
                      <img src={avatar} alt='Avatar' className='w-full h-full object-cover' />
                    ) : (
                      <User className='w-10 h-10 text-gray-400' />
                    )}
                  </div>

                  <div className=''>
                    <div className=''>
                      <input
                        ref={fileInputRef}
                        type='file'
                        accept='image/png, image/jpeg, image/jpg'
                        className='hidden'
                        onChange={handleChangeAvatar}
                      />

                      <Button
                        type='button'
                        variant={'outline'}
                        className='flex items-center gap-2 cursor-pointer'
                        asChild
                        onClick={handleFileInputClick}
                      >
                        <span>
                          <Camera className='w-4 h-4 mr-2 inline' />
                          Change Avatar
                        </span>
                      </Button>
                    </div>

                    <div className='text-xs text-gray-400 mt-1'>JPG, JPEG, PNG • 1MB max</div>
                  </div>
                </div>

                <div className='mb-4'>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Full Name</label>
                  <div className='relative'>
                    <input
                      type='text'
                      value={name}
                      onChange={handleChangeName}
                      className='block w-full border border-gray-300 rounded-md py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-gray-300'
                      placeholder='e.g. John Doe'
                    />
                    <User className='absolute left-3 top-3 w-5 h-5 text-gray-400' />
                  </div>
                </div>

                <div className='mb-4'>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Email</label>
                  <div className='relative'>
                    <input
                      type='email'
                      value={email}
                      onChange={handleChangeEmail}
                      className='block w-full border border-gray-300 rounded-md py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-gray-300'
                      placeholder='e.g. johndoe001@example.com'
                    />
                    <Mail className='absolute left-3 top-3 w-5 h-5 text-gray-400' />
                  </div>
                </div>

                <div className='flex gap-2'>
                  <Button
                    className='text-red-600'
                    type='button'
                    variant={'outline'}
                    onClick={handleCancel}
                    disabled={!hasChanges}
                  >
                    Cancel
                  </Button>
                  <Button
                    className='bg-blue-600 text-white hover:text-blue-600 hover:border-blue-600 hover:border hover:bg-white'
                    type='submit'
                    disabled={saving || !hasChanges}
                  >
                    <Save className='w-4 h-4 mr-1 inline' /> {saving ? 'Saving...' : 'Save'}
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default UserProfilePage
