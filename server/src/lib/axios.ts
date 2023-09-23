import { env } from '@/env'
import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://api.cryptorank.io/v1/',
  params: {
    api_key: env.CRYPTO_RANK_API_KEY,
  },
})
