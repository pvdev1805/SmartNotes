import { PageInfo } from '@/types/util.type'

export interface Note {
  id: number
  title: string
  content: string
  createdAt: string
  updatedAt: string
  tags?: string[]
  // isPinned?: boolean
}

export interface NoteUpsertRequest {
  title: string
  content: string
}

// Pagination
export interface NotePage {
  pageData: Note[]
  pageInfo: PageInfo
}

export interface NoteListConfig {
  page?: number | string
  limit?: number | string
  sortBy?: 'createdAt' | 'updatedAt' | 'title'
  sortOrder?: 'asc' | 'desc'
  searchQuery?: string
}
