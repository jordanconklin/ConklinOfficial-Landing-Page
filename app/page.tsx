import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-800 to-blue-600 text-white">
      <header className="mb-8">
        <h1 className="text-4xl font-bold">Welcome to Your Soccer Brand</h1>
      </header>
      <main className="text-center">
        <p className="mb-4">Explore our products and become the star player of your team!</p>
        <Link href="/chatbot" className="inline-block px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors">
          Chat with TekkAI
        </Link>
      </main>
    </div>
  )
}
