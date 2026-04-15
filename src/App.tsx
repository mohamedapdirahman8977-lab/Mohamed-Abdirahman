import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ServicesPage from './pages/ServicesPage';
import PortfolioPage from './pages/PortfolioPage';
import AboutPage from './pages/AboutPage';
import { Github, Twitter, Linkedin, Cpu } from 'lucide-react';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-bg text-text-main selection:bg-accent-primary/30 flex flex-col">
        <Navbar />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={
              <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
                  <div className="lg:sticky lg:top-32 lg:h-[calc(100vh-160px)] flex flex-col justify-center">
                    <Home />
                  </div>
                  <div className="hidden lg:block">
                    {/* Visual spacer or secondary content for home */}
                    <div className="h-full flex items-center justify-center">
                      <div className="w-full aspect-square bg-gradient-accent opacity-5 blur-[100px] rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            } />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </main>
        
        <footer className="py-20 border-t border-border bg-bg">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="flex flex-col items-center md:items-start gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                  <Cpu className="text-white w-5 h-5" />
                </div>
                <span className="text-lg font-bold tracking-tight">
                  CASRI <span className="text-blue-500">AI</span>
                </span>
              </div>
              <p className="text-gray-500 text-sm max-w-xs text-center md:text-left">
                Empowering businesses with high-quality, AI-driven content creation services.
              </p>
            </div>

            <div className="flex items-center gap-8">
              <a href="#" className="text-gray-500 hover:text-white transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors">
                <Github className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
          
          <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-xs">
              © {new Date().getFullYear()} CASRI AI Content Creation. All rights reserved.
            </p>
            <div className="flex gap-8">
              <a href="#" className="text-gray-600 text-xs hover:text-gray-400 transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-600 text-xs hover:text-gray-400 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
    </Router>
  );
}
