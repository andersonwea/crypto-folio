'use client'

import { Text } from '@radix-ui/themes'
import { TextInput } from './TextInput'
import Image from 'next/image'
import googleIcon from '@/assets/google.svg'
import { Button } from './Button'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { api } from '@/libs/api'
import cookies from 'js-cookie'
import { useAuthStore } from '@/store/useAuthStore'

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
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AuthenticateFormData>({
    resolver: zodResolver(authenticateFormSchema),
  })

  const router = useRouter()
  const setUser = useAuthStore((state) => state.setUser)
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated)

  async function handleAuthenticateUser(data: AuthenticateFormData) {
    reset()

    try {
      const response = await api.post(
        '/sessions',
        {
          email: data.email,
          password: data.password,
        },
        { withCredentials: true },
      )

      const { user, token } = response.data

      cookies.set('cryptofolio.token', token)
      setUser(user)
      setAuthenticated(true)

      router.refresh()
    } catch (err: any) {
      alert(err.message) // TODO add react-toastify lib
    }
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
        <Button disabled={isSubmitting}>Login</Button>
        <Text className='flex items-center gap-2 before:content-[""] before:block before:bg-gray-300 before:w-full before:h-[2px] after:content-[""] after:block after:bg-gray-300 after:w-full after:h-[2px]'>
          ou
        </Text>
        <button className="flex items-end justify-center gap-4 border-[2px] rounded-xl py-[6px] hover:bg-gray-50">
          {' '}
          <Image src={googleIcon} width={28} height={28} alt="" />
          Continue com Google
        </button>
      </div>
    </form>
  )
}
