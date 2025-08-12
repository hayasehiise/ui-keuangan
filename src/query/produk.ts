import { queryOptions } from '@tanstack/react-query'
import { getProduk } from '@/api/produk'

export function getProdukOption(page: number, limit: number, search: string) {
  return queryOptions({
    queryKey: ['produk', page, limit, search],
    queryFn: () => getProduk(page, limit, search),
  })
}
