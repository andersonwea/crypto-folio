'use server'

import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { api } from '@/libs/api'
import { AxiosError } from 'axios'
import { getServerSession } from 'next-auth'
import { revalidatePath } from 'next/cache'

type updateUserProfileProps = {
  nickname: string
  avatarUrl: string | null
}

export async function updateUserProfile(data: updateUserProfileProps) {
  const session = await getServerSession(authOptions)

  try {
    const response = await api.put('/me/profile', data, {
      headers: {
        Authorization: `Bearer ${session?.user.accessToken}`,
      },
    })

    const updateUserProfileResponse = response.data

    revalidatePath('/me')

    return {
      updateUserProfileResponse,
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      return {
        updateUserProfileError: err.response?.data.message as string,
      }
    }

    return {
      error: 'Erro inesperado, tente novamente mais tarde.',
    }
  }
}
