'use client'

import { Text } from '@radix-ui/themes'
import { TextInput } from './TextInput'
import { GoogleIcon } from '@/assets/GoogleIcon'
// import { Button } from './Button'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { Button } from '@nextui-org/react'

const authenticateFormSchema = z.object({
  email: z
    .string()
    .email({ message: 'Email inválido' })
    .transform((email) => email.toLowerCase()),
  password: z
    .string()
    .min(3, { message: 'A senha deve ter no minimo 3 caracteres.' }),
})

type AuthenticateFormData = z.infer<typeof authenticateFormSchema>

export function AuthenticateForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthenticateFormData>({
    resolver: zodResolver(authenticateFormSchema),
  })

  const router = useRouter()

  async function handleAuthenticateUser(data: AuthenticateFormData) {
    const res = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
      callbackUrl: '/',
    })

    if (res?.status === 401) {
      return toast.error('Email o senha inválidos.')
    }

    router.refresh()
  }

  return (
    <form
      className="flex flex-col space-y-10"
      onSubmit={handleSubmit(handleAuthenticateUser)}
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
          className="bg-blue-300 text-base"
          type="submit"
          isLoading={isSubmitting}
        >
          {isSubmitting ? 'Carregando...' : 'Entrar'}
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
