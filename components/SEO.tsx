import React, { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  type?: string;
}

const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  image = 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop',
  type = 'website' 
}) => {
  const { language } = useLanguage();
  const location = useLocation();
  
  // Construct canonical URL
  const currentUrl = window.location.href;

  useEffect(() => {
    // 1. Update Title
    document.title = title;
    
    // 2. Helper function to manage meta tags
    const setMetaTag = (attr: string, key: string, content: string) => {
      let element = document.querySelector(`meta[${attr}="${key}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, key);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 3. Standard Meta
    setMetaTag('name', 'description', description);
    document.documentElement.lang = language;

    // 4. Open Graph (Facebook, LinkedIn)
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:image', image);
    setMetaTag('property', 'og:url', currentUrl);
    setMetaTag('property', 'og:type', type);
    setMetaTag('property', 'og:site_name', 'Nesty Agadir');
    setMetaTag('property', 'og:locale', language === 'fr' ? 'fr_FR' : 'en_US');

    // 5. Twitter Card
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', image);
    
  }, [title, description, image, type, currentUrl, language]);

  return null;
};

export default SEO;