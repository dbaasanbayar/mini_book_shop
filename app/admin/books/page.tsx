'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useAdmin } from '@/hooks/useAdmin'


type Book = {
  id: number
  title: string
  author: string
  price: number
  condition: string
  status: string
  imageUrl: string
}

export default function AdminBooksPage() {
  const { getToken } = useAdmin()
  const [books, setBooks] = useState<Book[]>([])

  useEffect(() => {
    fetchBooks()
  }, [])

  async function fetchBooks() {
    const res = await fetch('/api/admin/books', {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
    const data = await res.json()
    setBooks(data)
  }

  async function deleteBook(id: number) {
    if (!confirm('Delete this book?')) return
    await fetch(`/api/admin/books/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${getToken()}` },
    })
    fetchBooks()
  }

  return (
    <main className="px-6 py-10 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8 border-4 border-ink p-4 shadow-brutal-lg">
        <h1 className="font-display text-4xl text-ink">BOOKS</h1>
        <div className="flex gap-3">
          <Link
            href="/admin/books/new"
            className="font-mono text-sm border-4 border-ink bg-ink text-cream px-3 py-1 shadow-brutal hover:shadow-none transition-all"
          >
            + ADD BOOK
          </Link>
          <a
            href="/admin/dashboard"
            className="font-mono text-sm border-2 border-ink px-3 py-1 shadow-brutal hover:shadow-none transition-all"
          >
            ← BACK
          </a>
        </div>
      </div>

      <div className="space-y-4">
        {books.length === 0 && (
          <p className="font-mono text-ink text-center mt-20">No books yet.</p>
        )}

        {books.map((book) => (
          <div
            key={book.id}
            className="border-4 border-ink shadow-brutal bg-white p-4 flex gap-4 items-center"
          >
            <img
              src={book.imageUrl}
              alt={book.title}
              className="w-16 h-20 object-cover border-2 border-ink shrink-0"
            />

            <div className="flex-1">
              <h2 className="font-display text-2xl text-ink">{book.title}</h2>
              <p className="font-mono text-sm text-ink">{book.author}</p>
              <div className="flex gap-3 mt-1">
                <span className="font-mono text-sm text-ink">
                  {book.price.toLocaleString()}₮
                </span>
                <span className="font-mono text-xs border-2 border-ink px-2">
                  {book.condition}
                </span>
                <span
                  className={`font-mono text-xs border-2 border-ink px-2 ${
                    book.status === 'sold' ? 'bg-ink text-cream' : 'bg-green-200'
                  }`}
                >
                  {book.status.toUpperCase()}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Link
                href={`/admin/books/${book.id}`}
                className="font-mono text-xs border-2 border-ink px-3 py-1 shadow-brutal hover:shadow-none transition-all text-center"
              >
                EDIT
              </Link>
              <button
                onClick={() => deleteBook(book.id)}
                className="font-mono text-xs border-2 border-ink px-3 py-1 shadow-brutal hover:shadow-none transition-all cursor-pointer bg-red-200"
              >
                DELETE
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}

