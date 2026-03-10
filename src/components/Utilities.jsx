import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
};

// CSS-based page transition wrapper (no framer-motion dependency for routing)
const PageTransition = ({ children }) => {
    return (
        <div className="page-transition">
            {children}
        </div>
    );
};

export { ScrollToTop, PageTransition };
