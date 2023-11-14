'use server'

import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { api } from '@/libs/api'
import { getServerSession } from 'next-auth'
import { revalidatePath } from 'next/cache'

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

    revalidatePath('/')
  } catch (err) {
    console.log(err)

    return {
      error: err,
    }
  }
}
