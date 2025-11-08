export interface Document {
  id: number
  title: string
  content: string
  createdAt: string
  updatedAt?: string
  tags?: string[]
  isPinned?: boolean

  type: 'NOTE' | 'PDF'
  originType: 'USER' | 'AI'
}

export type Note = Document

export interface NoteList {
  notes: Note[]
  pagination: {
    currentPage: number
    limit: number
    totalPages: number
  }
}

export interface NoteListConfig {
  page?: number | string
  limit?: number | string
  sortBy?: 'createdAt' | 'updatedAt' | 'title'
  sortOrder?: 'asc' | 'desc'
  searchQuery?: string
}
