'use client'
import { useEffect, useState } from 'react'
import { Plus, Search, Filter, Notebook, CircleChevronLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import AnimatedSection from '@/components/landing/animated-section'
import Pagination from '@/components/pagination'
import useQueryConfig from '@/hooks/use-query-config'
import useUpdateQueryParam from '@/hooks/use-update-query-param'

import { createQuizSet, getAllQuizSets } from '@/services/quiz-set.service'
import { QuizSet } from '@/types/quiz-set.type'
import { useNav } from '@/hooks/use-nav'
import QuizSetCard from '@/components/quizzes/quiz-set-card'
import QuizSetInfoModal from '@/components/quizzes/quiz-set-info-modal'

const QuizSetsListPage = () => {
  const nav = useNav()

  const [quizSets, setQuizSets] = useState<QuizSet[]>([])
  const [loading, setLoading] = useState(true)

  const [creationModalOpen, setCreationModalOpen] = useState(false)
  const [isCreating, setIsCreating] = useState(false)

  // Search & filter
  const [search, setSearch] = useState('')
  const [error, setError] = useState('')

  const allowSearch = false;
  const allowFilter = false;

  // ------ Fetching data ------ //
  const fetchData = async () => {
    setLoading(true)
    setError('')

    try {
      const data = await getAllQuizSets()
      setQuizSets(data)
    } catch (error : any) {
      setQuizSets([])
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // ------ Handle AFTER deletion (update list) ------ //
  const handleDeleted = (deletedId: number) => {
    setQuizSets((prevQuizSets) =>
      prevQuizSets.filter((quizSet) => quizSet.id !== deletedId)
    )
  }

  // ------ Handle AFTER rename (update list) ------ //
  const handleRenamed = () => {
    fetchData()
  }

  // ------ Handle create new quiz set ------ //
  const handleCreateQuizSet = async (title: string) => {
    setIsCreating(true)
    try {
      const createdSet = await createQuizSet({ title })
      setCreationModalOpen(false)
      await fetchData()
    } catch (error) {
      console.error('Failed to create quiz set:', error)
    } finally {
      setIsCreating(false)
    }
  }

  // ------ Filter, search and pagination ------ //
  const filteredData = quizSets.filter(
    (quizSet) =>
      quizSet.title.toLowerCase().includes(search.toLowerCase())
  )

  const pageSize = 12
  const queryConfig = useQueryConfig()
  const setQueryParam = useUpdateQueryParam()
  const currentPage = Number(queryConfig.page) || 1

  const paginatedData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let keyword = e.target.value
    if (keyword.trim() === '') {
      setSearch('')
    } else {
      setSearch(keyword)
    }
  }

  const handlePageChange = (page: number) => {
    setQueryParam('page', String(page))
  }

  return (
    <div className='min-h-screen bg-gray-50 px-4 py-4 overflow-hidden'>
      {/* Header */}
      <AnimatedSection delay={0}>
        <div className='flex items-center justify-between mb-8'>
          {/* Back to previous */}
          <div className='flex items-center justify-between mb-4'>
            <Button variant={'outline'} onClick={nav.toQuizList} className='flex items-center'>
              <CircleChevronLeft className='w-5 h-5' /> Back to Quizzes
            </Button>
          </div>
          <h1 className='text-3xl font-bold text-gray-900 flex items-center gap-2'>Quiz Collection</h1>
          <Button
            className='flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold px-4 py-2 rounded-lg shadow hover:from-blue-600 hover:to-purple-600 transition'
            onClick={() => {
              setCreationModalOpen(true)
            }}
          >
            <Plus className='w-5 h-5' />
            New Collection
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
              className={`w-full sm:w-64 md:w-80 lg:w-96 pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 
              ${!allowSearch ? 'opacity-80 bg-gray-50' : 'bg-white shadow-sm'}
              `}
              disabled={!allowSearch}
            />
          </div>
          <Button variant='outline' className='flex items-center gap-2' disabled={!allowFilter}>
            <Filter className='w-5 h-5' />
            Filter
          </Button>
        </div>
      </AnimatedSection>

      {/* Error State */}
      {error != '' && (
        <AnimatedSection delay={0.2}>
          <div className='bg-red-50 border border-red-200 rounded-lg p-6 mb-6'>
            <div className='flex items-start gap-3'>
              <div className='flex-1'>
                <h3 className='text-red-900 font-semibold mb-1'>Error When Loading Data!</h3>
                <p className='text-red-700 mb-4'>{error}</p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      )}

      {/* Quiz Sets Grid */}
      <AnimatedSection delay={0.2}>
        {loading ? (
          <p className='text-gray-500'>Loading data...</p>
        ) : !error && filteredData.length === 0 ? (
          <div className='text-center text-gray-500 py-16'>
            <Notebook className='w-12 h-12 mx-auto mb-4 text-gray-300' />
            <p className='text-lg'>No collection found. Try a different search or add a collection!</p>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {paginatedData.map((quizSet) => (
              <QuizSetCard
                key={quizSet.id}
                id={quizSet.id}
                originType={quizSet.originType}
                title={quizSet.title}
                onFinishRename={handleRenamed}
                onFinishDelete={() => handleDeleted(quizSet.id)}
              />
            ))}
          </div>
        )}
      </AnimatedSection>

      {/* Pagination */}
      <AnimatedSection delay={0.2}>
        {filteredData.length > pageSize && (
          <Pagination
            total={filteredData.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}
      </AnimatedSection>
      {/* End - Pagination */}

      {/* Create Quiz Set Modal */}
      {creationModalOpen && (
        <QuizSetInfoModal
          isProcessing={isCreating}
          onCancel={() => setCreationModalOpen(false)}
          onConfirm={handleCreateQuizSet}
        />
      )}
      {/* End - Create Quiz Set Modal */}
    </div>
  )
}

export default QuizSetsListPage