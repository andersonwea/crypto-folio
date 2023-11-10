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

interface WatchlistResponse {
  totalItems: number
  watchlist: MarketCurrency[]
}

type State = {
  search: string
  activeSearch: boolean
  searchResult: MarketCurrency[]
  selectedMarketCurrency: MarketCurrency | null
  marketCurrencies: MarketCurrency[]
  watchlist: WatchlistResponse
  watchlistCurrenciesIds: number[]
  walletCurrencies: WalletCurrency[]
  walletCurrency: WalletCurrency | null
}

interface Actions {
  setSearch: (value: string) => void
  setActiveSearch: (value: boolean) => void
  setSelectedMarketCurrency: (value: MarketCurrency | null) => void
  searchCryptocurrencies: (search: string) => void
  fetchMarketCurrencies: (page?: string) => Promise<void>
  fetchWatchlist: (page?: string) => Promise<void>
  fetchWalletCurrencies: () => Promise<void>
  fetchWaletCurrency: (currencyId: string) => Promise<void>
  toggleWatchlist: (currencyId: number) => Promise<void>
  createWalletCurrency: (
    data: NewCurrencyInput,
  ) => Promise<WalletCurrency | void>
}

const initialState: State = {
  search: '',
  activeSearch: false,
  searchResult: [],
  selectedMarketCurrency: null,
  marketCurrencies: [],
  walletCurrencies: [],
  walletCurrency: null,
  watchlistCurrenciesIds: [],
  watchlist: { totalItems: 0, watchlist: [] },
}

export const useCurrencyStore = create<State & Actions>()((set, get) => ({
  ...initialState,
  setSearch: (value: string) => {
    set({ search: value })
  },
  setActiveSearch: (value: boolean) => {
    set({ activeSearch: value })
  },
  setSelectedMarketCurrency: (value: MarketCurrency | null) => {
    set({ selectedMarketCurrency: value })
    set({ search: '' })
    set({ activeSearch: false })
  },
  searchCryptocurrencies: async (search: string) => {
    if (search.length < 1) {
      return
    }
    console.log('procurou')
    try {
      const response = await api(`/market/currencies/search?search=${search}`)

      set({ searchResult: response.data })
    } catch (err) {
      console.log(err)
    }
  },
  fetchMarketCurrencies: async (page?: string) => {
    try {
      const response = await api<MarketCurrency[]>(
        `/market/currencies?page=${page ?? 1}`,
      )

      if (response.data) {
        set({ marketCurrencies: response.data })
      }
    } catch (err) {
      console.log(err)
    }
  },
  toggleWatchlist: async (currencyId: number) => {
    try {
      await api.post('/me/watchlist', {
        currencyId,
      })

      if (get().watchlistCurrenciesIds.includes(currencyId)) {
        set({
          watchlistCurrenciesIds: get().watchlistCurrenciesIds.filter(
            (id) => id !== currencyId,
          ),
        })
        set({
          watchlist: {
            watchlist: get().watchlist.watchlist.filter(
              (currency) => currency.id !== currencyId,
            ),
            totalItems: get().watchlist.totalItems,
          },
        })

        return
      }

      set({
        watchlistCurrenciesIds: [...get().watchlistCurrenciesIds, currencyId],
      })
    } catch (err) {
      if (err instanceof AxiosError) {
        return alert(err.response?.data.message) // TODO: add toastify lib
      }
    }
  },
  fetchWatchlist: async (page?: string) => {
    try {
      const response = await api<WatchlistResponse>(
        `/me/watchlist?page=${page ?? 1}`,
      )

      if (response.data) {
        const watchlistCurrenciesIds = response.data.watchlist.map(
          (currency) => currency.id,
        )

        set({ watchlist: response.data })
        set({ watchlistCurrenciesIds })
      }
    } catch (err) {
      console.log(err)
    }
  },
  fetchWaletCurrency: async (currencyId: string) => {
    try {
      const response = await api<WalletCurrency>(
        `/wallet/currencies/${currencyId}`,
      )

      if (response.data) {
        set({ walletCurrency: response.data })
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
