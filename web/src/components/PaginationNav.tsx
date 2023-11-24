'use client'

import { Pagination } from '@nextui-org/react'
import { usePathname, useRouter } from 'next/navigation'

interface PaginationNavProps {
  total: number
}

export function PaginationNav({ total }: PaginationNavProps) {
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
        initialPage={1}
        onChange={(page: number) => onChangePage(page)}
      />
    </div>
  )
}
