'use client'

import { useState } from 'react'
import { ButtonPages } from './ButtonPages'
import { useRouter, usePathname } from 'next/navigation'
import { generatePages } from '@/utils/generate-pages'
import { IconButton } from '@radix-ui/themes'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface NavPagesProps {
  page: string
}

export function NavPages({ page }: NavPagesProps) {
  const [activePage, setActivePage] = useState<number>(Number(page))
  const totalPages = 791

  const pathName = usePathname()

  const router = useRouter()

  function handleClick(page: number) {
    const url = `${pathName}?page=${page}`
    setActivePage(page)

    router.push(url)
  }

  function handleChangePage(page: number) {
    if (page <= 1 || page >= totalPages) {
      return null
    }

    const url = `${pathName}?page=${page}`
    setActivePage(page)

    router.push(url)
  }

  return (
    <div className="max-w-xs m-auto pt-7">
      <div className="flex gap-3 items-center w-full justify-center">
        <IconButton
          variant="ghost"
          color="gray"
          onClick={() => handleChangePage(activePage - 1)}
        >
          <ChevronLeft />
        </IconButton>

        {generatePages(totalPages, activePage).map((page, index) => (
          <ButtonPages
            key={index}
            isActive={activePage === page}
            isDisable={page === 0}
            pageNumber={page}
            onClick={() => handleClick(page)}
          />
        ))}

        <IconButton
          variant="ghost"
          color="gray"
          onClick={() => handleChangePage(activePage + 1)}
        >
          <ChevronRight />
        </IconButton>
      </div>
    </div>
  )
}
