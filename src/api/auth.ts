import { env } from '@/env'

const apiUrl = env.VITE_API_URL

export async function getCurrentUser() {
  const res = await fetch(`${apiUrl}/auth/active`, {
    credentials: 'include',
  })

  if (!res.ok) {
    throw new Error('Unauthorize')
  }
  return res.json()
}

export async function login(input: { username: string; password: string }) {
  const res = await fetch(`${apiUrl}/auth/login`, {
    credentials: 'include',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })

  if (!res.ok) {
    throw new Error('Login Gagal')
  }

  return res.json()
}

export async function logout() {
  await fetch(`${apiUrl}`, {
    method: 'POST',
    credentials: 'include',
  })
}
