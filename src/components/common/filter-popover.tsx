import { Filter } from 'lucide-react'
import GenericPopover from '@/components/common/generic-popover'
import { useEffect, useState } from 'react'

export interface FilterCriterion {
  key: string
  label: string
  inputType: 'date' | 'datetime'
}

interface FilterPopoverProps {
  criteria: FilterCriterion[]
  resetTrigger: boolean
  onApply: (filters: Record<string, string>) => void
}

const FilterPopover = ({ criteria, resetTrigger, onApply }: FilterPopoverProps) => {
  const [values, setValues] = useState<Record<string, string>>({})

  useEffect(() => {
    setValues({})
  }, [resetTrigger])

  const handleChange = (key: string, value: string) => {
    setValues(prev => ({ ...prev, [key]: value }))
  }

  const handleApply = () => {
    onApply(values)
  }

  return (
    <GenericPopover
      onApply={handleApply}
      display={
        <>
          <Filter className="w-5 h-5" />
          Filter
        </>
      }
    >
      {criteria.map(c => (
        <div key={c.key}>
          <label className="text-sm font-medium">{c.label}</label>
          <input
            type={c.inputType}
            className="w-full mt-1 border rounded p-2"
            value={values[c.key] ?? ''}
            onChange={(e) => handleChange(c.key, e.target.value)}
          />
        </div>
      ))}
    </GenericPopover>
  )
}

export default FilterPopover