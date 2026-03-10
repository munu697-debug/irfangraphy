import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const links = [
    { label: 'Home', to: '/' },
    { label: 'Gallery', to: '/gallery' },
    { label: 'Courses', to: '/courses' },
    { label: 'About', to: '/about' },
    { label: 'Contact', to: '/contact' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const h = () => setScrolled(window.scrollY > 60);
        window.addEventListener('scroll', h);
        return () => window.removeEventListener('scroll', h);
    }, []);

    return (
        <>
            <nav style={{
                position: 'fixed', top: 0, left: 0, right: 0, zIndex: 900,
                padding: scrolled ? '1rem 2.5rem' : '1.75rem 2.5rem',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                backgroundColor: scrolled ? 'rgba(6,8,15,0.92)' : 'transparent',
                backdropFilter: scrolled ? 'blur(16px)' : 'none',
                borderBottom: scrolled ? '1px solid rgba(201,168,76,0.12)' : 'none',
                transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)',
            }}>
                {/* Logo */}
                <NavLink to="/" style={{ display: 'flex', alignItems: 'center' }}>
                    <img src="/irfan-logo.png" alt="Irfan Logo" style={{ height: '80px', objectFit: 'contain' }} />
                </NavLink>

                {/* Desktop */}
                <ul className="nav-desktop" style={{ display: 'flex', gap: '2.75rem' }}>
                    {links.map(l => (
                        <li key={l.to}>
                            <NavLink to={l.to}
                                style={({ isActive }) => ({
                                    fontSize: '0.7rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.2em',
                                    fontWeight: 600,
                                    color: isActive ? 'var(--accent)' : 'rgba(240,234,214,0.65)',
                                    borderBottom: isActive ? '1px solid var(--accent)' : '1px solid transparent',
                                    paddingBottom: '2px',
                                    transition: 'var(--t-fast)',
                                })}>
                                {l.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>

                {/* CTA */}
                <a href="/contact" className="btn-gold nav-cta" style={{ padding: '0.65rem 1.75rem', fontSize: '0.68rem' }}>
                    Contact
                </a>

                {/* Hamburger */}
                <button className="nav-burger" onClick={() => setOpen(!open)}
                    style={{ background: 'none', border: 'none', color: 'var(--text-primary)', display: 'none' }}>
                    {open ? <X size={24} /> : <Menu size={24} />}
                </button>
            </nav>

            {/* Full-screen mobile overlay */}
            {open && (
                <div style={{
                    position: 'fixed', inset: 0, zIndex: 800,
                    backgroundColor: 'var(--bg-deep)',
                    display: 'flex', flexDirection: 'column',
                    justifyContent: 'center', alignItems: 'center', gap: '3rem',
                    animation: 'fadeUp 0.3s ease both',
                }}>
                    <button onClick={() => setOpen(false)} style={{ position: 'absolute', top: '1.75rem', right: '2rem', background: 'none', border: 'none', color: 'var(--text-secondary)' }}>
                        <X size={26} />
                    </button>
                    {[{ label: 'Home', to: '/' }, ...links].map(l => (
                        <NavLink key={l.to} to={l.to} onClick={() => setOpen(false)}
                            style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--text-primary)', transition: 'color 0.2s ease' }}>
                            {l.label}
                        </NavLink>
                    ))}
                </div>
            )}

            <style>{`
        @media (min-width: 900px) {
          .nav-desktop { display: flex !important; }
          .nav-cta     { display: inline-block !important; }
          .nav-burger  { display: none !important; }
        }
        @media (max-width: 899px) {
          .nav-desktop { display: none !important; }
          .nav-cta     { display: none !important; }
          .nav-burger  { display: block !important; }
        }
      `}</style>
        </>
    );
}
