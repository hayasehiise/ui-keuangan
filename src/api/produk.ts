import { env } from '@/env'

const apiUrl = env.VITE_API_URL

export async function getProduk(page: number, limit: number, search?: string) {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  })

  if (search) {
    params.append('search', search)
  }

  const res = await fetch(`${apiUrl}/produk?${params.toString()}`, {
    credentials: 'include',
  })

  if (!res.ok) {
    throw new Error('Gagal Memuat Data Produk')
  }

  return res.json()
}
