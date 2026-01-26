'use client'
import { useEffect, useState } from 'react'
import { Plus, Search, Filter, Notebook, CircleChevronLeft, Folder } from 'lucide-react'
import { Button } from '@/components/ui/button'
import AnimatedSection from '@/components/landing/animated-section'
import Pagination from '@/components/pagination'
import useQueryConfig from '@/hooks/use-query-config'
import useUpdateQueryParam from '@/hooks/use-update-query-param'

import { getQuizSet } from '@/services/quiz-set.service'
import { QuizSet } from '@/types/quiz-set.type'
import { useNav } from '@/hooks/use-nav'
import { useParams, useSearchParams } from 'next/navigation'
import { Quiz } from '@/types/quiz.type'
import QuizCard from '@/components/quizzes/quiz-card'
import { FilterCriterion } from '@/components/common/filter-popover'
import { SortCriterion } from '@/components/common/sort-popover'
import useQuery from '@/hooks/use-query'
import { PageInfo } from '@/types/util.type'
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

const QuizSetPage = () => {
  const nav = useNav()
  const { setId } = useParams()

  const [quizSet, setQuizSet] = useState<QuizSet | null>(null)
  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  const [page, setPage] = useState<PageInfo>({ currentPage: 1, pageSize: 6, totalPages: 0, totalElements: 0 })

const allowSearch = true;
  const allowFilter = true;

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  const [search, setSearch] = useState('')
  const [resetTrigger, setResetTrigger] = useState(false)
  const searchParams = useSearchParams()
  const { setQuery, removeQuery, clearQuery } = useQuery()

  const fetchData = async (id: number) => {
    setLoading(true)
    setError('')

    try {
      const data = await getQuizSet(id)
      setQuizSet(data)
      if (data.quizzes) {
        setQuizzes(data.quizzes)
      } else {
        setQuizzes([])
      }
    } catch (error : any) {
      setQuizSet(null)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData(Number(setId))
  }, [])

  useEffect(() => {

  })

  const filteredData = quizzes.filter(
    (quiz) =>
      quiz.title.toLowerCase().includes(search.toLowerCase())
  )

  const pageSize = 6
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

  const removeQuizFromList = (deletedId: number) => {
    setQuizzes((prevQuizzes) => prevQuizzes.filter((quizSet) => quizSet.id !== deletedId))
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
          <h1 className='text-3xl font-bold text-gray-900 flex items-center gap-2'>
            {quizSet?.originType === "DEFAULT" ? "DEFAULT" : (quizSet?.title || "Quiz Collection")}
          </h1>
          <div className='flex gap-2'>
            <Button variant='outline' onClick={nav.toQuizCollectionList}>
              <Folder className='text-gray-400' />
              Collections
            </Button>
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
          <p className="text-gray-500">Loading data...</p>
        ) : !error && filteredData.length === 0 ? (
          <div className='text-center text-gray-500 py-16'>
            <Notebook className='w-12 h-12 mx-auto mb-4 text-gray-300' />
            <p className='text-lg'>No quizzes found. Create new quiz and add it to this collection.</p>
          </div>
        ) : (
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
                onFinishCollectionChange={() => {return;}}
                onFinishDelete={() => {return;}}
              />
            ))}
          </div>
        )}
      </AnimatedSection>

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

export default QuizSetPage