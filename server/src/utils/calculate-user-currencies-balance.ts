import { ApiCurrency } from '@/adapters/api-service'
import { CurrencyWithTransactions } from '@/repositories/currencies-repository'

export interface UserCurrencyWithBalance extends CurrencyWithTransactions {
  balance: number
}

export function calculateUserCurrenciesBalance(
  userApiCurrencies: ApiCurrency[],
  userCurrenciesWithTransactions: CurrencyWithTransactions[],
) {
  const userCurrenciesWithBalance = userCurrenciesWithTransactions.reduce(
    (acc, userCurrency) => {
      for (const userApiCurrency of userApiCurrencies) {
        if (userApiCurrency.id === userCurrency.cryptocurrency_id) {
          const currencyPrice = userApiCurrency.values.price

          const balance = Number(
            (userCurrency.amount.toNumber() * currencyPrice).toFixed(2),
          )

          acc.push({
            ...userCurrency,
            balance,
          })
        }
      }

      return acc
    },
    [] as UserCurrencyWithBalance[],
  )

  return { userCurrenciesWithBalance }
}
