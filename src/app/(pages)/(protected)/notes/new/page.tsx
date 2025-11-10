'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { CircleChevronLeft, Notebook, Save } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { ChangeEvent, FormEvent, useState } from 'react'

import { createNote } from '@/services/notes.service'
import { Note } from '@/types/note.type'
import AnimatedSection from '@/components/landing/animated-section'
import AutoResizeTextarea from '@/components/notes/auto-resize-textarea'

const NewNotePage = () => {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  // const [tags, setTags] = useState<string[]>([])
  // const [tagsInput, setTagsInput] = useState('')

  const [error, setError] = useState('')

  const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.target.value
    setTitle(newTitle)
  }

  const handleContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = event.target.value
    setContent(newContent)
  }

  // const handleTagsInputChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   const newTagsInput = event.target.value
  //   setTagsInput(newTagsInput)
  // }

  const handleSaveNote = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')

    // const updatedTags = tagsInput
    //   .split(',')
    //   .map((tag) => tag.trim())
    //   .filter((tag) => tag)
    //
    // setTags(updatedTags)
    const newNote = {
      title: title,
      content: content
    } as Note

    try {
      const createdNote = await createNote(newNote)

      // Redirect back to notes list
      const newId = createdNote?.id
      if (newId) router.push(`/notes/${newId}`)
    } catch (error : any) {
      console.log(error.message)
      setError(error.message)
    }
  }

  const handleBack = () => {
    router.back()
  }

  return (
    <>
      <div className='min-h-screen flex flex-col items-center bg-gray-50 px-2 py-4 rounded-lg'>
        <Card className='w-full max-w-3xl shadow-lg rounded-xl p-6 bg-white'>
          <CardContent>
            <div className='flex items-center justify-between mb-4'>
              <h2 className='text-2xl font-bold text-gray-900 flex items-center gap-2'>
                <Notebook className='w-7 h-7 text-blue-600' />
                New Note
              </h2>

              <Button variant={'outline'} className='flex items-center' onClick={handleBack}>
                <CircleChevronLeft className='w-5 h-5' /> Back
              </Button>
            </div>

            {/* Error Message or Input Form */}
            {error != '' ? (
              <>
                <div className='mb-4'>
                  <p className='text-sm text-gray-700'>Create a new note by filling out the details below.</p>
                </div>
                <AnimatedSection delay={0.2}>
                  <div className='bg-red-50 border border-red-200 rounded-lg p-6 mb-6'>
                    <div className='flex items-start gap-3'>
                      <div className='flex-1'>
                        <h3 className='text-red-900 font-semibold mb-1'>Error Creating Notes</h3>
                        <p className='text-red-700 mb-4'>{error}</p>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              </>
            ) : (
              <form onSubmit={handleSaveNote}>
                <div className='mb-2'>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Title</label>
                  <input
                    className='w-full border rounded-lg px-3 py-2'
                    value={title}
                    onChange={handleChangeTitle}
                    placeholder='Enter note title'
                    autoFocus
                  />
                </div>

                {/*<div className='mb-2'>*/}
                {/*  <label className='block text-sm font-medium text-gray-700 mb-1'>Tags</label>*/}
                {/*  <input*/}
                {/*    className='w-full border rounded-lg px-3 py-2'*/}
                {/*    value={tagsInput}*/}
                {/*    onChange={handleTagsInputChange}*/}
                {/*    placeholder='Add tags (comma separated)'*/}
                {/*  />*/}
                {/*</div>*/}

                <div className='mb-2'>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Content</label>
                  <AutoResizeTextarea
                    // className='w-full border rounded-lg px-3 py-2 h-40 resize-none'
                    className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base leading-relaxed'
                    value={content}
                    onChange={handleContentChange}
                    placeholder='Write your note content here...'
                    minHeight={200}
                  />
                </div>

                <div className='flex items-center mt-4'>
                  <Button
                    className='bg-blue-600 text-white hover:text-blue-600 hover:border-blue-600 hover:border hover:bg-white transition-colors duration-200 flex items-center'
                    type='submit'
                  >
                    <Save className='w-4 h-4' /> Save
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default NewNotePage
