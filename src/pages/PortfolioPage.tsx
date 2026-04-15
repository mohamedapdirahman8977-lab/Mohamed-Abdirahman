import React from 'react';
import Portfolio from '../components/Portfolio';
import PortfolioManager from '../components/PortfolioManager';
import { motion } from 'motion/react';
import { auth, signInWithGoogle } from '../lib/firebase';

export default function PortfolioPage() {
  return (
    <div className="pt-20">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-text-main mb-6">Portfolio</h1>
          <p className="text-text-dim text-xl max-w-2xl">
            Explore our latest projects and see how we've helped brands transform their content strategy with AI.
          </p>
        </motion.div>
        
        <PortfolioManager />
        
        {!auth.currentUser && (
          <div className="mb-12 p-6 rounded-xl bg-accent-primary/5 border border-accent-primary/10 text-center">
            <p className="text-text-dim text-sm">
              Are you the owner? <button onClick={() => signInWithGoogle()} className="text-accent-primary font-bold hover:underline">Log in</button> to manage your portfolio.
            </p>
          </div>
        )}

        <Portfolio />
      </div>
    </div>
  );
}
