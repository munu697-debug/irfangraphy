import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

export default function AnimatedCounter({ value, duration = 2500 }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-50px" });
    const [displayValue, setDisplayValue] = useState(0);

    // Filter out only numbers for calculation, keep everything else as suffix
    const numericString = value.replace(/[^0-9]/g, '');
    const suffix = value.replace(/[0-9]/g, '');
    const target = parseInt(numericString, 10);

    useEffect(() => {
        if (!inView || isNaN(target)) return;

        let startTime = null;
        let animationFrame;

        // Smooth easing function
        const easeOutExpo = (x) => {
            return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
        };

        const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;

            // Calculate percentage based on duration
            const rawPercentage = Math.min(progress / duration, 1);
            const percentage = easeOutExpo(rawPercentage);

            setDisplayValue(Math.floor(target * percentage));

            if (progress < duration) {
                animationFrame = requestAnimationFrame(step);
            } else {
                setDisplayValue(target);
            }
        };

        animationFrame = requestAnimationFrame(step);

        return () => cancelAnimationFrame(animationFrame);
    }, [inView, target, duration]);

    // Fallback if no numbers were passed
    if (isNaN(target) || !numericString) return <span ref={ref}>{value}</span>;

    return (
        <span ref={ref}>
            {displayValue}{suffix}
        </span>
    );
}
