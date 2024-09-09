'use client';

import React, { FormEvent } from 'react';

export default function ContactForm() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
      <div className="mb-4">
        <input type="text" placeholder="Your Name" className="w-full px-4 py-2 rounded bg-blue-700 text-white placeholder-blue-300" />
      </div>
      <div className="mb-4">
        <input type="email" placeholder="Your Email" className="w-full px-4 py-2 rounded bg-blue-700 text-white placeholder-blue-300" />
      </div>
      <div className="mb-4">
        <textarea placeholder="Your Message" rows={4} className="w-full px-4 py-2 rounded bg-blue-700 text-white placeholder-blue-300"></textarea>
      </div>
      <button type="submit" className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 transition-colors">
        Send Message
      </button>
    </form>
  );
}