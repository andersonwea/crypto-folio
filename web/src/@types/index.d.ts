interface Transaction {
  id: string
  type: 'buy' | 'sell'
  value: number
  amount: string
  created_at: string
  currency_id: string
}

export interface WalletCurrency {
  id: string
  cryptocurrency_id: number
  name: string
  image: string
  symbol: string
  amount: string
  user_id: string
  balance: number
  transactions: Transaction[]
}
