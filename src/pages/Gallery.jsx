import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';

const INITIAL_IMAGES = [
    { id: 1, cat: 'Fine Art', url: 'https://images.unsplash.com/photo-1533154683836-84ea7a0bc310?auto=format&fit=crop&q=80&w=800', title: 'The Silent Ink' },
    { id: 2, cat: 'Wedding & Events', url: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=800', title: 'Evergreen Vows' },
    { id: 3, cat: 'Logo Design', url: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800', title: 'Monogram Studies' },
    { id: 4, cat: 'Fine Art', url: 'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?auto=format&fit=crop&q=80&w=800', title: 'Flourished Script' },
    { id: 5, cat: 'Wedding & Events', url: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&q=80&w=800', title: 'Sealing Wax Detail' },
    { id: 6, cat: 'Logo Design', url: 'https://images.unsplash.com/photo-1572044162444-ad60f128bde2?auto=format&fit=crop&q=80&w=800', title: 'Minimalist Branding' },
];

const CATS = ['All', 'Fine Art', 'Wedding & Events', 'Logo Design'];

export default function Gallery() {
    const [images, setImages] = useState([]);
    const [filter, setFilter] = useState('All');
    const [lightbox, setLightbox] = useState(null);

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('gallery') || 'null');
        if (stored) {
            setImages(stored);
        } else {
            setImages(INITIAL_IMAGES);
            localStorage.setItem('gallery', JSON.stringify(INITIAL_IMAGES));
        }
    }, []);

    const shown = filter === 'All' ? images : images.filter(i => i.cat === filter);

    return (
        <div style={{ backgroundColor: 'var(--bg-deep)', paddingTop: '110px', paddingBottom: '6rem', minHeight: '100vh' }}>
            <div className="container">

                {/* Header */}
                <AnimatedSection direction="up">
                    <header style={{ textAlign: 'center', marginBottom: '5rem' }}>
                        <span className="eyebrow">Portfolio</span>
                        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.75rem)', marginBottom: '1.25rem' }}>Selected Works</h1>
                        <p style={{ color: 'var(--text-secondary)', maxWidth: '560px', margin: '0 auto', fontWeight: 300, lineHeight: 1.85 }}>
                            A curated collection where paper meets soul. Filter by discipline to explore the depth of the craft.
                        </p>
                    </header>
                </AnimatedSection>

                {/* Filter Tabs */}
                <AnimatedSection direction="up" delay={0.1} distance={20}>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '4rem', flexWrap: 'wrap' }}>
                        {CATS.map(cat => (
                            <button key={cat} onClick={() => setFilter(cat)} style={{
                                padding: '0.55rem 1.5rem',
                                background: filter === cat ? 'var(--accent)' : 'transparent',
                                border: `1px solid ${filter === cat ? 'var(--accent)' : 'var(--border)'}`,
                                color: filter === cat ? '#06080f' : 'var(--text-secondary)',
                                fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 700,
                                transition: 'var(--t-fast)', transform: 'none',
                            }}>{cat}</button>
                        ))}
                    </div>
                </AnimatedSection>

                {/* Masonry Grid */}
                <div style={{ columns: '2 380px', columnGap: '1.25rem' }}>
                    {shown.map((img, i) => (
                        <motion.div
                            key={img.id}
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.55, delay: i * 0.07 }}
                            onClick={() => setLightbox(img)}
                            className="gal-item"
                            style={{ breakInside: 'avoid', marginBottom: '1.25rem', position: 'relative', cursor: 'pointer', border: '1px solid var(--border-dim)' }}
                        >
                            <img src={img.url} alt={img.title} style={{ width: '100%', display: 'block' }} />
                            <div className="gal-overlay" style={{ display: 'flex', alignItems: 'flex-end', padding: '1.25rem' }}>
                                <div>
                                    <p style={{ color: 'var(--accent)', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.2rem' }}>{img.cat}</p>
                                    <h3 style={{ color: '#fff', fontSize: '1.15rem', fontWeight: 400 }}>{img.title}</h3>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Lightbox */}
            {lightbox && (
                <div onClick={() => setLightbox(null)} style={{
                    position: 'fixed', inset: 0, zIndex: 2000,
                    backgroundColor: 'rgba(6,8,15,0.97)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem',
                    animation: 'fadeUp 0.2s ease both',
                }}>
                    <div onClick={e => e.stopPropagation()} style={{ maxWidth: '80vw', textAlign: 'center' }}>
                        <img src={lightbox.url} alt={lightbox.title}
                            style={{ maxWidth: '100%', maxHeight: '72vh', objectFit: 'contain', boxShadow: 'var(--shadow-deep)', border: '1px solid var(--border)' }} />
                        <div style={{ marginTop: '1.25rem' }}>
                            <h2 style={{ fontWeight: 300, fontSize: '1.4rem' }}>{lightbox.title}</h2>
                            <p style={{ color: 'var(--accent)', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: '0.4rem' }}>{lightbox.cat}</p>
                        </div>
                        <button onClick={() => setLightbox(null)} style={{ position: 'fixed', top: '1.5rem', right: '2rem', background: 'none', border: '1px solid var(--border)', color: 'var(--text-secondary)', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.15em', padding: '0.4rem 1rem' }}>
                            Close ✕
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
