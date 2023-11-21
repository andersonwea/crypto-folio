'use server'

import { NewWalletCurrencyInput, WalletCurrency } from '@/@types'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { api } from '@/libs/api'
import { AxiosError } from 'axios'
import { getServerSession } from 'next-auth'

export async function addWalletCurrency(data: NewWalletCurrencyInput) {
  const session = await getServerSession(authOptions)

  try {
    const response = await api.post<WalletCurrency>(
      '/wallet/currencies',
      data,
      {
        headers: {
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
      },
    )

    const walletCurrency = response.data
    return {
      walletCurrency,
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      return {
        addWalletCurrencyError: err.response?.data.message as string,
      }
    }
  }
}
