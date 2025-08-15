import { getCurrentUser } from '@/api/auth'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/user')({
  beforeLoad: async () => {
    const data = await getCurrentUser()
    if (data.role !== 'ADMIN') {
      throw redirect({ to: '/' })
    }

    return { data }
  },
  component: UserPage,
})

function UserPage() {
  return (
    <div className="flex flex-col w-full px-10 py-5">
      <p className="font-black text-4xl">User Management Page</p>
    </div>
  )
}
