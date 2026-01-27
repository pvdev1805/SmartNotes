'use client'

import FilterPopover, { FilterCriterion } from '@/components/common/filter-popover'
import SortPopover, { SortCriterion } from '@/components/common/sort-popover'
import FadeInSection from '@/components/animations/fade-in-section'
import { Eraser, Notebook, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import AnimatedList from '@/components/animations/animated-list'
import NoteCard from '@/components/notes/note-card'
import Pagination from '@/components/pagination'
import { useEffect, useState } from 'react'
import { Note } from '@/types/note.type'
import { PageInfo } from '@/types/util.type'
import { useSearchParams } from 'next/navigation'
import useQuery from '@/hooks/use-query'
import { getAllNotes } from '@/services/note.service'

const filterCriteria : FilterCriterion[] = [
  { key: 'createdFrom', label: 'Created From', inputType: 'date' },
  { key: 'createdTo', label: 'Created Before', inputType: 'date' },
  { key: 'updatedFrom', label: 'Updated From', inputType: 'date' },
  { key: 'updatedTo', label: 'Updated Before', inputType: 'date' }
]

const sortCriteria : SortCriterion[] = [
  { value: 'createdAt', label: 'Created At' },
  { value: 'updatedAt', label: 'Updated At' },
  { value: 'title', label: 'Title' }
]

interface NoteListProps {
  pageSize?: number
  reloadTrigger?: boolean
}

const NoteList = ({ pageSize, reloadTrigger } : NoteListProps ) => {
  const [notes, setNotes] = useState<Note[]>([])
  const [page, setPage] = useState<PageInfo>({
    currentPage: 1,
    pageSize: pageSize ? pageSize : 6,
    totalPages: 0,
    totalElements: 0 }
  )

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [search, setSearch] = useState('')
  const [resetTrigger, setResetTrigger] = useState(false)
  const searchParams = useSearchParams()
  const { setQuery, removeQuery, clearQuery } = useQuery()

  // ------ Fetching data ------ //
  const fetchData = async (pageNum: number) => {
    setLoading(true)
    setError('')

    try {
      const data = await getAllNotes(pageNum, page.pageSize, searchParams.toString())
      setNotes(data.pageData)
      setPage(data.pageInfo)
    } catch (error: any) {
      setNotes([])
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData(page.currentPage)
  }, [searchParams, reloadTrigger])

  // ------ Handle AFTER deletion (update list) ------ //
  const handleNoteDeleted = (deletedNoteId: number) => {
    fetchData(page.currentPage) // Fetch again to reload paginated elements
  }

  // ------ Pagination, Search, Filter and Sort ------ //
  const handlePageChange = (pageNumber: number) => {
    setPage((prevState) => ({ ...prevState, currentPage: pageNumber }))
    setQuery('page', pageNumber)
  }

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let keyword = e.target.value
    if (keyword.trim() != '') {
      setSearch(keyword)
      setQuery('keyword', keyword)
    } else {
      setSearch('')
      removeQuery('keyword')
    }
  }

  const handleFilterInputChange = (filters: Record<string, string>) => {
    Object.entries(filters).forEach(([key, value]) => {
      setQuery(key, value)
    })
  }

  const handleSortInputChange = (sortBy : string, sortOrder : string) => {
    if (sortBy !== '' && sortOrder !== '') {
      setQuery('sortBy', sortBy)
      setQuery('sortOrder', sortOrder)
    }
  }

  const handleClearQuery = () => {
    setSearch('')
    setResetTrigger(!resetTrigger)
    clearQuery()
  }

  return (
    <>
      {/* Search & Filter */}
      <FadeInSection>
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
          <div className="flex items-center gap-2">
            <FilterPopover
              criteria={filterCriteria}
              resetTrigger={resetTrigger}
              onApply={handleFilterInputChange}
            />
            <SortPopover
              criteria={sortCriteria}
              resetTrigger={resetTrigger}
              onApply={handleSortInputChange}
            />
            <Button
              variant='outline'
              onClick={handleClearQuery}
              className='flex items-center gap-2 border-red-300 text-red-600 bg-red-50 hover:bg-red-100'>
              <Eraser  className="w-5 h-5" />
              Reset
            </Button>
          </div>
        </div>
      </FadeInSection>
      {/* End - Search & Filter */}

      {/* Error State */}
      {error != '' && (
        <FadeInSection>
          <div className='bg-red-50 border border-red-200 rounded-lg p-6 mb-6'>
            <div className='flex items-start gap-3'>
              <div className='flex-1'>
                <h3 className='text-red-900 font-semibold mb-1'>Error Loading Notes</h3>
                <p className='text-red-700 mb-4'>{error}</p>
              </div>
            </div>
          </div>
        </FadeInSection>
      )}
      {/* End - Error State */}

      {/* Notes Grid */}
      <FadeInSection>
        {loading ? (
          <p className='text-gray-500'>Loading notes...</p>
        ) : !error && notes.length === 0 ? (
          <div className='text-center text-gray-500 py-16'>
            <Notebook className='w-12 h-12 mx-auto mb-4 text-gray-300' />
            <p className='text-lg'>No notes found. Try a different search or add a new note!</p>
          </div>
        ) : (
          <AnimatedList className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {notes.map((note) => (
              <NoteCard
                key={note.id}
                id={note.id}
                title={note.title}
                description={note.content}
                createdAt={new Date(note.createdAt)}
                updatedAt={new Date(note.updatedAt)}
                // tags={note.tags}
                tags={[]}
                onFinishDelete={handleNoteDeleted}
              />
            ))}
          </AnimatedList>
        )}
      </FadeInSection>
      {/* End - Notes Grid */}

      {/* Pagination */}
      {page.totalPages > 1 && (
        <FadeInSection>
          <Pagination
            total={page.totalElements}
            pageSize={page.pageSize}
            totalPages={page.totalPages}
            currentPage={page.currentPage}
            onPageChange={handlePageChange}
          />
        </FadeInSection>
      )}
      {/* End - Pagination */}
    </>
  )
}

export default NoteList