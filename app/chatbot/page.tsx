'use client';
import { useState, FormEvent, useEffect } from 'react';
import Link from 'next/link';

export default function Chatbot() {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([{ text: 'Welcome to TekkAI!', sender: 'bot' }]);
    const [sessionId, setSessionId] = useState('');

    useEffect(() => {
        const fetchNewSession = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/conversations/new/', { 
                    method: 'POST',
                    redirect: 'follow'
                  });
                const data = await response.json();
                setSessionId(data.session_id);
            } catch (error) {
                console.error('Error creating new session:', error);
            }
        };

        fetchNewSession();
    }, []);

    // this is the function that will be called when the user submits a message, for now it just logs the message to the console
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (message.trim()) {
            setMessages([...messages, { text: message, sender: 'user' }]);
            setMessage('');

            try {
                const response = await fetch('http://127.0.0.1:8000/generate_tutorial/', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                    body: JSON.stringify({
                      prompt: message,
                      session_id: sessionId,
                    }),
                  });

                if (response.ok) {
                    const data = await response.json();
                    setMessages(prevMessages => [...prevMessages, { text: data.tutorial, sender: 'bot' }]);
                } else {
                    const errorData = await response.json();
                    console.error('Error from backend:', errorData.error);
                    setMessages(prevMessages => [...prevMessages, { text: 'Sorry, I encountered an error. Please try again.', sender: 'bot' }]);
                }
            } catch (error) {
                console.error('Error sending message to backend:', error);
                setMessages(prevMessages => [...prevMessages, { text: 'Sorry, I encountered an error. Please try again.', sender: 'bot' }]);
            }

            // Scroll to the bottom of the chat container
            setTimeout(() => {
                const chatContainer = document.getElementById('chat-messages');
                if (chatContainer) {
                    chatContainer.scrollTop = chatContainer.scrollHeight;
                }
            }, 0);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-sky-100 to-sky-200 text-gray-800 font-sans">        
            <header className="container mx-auto py-6 px-4">
                <nav className="flex justify-between items-center">
                    <Link href="/" className="text-4xl font-extrabold tracking-tight text-gray-800">
                        ConklinOfficial
                    </Link>
                    <Link href="/" className="text-lg hover:text-gray-600 transition-colors">
                        Back to Home
                    </Link>
                </nav>
            </header>

            <main className="container mx-auto px-4 py-12">
                <h1 className="text-5xl font-bold mb-12 text-center">Chat with TekkAI</h1>
                <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col h-[600px]">
                    <div className="flex-grow bg-gray-100 p-6 overflow-y-auto flex flex-col-reverse" id="chat-messages">
                        {messages.map((msg, index) => (
                            <div key={index} className={`mb-4 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                                <span className={`inline-block p-2 rounded-lg ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'}`}>
                                    {msg.text}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className="p-4 bg-gray-200">
                        <form className="flex" onSubmit={handleSubmit}>
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Type your message..."
                                className="flex-grow px-4 py-2 rounded-l-lg focus:outline-none text-gray-800"
                                aria-label="Chat message input"
                            />
                            <button
                                type="submit"
                                className="bg-yellow-500 text-white px-6 py-2 rounded-r-lg hover:bg-yellow-600 transition-colors font-semibold"
                                aria-label="Send message"
                            >
                                Send
                            </button>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    )
}