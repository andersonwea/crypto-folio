import { ButtonHTMLAttributes, Ref, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: string
}

export const Button = forwardRef(function Button(
  { children, ...props }: ButtonProps,
  ref: Ref<HTMLButtonElement>,
) {
  return (
    <button
      {...props}
      ref={ref}
      className="bg-blue-300 h-10 cursor-pointer rounded-full max-w-full px-4 hover:brightness-95 transition-all text-gray-800 disabled:bg-blue-100 disabled:pointer-events-none"
    >
      {children}
    </button>
  )
})
