import { getCurrentUser } from '@/api/auth'
import { useLogin } from '@/lib/auth'
import { useForm } from '@tanstack/react-form'
import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/login')({
  beforeLoad: async ({ context }) => {
    try {
      const user = await context.queryClient.fetchQuery({
        queryKey: ['authUser'],
        queryFn: getCurrentUser,
        staleTime: 1000 * 60 * 5,
      })
      console.log(`logged in as ${user.name}`)
      if (user) {
        return redirect({ to: '/' })
      }
    } catch {
      console.log('Not logged in, proceed to login page')
    }
  },
  component: LoginPage,
})

function LoginPage() {
  const login = useLogin()
  const navigate = useNavigate()

  const form = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
    onSubmit: async ({ value }) => {
      await login.mutateAsync(value)
      navigate({ to: '/' })
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
    >
      <form.Field
        name="username"
        children={(field) => (
          <div>
            <label htmlFor={field.name}>Username</label>
            <input
              id={field.name}
              value={field.state.value ?? ''}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          </div>
        )}
      />
      <form.Field
        name="password"
        children={(field) => (
          <div>
            <label htmlFor={field.name}>Password</label>
            <input
              id={field.name}
              value={field.state.value ?? ''}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          </div>
        )}
      />
      <form.Subscribe selector={(s) => [s.canSubmit, s.isSubmitting]}>
        {([canSubmit, isSubmitting]) => (
          <div>
            <button type="submit" disabled={!canSubmit || isSubmitting}>
              {isSubmitting ? 'Logging in' : 'Login'}
            </button>
          </div>
        )}
      </form.Subscribe>
    </form>
  )
}
