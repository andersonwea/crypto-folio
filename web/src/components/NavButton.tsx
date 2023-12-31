import clsx from 'clsx'
import { ReactNode } from 'react'

interface NavButtonProps {
  icon: ReactNode
  isActive: boolean
}

export function NavButton({ icon, isActive }: NavButtonProps) {
  return (
    <button
      className={clsx('h-6 w-6 text-[#A5A5A5]', {
        'text-white': isActive,
      })}
    >
      {icon}
    </button>
  )
}
