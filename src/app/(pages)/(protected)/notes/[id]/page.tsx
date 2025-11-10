'use client'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeft, CircleChevronLeft, Edit, Save, Tag } from 'lucide-react'

import { ChangeEvent, useEffect, useState } from 'react'
import { Badge } from '@/components/ui/badge'

import { Note } from '@/types/note.type'
import { getNoteById, updateNote } from '@/services/notes.service'
import AutoResizeTextarea from '@/components/notes/auto-resize-textarea'
import ReactMarkdown from 'react-markdown'

const NoteDetailsPage = () => {
  const router = useRouter()
  const { id } = useParams()
  const [note, setNote] = useState<Note | null>()
  // const [tags, setTags] = useState(note?.tags || [])
  // const [tagsInput, setTagsInput] = useState(tags.join(','))

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)

  const fetchData = async (id: number) => {
    setLoading(true)
    setError('')

    try {
      const data = await getNoteById(id)
      setNote(data)
    } catch (error : any) {
      setNote(null)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData(Number(id));
  }, [id])

  const handleBackToNotes = () => {
    router.push('/notes')
  }

  const handleEditNote = () => {
    // setTagsInput(tags.join(','))

    setIsEditing(true)
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
  }

  const handleSaveNote = async () => {
    setLoading(true)
    setIsEditing(true)

    // const updatedTags = tagsInput
    //   .split(',')
    //   .map((tag) => tag.trim())
    //   .filter((tag) => tag)
    //
    // setTags(updatedTags)

    if (!note) return
    try {
      const updatedNote = await updateNote(note.id, {
        title: note.title,
        content: note.content
      })
      setNote(updatedNote)
    } catch (error : any) {
      setError(error.message)
    } finally {
      setLoading(false)
      setIsEditing(false)
    }
  }

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!note) return

    const newTitle = event.target.value
    setNote({...note, title: newTitle })
  }

  const handleContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (!note) return

    const newContent = event.target.value
    setNote({...note, content: newContent })
  }

  // const handleTagsInputChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   const newTagsInput = event.target.value
  //   setTagsInput(newTagsInput)
  // }

  if (loading) {
    return <>
      <div className='min-h-screen flex flex-col items-center justify-center'>
        <p className='text-gray-500 text-xl'>Loading note content...</p>
      </div>
    </>
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

                    <Button
                      className='bg-blue-600 text-white hover:text-blue-600 hover:border-blue-600 hover:bg-white transition-colors duration-200 flex items-center'
                      onClick={handleSaveNote}
                    >
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
                    value={note.title}
                    onChange={handleTitleChange}
                  />
                </>
              ) : (
                <h2 className='text-4xl font-semibold text-blue-900 py-2'>{note.title}</h2>
              )}
            </div>

            <div className='mb-2'>
              {isEditing ? (
                <>
                  <label className='block text-sm font-medium text-gray-700 mb-1 ml-1'>Content</label>
                  <AutoResizeTextarea
                    // className='border border-gray-300 rounded-md p-2 w-full h-32'
                    className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base leading-relaxed'
                    value={note.content}
                    onChange={handleContentChange}
                    minHeight={200}
                  />
                </>
              ) : (
                <div className='markdown '>
                  <ReactMarkdown>{note.content}</ReactMarkdown>
                </div>
              )}
            </div>

            {/* Tagging Feature */}
            {/*<div className='mb-2'>*/}
            {/*  {isEditing ? (*/}
            {/*    <>*/}
            {/*      <label className='block text-sm font-medium text-gray-700 mb-1 ml-1'>Tags</label>*/}
            {/*      <input*/}
            {/*        className='border border-gray-300 rounded-md p-2 w-full'*/}
            {/*        value={tagsInput}*/}
            {/*        onChange={handleTagsInputChange}*/}
            {/*        placeholder='Enter tags separated by commas (e.g., tag1,tag2)'*/}
            {/*      />*/}
            {/*    </>*/}
            {/*  ) : (*/}
            {/*    <div className='mb-2'>*/}
            {/*      <div className='flex items-center gap-2 p-2'>*/}
            {/*        <Tag className='w-4 h-4 text-muted-foreground' />*/}
            {/*        <div className='flex gap-2'>*/}
            {/*          {tags.map((tag) => (*/}
            {/*            <Badge key={tag} variant={'secondary'} className='text-xs'>*/}
            {/*              {tag}*/}
            {/*            </Badge>*/}
            {/*          ))}*/}
            {/*        </div>*/}
            {/*      </div>*/}
            {/*    </div>*/}
            {/*  )}*/}
            {/*</div>*/}

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
