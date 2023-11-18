'use server'

import { WalletCurrency } from '@/@types'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { AxiosError } from 'axios'
import { getServerSession } from 'next-auth'

export async function getWalletCurrency(currencyId: string) {
  const session = await getServerSession(authOptions)

  try {
    const response = await fetch(
      `${process.env.NEXTBASE_URL}/wallet/currencies/${currencyId}`,
      {
        headers: {
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
      },
    )

    const walletCurrency = (await response.json()) as WalletCurrency

    return {
      walletCurrency,
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      return {
        walletCurrencyError: err.response?.data.message,
      }
    }

    return {
      error: err,
    }
  }
}
