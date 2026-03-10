import React from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';
import AnimatedCounter from '../components/AnimatedCounter';

const tools = [
    { label: 'Nibs', desc: 'Leonardt Principal EF, Gillott 303, Mitchell Roundhand grades 0–6' },
    { label: 'Inks', desc: 'Sumi ink, walnut ink, iron gall — selected for permanence and tone' },
    { label: 'Paper', desc: 'Clairefontaine 90gsm, Tomoe River, hand-pressed watercolour sheets' },
    { label: 'Pen Holders', desc: 'Oblique holders in ebonite and rosewood, turned in-studio' },
];

const stats = [
    { n: '15+', l: 'Years of Practice' }, { n: '800+', l: 'Commissions' },
    { n: '3', l: 'Countries Trained' }, { n: '1200+', l: 'Students Taught' },
];

export default function About() {
    return (
        <div style={{ backgroundColor: 'var(--bg-deep)', minHeight: '100vh' }}>

            {/* Centered hero */}
            <div className="container" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '80vh', padding: '10rem 1rem 6rem', maxWidth: '800px', margin: '0 auto' }}>
                <div>
                    <AnimatedSection direction="up">
                        <span className="eyebrow">The Artist</span>
                        <h1 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', marginBottom: '2.5rem', lineHeight: 1.1 }}>
                            A Philosophy<br />of Ink
                        </h1>
                        <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.9, marginBottom: '1.75rem', fontWeight: 300 }}>
                            For over fifteen years I have devoted my practice to one discipline: calligraphy as an act of devotion. Not a hobby, not a craft — a rigorous, meditative pursuit of the perfect stroke.
                        </p>
                        <p style={{ color: 'var(--text-muted)', lineHeight: 1.9, marginBottom: '1.75rem', fontWeight: 300, fontSize: '0.95rem' }}>
                            Trained under masters in London, Kyoto, and Istanbul, my approach synthesises the precision of Western copperplate with the breath-centred energy of Eastern brush traditions.
                        </p>
                        <p style={{ color: 'var(--text-muted)', lineHeight: 1.9, fontWeight: 300, fontSize: '0.95rem', marginBottom: '3.5rem' }}>
                            Today I work from a private London studio, accepting a limited number of commissions each year and teaching through our courses to ensure the craft lives on.
                        </p>
                    </AnimatedSection>

                    <div className="divider" />

                    <AnimatedSection direction="left" delay={0.15}>
                        <h2 style={{ fontSize: '1.6rem', marginBottom: '2rem', marginTop: '1rem' }}>Tools of the Trade</h2>
                        <div style={{ display: 'grid', gap: '1.5rem' }}>
                            {tools.map((t, i) => (
                                <AnimatedSection key={i} direction="left" delay={0.1 + i * 0.1} distance={24}>
                                    <div style={{ borderLeft: '2px solid var(--accent)', paddingLeft: '1.25rem' }}>
                                        <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700, color: 'var(--accent)', marginBottom: '0.35rem' }}>{t.label}</h4>
                                        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', fontWeight: 300, lineHeight: 1.7 }}>{t.desc}</p>
                                    </div>
                                </AnimatedSection>
                            ))}
                        </div>
                    </AnimatedSection>
                </div>
            </div>

            {/* Stats band */}
            <section style={{ padding: '5rem 0', borderTop: '1px solid var(--border-dim)', backgroundColor: '#0a0d16' }}>
                <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '2rem', textAlign: 'center' }}>
                    {stats.map((s, i) => (
                        <AnimatedSection key={i} direction="up" delay={i * 0.12} distance={24}>
                            <div style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', color: 'var(--accent)', lineHeight: 1 }}>
                                <AnimatedCounter value={s.n} />
                            </div>
                            <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--text-muted)', marginTop: '0.5rem', fontWeight: 600 }}>{s.l}</div>
                        </AnimatedSection>
                    ))}
                </div>
            </section>
        </div>
    );
}
