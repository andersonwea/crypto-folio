import { Metrics } from '@/@types'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
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
    return {
      metricsError: err,
    }
  }
}
