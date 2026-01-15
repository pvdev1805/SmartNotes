'use client'

import { useRouter } from 'next/navigation'

export const ROUTES = {
  HOME: '/',
  QUIZ: {
    LIST: '/quizzes',
    COLLECTION: (id: number | undefined) => `/quizzes/collections/${id}`,
    COLLECTION_LIST: '/quizzes/collections',
    GENERATION: '/quizzes/generation',
    GENERATION_FROM_NOTE: '/quizzes/generation/note',
    DETAIL: (id: number | undefined) => `/quizzes/${id}`,
    ATTEMPT_DETAIL: (qid: number | undefined, aid: number | undefined) => `/quizzes/${qid}/attempts/${aid}`,
    ATTEMPT_RESULT: (qid: number, aid: number) => `/quizzes/${qid}/attempts/${aid}/result`,
  }
}

export const useNav = () => {
  const router = useRouter()

  return {
    toHome: () => router.push(ROUTES.HOME),
    toQuizList: () => router.push(ROUTES.QUIZ.LIST),
    toQuizCollection: (id: number) => router.push(ROUTES.QUIZ.COLLECTION(id)),
    toQuizCollectionList: () => router.push(ROUTES.QUIZ.COLLECTION_LIST),
    toQuizGeneration: () => router.push(ROUTES.QUIZ.GENERATION),
    toQuizGenerationFromNote: () => router.push(ROUTES.QUIZ.GENERATION_FROM_NOTE),
    toQuiz: (id: number | undefined) => router.push(ROUTES.QUIZ.DETAIL(id)),
    toNewQuizAttempt: (qid: number | undefined, aid: number | undefined) => router.push(ROUTES.QUIZ.ATTEMPT_DETAIL(qid, aid)),
    refresh: () => router.refresh()
  }
}
