'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

import { flashcards as flashcardsData } from '@/data/flashcards'
import AnimatedSection from '@/components/landing/animated-section'
import Pagination from '@/components/pagination'
import Flashcard from '@/components/flashcards/flashcard'
import useQueryConfig from '@/hooks/use-query-config'
import useUpdateQueryParam from '@/hooks/use-update-query-param'
import { BookText, Diamond, Notebook, Plus, Search } from 'lucide-react'
import { Flashcard as FlashcardType } from '@/types/flashcard.type'
import Link from 'next/link'

const PAGE_SIZE = 6

const FlashcardsPage = () => {
  const router = useRouter()
  const [flashcards, setFlashcards] = useState<FlashcardType[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      // Simulate fetching
      await new Promise((resolve) => {
        setTimeout(() => {
          setFlashcards(flashcardsData)
          resolve(null)
        }, 500)
      })
      setLoading(false)
    }
    fetchData()
  }, [])

  // Filter flashcards by search
  const filteredFlashcards = flashcards.filter(
    (card) =>
      card.question.toLowerCase().includes(search.toLowerCase()) ||
      card.answer.toLowerCase().includes(search.toLowerCase())
  )

  // Pagination logic
  const queryConfig = useQueryConfig()
  const setQueryParam = useUpdateQueryParam()
  const currentPage = Number(queryConfig.page) || 1
  const paginatedFlashcards = filteredFlashcards.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

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

  const handleAddFlashcard = () => {
    router.push('/flashcards/new')
  }

  const handleViewCollections = () => {
    router.push('/collections')
  }

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-screen bg-gray-50'>
        <div className='text-lg text-gray-500'>Loading...</div>
      </div>
    )
  }

  return (
    <div className='min-h-screen flex flex-col items-center bg-gray-50 px-4 py-4'>
      <div className='w-full'>
        <AnimatedSection delay={0}>
          <div className='flex items-center justify-between mb-4'>
            <div className='flex flex-col'>
              <h1 className='text-2xl font-bold text-gray-900'>
                <Diamond className='w-7 h-7 text-emerald-500 inline-block mr-2' />
                Flashcards
              </h1>
              <p className='text-gray-600 text-sm md:text-base lg:text-lg max-w-2xl leading-relaxed'>
                Study with your interactive flashcards
              </p>
            </div>

            <div className='flex gap-2'>
              <Button variant='outline' onClick={handleViewCollections}>
                View Collections
              </Button>
              <Button
                className='flex items-center gap-2 bg-gradient-to-r from-emerald-400 to-teal-600 text-white font-semibold px-4 py-2 rounded-lg shadow hover:from-emerald-500 hover:to-teal-700 transition'
                onClick={handleAddFlashcard}
              >
                <Plus className='w-5 h-5' />
                New Flashcard
              </Button>
            </div>
          </div>
        </AnimatedSection>

        {/* Search Input */}
        <AnimatedSection delay={0.1}>
          <div className='flex items-center mb-6'>
            <div className='relative'>
              <Search className='absolute left-3 top-3 text-gray-400 w-5 h-5' />
              <input
                type='text'
                placeholder='Search flashcards...'
                value={search}
                onChange={handleSearchInputChange}
                className='w-full sm:w-64 md:w-80 lg:w-96 pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white shadow-sm'
              />
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          {paginatedFlashcards.length === 0 ? (
            <div className='text-center text-gray-500 py-16'>
              <Notebook className='w-12 h-12 mx-auto mb-4 text-gray-300' />
              <p className='text-lg'>No flashcards found.</p>
            </div>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {paginatedFlashcards.map((card) => (
                <Link key={card.id} href={`/flashcards/${card.id}`}>
                  <Flashcard
                    id={card.id}
                    question={card.question}
                    answer={card.answer}
                    collections={card.collections}
                  />
                </Link>
              ))}
            </div>
          )}
        </AnimatedSection>

        {/* Pagination */}
        <AnimatedSection delay={0.2}>
          {filteredFlashcards.length > 0 && (
            <Pagination
              total={filteredFlashcards.length}
              pageSize={PAGE_SIZE}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          )}
        </AnimatedSection>
      </div>
    </div>
  )
}

export default FlashcardsPage
