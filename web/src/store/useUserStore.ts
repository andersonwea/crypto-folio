import { api } from '@/libs/api'
import { AxiosError } from 'axios'
import { create } from 'zustand'

type User = {
  id: string
  nickname: string
  email: string
  avatarUrl: string
  createdAt: string
}

type UserProfile = {
  nickname: string
  avatarUrl: string
}

type State = {
  user: User | null
}

type Actions = {
  setUser: (user: User | null) => void
  fetchUser: () => Promise<void>
  updateUserProfile: (data: UserProfile) => Promise<void>
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
  updateUserProfile: async (data: UserProfile) => {
    try {
      const response = await api.put('/me/profile', data)

      set({ user: response.data })

      return alert('Usuário atualizado com sucesso') // TODO: add toastify lib
    } catch (err) {
      if (err instanceof AxiosError) {
        return alert(err.response?.data.message) // TODO: add toastify lib
      }

      console.log(err)
    }
  },

  setUser: (value: User | null) => set({ user: value }),
}))
