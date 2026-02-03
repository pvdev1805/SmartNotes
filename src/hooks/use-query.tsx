'use client'
import { useRouter, useSearchParams } from 'next/navigation'

const useQuery = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  let params = new URLSearchParams(searchParams.toString())

  const setQuery = (key: string, value: string | number) => {
    params.set(key, String(value))
    router.push(`?${params.toString()}`)
  }

  const removeQuery = (key: string) => {
    params.delete(key)
    router.push(`?${params.toString()}`)
  }

  const clearQuery = () => {
    router.push(`?`)
  }

  return { setQuery, removeQuery, clearQuery }
}

export default useQuery
