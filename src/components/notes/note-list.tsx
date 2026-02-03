'use client'

import { FilterCriterion } from '@/components/common/popover/filter-popover'
import { SortCriterion } from '@/components/common/popover/sort-popover'
import FadeInSection from '@/components/animations/fade-in-section'
import { Notebook } from 'lucide-react'
import AnimatedList from '@/components/animations/animated-list'
import NoteCard from '@/components/notes/note-card'
import Pagination from '@/components/pagination'
import { useEffect, useState } from 'react'
import { Note } from '@/types/note.type'
import { PageInfo } from '@/types/util.type'
import { useSearchParams } from 'next/navigation'
import useQuery from '@/hooks/use-query'
import { getAllNotes } from '@/services/note.service'
import SearchLayout from '@/components/common/search-layout'
import ErrorBlock from '@/components/common/error-block'

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

  const searchParams = useSearchParams()
  const { setQuery } = useQuery()

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

  // ------ Pagination ------ //
  const handlePageChange = (pageNumber: number) => {
    setPage((prevState) => ({ ...prevState, currentPage: pageNumber }))
    setQuery('page', pageNumber)
  }

  return (
    <>
      {/* Search & Filter */}
      <SearchLayout filterCriteria={filterCriteria} sortCriteria={sortCriteria} />

      {/* Error State */}
      <ErrorBlock errorMessage={error} />

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