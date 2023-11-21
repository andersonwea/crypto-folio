'use server'

import { NewTransactionInput, Transaction } from '@/@types'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { api } from '@/libs/api'
import { AxiosError } from 'axios'
import { getServerSession } from 'next-auth'
import { revalidateTag } from 'next/cache'

export async function addTransaction(
  data: NewTransactionInput,
  currencyId: string,
) {
  const session = await getServerSession(authOptions)

  try {
    const response = await api.post<Transaction>(
      `/wallet/currencies/${currencyId}/transactions`,
      data,
      {
        headers: {
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
      },
    )

    const transaction = response.data

    revalidateTag('walletCurrencies')

    return {
      transaction,
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      return {
        addTransactionError: err.response?.data.message as string,
      }
    }
  }
}
