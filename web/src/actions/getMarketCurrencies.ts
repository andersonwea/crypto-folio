'use server'

import { MarketCurrency } from '@/@types'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'

export async function getMarketCurrencies(page?: string) {
  const session = await getServerSession(authOptions)

  try {
    const response = await fetch(
      `${process.env.NEXTBASE_URL}/market/currencies?page=${page ?? '1'}`,
      {
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
    console.log(err)

    return {
      error: err,
    }
  }
}
