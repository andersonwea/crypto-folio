'use server'

import { MarketCurrency } from '@/@types'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { AxiosError } from 'axios'
import { getServerSession } from 'next-auth'

export async function getMarketCurrencies(page?: string) {
  const session = await getServerSession(authOptions)

  try {
    const response = await fetch(
      `${process.env.NEXTBASE_URL}/market/currencies?page=${page ?? '1'}`,
      {
        next: { revalidate: 60 * 5, tags: ['marketCurrencies'] },
        headers: {
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
      },
    )
    const marketCurrencies = (await response.json()) as MarketCurrency[]

    return {
      marketCurrencies,
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      return {
        getMarketCurrenciesError: err.response?.data.message as string,
      }
    }

    return {
      error: 'Erro inesperado, tente novamente mais tarde.',
    }
  }
}
