import { create } from 'zustand'

type State = {
  isTransactionModalOpen: boolean
}

type Actions = {
  setIsTransactionModalOpen: (state: boolean) => void
}

const initialStates = {
  isTransactionModalOpen: false,
}

export const useStore = create<State & Actions>()((set) => ({
  ...initialStates,

  setIsTransactionModalOpen: (isTransactionModalOpen: boolean) => {
    set({ isTransactionModalOpen })
  },
}))
