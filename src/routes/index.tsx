import { createFileRoute } from '@tanstack/react-router'
import { redirect } from '@tanstack/react-router'
import { authUserOption } from '@/query/authUser'

export const Route = createFileRoute('/')({
  beforeLoad: async ({ context }) => {
    try {
      const user = await context.queryClient.ensureQueryData(authUserOption())
      return { user }
    } catch {
      throw redirect({ to: '/login' })
    }
  },
  component: App,
})

function App() {
  const { user } = Route.useRouteContext()
  console.log(user)
  return (
    <div className="text-center">
      <h1>Dashboard Page</h1>
    </div>
  )
}
