import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trash, Plus, Image as ImageIcon, Mail, LogOut, BookOpen, Upload, Settings, ShieldAlert, Eye, EyeOff } from 'lucide-react';

const OWASP_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

const INITIAL_GALLERY_IMAGES = [
    { id: 1, cat: 'Fine Art', url: 'https://images.unsplash.com/photo-1533154683836-84ea7a0bc310?auto=format&fit=crop&q=80&w=800', title: 'The Silent Ink' },
    { id: 2, cat: 'Wedding & Events', url: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=800', title: 'Evergreen Vows' },
    { id: 3, cat: 'Logo Design', url: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800', title: 'Monogram Studies' },
    { id: 4, cat: 'Fine Art', url: 'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?auto=format&fit=crop&q=80&w=800', title: 'Flourished Script' },
    { id: 5, cat: 'Wedding & Events', url: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&q=80&w=800', title: 'Sealing Wax Detail' },
    { id: 6, cat: 'Logo Design', url: 'https://images.unsplash.com/photo-1572044162444-ad60f128bde2?auto=format&fit=crop&q=80&w=800', title: 'Minimalist Branding' },
];

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

const inputBase = {
    width: '100%', padding: '0.9rem 1rem',
    background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '10px', color: 'var(--text-primary)', fontFamily: 'var(--font-sans)',
    fontSize: '0.9rem', outline: 'none', transition: 'border-color 0.3s ease',
};

const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
};

const PasswordInput = ({ value, onChange, placeholder = "Password", required = true }) => {
    const [show, setShow] = useState(false);
    return (
        <div style={{ position: 'relative' }}>
            <input type={show ? "text" : "password"} value={value} onChange={onChange} style={{ ...inputBase, paddingRight: '2.5rem' }} placeholder={placeholder} required={required} />
            <button type="button" onClick={() => setShow(!show)} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex' }}>
                {show ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
        </div>
    );
};

export default function Admin() {

    const [isAuthenticated, setIsAuth] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Security states
    const [loginError, setLoginError] = useState('');
    const [isLocked, setIsLocked] = useState(false);

    // Settings state
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [settingsMsg, setSettingsMsg] = useState({ text: '', type: '' });

    // Dashboard state
    const [activeTab, setActiveTab] = useState('messages');
    const [messages, setMessages] = useState([]);
    const [gallery, setGallery] = useState([]);
    const [courses, setCourses] = useState([]);

    // New Image state
    const [newImgFile, setNewImgFile] = useState(null);
    const [newImgTitle, setNewImgTitle] = useState('');
    const [newImgCat, setNewImgCat] = useState('Fine Art');

    // New Course state
    const [newCourseFile, setNewCourseFile] = useState(null);
    const [newCourseTitle, setNewCourseTitle] = useState('');
    const [newCourseLevel, setNewCourseLevel] = useState('Beginner');
    const [newCoursePrice, setNewCoursePrice] = useState('');
    const [newCourseModules, setNewCourseModules] = useState('');
    const [newCourseDesc, setNewCourseDesc] = useState('');


    useEffect(() => {
        checkLockout();

        // Check session
        if (sessionStorage.getItem('adminAuth')) {
            setIsAuth(true);
        }
        // Load data from localStorage
        const storedMsgs = JSON.parse(localStorage.getItem('messages') || '[]');
        setMessages(storedMsgs);

        const storedGallery = JSON.parse(localStorage.getItem('gallery') || 'null');
        if (storedGallery) {
            setGallery(storedGallery);
        } else {
            setGallery(INITIAL_GALLERY_IMAGES);
            localStorage.setItem('gallery', JSON.stringify(INITIAL_GALLERY_IMAGES));
        }

        const storedCourses = JSON.parse(localStorage.getItem('courses') || 'null');
        if (storedCourses) {
            setCourses(storedCourses);
        } else {
            setCourses(INITIAL_COURSES);
            localStorage.setItem('courses', JSON.stringify(INITIAL_COURSES));
        }
    }, []);

    const checkLockout = () => {
        const lockoutTime = localStorage.getItem('adminLockout');
        if (lockoutTime && Date.now() < parseInt(lockoutTime)) {
            setIsLocked(true);
            const remaining = Math.ceil((parseInt(lockoutTime) - Date.now()) / 60000);
            setLoginError(`Account locked due to security policy. Try again in ${remaining} minute(s).`);
            return true;
        } else if (lockoutTime && Date.now() >= parseInt(lockoutTime)) {
            localStorage.removeItem('adminLockout');
            localStorage.removeItem('adminAttempts');
            setIsLocked(false);
            setLoginError('');
        }
        return false;
    };

    const handleLogin = (e) => {
        e.preventDefault();

        if (checkLockout()) return;

        const creds = JSON.parse(localStorage.getItem('adminCreds') || '{"user":"admin","pass":"admin"}');

        if (username === creds.user && password === creds.pass) {
            setIsAuth(true);
            sessionStorage.setItem('adminAuth', 'true');
            setLoginError('');
            localStorage.setItem('adminAttempts', '0'); // reset
        } else {
            let attempts = parseInt(localStorage.getItem('adminAttempts') || '0') + 1;
            localStorage.setItem('adminAttempts', attempts.toString());

            if (attempts >= 5) {
                // Lock for 15 minutes
                const unlockTime = Date.now() + 15 * 60 * 1000;
                localStorage.setItem('adminLockout', unlockTime.toString());
                setIsLocked(true);
                setLoginError('Account locked due to too many failed attempts (OWASP Limit). Try again in 15 minutes.');
            } else {
                setLoginError(`Invalid credentials. ${5 - attempts} attempts remaining.`);
            }
        }
    };

    const handleLogout = () => {
        setIsAuth(false);
        sessionStorage.removeItem('adminAuth');
    };

    const handleChangePassword = (e) => {
        e.preventDefault();
        const creds = JSON.parse(localStorage.getItem('adminCreds') || '{"user":"admin","pass":"admin"}');

        if (oldPassword !== creds.pass) {
            setSettingsMsg({ text: 'Current password is incorrect.', type: 'error' });
            return;
        }
        if (newPassword !== confirmPassword) {
            setSettingsMsg({ text: 'New passwords do not match.', type: 'error' });
            return;
        }
        if (!OWASP_REGEX.test(newPassword)) {
            setSettingsMsg({ text: 'Password must be min 8 chars, 1 uppercase, 1 lowercase, 1 number, and 1 special char.', type: 'error' });
            return;
        }

        creds.pass = newPassword;
        localStorage.setItem('adminCreds', JSON.stringify(creds));
        setSettingsMsg({ text: 'Password updated securely (OWASP Compliant).', type: 'success' });

        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
    };

    const handleDeleteMessage = (id) => {
        const filtered = messages.filter(m => m.id !== id);
        setMessages(filtered);
        localStorage.setItem('messages', JSON.stringify(filtered));
    };

    const handleAddImage = async (e) => {
        e.preventDefault();
        if (!newImgFile || !newImgTitle) return;

        const base64Url = await getBase64(newImgFile);

        const img = {
            id: Date.now(),
            url: base64Url,
            title: newImgTitle,
            cat: newImgCat
        };

        const updated = [img, ...gallery];
        setGallery(updated);
        localStorage.setItem('gallery', JSON.stringify(updated));

        setNewImgFile(null);
        setNewImgTitle('');
        const fileInput = document.getElementById('galleryFileInput');
        if (fileInput) fileInput.value = '';
    };

    const handleDeleteImage = (id) => {
        const filtered = gallery.filter(img => img.id !== id);
        setGallery(filtered);
        localStorage.setItem('gallery', JSON.stringify(filtered));
    };


    const handleAddCourse = async (e) => {
        e.preventDefault();
        if (!newCourseFile || !newCourseTitle || !newCoursePrice || !newCourseDesc) return;

        const base64Url = await getBase64(newCourseFile);

        const course = {
            id: Date.now(),
            title: newCourseTitle,
            level: newCourseLevel,
            price: newCoursePrice,
            modules: parseInt(newCourseModules) || 0,
            desc: newCourseDesc,
            img: base64Url
        };

        const updated = [course, ...courses];
        setCourses(updated);
        localStorage.setItem('courses', JSON.stringify(updated));

        setNewCourseFile(null);
        setNewCourseTitle('');
        setNewCoursePrice('');
        setNewCourseModules('');
        setNewCourseDesc('');

        const fileInput = document.getElementById('courseFileInput');
        if (fileInput) fileInput.value = '';
    };

    const handleDeleteCourse = (id) => {
        const filtered = courses.filter(c => c.id !== id);
        setCourses(filtered);
        localStorage.setItem('courses', JSON.stringify(filtered));
    };


    if (!isAuthenticated) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bg-deep)', padding: '2rem' }}>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.06)',
                    padding: '3rem', borderRadius: '16px', width: '100%', maxWidth: '400px', textAlign: 'center'
                }}>
                    <h2 style={{ fontSize: '1.8rem', marginBottom: '2rem', color: 'var(--accent)' }}>Admin Access</h2>
                    <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} style={inputBase} required />
                        <PasswordInput value={password} onChange={e => setPassword(e.target.value)} />
                        {loginError && <p style={{ color: '#ff4d4d', fontSize: '0.8rem', margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}><ShieldAlert size={14} /> {loginError}</p>}
                        <button type="submit" disabled={isLocked} className="btn-gold" style={{ width: '100%', borderRadius: '8px', padding: '1rem', opacity: isLocked ? 0.5 : 1, cursor: isLocked ? 'not-allowed' : 'pointer' }}>Login</button>
                    </form>
                </motion.div>
            </div>
        );
    }

    return (
        <div style={{ backgroundColor: 'var(--bg-deep)', minHeight: '100vh', paddingTop: '110px', paddingBottom: '4rem' }}>
            <div className="container" style={{ maxWidth: '1000px' }}>

                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', borderBottom: '1px solid var(--border-dim)', paddingBottom: '2rem' }}>
                    <div>
                        <h1 style={{ fontSize: '2.5rem', margin: 0 }}>Studio <span style={{ color: 'var(--accent)' }}>CMS</span></h1>
                        <p style={{ color: 'var(--text-muted)' }}>Manage your messages, gallery, and courses.</p>
                    </div>
                    <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: '1px solid var(--border)', padding: '0.5rem 1rem', color: 'var(--text-secondary)', borderRadius: '8px', cursor: 'pointer' }}>
                        <LogOut size={16} /> Logout
                    </button>
                </header>

                <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                    <button onClick={() => setActiveTab('messages')} style={{
                        padding: '0.75rem 1.5rem', borderRadius: '8px', border: 'none', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
                        background: activeTab === 'messages' ? 'var(--accent)' : 'rgba(255,255,255,0.05)',
                        color: activeTab === 'messages' ? '#000' : 'var(--text-primary)'
                    }}>
                        <Mail size={18} /> Inquiries ({messages.length})
                    </button>
                    <button onClick={() => setActiveTab('gallery')} style={{
                        padding: '0.75rem 1.5rem', borderRadius: '8px', border: 'none', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
                        background: activeTab === 'gallery' ? 'var(--accent)' : 'rgba(255,255,255,0.05)',
                        color: activeTab === 'gallery' ? '#000' : 'var(--text-primary)'
                    }}>
                        <ImageIcon size={18} /> Gallery ({gallery.length})
                    </button>
                    <button onClick={() => setActiveTab('courses')} style={{
                        padding: '0.75rem 1.5rem', borderRadius: '8px', border: 'none', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
                        background: activeTab === 'courses' ? 'var(--accent)' : 'rgba(255,255,255,0.05)',
                        color: activeTab === 'courses' ? '#000' : 'var(--text-primary)'
                    }}>
                        <BookOpen size={18} /> Courses ({courses.length})
                    </button>
                    <button onClick={() => setActiveTab('settings')} style={{
                        padding: '0.75rem 1.5rem', borderRadius: '8px', border: 'none', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
                        background: activeTab === 'settings' ? 'var(--accent)' : 'rgba(255,255,255,0.05)',
                        color: activeTab === 'settings' ? '#000' : 'var(--text-primary)'
                    }}>
                        <Settings size={18} /> Settings
                    </button>
                </div>

                <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>

                    {activeTab === 'messages' && (
                        <div style={{ display: 'grid', gap: '1.5rem' }}>
                            {messages.length === 0 ? (
                                <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '3rem', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '12px' }}>No inquiries received yet.</p>
                            ) : messages.map((msg) => (
                                <div key={msg.id} style={{ backgroundColor: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.06)', padding: '2rem', borderRadius: '12px', position: 'relative' }}>
                                    <button onClick={() => handleDeleteMessage(msg.id)} style={{ position: 'absolute', top: '2rem', right: '2rem', background: 'none', border: 'none', color: '#ff4d4d', cursor: 'pointer', opacity: 0.7 }} title="Delete">
                                        <Trash size={20} />
                                    </button>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                                        <div>
                                            <span style={{ fontSize: '0.7rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Name</span>
                                            <p style={{ margin: '0.25rem 0 0', fontWeight: 500 }}>{msg.name}</p>
                                        </div>
                                        <div>
                                            <span style={{ fontSize: '0.7rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Contact</span>
                                            <p style={{ margin: '0.25rem 0 0', color: 'var(--text-secondary)' }}>{msg.email} • {msg.phone}</p>
                                        </div>
                                        {msg.company && (
                                            <div>
                                                <span style={{ fontSize: '0.7rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Company</span>
                                                <p style={{ margin: '0.25rem 0 0' }}>{msg.company} {msg.jobTitle && `(${msg.jobTitle})`}</p>
                                            </div>
                                        )}
                                        <div>
                                            <span style={{ fontSize: '0.7rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Inquiry Type</span>
                                            <p style={{ margin: '0.25rem 0 0', fontWeight: 500 }}>{msg.type || 'General'}</p>
                                        </div>
                                    </div>
                                    <span style={{ fontSize: '0.7rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Date: {new Date(msg.id).toLocaleString()}</span>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'gallery' && (
                        <div>
                            {/* Add New Image Form */}
                            <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.06)', padding: '2rem', borderRadius: '12px', marginBottom: '3rem' }}>
                                <h3 style={{ marginBottom: '1.5rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '8px' }}><Plus size={20} color="var(--accent)" /> Upload New Image</h3>
                                <form onSubmit={handleAddImage} style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>

                                    <div style={{ display: 'flex', gap: '1rem', flex: '1 1 auto', minWidth: '300px' }}>
                                        <label style={{ ...inputBase, display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', flex: 1, backgroundColor: 'rgba(0,0,0,0.2)' }}>
                                            <Upload size={16} />
                                            {newImgFile ? newImgFile.name : 'Select Image File...'}
                                            <input id="galleryFileInput" type="file" accept="image/*" onChange={e => setNewImgFile(e.target.files[0])} style={{ display: 'none' }} required />
                                        </label>
                                    </div>

                                    <input type="text" placeholder="Title" value={newImgTitle} onChange={e => setNewImgTitle(e.target.value)} style={{ ...inputBase, flex: '1', minWidth: '150px' }} required />
                                    <select value={newImgCat} onChange={e => setNewImgCat(e.target.value)} style={{ ...inputBase, flex: '1', minWidth: '150px', cursor: 'pointer' }}>
                                        <option value="Fine Art" style={{ background: '#111520' }}>Fine Art</option>
                                        <option value="Wedding & Events" style={{ background: '#111520' }}>Wedding & Events</option>
                                        <option value="Logo Design" style={{ background: '#111520' }}>Logo Design</option>
                                    </select>
                                    <button type="submit" className="btn-gold" style={{ padding: '0.9rem 2rem', borderRadius: '8px', flexShrink: 0 }}>Add Photo</button>
                                </form>
                            </div>

                            {/* Image Grid */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                                {gallery.map((img) => (
                                    <div key={img.id} style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                                        <img src={img.url} alt={img.title} style={{ width: '100%', height: '220px', objectFit: 'cover', display: 'block' }} />
                                        <div style={{ padding: '1rem', backgroundColor: '#0d1120' }}>
                                            <p style={{ color: 'var(--accent)', fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.2rem' }}>{img.cat}</p>
                                            <h4 style={{ margin: 0, fontWeight: 500, fontSize: '1rem', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>{img.title}</h4>
                                        </div>
                                        <button onClick={() => handleDeleteImage(img.id)} style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: 'rgba(0,0,0,0.6)', border: 'none', color: '#ff4d4d', borderRadius: '50%', padding: '8px', cursor: 'pointer', display: 'flex' }} title="Remove">
                                            <Trash size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'courses' && (
                        <div>
                            {/* Add New Course Form */}
                            <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.06)', padding: '2rem', borderRadius: '12px', marginBottom: '3rem' }}>
                                <h3 style={{ marginBottom: '1.5rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '8px' }}><Plus size={20} color="var(--accent)" /> Add New Course</h3>
                                <form onSubmit={handleAddCourse} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

                                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                        <label style={{ ...inputBase, display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', flex: '1', minWidth: '200px', backgroundColor: 'rgba(0,0,0,0.2)' }}>
                                            <Upload size={16} />
                                            {newCourseFile ? newCourseFile.name : 'Upload Course Image...'}
                                            <input id="courseFileInput" type="file" accept="image/*" onChange={e => setNewCourseFile(e.target.files[0])} style={{ display: 'none' }} required />
                                        </label>
                                        <input type="text" placeholder="Course Title" value={newCourseTitle} onChange={e => setNewCourseTitle(e.target.value)} style={{ ...inputBase, flex: '2', minWidth: '200px' }} required />
                                        <select value={newCourseLevel} onChange={e => setNewCourseLevel(e.target.value)} style={{ ...inputBase, flex: '1', minWidth: '150px', cursor: 'pointer' }}>
                                            <option value="Beginner" style={{ background: '#111520' }}>Beginner</option>
                                            <option value="Intermediate" style={{ background: '#111520' }}>Intermediate</option>
                                            <option value="Advanced" style={{ background: '#111520' }}>Advanced</option>
                                        </select>
                                    </div>
                                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                        <input type="text" placeholder="Price (e.g. $149)" value={newCoursePrice} onChange={e => setNewCoursePrice(e.target.value)} style={{ ...inputBase, flex: '1', minWidth: '100px' }} required />
                                        <input type="number" placeholder="Modules Count" value={newCourseModules} onChange={e => setNewCourseModules(e.target.value)} style={{ ...inputBase, flex: '1', minWidth: '100px' }} required />
                                        <input type="text" placeholder="Short Description..." value={newCourseDesc} onChange={e => setNewCourseDesc(e.target.value)} style={{ ...inputBase, flex: '4', minWidth: '250px' }} required />
                                    </div>

                                    <button type="submit" className="btn-gold" style={{ padding: '0.9rem 2rem', borderRadius: '8px', alignSelf: 'flex-start', marginTop: '0.5rem' }}>Create Course</button>
                                </form>
                            </div>

                            {/* Course Grid */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
                                {courses.map((c) => (
                                    <div key={c.id} style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'var(--bg-card)' }}>
                                        <button onClick={() => handleDeleteCourse(c.id)} style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: 'rgba(0,0,0,0.6)', border: 'none', color: '#ff4d4d', borderRadius: '50%', padding: '8px', cursor: 'pointer', display: 'flex', zIndex: 10 }} title="Remove">
                                            <Trash size={16} />
                                        </button>
                                        <img src={c.img} alt={c.title} style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }} />
                                        <div style={{ padding: '1.5rem' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                                <span style={{ fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 700, color: 'var(--accent)', border: '1px solid var(--accent)', padding: '0.25rem 0.75rem' }}>{c.level}</span>
                                                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{c.modules} Modules</span>
                                            </div>
                                            <h4 style={{ margin: '0 0 0.5rem 0', fontWeight: 500, fontSize: '1.2rem', lineHeight: 1.2 }}>{c.title}</h4>
                                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '1rem', fontWeight: 300, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{c.desc}</p>
                                            <div style={{ borderTop: '1px solid var(--border-dim)', paddingTop: '1rem' }}>
                                                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: 'var(--accent)' }}>{c.price}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'settings' && (
                        <div style={{ maxWidth: '450px' }}>
                            <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.06)', padding: '2rem', borderRadius: '12px' }}>
                                <h3 style={{ margin: '0 0 1.5rem 0', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <ShieldAlert size={20} color="var(--accent)" /> Security Settings
                                </h3>
                                <div style={{ backgroundColor: 'rgba(201,168,76,0.05)', border: '1px solid rgba(201,168,76,0.1)', padding: '1rem', borderRadius: '8px', marginBottom: '2rem' }}>
                                    <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                                        <strong>OWASP Standards Enforced:</strong><br />
                                        Your new password must be at least 8 characters long, containing at least one uppercase letter, one lowercase letter, one number, and one special character.
                                    </p>
                                </div>
                                <form onSubmit={handleChangePassword} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Current Password</label>
                                        <PasswordInput value={oldPassword} onChange={e => setOldPassword(e.target.value)} placeholder="Current Password" />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>New Password</label>
                                        <PasswordInput value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="New Password" />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Confirm New Password</label>
                                        <PasswordInput value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Confirm New Password" />
                                    </div>
                                    {settingsMsg.text && (
                                        <div style={{ backgroundColor: settingsMsg.type === 'error' ? 'rgba(255,77,77,0.1)' : 'rgba(77,255,136,0.1)', border: `1px solid ${settingsMsg.type === 'error' ? 'rgba(255,77,77,0.3)' : 'rgba(77,255,136,0.3)'}`, padding: '0.75rem', borderRadius: '8px', marginTop: '0.5rem' }}>
                                            <p style={{ color: settingsMsg.type === 'error' ? '#ff4d4d' : '#4dff88', fontSize: '0.85rem', margin: 0 }}>
                                                {settingsMsg.text}
                                            </p>
                                        </div>
                                    )}
                                    <button type="submit" className="btn-gold" style={{ padding: '0.9rem 2rem', borderRadius: '8px', alignSelf: 'flex-start', marginTop: '1rem' }}>Update Password</button>
                                </form>
                            </div>
                        </div>
                    )}

                </motion.div>
            </div>
        </div>
    );
}
