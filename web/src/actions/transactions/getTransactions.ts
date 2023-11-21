import { TransactionResponse } from '@/@types'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { AxiosError } from 'axios'
import { getServerSession } from 'next-auth'

export async function getTransactions(page: string) {
  const session = await getServerSession(authOptions)

  try {
    const response = await fetch(
      `${process.env.NEXTBASE_URL}/wallet/currencies/transactions?page=${
        page ?? '1'
      }`,
      {
        next: { revalidate: 60 * 5, tags: ['transactions'] },
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
    if (err instanceof AxiosError) {
      return {
        getTransactionsError: err.response?.data.message as string,
      }
    }

    return {
      error: 'Erro inesperado, tente novamente mais tarde.',
    }
  }
}
