import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/context/LanguageContext';

import defaultImage from '@/assets/images/hero-bg.png';

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  type?: string;
  keywords?: string;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  image = defaultImage,
  type = 'website',
  keywords = "Nesty, Conciergerie Agadir, Gestion locative, Investissement immobilier, Airbnb Maroc"
}) => {
  const { language } = useLanguage();
  const siteTitle = `${title} | Nesty`;
  const currentUrl = window.location.href;

  return (
    <Helmet>
      <html lang={language} />
      {/* Basic Meta Tags */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Nesty Agadir" />
      <meta property="og:locale" content={language === 'fr' ? 'fr_FR' : 'en_US'} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Canonical */}
      <link rel="canonical" href={currentUrl} />
    </Helmet>
  );
};

export default SEO;