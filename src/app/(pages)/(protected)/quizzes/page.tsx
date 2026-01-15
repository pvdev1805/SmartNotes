'use client'
import { useEffect, useState } from 'react'
import { Plus, Search, Filter, Notebook } from 'lucide-react'
import { Button } from '@/components/ui/button'
import AnimatedSection from '@/components/landing/animated-section'
import Pagination from '@/components/pagination'
import useQueryConfig from '@/hooks/use-query-config'
import useUpdateQueryParam from '@/hooks/use-update-query-param'
import QuizCard from '@/components/quizzes/quiz-card'

import { Quiz } from '@/types/quiz.type'
import { getAllQuizSets } from '@/services/quiz-set.service'
import { useNav } from '@/hooks/use-nav'
import { getAllQuizzes } from '@/services/quiz.service'
import { QuizSet } from '@/types/quiz-set.type'
import QuizSetCard from '@/components/quizzes/quiz-set-card'

const QuizzesListPage = () => {
  const nav = useNav()

  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  const [loading, setLoading] = useState(true)

  const [quizSets, setQuizSets] = useState<QuizSet[]>([])
  const [quizSetLoading, setQuizSetLoading] = useState(true)

  // Search & filter
  const [search, setSearch] = useState('')
  const [error, setError] = useState('')

  const allowSearch = false;
  const allowFilter = false;

  // ------ Fetching data (quizzes and quiz sets) ------ //
  // Fetch quizzes
  const fetchData = async () => {
    setLoading(true)
    setError('')

    try {
      const data = await getAllQuizzes()
      setQuizzes(data)
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
      const data = await getAllQuizSets()
      setQuizSets(data)
    } catch (error: any) {
      console.error('Failed to load collections:', error)
    } finally {
      setQuizSetLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
    fetchCollections()
  }, [])


  // ------ Handle AFTER deletion (update list) ------ //
  const handleDeleted = (deletedId: number) => {
    setQuizzes((prevQuizzes) => prevQuizzes.filter((quiz) => quiz.id !== deletedId))
  }

  // ------ Handle AFTER renamed (update list) ------ //
  const handleQuizSetRenamed = () => {
    fetchCollections()
  }

  // ------ Handle AFTER deletion (update list) ------ //
  const handleQuizSetDeleted = (deletedId: number) => {
    // Delete a quiz set may result in deleting all quizzes in it
    fetchData()
    fetchCollections()
  }

  // ------ Filter, search and pagination ------ //
  const filteredData = quizzes.filter(
    (quizSet) =>
      quizSet.title.toLowerCase().includes(search.toLowerCase())
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
              placeholder='Search quizzes...'
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
                <h3 className='text-red-900 font-semibold mb-1'>Error Loading Quizzes</h3>
                <p className='text-red-700 mb-4'>{error}</p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      )}

      {/* Collection Grid */}
      {/* ADD: Collections Section */}
      <AnimatedSection delay={0.2}>
        <div className='mb-6'>
          <div className='flex items-center justify-between mb-3'>
            <h2 className='text-xl font-semibold text-gray-900'>Collections / Quiz Sets</h2>
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
          ) : (
            <div>
              <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3'>
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

                {/* Add New Collection Button */}
                {/*<div*/}
                {/*  onClick={nav.toQuizCollectionList}*/}
                {/*  className='flex-shrink-0 min-w-[160px] p-4 rounded-lg border-2 border-dashed border-gray-300*/}
                {/*  bg-gray-50 hover:border-blue-400 hover:bg-blue-50 cursor-pointer transition-all duration-200*/}
                {/*  flex items-center justify-center'*/}
                {/*>*/}
                {/*  <Plus className='text-gray-400'></Plus>*/}
                {/*</div>*/}
              </div>
            </div>
          )}
        </div>
      </AnimatedSection>
      {/* END: Collections Section */}

      {/* Quizzes Grid */}
      <h2 className='text-xl font-semibold text-foreground mb-3'>Recent Quizzes</h2>
      <AnimatedSection delay={0.2}>
        {loading ? (
          <p className='text-gray-500'>Loading quizzes...</p>
        ) : !error && filteredData.length === 0 ? (
          <div className='text-center text-gray-500 py-16'>
            <Notebook className='w-12 h-12 mx-auto mb-4 text-gray-300' />
            <p className='text-lg'>No quiz found. Try a different search or generate new quiz!</p>
          </div>
        ) : (
          <section className='mb-4 space-y-4'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {paginatedData.map((quiz) => (
                <QuizCard
                  key={quiz.id}
                  id={quiz.id}
                  title={quiz.title}
                  quizSetId={quiz.quizSetId}
                  totalQuestions={quiz.questions?.length}
                  createdAt={new Date(quiz.createdAt)}
                  onFinishCollectionChange={() => {}}
                  onFinishDelete={() => handleDeleted(quiz.id)}
                />
              ))}
            </div>
          </section>
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
    </div>
  )
}

export default QuizzesListPage