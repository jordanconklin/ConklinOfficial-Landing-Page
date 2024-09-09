// import Link from 'next/link'

// export default function Home() {
//   return (
//     <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-800 to-blue-600 text-white">
//       <header className="mb-8">
//         <h1 className="text-4xl font-bold">Welcome to Your Soccer Brand</h1>
//       </header>
//       <main className="text-center">
//         <p className="mb-4">Explore our products and become the star player of your team!</p>
//         <Link href="/chatbot" className="inline-block px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors">
//           Chat with TekkAI
//         </Link>
//       </main>
//     </div>
//   )
// }

import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-green text-white">
      <header className="container mx-auto py-8 px-4">
        <nav className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">SoccerBrand</h1>
          <ul className="flex space-x-6">
            <li><a href="#products" className="hover:text-blue-200 transition-colors">Products</a></li>
            <li><a href="#about" className="hover:text-blue-200 transition-colors">About</a></li>
            <li><a href="#contact" className="hover:text-blue-200 transition-colors">Contact</a></li>
          </ul>
        </nav>
      </header>

      <main className="container mx-auto px-4">
        <section className="py-20 text-center">
          <h2 className="text-5xl font-bold mb-6">Welcome to Your Soccer Brand</h2>
          <p className="text-xl mb-8">Explore our products and become the star player of your team!</p>
          {/* <Link href="/chatbot" className="inline-block px-6 py-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors text-lg font-semibold"> */}
          <Link href="/chatbot" className="inline-block px-6 py-3 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition-colors text-lg font-semibold">
            Chat with TekkAI
          </Link>
        </section>

        <section id="products" className="py-16">
          <h3 className="text-3xl font-bold mb-8 text-center">Featured Products</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['Soccer Ball', 'Cleats', 'Jersey'].map((product, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-6">
                  <h4 className="text-xl font-semibold text-gray-800 mb-2">{product}</h4>
                  <p className="text-gray-600 mb-4">High-quality {product.toLowerCase()} for professional players.</p>
                  <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="about" className="py-16 bg-green-700 rounded-lg my-16 p-8">
          <h3 className="text-3xl font-bold mb-6 text-center">About Us</h3>
          <p className="text-lg text-center max-w-3xl mx-auto">
            We are passionate about soccer and committed to providing the highest quality equipment for players of all levels. Our products are designed to enhance your performance and help you achieve your goals on the field.
          </p>
        </section>

        <section id="contact" className="py-16">
          <h3 className="text-3xl font-bold mb-8 text-center">Contact Us</h3>
          <form className="max-w-lg mx-auto">
            <div className="mb-4">
              <input type="text" placeholder="Your Name" className="w-full px-4 py-2 rounded bg-blue-700 text-white placeholder-blue-300" />
            </div>
            <div className="mb-4">
              <input type="email" placeholder="Your Email" className="w-full px-4 py-2 rounded bg-blue-700 text-white placeholder-blue-300" />
            </div>
            <div className="mb-4">
              <textarea placeholder="Your Message" rows={4} className="w-full px-4 py-2 rounded bg-blue-700 text-white placeholder-blue-300"></textarea>
            </div>
            <button type="submit" className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 transition-colors">
              Send Message
            </button>
          </form>
        </section>
      </main>

      <footer className="bg-green-900 py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 SoccerBrand. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}