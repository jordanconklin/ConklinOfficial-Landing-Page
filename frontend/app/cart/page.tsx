'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Cart from '../components/Cart';

interface CartItem {
  id: string;
  quantity: number;
  name: string;
  price: number;
  // Add other properties as needed
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
          <Link href="/" className="text-lg hover:text-gray-600 transition-colors">
            Back to Home
          </Link>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Your Cart</h1>
        <Cart items={cartItems} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />
      </main>
    </div>
  );
}