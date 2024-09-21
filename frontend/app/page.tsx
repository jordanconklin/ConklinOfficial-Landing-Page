'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ContactForm from './components/ContactForm';
import { useRouter } from 'next/navigation';
import ProductList from './components/ProductList';
import { motion } from 'framer-motion';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface CartItem extends Product {
  quantity: number;
}

export default function Home() {
  // ***** STATE *****
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const products: Product[] = [
    { id: '1', name: 'ConklinOfficial Quarter Zip Pullover', price: 65.00, image: '/quarter-zip.jpg' },
    { id: '2', name: 'ConklinOfficial Midweight Hoodie', price: 26.00, image: '/midweight-hoodie.jpg' },
    { id: '3', name: 'ConklinOfficial Champion T-Shirt', price: 25.00, image: '/champion-tshirt.jpg' },
    { id: '4', name: 'ConklinOfficial Classic T-Shirt', price: 16.00, image: '/classic-tshirt.jpg' },
  ];

  // ***** REACT HOOKS *****
  // Hook to check if the user is logged in
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await fetch('/api/check-auth');
        const data = await response.json();
        setIsLoggedIn(data.isLoggedIn);
      } catch (error) {
        console.error('Error checking login status:', error);
        setIsLoggedIn(false);
      }
    };
    checkLoginStatus();
  }, []);

  console.log("Home page loaded")

  // ***** FUNCTIONS *****
  // Function to handle logging out
  const handleLogout = async () => {
    console.log("Attempting logging out...")
    try {
      const response = await fetch('/api/logout', { method: 'POST' });
      if (response.ok) {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        await router.push('/');
        window.location.reload();
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const addToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      let newItems;
      if (existingItem) {
        newItems = prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        newItems = [...prevItems, { ...product, quantity: 1 }];
      }
      localStorage.setItem('cart', JSON.stringify(newItems));
      return newItems;
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  // ***** RETURN *****
  return (
    <div className="min-h-screen bg-sky-100 text-gray-800 font-sans">
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
            <li><a href="#" className="hover:text-gray-600 transition-colors text-lg font-inter">Home</a></li>
            <li><a href="#products" className="hover:text-gray-600 transition-colors text-lg font-inter">Products</a></li>
            <li><a href="#contact" className="hover:text-gray-600 transition-colors text-lg font-inter">Contact</a></li>
            {isLoggedIn ? (
              <li><button onClick={handleLogout} className="hover:text-gray-600 transition-colors text-lg">Logout</button></li>
            ) : (
              <li><Link href="/login" className="hover:text-gray-600 transition-colors text-lg">Login</Link></li>
            )}
            <li>
              <Link href="/cart" className="text-2xl">
                🛒
                {cartItems.length > 0 && (
                  <span className="bg-red-500 text-white rounded-full px-2 py-1 text-xs absolute -mt-2 -mr-2">
                    {cartItems.length}
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <motion.section 
          className="container mx-auto px-4 flex items-center py-24"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="w-1/2 pr-12"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-6xl font-bold mb-6 leading-tight font-inter">Chat with TekkAI</h2>
            <p className="text-xl mb-12 font-inter">Get personalized soccer advice and training tips from our AI assistant. Improve your game with instant, expert guidance.</p>
            <Link href="/chatbot" className="inline-block px-8 py-4 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors text-xl font-semibold font-inter">
              Try TekkAI Now →
            </Link>
          </motion.div>
          <motion.div 
            className="w-1/2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative w-[300px] h-[600px] mx-auto">
              <div className="absolute inset-0 bg-black rounded-[40px] shadow-xl"></div>
              <div className="absolute inset-2 bg-white rounded-[36px] overflow-hidden">
              <Image
                src="/conklin-training.jpg"
                alt="TekkAI Chatbot Interface"
                layout="fill"
                objectFit="cover"
                className="w-full h-full"
              />
                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                  Chatbot Screenshot
                </div>
              </div>
            </div>
          </motion.div>
        </motion.section>

        <motion.section 
          id="products" 
          className="py-24 bg-white"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-2 font-inter">New on the ConklinOfficial Store</h2>
            <div className="w-24 h-1 bg-blue-500 mx-auto mb-12"></div>
            <ProductList products={products} addToCart={addToCart} />
          </div>
        </motion.section>

        <motion.section 
          id="contact" 
          className="py-24 bg-sky-100"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-2">Contact Us</h2>
            <div className="w-24 h-1 bg-blue-500 mx-auto mb-6"></div>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Have questions or need assistance? We're here to help! Fill out the form below, and we'll get back to you as soon as possible.
            </p>
            <ContactForm />
          </div>
        </motion.section>    
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
                <li><a href="https://www.amazon.com/shop/conklinfootball" className="hover:text-gray-300">Amazon Storefront</a></li>
                <li><a href="https://www.tiktok.com/@conklinofficial" className="hover:text-gray-300">TikTok</a></li>
                <li><a href="https://www.instagram.com/conklinofficial/" className="hover:text-gray-300">Instagram</a></li>
                <li><a href="https://www.youtube.com/channel/UC-5hKmXbLicdUuV0e3Bk1AQ" className="hover:text-gray-300">Youtube</a></li>
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