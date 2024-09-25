'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

export default function ProductDetail({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');

  useEffect(() => {
    // In a real application, we will fetch the product data from an API
    // For now, we'll use mock data
    const mockProduct: Product = {
      id: params.id,
      name: 'ConklinOfficial Quarter Zip Pullover',
      price: 65.00,
      image: '/quarter-zip.jpg',
    };
    setProduct(mockProduct);
  }, [params.id]);

  const addToCart = () => {
    if (product && selectedSize) {
      // Add to cart logic here
      console.log(`Added ${product.name} (${selectedSize}) to cart`);
    } else {
      alert('Please select a size');
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-sky-100 py-6">
        <div className="container mx-auto px-4">
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
        </div>
      </header>

      <main className="flex-grow bg-white">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-1/2">
              <Image
                src={product.image}
                alt={product.name}
                width={500}
                height={500}
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
            <div className="md:w-1/2">
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <p className="text-2xl font-semibold mb-6">${product.price.toFixed(2)}</p>
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Select a size</h2>
                <div className="flex flex-wrap gap-2">
                  {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border rounded-md ${
                        selectedSize === size
                          ? 'bg-black text-white'
                          : 'bg-white text-black hover:bg-gray-100'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              <button
                onClick={addToCart}
                className="w-full bg-black text-white py-3 px-6 rounded-md hover:bg-gray-800 transition-colors text-lg font-semibold"
              >
                Add to Bag
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
