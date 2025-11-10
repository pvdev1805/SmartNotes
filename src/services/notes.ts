import { Note } from '@/types/note.type'

const baseUrl = 'http://localhost:8080/api/documents/notes'

// Temporary function only
function getJwtToken() {
  return localStorage.getItem('jwtToken') || ''
}

export async function createNote(data: Partial<Note>): Promise<Note | undefined> {
  const jwtToken = getJwtToken();
  const url = `${baseUrl}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${jwtToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: data.title,
      content: data.content
    })
  })

  // Handle response
  const jsonResponse = await response.json()
  if (!response.ok) {
    throw new Error(`Failed to create new note: ${jsonResponse.message}`)
  }
  return jsonResponse.data as Note
}

export async function getAllNotes(): Promise<Note[] | []> {
  const jwtToken = getJwtToken();
  const url = baseUrl;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${jwtToken}`
    }
  })

  // Handle response
  const jsonResponse = await response.json()
  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${jsonResponse.message}`)
  }
  return jsonResponse.data as Note[]
}

export async function getNoteById(id: number): Promise<Note | undefined> {
  const jwtToken = getJwtToken();
  const url = `${baseUrl}/${id}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${jwtToken}`
    }
  })

  // Handle response
  const jsonResponse = await response.json()
  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${jsonResponse.message}`)
  }
  return jsonResponse.data as Note
}

export async function updateNote(id: number, data: Partial<Note>): Promise<Note | undefined> {
  const jwtToken = getJwtToken();
  const url = `${baseUrl}/${id}`;

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${jwtToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: data.title,
      content: data.content
    })
  })

  // Handle response
  const jsonResponse = await response.json()
  if (!response.ok) {
    throw new Error(`Failed to update data: ${jsonResponse.message}`)
  }
  return jsonResponse.data as Note
}

export async function deleteNoteById(id: number) {
  const jwtToken = getJwtToken();
  const url = `${baseUrl}/${id}`;

  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${jwtToken}`
    }
  })

  // Handle response
  const jsonResponse = await response.json()
  if (!response.ok) {
    throw new Error(`Failed to delete data: ${jsonResponse.message}`)
  }
}