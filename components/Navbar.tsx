import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, Key } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();

  // Determine if we are on the home page for transparency effects
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleLanguage = () => setLanguage(language === 'fr' ? 'en' : 'fr');

  // Classes for the navbar background transition
  const navClass = `fixed w-full z-50 transition-all duration-300 ${
    scrolled || !isHome ? 'bg-nesty-darker shadow-lg py-2' : 'bg-transparent py-4'
  }`;

  // Link styles
  const linkClass = `text-sm font-semibold uppercase tracking-wide transition-colors duration-300 text-white hover:text-nesty-accent`;

  // Special button style for "Mes Propriétés"
  const buttonClass = "bg-nesty-accent text-nesty-darker px-4 py-2 rounded-md text-sm font-bold hover:bg-nesty-accentDark hover:text-white transition-all duration-300 uppercase shadow-md transform hover:scale-105 active:scale-95";

  // Nesty Logo SVG Component
  const NestyLogo = () => (
    <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Abstract House/N Shape */}
      <path d="M20 80V40L50 15L80 40V80H60V55C60 50 55 45 50 45C45 45 40 50 40 55V80H20Z" fill="#2DD4BF" />
      {/* Keyhole dot */}
      <circle cx="50" cy="65" r="4" fill="#1E293B" />
      {/* Keyhole slot */}
      <path d="M48 65L46 75H54L52 65" fill="#1E293B" />
    </svg>
  );

  return (
    <nav className={navClass}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center gap-3 group">
             <div className="bg-white p-1.5 rounded-lg shadow-lg group-hover:scale-105 transition duration-300">
                <NestyLogo />
             </div>
             <span className="text-3xl font-bold text-white tracking-tighter lowercase font-sans relative bottom-0.5">nesty</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={linkClass}>{t.nav.home}</Link>
            <Link to="/conciergerie" className={linkClass}>{t.nav.conciergerie}</Link>
            <Link to="/investir" className={linkClass}>{t.nav.investir}</Link>
            <Link to="/conseil" className={linkClass}>{t.nav.conseil}</Link>
            <Link to="/contact" className={linkClass}>{t.nav.contact}</Link>
            
            <a href="https://book.hostfully.com/nesty-sarl-au/search" target="_blank" rel="noreferrer" className={buttonClass}>
              {t.nav.properties}
            </a>

            {/* Language Switcher */}
            <button 
              onClick={toggleLanguage}
              className="text-white hover:text-nesty-accent hover:bg-white/10 px-3 py-1.5 rounded-full transition-all duration-300 flex items-center gap-1 text-sm font-bold transform hover:scale-105"
              aria-label="Switch Language"
            >
              <Globe size={18} />
              <span>{language.toUpperCase()}</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button 
              onClick={toggleLanguage}
              className="text-white hover:text-nesty-accent hover:bg-white/10 px-2 py-1 rounded-full transition-all duration-300 flex items-center gap-1 text-sm font-bold transform hover:scale-105"
            >
              <span>{language.toUpperCase()}</span>
            </button>
            <button
              onClick={toggleMenu}
              className="text-white hover:text-nesty-accent hover:bg-white/10 p-1 rounded-md focus:outline-none transition-all duration-300 transform hover:scale-110"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-nesty-darker/95 backdrop-blur-md absolute w-full border-t border-gray-800 shadow-xl">
          <div className="px-4 pt-4 pb-6 space-y-3 flex flex-col">
            <Link to="/" onClick={toggleMenu} className="block px-3 py-2 text-white hover:text-nesty-accent font-medium hover:bg-white/5 rounded-lg transition">{t.nav.home}</Link>
            <Link to="/conciergerie" onClick={toggleMenu} className="block px-3 py-2 text-white hover:text-nesty-accent font-medium hover:bg-white/5 rounded-lg transition">{t.nav.conciergerie}</Link>
            <Link to="/investir" onClick={toggleMenu} className="block px-3 py-2 text-white hover:text-nesty-accent font-medium hover:bg-white/5 rounded-lg transition">{t.nav.investir}</Link>
            <Link to="/conseil" onClick={toggleMenu} className="block px-3 py-2 text-white hover:text-nesty-accent font-medium hover:bg-white/5 rounded-lg transition">{t.nav.conseil}</Link>
            <Link to="/contact" onClick={toggleMenu} className="block px-3 py-2 text-white hover:text-nesty-accent font-medium hover:bg-white/5 rounded-lg transition">{t.nav.contact}</Link>
            
            <div className="h-px bg-gray-800 my-2"></div>
            
            <a 
              href="https://book.hostfully.com/nesty-sarl-au/search" 
              target="_blank" 
              rel="noreferrer" 
              className={`mt-2 flex items-center justify-center gap-2 w-full ${buttonClass}`}
            >
              <Key size={18} />
              {t.nav.properties}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;