import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, CheckCircle2 } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

const inputBase = {
    width: '100%', padding: '0.9rem 1rem',
    background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '10px', color: 'var(--text-primary)', fontFamily: 'var(--font-sans)',
    fontSize: '0.9rem', outline: 'none', transition: 'border-color 0.3s ease, background 0.3s ease',
};

const faqs = [
    { q: 'What is the minimum timeline for bespoke commissions?', a: 'We typically require 6-8 weeks for custom wedding stationery and 4-6 weeks for brand identity projects.' },
    { q: 'Do you offer variations or revisions on custom artwork?', a: 'Yes, all our bespoke packages include two rounds of refinements to ensure the final piece perfectly aligns with your vision.' },
    { q: 'Can I request a specific calligraphy style not shown in the portfolio?', a: 'Absolutely. During our initial consultation, we can explore various historical scripts or develop a custom hand tailored to your needs.' },
    { q: 'What materials do you use for fine art pieces?', a: 'We use archival-grade cotton papers, genuine calfskin vellum, and handmade iron gall and sumi inks, often embellished with 23k gold leaf.' },
];

export default function Contact() {
    const [form, setForm] = useState({ firstName: '', lastName: '', company: '', jobTitle: '', email: '', phone: '', type: '' });
    const [sent, setSent] = useState(false);
    const [agreed, setAgreed] = useState(false);
    const [openFaq, setOpenFaq] = useState(0);

    const onChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));
    const onSubmit = e => {
        e.preventDefault();
        if (agreed) {
            const newMsg = {
                id: Date.now(),
                name: `${form.firstName} ${form.lastName}`.trim(),
                email: form.email,
                phone: form.phone,
                company: form.company,
                jobTitle: form.jobTitle,
                type: form.type
            };
            const stored = JSON.parse(localStorage.getItem('messages') || '[]');
            localStorage.setItem('messages', JSON.stringify([newMsg, ...stored]));
            setSent(true);
        }
    };

    return (
        <div style={{ backgroundColor: 'var(--bg-deep)', minHeight: '100vh', paddingTop: '100px', position: 'relative', overflow: 'hidden' }}>

            <div className="container" style={{ position: 'relative', zIndex: 1, padding: '4rem 2rem 8rem', maxWidth: '1100px', margin: '0 auto' }}>

                {/* Header block */}
                <AnimatedSection direction="up" style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h1 style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)', marginBottom: '1rem', lineHeight: 1.1, fontWeight: 500 }}>
                        Contact <span style={{ color: 'var(--accent)' }}>Us</span>
                    </h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', fontWeight: 300 }}>
                        Got questions? Reach out! We're here and ready to assist.
                    </p>
                </AnimatedSection>

                <AnimatedSection direction="up" delay={0.1}>
                    <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', textAlign: 'center', marginBottom: '3rem', fontWeight: 500 }}>
                        Get <span style={{ color: 'var(--accent)' }}>in Touch</span>
                    </h2>
                </AnimatedSection>

                {/* Main 2-column Layout */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem', marginBottom: '7rem' }}>

                    {/* Left Card: Info */}
                    <AnimatedSection direction="up" delay={0.2}>
                        <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: '16px', padding: '3.5rem 3rem', height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
                                <img src="/irfan-logo.png" alt="Irfan Logo" style={{ height: '64px', objectFit: 'contain' }} />
                            </div>

                            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.8, marginBottom: '2rem', fontWeight: 300 }}>
                                Openly present to us your vision. We welcome challenging commissions, featuring tight deadlines and bespoke requirements. We collaborate closely to tailor our artistry to your specific event or brand.
                            </p>

                            <div style={{ marginTop: 'auto', paddingTop: '3rem', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
                                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'center', marginBottom: '2rem' }}>
                                    Trusted by the world's most ambitious brands
                                </p>
                                <div style={{ display: 'flex', justifyContent: 'center', gap: '2.5rem', flexWrap: 'wrap', opacity: 0.5 }}>
                                    <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', fontWeight: 700 }}>VOGUE</span>
                                    <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', fontStyle: 'italic' }}>Cartier</span>
                                    <span style={{ fontFamily: 'var(--font-sans)', fontSize: '1.1rem', fontWeight: 400, letterSpacing: '0.15em' }}>CHANEL</span>
                                </div>
                            </div>
                        </div>
                    </AnimatedSection>

                    {/* Right Card: Form */}
                    <AnimatedSection direction="up" delay={0.3}>
                        <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: '16px', padding: '3.5rem 3rem' }}>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', fontWeight: 500 }}>Quick Responses Await!</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '2.5rem', fontWeight: 300, lineHeight: 1.6 }}>
                                Connect with us. Feel free to ask any questions or share your thoughts. We'll respond promptly.
                            </p>

                            {sent ? (
                                <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                                    <CheckCircle2 size={56} color="var(--accent)" style={{ margin: '0 auto 1.5rem' }} />
                                    <h4 style={{ fontSize: '1.4rem', marginBottom: '0.5rem', color: 'var(--accent)' }}>Message Sent Successfully</h4>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '1rem', fontWeight: 300 }}>We will thoroughly review your details and get back to you shortly.</p>
                                </div>
                            ) : (
                                <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                                        <input name="firstName" type="text" placeholder="First Name*" required style={inputBase} value={form.firstName} onChange={onChange} />
                                        <input name="lastName" type="text" placeholder="Last Name*" required style={inputBase} value={form.lastName} onChange={onChange} />
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                                        <input name="company" type="text" placeholder="Company Name" style={inputBase} value={form.company} onChange={onChange} />
                                        <input name="jobTitle" type="text" placeholder="Job Title" style={inputBase} value={form.jobTitle} onChange={onChange} />
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                                        <input name="email" type="email" placeholder="Email Address*" required style={inputBase} value={form.email} onChange={onChange} />
                                        <input name="phone" type="tel" placeholder="Phone Number*" required style={inputBase} value={form.phone} onChange={onChange} />
                                    </div>

                                    <select name="type" required style={{ ...inputBase, cursor: 'pointer', appearance: 'none', color: form.type === '' ? 'var(--text-muted)' : 'var(--text-primary)' }} value={form.type} onChange={onChange}>
                                        <option value="" disabled hidden>How can we help?*</option>
                                        <option value="Wedding" style={{ background: '#111520', color: 'var(--text-primary)' }}>Wedding Stationery</option>
                                        <option value="Branding" style={{ background: '#111520', color: 'var(--text-primary)' }}>Brand Logotype</option>
                                        <option value="Live Event" style={{ background: '#111520', color: 'var(--text-primary)' }}>Live Event Scribing</option>
                                        <option value="Fine Art" style={{ background: '#111520', color: 'var(--text-primary)' }}>Fine Art Commission</option>
                                        <option value="Course" style={{ background: '#111520', color: 'var(--text-primary)' }}>Course Enquiry</option>
                                        <option value="Other" style={{ background: '#111520', color: 'var(--text-primary)' }}>Other</option>
                                    </select>

                                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginTop: '1rem' }}>
                                        <input type="checkbox" id="terms" required checked={agreed} onChange={e => setAgreed(e.target.checked)}
                                            style={{ marginTop: '0.25rem', accentColor: 'var(--accent)', cursor: 'pointer', width: '16px', height: '16px' }} />
                                        <label htmlFor="terms" style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 300, cursor: 'pointer', userSelect: 'none' }}>
                                            I read and accept terms and conditions, privacy policy.
                                        </label>
                                    </div>

                                    <button type="submit" className="btn-gold" style={{ alignSelf: 'flex-start', marginTop: '1.5rem', padding: '1rem 3rem', borderRadius: '8px', fontSize: '0.8rem', width: 'auto' }}>
                                        Submit
                                    </button>
                                </form>
                            )}
                        </div>
                    </AnimatedSection>
                </div>

                {/* FAQ Section */}
                <AnimatedSection direction="up" delay={0.4}>
                    <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', textAlign: 'center', marginBottom: '3rem', fontWeight: 500 }}>
                        Frequently Asked <span style={{ color: 'var(--accent)' }}>Questions</span>
                    </h2>

                    <div style={{ maxWidth: '850px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '0px', backgroundColor: 'rgba(255, 255, 255, 0.02)', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.05)', overflow: 'hidden' }}>
                        {faqs.map((faq, i) => (
                            <div key={i} style={{ borderBottom: i !== faqs.length - 1 ? '1px solid rgba(255, 255, 255, 0.05)' : 'none' }}>
                                <button
                                    onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                                    style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.75rem 2.5rem', background: 'transparent', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', textAlign: 'left', outline: 'none' }}
                                >
                                    <span style={{ fontSize: '1.05rem', fontWeight: 500 }}>{faq.q}</span>
                                    {openFaq === i ? <Minus size={20} color="var(--accent)" style={{ flexShrink: 0, marginLeft: '1rem' }} /> : <Plus size={20} color="var(--text-muted)" style={{ flexShrink: 0, marginLeft: '1rem' }} />}
                                </button>
                                <AnimatePresence>
                                    {openFaq === i && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                                            style={{ overflow: 'hidden' }}
                                        >
                                            <div style={{ padding: '0 2.5rem 1.75rem', color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.7, fontWeight: 300 }}>
                                                {faq.a}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </AnimatedSection>

            </div>
        </div>
    );
}
