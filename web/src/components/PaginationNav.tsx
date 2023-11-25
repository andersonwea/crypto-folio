'use client'

import { Pagination } from '@nextui-org/react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

interface PaginationNavProps {
  total: number
}

export function PaginationNav({ total }: PaginationNavProps) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  function onChangePage(page: number) {
    const url = `${pathname}?page=${page}`
    router.push(url)
  }

  return (
    <div className="flex justify-center">
      <Pagination
        showControls
        total={total}
        initialPage={Number(searchParams.get('page')) || 1}
        onChange={(page: number) => onChangePage(page)}
      />
    </div>
  )
}
