import { api } from '@/libs/api'
import { create } from 'zustand'

type User = {
  id: string
  nickname: string
  email: string
  avatarUrl: string
  createdAt: string
}

type State = {
  user: User | null
}

type Actions = {
  setUser: (user: User | null) => void
  fetchUser: () => Promise<void>
}

const initialState = {
  user: null,
}

export const useUserStore = create<State & Actions>()((set) => ({
  ...initialState,

  fetchUser: async () => {
    try {
      const response = await api<{ user: User }>('/me')

      set({ user: response.data.user })
    } catch (err) {
      console.log(err)
    }
  },

  setUser: (value: User | null) => set({ user: value }),
}))
