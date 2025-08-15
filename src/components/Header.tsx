import { Link, useNavigate } from '@tanstack/react-router'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { logoutAuthOption } from '@/query/authUser'

export default function Header() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const logoutMutation = useMutation({
    ...logoutAuthOption(),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['authUser'] })
      navigate({ to: '/login' })
    },
    onError: () => {
      console.log('Error Logout')
    },
  })
  return (
    <header className="p-2 flex gap-2 bg-white text-black justify-between">
      <nav className="flex flex-row">
        <div className="px-2 font-bold">
          <Link to="/" className=" mr-5">
            Home
          </Link>
          <Link to="/produk">Produk</Link>
        </div>
      </nav>
      <nav className="flex">
        <div className="px-2">
          <button
            className="btn btn-error"
            onClick={() => logoutMutation.mutate()}
          >
            {logoutMutation.isPending ? 'Logout...' : 'Logout'}
          </button>
        </div>
      </nav>
    </header>
  )
}
