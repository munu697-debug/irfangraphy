import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, MessageSquare } from 'lucide-react';

const INITIAL_MESSAGES = [
    { sender: 'bot', text: 'Hello! I am the Master Calligrapher studio assistant. How can I help you today?' }
];

const PREDEFINED_QA = [
    {
        q: 'What services do you offer?',
        a: 'We offer bespoke wedding stationery, luxury brand identity & logotype design, live event scribing, and fine art commissions.'
    },
    {
        q: 'What is the timeline for a commission?',
        a: 'We typically require 6-8 weeks for custom wedding stationery and 4-6 weeks for brand identity projects.'
    },
    {
        q: 'Do you offer calligraphy courses?',
        a: 'Yes, we offer professional cohort-based courses ranging from beginner Foundational Hand to advanced Spenserian styles. Check our Courses page!'
    },
    {
        q: 'Where are you located?',
        a: 'Our studio is located at Studio 14, The Inkwell Building, London, EC2A 4QH.'
    }
];

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState(INITIAL_MESSAGES);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleQuestionClick = (qa) => {
        // Add user question
        setMessages(prev => [...prev, { sender: 'user', text: qa.q }]);

        // Simulate thinking delay before bot response
        setTimeout(() => {
            setMessages(prev => [...prev, { sender: 'bot', text: qa.a }]);
        }, 600);
    };

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        style={{
                            position: 'fixed',
                            bottom: '90px',
                            right: '25px',
                            width: '340px',
                            height: '500px',
                            backgroundColor: 'var(--bg-card)',
                            border: '1px solid var(--border-dim)',
                            borderRadius: '16px',
                            zIndex: 9999,
                            display: 'flex',
                            flexDirection: 'column',
                            boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
                            overflow: 'hidden'
                        }}
                    >
                        {/* Header */}
                        <div style={{ padding: '15px 20px', borderBottom: '1px solid var(--border-dim)', backgroundColor: 'rgba(201,168,76,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{ width: '36px', height: '36px', background: 'linear-gradient(135deg, #c9a84c, #f0d080)', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#000' }}>
                                    <Bot size={20} />
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '1rem', margin: 0, fontWeight: 600, color: 'var(--text-primary)' }}>Studio Assistant</h3>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#25D366' }} />
                                        <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', margin: 0 }}>Online</p>
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px' }}>
                                <X size={20} />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            {messages.map((msg, i) => (
                                <div key={i} style={{ alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%' }}>
                                    <div style={{
                                        backgroundColor: msg.sender === 'user' ? 'var(--accent)' : 'rgba(255,255,255,0.05)',
                                        color: msg.sender === 'user' ? '#000' : 'var(--text-primary)',
                                        padding: '12px 16px',
                                        borderRadius: '14px',
                                        borderBottomRightRadius: msg.sender === 'user' ? '4px' : '14px',
                                        borderBottomLeftRadius: msg.sender === 'bot' ? '4px' : '14px',
                                        fontSize: '0.9rem',
                                        lineHeight: 1.5,
                                        border: msg.sender === 'bot' ? '1px solid rgba(255,255,255,0.08)' : 'none'
                                    }}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} style={{ height: '1px' }} />
                        </div>

                        {/* Quick Actions & WhatsApp */}
                        <div style={{ padding: '15px', borderTop: '1px solid rgba(201,168,76,0.1)', backgroundColor: 'rgba(0,0,0,0.2)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <p style={{ fontSize: '0.75rem', color: 'var(--accent)', margin: '0 0 4px 0', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Ask a Question</p>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '110px', overflowY: 'auto', paddingRight: '4px' }}>
                                {PREDEFINED_QA.map((qa, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handleQuestionClick(qa)}
                                        style={{
                                            background: 'rgba(255,255,255,0.03)',
                                            border: '1px solid var(--border-dim)',
                                            color: 'var(--text-secondary)',
                                            padding: '8px 12px',
                                            borderRadius: '8px',
                                            fontSize: '0.8rem',
                                            textAlign: 'left',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s ease',
                                        }}
                                        onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.background = 'rgba(201,168,76,0.05)'; }}
                                        onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-dim)'; e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
                                    >
                                        {qa.q}
                                    </button>
                                ))}
                            </div>

                            <div style={{ marginTop: '8px', borderTop: '1px solid var(--border-dim)', paddingTop: '12px' }}>
                                <a
                                    href="https://api.whatsapp.com/send?phone=918891240717&text=Hello,%20I%20would%20like%20to%20discuss%20a%20project"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        background: '#25D366', // WhatsApp Brand Green
                                        border: 'none',
                                        color: '#fff',
                                        padding: '10px 14px',
                                        borderRadius: '8px',
                                        fontSize: '0.9rem',
                                        textAlign: 'center',
                                        cursor: 'pointer',
                                        textDecoration: 'none',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        gap: '8px',
                                        fontWeight: 600,
                                        transition: 'transform 0.2s'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                                >
                                    <MessageSquare size={18} />
                                    Chat on WhatsApp
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Toggle Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                style={{
                    position: 'fixed',
                    bottom: '25px',
                    right: '25px',
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    backgroundColor: '#FFD13B', // Beautiful bright yellow to match your image icon
                    border: 'none',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
                    cursor: 'pointer',
                    zIndex: 9999,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 0,
                    overflow: 'hidden'
                }}
                title="Chat with us"
            >
                {/* We use the custom uploaded image, and fallback to Lucide Bot icon if it fails to load */}
                <img
                    src="/bot-icon.png"
                    alt="Chat Bot"
                    style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '10px' }}
                    onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        if (e.currentTarget.nextSibling) e.currentTarget.nextSibling.style.display = 'block';
                    }}
                />
                <Bot size={34} color="#000" style={{ display: 'none' }} />
            </motion.button>
        </>
    );
}
