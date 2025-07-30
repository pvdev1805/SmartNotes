'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { CircleChevronLeft, Save } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useState } from 'react'

const NewNotePage = () => {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [tagsInput, setTagsInput] = useState('')

  const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.target.value
    setTitle(newTitle)
  }

  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const newDescription = event.target.value
    setDescription(newDescription)
  }

  const handleTagsInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newTagsInput = event.target.value
    setTagsInput(newTagsInput)
  }

  const handleSaveNote = () => {
    const updatedTags = tagsInput
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag)

    setTags(updatedTags)

    // Save the note to backend or state management
    console.log('Note saved:', { title, description, tags: updatedTags })

    // Redirect back to notes list
    router.push('/notes')
  }

  const handleBack = () => {
    router.back()
  }

  return (
    <>
      <div className='min-h-screen flex flex-col items-center bg-gray-50 px-2 py-4 rounded-lg'>
        <Card className='w-full shadow-lg rounded-xl p-6 bg-white'>
          <CardContent>
            <div className='flex items-center justify-between mb-4'>
              <Button variant={'outline'} className='flex items-center' onClick={handleBack}>
                <CircleChevronLeft className='w-5 h-5' /> Back
              </Button>

              <div className='flex items-center gap-2'>
                <Button
                  className='bg-blue-600 text-white hover:text-blue-600 hover:border-blue-600 hover:bg-white transition-colors duration-200 flex items-center'
                  onClick={handleSaveNote}
                >
                  <Save className='w-4 h-4' /> Save
                </Button>
              </div>
            </div>

            <div className='mb-2'>
              <h2 className='text-2xl font-bold text-gray-900'>New Note</h2>
              <p className='text-sm text-gray-600'>Create a new note by filling out the details below.</p>
            </div>

            <div className='mb-2'>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Title</label>
              <input
                className='w-full border rounded-lg px-3 py-2 text-lg font-semibold'
                value={title}
                onChange={handleChangeTitle}
                placeholder='Enter note title'
                autoFocus
              />
            </div>

            <div className='mb-2'>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Content</label>
              <textarea
                className='w-full border rounded-lg px-3 py-2 h-40 resize-none'
                value={description}
                onChange={handleDescriptionChange}
                placeholder='Write your note content here...'
              ></textarea>
            </div>

            <div className='mb-2'>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Tags</label>
              <input
                className='w-full border rounded-lg px-3 py-2'
                value={tagsInput}
                onChange={handleTagsInputChange}
                placeholder='Add tags (comma separated)'
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default NewNotePage
