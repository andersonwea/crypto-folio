import { Metrics } from '@/@types'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { AxiosError } from 'axios'
import { getServerSession } from 'next-auth'

export async function getWalletStats() {
  const session = await getServerSession(authOptions)

  try {
    const response = await fetch(`${process.env.NEXTBASE_URL}/me/metrics`, {
      next: { revalidate: 60 * 5, tags: ['walletStats'] },
      headers: {
        Authorization: `Bearer ${session?.user.accessToken}`,
      },
    })

    const metrics = (await response.json()) as Metrics

    return {
      metrics,
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      return {
        getWalletStatsError: err.response?.data.message as string,
      }
    }

    return {
      error: 'Erro inesperado, tente novamente mais tarde.',
    }
  }
}
