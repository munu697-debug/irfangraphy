import React, { useState, useEffect } from 'react';
import AnimatedSection from '../components/AnimatedSection';

const INITIAL_COURSES = [
    {
        id: 1, title: 'The Foundational Hand', level: 'Beginner', price: '$149', modules: 8,
        desc: 'Master the core principles of broad-edge calligraphy and the rhythmic beauty of foundational script.',
        img: 'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?auto=format&fit=crop&q=80&w=700'
    },
    {
        id: 2, title: 'Spenserian & Copperplate Artistry', level: 'Advanced', price: '$249', modules: 12,
        desc: 'Dive into the delicate flourishes and precision of pointed-pen styles for high-end bespoke commissions.',
        img: 'https://images.unsplash.com/photo-1572044162444-ad60f128bde2?auto=format&fit=crop&q=80&w=700'
    },
    {
        id: 3, title: 'Brush Lettering & Modern Scripts', level: 'Intermediate', price: '$189', modules: 10,
        desc: 'Explore expressive brush calligraphy from sumi-e influence to contemporary lettering for editorial work.',
        img: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&q=80&w=700'
    },
];

const levelColor = { Beginner: '#5a9e6f', Intermediate: '#c9a84c', Advanced: '#c96b4c' };

export default function Courses() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('courses') || 'null');
        if (stored) {
            setCourses(stored);
        } else {
            setCourses(INITIAL_COURSES);
            localStorage.setItem('courses', JSON.stringify(INITIAL_COURSES));
        }
    }, []);

    return (
        <div style={{ backgroundColor: 'var(--bg-deep)', paddingTop: '110px', paddingBottom: '6rem', minHeight: '100vh' }}>
            <div className="container">

                {/* Header */}
                <AnimatedSection direction="up">
                    <header style={{ textAlign: 'center', marginBottom: '6rem' }}>
                        <span className="eyebrow">Education</span>
                        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.75rem)', marginBottom: '1.25rem' }}>The Calligraphy Courses</h1>
                        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', fontWeight: 300, lineHeight: 1.85 }}>
                            From your first ink stroke to professional mastery, guided through every nuance of the craft in intimate cohort-based courses.
                        </p>
                    </header>
                </AnimatedSection>

                {/* Course Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginBottom: '7rem' }}>
                    {courses.map((c, i) => (
                        <AnimatedSection key={c.id} direction="up" delay={i * 0.14}>
                            <div style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-dim)', overflow: 'hidden', height: '100%' }}>
                                <div style={{ height: '240px', overflow: 'hidden' }}>
                                    <img src={c.img} alt={c.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s ease' }} className="course-img" />
                                </div>
                                <div style={{ padding: '2rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                        <span style={{ fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 700, color: levelColor[c.level] || '#c9a84c', border: `1px solid ${levelColor[c.level] || '#c9a84c'}`, padding: '0.25rem 0.75rem' }}>{c.level}</span>
                                        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{c.modules} Modules</span>
                                    </div>
                                    <h3 style={{ fontSize: '1.4rem', marginBottom: '0.85rem', lineHeight: 1.2 }}>{c.title}</h3>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.75, marginBottom: '1.75rem', fontWeight: 300 }}>{c.desc}</p>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-dim)', paddingTop: '1.25rem' }}>
                                        <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--accent)' }}>{c.price}</span>
                                        <button className="btn-gold" style={{ padding: '0.65rem 1.5rem', fontSize: '0.65rem' }}>View Curriculum</button>
                                    </div>
                                </div>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>

                {/* Materials Kit */}
                <AnimatedSection direction="up" delay={0.1}>
                    <section style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)', padding: '4rem', position: 'relative', overflow: 'hidden' }}>
                        <div style={{ position: 'relative', zIndex: 1 }}>
                            <span className="eyebrow">The Shop</span>
                            <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', marginBottom: '1.25rem', lineHeight: 1.15, maxWidth: '550px' }}>
                                The Master's Collection:<br />Essential Materials Kit
                            </h2>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', maxWidth: '540px', fontWeight: 300, lineHeight: 1.85 }}>
                                Curated by the master — the exact nibs, inks, and paper used in our courses. Skip the guesswork and start with the right tools.
                            </p>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1.75rem', marginBottom: '2.5rem' }}>
                                {['Oblique Pen Holders', 'Premium Parchment', 'Vintage Nibs', 'Sumi & Iron Gall Inks'].map((item, i) => (
                                    <AnimatedSection key={i} direction="left" delay={0.1 + i * 0.08} distance={20}>
                                        <div style={{ borderLeft: '2px solid var(--accent)', paddingLeft: '1.25rem' }}>
                                            <span style={{ fontFamily: 'var(--font-serif)', fontSize: '0.95rem', color: 'var(--text-primary)', display: 'block', marginBottom: '0.25rem' }}>{item}</span>
                                            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Professionally sourced</span>
                                        </div>
                                    </AnimatedSection>
                                ))}
                            </div>
                            <button className="btn-gold">Explore the Shop</button>
                        </div>
                        <div style={{ position: 'absolute', right: '-100px', bottom: '-100px', width: '400px', height: '400px', borderRadius: '50%', border: '1px solid rgba(201,168,76,0.08)', pointerEvents: 'none' }} />
                        <div style={{ position: 'absolute', right: '-50px', bottom: '-50px', width: '250px', height: '250px', borderRadius: '50%', border: '1px solid rgba(201,168,76,0.08)', pointerEvents: 'none' }} />
                    </section>
                </AnimatedSection>
            </div>
            <style>{`.course-img:hover { transform: scale(1.06); }`}</style>
        </div>
    );
}
