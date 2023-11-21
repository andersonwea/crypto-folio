'use server'

import { WalletCurrency } from '@/@types'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { AxiosError } from 'axios'
import { getServerSession } from 'next-auth'

export async function getWalletCurrencies() {
  const session = await getServerSession(authOptions)

  try {
    const response = await fetch(
      `${process.env.NEXTBASE_URL}/wallet/currencies`,
      {
        next: { revalidate: 60 * 5, tags: ['walletCurrencies'] },
        headers: {
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
      },
    )

    const walletCurrencies = (await response.json()) as WalletCurrency[]

    return {
      walletCurrencies,
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
