'use client'
import { useRouter, useSearchParams } from 'next/navigation'

const useUpdateQueryParam = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  return (key: string, value: string | number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set(key, String(value))
    router.push(`?${params.toString()}`)
  }
}

export default useUpdateQueryParam
