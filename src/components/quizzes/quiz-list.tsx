'use client'

import AnimatedSection from '@/components/landing/animated-section'
import { Notebook } from 'lucide-react'
import { FilterCriterion } from '@/components/common/popover/filter-popover'
import { SortCriterion } from '@/components/common/popover/sort-popover'
import QuizCard from '@/components/quizzes/quiz-card'
import FadeInSection from '@/components/animations/fade-in-section'
import Pagination from '@/components/pagination'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import useQuery from '@/hooks/use-query'
import { PageInfo } from '@/types/util.type'
import { Quiz } from '@/types/quiz.type'
import { getAllQuizzes } from '@/services/quiz.service'
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

interface QuizListProps {
  heading?: string
  quizSetId?: number
  reloadTrigger?: boolean | false
}

const QuizList = ({ heading, quizSetId, reloadTrigger } : QuizListProps) => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  const [page, setPage] = useState<PageInfo>({ currentPage: 1, pageSize: 6, totalPages: 0, totalElements: 0 })

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const searchParams = useSearchParams()
  const { setQuery } = useQuery()

  // ------ Fetching data (quizzes) ------ //
  const fetchData = async (pageNum: number) => {
    if (quizSetId) setQuery('quizSetId', quizSetId);

    setLoading(true)
    setError('')

    try {
      const data = await getAllQuizzes(
        pageNum,
        page.pageSize,
        quizSetId ? `quizSetId=${quizSetId}&${searchParams.toString()}` : searchParams.toString()
      )
      setQuizzes(data.pageData)
      setPage(data.pageInfo)
    } catch (error : any) {
      setQuizzes([])
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData(page.currentPage)
  }, [searchParams, reloadTrigger])

  // ------ Handle AFTER deletion (update list) ------ //
  const handleDeleted = (deletedId: number) => {
    setQuizzes((prevQuizzes) => prevQuizzes.filter((quiz) => quiz.id !== deletedId))
  }

  // ------ Handle AFTER renamed (update list) ------ //
  const handleCollectionChanged = () => {
    fetchData(page.currentPage)
  }

  // ------ Pagination ------ //
  const handlePageChange = (pageNumber: number) => {
    setPage((prevState) => ({ ...prevState, currentPage: pageNumber }))
    setQuery('page', pageNumber)
  }

  return (
    <>
      <h2 className='text-xl font-semibold text-foreground mb-3'>{heading ? heading : "Quizzes"}</h2>

      {/* Search & Filter */}
      <SearchLayout filterCriteria={filterCriteria} sortCriteria={sortCriteria} />

      {/* Error State */}
      <ErrorBlock errorMessage={error} />

      {/* Quizzes Grid */}
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
    </>
  )
}

export default QuizList