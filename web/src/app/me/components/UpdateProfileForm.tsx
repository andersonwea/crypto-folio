'use client'

import { Button } from '@/components/Button'
import { TextInput } from '@/components/TextInput'
import { api } from '@/libs/api'
import { useUserStore } from '@/store/useUserStore'
import { zodResolver } from '@hookform/resolvers/zod'
import { Heading, Text } from '@radix-ui/themes'
import { AxiosError } from 'axios'
import { Camera } from 'lucide-react'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const MAX_FILE_SIZE = 500000
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
]

const updateProfileFormSchema = z.object({
  nickname: z
    .string()
    .max(10, { message: 'O nickname deve ter no máximo 10 letras.' })
    .min(3, { message: 'O nickname deve ter no minimo 3 letras.' })
    .transform((nickname) => nickname.toLowerCase()),
  file: z
    .any()
    .refine((file) => file.length === 1, {
      message: 'Imagem obrigatória',
    })
    .refine((file) => file[0]?.size <= MAX_FILE_SIZE, {
      message: 'Tamanho máximo de 5mb',
    })
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file[0]?.type), {
      message: 'Formato inválido',
    }),
})

type UpdateProfileFormData = z.infer<typeof updateProfileFormSchema>

export function UpdateProfileForm() {
  const updateUserProfile = useUserStore(
    useCallback((state) => state.updateUserProfile, []),
  )

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileFormSchema),
  })

  async function handleUpdateProfile(data: UpdateProfileFormData) {
    let avatarUrl = ''

    const formData = new FormData()
    formData.append('file', data.file[0])

    try {
      const response = await api.post('/me/profile/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      avatarUrl = response.data.avatarUrl
    } catch (err) {
      if (err instanceof AxiosError && err.response?.data.message) {
        return alert(err.response.data.message) // TODO: add toastify lib
      }

      console.log(err)
    }

    await updateUserProfile({
      avatarUrl,
      nickname: data.nickname,
    })

    reset()
  }

  return (
    <form
      onSubmit={handleSubmit(handleUpdateProfile)}
      className="pt-10 flex flex-col"
    >
      <Heading>Informações do usuário</Heading>
      <Text as="p" color="gray" className="pt-2">
        Informações gerais da conta
      </Text>

      <div className="pt-10">
        <label htmlFor="">
          <Text>Username</Text>
          <TextInput {...register('nickname')} />

          {errors.nickname && (
            <Text color="red" size={'2'}>
              {errors.nickname.message}
            </Text>
          )}
        </label>

        <label htmlFor="file" className="mt-4 block">
          <Text>Avatar</Text>
          <div className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-800 hover:text-gray-600 bg-gray-300 rounded-[12px] h-20 p-4">
            <Camera className="h-4 w-4" />
            Anexar mídia <br />
            <Text color="gray">Tamanho máximo 5mb.</Text>
          </div>

          <input
            {...register('file')}
            type="file"
            id="file"
            className="invisible h-0 w-0"
          />

          {errors.file && (
            <Text color="red" size={'2'}>
              {errors.file.message}
            </Text>
          )}
        </label>
      </div>
      <Button disabled={isSubmitting}>Salvar</Button>
    </form>
  )
}
