import { InputHTMLAttributes, forwardRef, Ref } from 'react'
import clsx from 'clsx'

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  height?: 'sm' | 'md'
}

export const TextInput = forwardRef(function TextInput(
  { height = 'sm', ...props }: TextInputProps,
  ref: Ref<HTMLInputElement>,
) {
  const styles =
    'rounded-md border-2 border-solid border-transparent bg-gray-300 flex items-center focus:border-blue-500 focus-within:border-blue-500 peer'

  return (
    <div
      className={clsx(styles, {
        'px-4 py-3': height === 'md',
        'px-3 py-2': height === 'sm',
      })}
    >
      <input
        ref={ref}
        className="b-0 w-full bg-transparent font-default text-sm font-normal text-gray-800 focus:outline-none"
        {...props}
      />
    </div>
  )
})
