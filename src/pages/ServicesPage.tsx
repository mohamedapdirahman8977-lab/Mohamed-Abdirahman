import React from 'react';
import Services from '../components/Services';
import { motion } from 'motion/react';

export default function ServicesPage() {
  return (
    <div className="pt-20">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-text-main mb-6">Our Services</h1>
          <p className="text-text-dim text-xl max-w-2xl">
            We provide cutting-edge AI content solutions designed to scale your business and engage your audience.
          </p>
        </motion.div>
        <Services />
      </div>
    </div>
  );
}
