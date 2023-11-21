'use server'

import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { api } from '@/libs/api'
import { AxiosError } from 'axios'
import { getServerSession } from 'next-auth'
import { revalidateTag } from 'next/cache'

export async function deleteTransaction(
  transactionId: string,
  currencyId: string,
) {
  const session = await getServerSession(authOptions)

  try {
    await api.delete(
      `/wallet/currencies/${currencyId}/transactions/${transactionId}`,
      {
        headers: {
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
      },
    )

    revalidateTag('walletCurrencies')
  } catch (err) {
    if (err instanceof AxiosError) {
      return {
        deleteTransactionError: err.response?.data.message as string,
      }
    }

    return {
      error: err,
    }
  }
}
