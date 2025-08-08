import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getCurrentUser,
  login as loginUser,
  logout as logoutUser,
} from '@/api/auth'

export function useAuthQuery() {
  return useQuery({
    queryKey: ['authUser'],
    queryFn: getCurrentUser,
    staleTime: Infinity, // Cache selamanya sampai di-invalidasi
    gcTime: Infinity,
    retry: false,
  })
}

export function useLogin() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      queryClient.setQueryData(['authUser'], data)
    },
  })
}

export function useLogout() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.removeQueries({
        queryKey: ['authUser'],
      })
    },
  })
}
