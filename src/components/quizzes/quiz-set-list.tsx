'use client'

import AnimatedSection from '@/components/landing/animated-section'
import { Notebook } from 'lucide-react'
import { FilterCriterion } from '@/components/common/popover/filter-popover'
import { SortCriterion } from '@/components/common/popover/sort-popover'
import QuizSetCard from '@/components/quizzes/quiz-set-card'
import FadeInSection from '@/components/animations/fade-in-section'
import Pagination from '@/components/pagination'
import { useEffect, useState } from 'react'
import { QuizSet } from '@/types/quiz-set.type'
import { PageInfo } from '@/types/util.type'
import { useSearchParams } from 'next/navigation'
import useQuery from '@/hooks/use-query'
import { getAllQuizSets } from '@/services/quiz-set.service'
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

interface QuizSetListProps {
  reloadTrigger?: boolean
}

const QuizSetList = ({ reloadTrigger } : QuizSetListProps) => {
  const [quizSets, setQuizSets] = useState<QuizSet[]>([])
  const [page, setPage] = useState<PageInfo>({ currentPage: 1, pageSize: 12, totalPages: 0, totalElements: 0 })

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Search & filter
  const searchParams = useSearchParams()
  const { setQuery } = useQuery()

  // ------ Fetching data ------ //
  const fetchData = async (pageNum: number) => {
    setLoading(true)
    setError('')

    try {
      const data = await getAllQuizSets(pageNum, page.pageSize, searchParams.toString())
      setQuizSets(data.pageData)
      setPage(data.pageInfo)
    } catch (error : any) {
      setQuizSets([])
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
    setQuizSets((prevQuizSets) => prevQuizSets.filter((quizSet) => quizSet.id !== deletedId))
  }

  // ------ Handle AFTER rename (update list) ------ //
  const handleRenamed = () => {
    fetchData(page.currentPage)
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

      {/* Quiz Sets Grid */}
      <AnimatedSection delay={0.2}>
        {loading ? (
          <p className='text-gray-500'>Loading data...</p>
        ) : !error && quizSets.length === 0 ? (
          <div className='text-center text-gray-500 py-16'>
            <Notebook className='w-12 h-12 mx-auto mb-4 text-gray-300' />
            <p className='text-lg'>No collection found. Try a different search or add a collection!</p>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {quizSets.map((quizSet) => (
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

export default QuizSetList