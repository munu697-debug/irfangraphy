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
                    className="cookie-banner"
                >
                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                        We use cookies to ensure you get the best experience on our site, including advanced security measures and site analytics.
                        By continuing to browse the site you are agreeing to our use of cookies.
                    </p>
                    <button
                        onClick={handleAccept}
                        className="btn-gold"
                        style={{ padding: '0.8rem 1.75rem', flexShrink: 0, whiteSpace: 'nowrap' }}
                    >
                        Accept
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
