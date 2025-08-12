import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/')({
  component: IndexPage,
})

function IndexPage() {
  return (
    <div className="flex flex-col w-full px-10 py-5">
      <p className="font-black text-4xl">Dashboard Page</p>
    </div>
  )
}
