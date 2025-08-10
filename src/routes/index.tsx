import { createFileRoute } from '@tanstack/react-router'
import { redirect } from '@tanstack/react-router'
import { authUserOption } from '@/query/authUser'

export const Route = createFileRoute('/')({
  beforeLoad: async ({ context }) => {
    try {
      await context.queryClient.ensureQueryData(authUserOption())
    } catch {
      throw redirect({ to: '/login' })
    }
  },
  component: App,
})

function App() {
  return (
    <div className="text-center">
      <h1>Dashboard Page</h1>
    </div>
  )
}
