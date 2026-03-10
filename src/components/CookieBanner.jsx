import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CookieBanner() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if user has already accepted cookies
        const consent = localStorage.getItem('cookieConsent');
        if (!consent) {
            // Slight delay before showing so it doesn't immediately yell at them
            const timer = setTimeout(() => setIsVisible(true), 2000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookieConsent', 'true');
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    style={{
                        position: 'fixed',
                        bottom: '20px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        backgroundColor: 'rgba(13, 17, 32, 0.95)',
                        border: '1px solid var(--border)',
                        backdropFilter: 'blur(10px)',
                        padding: '1.5rem',
                        borderRadius: '16px',
                        boxShadow: 'var(--shadow-deep)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '2rem',
                        zIndex: 9999,
                        width: 'calc(100% - 40px)',
                        maxWidth: '650px',
                    }}
                >
                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                        We use cookies to ensure you get the best experience on our site, including advanced security measures and site analytics.
                        By continuing to browse the site you are agreeing to our use of cookies.
                    </p>
                    <button
                        onClick={handleAccept}
                        className="btn-gold"
                        style={{ padding: '0.8rem 1.75rem', flexShrink: 0 }}
                    >
                        Accept
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
