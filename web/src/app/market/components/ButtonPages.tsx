'use client'

import { IconButton } from '@radix-ui/themes'

interface ButtonPagesProps {
  isDisable: boolean
  isActive: boolean
  pageNumber: number
  onClick: () => void
}

export function ButtonPages({
  isDisable,
  isActive,
  pageNumber,
  onClick,
}: ButtonPagesProps) {
  return (
    <IconButton
      className="w-9 h-9 disabled:cursor-default"
      variant={isActive ? 'soft' : 'ghost'}
      color={isActive ? 'indigo' : 'gray'}
      onClick={onClick}
      disabled={isDisable}
    >
      {isDisable ? '...' : pageNumber}
    </IconButton>
  )
}
