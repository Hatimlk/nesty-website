import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Mail, Phone, MapPin, Globe, Lock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

// Custom TikTok Icon in Lucide style
const TikTokIcon = ({ size = 18, className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const Footer: React.FC = () => {
  const { t, language, setLanguage } = useLanguage();

  return (
    <footer className="bg-nesty-darker text-white pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* Brand Column */}
          <div>
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 lowercase tracking-tighter">
              <div className="w-8 h-8 bg-nesty-accent rounded-md flex items-center justify-center text-nesty-darker font-bold text-lg">n</div> nesty
            </h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              {t.footer.desc}
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.linkedin.com/company/ste-nesty-sarl/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-slate-800 p-2 rounded-full text-gray-400 hover:text-white hover:bg-nesty-accent transition-all duration-300 transform hover:scale-110 shadow-md"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a 
                href="https://www.instagram.com/nesty_morocco/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-slate-800 p-2 rounded-full text-gray-400 hover:text-white hover:bg-nesty-accent transition-all duration-300 transform hover:scale-110 shadow-md"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="https://www.tiktok.com/@othman_kaddach" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-slate-800 p-2 rounded-full text-gray-400 hover:text-white hover:bg-nesty-accent transition-all duration-300 transform hover:scale-110 shadow-md"
                aria-label="TikTok"
              >
                <TikTokIcon size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white inline-flex flex-col">
              {t.footer.navigation}
              <span className="h-1 w-10 bg-nesty-accent rounded-full mt-1"></span>
            </h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-400 hover:text-nesty-accent transition flex items-center gap-2"><span className="text-nesty-accent text-xs">●</span> {t.nav.home}</Link></li>
              <li><Link to="/conciergerie" className="text-gray-400 hover:text-nesty-accent transition flex items-center gap-2"><span className="text-nesty-accent text-xs">●</span> {t.footer.services_concierge}</Link></li>
              <li><Link to="/investir" className="text-gray-400 hover:text-nesty-accent transition flex items-center gap-2"><span className="text-nesty-accent text-xs">●</span> {t.footer.services_invest}</Link></li>
              <li><Link to="/conseil" className="text-gray-400 hover:text-nesty-accent transition flex items-center gap-2"><span className="text-nesty-accent text-xs">●</span> {t.footer.services_consult}</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-nesty-accent transition flex items-center gap-2"><span className="text-nesty-accent text-xs">●</span> {t.footer.contact_us}</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white inline-flex flex-col">
              {t.footer.contact}
              <span className="h-1 w-10 bg-nesty-accent rounded-full mt-1"></span>
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="text-nesty-accent mt-1 flex-shrink-0" size={18} />
                <span className="text-gray-400">{t.footer.office}</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="text-nesty-accent mt-1 flex-shrink-0" size={18} />
                <div className="flex flex-col">
                  <span className="text-gray-400">+212 690 87 97 77</span>
                  <span className="text-gray-400">+212 525 89 90 93</span>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-nesty-accent flex-shrink-0" size={18} />
                <span className="text-gray-400">contact@nesty.ma</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          <div className="flex flex-col md:flex-row items-center gap-4 mb-4 md:mb-0">
             <p>&copy; {new Date().getFullYear()} Nesty. {t.footer.rights}</p>
             <button 
               onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
               className="flex items-center gap-2 text-nesty-accent hover:text-white transition-all duration-300 px-3 py-1 bg-white/5 hover:bg-nesty-accent rounded-full transform hover:scale-105 shadow-sm"
             >
               <Globe size={14} /> {language === 'fr' ? 'Français' : 'English'}
             </button>
          </div>
          <div className="flex gap-6 items-center">
            <Link to="/legal" className="hover:text-nesty-accent transition">{t.footer.legal}</Link>
            <Link to="/privacy" className="hover:text-nesty-accent transition">{t.footer.privacy}</Link>
            <Link to="/admin" className="hover:text-nesty-accent transition flex items-center gap-1 opacity-60 hover:opacity-100" aria-label="Admin Dashboard">
               <Lock size={14} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;