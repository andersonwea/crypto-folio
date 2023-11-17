'use server'

import { MarketCurrency } from '@/@types'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { api } from '@/libs/api'
import { AxiosError } from 'axios'
import { getServerSession } from 'next-auth'

export async function getMarketCurrency(cryptocurrencyId: string) {
  const session = await getServerSession(authOptions)

  try {
    const response = await api<MarketCurrency>(
      `/market/currencies/${cryptocurrencyId}`,
      {
        headers: {
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
      },
    )

    const marketCurrency = response.data

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
