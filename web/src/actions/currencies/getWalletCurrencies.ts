'use server'

import { WalletCurrency } from '@/@types'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
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
    console.log(err)

    return {
      walletCurrenciesError: err,
    }
  }
}
