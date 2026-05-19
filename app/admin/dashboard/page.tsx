'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useAdmin } from '@/hooks/useAdmin'

export default function DashboardPage() {
  const { getToken, logout } = useAdmin()
  const [stats, setStats] = useState({
    newOrders: 0,
    totalBooks: 0,
    soldBooks: 0,
    availableBooks: 0,
  })

  useEffect(() => {
    async function fetchStats() {
      const token = getToken()

      const [ordersRes, booksRes] = await Promise.all([
        fetch('/api/admin/orders', { headers: { Authorization: `Bearer ${token}` } }),
        fetch('/api/admin/books', { headers: { Authorization: `Bearer ${token}` } }),
      ])

      const orders = await ordersRes.json()
      const books = await booksRes.json()

      setStats({
        newOrders: orders.filter((o: any) => o.status === 'new').length,
        totalBooks: books.length,
        soldBooks: books.filter((b: any) => b.status === 'sold').length,
        availableBooks: books.filter((b: any) => b.status === 'available').length,
      })
    }

    fetchStats()
  }, [])

  return (
    <main className="px-4 sm:px-6 py-6 sm:py-10 max-w-4xl mx-auto">

      {/* Header */}
      <div className="flex justify-between items-center mb-6 border-4 border-ink p-4 shadow-brutal-lg">
        <h1 className="font-display text-3xl sm:text-4xl text-ink">DASHBOARD</h1>
        <button
          onClick={logout}
          className="font-mono text-sm border-2 border-ink px-3 py-1 shadow-brutal hover:shadow-none transition-all"
        >
          LOGOUT
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { label: 'NEW ORDERS', value: stats.newOrders, bg: 'bg-yellow-300' },
          { label: 'AVAILABLE', value: stats.availableBooks, bg: 'bg-white' },
          { label: 'SOLD', value: stats.soldBooks, bg: 'bg-white' },
          { label: 'TOTAL BOOKS', value: stats.totalBooks, bg: 'bg-white' },
        ].map((stat) => (
          <div
            key={stat.label}
            className={`border-4 border-ink shadow-brutal p-4 text-center ${stat.bg}`}
          >
            <div className="font-display text-4xl sm:text-5xl text-ink">{stat.value}</div>
            <div className="font-mono text-xs text-ink mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Nav */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/admin/orders">
          <div className="border-4 border-ink shadow-brutal bg-white p-6 hover:shadow-brutal-lg hover:-translate-y-1 transition-all cursor-pointer">
            <h2 className="font-display text-3xl text-ink">ORDERS</h2>
            <p className="font-mono text-sm text-ink mt-2">
              View and manage all buyer orders
            </p>
          </div>
        </Link>

        <Link href="/admin/books">
          <div className="border-4 border-ink shadow-brutal bg-white p-6 hover:shadow-brutal-lg hover:-translate-y-1 transition-all cursor-pointer">
            <h2 className="font-display text-3xl text-ink">BOOKS</h2>
            <p className="font-mono text-sm text-ink mt-2">
              Add, edit and remove books
            </p>
          </div>
        </Link>
      </div>

    </main>
  )
}