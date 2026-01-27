'use client'
import { Plus, Notebook } from 'lucide-react'
import { Button } from '@/components/ui/button'
import FadeInSection from '@/components/animations/fade-in-section'
import { useNav } from '@/hooks/use-nav'
import NoteList from '@/components/notes/note-list'

const NotesListPage = () => {
  const nav = useNav()

  return (
    <div className='min-h-screen bg-gray-50 px-4 py-4 overflow-hidden'>
      {/* Header */}
      <FadeInSection>
        <div className='flex items-center justify-between mb-8'>
          <h1 className='text-3xl font-bold text-gray-900 flex items-center gap-2'>
            <Notebook className='w-7 h-7 text-blue-600' />
            My Notes
          </h1>
          <Button
            className='flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold px-4 py-2 rounded-lg shadow hover:from-blue-600 hover:to-purple-600 transition'
            onClick={nav.toNoteCreation}
          >
            <Plus className='w-5 h-5' />
            New Note
          </Button>
        </div>
      </FadeInSection>
      {/* End - Header */}

      <NoteList />
    </div>
  )
}

export default NotesListPage
