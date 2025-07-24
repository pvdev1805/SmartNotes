'use client'
import useQueryParams from '@/hooks/use-query-params'
import { NoteListConfig } from '@/types/note.type'

export type QueryConfig = {
  [key in keyof NoteListConfig]: string
}

const useQueryConfig = () => {
  const queryParams: QueryConfig = useQueryParams()

  const queryConfigInput: QueryConfig = {
    page: queryParams.page || '1',
    limit: queryParams.limit || undefined,
    sortBy: queryParams.sortBy || undefined,
    sortOrder: queryParams.sortOrder || undefined,
    searchQuery: queryParams.searchQuery || undefined
  }

  const queryConfig: QueryConfig = Object.fromEntries(
    Object.entries(queryConfigInput).filter(([_, value]) => value !== undefined)
  ) as QueryConfig

  return queryConfig
}

export default useQueryConfig
