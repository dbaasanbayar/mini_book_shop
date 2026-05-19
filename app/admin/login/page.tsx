'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const router = useRouter()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
        
    if (res.ok) {
      const data = await res.json()
      localStorage.setItem('admin_token', data.token)
      router.push('/admin/dashboard')
    } else {
      const data = await res.json()
      setError(data.error || 'Login failed')
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-cream flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="border-4 border-ink shadow-brutal-lg bg-white p-8">
          <h1 className="font-display text-4xl text-ink mb-6 text-center">
            ADMIN LOGIN
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="font-mono text-sm text-ink block mb-1">EMAIL</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full border-4 border-ink px-3 py-2 font-mono bg-cream shadow-brutal focus:outline-none"
              />
            </div>

            <div>
              <label className="font-mono text-sm text-ink block mb-1">PASSWORD</label>
              <input
                type="password"
                required
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full border-4 border-ink px-3 py-2 font-mono bg-cream shadow-brutal focus:outline-none"
              />
            </div>

            {error && (
              <p className="font-mono text-sm text-red-600 border-2 border-red-600 px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full border-4 border-ink bg-ink text-cream font-display text-2xl py-3 shadow-brutal hover:shadow-none transition-all disabled:opacity-50"
            >
              {loading ? 'LOGGING IN...' : 'LOGIN'}
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}