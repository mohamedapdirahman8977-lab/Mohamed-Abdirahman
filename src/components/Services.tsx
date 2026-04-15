import React from 'react';
import { motion } from 'motion/react';
import { FileText, Share2, Youtube, PenTool } from 'lucide-react';

const services = [
  {
    title: 'Blog Writing',
    description: 'SEO optimized articles that rank high and engage readers. Powered by deep research and AI precision.',
    icon: FileText,
    color: 'from-blue-500 to-cyan-400',
  },
  {
    title: 'Social Media Content',
    description: 'Engaging posts and captions tailored for each platform. Boost your presence and drive interaction.',
    icon: Share2,
    color: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Script Writing',
    description: 'Compelling scripts for YouTube, TikTok, and Ads. Narrative-driven content that keeps viewers hooked.',
    icon: Youtube,
    color: 'from-orange-500 to-red-500',
  },
];

export default function Services() {
  return (
    <section id="services" className="relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center md:text-left mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] font-bold text-accent-primary tracking-[0.2em] uppercase mb-4"
          >
            Services
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-text-main"
          >
            Specialized AI Content
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-6 rounded-xl bg-card-bg border border-border hover:border-accent-primary/30 transition-all"
            >
              <div className="w-10 h-10 rounded-lg bg-accent-primary/10 flex items-center justify-center mb-6">
                <service.icon className="text-accent-primary w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-text-main mb-3">{service.title}</h3>
              <p className="text-text-dim text-sm leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
