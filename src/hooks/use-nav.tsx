'use client'

import { useRouter } from 'next/navigation'

export const ROUTES = {
  HOME: '/',
  QUIZ: {
    LIST: '/quizzes',
    COLLECTION: '/quizzes/collections',
    COLLECTION_CREATION: '/quizzes/collections/new',
    GENERATION: '/quizzes/generation',
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
    toQuizCollection: () => router.push(ROUTES.QUIZ.COLLECTION),
    toQuizCollectionCreation: () => router.push(ROUTES.QUIZ.COLLECTION_CREATION),
    toQuizGeneration: () => router.push(ROUTES.QUIZ.GENERATION),
    toQuiz: (id: number | undefined) => router.push(ROUTES.QUIZ.DETAIL(id)),
    toNewQuizAttempt: (qid: number | undefined, aid: number | undefined) => router.push(ROUTES.QUIZ.ATTEMPT_DETAIL(qid, aid))
  }
}
