import axios, { AxiosError } from 'axios'
import cookies from 'js-cookie'

type FailedRequestsQueueType = {
  onSucess: (token: string) => void
  onFailed: (err: AxiosError) => void
}

let isRefreshing = false
let failedRequestsQueue: FailedRequestsQueueType[] = []

export const api = axios.create({
  baseURL: 'http://localhost:3333',
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  async (config) => {
    const token = cookies.get('cryptofolio.token')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

api.interceptors.response.use(
  (response) => {
    return response
  },

  async function (error) {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest.sent) {
      originalRequest.sent = true

      if (!isRefreshing) {
        isRefreshing = true

        api
          .patch('/token/refresh', {}, { withCredentials: true })
          .then((response) => {
            const { token } = response.data

            cookies.set('cryptofolio.token', token)
            api.defaults.headers.Authorization = `Bearer ${token}`

            failedRequestsQueue.forEach((request) => request.onSucess(token))
            failedRequestsQueue = []
          })
          .catch((err) => {
            failedRequestsQueue.forEach((request) => request.onFailed(err))
            failedRequestsQueue = []
          })
          .finally(() => {
            isRefreshing = false
          })
      }

      return new Promise((resolve, reject) => {
        failedRequestsQueue.push({
          onSucess: (token: string) => {
            originalRequest.headers.Authorization = `Bearer ${token}`

            resolve(api(originalRequest))
          },
          onFailed: (err: AxiosError) => {
            reject(err)
          },
        })
      })
    }
  },
)
