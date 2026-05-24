'use client'

import { useCallback, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export function useSidePanel() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const openParam = searchParams.get('open')

  const open = useCallback((slug: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('open', slug)
    router.push(`?${params.toString()}`, { scroll: false })
  }, [router, searchParams])

  const close = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete('open')
    const query = params.toString()
    router.push(query ? `?${query}` : '/', { scroll: false })
  }, [router, searchParams])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && openParam) close()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [openParam, close])

  return { openParam, open, close, isOpen: !!openParam }
}
