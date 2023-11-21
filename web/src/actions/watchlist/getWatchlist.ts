'use server'

import { WatchlistResponse } from '@/@types'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { AxiosError } from 'axios'
import { getServerSession } from 'next-auth'

export async function getWatchlist(page?: string) {
  const session = await getServerSession(authOptions)

  try {
    const response = await fetch(
      `${process.env.NEXTBASE_URL}/me/watchlist?page=${page ?? '1'}`,
      {
        next: { revalidate: 60 * 5, tags: ['watchlist'] },
        headers: {
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
      },
    )

    const { totalItems, watchlist } =
      (await response.json()) as WatchlistResponse

    return {
      watchlist,
      totalItems,
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      return {
        getWatchlistError: err.response?.data.message as string,
      }
    }

    return {
      error: 'Erro inesperado, tente novamente mais tarde.',
    }
  }
}
