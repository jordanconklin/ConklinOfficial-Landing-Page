'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            if (response.ok) {
                router.push('/'); // Redirect to home page after successful login
            } else {
                const data = await response.json();
                setError(data.message || 'Login failed');
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
        }
    };

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
                    className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-2xl"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-4xl font-bold mb-6 text-center font-inter">Login</h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block mb-1 font-inter">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-1 font-inter">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        {error && <p className="text-red-500">{error}</p>}
                        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-full hover:bg-blue-600 transition-colors font-inter">
                            Login
                        </button>
                    </form>
                </motion.div>
            </main>
        </div>
    );
}