import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  const body = await request.json()
  const { bookId, buyerName, buyerInstagram, message } = body

  if (!bookId || !buyerName || !buyerInstagram) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const book = await prisma.book.findUnique({
    where: { id: Number(bookId) },
  })

  if (!book || book.status === 'sold') {
    return NextResponse.json({ error: 'Book not available' }, { status: 400 })
  }

  const order = await prisma.order.create({
    data: {
      bookId: Number(bookId),
      buyerName,
      buyerInstagram,
      message,
    },
  })

  // Send email notification
  const emailResult = await resend.emails.send({
    from: 'Book Shop <onboarding@resend.dev>',
    to: process.env.ADMIN_EMAIL!,
    subject: `📚 New Order — ${book.title}`,
    html: `
      <div style="font-family: monospace; padding: 24px; border: 4px solid #1a1a1a;">
        <h1 style="font-size: 28px; margin-bottom: 16px;">NEW ORDER RECEIVED</h1>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Book</td>
            <td>${book.title}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Price</td>
            <td>${book.price.toLocaleString()}₮</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Buyer</td>
            <td>${buyerName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Instagram</td>
            <td>${buyerInstagram}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Message</td>
            <td>${message || '—'}</td>
          </tr>
        </table>
        <div style="margin-top: 24px; padding: 12px; background: #fffff0; border: 2px solid #1a1a1a;">
          Go DM them on Instagram: <strong>${buyerInstagram}</strong>
        </div>
      </div>
    `,
  })

  console.log('Email result:', emailResult)

  return NextResponse.json(order, { status: 201 })
}
