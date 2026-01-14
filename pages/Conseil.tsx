
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight, ChevronDown, ChevronUp, Search } from 'lucide-react';
import { SectionHeader, AnimatedSection } from '@/components/common';
import { SEO } from '@/components/layout';
import { useLanguage } from '../context/LanguageContext';
import conseilHero from '@/assets/images/conseil-hero.png';

const PricingCard = ({ title, price, target, items, recommended = false, buttonText }: any) => (
  <div className={`relative rounded-3xl overflow-hidden transition-all duration-500 flex flex-col h-full group ${recommended ? 'shadow-2xl shadow-teal-900/10 scale-105 z-10 bg-white ring-1 ring-nesty-accent/50' : 'border border-gray-100 shadow-lg hover:shadow-xl hover:border-nesty-accent/30 bg-white/80 backdrop-blur-sm'}`}>
    {recommended && (
      <div className="bg-gradient-to-r from-nesty-accent to-teal-400 text-nesty-darker text-center py-3 font-extrabold uppercase text-[10px] tracking-[0.2em] shadow-sm">
        {buttonText.recommended}
      </div>
    )}
    <div className={`p-8 flex-grow relative ${recommended ? 'bg-gradient-to-b from-teal-50/50 to-transparent' : ''}`}>
      {/* Decorative Gradient Blob for Recommended */}
      {recommended && <div className="absolute top-0 right-0 w-32 h-32 bg-nesty-accent/10 rounded-full blur-3xl -mr-10 -mt-10"></div>}

      <h3 className="text-2xl font-black text-nesty-dark mb-2 relative z-10">{title}</h3>
      <p className="text-gray-500 text-xs mb-8 font-bold uppercase tracking-wider relative z-10">{target}</p>

      <div className="mb-8 relative z-10">
        <span className="text-5xl font-black text-nesty-dark tracking-tight">{price}</span>
        {price.includes('Devis') || <span className="text-gray-400 text-xs font-bold uppercase tracking-wide block mt-2 ml-1">/ prestation unique</span>}
      </div>

      <ul className="space-y-5 mb-8 relative z-10">
        {items.map((item: string, idx: number) => (
          <li key={idx} className="flex items-start gap-4 group/item">
            <div className={`mt-0.5 rounded-full p-1 flex-shrink-0 transition-colors duration-300 ${recommended ? 'bg-nesty-accent text-white shadow-sm' : 'bg-gray-100 text-gray-400 group-hover/item:bg-nesty-accent/20 group-hover/item:text-nesty-accent'}`}>
              <Check size={12} strokeWidth={3} />
            </div>
            <span className="text-gray-600 text-sm font-medium leading-relaxed group-hover/item:text-gray-900 transition-colors">{item}</span>
          </li>
        ))}
      </ul>
    </div>
    <div className="p-8 pt-0 mt-auto relative z-10">
      <Link
        to="/contact"
        className={`flex items-center justify-center w-full py-4 rounded-xl font-bold text-center transition-all duration-300 ${recommended ? 'bg-nesty-darker text-white hover:bg-nesty-accent hover:text-nesty-darker shadow-lg hover:shadow-teal-500/25' : 'bg-white border-2 border-slate-100 text-slate-600 hover:border-nesty-accent hover:text-nesty-accent'}`}
      >
        {buttonText.choose} {recommended && <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />}
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
    <div className={`border-b last:border-0 transition-colors duration-300 ${isOpen ? 'border-nesty-accent/30' : 'border-gray-100'}`}>
      <button
        className="flex justify-between items-center w-full py-6 text-left focus:outline-none group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={`text-lg font-bold transition-all duration-300 ${isOpen ? 'text-nesty-accent pl-2' : 'text-nesty-dark group-hover:text-nesty-darker'}`}>
          {question}
        </span>
        <div className={`p-2 rounded-full transition-all duration-300 flex-shrink-0 ml-4 ${isOpen ? 'bg-nesty-accent text-white rotate-180 shadow-md' : 'bg-gray-50 text-gray-400 group-hover:bg-gray-100'}`}>
          <ChevronDown size={20} />
        </div>
      </button>
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 opacity-100 mb-8' : 'max-h-0 opacity-0'}`}
      >
        <p className="text-gray-500 leading-relaxed pl-2 border-l-2 border-nesty-accent/20 ml-1">
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
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={conseilHero}
            alt="Conseil Strategy Agadir"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-nesty-darker/90 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-nesty-darker via-transparent to-transparent opacity-90"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <AnimatedSection>
            <span className="inline-block py-1 px-3 rounded-full bg-nesty-accent/20 text-nesty-accent text-sm font-bold mb-6 border border-nesty-accent/50 backdrop-blur-sm">
              Stratégie & Croissance
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6 text-white leading-tight">
              {t.conseil.hero_title}
            </h1>
            <p className="text-xl text-gray-200 leading-relaxed max-w-2xl mx-auto font-medium">
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
            <div className="mb-12 relative max-w-2xl mx-auto">
              <div className="absolute left-6 top-1/2 -translate-y-1/2 text-nesty-accent">
                <Search size={24} />
              </div>
              <input
                type="text"
                placeholder={t.conseil.search_placeholder}
                className="w-full pl-16 pr-6 py-5 rounded-2xl border-2 border-gray-100 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] focus:ring-4 focus:ring-nesty-accent/10 focus:border-nesty-accent outline-none transition-all text-lg text-gray-700 bg-white placeholder-gray-400 group"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute inset-0 rounded-2xl bg-nesty-accent/5 opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none -z-10 scale-105"></div>
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
