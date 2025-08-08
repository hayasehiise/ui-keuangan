import { useQuery, useQueryClient } from '@tanstack/react-query'
import {
  getCurrentUser,
  login as loginApi,
  logout as logoutApi,
} from '@/api/auth'

export function useAuth() {
  const queryClient = useQueryClient()

  const userQuery = useQuery({
    queryKey: ['authUser'],
    queryFn: getCurrentUser,
    staleTime: 1000 * 60 * 5,
  })

  async function login(username: string, password: string) {
    await loginApi(username, password)
    await queryClient.invalidateQueries({ queryKey: ['authUser'] })
  }

  async function logout() {
    await logoutApi()
    queryClient.setQueryData(['authUser'], null)
  }
}
