'use client'
import { useEffect, useState } from 'react'
import { Plus, Search, Notebook, Eraser } from 'lucide-react'
import { Button } from '@/components/ui/button'
import AnimatedSection from '@/components/landing/animated-section'
import Pagination from '@/components/pagination'
import QuizCard from '@/components/quizzes/quiz-card'

import { Quiz } from '@/types/quiz.type'
import { getRecentQuizSets } from '@/services/quiz-set.service'
import { useNav } from '@/hooks/use-nav'
import { getAllQuizzes } from '@/services/quiz.service'
import { QuizSet } from '@/types/quiz-set.type'
import QuizSetCard from '@/components/quizzes/quiz-set-card'
import { PageInfo } from '@/types/util.type'
import { useSearchParams } from 'next/navigation'
import useQuery from '@/hooks/use-query'
import AnimatedList from '@/components/animations/animated-list'
import FilterPopover, { FilterCriterion } from '@/components/common/filter-popover'
import SortPopover, { SortCriterion } from '@/components/common/sort-popover'
import FadeInSection from '@/components/animations/fade-in-section'

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

const QuizzesListPage = () => {
  const nav = useNav()

  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  const [page, setPage] = useState<PageInfo>({ currentPage: 1, pageSize: 6, totalPages: 0, totalElements: 0 })

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [quizSets, setQuizSets] = useState<QuizSet[]>([])
  const [quizSetLoading, setQuizSetLoading] = useState(true)

  const [search, setSearch] = useState('')
  const [resetTrigger, setResetTrigger] = useState(false)
  const searchParams = useSearchParams()
  const { setQuery, removeQuery, clearQuery } = useQuery()

  // ------ Fetching data (quizzes and quiz sets) ------ //
  // Fetch quizzes
  const fetchData = async (pageNum: number) => {
    setLoading(true)
    setError('')

    try {
      const data = await getAllQuizzes(pageNum, page.pageSize, searchParams.toString())
      setQuizzes(data.pageData)
      setPage(data.pageInfo)
    } catch (error : any) {
      setQuizzes([])
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  // Fetch collections (quiz sets)
  const fetchCollections = async () => {
    setQuizSetLoading(true)
    try {
      const data = await getRecentQuizSets()
      setQuizSets(data.pageData)
    } catch (error: any) {
      console.error('Failed to load collections:', error)
    } finally {
      setQuizSetLoading(false)
    }
  }

  useEffect(() => {
    fetchData(page.currentPage)
    fetchCollections()
  }, [searchParams])

  // ------ Handle AFTER deletion (update list) ------ //
  const handleDeleted = (deletedId: number) => {
    setQuizzes((prevQuizzes) => prevQuizzes.filter((quiz) => quiz.id !== deletedId))
  }

  // ------ Handle AFTER renamed (update list) ------ //
  const handleQuizSetRenamed = () => {
    fetchCollections()
  }

  // ------ Handle AFTER renamed (update list) ------ //
  const handleCollectionChanged = () => {
    fetchData(page.currentPage)
  }

  // ------ Handle AFTER deletion (update list) ------ //
  const handleQuizSetDeleted = (deletedId: number) => {
    // Delete a quiz set may result in deleting all quizzes in it
    fetchData(page.currentPage)
    fetchCollections()
  }

  // ------ Filter, search and pagination ------ //
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
    <div className='min-h-screen bg-gray-50 px-4 py-4 overflow-hidden'>
      {/* Header */}
      <AnimatedSection delay={0}>
        <div className='flex items-center justify-between mb-8'>
          <h1 className='text-3xl font-bold text-gray-900 flex items-center gap-2'>
            <Notebook className='w-7 h-7 text-blue-600' />
            Quizzes
          </h1>

          <div className='flex gap-2'>
            <Button
              className='flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold px-4 py-2 rounded-lg shadow hover:from-blue-600 hover:to-purple-600 transition'
              onClick={nav.toQuizGeneration}
            >
              <Plus className='w-5 h-5' />
              Generate
            </Button>
          </div>
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
              placeholder='Search quiz...'
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
      </AnimatedSection>

      {/* Error State */}
      {error != '' && (
        <AnimatedSection delay={0.2}>
          <div className='bg-red-50 border border-red-200 rounded-lg p-6 mb-6'>
            <div className='flex items-start gap-3'>
              <div className='flex-1'>
                <h3 className='text-red-900 font-semibold mb-1'>Error Loading Quizzes</h3>
                <p className='text-red-700 mb-4'>{error}</p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      )}

      {/* Collection Grid */}
      <AnimatedSection delay={0.2} className='mb-6'>
        <div className='flex items-center justify-between mb-3'>
          <h2 className='text-xl font-semibold text-gray-900'>Recent Quiz Sets</h2>
          <Button
            variant='ghost'
            size='sm'
            className='text-blue-600 hover:text-blue-700'
            onClick={nav.toQuizCollectionList}
          >
            View All
          </Button>
        </div>

        {quizSetLoading ? (
          <div className='gap-3  pb-2'>
            {[1, 2, 3].map((i) => (
              <div key={i}>
                <div className='h-20 w-40 bg-gray-200 rounded-lg'></div>
              </div>
            ))}
          </div>
        ) : !error && quizSets.length === 0 ? (
          <div className='text-center text-gray-500 py-16'>
            <Notebook className='w-12 h-12 mx-auto mb-4 text-gray-300' />
            <p className='text-lg'>No collection found.</p>
          </div>
        ) : (
          <AnimatedList className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3'>
            {quizSets.map((quizSet) => (
              <QuizSetCard
                key={quizSet.id}
                id={quizSet.id}
                originType={quizSet.originType}
                title={quizSet.title}
                onFinishRename={handleQuizSetRenamed}
                onFinishDelete={() => handleQuizSetDeleted(quizSet.id)}
              />
            ))}
          </AnimatedList>
        )}
      </AnimatedSection>
      {/* END: Collections Grid */}

      {/* Quizzes Grid */}
      <h2 className='text-xl font-semibold text-foreground mb-3'>Recent Quizzes</h2>
      <AnimatedSection delay={0.2}>
        {loading ? (
          <p className='text-gray-500'>Loading quizzes...</p>
        ) : !error && quizzes.length === 0 ? (
          <div className='text-center text-gray-500 py-16'>
            <Notebook className='w-12 h-12 mx-auto mb-4 text-gray-300' />
            <p className='text-lg'>No quiz found. Try a different search or generate new quiz!</p>
          </div>
        ) : (
          <section className='mb-4 space-y-4'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {quizzes.map((quiz) => (
                <QuizCard
                  key={quiz.id}
                  id={quiz.id}
                  title={quiz.title}
                  quizSetId={quiz.quizSetId}
                  totalQuestions={quiz.questions?.length}
                  createdAt={new Date(quiz.createdAt)}
                  updatedAt={new Date(quiz.updatedAt)}
                  onFinishCollectionChange={handleCollectionChanged}
                  onFinishDelete={() => handleDeleted(quiz.id)}
                />
              ))}
            </div>
          </section>
        )}
      </AnimatedSection>
      {/* End - Quizzes Grid */}

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
    </div>
  )
}

export default QuizzesListPage