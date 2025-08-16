import Header from '@/components/Header'
import {
  Outlet,
  createFileRoute,
  redirect,
  useRouteContext,
} from '@tanstack/react-router'
import { authUserOption } from '@/query/authUser'
import { getCurrentUser } from '@/api/auth'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/_layout')({
  beforeLoad: async ({ context }) => {
    try {
      const data = await getCurrentUser()
      const user = context.queryClient.setQueryData(
        authUserOption().queryKey,
        data,
      )
      return { user }
    } catch {
      throw redirect({ to: '/login' })
    }
  },
  pendingComponent: () => <div>Loading user...</div>,
  component: AppLayout,
})

function AppLayout() {
  const { user } = useRouteContext({ from: '/_layout' })
  const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    if (user) {
      setShowToast(true)
      const timer = setTimeout(() => {
        setShowToast(false)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [user])

  console.log(showToast)
  return (
    <div className="flex flex-col w-full h-screen">
      <Header />
      <Outlet />
      {showToast && (
        <div className="toast toast-end">
          <div className="alert alert-success">
            <span>Akun Login Sekarang {user.name}</span>
          </div>
        </div>
      )}
    </div>
  )
}
