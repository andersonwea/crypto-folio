'use server'

import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { api } from '@/libs/api'
import { AxiosError } from 'axios'
import { getServerSession } from 'next-auth'
import { revalidateTag } from 'next/cache'

export async function toggleWatchlist(currencyId: number) {
  const session = await getServerSession(authOptions)
  try {
    await api.post(
      `/me/watchlist`,
      {
        currencyId,
      },
      {
        headers: {
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
      },
    )

    revalidateTag('watchlist')
  } catch (err) {
    if (err instanceof AxiosError) {
      return {
        toggleWatchlistError: err.response?.data.message as string,
      }
    }

    return {
      error: 'Erro inesperado, tente novamente mais tarde.',
    }
  }
}
