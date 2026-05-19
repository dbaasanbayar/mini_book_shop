'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAdmin } from '@/hooks/useAdmin'
import ImageUpload from '@/app/_components/ImageUpload'

export default function NewBookPage() {
  const { getToken } = useAdmin()
  const router = useRouter()
  const [form, setForm] = useState({
    title: '',
    author: '',
    price: '',
    condition: 'good',
    imageUrl: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (!form.imageUrl) {
      setError('Please upload a book photo')
      setLoading(false)
      return
    }

    const res = await fetch('/api/admin/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(form),
    })

    if (res.ok) {
      router.push('/admin/books')
    } else {
      const data = await res.json()
      setError(data.error || 'Something went wrong')
      setLoading(false)
    }
  }

  return (
    <main className="px-6 py-10 max-w-xl mx-auto">
      <div className="flex justify-between items-center mb-8 border-4 border-ink p-4 shadow-brutal-lg">
        <h1 className="font-display text-4xl text-ink">ADD BOOK</h1>
        <a
          href="/admin/books"
          className="font-mono text-sm border-2 border-ink px-3 py-1 shadow-brutal hover:shadow-none transition-all"
        >
          ← BACK
        </a>
      </div>

      <form
        onSubmit={handleSubmit}
        className="border-4 border-ink shadow-brutal bg-white p-6 space-y-4"
      >
        <ImageUpload onUpload={(url) => setForm({ ...form, imageUrl: url })} />

        {[
          { label: 'TITLE', key: 'title', type: 'text', placeholder: 'Atomic Habits' },
          { label: 'AUTHOR', key: 'author', type: 'text', placeholder: 'James Clear' },
          { label: 'PRICE (₮)', key: 'price', type: 'number', placeholder: '15000' },
        ].map((field) => (
          <div key={field.key}>
            <label className="font-mono text-sm text-ink block mb-1">
              {field.label} *
            </label>
            <input
              type={field.type}
              required
              placeholder={field.placeholder}
              value={form[field.key as keyof typeof form]}
              onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
              className="w-full border-4 border-ink px-3 py-2 font-mono bg-cream shadow-brutal focus:outline-none"
            />
          </div>
        ))}

        <div>
          <label className="font-mono text-sm text-ink block mb-1">CONDITION *</label>
          <select
            value={form.condition}
            onChange={(e) => setForm({ ...form, condition: e.target.value })}
            className="w-full border-4 border-ink px-3 py-2 font-mono bg-cream shadow-brutal focus:outline-none"
          >
            <option value="new">New</option>
            <option value="good">Good</option>
            <option value="worn">Worn</option>
          </select>
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
          {loading ? 'SAVING...' : 'SAVE BOOK'}
        </button>
      </form>
    </main>
  )
}