import { MarketCurrency } from '@/@types'
import { api } from '@/libs/api'
import { create } from 'zustand'

type State = {
  isTransactionModalOpen: boolean
  activeSearch: boolean
  searchResult: MarketCurrency[]
  selectedMarketCurrency: MarketCurrency | null
}

type Actions = {
  setActiveSearch: (value: boolean) => void
  setSelectedMarketCurrency: (value: MarketCurrency | null) => void
  searchCryptocurrencies: (search: string) => void
  setIsTransactionModalOpen: (state: boolean) => void
}

const initialStates = {
  isTransactionModalOpen: false,
  activeSearch: false,
  searchResult: [],
  selectedMarketCurrency: null,
}

export const useStore = create<State & Actions>()((set) => ({
  ...initialStates,

  setActiveSearch: (value: boolean) => {
    set({ activeSearch: value })
  },
  setSelectedMarketCurrency: (value: MarketCurrency | null) => {
    set({ selectedMarketCurrency: value })
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
  setIsTransactionModalOpen: (isTransactionModalOpen: boolean) => {
    set({ isTransactionModalOpen })
  },
}))
