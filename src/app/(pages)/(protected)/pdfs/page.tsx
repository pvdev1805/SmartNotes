'use client'

import AnimatedList from '@/components/animations/animated-list'
import FadeInItem from '@/components/animations/fade-in-item'
import FadeInSection from '@/components/animations/fade-in-section'
import Pagination from '@/components/pagination'
import PDFItem from '@/components/PDFs/PDFItem'
import { Button } from '@/components/ui/button'
import { pdfs } from '@/data/pdfs'
import useQueryConfig from '@/hooks/use-query-config'
import useUpdateQueryParam from '@/hooks/use-update-query-param'
import { BookOpenText, Filter, Notebook, Plus, Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const PDFListPage = () => {
  const router = useRouter()

  const [search, setSearch] = useState('')

  const filteredPdfs = pdfs.filter((pdf) => pdf.fileName.toLowerCase().includes(search.toLowerCase()))

  const pageSize = 6
  const queryConfig = useQueryConfig()
  const setQueryParam = useUpdateQueryParam()
  const currentPage = Number(queryConfig.page) || 1

  const paginatedPdfs = filteredPdfs.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let keyword = event.target.value
    if (keyword.trim() === '') {
      setSearch('')
    } else {
      setSearch(keyword)
    }

    // Reset to first page on new search
    if (currentPage !== 1) {
      setQueryParam('page', '1')
    }
  }

  const handlePageChange = (page: number) => {
    setQueryParam('page', String(page))
  }

  return (
    <div className='min-h-screen bg-gray-50 px-4 py-4 overflow-hidden'>
      {/* Header */}
      <FadeInSection>
        <div className='flex items-center justify-between mb-8'>
          <h1 className='text-3xl font-bold text-gray-900 flex items-center gap-2'>
            <BookOpenText className='w-7 h-7 text-blue-600' />
            My PDFs
          </h1>
          <Button
            className='flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold px-4 py-2 rounded-lg shadow transition'
            onClick={() => router.push('/pdfs/new')}
          >
            <Plus className='w-5 h-5' />
            New PDF
          </Button>
        </div>
      </FadeInSection>
      {/* End - Header */}

      {/* Search & Filter */}
      <FadeInSection>
        <div className='flex items-center gap-4 mb-6'>
          <div className='relative'>
            <Search className='absolute left-3 top-3 text-gray-400 w-5 h-5' />
            <input
              type='text'
              placeholder='Search pdfs...'
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
      </FadeInSection>
      {/* End - Search & Filter */}

      {/* PDF Grid */}
      <FadeInSection>
        {filteredPdfs.length === 0 ? (
          <div className='text-center text-gray-500 py-16'>
            <Notebook className='w-12 h-12 mx-auto mb-4 text-gray-300' />
            <p className='text-lg'>No PDFs found. Try a different search or add a new PDF!</p>
          </div>
        ) : (
          <AnimatedList className='flex items-center flex-wrap gap-4'>
            {paginatedPdfs.map((pdf) => (
              <FadeInItem key={pdf.id}>
                <PDFItem
                  fileName={pdf.fileName}
                  size={pdf.size}
                  downloadUrl={pdf.downloadUrl}
                  createdAt={pdf.uploadedAt}
                />
              </FadeInItem>
            ))}
          </AnimatedList>
        )}
      </FadeInSection>

      {/* Pagination */}
      <FadeInSection>
        {filteredPdfs.length > pageSize && (
          <Pagination
            total={filteredPdfs.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}
      </FadeInSection>
      {/* End - Pagination */}
    </div>
  )
}

export default PDFListPage
