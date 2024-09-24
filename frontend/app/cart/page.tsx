'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Cart from '../components/Cart';

interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }
  
export default function CartPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    // Load cart items from localStorage
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  const removeFromCart = (id: string) => {
    setCartItems((prevItems: CartItem[]) => {
      const newItems = prevItems.filter((item) => item.id !== id);
      localStorage.setItem('cart', JSON.stringify(newItems));
      return newItems;
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    setCartItems((prevItems) => {
      const newItems = prevItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );
      localStorage.setItem('cart', JSON.stringify(newItems));
      return newItems;
    });
  };

  const proceedToCheckout = () => {
    // Calculate the total amount
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    
    // Redirect to the checkout page with the total amount
    router.push(`/checkout?amount=${total.toFixed(2)}`);
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

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
          <Link href="/" className="text-lg hover:text-gray-600 transition-colors font-inter">
            Back to Home
          </Link>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-12">
        <motion.div 
          className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-2xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-bold mb-6 text-center font-inter">Your Cart</h1>
          <Cart
            items={cartItems}
            removeFromCart={removeFromCart}
            updateQuantity={updateQuantity}
            proceedToCheckout={proceedToCheckout}
          />
        </motion.div>
      </main>
    </div>
  );
}