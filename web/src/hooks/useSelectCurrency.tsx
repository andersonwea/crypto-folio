import { create } from 'zustand'

type State = {
  search: string
  currency: string
}

interface Actions {
  setSearch: (value: string) => void
  setCurrency: (value: string) => void
  reset: () => void
}

const initialState: State = {
  search: '',
  currency: '',
}

export const useSelectCurrency = create<State & Actions>()((set) => ({
  ...initialState,
  setSearch: (value: string) => {
    set({ search: value })
  },
  setCurrency: (value: string) => {
    set({ currency: value })
  },
  reset: () => {
    set(initialState)
  },
}))
