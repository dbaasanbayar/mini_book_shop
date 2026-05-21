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
    <main className="min-h-screen bg-cream">

      {/* Full screen image background */}
      <div className="relative w-full h-[50vh] sm:h-[55vh]">
        <Image
          src={book.imageUrl}
          alt={book.title}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />

        {/* Dark overlay at bottom for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Back button on top of image */}
        <Link
          href="/"
          className="absolute top-4 left-4 font-mono text-xs bg-cream border-2 border-ink px-3 py-1 shadow-brutal hover:shadow-none transition-all"
        >
          ← BACK
        </Link>

        {/* Book title + price on image */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h1 className="font-display text-3xl sm:text-5xl leading-tight drop-shadow">
            {book.title}
          </h1>
          <div className="flex justify-between items-center mt-1">
            <p className="font-mono text-sm opacity-90">by {book.author}</p>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs bg-white/20 border border-white/40 px-2 py-0.5">
                {book.condition}
              </span>
              <span className="font-display text-2xl">
                {book.price.toLocaleString()}₮
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Order form — compact, fits on phone screen */}
      <div className="px-4 sm:px-6 py-4 max-w-3xl mx-auto">
        {book.status === 'sold' ? (
          <div className="border-4 border-ink bg-ink text-cream font-display text-3xl text-center py-6">
            SOLD OUT
          </div>
        ) : (
          <div className="border-4 border-ink shadow-brutal bg-white p-4">
            <h2 className="font-display text-2xl text-ink mb-3">
              BI ZUGEER ENIIG AVMAAR BGAA BHGU YU!
            </h2>
            <OrderForm bookId={book.id} />
          </div>
        )}
      </div>

    </main>
  )
}
