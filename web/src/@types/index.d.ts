interface Transaction {
  id: string
  type: string
  value: number
  amount: number
  created_at: Date
  currency_id: string
}

export interface WalletCurrency {
  id: string
  cryptocurrency_id: number
  name: string
  image: string
  symbol: string
  amount: number
  user_id: string
  balance: number
  amountInvested: number
  profitOrLoss: number
  transactions: Transaction[]
}

type Value = {
  price: number
  volume24h: number
  high24h: number
  low24h: number
  marketCap: number
  percentChange24h: number
  percentChange7d: number
  percentChange30d: number
  percentChange3m: number
  percentChange6m: number
}

export interface MarketCurrency {
  id: number
  rank: number
  name: string
  symbol: string
  image: string
  values: Value
  maxSupply: number
  circulatingSupply: number
}

export interface Currency {
  id: string
  cryptocurrency_id: number
  name: string
  image: string
  symbol: string
  amount: number
  user_id: string
}

export interface WatchlistResponse {
  totalItems: number
  watchlist: MarketCurrency[]
}

export interface TransactionResponse {
  totalTransactions: number
  transactions: Transaction[]
}

export type Metrics = {
  profitOrLoss: number
  totalBalance: number
  totalInvested: number
}

export type NewWalletCurrencyInput = {
  name: string
  symbol: string
  image: string
  amount: number
  cryptocurrencyId: number
}

export type NewTransactionInput = {
  type: string
  value: number
  amount: number
  createdAt: Date
}
