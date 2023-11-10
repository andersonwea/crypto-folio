import { api } from '@/libs/api'
import { AxiosError } from 'axios'
import { create } from 'zustand'

interface NewTransactionInput {
  amount: number
  value: number
  type: string
  createdAt: Date
}

export interface Transaction {
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
  isTransactionModalOpen: boolean
}

type Actions = {
  setTransactions: (transactions: Transaction[]) => void
  fetchTransactions: (page: string) => Promise<void>
  deleteTransaction: (
    transactionId: string,
    currencyId: string,
  ) => Promise<void>
  editTransaction: (transactionData: Omit<Transaction, 'type'>) => Promise<void>
  setIsTransactionModalOpen: (isTransactionModalOpen: boolean) => void
  createTransaction: (
    data: NewTransactionInput,
    currencyId: string,
  ) => Promise<Transaction | void>
}

const initialState: State = {
  transactions: [],
  totalTransactions: 0,
  isTransactionModalOpen: false,
}

export const useTransactionStore = create<State & Actions>()((set, get) => ({
  ...initialState,
  setTransactions: (transactions: Transaction[]) => {
    set({ transactions })
  },
  setIsTransactionModalOpen: (isTransactionModalOpen: boolean) => {
    set({ isTransactionModalOpen })
  },
  editTransaction: async (transactionData: Omit<Transaction, 'type'>) => {
    try {
      await api.put(
        `/wallet/currencies/${transactionData.currency_id}/transactions/${transactionData.id}`,
        {
          amount: transactionData.amount,
          value: transactionData.value,
          createdAt: transactionData.created_at,
        },
      )

      set({
        transactions: get().transactions.map((transaction) => {
          if (transaction.id === transactionData.id) {
            return { ...transaction, ...transactionData }
          }

          return transaction
        }),
      })
    } catch (err) {
      if (err instanceof AxiosError) {
        return alert(err.response?.data.message) // TODO: add toastify lib
      }

      console.log(err)
    }
  },
  deleteTransaction: async (transactionId: string, currencyId: string) => {
    try {
      await api.delete(
        `/wallet/currencies/${currencyId}/transactions/${transactionId}`,
      )

      set({
        transactions: get().transactions.filter(
          (transaction) => transaction.id !== transactionId,
        ),
      })
    } catch (err) {
      if (err instanceof AxiosError) {
        return alert(err.response?.data.message) // TODO: add toastify lib
      }

      console.log(err)
    }
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
