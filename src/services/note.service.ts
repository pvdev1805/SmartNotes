import { Note, NoteUpdateRequest } from '@/types/note.type'
import apiClient from '@/apis/api-client'
import { ApiResponse, UserResponse } from '@/types/auth.type'

const NOTE_BASE_API = '/documents/notes'

export const createNote = async (request: NoteUpdateRequest): Promise<Note> => {
  const response = await apiClient.post(`${NOTE_BASE_API}`,  request)
  const apiRes: ApiResponse<Note> = response.data

  if (!apiRes.data && apiRes.code != 1000) {
    throw new Error(`Failed to update data: ${apiRes.message}`)
  }
  return apiRes.data
}

export const getAllNotes = async (): Promise<Note[]> => {
  const response = await apiClient.get(`${NOTE_BASE_API}`)
  const apiRes: ApiResponse<Note[]> = response.data

  if (!apiRes.data && apiRes.code != 1000) {
    throw new Error(`Failed to update data: ${apiRes.message}`)
  }
  return apiRes.data
}

export const getNoteById = async (id: number): Promise<Note> => {
  const response = await apiClient.get(`${NOTE_BASE_API}/${id}`)
  const apiRes: ApiResponse<Note> = response.data

  if (!apiRes.data && apiRes.code != 1000) {
    throw new Error(`Failed to update data: ${apiRes.message}`)
  }
  return apiRes.data
}

export const updateNote = async (id: number, request: NoteUpdateRequest): Promise<Note> => {
  const response = await apiClient.patch(`${NOTE_BASE_API}/${id}`, request)
  const apiRes: ApiResponse<Note> = response.data

  if (!apiRes.data && apiRes.code != 1000) {
    throw new Error(`Failed to update data: ${apiRes.message}`)
  }
  return apiRes.data
}

export const deleteNoteById = async (id: number) => {
  const response = await apiClient.delete(`${NOTE_BASE_API}/${id}`)
  const apiRes: ApiResponse<Note> = response.data

  if (!apiRes.data && apiRes.code != 1000) {
    throw new Error(`Failed to update data: ${apiRes.message}`)
  }
}