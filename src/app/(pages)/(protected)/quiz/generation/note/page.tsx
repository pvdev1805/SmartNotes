'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FileText, BookOpen, Sparkles, UploadCloud, CircleChevronLeft, Notebook, Plus, ToggleLeft } from 'lucide-react'
// import { notes } from '@/data/notes'
import { useRouter } from 'next/navigation'
import { Note } from '@/types/note.type'
import { generateSingleQuiz } from '@/services/quiz.service'
import AnimatedSection from '@/components/landing/animated-section'
import { getAllNotes } from '@/services/note.service'

// const mockNotes = notes.map((note) => ({ id: note.id, title: note.title }))

const NoteSelectionPage = () => {
  const router = useRouter()

  const [notes, setNotes] = useState<Note[]>([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [generating, setGenerating] = useState(false)

  const allowMultipleSelection = false
  const [isMultiple, setMultiple] = useState(false)

  const [selectedNoteId, setSelectedNoteId] = useState<number | null>(null)
  const [selectedNotes, setSelectedNotes] = useState<number[]>([])
  // const [pdfFile, setPdfFile] = useState<File | null>(null)

  const fetchData = async () => {
    setLoading(true)
    setError('')

    try {
      const data = await getAllNotes()
      setNotes(data)
    } catch (error : any) {
      setNotes([])
      setError(error.message)
    } finally {
      setError('')
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleBackToQuizGeneration = () => {
    router.push('/quiz/generation')
  }

  const handleMultipleToggle = () => {
    setMultiple(!isMultiple)
    setSelectedNotes([])
    setSelectedNoteId(null)
  }

  const handleNoteToggle = (id: number) => {
    if (isMultiple) {
      setSelectedNotes((prev) => (prev.includes(id) ? prev.filter((nid) => nid !== id) : [...prev, id]))
    } else {
      setSelectedNoteId(id);
    }
  }

  // const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files?.[0]) setPdfFile(e.target.files[0])
  // }

  // const canGenerate = selectedNotes.length > 0 || pdfFile

  const canGenerate = selectedNotes.length > 0 || selectedNoteId

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // TODO: Trigger quiz generation
    setGenerating(true)
    setError('')

    if (!selectedNoteId) return
    try {
      const quiz = await generateSingleQuiz(selectedNoteId)
      router.push('/quiz')
    } catch (error : any) {
      setError(error.message)
    } finally {
      setGenerating(false)
    }
  }

  return (
    <>
      {/* Buttons */}
      <div className='flex items-center justify-between mb-4'>
        <Button variant={'outline'} onClick={handleBackToQuizGeneration} className='flex items-center'>
          <CircleChevronLeft className='w-5 h-5' /> Back to Quizzes
        </Button>
      </div>

      {/* Note Selection */}
      <div className='min-h-screen flex flex-col items-center bg-gray-50 px-2 pb-8'>
        <Card className='w-full shadow-lg rounded-xl p-8 bg-white'>
          <CardContent>
            <div className='flex items-center justify-between mb-4'>
              <div className='flex items-center gap-3'>
                <Sparkles className='w-8 h-8 text-blue-600' />
                <h2 className='text-2xl font-bold text-gray-900'>Create AI Quiz</h2>
              </div>

              <div className='flex items-center gap-3'>
                <Button variant={'outline'} onClick={handleMultipleToggle} className='flex items-center bg-blue-100 hover:bg-blue-200' disabled={allowMultipleSelection}>
                  Single Note
                </Button>

                <Button variant={'outline'} onClick={handleMultipleToggle} className='flex items-center bg-blue-100 hover:bg-blue-200' disabled={!allowMultipleSelection}>
                  Multiple Notes
                </Button>
              </div>
            </div>

            <p className='text-gray-700 mb-6'>Select notes to generate a quiz using AI.</p>
            {/*<p className='text-gray-700 mb-6'>Select notes or upload a PDF to generate a quiz using AI.</p>*/}
            <form className='flex flex-col gap-8' onSubmit={handleSubmit}>

              {/* Notes Selection */}
              <h3 className='font-semibold text-gray-800 mb-2 flex items-center gap-2'>
                <FileText className='w-5 h-5 text-gray-500' /> Select Notes
              </h3>
              {isMultiple ? (
                <div>
                  {notes.length === 0 ? (
                    <div className='bg-yellow-50 border border-yellow-200 text-yellow-700 rounded-lg px-4 py-3 text-sm'>
                      No notes available. Please create a note first.
                    </div>
                  ) : (
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3'>
                      {notes.map((note) => (
                        <label
                          key={note.id}
                          className='flex items-center gap-2 bg-gray-50 border rounded-lg px-3 py-2 cursor-pointer hover:border-blue-400 transition'
                        >
                          <input
                            type='checkbox'
                            checked={selectedNotes.includes(note.id)}
                            onChange={() => handleNoteToggle(note.id)}
                            className='accent-blue-600'
                          />
                          <span className='text-gray-800 font-medium'>{note.title}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  {notes.length === 0 ? (
                    <div className='bg-yellow-50 border border-yellow-200 text-yellow-700 rounded-lg px-4 py-3 text-sm'>
                      No notes available. Please create a note first.
                    </div>
                  ) : (
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3'>
                      {notes.map((note) => (
                        <label
                          key={note.id}
                          className='flex items-center gap-2 bg-gray-50 border rounded-lg px-3 py-2 cursor-pointer hover:border-blue-400 transition'
                        >
                          <input
                            type='radio'
                            name='noteSelection'
                            checked={selectedNoteId === note.id}
                            onChange={() => handleNoteToggle(note.id)}
                            className='accent-blue-600'
                          />
                          <span className='text-gray-800 font-medium'>{note.title}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* PDF Upload */}
              {/*<div>*/}
              {/*  <h3 className='font-semibold text-gray-800 mb-2 flex items-center gap-2'>*/}
              {/*    <BookOpen className='w-5 h-5 text-gray-500' /> Upload PDF*/}
              {/*  </h3>*/}
              {/*  <label className='block'>*/}
              {/*    <div className='flex flex-col items-center justify-center border-2 border-dashed border-blue-300 rounded-lg px-4 py-6 bg-blue-50 hover:bg-blue-100 cursor-pointer transition'>*/}
              {/*      <UploadCloud className='w-8 h-8 text-blue-400 mb-2' />*/}
              {/*      <span className='text-blue-700 font-medium mb-2'>Click to select a PDF file</span>*/}
              {/*      <input type='file' accept='application/pdf' onChange={handlePdfChange} className='hidden' />*/}
              {/*      {pdfFile ? (*/}
              {/*        <span className='mt-2 text-xs text-blue-600'>Selected file: {pdfFile.name}</span>*/}
              {/*      ) : (*/}
              {/*        <span className='mt-2 text-xs text-blue-400'>No PDF uploaded yet.</span>*/}
              {/*      )}*/}
              {/*    </div>*/}
              {/*  </label>*/}
              {/*</div>*/}

              {/* Generate Button */}
              <div className='flex justify-end mt-4'>
                <Button type='submit' disabled={!canGenerate || generating}>
                  Generate Quiz
                </Button>
              </div>
            </form>

            <div className='pt-5'>
              {/* Generating Message */}
              {generating && (
                <AnimatedSection delay={0.2}>
                  <div className='bg-green-50 border border-green-200 rounded-lg p-6 mb-6'>
                    <div className='flex items-start gap-3'>
                      <div className='flex-1'>
                        <h3 className='text-green-900 font-semibold mb-1'>Generating quiz...</h3>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              )}

              {/* Error Message */}
              {error != '' && (
                <AnimatedSection delay={0.2}>
                  <div className='bg-red-50 border border-red-200 rounded-lg p-6 mb-6'>
                    <div className='flex items-start gap-3'>
                      <div className='flex-1'>
                        <h3 className='text-red-900 font-semibold mb-1'>Error Loading Notes</h3>
                        <p className='text-red-700 mb-4'>{error}</p>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default NoteSelectionPage
