'use client'

import { Text } from '@radix-ui/themes'
import { TextInput } from './TextInput'
import { Button } from '@nextui-org/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { registerUser } from '@/actions/user/registerUser'
import { toast } from 'react-toastify'
import { GoogleIcon } from '@/assets/GoogleIcon'

const registerFormSchema = z.object({
  nickname: z
    .string()
    .max(10, { message: 'O nickname deve ter no máximo 10 letras.' })
    .min(3, { message: 'O nickname deve ter no minimo 3 letras.' })
    .transform((nickname) => nickname.toLowerCase()),
  email: z
    .string()
    .email({ message: 'Email inválido' })
    .transform((email) => email.toLowerCase()),
  password: z
    .string()
    .min(3, { message: 'A senha deve ter no minimo 3 caracteres.' }),
})

type RegisterFormData = z.infer<typeof registerFormSchema>

export function RegisterForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  })

  async function handleRegisterUser(data: RegisterFormData) {
    const { registerError, error } = await registerUser(data)

    if (registerError || error) {
      return toast.error(registerError || error)
    }

    toast.success('Conta criada com sucesso!')

    reset()
  }

  return (
    <form
      className="flex flex-col space-y-10"
      onSubmit={handleSubmit(handleRegisterUser)}
    >
      <div className="space-y-5 mt-10">
        <label htmlFor="" className="block space-y-1">
          <Text>Email</Text>
          <TextInput
            placeholder="insira o endereço de email"
            {...register('email')}
          />

          {errors.email && (
            <Text color="red" size={'2'}>
              {errors.email.message}
            </Text>
          )}
        </label>

        <label htmlFor="" className="block space-y-1">
          <Text>Nickname</Text>
          <TextInput
            placeholder="insira o nickname"
            {...register('nickname')}
          />

          {errors.nickname && (
            <Text color="red" size={'2'}>
              {errors.nickname.message}
            </Text>
          )}
        </label>

        <label htmlFor="" className="block space-y-1">
          <Text>Senha</Text>
          <TextInput
            type="password"
            placeholder="insira sua senha"
            {...register('password')}
          />

          {errors.password && (
            <Text color="red" size={'2'}>
              {errors.password.message}
            </Text>
          )}
        </label>
      </div>

      <div className="flex flex-col space-y-4">
        <Button
          variant="solid"
          type="submit"
          className="bg-blue-300 text-base"
          isLoading={isSubmitting}
        >
          {isSubmitting ? 'Carregando...' : 'Criar conta'}
        </Button>
        <Text className='flex items-center gap-2 before:content-[""] before:block before:bg-gray-300 before:w-full before:h-[2px] after:content-[""] after:block after:bg-gray-300 after:w-full after:h-[2px]'>
          ou
        </Text>
        <Button
          variant="bordered"
          className="border-gray-400"
          startContent={<GoogleIcon />}
          onClick={() => toast.info('Em desenvolvimento')}
        >
          Continue com Google
        </Button>
      </div>
    </form>
  )
}
