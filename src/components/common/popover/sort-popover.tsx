import { SortDesc } from 'lucide-react'
import { useEffect, useState } from 'react'
import GenericPopover from '@/components/common/popover/generic-popover'

export interface SortCriterion {
  value: string
  label: string
}

interface SortPopoverProps {
  criteria: SortCriterion[]
  resetTrigger: boolean
  onApply: (sortBy : string, sortOrder : string) => void
}

const SortPopover = ({ criteria, resetTrigger, onApply } : SortPopoverProps) => {
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  useEffect(() => {
    setSortBy('')
    setSortOrder('desc')
  }, [resetTrigger])

  const handleApply = () => {
    onApply(sortBy, sortOrder)
  }

  return (
    <GenericPopover
      onApply={handleApply}
      display={
        <>
          <SortDesc className="w-5 h-5" />
          Sort
        </>
      }
    >
      {/* Sort Criteria */}
      <div>
        <label className="text-sm font-medium">Sort By</label>
        <select
          className="w-full mt-1 border rounded p-2"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">Select criteria</option>

          {criteria.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      {/* Sort Order */}
      <div>
        <label className="text-sm font-medium">Order</label>
        <select
          className="w-full mt-1 border rounded p-2"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </GenericPopover>
  )
}

export default SortPopover