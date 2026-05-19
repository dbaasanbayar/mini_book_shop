'use client'

import { useAdmin } from '@/hooks/useAdmin'
import { useEffect, useState } from 'react'

type Order = {
  id: number
  buyerName: string
  buyerInstagram: string
  message: string | null
  status: string
  createdAt: string
  book: { title: string; price: number }
}

export default function AdminOrdersPage() {
  const { getToken } = useAdmin()
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    fetchOrders()
  }, [])

  async function fetchOrders() {
    const res = await fetch('/api/admin/orders', {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
    const data = await res.json()
    setOrders(data)
  }

  async function updateStatus(id: number, status: string) {
    await fetch(`/api/admin/orders/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ status }),
    })
    fetchOrders()
  }

  const statusColor: Record<string, string> = {
    new: 'bg-yellow-300',
    contacted: 'bg-blue-200',
    done: 'bg-green-200',
  }

  return (
    <main className="px-4 sm:px-6 py-6 sm:py-10 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6 border-4 border-ink p-4 shadow-brutal-lg">
        <h1 className="font-display text-3xl sm:text-4xl text-ink">ORDERS</h1>
        <a
          href="/admin/dashboard"
          className="font-mono text-sm border-2 border-ink px-3 py-1 shadow-brutal hover:shadow-none transition-all"
        >
          ← BACK
        </a>
      </div>

      <div className="space-y-4">
        {orders.length === 0 && (
          <p className="font-mono text-ink text-center mt-20">No orders yet.</p>
        )}

        {orders.map((order) => (
          <div
            key={order.id}
            className="border-4 border-ink shadow-brutal bg-white p-4"
          >
            {/* Top row — title + status badge */}
            <div className="flex justify-between items-start gap-2 mb-3">
              <h2 className="font-display text-xl sm:text-2xl text-ink leading-tight">
                {order.book.title}
              </h2>
              <span className={`font-mono text-xs border-2 border-ink px-2 py-1 shrink-0 ${statusColor[order.status]}`}>
                {order.status.toUpperCase()}
              </span>
            </div>

            {/* Buyer info */}
            <p className="font-mono text-sm text-ink">
              {order.buyerName}
            </p>
            <p className="font-mono text-sm text-ink font-bold">
              {order.buyerInstagram}
            </p>
            {order.message && (
              <p className="font-mono text-sm text-ink mt-1 italic">
                "{order.message}"
              </p>
            )}
            <p className="font-mono text-xs text-ink mt-1 opacity-60">
              {new Date(order.createdAt).toLocaleDateString()}
            </p>

            {/* Action buttons — full width on mobile */}
            <div className="mt-3">
              {order.status === 'new' && (
                <button
                  onClick={() => updateStatus(order.id, 'contacted')}
                  className="w-full font-mono text-sm border-2 border-ink py-2 shadow-brutal hover:shadow-none transition-all bg-blue-200 cursor-pointer"
                >
                  MARK CONTACTED
                </button>
              )}
              {order.status === 'contacted' && (
                <button
                  onClick={() => updateStatus(order.id, 'done')}
                  className="w-full font-mono text-sm border-2 border-ink py-2 shadow-brutal hover:shadow-none transition-all bg-green-200 cursor-pointer"
                >
                  MARK DONE
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}

