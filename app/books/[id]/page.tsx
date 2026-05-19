import Link from 'next/link'
import Image from 'next/image'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import OrderForm from '@/app/_components/OrderFrom'

export const revalidate = 0

export default async function BookPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  if (isNaN(Number(id))) notFound()

  const book = await prisma.book.findUnique({
    where: { id: Number(id) },
  })

  if (!book) notFound()

  return (
    <main className="min-h-screen bg-cream px-4 sm:px-6 py-6 sm:py-10">
      <div className="max-w-3xl mx-auto">

        {/* Back */}
        <Link
          href="/"
          className="font-mono text-sm border-2 border-ink px-3 py-1 shadow-brutal inline-block mb-6 hover:shadow-none transition-all"
        >
          ← BACK TO SHOP
        </Link>

        <div className="border-4 border-ink shadow-brutal-lg bg-white">

          {/* Book image — taller on phone, shorter on desktop */}
          <div className="relative w-full h-64 sm:h-80 md:h-96 border-b-4 border-ink">
            <Image
              src={book.imageUrl}
              alt={book.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
          </div>

          <div className="p-4 sm:p-6">

            {/* Title + price — stack on phone, side by side on desktop */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
              <div>
                <h1 className="font-display text-4xl sm:text-5xl text-ink leading-tight">
                  {book.title}
                </h1>
                <p className="font-mono text-sm sm:text-base text-ink mt-1">
                  by {book.author}
                </p>
              </div>

              <div className="flex sm:flex-col sm:text-right flex-row items-center sm:items-end gap-3">
                <div className="font-display text-3xl sm:text-4xl text-ink">
                  {book.price.toLocaleString()}₮
                </div>
                <span className="font-mono text-xs border-2 border-ink px-2 py-1">
                  {book.condition}
                </span>
              </div>
            </div>
      
            {/* Order section */}
            {book.status === 'sold' ? (
              <div className="mt-6 border-4 border-ink bg-ink text-cream font-display text-2xl sm:text-3xl text-center py-4">
                SOLD OUT
              </div>
            ) : (
              <div className="mt-6">
                <h2 className="font-display text-2xl sm:text-3xl text-ink mb-4">
                  BI ZUGEER ENIIG AVMAAR BGAA BHGU YU!
                </h2>
                <OrderForm bookId={book.id} />
              </div>
            )}

          </div>
        </div>

      </div>
    </main>
  )
}
