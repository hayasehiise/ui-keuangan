import Header from '@/components/Header'
import {
  Outlet,
  createFileRoute,
  redirect,
  useRouteContext,
} from '@tanstack/react-router'
import { authUserOption } from '@/query/authUser'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/_layout')({
  beforeLoad: async ({ context }) => {
    try {
      const user = await context.queryClient.ensureQueryData(authUserOption())
      return { user }
    } catch {
      throw redirect({ to: '/login' })
    }
  },
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
