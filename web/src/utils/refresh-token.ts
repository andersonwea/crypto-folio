import { api } from '@/libs/api'

export async function refreshToken() {
  try {
    const response = await api.patch('/token/refresh')

    return response.data
  } catch (err) {
    console.error(err)
  }
}
