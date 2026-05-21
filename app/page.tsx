import Link from 'next/link'
import Image from 'next/image'
import { prisma } from '@/lib/prisma'

export const revalidate = 0

export default async function HomePage() {
  const books = await prisma.book.findMany({
    where: { status: 'available' },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <main className="min-h-screen bg-cream px-4 sm:px-6 py-6 sm:py-10">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="border-4 border-ink mb-6 sm:mb-10 p-4 sm:p-6 shadow-brutal-lg text-center">
          <h1 className="font-display text-4xl sm:text-6xl text-ink tracking-widest">
            MINI NOMU SHOP
          </h1>
          <p className="font-mono text-ink mt-2">
            — bi ulsuj bna - 
          </p>
          <p className="font-mono text-ink mt-2">
            - ta yaaraarai —
          </p>
        </div>
        
        {/* Book Grid */}
        {books.length === 0 ? (
          <div className="text-center font-mono text-ink text-xl mt-20">
            No books available right now. Check back soon.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
            {books.map((book) => (
              <Link href={`/books/${book.id}`} key={book.id}>
                <div className="border-4 border-ink shadow-brutal bg-white hover:shadow-brutal-lg hover:-translate-y-1 transition-all cursor-pointer flex flex-col">
                  <div className="relative w-full h-48 sm:h-64 border-b-4 border-ink bg-white">
                    <Image
                      src={book.imageUrl}
                      alt={book.title}
                      fill
                      className="object-contain p-1"
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-2 sm:p-4 flex flex-col flex-1">
                    <h2 className="font-display text-sm sm:text-2xl text-ink leading-tight line-clamp-2 h-10 sm:h-14">
                      {book.title}
                    </h2>
                    <p className="font-mono text-xs text-ink mt-1 truncate">
                      {book.author}
                    </p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="font-display text-sm sm:text-xl text-ink">
                        {book.price.toLocaleString()}₮
                      </span>
                      <span className="font-mono text-xs border-2 border-ink px-1 py-0.5">
                        {book.condition}
                      </span>
                    </div>
                    {/* Order button — always at bottom */}
                    <div className="mt-auto pt-2">
                      <div className="border-4 border-ink bg-ink text-cream font-display text-sm text-center py-1.5">
                        ORDER →
                      </div>
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



