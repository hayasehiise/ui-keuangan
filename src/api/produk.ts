import { env } from '@/env'
import axios from 'axios'

const api = axios.create({
  baseURL: env.VITE_API_URL,
  withCredentials: true,
})

export async function getProduk(page: number, limit: number, search?: string) {
  const params = {
    page,
    limit,
    ...(search ? { search } : {}),
  }

  const { data } = await api.get('/produk', { params })
  return data
}
