'use server'

import { Transaction } from '@/@types'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { api } from '@/libs/api'
import { AxiosError } from 'axios'
import { getServerSession } from 'next-auth'
import { revalidateTag } from 'next/cache'

export async function editTransaction(data: Omit<Transaction, 'type'>) {
  const session = await getServerSession(authOptions)

  try {
    const response = await api.put<Transaction>(
      `/wallet/currencies/${data.currency_id}/transactions/${data.id}`,
      {
        amount: data.amount,
        value: data.value,
        createdAt: data.created_at,
      },
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
        editTransactionError: err.response?.data.message as string,
      }
    }

    return {
      error: err,
    }
  }
}
