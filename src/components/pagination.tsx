import { ChevronLeft, ChevronRight } from 'lucide-react'
import { getPagination } from '@/utils/pagination'

interface PaginationProps {
  total: number
  pageSize: number
  currentPage: number
  onPageChange: (page: number) => void
}

const Pagination = ({ total, pageSize, currentPage, onPageChange }: PaginationProps) => {
  const totalPages = Math.ceil(total / pageSize)
  const pages = getPagination(currentPage, totalPages)

  return (
    <nav className='flex items-center justify-center gap-2 mt-8'>
      <button
        className='px-2 py-1 rounded border bg-white text-black disabled:opacity-50'
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label='Previous page'
      >
        <ChevronLeft className='w-4 h-4' />
      </button>
      {pages.map((page, idx) =>
        typeof page === 'number' ? (
          <button
            key={page}
            className={`px-3 py-1 rounded border transition
              ${
                page === currentPage
                  ? 'bg-blue-600 text-white font-bold border-blue-600'
                  : 'bg-white text-black border-gray-300 hover:bg-blue-50'
              }
            `}
            onClick={() => onPageChange(page)}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </button>
        ) : (
          <span key={`ellipsis-${idx}`} className='px-2 py-1 text-gray-400 select-none'>
            ...
          </span>
        )
      )}
      <button
        className='px-2 py-1 rounded border bg-white text-black disabled:opacity-50'
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label='Next page'
      >
        <ChevronRight className='w-4 h-4' />
      </button>
    </nav>
  )
}

export default Pagination
