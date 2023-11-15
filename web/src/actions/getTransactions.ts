import { TransactionResponse } from '@/@types'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'

export async function getTransactions(page: string) {
  const session = await getServerSession(authOptions)

  try {
    const response = await fetch(
      `${process.env.NEXTBASE_URL}/wallet/currencies/transactions?page=${
        page ?? '1'
      }`,
      {
        headers: {
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
      },
    )

    const transactionResponse = (await response.json()) as TransactionResponse

    const { totalTransactions, transactions } = transactionResponse

    return {
      totalTransactions,
      transactions,
    }
  } catch (err) {
    return {
      transactionsError: err,
    }
  }
}
