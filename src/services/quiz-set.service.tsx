import { QuizSet } from '@/types/quiz-set.type'

const baseUrl = 'http://localhost:8080/api/quiz-sets'

// Temporary function only
function getJwtToken() {
  return localStorage.getItem('jwtToken') || ''
}

export async function getDefaultQuizSet(): Promise<QuizSet | undefined> {
  const jwtToken = getJwtToken();
  const url = `${baseUrl}/default`;

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
  return jsonResponse.data as QuizSet
}

export async function getAllQuizSets(): Promise<QuizSet[] | []> {
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
  return jsonResponse.data as QuizSet[]
}