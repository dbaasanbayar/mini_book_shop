'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function OrderForm({ bookId }: { bookId: number }) {
  const router = useRouter()
  const [form, setForm] = useState({
    buyerName: '',
    buyerInstagram: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bookId, ...form }),
    })

    if (res.ok) {
      router.push('/thank-you')
    } else {
      const data = await res.json()
      setError(data.error || 'Something went wrong')
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="font-mono text-xs text-ink block mb-1">НЭР *</label>
          <input
            type="text"
            required
            value={form.buyerName}
            onChange={(e) => setForm({ ...form, buyerName: e.target.value })}
            className="w-full border-4 border-ink px-2 py-1.5 font-mono text-sm bg-cream shadow-brutal focus:outline-none"
            placeholder="kat"
          />
        </div>

        <div>
          <label className="font-mono text-xs text-ink block mb-1">INSTAGRAM *</label>
          <input
            type="text"
            required
            value={form.buyerInstagram}
            onChange={(e) => setForm({ ...form, buyerInstagram: e.target.value })}
            className="w-full border-4 border-ink px-2 py-1.5 font-mono text-sm bg-cream shadow-brutal focus:outline-none"
            placeholder="@handle"
          />
        </div>
      </div>

      <div>
        <label className="font-mono text-xs text-ink block mb-1">МЕССЕЖ (заавал биш)</label>
        <textarea
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full border-4 border-ink px-2 py-1.5 font-mono text-sm bg-cream shadow-brutal focus:outline-none h-14 resize-none"
          placeholder="Асуулт байна уу?"
        />
      </div>

      {error && (
        <p className="font-mono text-xs text-red-600 border-2 border-red-600 px-2 py-1">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full border-4 border-ink bg-ink text-cream font-display text-xl py-2 shadow-brutal hover:shadow-none transition-all disabled:opacity-50"
      >
        {loading ? 'ИЛГЭЭЖ БАЙНА...' : 'ЗАХИАЛАХ →'}
      </button>

    </form>
  )
}
