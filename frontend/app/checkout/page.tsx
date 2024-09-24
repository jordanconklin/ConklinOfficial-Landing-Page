'use client';

import { useState, useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from '../components/PaymentForm';
import { motion } from 'framer-motion';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export default function CheckoutPage() {
  const [amount, setAmount] = useState<number | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const amountParam = params.get('amount');
    if (amountParam) {
      setAmount(parseFloat(amountParam));
    }

    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  if (amount === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-sky-100 flex items-center justify-center p-4">
      <motion.div 
        className="bg-white rounded-lg shadow-lg p-8 max-w-4xl w-full"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-2xl font-bold mb-6">Complete Your Purchase</h1>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between mb-2">
                <span>{item.name} (Qty {item.quantity})</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t mt-4 pt-4">
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${amount.toFixed(2)}</span>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <Elements stripe={stripePromise}>
              <PaymentForm amount={amount} />
            </Elements>
          </div>
        </div>
      </motion.div>
    </div>
  );
}