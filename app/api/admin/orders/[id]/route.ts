import { isAuthenticated } from '@/lib/middleware'
import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!await isAuthenticated(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  const body = await request.json()
  const { status } = body

  const order = await prisma.order.update({
    where: { id: Number(id) },
    data: { status },
  })

  if (status === 'done') {
    await prisma.book.update({
      where: { id: order.bookId },
      data: { status: 'sold' },
    })
  }

  return NextResponse.json(order)
}
