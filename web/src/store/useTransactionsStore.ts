import { api } from '@/libs/api'
import { AxiosError } from 'axios'
import { create } from 'zustand'

interface NewTransactionInput {
  amount: number
  value: number
  type: string
  createdAt: Date
}

type Transaction = {
  id: string
  type: string
  value: number
  amount: number
  created_at: Date
  currency_id: string
}

type State = {
  transactions: Transaction[]
  totalTransactions: number
}

type Actions = {
  setTransactions: (transactions: Transaction[]) => void
  fetchTransactions: (page: string) => Promise<void>
  createTransaction: (
    data: NewTransactionInput,
    currencyId: string,
  ) => Promise<Transaction | void>
}

const initialState: State = {
  transactions: [],
  totalTransactions: 0,
}

export const useTransactionStore = create<State & Actions>()((set, get) => ({
  ...initialState,
  setTransactions: (transactions: Transaction[]) => {
    set({ transactions })
  },
  fetchTransactions: async (page: string) => {
    try {
      const response = await api(`/wallet/currencies/transactions?page=${page}`)

      set({ transactions: response.data.transactions })
      set({ totalTransactions: response.data.totalTransactions })
    } catch (err) {
      if (err instanceof AxiosError) {
        return alert(err.response?.data.message) // TODO: add toastify lib
      }

      console.log(err)
    }
  },

  createTransaction: async (data: NewTransactionInput, currencyId: string) => {
    try {
      const response = await api.post(
        `/wallet/currencies/${currencyId}/transactions`,
        {
          amount: data.amount,
          value: data.value,
          type: data.type,
          createdAt: data.createdAt,
        },
      )

      set({ transactions: [...get().transactions, response.data] })

      return response.data
    } catch (err) {
      if (err instanceof AxiosError) {
        return alert(err.response?.data.message) // TODO: add toastify lib
      }

      console.log(err)
    }
  },
}))
