import React from 'react';
import { NavLink } from 'react-router-dom';
import { Instagram, Youtube, Twitter, Mail } from 'lucide-react';

const navLinks = [
    { label: 'Portfolio', to: '/gallery' },
    { label: 'Courses', to: '/courses' },
    { label: 'About Artist', to: '/about' },
    { label: 'Contact', to: '/contact' },
];

export default function Footer() {
    return (
        <footer style={{ backgroundColor: '#050710', borderTop: '1px solid var(--border-dim)' }}>
            <div className="container" style={{ padding: '5rem 2rem 0' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', paddingBottom: '4rem', borderBottom: '1px solid var(--border-dim)' }}>

                    {/* Brand */}
                    <div>
                        <div style={{ marginBottom: '1.25rem' }}>
                            <img src="/irfan-logo.png" alt="Irfan Logo" style={{ height: '96px', objectFit: 'contain' }} />
                        </div>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.85, maxWidth: '260px' }}>
                            Preserving the art of traditional ink-on-paper through bespoke commissions and professional education.
                        </p>
                    </div>

                    {/* Navigate */}
                    <div>
                        <h4 style={{ fontSize: '0.62rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '1.75rem', fontFamily: 'var(--font-sans)', fontWeight: 700 }}>
                            Navigate
                        </h4>
                        <ul style={{ display: 'grid', gap: '0.8rem' }}>
                            {navLinks.map(l => (
                                <li key={l.to}>
                                    <NavLink to={l.to} style={{ fontSize: '0.88rem', color: 'var(--text-muted)', transition: 'var(--t-fast)' }}
                                        onMouseEnter={e => e.target.style.color = 'var(--accent)'}
                                        onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}>
                                        {l.label}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Studio */}
                    <div>
                        <h4 style={{ fontSize: '0.62rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '1.75rem', fontFamily: 'var(--font-sans)', fontWeight: 700 }}>
                            Studio
                        </h4>
                        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 2 }}>
                            Studio 14, The Inkwell Building<br />
                            London, EC2A 4QH<br /><br />
                            hello@mastercalligrapher.com<br />
                            +44 (0) 207 000 0000
                        </p>
                    </div>

                    {/* Follow */}
                    <div>
                        <h4 style={{ fontSize: '0.62rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '1.75rem', fontFamily: 'var(--font-sans)', fontWeight: 700 }}>
                            Follow
                        </h4>
                        <div style={{ display: 'flex', gap: '1.25rem', marginBottom: '1.5rem' }}>
                            {[Instagram, Youtube, Twitter, Mail].map((Icon, i) => (
                                <a key={i} href="#"
                                    style={{ color: 'var(--text-muted)', transition: 'var(--t-fast)' }}
                                    onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
                            Daily calligraphy process &amp; inspiration
                        </p>
                    </div>
                </div>

                {/* Bottom bar */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.75rem 0', flexWrap: 'wrap', gap: '1rem' }}>
                    <p style={{ fontSize: '0.68rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                        &copy; {new Date().getFullYear()} Master Calligrapher Studio
                    </p>
                    <div style={{ display: 'flex', gap: '2rem', fontSize: '0.68rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                        <span style={{ cursor: 'pointer' }}>Privacy</span>
                        <span style={{ cursor: 'pointer' }}>Terms</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
