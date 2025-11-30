
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Users, Star, Home as HomeIcon, Key, Briefcase, ShieldCheck } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import AnimatedSection from '../components/AnimatedSection';
import TestimonialCarousel from '../components/TestimonialCarousel';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';

const Counter = ({ end, duration = 2000, suffix = "", prefix = "", decimals = 0 }: { end: number, duration?: number, suffix?: string, prefix?: string, decimals?: number }) => {
  const [count, setCount] = useState(0);
  const nodeRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let start = 0;
          const increment = end / (duration / 16);
          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(start);
            }
          }, 16);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (nodeRef.current) {
      observer.observe(nodeRef.current);
    }

    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <span ref={nodeRef}>
      {prefix}{count.toFixed(decimals)}{suffix}
    </span>
  );
};

const Home: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col">
      <SEO 
        title={t.home.meta_title}
        description={t.home.meta_desc}
      />
      {/* HERO SECTION */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop" 
            alt="Agadir Taghazout Bay Residence Luxury View" 
            className="w-full h-full object-cover"
          />
          {/* Darker Gradient overlay for better text contrast - Tuned for Teal Theme */}
          <div className="absolute inset-0 bg-gradient-to-b from-nesty-darker/90 via-nesty-darker/40 to-nesty-darker/80"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-16">
          <span className="inline-block py-1.5 px-4 rounded-full bg-nesty-accent/20 backdrop-blur-md text-nesty-accent border border-nesty-accent/50 text-xs md:text-sm font-bold tracking-widest mb-6 animate-fade-in-up uppercase shadow-[0_0_15px_rgba(45,212,191,0.3)]">
            {t.home.badge}
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-xl animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            {t.home.hero_title_1} <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-nesty-accent to-teal-200 drop-shadow-sm">
              {t.home.hero_title_2}
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-200 mb-10 max-w-3xl mx-auto font-medium drop-shadow-md animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            {t.home.hero_desc}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{animationDelay: '0.6s'}}>
            <Link 
              to="/contact" 
              className="px-8 py-4 bg-nesty-accent text-nesty-darker font-bold rounded-full hover:bg-white hover:text-nesty-accentDark transition transform hover:-translate-y-1 shadow-[0_4px_20px_rgba(45,212,191,0.4)] text-lg border border-transparent"
            >
              {t.home.cta_estimate}
            </Link>
            <Link 
              to="/conciergerie" 
              className="px-8 py-4 bg-white/10 backdrop-blur-md text-white font-bold rounded-full hover:bg-white/20 transition transform hover:-translate-y-1 shadow-xl text-lg border border-white/20"
            >
              {t.home.cta_services}
            </Link>
          </div>
        </div>

        {/* Floating Stats Bar */}
        <div className="absolute bottom-0 w-full z-20 transform translate-y-1/2 px-4 hidden md:block">
            <div className="max-w-7xl mx-auto">
               <div className="bg-white rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.3)] p-8 grid grid-cols-4 divide-x divide-gray-100 border border-gray-100">
                  <div className="text-center group cursor-default">
                    <div className="text-4xl font-bold text-nesty-dark mb-1 group-hover:text-nesty-accent transition-colors duration-300">
                      <Counter end={50} prefix="+" suffix="%" />
                    </div>
                    <div className="text-gray-500 text-sm font-bold uppercase tracking-wider">{t.home.stats_revenue}</div>
                  </div>
                  <div className="text-center group cursor-default">
                    <div className="text-4xl font-bold text-nesty-dark mb-1 group-hover:text-nesty-accent transition-colors duration-300">
                       <Counter end={85} suffix="%" />
                    </div>
                    <div className="text-gray-500 text-sm font-bold uppercase tracking-wider">{t.home.stats_occupancy}</div>
                  </div>
                  <div className="text-center group cursor-default">
                    <div className="text-4xl font-bold text-nesty-dark mb-1 group-hover:text-nesty-accent transition-colors duration-300">
                       <Counter end={4.9} suffix="/5" decimals={1} />
                    </div>
                    <div className="text-gray-500 text-sm font-bold uppercase tracking-wider">{t.home.stats_rating}</div>
                  </div>
                  <div className="text-center group cursor-default">
                    <div className="text-4xl font-bold text-nesty-dark mb-1 group-hover:text-nesty-accent transition-colors duration-300">
                       <Counter end={60} prefix="+" />
                    </div>
                    <div className="text-gray-500 text-sm font-bold uppercase tracking-wider">{t.home.stats_managed}</div>
                  </div>
               </div>
            </div>
        </div>
      </section>

      {/* Spacer for overlapping stats bar */}
      <div className="h-24 bg-white hidden md:block"></div>

      {/* WHY NESTY SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
             <SectionHeader title={t.home.why_title} subtitle={t.home.why_subtitle} />
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatedSection delay={100} className="h-full">
              <div className="p-8 rounded-2xl bg-slate-50 hover:bg-white hover:shadow-xl transition duration-300 border border-slate-100 text-center group h-full">
                <div className="w-16 h-16 mx-auto bg-nesty-light rounded-full flex items-center justify-center mb-6 group-hover:bg-nesty-accent group-hover:text-white transition duration-300 border border-nesty-accent/20">
                  <TrendingUp className="text-nesty-accent group-hover:text-white transition" size={32} />
                </div>
                <h3 className="text-xl font-bold text-nesty-dark mb-3">{t.home.why_1_title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {t.home.why_1_desc}
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={200} className="h-full">
              <div className="p-8 rounded-2xl bg-slate-50 hover:bg-white hover:shadow-xl transition duration-300 border border-slate-100 text-center group h-full">
                <div className="w-16 h-16 mx-auto bg-nesty-light rounded-full flex items-center justify-center mb-6 group-hover:bg-nesty-accent group-hover:text-white transition duration-300 border border-nesty-accent/20">
                  <Star className="text-nesty-accent group-hover:text-white transition" size={32} />
                </div>
                <h3 className="text-xl font-bold text-nesty-dark mb-3">{t.home.why_2_title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {t.home.why_2_desc}
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={300} className="h-full">
              <div className="p-8 rounded-2xl bg-slate-50 hover:bg-white hover:shadow-xl transition duration-300 border border-slate-100 text-center group h-full">
                <div className="w-16 h-16 mx-auto bg-nesty-light rounded-full flex items-center justify-center mb-6 group-hover:bg-nesty-accent group-hover:text-white transition duration-300 border border-nesty-accent/20">
                  <ShieldCheck className="text-nesty-accent group-hover:text-white transition" size={32} />
                </div>
                <h3 className="text-xl font-bold text-nesty-dark mb-3">{t.home.why_3_title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {t.home.why_3_desc}
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* NOS SERVICES SECTION */}
      <section className="py-24 bg-nesty-dark text-white relative overflow-hidden">
        {/* Decoration circle - Updated color */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-nesty-accent/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-purple-900/20 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection>
             <SectionHeader title={t.home.services_title} subtitle={t.home.services_subtitle} light />
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Service 1 */}
            <AnimatedSection delay={100}>
              <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-nesty-accent/50 transition duration-500 flex flex-col hover:shadow-[0_0_30px_rgba(45,212,191,0.15)] h-full">
                <div className="h-48 overflow-hidden">
                  <img src="https://picsum.photos/id/1031/600/400" alt="Conciergerie" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition duration-700" />
                </div>
                <div className="p-8 flex-grow relative">
                  <div className="absolute top-0 right-0 -mt-6 mr-6 w-12 h-12 bg-nesty-accent rounded-full flex items-center justify-center shadow-lg group-hover:rotate-12 transition duration-300">
                    <Key className="text-nesty-dark" size={20} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-nesty-accent transition">
                    {t.home.serv_concierge_title}
                  </h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {t.home.serv_concierge_desc}
                  </p>
                  <Link to="/conciergerie" className="text-nesty-accent font-bold flex items-center gap-2 hover:gap-3 transition-all uppercase text-sm tracking-wider mt-auto">
                    {t.home.learn_more} <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </AnimatedSection>

            {/* Service 2 */}
            <AnimatedSection delay={200}>
              <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-nesty-accent/50 transition duration-500 flex flex-col hover:shadow-[0_0_30px_rgba(45,212,191,0.15)] h-full">
                <div className="h-48 overflow-hidden">
                   <img src="https://picsum.photos/id/1076/600/400" alt="Investissement" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition duration-700" />
                </div>
                <div className="p-8 flex-grow relative">
                  <div className="absolute top-0 right-0 -mt-6 mr-6 w-12 h-12 bg-nesty-accent rounded-full flex items-center justify-center shadow-lg group-hover:rotate-12 transition duration-300">
                    <HomeIcon className="text-nesty-dark" size={20} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-nesty-accent transition">
                    {t.home.serv_invest_title}
                  </h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {t.home.serv_invest_desc}
                  </p>
                  <Link to="/investir" className="text-nesty-accent font-bold flex items-center gap-2 hover:gap-3 transition-all uppercase text-sm tracking-wider mt-auto">
                    {t.home.discover} <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </AnimatedSection>

             {/* Service 3 */}
             <AnimatedSection delay={300}>
               <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-nesty-accent/50 transition duration-500 flex flex-col hover:shadow-[0_0_30px_rgba(45,212,191,0.15)] h-full">
                <div className="h-48 overflow-hidden">
                  <img src="https://picsum.photos/id/445/600/400" alt="Conseil" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition duration-700" />
                </div>
                <div className="p-8 flex-grow relative">
                  <div className="absolute top-0 right-0 -mt-6 mr-6 w-12 h-12 bg-nesty-accent rounded-full flex items-center justify-center shadow-lg group-hover:rotate-12 transition duration-300">
                    <Briefcase className="text-nesty-dark" size={20} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-nesty-accent transition">
                    {t.home.serv_conseil_title}
                  </h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {t.home.serv_conseil_desc}
                  </p>
                  <Link to="/conseil" className="text-nesty-accent font-bold flex items-center gap-2 hover:gap-3 transition-all uppercase text-sm tracking-wider mt-auto">
                    {t.home.our_offers} <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* WHO WE ARE SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="lg:w-1/2">
              <AnimatedSection className="relative group">
                <img src="https://picsum.photos/id/101/600/600" alt="Équipe Nesty" className="rounded-2xl shadow-2xl z-10 relative grayscale group-hover:grayscale-0 transition duration-500" />
                <div className="absolute -bottom-6 -right-6 w-full h-full bg-nesty-dark rounded-2xl -z-0"></div>
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-nesty-accent/20 rounded-full -z-0 blur-xl"></div>
              </AnimatedSection>
            </div>
            <div className="lg:w-1/2">
              <AnimatedSection delay={200}>
                <h4 className="text-nesty-accent font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
                  <span className="w-8 h-0.5 bg-nesty-accent"></span>
                  {t.home.who_badge}
                </h4>
                <h2 className="text-4xl font-bold text-nesty-dark mb-6">{t.home.who_title}</h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  {t.home.who_desc_1}
                </p>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  {t.home.who_desc_2}
                </p>
                <Link to="/contact" className="inline-flex items-center justify-center px-8 py-4 border border-nesty-dark text-base font-bold rounded-full text-nesty-dark hover:bg-nesty-dark hover:text-white transition duration-300">
                  {t.home.meet_team}
                </Link>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
             <SectionHeader title={t.home.testimonials_title} subtitle={t.home.testimonials_subtitle} />
             <TestimonialCarousel />
          </AnimatedSection>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full">
           <div className="absolute top-10 left-10 w-20 h-20 border-4 border-nesty-accent/20 rounded-full animate-spin-slow"></div>
           <div className="absolute bottom-10 right-10 w-32 h-32 bg-nesty-accent/5 rounded-full blur-xl"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
           <AnimatedSection>
             <h2 className="text-3xl md:text-4xl font-bold text-nesty-dark mb-6">{t.home.cta_bottom_title}</h2>
             <p className="text-xl text-gray-600 mb-10">{t.home.cta_bottom_desc}</p>
             <Link to="/contact" className="px-10 py-4 bg-nesty-accent text-nesty-darker font-bold rounded-full hover:bg-nesty-accentDark hover:text-white transition shadow-[0_10px_20px_rgba(45,212,191,0.3)] text-lg">
               {t.home.cta_bottom_btn}
             </Link>
           </AnimatedSection>
        </div>
      </section>

    </div>
  );
};

export default Home;
