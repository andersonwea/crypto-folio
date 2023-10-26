import { Button } from '@/components/Button'
import { TextInput } from '@/components/TextInput'
import { Heading, Text } from '@radix-ui/themes'

export function UpdatePrivacyProfileForm() {
  return (
    <form action="" className="pt-10 flex flex-col justify-between">
      <div>
        <Heading>Privacidade</Heading>
        <Text as="p" color="gray" className="pt-2">
          Configurações de privacidade
        </Text>

        <div className="pt-10 max-md:pb-6">
          <label htmlFor="" className="flex gap-4 items-end">
            <div className="flex-1">
              <Text>Email</Text>
              <TextInput />
            </div>
            <Button>Editar email</Button>
          </label>

          <label htmlFor="" className="flex gap-4 mt-4 items-end">
            <div className="flex-1">
              <Text>Senha</Text>
              <TextInput type="password" />
            </div>
            <Button>Trocar senha</Button>
          </label>
        </div>
      </div>
      <Button>Salvar</Button>
    </form>
  )
}
