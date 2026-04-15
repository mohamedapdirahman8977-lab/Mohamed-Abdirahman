import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, MessageSquare, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      await addDoc(collection(db, 'leads'), {
        ...formData,
        createdAt: serverTimestamp(),
        status: 'new',
      });
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      setStatus('error');
      setErrorMessage('Failed to send message. Please try again.');
      handleFirestoreError(error, OperationType.CREATE, 'leads');
    }
  };

  return (
    <section id="contact" className="relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[10px] font-bold text-accent-primary tracking-[0.2em] uppercase mb-4"
            >
              Let's Work Together
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-text-main mb-8"
            >
              Ready to <br />
              <span className="text-gradient-accent">Elevate?</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-text-dim text-lg mb-12 max-w-md leading-relaxed"
            >
              Send me a message or reach out via WhatsApp for a quick chat about your next project.
            </motion.p>

            <div className="flex flex-col gap-6">
              <a
                href="https://wa.me/252615518977"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group"
              >
                <div className="w-10 h-10 rounded-lg bg-[#25D366]/10 flex items-center justify-center group-hover:bg-[#25D366]/20 transition-colors">
                  <MessageSquare className="text-[#25D366] w-5 h-5" />
                </div>
                <div>
                  <p className="text-[#25D366] font-bold text-sm">● WhatsApp Chat</p>
                </div>
              </a>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-8 rounded-xl bg-card-bg border border-border relative overflow-hidden"
          >
            <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <input
                    required
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-black border border-border text-text-main placeholder:text-text-dim/50 focus:outline-none focus:border-accent-primary transition-colors text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <input
                    required
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-black border border-border text-text-main placeholder:text-text-dim/50 focus:outline-none focus:border-accent-primary transition-colors text-sm"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <textarea
                  required
                  rows={4}
                  placeholder="Tell me about your project..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-black border border-border text-text-main placeholder:text-text-dim/50 focus:outline-none focus:border-accent-primary transition-colors resize-none text-sm"
                />
              </div>

              <div className="flex justify-end">
                <button
                  disabled={status === 'loading'}
                  className="px-8 py-3 rounded-lg bg-gradient-accent text-white font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : status === 'success' ? (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      Sent
                    </>
                  ) : (
                    <>
                      Send Message
                    </>
                  )}
                </button>
              </div>

              {status === 'error' && (
                <div className="flex items-center gap-2 text-red-400 text-xs justify-center">
                  <AlertCircle className="w-4 h-4" />
                  {errorMessage}
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
