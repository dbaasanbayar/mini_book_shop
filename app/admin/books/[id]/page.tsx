'use client'

import { use, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAdmin } from '@/hooks/useAdmin'
import ImageUpload from '@/app/_components/ImageUpload'

export default function EditBookPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { getToken } = useAdmin()
  const router = useRouter()
  const [form, setForm] = useState({
    title: '',
    author: '',
    price: '',
    condition: 'good',
    imageUrl: '',
    status: 'available',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [fetching, setFetching] = useState(true)

  useEffect(() => {
    async function fetchBook() {
      const res = await fetch(`/api/admin/books/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      if (res.ok) {
        const book = await res.json()
        setForm({
          title: book.title,
          author: book.author,
          price: String(book.price),
          condition: book.condition,
          imageUrl: book.imageUrl,
          status: book.status,
        })
      }
      setFetching(false)
    }
    fetchBook()
  }, [id])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch(`/api/admin/books/${id}`, {
      method: 'PUT',
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

  if (fetching) {
    return (
      <main className="px-6 py-10 max-w-xl mx-auto">
        <p className="font-mono text-ink">Loading...</p>
      </main>
    )
  }

  return (
    <main className="px-6 py-10 max-w-xl mx-auto">
      <div className="flex justify-between items-center mb-8 border-4 border-ink p-4 shadow-brutal-lg">
        <h1 className="font-display text-4xl text-ink">EDIT BOOK</h1>
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
        {/* Photo section */}
        <div>
          <label className="font-mono text-sm text-ink block mb-2">PHOTO</label>

          {/* Always show current/new photo */}
          {form.imageUrl && (
            <div className="relative mb-3">
              <img
                src={form.imageUrl}
                className="w-full h-52 object-cover border-4 border-ink shadow-brutal"
              />
              <span className="absolute top-2 left-2 font-mono text-xs bg-cream border-2 border-ink px-2 py-1">
                CURRENT
              </span>
            </div>
          )}

          {/* Upload new photo — replaces current */}
          <ImageUpload
            onUpload={(url) => setForm({ ...form, imageUrl: url })}
            label="UPLOAD NEW PHOTO (replaces current)"
          />
        </div>

        {[
          { label: 'TITLE', key: 'title', type: 'text' },
          { label: 'AUTHOR', key: 'author', type: 'text' },
          { label: 'PRICE (₮)', key: 'price', type: 'number' },
        ].map((field) => (
          <div key={field.key}>
            <label className="font-mono text-sm text-ink block mb-1">
              {field.label} *
            </label>
            <input
              type={field.type}
              required
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
            
        <div>
          <label className="font-mono text-sm text-ink block mb-1">STATUS *</label>
          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            className="w-full border-4 border-ink px-3 py-2 font-mono bg-cream shadow-brutal focus:outline-none"
          >
            <option value="available">Available</option>
            <option value="sold">Sold</option>
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
          {loading ? 'SAVING...' : 'UPDATE BOOK'}
        </button>
      </form>
    </main>
  )
}
