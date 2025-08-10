import { createFileRoute } from '@tanstack/react-router'
import { redirect } from '@tanstack/react-router'
import { authUserOption } from '@/query/authUser'

export const Route = createFileRoute('/produk/')({
  beforeLoad: async ({ context }) => {
    try {
      await context.queryClient.ensureQueryData(authUserOption())
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
