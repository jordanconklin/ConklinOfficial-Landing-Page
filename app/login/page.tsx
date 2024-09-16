'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    // ***** STATE *****
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    console.log("Logging in...")
    
    // ***** FUNCTIONS *****
    // Function to handle form submission when user logs in
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Login form submitted');
        setError(''); // Clear any previous errors
        try {
            console.log('Sending login request to /api/login');
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
        
            console.log('Login response status:', response.status);
            const data = await response.json();
            console.log('Login response data:', data);
        
            if (response.ok) {
                // localStorage.setItem('token', data.access_token);
                console.log('Login successful, redirecting...');
                router.push('/');
            } else {
                console.error('Login failed:', data.error);
                setError(data.error || 'Login failed. Please try again.');
            }
        } catch (error) {
            console.error('Error during login:', error);
            setError('An unexpected error occurred. Please try again.');
        }
    };

    // ***** RETURN *****
    return (
        <div className="min-h-screen bg-gradient-to-br from-sky-200 to-sky-300 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
            <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
            <form onSubmit={handleSubmit}>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                Email
                </label>
                <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                required
                />
            </div>
            <div className="mb-6">
                <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                Password
                </label>
                <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                required
                />
            </div>
            <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300"
            >
                Log In
            </button>
            </form>
            <p className="mt-4 text-center">
              Don&apos;t have an account? <Link href="/register" className="text-blue-500 hover:underline">Register</Link>
            </p>
        </div>
        </div>
    );
}