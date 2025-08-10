import { queryOptions } from '@tanstack/react-query'
import { getCurrentUser } from '@/api/auth'

export function authUserOption() {
  return queryOptions({
    queryKey: ['authUser'],
    queryFn: getCurrentUser,
  })
}

export function loginAuthOption() {
  return queryOptions({
    queryKey: ['authUser'],
    queryFn: getCurrentUser,
    staleTime: 1000 * 60 * 5,
  })
}
