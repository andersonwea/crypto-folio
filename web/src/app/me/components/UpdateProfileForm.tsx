import { Button } from '@/components/Button'
import { TextInput } from '@/components/TextInput'
import { Heading, Text } from '@radix-ui/themes'
import { Camera } from 'lucide-react'

export function UpdateProfileForm() {
  return (
    <form action="" className="pt-10 flex flex-col">
      <Heading>Informações do usuário</Heading>
      <Text as="p" color="gray" className="pt-2">
        Informações gerais da conta
      </Text>

      <div className="pt-10">
        <label htmlFor="">
          <Text>Username</Text>
          <TextInput />
        </label>

        <label htmlFor="media" className="mt-4 block">
          <Text>Avatar</Text>
          <div className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-800 hover:text-gray-600 bg-gray-300 rounded-[12px] h-20 p-4">
            <Camera className="h-4 w-4" />
            Anexar mídia <br />
            <Text color="gray">Tamanho máximo 5mb.</Text>
          </div>

          <input
            type="file"
            name="coverUrl"
            id="media"
            className="invisible h-0 w-0"
          />
        </label>
      </div>
      <Button>Salvar</Button>
    </form>
  )
}
