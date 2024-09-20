'use client';

import React, { FormEvent } from 'react';

export default function ContactForm() {
  
  // ***** FUNCTIONS *****
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  // ***** RETURN *****
  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white rounded-lg shadow-xl p-8">
      <div className="mb-6">
        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Your Name</label>
        <input type="text" id="name" placeholder="John Doe" className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent" />
      </div>
      <div className="mb-6">
        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Your Email</label>
        <input
          type="text"
          id="name"
          placeholder="John Doe"
          className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">Your Message</label>
        <textarea id="message" rows={4} placeholder="How can we help you?" className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"></textarea>
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50">
        Send Message
      </button>
    </form>
  );
}