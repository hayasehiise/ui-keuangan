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
    <div className="">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}
        >
          <legend className="fieldset-legend">Login</legend>
          <form.Field
            name="username"
            children={(field) => (
              <div>
                <label htmlFor={field.name} className="label">
                  Username
                </label>
                <input
                  id={field.name}
                  value={field.state.value ?? ''}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="input"
                />
              </div>
            )}
          />
          <form.Field
            name="password"
            children={(field) => (
              <div>
                <label htmlFor={field.name} className="label">
                  Password
                </label>
                <input
                  id={field.name}
                  type="password"
                  value={field.state.value ?? ''}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="input"
                />
              </div>
            )}
          />
          <form.Subscribe selector={(s) => s.canSubmit}>
            {(canSubmit) => (
              <div>
                <button
                  type="submit"
                  disabled={!canSubmit}
                  className="btn btn-neutral mt-4"
                >
                  {canSubmit ? (
                    'Login'
                  ) : (
                    <span className="loading loading-bars loading-sm"></span>
                  )}
                </button>
              </div>
            )}
          </form.Subscribe>
        </form>
      </fieldset>
    </div>
  )
}
