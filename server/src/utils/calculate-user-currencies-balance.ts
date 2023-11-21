import { ApiCurrency } from '@/adapters/api-service'
import { CurrencyWithTransactions } from '@/repositories/currencies-repository'

export interface UserCurrencyWithBalance extends CurrencyWithTransactions {
  balance: number
  amountInvested: number
  profitOrLoss: number
}

export function calculateUserCurrenciesBalance(
  userApiCurrencies: ApiCurrency[],
  userCurrenciesWithTransactions: CurrencyWithTransactions[],
) {
  const userCurrenciesWithBalance = userCurrenciesWithTransactions.reduce(
    (acc, userCurrency) => {
      for (const userApiCurrency of userApiCurrencies) {
        let amountInvestedInCents = 0

        for (const transaction of userCurrency.transactions) {
          amountInvestedInCents += transaction.value
        }

        if (userApiCurrency.id === userCurrency.cryptocurrency_id) {
          const currencyPrice = userApiCurrency.values.price

          const balance = Number(
            (userCurrency.amount.toNumber() * currencyPrice).toFixed(2),
          )

          const amountInvested = amountInvestedInCents / 100
          const profitOrLoss = Number(
            ((balance / amountInvested - 1) * 100).toFixed(2),
          )

          acc.push({
            ...userCurrency,
            balance,
            amountInvested,
            profitOrLoss,
          })
        }
      }

      return acc
    },
    [] as UserCurrencyWithBalance[],
  )

  return { userCurrenciesWithBalance }
}
