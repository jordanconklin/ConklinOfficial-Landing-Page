'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from "next/legacy/image";
import { motion } from 'framer-motion';

export default function Register() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                router.push('/login'); // Redirect to login page after successful registration
            } else {
                const data = await response.json();
                setError(data.error || 'Registration failed');
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
                    className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-2xl"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-4xl font-bold mb-6 text-center font-inter">Register</h1>
                    {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block mb-1 font-inter">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-1 font-inter">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors">
                            Register
                        </button>
                    </form>
                    <p className="mt-4 text-center">
                        Already have an account? <Link href="/login" className="text-blue-500 hover:underline">Login here</Link>
                    </p>
                </motion.div>
            </main>
        </div>
    );
}