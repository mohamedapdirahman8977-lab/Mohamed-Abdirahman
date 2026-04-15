import React from 'react';
import { motion } from 'motion/react';
import { User, Target, Award, Coffee } from 'lucide-react';

export default function AboutPage() {
  const stats = [
    { label: 'Projects Completed', value: '150+', icon: Target },
    { label: 'Happy Clients', value: '80+', icon: Award },
    { label: 'AI Models Mastered', value: '12', icon: Coffee },
  ];

  return (
    <div className="pt-20">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[10px] font-bold text-accent-primary tracking-[0.2em] uppercase mb-4">
              About Me
            </p>
            <h1 className="text-5xl md:text-7xl font-bold text-text-main mb-8 leading-tight">
              I'm <span className="text-gradient-accent">Mohamed A.rahman</span>
            </h1>
            <p className="text-text-dim text-xl mb-8 leading-relaxed">
              I am a passionate AI Content Creator dedicated to bridging the gap between human creativity and artificial intelligence. With years of experience in digital storytelling, I help brands communicate their message faster and more effectively.
            </p>
            <p className="text-text-dim text-lg mb-12 leading-relaxed">
              My mission is to transform how businesses approach content. By leveraging advanced AI tools, I deliver high-converting copy, engaging social media presence, and compelling video scripts that resonate with modern audiences.
            </p>

            <div className="grid grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center gap-2 text-accent-primary">
                    <stat.icon className="w-4 h-4" />
                    <span className="text-2xl font-bold text-text-main">{stat.value}</span>
                  </div>
                  <p className="text-xs text-text-dim uppercase tracking-wider font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square rounded-[2.5rem] overflow-hidden border border-border bg-card-bg relative z-10">
              <img 
                src="https://picsum.photos/seed/mohamed/800/800" 
                alt="Mohamed A.rahman" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent-primary/20 rounded-full blur-[80px] -z-10" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent-secondary/20 rounded-full blur-[80px] -z-10" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
