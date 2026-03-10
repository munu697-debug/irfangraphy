import React from 'react';
import { motion } from 'framer-motion';

/**
 * AnimatedSection
 * Wraps any block with a scroll-triggered slide + fade animation.
 *
 * Props:
 *   direction  — 'up' (default) | 'left' | 'right' | 'down'
 *   delay      — seconds (default 0)
 *   distance   — pixels to travel (default 40)
 *   duration   — seconds (default 0.85)
 *   threshold  — viewport fraction to trigger (default 0.15)
 *   className  — extra class names
 *   style      — inline styles
 */
const EASE = [0.22, 1, 0.36, 1];

function getInitial(direction, distance) {
    switch (direction) {
        case 'left': return { opacity: 0, x: -distance, y: 0 };
        case 'right': return { opacity: 0, x: distance, y: 0 };
        case 'down': return { opacity: 0, x: 0, y: -distance };
        case 'up':
        default: return { opacity: 0, x: 0, y: distance };
    }
}

export default function AnimatedSection({
    children,
    direction = 'up',
    delay = 0,
    distance = 40,
    duration = 0.85,
    threshold = 0.15,
    className = '',
    style = {},
    as = 'div',
}) {
    const Tag = motion[as] || motion.div;

    return (
        <Tag
            initial={getInitial(direction, distance)}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, amount: threshold }}
            transition={{ duration, delay, ease: EASE }}
            className={className}
            style={style}
        >
            {children}
        </Tag>
    );
}
