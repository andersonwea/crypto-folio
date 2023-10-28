import { create } from 'zustand'

type User = {
  id: string
  nickname: string
  email: string
  avatarUrl: string
  createdAt: string
}

type State = {
  isAuthenticated: boolean
  user: User | null
}

type Actions = {
  setAuthenticated: (value: boolean) => void
  setUser: (user: User) => void
}

const initialState = {
  isAuthenticated: false,
  user: null,
}

export const useAuthStore = create<State & Actions>()((set) => ({
  ...initialState,
  setAuthenticated: (value: boolean) => set({ isAuthenticated: value }),

  setUser: (value: User) => set({ user: value }),
}))
