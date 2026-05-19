import Link from 'next/link'

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-cream flex items-center justify-center px-6">
      <div className="max-w-md w-full border-4 border-ink shadow-brutal-lg bg-white p-8 text-center">
        <h1 className="font-display text-5xl text-ink">ORDER RECEIVED</h1>
        <p className="font-mono text-ink mt-4 leading-relaxed">
         deal! alligator gozaimasu xoxo! I will contact you on Instagram within 24 hours to confirm your order details.
        </p>
        <div className="mt-6 border-t-4 border-ink pt-6">
          <Link
            href="/"
            className="font-mono text-sm border-4 border-ink px-4 py-2 shadow-brutal hover:shadow-none transition-all inline-block"
          >
            ← BACK TO SHOP
          </Link>
        </div>
      </div>
    </main>
  )
}

