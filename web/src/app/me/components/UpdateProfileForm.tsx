'use client'

import { updateUserProfile } from '@/actions/user/updateUserProfile'
import { upload } from '@/actions/user/upload'
import { Button } from '@nextui-org/react'
import { TextInput } from '@/components/TextInput'
import { zodResolver } from '@hookform/resolvers/zod'
import { Avatar, Heading, Text } from '@radix-ui/themes'
import { Camera, XCircle } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { ChangeEvent, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'

const MAX_FILE_SIZE = 5000000
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
    .nullable()
    .default(null)
    .refine(
      (file) => {
        if (file && file[0]) {
          return file[0]?.size <= MAX_FILE_SIZE
        }

        return true
      },
      {
        message: 'Tamanho máximo de 5mb',
      },
    )
    .refine(
      (file) => {
        if (file && file[0]) {
          return ACCEPTED_IMAGE_TYPES.includes(file[0]?.type)
        }

        return true
      },
      {
        message: 'Formato inválido',
      },
    ),
})

type UpdateProfileFormData = z.infer<typeof updateProfileFormSchema>

export function UpdateProfileForm() {
  const [preview, setPreview] = useState<string | null>(null)

  const { data: session, update } = useSession()

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileFormSchema),
  })

  function onFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target

    if (!files) {
      return
    }

    const previewURL = URL.createObjectURL(files[0])

    setPreview(previewURL)
  }

  function onFileRemove() {
    setPreview(null)
    setValue('file', null)
  }

  async function handleUpdateProfile(data: UpdateProfileFormData) {
    let avatarUrl: string | undefined

    if (data.file) {
      const formData = new FormData()
      formData.append('file', data.file[0])

      const uploadResponse = upload(formData)

      const { uploadError, avatarUrl: avatarUrlResponse } = await uploadResponse

      if (uploadError) {
        return toast.error(uploadError)
      }

      avatarUrl = avatarUrlResponse
    }

    const updateUserProfileResponse = await updateUserProfile({
      avatarUrl: avatarUrl || session?.user.avatarUrl || null,
      nickname: data.nickname,
    })

    if (updateUserProfileResponse?.updateUserProfileError) {
      return toast.error(updateUserProfileResponse.updateUserProfileError)
    }

    toast.success('Perfil atualizado com sucesso!')

    update()
    reset()
    setPreview(null)
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
          <TextInput
            {...register('nickname')}
            defaultValue={session?.user.nickname || ''}
          />

          {errors.nickname && (
            <Text color="red" size={'2'}>
              {errors.nickname.message}
            </Text>
          )}
        </label>

        <div className="flex items-center gap-5">
          <label htmlFor="file" className="mt-4 block flex-grow">
            <Text>Avatar</Text>
            <div className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-800 hover:text-gray-600 bg-gray-300 rounded-[12px] h-20 p-4">
              <Camera className="min-h-4 min-w-4" />
              Anexar mídia <br />
              <Text color="gray">Tamanho máximo 5mb.</Text>
            </div>

            <input
              onChangeCapture={onFileSelected}
              {...register('file')}
              type="file"
              id="file"
              className="invisible h-0 w-0"
            />

            {errors.file && (
              <Text color="red" size={'2'}>
                {errors.file.message?.toString()}
              </Text>
            )}
          </label>

          {preview && (
            <div className="relative">
              <Avatar
                radius="full"
                color="orange"
                variant="solid"
                fallback={'A'}
                src={preview}
                size={{
                  initial: '6',
                  md: '7',
                }}
              />
              <Button
                isIconOnly
                variant="light"
                radius="full"
                className="absolute -right-4 -top-4"
                onClick={() => onFileRemove()}
              >
                <XCircle />
              </Button>
            </div>
          )}
        </div>
      </div>
      <Button
        type="submit"
        disabled={isSubmitting}
        isLoading={isSubmitting}
        variant="solid"
        className="bg-blue-300 text-base"
      >
        {isSubmitting ? 'Salvando...' : 'Salvar'}
      </Button>
    </form>
  )
}
