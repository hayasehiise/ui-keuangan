import { env } from '@/env'

const apiUrl = env.VITE_API_URL

export async function getCurrentUser() {
  const res = await fetch(`${apiUrl}/auth/active`, {
    credentials: 'include',
  })

  if (!res.ok) return null
  return res.json
}

export async function login(username: string, password: string) {
  const res = await fetch(`${apiUrl}/auth/login`, {
    credentials: 'include',
    method: 'POST',
    headers: { 'Content-Type': 'application/js' },
    body: JSON.stringify({ username, password }),
  })

  if (!res.ok) throw new Error('Login Gagal')
  return res.json()
}

export async function logout() {
  await fetch(`${apiUrl}`, {
    method: 'POST',
    credentials: 'include',
  })
}
