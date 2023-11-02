import { api } from '@/libs/api'
import { AxiosError } from 'axios'
import { create } from 'zustand'

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

interface MarketCurrency {
  id: number
  rank: number
  name: string
  symbol: string
  image: string
  values: Value
  maxSupply: number
  circulatingSupply: number
}

type Transaction = {
  id: string
  type: string
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

interface NewCurrencyInput {
  name: string
  symbol: string
  image: string
  amount: number
  cryptocurrencyId: number
}

type State = {
  search: string
  selectedMarketCurrency: MarketCurrency | null
  marketCurrencies: MarketCurrency[]
  walletCurrencies: WalletCurrency[]
}

interface Actions {
  setSearch: (value: string) => void
  setSelectedMarketCurrency: (value: MarketCurrency | null) => void
  fetchMarketCurrencies: (page: string) => Promise<void>
  fetchWalletCurrencies: () => Promise<void>
  createWalletCurrency: (
    data: NewCurrencyInput,
  ) => Promise<WalletCurrency | void>
}

const initialState: State = {
  search: '',
  selectedMarketCurrency: null,
  marketCurrencies: [],
  walletCurrencies: [],
}

export const useCurrencyStore = create<State & Actions>()((set, get) => ({
  ...initialState,
  setSearch: (value: string) => {
    set({ search: value })
  },
  setSelectedMarketCurrency: (value: MarketCurrency | null) => {
    set({ selectedMarketCurrency: value })
  },
  fetchMarketCurrencies: async (page: string) => {
    try {
      const response = await api<MarketCurrency[]>(
        `/market/currencies?page=${page}`,
      )

      if (response.data) {
        set({ marketCurrencies: response.data })
      }
    } catch (err) {
      console.log(err)
    }
  },
  fetchWalletCurrencies: async () => {
    try {
      const response = await api<WalletCurrency[]>('/wallet/currencies')

      if (response.data) {
        set({ walletCurrencies: response.data })
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        return alert(err.response?.data.message) // TODO: add toastify lib
      }

      console.log(err)
    }
  },
  createWalletCurrency: async (data: NewCurrencyInput) => {
    const { amount, cryptocurrencyId, image, name, symbol } = data

    try {
      const response = await api.post<WalletCurrency>('/wallet/currencies', {
        cryptocurrencyId,
        name,
        symbol,
        image,
        amount,
      })

      return response.data
    } catch (err) {
      if (err instanceof AxiosError) {
        return alert(err.response?.data.message) // TODO: add toastify lib
      }

      console.log(err)
    }
  },
}))
