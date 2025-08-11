import { useLogin } from '@/lib/auth'
import { loginAuthOption } from '@/query/authUser'
import { useForm } from '@tanstack/react-form'
import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/login/')({
  beforeLoad: async ({ context }) => {
    try {
      const user = await context.queryClient.fetchQuery(loginAuthOption())
      if (user) {
        return redirect({ to: '/' })
      }
    } catch {
      console.error('Not logged in, proceed to login page')
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
              type="password"
              value={field.state.value ?? ''}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          </div>
        )}
      />
      <form.Subscribe selector={(s) => s.canSubmit}>
        {(canSubmit) => (
          <div>
            <button type="submit" disabled={!canSubmit}>
              {canSubmit ? 'Login' : 'Waiting'}
            </button>
          </div>
        )}
      </form.Subscribe>
    </form>
  )
}
