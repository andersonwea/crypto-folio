'use server'

import { MarketCurrency } from '@/@types'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { AxiosError } from 'axios'
import { getServerSession } from 'next-auth'

export async function getMarketCurrency(cryptocurrencyId: string) {
  const session = await getServerSession(authOptions)
  try {
    const response = await fetch(
      `${process.env.NEXTBASE_URL}/market/currencies/${cryptocurrencyId}`,
      {
        next: { revalidate: 60 * 5, tags: ['marketCurrency'] },
        headers: {
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
      },
    )

    const marketCurrency = (await response.json()) as MarketCurrency
    return {
      marketCurrency,
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      return {
        getMarketCurrencyError: err.response?.data.message as string,
      }
    }

    return {
      Error: err,
    }
  }
}
