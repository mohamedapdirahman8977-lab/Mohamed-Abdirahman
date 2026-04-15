import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { signInWithGoogle } from '../lib/firebase';

export default function Hero() {
  return (
    <section className="relative flex items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center md:text-left">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-accent-primary/10 border border-accent-primary/20 mb-8"
        >
          <span className="text-[10px] font-bold text-accent-primary tracking-widest uppercase">Powered by Advanced AI</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold tracking-tighter text-text-main mb-8 leading-[1.1]"
        >
          Smart AI Content <br className="hidden md:block" />
          for Your Business
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-text-dim max-w-2xl mx-auto md:mx-0 mb-12 leading-relaxed"
        >
          High-converting blog posts, social media captions, and scripts. 
          Creative, SEO-optimized, and delivered in record time.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4"
        >
          <button 
            onClick={signInWithGoogle}
            className="px-8 py-4 rounded-lg bg-gradient-accent text-white font-bold text-sm transition-all hover:opacity-90 active:scale-95"
          >
            Hire Me
          </button>
          <Link
            to="/portfolio"
            className="px-8 py-4 rounded-lg bg-white/5 border border-border text-text-main font-bold text-sm hover:bg-white/10 transition-all"
          >
            View Work
          </Link>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center p-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1 h-1 rounded-full bg-white"
          />
        </div>
      </motion.div>
    </section>
  );
}
