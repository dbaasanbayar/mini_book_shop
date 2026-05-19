import Link from 'next/link'
import Image from 'next/image'
import { prisma } from '@/lib/prisma'

export default async function HomePage() {
  const books = await prisma.book.findMany({
    where: { status: 'available' },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <main className="min-h-screen bg-cream px-6 py-10">
      <div className="max-w-5xl mx-auto">
    
        {/* Header */}
        <div className="border-4 border-ink mb-10 p-6 shadow-brutal-lg text-center">
          <h1 className="font-display text-6xl text-ink tracking-widest">
            MINI NOMO SHOP
          </h1>
          <p className="font-mono text-ink mt-2">
            — bi ulsuj bna, ta yaaraarai —
          </p>
        </div>

        {/* Book Grid */}
        {books.length === 0 ? (
          <div className="text-center font-mono text-ink text-xl mt-20">
            No books available right now. Check back soon.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {books.map((book) => (
              <Link href={`/books/${book.id}`} key={book.id}>
                <div className="border-4 border-ink shadow-brutal bg-white hover:shadow-brutal-lg hover:-translate-y-1 transition-all hover:bg-pink-100 cursor-pointer">
                  <div className="relative w-full h-52 border-b-4 border-ink">
                    <Image
                      src={book.imageUrl}
                      alt={book.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-4">
                    <h2 className="font-display text-2xl text-ink leading-tight">
                      {book.title}
                    </h2>
                    <p className="font-mono text-sm text-ink mt-1">
                      {book.author}
                    </p>
                    <div className="flex justify-between items-center mt-4">
                      <span className="font-display text-xl text-ink">
                        {book.price.toLocaleString()}₮
                      </span>
                      <span className="font-mono text-xs border-2 border-ink px-2 py-1">
                        {book.condition}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="mt-16 text-center font-mono text-sm text-ink border-t-4 border-ink pt-6">
          DM on Instagram to ask questions →{' '}
          <Link href={"https://www.instagram.com/xbonded/"}><span className="font-bold">@Kiss Me Thru The Phone</span></Link>
        </div>
      </div>
    </main>
  )
}



