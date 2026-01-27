import { Eraser, Search } from 'lucide-react'
import FilterPopover, { FilterCriterion } from '@/components/common/popover/filter-popover'
import SortPopover, { SortCriterion } from '@/components/common/popover/sort-popover'
import { Button } from '@/components/ui/button'
import AnimatedSection from '@/components/landing/animated-section'
import { useEffect, useState } from 'react'
import useQuery from '@/hooks/use-query'

interface SearchLayoutProps {
  filterCriteria: FilterCriterion[]
  sortCriteria: SortCriterion[]
}

const SearchLayout = ({ filterCriteria, sortCriteria } : SearchLayoutProps) => {
  const [search, setSearch] = useState('')
  const [resetTrigger, setResetTrigger] = useState(false)
  const { setQuery, removeQuery, clearQuery } = useQuery()

  useEffect(() => {
    const handler = setTimeout(() => {
      if (search.trim() !== "") {
        setQuery("keyword", search)
      } else {
        removeQuery("keyword")
      }
    }, 500)

    return () => clearTimeout(handler)
  }, [search])

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    // let keyword = e.target.value
    // if (keyword.trim() != '') {
    //   setSearch(keyword)
    //   setQuery('keyword', keyword)
    // } else {
    //   setSearch('')
    //   removeQuery('keyword')
    // }
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
    <>
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
    </>
  )
}

export default SearchLayout