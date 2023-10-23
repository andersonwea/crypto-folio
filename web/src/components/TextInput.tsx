import {
  IconButton,
  TextFieldInput,
  TextFieldRoot,
  TextFieldSlot,
} from '@radix-ui/themes'
import { Search } from 'lucide-react'
import { ComponentProps } from 'react'

type TextInputProps = ComponentProps<typeof TextFieldInput>

export function TextInput({ ...props }: TextInputProps) {
  return (
    <TextFieldRoot>
      <TextFieldSlot>
        <Search size={20} />
      </TextFieldSlot>
      <TextFieldInput
        className="max-sm:max-w-[150px]"
        {...props}
        radius="large"
        size={'2'}
      />
    </TextFieldRoot>
  )
}
