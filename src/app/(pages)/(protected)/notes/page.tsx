'use client'
import { useState } from 'react'
import { Plus, Search, Filter, Notebook, MoreVertical } from 'lucide-react'
import { Button } from '@/components/ui/button'
import AnimatedSection from '@/components/landing/animated-section'
import Pagination from '@/components/pagination'
import useQueryConfig from '@/hooks/use-query-config'
import useUpdateQueryParam from '@/hooks/use-update-query-param'
import NoteCard from '@/components/notes/note-card'

import { notes } from '@/data/notes'
import { useRouter } from 'next/navigation'

const NotesListPage = () => {
  const router = useRouter()

  const [search, setSearch] = useState('')

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.description.toLowerCase().includes(search.toLowerCase()) ||
      note.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()))
  )

  const pageSize = 6
  const queryConfig = useQueryConfig()
  const setQueryParam = useUpdateQueryParam()
  const currentPage = Number(queryConfig.page) || 1

  const paginatedNotes = filteredNotes.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let keyword = e.target.value
    if (keyword.trim() === '') {
      setSearch('')
    } else {
      setSearch(keyword)
    }
  }

  return (
    <div className='min-h-screen bg-gray-50 px-4 py-4 overflow-hidden'>
      {/* Header */}
      <AnimatedSection delay={0}>
        <div className='flex items-center justify-between mb-8'>
          <h1 className='text-3xl font-bold text-gray-900 flex items-center gap-2'>
            <Notebook className='w-7 h-7 text-blue-600' />
            My Notes
          </h1>
          <Button
            className='flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold px-4 py-2 rounded-lg shadow hover:from-blue-600 hover:to-purple-600 transition'
            onClick={() => router.push('/notes/new')}
          >
            <Plus className='w-5 h-5' />
            New Note
          </Button>
        </div>
      </AnimatedSection>
      {/* End - Header */}

      {/* Search & Filter */}
      <AnimatedSection delay={0.1}>
        <div className='flex items-center gap-4 mb-6'>
          <div className='relative'>
            <Search className='absolute left-3 top-3 text-gray-400 w-5 h-5' />
            <input
              type='text'
              placeholder='Search notes...'
              value={search}
              onChange={handleSearchInputChange}
              className='w-full sm:w-64 md:w-80 lg:w-96 pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white shadow-sm'
            />
          </div>
          <Button variant='outline' className='flex items-center gap-2'>
            <Filter className='w-5 h-5' />
            Filter
          </Button>
        </div>
      </AnimatedSection>

      {/* Notes Grid */}
      <AnimatedSection delay={0.2}>
        {filteredNotes.length === 0 ? (
          <div className='text-center text-gray-500 py-16'>
            <Notebook className='w-12 h-12 mx-auto mb-4 text-gray-300' />
            <p className='text-lg'>No notes found. Try a different search or add a new note!</p>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {paginatedNotes.map((note) => (
              <NoteCard
                key={note.id}
                id={note.id}
                title={note.title}
                description={note.description}
                createdAt={new Date(note.createdAt)}
                tags={note.tags}
              />
            ))}
          </div>
        )}
      </AnimatedSection>

      {/* Pagination */}
      <AnimatedSection delay={0.2}>
        {filteredNotes.length > pageSize && (
          <Pagination
            total={filteredNotes.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={(page) => setQueryParam('page', String(page))}
          />
        )}
      </AnimatedSection>
      {/* End - Pagination */}
    </div>
  )
}

export default NotesListPage
