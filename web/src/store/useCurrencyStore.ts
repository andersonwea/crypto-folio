import { MarketCurrency } from '@/@types'
import { create } from 'zustand'

type State = {
  search: string
  selectedMarketCurrency: MarketCurrency | null
  marketCurrencies: MarketCurrency[]
}

interface Actions {
  setSearch: (value: string) => void
  setSelectedMarketCurrency: (value: MarketCurrency | null) => void
  setMarketCurrencies: (value: MarketCurrency[]) => void
  reset: () => void
}

const initialState: State = {
  search: '',
  selectedMarketCurrency: null,
  marketCurrencies: [],
}

export const useCurrencyStore = create<State & Actions>()((set) => ({
  ...initialState,
  setSearch: (value: string) => {
    set({ search: value })
  },
  setSelectedMarketCurrency: (value: MarketCurrency | null) => {
    set({ selectedMarketCurrency: value })
  },
  setMarketCurrencies: (value: MarketCurrency[]) => {
    set({ marketCurrencies: value })
  },
  reset: () => {
    set(initialState)
  },
}))
