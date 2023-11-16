'use server'

import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { api } from '@/libs/api'
import { AxiosError } from 'axios'
import { getServerSession } from 'next-auth'

type UploadResponse = {
  avatarUrl: string
}

export async function upload(formData: FormData) {
  const session = await getServerSession(authOptions)

  try {
    const response = await api.post<UploadResponse>(
      '/me/profile/upload',
      formData,
      {
        headers: {
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
      },
    )

    const { avatarUrl } = response.data

    return {
      avatarUrl,
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      return {
        uploadError: err.response?.data.message as string,
      }
    }
  }
}
