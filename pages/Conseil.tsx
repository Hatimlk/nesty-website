
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight, ChevronDown, ChevronUp, Search } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import AnimatedSection from '../components/AnimatedSection';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';

const PricingCard = ({ title, price, target, items, recommended = false, buttonText }: any) => (
  <div className={`relative rounded-2xl overflow-hidden transition-all duration-300 flex flex-col h-full ${recommended ? 'border-2 border-nesty-accent shadow-2xl scale-105 z-10 bg-white' : 'border border-gray-200 shadow-sm hover:shadow-lg bg-white'}`}>
    {recommended && (
      <div className="bg-nesty-accent text-nesty-darker text-center py-2 font-bold uppercase text-xs tracking-widest">
        {buttonText.recommended}
      </div>
    )}
    <div className="p-8 flex-grow">
      <h3 className="text-2xl font-bold text-nesty-dark mb-2">{title}</h3>
      <p className="text-gray-500 text-sm mb-6 font-medium uppercase tracking-wide">{target}</p>
      <div className="mb-8">
        <span className="text-4xl font-bold text-nesty-dark">{price}</span>
        {price.includes('Devis') || <span className="text-gray-500 text-sm block mt-1">/ unique</span>}
      </div>
      
      <ul className="space-y-4 mb-8">
        {items.map((item: string, idx: number) => (
          <li key={idx} className="flex items-start gap-3">
            <div className={`mt-0.5 rounded-full p-0.5 ${recommended ? 'bg-nesty-accent text-white' : 'bg-gray-200 text-gray-500'}`}>
               <Check size={12} />
            </div>
            <span className="text-gray-700 text-sm leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </div>
    <div className="p-8 pt-0 mt-auto">
      <Link 
        to="/contact" 
        className={`flex items-center justify-center w-full py-4 rounded-xl font-bold text-center transition ${recommended ? 'bg-nesty-darker text-white hover:bg-slate-800' : 'bg-white border border-gray-300 text-slate-700 hover:bg-gray-50 hover:border-gray-400'}`}
      >
        {buttonText.choose} {recommended && <ArrowRight size={16} className="ml-2" />}
      </Link>
    </div>
  </div>
);

interface FaqItemProps {
  question: string;
  answer: string;
}

const FaqItem: React.FC<FaqItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        className="flex justify-between items-center w-full py-6 text-left focus:outline-none group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={`text-lg font-bold transition-colors ${isOpen ? 'text-nesty-accent' : 'text-nesty-dark group-hover:text-nesty-accent'}`}>
          {question}
        </span>
        <div className={`p-1 rounded-full transition-colors flex-shrink-0 ml-4 ${isOpen ? 'bg-nesty-accent text-white' : 'bg-gray-100 text-gray-500 group-hover:bg-nesty-accent/20 group-hover:text-nesty-accent'}`}>
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 mb-6' : 'max-h-0 opacity-0'}`}
      >
        <p className="text-gray-600 leading-relaxed pr-8">
          {answer}
        </p>
      </div>
    </div>
  );
};

const Conseil: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { t } = useLanguage();

  // Map the translated FAQ data
  const faqData = t.conseil.faqs.map(item => ({
    question: item.q,
    answer: item.a
  }));

  const filteredFaqs = faqData.filter(item => 
    item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pt-16">
      <SEO 
        title={t.conseil.meta_title}
        description={t.conseil.meta_desc}
      />
      <section className="bg-nesty-dark text-white py-24 text-center relative overflow-hidden">
         {/* Pattern Overlay */}
         <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#2DD4BF 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
         
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <AnimatedSection>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{t.conseil.hero_title}</h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              {t.conseil.hero_desc}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gray-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <AnimatedSection>
             <SectionHeader 
               title={t.home.our_offers} 
               subtitle={t.conseil.hero_desc}
             />
           </AnimatedSection>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
              <AnimatedSection delay={100} className="h-full">
                <PricingCard 
                  title={t.conseil.offer_autonomy_title}
                  price={t.conseil.offer_autonomy_price}
                  target={t.conseil.offer_autonomy_target}
                  buttonText={{ choose: t.conseil.choose_offer, recommended: t.conseil.recommended }}
                  items={[
                    t.conseil.offer_autonomy_item_1,
                    t.conseil.offer_autonomy_item_2,
                    t.conseil.offer_autonomy_item_3,
                    t.conseil.offer_autonomy_item_4
                  ]}
                />
              </AnimatedSection>

              <AnimatedSection delay={200} className="h-full">
                <PricingCard 
                  title={t.conseil.offer_booster_title}
                  price={t.conseil.offer_booster_price}
                  target={t.conseil.offer_booster_target}
                  recommended={true}
                  buttonText={{ choose: t.conseil.choose_offer, recommended: t.conseil.recommended }}
                  items={[
                    t.conseil.offer_booster_item_1,
                    t.conseil.offer_booster_item_2,
                    t.conseil.offer_booster_item_3,
                    t.conseil.offer_booster_item_4,
                    t.conseil.offer_booster_item_5,
                    t.conseil.offer_booster_item_6
                  ]}
                />
              </AnimatedSection>
           </div>

           <AnimatedSection delay={300}>
              <div className="mt-16 max-w-3xl mx-auto bg-white p-8 rounded-2xl text-center border border-nesty-accent/20 shadow-sm">
                 <h2 className="text-xl font-bold text-nesty-dark mb-2">{t.conseil.custom_title}</h2>
                 <p className="text-gray-600 mb-6">{t.conseil.custom_desc}</p>
                 <Link to="/contact" className="text-nesty-accent font-bold hover:underline text-lg">
                   {t.conseil.contact_discuss}
                 </Link>
              </div>
           </AnimatedSection>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
           <AnimatedSection>
              <SectionHeader 
                  title={t.conseil.faq_title}
                  subtitle={t.conseil.faq_subtitle}
              />

              {/* Search Bar */}
              <div className="mb-10 relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <Search size={20} />
                </div>
                <input 
                  type="text" 
                  placeholder={t.conseil.search_placeholder}
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 shadow-sm focus:ring-2 focus:ring-nesty-accent focus:border-transparent outline-none transition text-gray-700 bg-slate-50 focus:bg-white"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="bg-slate-50 rounded-2xl p-8 shadow-sm border border-gray-100 min-h-[300px]">
                  {filteredFaqs.length > 0 ? (
                    filteredFaqs.map((faq, index) => (
                      <FaqItem 
                          key={index}
                          question={faq.question}
                          answer={faq.answer}
                      />
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                        <Search size={32} />
                      </div>
                      <h3 className="text-lg font-bold text-gray-700 mb-2">{t.conseil.no_results}</h3>
                      <p className="text-gray-500">{t.conseil.try_again}</p>
                    </div>
                  )}
              </div>
            </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default Conseil;
