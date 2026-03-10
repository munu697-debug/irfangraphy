import React from 'react';
import { motion } from 'framer-motion';
import ParticleCanvas from '../components/ParticleCanvas';
import AnimatedSection from '../components/AnimatedSection';
import InkCanvas from '../components/InkCanvas';
import WaveCanvas from '../components/WaveCanvas';
import AnimatedCounter from '../components/AnimatedCounter';

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 36 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function Home() {
    return (
        <div style={{ backgroundColor: 'var(--bg-deep)' }}>

            {/* ── HERO ────────────────────────────────────────────── */}
            <section style={{ position: 'relative', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', backgroundColor: 'var(--bg-deep)' }}>
                <ParticleCanvas />
                <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 0%, rgba(6,8,15,0.55) 65%, rgba(6,8,15,0.95) 100%)', pointerEvents: 'none' }} />

                <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
                    <motion.span className="eyebrow" {...fadeUp(0.2)}>
                        Master Calligrapher · Est. 2008
                    </motion.span>
                    <motion.h1 {...fadeUp(0.4)} style={{ fontSize: 'clamp(3rem, 7.5vw, 6rem)', lineHeight: 1.0, marginBottom: '1.75rem' }}>
                        {/* Display line */}
                        <span style={{
                            display: 'block',
                            fontFamily: 'var(--font-serif)',
                            fontSize: 'clamp(1.5rem, 4vw, 3.5rem)',
                            color: 'var(--accent)',
                            fontWeight: 400,
                            letterSpacing: '0.02em',
                            lineHeight: 1.3,
                            marginBottom: '0.5rem',
                            textShadow: '0 0 60px rgba(201,168,76,0.4), 0 0 120px rgba(201,168,76,0.15)',
                        }}>
                            Calligraphy Is the Art of Eternal Lines
                        </span>
                    </motion.h1>
                    <motion.p {...fadeUp(0.6)} style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', maxWidth: '560px', margin: '0 auto 3rem', color: 'var(--text-secondary)', fontWeight: 300, lineHeight: 1.85 }}>
                        Where traditional ink meets modern refinement — a legacy permanently written in every line.
                    </motion.p>
                    <motion.div {...fadeUp(0.8)} style={{ display: 'flex', gap: '1.25rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <a href="/gallery" className="btn-gold">View Gallery</a>
                        <a href="/contact" className="btn-outline">Contact</a>
                    </motion.div>
                </div>

                <div style={{ position: 'absolute', bottom: '2.5rem', left: '50%', transform: 'translateX(-50%)', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: '1px', height: '50px', background: 'linear-gradient(to bottom, var(--accent), transparent)', animation: 'pulseRing 2s ease-in-out infinite' }} />
                    <span style={{ fontSize: '0.58rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Scroll</span>
                </div>
            </section>

            {/* ── PHILOSOPHY ──────────────────────────────────────── */}
            <section className="section" style={{ backgroundColor: 'var(--bg-deep)', position: 'relative', overflow: 'hidden' }}>
                {/* Three.js ink-burst fires when this section scrolls into view */}
                <InkCanvas />
                <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '6rem', alignItems: 'center', position: 'relative', zIndex: 1 }}>
                    <AnimatedSection direction="left">
                        <span className="eyebrow">Our Philosophy</span>
                        <h2 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.25rem)', marginBottom: '1.5rem' }}>
                            A Meditation in<br />Motion &amp; Ink
                        </h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.9, marginBottom: '1.5rem', fontWeight: 300 }}>
                            Master calligraphy is the discipline of controlling the breath, the hand, and the soul. The architectural creation of silence through the rhythm of symbols.
                        </p>
                        <p style={{ color: 'var(--text-muted)', lineHeight: 1.9, fontWeight: 300, fontSize: '0.95rem' }}>
                            Each stroke is irreplaceable. In a world of digital replication, we celebrate the permanent, the organic, and the profoundly human.
                        </p>
                        <div className="divider" style={{ marginTop: '2.5rem' }} />
                        <a href="/about" style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 700, color: 'var(--accent)', borderBottom: '1px solid var(--accent)', paddingBottom: '2px' }}>
                            Learn About the Artist
                        </a>
                    </AnimatedSection>

                    <AnimatedSection direction="right" delay={0.15}>
                        <div style={{ overflow: 'hidden', aspectRatio: '4/5', boxShadow: 'var(--shadow-deep)', position: 'relative' }}>
                            <img
                                src="https://images.unsplash.com/photo-1533154683836-84ea7a0bc310?auto=format&fit=crop&q=80&w=900"
                                alt="Featured calligraphy"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(201,168,76,0.08) 0%, transparent 60%)' }} />
                        </div>
                    </AnimatedSection>
                </div>
            </section>

            {/* ── SELECTED WORKS ──────────────────────────────────── */}
            <section className="section" style={{ backgroundColor: '#0a0d16' }}>
                <div className="container">
                    <AnimatedSection direction="up">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3.5rem' }}>
                            <div>
                                <span className="eyebrow">Portfolio</span>
                                <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.75rem)' }}>Selected Works</h2>
                            </div>
                            <a href="/gallery" style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 700, color: 'var(--accent)', borderBottom: '1px solid var(--accent)', paddingBottom: '2px' }}>View All</a>
                        </div>
                    </AnimatedSection>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                        {[
                            'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?auto=format&fit=crop&q=80&w=700',
                            'https://images.unsplash.com/photo-1572044162444-ad60f128bde2?auto=format&fit=crop&q=80&w=700',
                            'https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&q=80&w=700',
                        ].map((url, i) => (
                            <AnimatedSection key={i} direction="up" delay={i * 0.14}>
                                <div className="gal-item" style={{ position: 'relative', height: '340px', cursor: 'pointer', border: '1px solid var(--border-dim)' }}>
                                    <img src={url} alt={`Work ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    <div className="gal-overlay" />
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── STATS BAND ──────────────────────────────────────── */}
            <section style={{ padding: '5rem 0', borderTop: '1px solid var(--border-dim)', borderBottom: '1px solid var(--border-dim)' }}>
                <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '2rem', textAlign: 'center' }}>
                    {[
                        { n: '15+', l: 'Years of Practice' },
                        { n: '800+', l: 'Commissions' },
                        { n: '3', l: 'Countries Trained' },
                        { n: '1200+', l: 'Students Taught' },
                    ].map((s, i) => (
                        <AnimatedSection key={i} direction="up" delay={i * 0.1} distance={24}>
                            <div style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', color: 'var(--accent)', lineHeight: 1 }}>
                                <AnimatedCounter value={s.n} />
                            </div>
                            <div style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--text-muted)', marginTop: '0.5rem', fontWeight: 600 }}>{s.l}</div>
                        </AnimatedSection>
                    ))}
                </div>
            </section>

            {/* ── CTA BAND ────────────────────────────────────────── */}
            <section style={{ padding: '8rem 2rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                <WaveCanvas />
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
                <AnimatedSection direction="up" distance={32} style={{ position: 'relative', zIndex: 1 }}>
                    <span className="eyebrow" style={{ display: 'block' }}>Work with Us</span>
                    <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', maxWidth: '700px', margin: '0 auto 1.5rem', lineHeight: 1.15 }}>
                        Begin Your Bespoke Commission
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto 3rem', fontWeight: 300, lineHeight: 1.85 }}>
                        Every commission is a unique conversation between artist and client. Let's create something permanent together.
                    </p>
                    <a href="/contact" className="btn-gold">Contact</a>
                </AnimatedSection>
            </section>

        </div>
    );
}
