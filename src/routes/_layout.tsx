import Header from '@/components/Header'
import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout')({
  component: AppLayout,
})

function AppLayout() {
  return (
    <div className="flex flex-col w-full h-screen">
      <Header />
      <Outlet />
    </div>
  )
}
