'use client';
import { useState, FormEvent, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Chatbot() {
    // ***** STATE *****
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([{ text: 'Welcome to TekkAI!', sender: 'bot' }]);
    const [sessionId, setSessionId] = useState('');

    console.log("Chatbot loaded")
    
    // ***** REACT HOOKS *****
    // Hook for creating a new session
    useEffect(() => {
        const fetchNewSession = async () => {
          try {
            const response = await fetch('/api/conversations', { 
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
            });
            if (response.ok) {
              const data = await response.json();
              setSessionId(data.session_id);
            } else {
              console.error('Failed to create new session');
            }
          } catch (error) {
            console.error('Error creating new session:', error);
          }
        };
      
        fetchNewSession();
      }, []);

    // Hook for scrolling to the bottom of the chat container
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // ***** FUNCTIONS *****
    // Function for handling the form submission when user sends a message
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (message.trim()) {
            setMessages(prevMessages => [...prevMessages, { text: message, sender: 'user' }]);
            setMessage('');

            try {
                const response = await fetch('/api/generate_tutorial', {
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
            setTimeout(scrollToBottom, 0);
        }
    };

    // Function for scrolling to the bottom of the chat container
    const scrollToBottom = () => {
        const chatContainer = document.getElementById('chat-messages');
        if (chatContainer) {
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    };

    // ***** RETURN *****
    return (
        <div className="min-h-screen bg-gradient-to-br from-sky-200 to-sky-300 text-gray-800 font-sans">
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
                    <Link href="/" className="text-lg hover:text-gray-600 transition-colors">
                        Back to Home
                    </Link>
                </nav>
            </header>

            <main className="container mx-auto px-4 py-12">
                <h1 className="text-5xl font-bold mb-12 text-center">Chat with TekkAI</h1>
                <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col h-[600px]">
                    <div className="flex-grow bg-gray-100 p-6 overflow-y-auto flex flex-col-reverse" id="chat-messages">
                        <div>
                            {messages.map((msg, index) => (
                                <div key={index} className={`mb-4 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                                    <span className={`inline-block p-3 rounded-lg ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'}`}>
                                        {msg.sender === 'bot' ? (
                                            <div className="whitespace-pre-wrap">
                                                {msg.text.split('\n').map((line, i) => (
                                                    <p key={i}>
                                                        {line.split('**').map((part, j) => (
                                                            j % 2 === 0 ? part : <strong key={j}>{part}</strong>
                                                        ))}
                                                    </p>
                                                ))}
                                            </div>
                                        ) : (
                                            msg.text
                                        )}
                                    </span>
                                </div>
                            ))}
                        </div>
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