
import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Camera, BarChart3, MessageCircle, Clock, Sparkles, Wrench, ArrowRight, TrendingUp, ShieldCheck, PieChart } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import AnimatedSection from '../components/AnimatedSection';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';

const ServiceItem = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <div className="flex gap-4 p-6 bg-white rounded-xl shadow-sm hover:shadow-lg transition border border-gray-100 hover:border-nesty-accent/30 group h-full">
    <div className="flex-shrink-0">
      <div className="w-12 h-12 bg-teal-50 text-nesty-accent rounded-full flex items-center justify-center group-hover:bg-nesty-accent group-hover:text-white group-hover:scale-110 transition duration-300 transform">
        <Icon size={24} />
      </div>
    </div>
    <div>
      <h3 className="text-lg font-bold text-nesty-dark mb-2 group-hover:text-nesty-accent transition">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </div>
  </div>
);

const Conciergerie: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="pt-16">
      <SEO 
        title={t.conciergerie.meta_title}
        description={t.conciergerie.meta_desc}
      />
      {/* Hero Section */}
      <section className="bg-nesty-darker text-white py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-teal-900/20 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <AnimatedSection>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">{t.conciergerie.hero_title} <span className="text-nesty-accent">{t.conciergerie.hero_title_span}</span></h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
              {t.conciergerie.hero_desc}
            </p>
            <Link to="/contact" className="px-8 py-4 bg-nesty-accent text-nesty-darker font-bold rounded-full hover:bg-nesty-accentDark hover:text-white transition inline-flex items-center gap-2 shadow-lg shadow-teal-500/20">
              {t.conciergerie.cta_estimate} <ArrowRight size={20} />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16">
            
            {/* Left Column: Services Grid */}
            <div className="lg:w-2/3">
              <AnimatedSection>
                 <SectionHeader title={t.conciergerie.expertise_title} subtitle={t.conciergerie.expertise_subtitle} center={false} />
              </AnimatedSection>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AnimatedSection delay={100} className="h-full">
                  <ServiceItem 
                    icon={CheckCircle} 
                    title={t.conciergerie.serv_1_title}
                    description={t.conciergerie.serv_1_desc}
                  />
                </AnimatedSection>
                <AnimatedSection delay={150} className="h-full">
                  <ServiceItem 
                    icon={Camera} 
                    title={t.conciergerie.serv_2_title}
                    description={t.conciergerie.serv_2_desc}
                  />
                </AnimatedSection>
                <AnimatedSection delay={200} className="h-full">
                  <ServiceItem 
                    icon={BarChart3} 
                    title={t.conciergerie.serv_3_title}
                    description={t.conciergerie.serv_3_desc}
                  />
                </AnimatedSection>
                <AnimatedSection delay={250} className="h-full">
                  <ServiceItem 
                    icon={MessageCircle} 
                    title={t.conciergerie.serv_4_title}
                    description={t.conciergerie.serv_4_desc}
                  />
                </AnimatedSection>
                <AnimatedSection delay={300} className="h-full">
                  <ServiceItem 
                    icon={Clock} 
                    title={t.conciergerie.serv_5_title}
                    description={t.conciergerie.serv_5_desc}
                  />
                </AnimatedSection>
                <AnimatedSection delay={350} className="h-full">
                  <ServiceItem 
                    icon={Sparkles} 
                    title={t.conciergerie.serv_6_title}
                    description={t.conciergerie.serv_6_desc}
                  />
                </AnimatedSection>
                <AnimatedSection delay={400} className="h-full md:col-span-2">
                  <ServiceItem 
                    icon={Wrench} 
                    title={t.conciergerie.serv_7_title}
                    description={t.conciergerie.serv_7_desc}
                  />
                </AnimatedSection>
              </div>
            </div>

            {/* Right Column: Image, Yield Highlight & Pricing */}
            <div className="lg:w-1/3 relative">
               <div className="sticky top-24 space-y-8">
                  <AnimatedSection delay={500}>
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl h-[300px]">
                      <img 
                        src="https://picsum.photos/id/1053/600/800" 
                        alt="Intérieur cozy" 
                        className="object-cover h-full w-full" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-6 left-6 right-6 text-white">
                        <p className="font-bold text-lg">Appartement Marina</p>
                        <p className="text-sm text-gray-200">Géré par Nesty depuis 2020</p>
                      </div>
                    </div>
                  </AnimatedSection>

                  {/* Feature Highlight: Yield Management - UPDATED HIGH VISIBILITY */}
                  <AnimatedSection delay={600}>
                    <div className="bg-nesty-accent p-8 rounded-2xl shadow-[0_10px_40px_-10px_rgba(45,212,191,0.5)] text-nesty-darker relative overflow-hidden border border-nesty-accentDark/30 transform hover:scale-[1.02] transition duration-300">
                       <div className="absolute top-0 right-0 w-40 h-40 bg-white/20 rounded-full blur-3xl -mr-10 -mt-10"></div>
                       <div className="relative z-10">
                         <div className="bg-nesty-darker w-14 h-14 rounded-xl flex items-center justify-center mb-6 text-nesty-accent shadow-lg">
                            <TrendingUp size={30} />
                         </div>
                         <h3 className="text-2xl font-bold mb-3 text-nesty-darker leading-tight">{t.conciergerie.yield_highlight_title}</h3>
                         <p className="text-nesty-darker/80 text-sm font-medium leading-relaxed mb-6">
                           {t.conciergerie.yield_highlight_desc}
                         </p>
                         <div className="flex items-center gap-2 text-sm bg-white/30 p-3 rounded-lg backdrop-blur-sm border border-white/20">
                            <CheckCircle size={18} className="text-nesty-darker" /> 
                            <span className="font-bold text-nesty-darker">+30% Revenus Moyens</span>
                         </div>
                       </div>
                    </div>
                  </AnimatedSection>

                  {/* Pricing Card - UPDATED VISUALS */}
                  <AnimatedSection delay={700}>
                    <div className="bg-white p-8 rounded-2xl shadow-xl border-t-4 border-nesty-dark relative">
                      <h3 className="text-xl font-bold text-nesty-dark mb-8 flex items-center gap-2">
                        <PieChart className="text-nesty-accent" size={22} />
                        {t.conciergerie.pricing_title}
                      </h3>
                      
                      {/* Visual Split */}
                      <div className="mb-8 relative">
                        <div className="flex w-full h-16 rounded-xl overflow-hidden font-bold text-lg shadow-inner border border-gray-200">
                          <div className="w-[80%] bg-green-100 text-green-800 flex flex-col items-center justify-center relative group cursor-default border-r border-white">
                             <span className="text-2xl">80%</span>
                             <span className="text-[10px] uppercase tracking-wider opacity-75">{t.conciergerie.pricing_owner_share}</span>
                          </div>
                          <div className="w-[20%] bg-nesty-dark text-nesty-accent flex flex-col items-center justify-center relative group cursor-default">
                             <span className="text-xl">20%</span>
                             <span className="text-[8px] uppercase tracking-wider opacity-75 text-white">Nesty</span>
                          </div>
                        </div>
                        
                        {/* Connector lines visualization (Optional decorative) */}
                        <div className="absolute top-full left-0 w-full flex justify-between px-4">
                           <div className="h-4 w-px bg-gray-300"></div>
                           <div className="h-4 w-px bg-gray-300"></div>
                        </div>
                      </div>
                      
                      <div className="bg-slate-50 p-6 rounded-xl text-center border border-dashed border-gray-300 mt-4">
                         <p className="text-nesty-dark font-bold text-sm leading-relaxed flex flex-col items-center gap-3">
                           <ShieldCheck size={24} className="text-green-500" />
                           <span className="text-base">
                             "Nous prenons <span className="text-nesty-darker underline decoration-nesty-accent decoration-2 underline-offset-2">20%</span>, vous conservez <span className="text-green-600 underline decoration-green-300 decoration-2 underline-offset-2">80%</span>."
                           </span>
                           <span className="text-xs text-gray-500 font-normal uppercase tracking-wide bg-white px-3 py-1 rounded-full border border-gray-100 shadow-sm">
                             Aucuns frais cachés
                           </span>
                         </p>
                      </div>
                    </div>
                  </AnimatedSection>
               </div>
            </div>

          </div>
        </div>
      </section>
      
      {/* Key Stats Bar */}
      <section className="py-12 bg-nesty-dark text-white border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-gray-700">
              <div className="pt-4 md:pt-0">
                <div className="text-4xl font-bold text-nesty-accent mb-2">+20 000</div>
                <div className="text-gray-400 uppercase tracking-wider text-sm">{t.conciergerie.stats_guests}</div>
              </div>
              <div className="pt-8 md:pt-0 px-4">
                <div className="text-4xl font-bold text-nesty-accent mb-2">4.8/5</div>
                <div className="text-gray-400 uppercase tracking-wider text-sm">{t.conciergerie.stats_rating}</div>
              </div>
              <div className="pt-8 md:pt-0 px-4">
                <div className="text-4xl font-bold text-nesty-accent mb-2">100%</div>
                <div className="text-gray-400 uppercase tracking-wider text-sm">{t.conciergerie.stats_response}</div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default Conciergerie;
