import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/login')({
  component: LoginLayout,
})

function LoginLayout() {
  return (
    <div className="flex w-full h-screen justify-center items-center">
      <Outlet />
    </div>
  )
}
