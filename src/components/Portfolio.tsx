import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ChevronRight, Loader2 } from 'lucide-react';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, query, orderBy, onSnapshot, limit } from 'firebase/firestore';

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
}

export default function Portfolio() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, 'portfolio'), 
      orderBy('createdAt', 'desc'),
      limit(6)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const portfolioData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as PortfolioItem[];
      setItems(portfolioData);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'portfolio');
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <section id="portfolio" className="relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-600/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-[10px] font-bold text-accent-primary tracking-[0.2em] uppercase mb-4"
            >
              Recent Work
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-text-main"
            >
              Portfolio Highlights
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <a href="/portfolio" className="text-accent-primary text-xs font-bold tracking-widest uppercase flex items-center gap-2 hover:opacity-80 transition-opacity">
              View All <ChevronRight className="w-3 h-3" />
            </a>
          </motion.div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-accent-primary animate-spin" />
          </div>
        ) : items.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-6">
            {items.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative rounded-xl overflow-hidden bg-card-bg border border-border"
              >
                <div className="h-48 overflow-hidden bg-bg">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-accent-primary uppercase tracking-widest">{project.category}</span>
                  </div>
                  <h3 className="text-sm font-bold text-text-main mb-2 group-hover:text-accent-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-text-dim text-xs leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-card-bg rounded-2xl border border-border">
            <p className="text-text-dim">No portfolio items yet.</p>
          </div>
        )}
      </div>
    </section>
  );
}
