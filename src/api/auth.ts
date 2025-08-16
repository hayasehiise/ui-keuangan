import { env } from '@/env'
import axios from 'axios'

const apiUrl = env.VITE_API_URL

const api = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

export async function getCurrentUser() {
  try {
    const res = await api.get('/auth/active')
    return res.data
  } catch {
    throw Error('Unathorized')
  }
}

export async function login(input: { username: string; password: string }) {
  try {
    const res = await api.post('/auth/login', input)
    return res.data
  } catch {
    throw Error('Login Gagal')
  }
}

export async function logout() {
  try {
    await api.post('/auth/logout')
  } catch {
    throw Error('Logout Gagal')
  }
}

// export async function getCurrentUser() {
//   const res = await fetch(`${apiUrl}/auth/active`, {
//     credentials: 'include',
//   })

//   if (!res.ok) {
//     throw new Error('Unauthorize')
//   }
//   return res.json()
// }

// export async function login(input: { username: string; password: string }) {
//   const res = await fetch(`${apiUrl}/auth/login`, {
//     credentials: 'include',
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(input),
//   })

//   if (!res.ok) {
//     throw new Error('Login Gagal')
//   }

//   return res.json()
// }

// export async function logout() {
//   await fetch(`${apiUrl}`, {
//     method: 'POST',
//     credentials: 'include',
//   })
// }
