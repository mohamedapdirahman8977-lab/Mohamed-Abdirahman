import React from 'react';
import Hero from '../components/Hero';
import Contact from '../components/Contact';

export default function Home() {
  return (
    <div className="space-y-32">
      <Hero />
      <Contact />
    </div>
  );
}
