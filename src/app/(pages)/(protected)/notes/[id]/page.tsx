'use client'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeft, CircleChevronLeft, Edit, Save, Tag } from 'lucide-react'

// Dummy notes data
import { notes } from '@/data/notes'
import { ChangeEvent, useState } from 'react'
import { Badge } from '@/components/ui/badge'

const NoteDetailsPage = () => {
  const router = useRouter()
  const { id } = useParams()
  const note = notes.find((note) => note.id === Number(id))

  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(note?.title || '')
  const [description, setDescription] = useState(note?.description || '')
  const [tags, setTags] = useState(note?.tags || [])
  const [tagsInput, setTagsInput] = useState(tags.join(','))

  const handleBackToNotes = () => {
    router.push('/notes')
  }

  const handleEditNote = () => {
    setTagsInput(tags.join(','))

    setIsEditing(true)
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
  }

  const handleSaveNote = () => {
    const updatedTags = tagsInput
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag)

    setTags(updatedTags)

    setIsEditing(false)
  }

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
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

  if (!note) {
    return (
      <>
        <div className='min-h-screen flex flex-col items-center justify-center'>
          <p className='text-gray-500 text-xl'>Note not found.</p>
          <Button onClick={handleBackToNotes} className='mt-4'>
            <ArrowLeft className='w-4 h-4 mr-2' /> Back to Notes
          </Button>
        </div>
      </>
    )
  }

  return (
    <>
      <div className='min-h-screen flex flex-col items-center bg-gray-50 px-2 py-4 rounded-lg'>
        <Card className='w-full shadow-lg rounded-xl p-6 bg-white'>
          <CardContent>
            <div className='flex items-center justify-between mb-4'>
              <Button variant={'outline'} onClick={handleBackToNotes} className='flex items-center'>
                <CircleChevronLeft className='w-5 h-5' /> Back to Notes
              </Button>

              <div className='flex items-center gap-2'>
                {!isEditing ? (
                  <Button
                    variant={'outline'}
                    onClick={handleEditNote}
                    className='text-red-600 hover:text-white hover:bg-red-600 transition-colors duration-200 flex items-center'
                  >
                    <Edit className='w-4 h-4' /> Edit
                  </Button>
                ) : (
                  <>
                    <Button
                      variant={'outline'}
                      onClick={handleCancelEdit}
                      className='text-red-600 hover:text-white hover:bg-red-600 transition-colors duration-200'
                    >
                      Cancel
                    </Button>

                    <Button className='bg-blue-600 text-white hover:bg-blue-700' onClick={handleSaveNote}>
                      <Save className='w-4 h-4' /> Save
                    </Button>
                  </>
                )}
              </div>
            </div>

            <div className='mb-2'>
              {isEditing ? (
                <>
                  <label className='block text-sm font-medium text-gray-700 mb-1 ml-1'>Title</label>
                  <input
                    className='border border-gray-300 rounded-md p-2 w-full'
                    value={title}
                    onChange={handleTitleChange}
                  />
                </>
              ) : (
                <h2 className='text-2xl font-semibold text-gray-900 p-2'>{title}</h2>
              )}
            </div>

            <div className='mb-2'>
              {isEditing ? (
                <>
                  <label className='block text-sm font-medium text-gray-700 mb-1 ml-1'>Description</label>
                  <textarea
                    className='border border-gray-300 rounded-md p-2 w-full h-32'
                    value={description}
                    onChange={handleDescriptionChange}
                  />
                </>
              ) : (
                <p className='text-gray-700 p-2'>{description}</p>
              )}
            </div>

            <div className='mb-2'>
              {isEditing ? (
                <>
                  <label className='block text-sm font-medium text-gray-700 mb-1 ml-1'>Tags</label>
                  <input
                    className='border border-gray-300 rounded-md p-2 w-full'
                    value={tagsInput}
                    onChange={handleTagsInputChange}
                    placeholder='Enter tags separated by commas (e.g., tag1,tag2)'
                  />
                </>
              ) : (
                <div className='mb-2'>
                  <div className='flex items-center gap-2 p-2'>
                    <Tag className='w-4 h-4 text-muted-foreground' />
                    <div className='flex gap-2'>
                      {tags.map((tag) => (
                        <Badge key={tag} variant={'secondary'} className='text-xs'>
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className='mb-2'>
              <div className='mt-6 text-sm text-gray-400'>
                Created: {note.createdAt} | Updated: {note.updatedAt}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default NoteDetailsPage
