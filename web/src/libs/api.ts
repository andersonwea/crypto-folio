import { refreshToken } from '@/utils/refresh-token'
import axios from 'axios'
import cookies from 'js-cookie'

export const api = axios.create({
  baseURL: 'https://puce-worried-snapper.cyclic.app',
  headers: {
    'Content-Type': 'application/json',
  },
  // withCredentials: true,
})

api.interceptors.request.use(
  async (config) => {
    const token = cookies.get('token')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

api.interceptors.request.use(
  (response) => {
    return response
  },

  async function (error) {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      const response = await refreshToken()

      const { token } = response

      cookies.set('token', token)
      api.defaults.headers.common.Authorization = `Bearer ${token}`

      return api(originalRequest)
    }

    return Promise.reject(error)
  },
)
