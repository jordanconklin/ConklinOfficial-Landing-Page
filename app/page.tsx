import Link from 'next/link'
import Image from 'next/image'
import ContactForm from './components/ContactForm';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-500 text-white font-sans">
      <header className="container mx-auto py-6 px-4">
        <nav className="flex justify-between items-center">
          <h1 className="text-4xl font-extrabold tracking-tight">ConklinOfficial</h1>
          <ul className="flex space-x-8">
            <li><a href="#products" className="hover:text-yellow-300 transition-colors text-lg">Products</a></li>
            <li><a href="#about" className="hover:text-yellow-300 transition-colors text-lg">About</a></li>
            <li><a href="#contact" className="hover:text-yellow-300 transition-colors text-lg">Contact</a></li>
          </ul>
        </nav>
      </header>

      <main className="container mx-auto px-4">
        <section className="py-24 text-center">
          <h2 className="text-6xl font-bold mb-6 leading-tight">Helping the next generation of young ballers.</h2>
          <p className="text-2xl mb-12 max-w-2xl mx-auto">Explore our products and become the star player of your team!</p>
          <Link href="/chatbot" className="inline-block px-8 py-4 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition-colors text-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            Chat with TekkAI
          </Link>
        </section>

        <section id="products" className="py-24">
          <h3 className="text-4xl font-bold mb-12 text-center">Featured Products</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {['Soccer Ball', 'Cleats', 'Jersey'].map((product, index) => (
              <div key={index} className="bg-white rounded-xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:scale-105">
                <div className="h-64 bg-gray-200"></div>
                <div className="p-8">
                  <h4 className="text-2xl font-semibold text-gray-800 mb-4">{product}</h4>
                  <p className="text-gray-600 mb-6">High-quality {product.toLowerCase()} for professional players.</p>
                  <button className="bg-yellow-500 text-white px-6 py-3 rounded-full hover:bg-yellow-600 transition-colors shadow-md">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="about" className="py-24 bg-white bg-opacity-10 rounded-3xl my-24 p-12">
          <h3 className="text-4xl font-bold mb-8 text-center">About Us</h3>
          <p className="text-xl text-center max-w-3xl mx-auto leading-relaxed">
            We are passionate about soccer and committed to providing the highest quality equipment for players of all levels. Our products are designed to enhance your performance and help you achieve your goals on the field.
          </p>
        </section>

        <section id="contact" className="py-24">
          <h3 className="text-4xl font-bold mb-12 text-center">Contact Us</h3>
          <ContactForm />
        </section>
      </main>

      <footer className="bg-black bg-opacity-30 py-8 mt-24">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg">&copy; 2024 SoccerBrand. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}