import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Cpu, Sparkles, Send, MessageSquare, ChevronRight, Github, Twitter, Linkedin, ExternalLink, Plus } from 'lucide-react';
import { cn } from '../lib/utils';
import { auth, signInWithGoogle, logout, db } from '../lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        const userDoc = await getDoc(doc(db, 'users', u.uid));
        setIsAdmin(userDoc.data()?.role === 'admin' || u.email === 'maxamedcraxman12345@gmail.com');
      } else {
        setIsAdmin(false);
      }
    });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      unsubscribe();
    };
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Portfolio', href: '/portfolio' },
    ...(isAdmin ? [{ name: 'Admin', href: '/portfolio' }] : []),
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b',
        scrolled 
          ? 'bg-bg/80 backdrop-blur-md border-border py-4' 
          : 'bg-transparent border-transparent py-6'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-xl font-extrabold tracking-tight text-gradient-accent">
            CASRI AI
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={cn(
                "text-sm font-medium transition-colors",
                location.pathname === link.href ? "text-text-main" : "text-text-dim hover:text-text-main"
              )}
            >
              {link.name}
            </Link>
          ))}
          {user ? (
            <div className="flex items-center gap-4">
              {isAdmin && (
                <Link 
                  to="/portfolio" 
                  className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-lg bg-accent-primary/10 border border-accent-primary/20 text-accent-primary text-xs font-bold hover:bg-accent-primary/20 transition-all"
                >
                  <Plus className="w-3 h-3" /> Manage Portfolio
                </Link>
              )}
              <div className="flex flex-col items-end">
                <span className="text-xs font-bold text-text-main">{user.displayName}</span>
                {isAdmin && <span className="text-[8px] font-bold text-accent-primary uppercase tracking-widest">Admin</span>}
              </div>
              <img src={user.photoURL || ''} alt="" className="w-8 h-8 rounded-full border border-border" referrerPolicy="no-referrer" />
              <button 
                onClick={logout}
                className="text-sm font-medium text-text-dim hover:text-text-main transition-colors"
              >
                Log Out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <div className="px-4 py-2 rounded-full border border-border bg-white/5 text-text-main text-xs font-semibold">
                Available for projects
              </div>
              <button
                onClick={signInWithGoogle}
                className="px-5 py-2 rounded-lg bg-gradient-accent text-white text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                Log In
              </button>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-bg border-b border-border p-6 md:hidden"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "text-lg font-medium transition-colors",
                    location.pathname === link.href ? "text-text-main" : "text-text-dim hover:text-text-main"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              {user ? (
                <button 
                  onClick={() => { logout(); setIsOpen(false); }}
                  className="w-full py-3 rounded-xl bg-white/10 text-white font-semibold"
                >
                  Log Out
                </button>
              ) : (
                <button
                  onClick={() => { signInWithGoogle(); setIsOpen(false); }}
                  className="w-full py-3 rounded-xl bg-white text-black font-semibold"
                >
                  Log In
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
