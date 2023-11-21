'use server'

import { NewUserInput, User } from '@/@types'
import { api } from '@/libs/api'
import { AxiosError } from 'axios'

interface RegisterUserResponse {
  user: User
}

export async function registerUser(data: NewUserInput) {
  try {
    const response = await api.post<RegisterUserResponse>('/users', {
      email: data.email,
      nickname: data.nickname,
      password: data.password,
    })

    const { user } = response.data

    return {
      user,
    }
  } catch (err) {
    if (err instanceof AxiosError && err.response?.data.message) {
      return {
        registerError: err.response.data.message as string,
      }
    }

    return {
      error: 'Erro inesperado, tente novamente mais tarde.',
    }
  }
}
