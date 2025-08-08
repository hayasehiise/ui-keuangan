import { createFileRoute } from '@tanstack/react-router'
import { redirect } from '@tanstack/react-router'
import { getCurrentUser } from '@/api/auth'

export const Route = createFileRoute('/produk/')({
  beforeLoad: async ({ context }) => {
    const queryClient = context.queryClient
    const cached = queryClient.getQueriesData({
      queryKey: ['authUser'],
    })
    if (cached) return

    try {
      await queryClient.fetchQuery({
        queryKey: ['authUser'],
        queryFn: getCurrentUser,
      })
    } catch {
      throw redirect({ to: '/login' })
    }
  },
  component: ProdukPage,
})

function ProdukPage() {
  return (
    <div className="text-center">
      <h1>Produk Page</h1>
    </div>
  )
}
