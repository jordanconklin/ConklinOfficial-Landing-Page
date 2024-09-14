'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ContactForm from './components/ContactForm';
import { useRouter } from 'next/navigation';


export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/logout', { method: 'POST' });
      if (response.ok) {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        router.push('/');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };
  
  const products = [
    { name: 'ConklinOfficial Quarter Zip Pullover', price: '$65.00', image: '/quarter-zip.jpg' },
    { name: 'ConklinOfficial Midweight Hoodie', price: '$26.00', image: '/midweight-hoodie.jpg' },
    { name: 'ConklinOfficial Champion T-Shirt', price: '$25.00', image: '/champion-tshirt.jpg' },
    { name: 'ConklinOfficial Classic T-Shirt', price: '$16.00', image: '/classic-tshirt.jpg' },
  ];

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-200 to-sky-300 text-gray-800 font-sans">
      <header className="container mx-auto py-6 px-4">
        <nav className="flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <Image 
              src="/brand_logo_black.png" 
              alt="ConklinOfficial Logo" 
              width={70} 
              height={25} 
              className="object-contain"
            />
          </Link>
          <ul className="flex space-x-8">
            <li><a href="#" className="hover:text-gray-600 transition-colors text-lg">Home</a></li>
            <li><a href="#products" className="hover:text-gray-600 transition-colors text-lg">Products</a></li>
            <li><a href="#contact" className="hover:text-gray-600 transition-colors text-lg">Contact</a></li>
            {isLoggedIn ? (
              <li><button onClick={handleLogout} className="hover:text-gray-600 transition-colors text-lg">Logout</button></li>
            ) : (
              <li><Link href="/login" className="hover:text-gray-600 transition-colors text-lg">Login</Link></li>
            )}
            <li><a href="#" className="text-2xl">🛒</a></li>
          </ul>
        </nav>
      </header>

      <main>
        <section className="container mx-auto px-4 flex items-center py-24">
          <div className="w-1/2 pr-12">
            <h2 className="text-6xl font-bold mb-6 leading-tight">Chat with TekkAI</h2>
            <p className="text-xl mb-12">Get personalized soccer advice and training tips from our AI assistant. Improve your game with instant, expert guidance.</p>
            <Link href="/chatbot" className="inline-block px-8 py-4 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors text-xl font-semibold">
              Try TekkAI Now →
            </Link>
          </div>
          <div className="w-1/2">
            <div className="relative w-[300px] h-[600px] mx-auto">
              <div className="absolute inset-0 bg-black rounded-[40px] shadow-xl"></div>
              <div className="absolute inset-2 bg-white rounded-[36px] overflow-hidden">
                {/* Placeholder for chatbot screenshot */}
                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                  Chatbot Screenshot
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="products" className="py-24 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-2">Featured Products</h2>
            <div className="w-24 h-1 bg-red-500 mx-auto mb-12"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {products.map((product, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <Image src={product.image} alt={product.name} width={300} height={300} className="w-full h-64 object-cover" />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                    <p className="text-gray-600">{product.price}</p>
                  </div>
                </div>
              ))}
            </div> 
          </div>
        </section>

        <section id="contact" className="py-24 bg-gradient-to-br from-sky-100 to-sky-200">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-2">Contact Us</h2>
            <div className="w-24 h-1 bg-blue-500 mx-auto mb-12"></div>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">Have questions or need assistance? We&apos;re here to help! Fill out the form below, and we&apos;ll get back to you as soon as possible.</p>
            <ContactForm />
          </div>
        </section>    

      </main>

      <footer className="bg-black text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Follow the Conklin Journey</h3>
              <p>Follow us on social media for more updates and football advice</p>
            </div>
            <div className="flex justify-center items-center">
              <Image 
                src="/brand_logo_white.png" 
                alt="ConklinOfficial Logo" 
                width={70} 
                height={25} 
                className="object-contain"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Useful Links</h3>
              <ul>
                <li><a href="#" className="hover:text-gray-300">Amazon Storefront</a></li>
                <li><a href="#" className="hover:text-gray-300">Our Mission</a></li>
                <li><a href="#" className="hover:text-gray-300">Return Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p>Copyright 2023 - ConklinOfficial</p>
          </div>
        </div>
      </footer>

      
    </div>
  );
}