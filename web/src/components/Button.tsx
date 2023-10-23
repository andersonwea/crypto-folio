import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: string
}

export function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className="bg-blue-300 cursor-pointer rounded-full h-9 max-w-full px-4 hover:brightness-95 transition-all text-gray-800"
    >
      {children}
    </button>
  )
}
