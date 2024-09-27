'use client';

import { useState, useEffect } from 'react';
import Image from "next/legacy/image";
import Link from 'next/link';
import { motion } from 'framer-motion';
import CartSlideOver from '../../components/CartSlideOver';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface CartItem extends Product {
  quantity: number;
  size: string;
}

export default function ProductDetail({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${params.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }
        const productData = await response.json();
        setProduct(productData);
      } catch (error) {
        console.error('Error fetching product:', error);
        // Handle error (e.g., show error message to user)
      }
    };

    fetchProduct();
  }, [params.id]);

  const addToCart = () => {
    if (product && selectedSize) {
      const newItem: CartItem = { ...product, quantity: 1, size: selectedSize };
      console.log('Adding to cart:', newItem);
      setCartItems(prevItems => {
        const updatedItems = prevItems.find(item => item.id === product.id && item.size === selectedSize)
          ? prevItems.map(item => 
              item.id === product.id && item.size === selectedSize
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          : [...prevItems, newItem];
        console.log('Updated cart:', updatedItems);
        localStorage.setItem('cart', JSON.stringify(updatedItems));
        console.log('Cart saved to localStorage');
        return updatedItems;
      });
      setIsCartOpen(true);
    } else {
      alert('Please select a size');
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-sky-100 text-gray-800 font-sans">
      <header className="container mx-auto py-6 px-4">
        <nav className="flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/brand_logo_black.png"
              alt="ConklinOfficial Logo"
              width={180}
              height={80}
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
          className="max-w-6xl mx-auto bg-white p-8 rounded-xl shadow-2xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <Image
                src={product.image}
                alt={product.name}
                width={500}
                height={500}
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
            <div className="md:w-1/2 md:pl-8">
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
              <p className="text-2xl font-semibold mb-6">${product.price.toFixed(2)}</p>
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Select Size</h2>
                <div className="flex space-x-4">
                  {['S', 'M', 'L', 'XL'].map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border rounded-md ${
                        selectedSize === size
                          ? 'bg-blue-500 text-white'
                          : 'bg-white text-gray-800 hover:bg-gray-100'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              <button
                onClick={addToCart}
                className="w-full bg-blue-500 text-white py-3 px-6 rounded-full hover:bg-blue-600 transition-colors text-lg font-semibold"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </motion.div>
      </main>

      <CartSlideOver isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cartItems={cartItems} />
    </div>
  );
}
