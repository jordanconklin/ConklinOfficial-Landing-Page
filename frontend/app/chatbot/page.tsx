'use client';
import { useState, FormEvent, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

// Conversation interface when fetching previous conversations
interface Conversation {
    id: string;
    title: string;
}

// Message interface when fetching a conversation
interface Message {
    content: string;
    role: string;
}

export default function Chatbot() {
    // ***** STATE *****
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([{ text: 'Welcome to TekkAI!', sender: 'bot' }]);
    const [sessionId, setSessionId] = useState('');
    const [previousConversations, setPreviousConversations] = useState<Conversation[]>([]);    
    const [currentConversation, setCurrentConversation] = useState(null);

    console.log("Chatbot loaded")
    
    // ***** REACT HOOKS *****
    // Hook for creating a new session
    useEffect(() => {
        fetchPreviousConversations();
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
      
        if (!currentConversation) {
          fetchNewSession();
        }
      }, [currentConversation]);

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

    // Function for fetching previous conversations to display in the chat history dropdown
    const fetchPreviousConversations = async () => {
        try {
          const response = await fetch('/api/get_previous_conversations');
          if (response.ok) {
            const data = await response.json();
            setPreviousConversations(data.conversations);
          } else {
            console.error('Failed to fetch previous conversations');
          }
        } catch (error) {
          console.error('Error fetching previous conversations:', error);
        }
      };

    // Function for loading a specific conversation based on a session ID
    const loadConversation = async (sessionId: string) => {
        try {
            const response = await fetch(`/api/conversations/${sessionId}`);
            if (response.ok) {
            const data = await response.json();
            setCurrentConversation(data);
            setMessages([
                { text: 'Welcome to TekkAI!', sender: 'bot' },
                ...data.messages.map((msg: Message) => ({ text: msg.content, sender: msg.role }))
            ]);
            setSessionId(sessionId);
            } else {
            console.error('Failed to load conversation');
            }
        } catch (error) {
            console.error('Error loading conversation:', error);
        }
    };

    // Function for starting a new conversation
    const startNewConversation = async () => {
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
            setMessages([{ text: 'Welcome to TekkAI!', sender: 'bot' }]);
            setCurrentConversation(null);
          } else {
            console.error('Failed to create new conversation');
          }
        } catch (error) {
          console.error('Error creating new conversation:', error);
        }
    };

    // ***** RETURN *****
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
                <motion.h1 
                    className="text-6xl font-bold mb-12 text-center font-inter"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    Chat with TekkAI
                </motion.h1>
                <motion.div 
                    className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden flex h-[600px]"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <div className="w-1/4 bg-gray-100 p-4 overflow-y-auto">
                        <h2 className="text-xl font-bold mb-4 font-inter">Previous Chats</h2>
                        <ul>
                            {previousConversations.map((conv) => (
                                <li key={conv.id} className="mb-2">
                                    <button
                                        onClick={() => loadConversation(conv.id)}
                                        className="text-left w-full hover:bg-gray-200 p-2 rounded text-sm font-inter"
                                    >
                                        {conv.title}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex-1 flex flex-col">
                        <div className="flex justify-between items-center mb-4 p-4">
                            <h2 className="text-2xl font-bold font-inter">Current Chat</h2>
                            <button
                                onClick={startNewConversation}
                                className="bg-yellow-500 text-white px-6 py-2 rounded-full hover:bg-yellow-600 transition-colors font-inter"
                            >
                                Start New Conversation
                            </button>
                        </div>
                        <div className="flex-grow bg-white p-6 overflow-y-auto flex flex-col" id="chat-messages">
                            <div className="mb-4">
                                <span className="inline-block p-3 rounded-lg bg-gray-300 text-gray-800">
                                    Welcome to TekkAI!
                                </span>
                            </div>
                            {messages.slice(1).map((msg, index) => (
                                <div key={index} className={`mb-4 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                                    <span className={`inline-block p-3 rounded-lg ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'}`}>
                                        <div className="whitespace-pre-wrap">
                                            {msg.text.split('\n').map((line, i) => (
                                                <p key={i} className="mb-2">
                                                    {line.split(/(\*\*[^*]+\*\*)/).map((part, j) => (
                                                        part.startsWith('**') && part.endsWith('**') ? (
                                                            <strong key={j}>{part.slice(2, -2)}</strong>
                                                        ) : (
                                                            <span key={j}>{part}</span>
                                                        )
                                                    ))}
                                                </p>
                                            ))}
                                        </div>
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
                                    className="bg-blue-500 text-white px-6 py-2 rounded-r-lg hover:bg-blue-600 transition-colors font-semibold"
                                    aria-label="Send message"
                                >
                                    Send
                                </button>
                            </form>
                        </div>
                    </div>
                </motion.div>
            </main>
        </div>
    )
}