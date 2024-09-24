'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function PaymentSuccessPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/');  // Redirect to home page after 5 seconds
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

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

      <main>
        <motion.section 
          className="container mx-auto px-4 flex items-center justify-center py-24"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4 text-green-600">Payment Successful!</h1>
            <p className="text-xl mb-8">Thank you for your purchase.</p>
            <p>You will be redirected to the home page in 5 seconds...</p>
            <Link href="/" className="mt-4 inline-block px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors text-lg font-semibold font-inter">
              Return to Home
            </Link>
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