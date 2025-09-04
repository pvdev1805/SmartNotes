'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FileText, BookOpen, Sparkles, UploadCloud } from 'lucide-react'
import { notes } from '@/data/notes'

const mockNotes = notes.map((note) => ({ id: note.id, title: note.title }))

const QuizCreatePage = () => {
  const [selectedNotes, setSelectedNotes] = useState<number[]>([])
  const [pdfFile, setPdfFile] = useState<File | null>(null)

  const handleNoteToggle = (id: number) => {
    setSelectedNotes((prev) => (prev.includes(id) ? prev.filter((nid) => nid !== id) : [...prev, id]))
  }

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setPdfFile(e.target.files[0])
  }

  const canGenerate = selectedNotes.length > 0 || pdfFile

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // TODO: Trigger quiz generation
  }

  return (
    <div className='min-h-screen flex flex-col items-center bg-gray-50 px-2 py-8'>
      <Card className='w-full shadow-lg rounded-xl p-8 bg-white'>
        <CardContent>
          <div className='flex items-center gap-3 mb-4'>
            <Sparkles className='w-8 h-8 text-blue-600' />
            <h2 className='text-2xl font-bold text-gray-900'>Create AI Quiz</h2>
          </div>
          <p className='text-gray-700 mb-6'>Select notes or upload a PDF to generate a quiz using AI.</p>
          <form className='flex flex-col gap-8' onSubmit={handleSubmit}>
            {/* Notes Selection */}
            <div>
              <h3 className='font-semibold text-gray-800 mb-2 flex items-center gap-2'>
                <FileText className='w-5 h-5 text-gray-500' /> Select Notes
              </h3>
              {mockNotes.length === 0 ? (
                <div className='bg-yellow-50 border border-yellow-200 text-yellow-700 rounded-lg px-4 py-3 text-sm'>
                  No notes available. Please create a note first.
                </div>
              ) : (
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3'>
                  {mockNotes.map((note) => (
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
            {/* PDF Upload */}
            <div>
              <h3 className='font-semibold text-gray-800 mb-2 flex items-center gap-2'>
                <BookOpen className='w-5 h-5 text-gray-500' /> Upload PDF
              </h3>
              <label className='block'>
                <div className='flex flex-col items-center justify-center border-2 border-dashed border-blue-300 rounded-lg px-4 py-6 bg-blue-50 hover:bg-blue-100 cursor-pointer transition'>
                  <UploadCloud className='w-8 h-8 text-blue-400 mb-2' />
                  <span className='text-blue-700 font-medium mb-2'>Click to select a PDF file</span>
                  <input type='file' accept='application/pdf' onChange={handlePdfChange} className='hidden' />
                  {pdfFile ? (
                    <span className='mt-2 text-xs text-blue-600'>Selected file: {pdfFile.name}</span>
                  ) : (
                    <span className='mt-2 text-xs text-blue-400'>No PDF uploaded yet.</span>
                  )}
                </div>
              </label>
            </div>
            {/* Generate Button */}
            <div className='flex justify-end mt-4'>
              <Button type='submit' disabled={!canGenerate}>
                Generate Quiz
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default QuizCreatePage
