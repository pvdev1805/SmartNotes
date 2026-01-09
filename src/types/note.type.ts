import { PageInfo } from '@/types/util.type'

export interface Note {
  id: number
  title: string
  content: string
  createdAt: string
  updatedAt?: string
  tags?: string[]
  // isPinned?: boolean
}

export interface NoteUpdateRequest {
  title: string
  content: string
}

export interface NotePage {
  pageData: Note[]
  pageInfo: PageInfo
}

// export interface NoteList {
//   notes: Note[]
//   pagination: {
//     currentPage: number
//     limit: number
//     totalPages: number
//   }
// }

export interface NoteListConfig {
  page?: number | string
  limit?: number | string
  sortBy?: 'createdAt' | 'updatedAt' | 'title'
  sortOrder?: 'asc' | 'desc'
  searchQuery?: string
}
