'use client';

import { useState, useEffect } from 'react';
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
          {cartItems.length === 0 ? (
            <p className="text-center font-inter">Your cart is empty.</p>
          ) : (
            <>
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between border-b py-4">
                  <div className="flex items-center">
                    <Image src={item.image} alt={item.name} width={50} height={50} className="mr-4" />
                    <span className="font-inter">{item.name}</span>
                  </div>
                  <div className="flex items-center">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2 py-1 bg-gray-200 rounded">-</button>
                    <span className="mx-2 font-inter">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 py-1 bg-gray-200 rounded">+</button>
                    <span className="ml-4 font-inter">${(item.price * item.quantity).toFixed(2)}</span>
                    <button onClick={() => removeFromCart(item.id)} className="ml-4 text-red-500 font-inter">Remove</button>
                  </div>
                </div>
              ))}
              <div className="mt-6 text-right">
                <p className="text-xl font-bold font-inter">Total: ${total.toFixed(2)}</p>
                <button className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors font-inter">
                  Proceed to Checkout
                </button>
              </div>
            </>
          )}
        </motion.div>
      </main>
    </div>
  );
}