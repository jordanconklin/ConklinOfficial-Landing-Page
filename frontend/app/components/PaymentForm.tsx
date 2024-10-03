import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useRouter } from 'next/navigation';

const PaymentForm = ({ amount }: { amount: number }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      return;
    }

    try {
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          amount: amount * 100, 
          currency: 'usd' 
        })
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('Error response:', response.status, data);
        throw new Error(data.error || 'Failed to create payment intent');
      }

      const { clientSecret } = data;

      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        throw new Error('Card element not found');
      }

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            email: email,
          },
        }
      });

      if (result.error) {
        throw new Error(result.error.message || 'Payment failed');
      } else {
        router.push('/payment-success');
      }
    } catch (err) {
      console.error('Payment error:', err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label htmlFor="card-element" className="block text-sm font-medium text-gray-700 mb-1">Card information</label>
        <div className="border border-gray-300 rounded-md p-3">
          <CardElement id="card-element" options={{style: {base: {fontSize: '16px'}}}} />
        </div>
      </div>
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <button 
        type="submit" 
        disabled={!stripe || processing}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-gray-400 transition-colors"
      >
        {processing ? 'Processing...' : `Pay $${amount.toFixed(2)}`}
      </button>
      <div className="text-center text-sm text-gray-500 mt-4">
        <p>Powered by Stripe</p>
      </div>
    </form>
  );
}

export default PaymentForm;