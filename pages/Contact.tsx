import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, ChevronDown, ChevronUp, Clock, ArrowRight, ArrowUpRight } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';
import SectionHeader from '../components/SectionHeader';
import AnimatedSection from '../components/AnimatedSection';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import SEO from '../components/SEO';

interface FaqItemProps {
  question: string;
  answer: string;
}

const FaqItem: React.FC<FaqItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-100 last:border-0 bg-white first:rounded-t-xl last:rounded-b-xl px-6">
      <button
        className="flex justify-between items-center w-full py-6 text-left focus:outline-none group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={`text-base md:text-lg font-bold transition-colors ${isOpen ? 'text-nesty-accent' : 'text-nesty-dark group-hover:text-nesty-accent'}`}>
          {question}
        </span>
        <div className={`p-1.5 rounded-full transition-colors flex-shrink-0 ml-4 ${isOpen ? 'bg-nesty-accent text-white' : 'bg-gray-100 text-gray-500 group-hover:bg-nesty-accent/20 group-hover:text-nesty-accent'}`}>
          {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 mb-6' : 'max-h-0 opacity-0'}`}
      >
        <p className="text-gray-600 leading-relaxed text-sm md:text-base">
          {answer}
        </p>
      </div>
    </div>
  );
};

const ContactInfoCard = ({ icon: Icon, title, content }: any) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-start gap-4 h-full hover:shadow-md transition-shadow duration-300">
    <div className="bg-nesty-darker text-white p-3 rounded-full flex-shrink-0">
      <Icon size={24} />
    </div>
    <div>
      <h3 className="text-gray-500 text-sm font-semibold mb-1 uppercase tracking-wide">{title}</h3>
      <p className="text-nesty-dark font-bold text-lg">{content}</p>
    </div>
  </div>
);

const LocationCard = ({ title, address, phone, directionsText }: any) => (
  <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-lg transition duration-300 group h-full">
     <div className="inline-block px-3 py-1 bg-gray-100 rounded-lg text-xs font-bold text-gray-500 uppercase tracking-wide mb-6">
       Office
     </div>
     <h3 className="text-2xl font-bold text-nesty-dark mb-4">{title}</h3>
     <p className="text-gray-600 mb-2">{address}</p>
     <div className="flex items-center gap-2 text-nesty-dark font-medium mb-8">
       <Phone size={16} className="text-nesty-accent" /> {phone}
     </div>
     
     <a href="#" className="flex items-center gap-2 text-sm font-bold text-nesty-dark group-hover:text-nesty-accent transition">
       {directionsText} <div className="bg-nesty-accent text-white rounded-full p-1"><ArrowUpRight size={12} /></div>
     </a>
  </div>
);

const Contact: React.FC = () => {
  const { t } = useLanguage();
  const { addMessage } = useData();
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Estimation',
    message: ''
  });

  const [errors, setErrors] = useState<{email?: string, phone?: string}>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [lastSubmittedEmail, setLastSubmittedEmail] = useState('');

  useEffect(() => {
    if (location.state && location.state.propertyTitle) {
      const { propertyTitle, propertyId } = location.state;
      const propertyLink = `${window.location.origin}/#/investir?ref=${propertyId}`;
      
      setFormData(prev => ({
        ...prev,
        subject: t.contact.opt_investment,
        message: `Je suis intéressé par le bien : ${propertyTitle}.\n(Réf: #${propertyId})\nLien: ${propertyLink}\n\nPouvez-vous me donner plus d'informations ?`
      }));
    }
  }, [location.state, t.contact.opt_investment]);

  const validate = () => {
    const newErrors: {email?: string, phone?: string} = {};
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = t.contact.error_email;
    }

    // Phone validation (Check for at least 9 digits)
    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (formData.phone && phoneDigits.length < 9) {
       newErrors.phone = t.contact.error_phone;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      addMessage({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message
      });

      setTimeout(() => {
        setLastSubmittedEmail(formData.email);
        setIsSubmitted(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: 'Estimation',
          message: ''
        });
        setErrors({});
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 800);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (errors[e.target.name as keyof typeof errors]) {
        setErrors({
            ...errors,
            [e.target.name]: undefined
        });
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-gray-50">
      <SEO 
        title={t.contact.meta_title}
        description={t.contact.meta_desc}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        {/* Header Section */}
        <AnimatedSection>
           <div className="text-center mb-16">
             <div className="inline-block py-1 px-4 rounded-full bg-gray-200 text-gray-600 text-xs font-bold uppercase tracking-widest mb-4">
               {t.nav.contact}
             </div>
             <h1 className="text-4xl md:text-5xl font-bold text-nesty-dark mb-4">
               {t.contact.hero_title} <span className="text-nesty-accent">Nesty</span>
             </h1>
             <p className="text-gray-500 text-lg">
               {t.contact.connect_subtitle}
             </p>
           </div>
        </AnimatedSection>
        
        {/* Info Cards Row - Staggered Animation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <AnimatedSection delay={100} className="h-full">
              <ContactInfoCard 
                icon={MapPin}
                title="Agadir, Maroc"
                content="Centre Ville"
              />
            </AnimatedSection>
            <AnimatedSection delay={200} className="h-full">
              <ContactInfoCard 
                icon={Phone}
                title="Téléphone"
                content="+212 690 87 97 77"
              />
            </AnimatedSection>
            <AnimatedSection delay={300} className="h-full">
              <ContactInfoCard 
                icon={Mail}
                title="Email"
                content="contact@nesty.ma"
              />
            </AnimatedSection>
        </div>

        {/* Split Layout: Form & Image - Main Container Animation */}
        <AnimatedSection className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white rounded-3xl shadow-xl overflow-hidden min-h-[600px]">
             {/* Left: Form */}
             <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                 {isSubmitted ? (
                   <div className="text-center py-10 animate-fade-in-up">
                     <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                       <CheckCircle size={40} />
                     </div>
                     <h2 className="text-2xl font-bold text-nesty-dark mb-4">{t.contact.success_title}</h2>
                     <p className="text-gray-600 mb-8">{t.contact.success_desc}</p>
                     <button 
                        onClick={() => setIsSubmitted(false)}
                        className="px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-full font-bold text-gray-700 transition"
                     >
                        {t.contact.send_another}
                     </button>
                   </div>
                 ) : (
                   <>
                     <div className="mb-8">
                        <div className="inline-block px-3 py-1 bg-gray-100 rounded text-xs font-bold text-gray-500 uppercase tracking-wide mb-4">
                          {t.contact.contact_us}
                        </div>
                        <h2 className="text-3xl font-bold text-nesty-dark mb-2">{t.contact.form_title}</h2>
                        <p className="text-gray-500">{t.contact.form_subtitle}</p>
                     </div>
                     
                     <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                           <div>
                              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 ml-1">{t.contact.label_name}</label>
                              <input 
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder={t.contact.ph_name}
                                required
                                className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-3 text-nesty-dark focus:outline-none focus:ring-2 focus:ring-nesty-accent/50 focus:bg-white transition"
                              />
                           </div>
                           <div>
                              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 ml-1">{t.contact.label_email}</label>
                              <input 
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder={t.contact.ph_email}
                                required
                                className={`w-full bg-slate-50 border rounded-xl px-4 py-3 text-nesty-dark focus:outline-none focus:ring-2 focus:bg-white transition ${errors.email ? 'border-red-300 focus:ring-red-200' : 'border-gray-200 focus:ring-nesty-accent/50'}`}
                              />
                              {errors.email && <p className="text-red-500 text-xs mt-1 ml-1">{errors.email}</p>}
                           </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                           <div>
                              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 ml-1">{t.contact.label_phone}</label>
                              <input 
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder={t.contact.ph_phone}
                                className={`w-full bg-slate-50 border rounded-xl px-4 py-3 text-nesty-dark focus:outline-none focus:ring-2 focus:bg-white transition ${errors.phone ? 'border-red-300 focus:ring-red-200' : 'border-gray-200 focus:ring-nesty-accent/50'}`}
                              />
                              {errors.phone && <p className="text-red-500 text-xs mt-1 ml-1">{errors.phone}</p>}
                           </div>
                           <div>
                              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 ml-1">{t.contact.label_subject}</label>
                              <select 
                                  name="subject"
                                  value={formData.subject}
                                  onChange={handleChange}
                                  className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-3 text-nesty-dark focus:outline-none focus:ring-2 focus:ring-nesty-accent/50 focus:bg-white transition cursor-pointer"
                              >
                                  <option>{t.contact.opt_estimation}</option>
                                  <option>{t.contact.opt_gestion}</option>
                                  <option>{t.contact.opt_investment}</option>
                                  <option>{t.contact.opt_conseil}</option>
                                  <option>{t.contact.opt_other}</option>
                              </select>
                           </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 ml-1">{t.contact.label_message}</label>
                            <textarea 
                              name="message"
                              value={formData.message}
                              onChange={handleChange}
                              rows={4}
                              placeholder={t.contact.ph_message}
                              required
                              className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-3 text-nesty-dark focus:outline-none focus:ring-2 focus:ring-nesty-accent/50 focus:bg-white transition resize-none"
                            ></textarea>
                        </div>

                        <button 
                          type="submit"
                          className="w-full bg-nesty-darker text-white font-bold py-4 rounded-full shadow-lg hover:bg-nesty-accent hover:text-nesty-darker transition-all duration-300 mt-4 flex items-center justify-center gap-2"
                        >
                          {t.contact.btn_send}
                        </button>
                     </form>
                   </>
                 )}
             </div>

             {/* Right: Image */}
             <div className="hidden lg:block relative h-full min-h-[600px]">
                <img 
                  src="https://images.unsplash.com/photo-1577412647305-991150c7d163?q=80&w=1932&auto=format&fit=crop" 
                  alt="Nesty Office Meeting" 
                  className="absolute inset-0 w-full h-full object-cover transform hover:scale-105 transition-transform duration-[2s]"
                />
                <div className="absolute inset-0 bg-nesty-darker/20"></div>
             </div>
          </div>
        </AnimatedSection>

        {/* Office Locations */}
        <section className="mt-24">
           <AnimatedSection>
              <div className="mb-12">
                 <h2 className="text-3xl font-bold text-nesty-dark">{t.contact.locations_title}</h2>
              </div>
           </AnimatedSection>
              
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <AnimatedSection delay={100} className="h-full">
                 <LocationCard 
                   title="Agadir Centre"
                   address="Avenue Hassan II, Agadir 80000"
                   phone="+212 690 87 97 77"
                   directionsText={t.contact.get_directions}
                 />
              </AnimatedSection>
              <AnimatedSection delay={200} className="h-full">
                 <LocationCard 
                   title="Marina Agadir"
                   address="Résidence La Marina, Quai Ouest"
                   phone="+212 525 89 90 93"
                   directionsText={t.contact.get_directions}
                 />
              </AnimatedSection>
              <AnimatedSection delay={300} className="h-full">
                 <LocationCard 
                   title="Taghazout Hub"
                   address="Route d'Essaouira, Taghazout Bay"
                   phone="+212 661 12 34 56"
                   directionsText={t.contact.get_directions}
                 />
              </AnimatedSection>
           </div>
        </section>

        {/* CTA Banner */}
        <div className="mt-20">
          <AnimatedSection delay={200}>
             <div className="bg-nesty-accent rounded-3xl p-12 md:p-20 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10">
                {/* Decorative circle */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                
                <div className="relative z-10 max-w-xl">
                   <div className="inline-block px-3 py-1 bg-nesty-darker/10 rounded-lg text-xs font-bold text-nesty-darker uppercase tracking-wide mb-4">
                      {t.nav.conseil}
                   </div>
                   <h2 className="text-3xl md:text-4xl font-bold text-nesty-darker mb-4 leading-tight">
                     {t.contact.schedule_title}
                   </h2>
                   <p className="text-nesty-darker/80 text-lg">
                     {t.contact.schedule_desc}
                   </p>
                </div>
                
                <div className="relative z-10 flex-shrink-0">
                   <Link 
                     to="/contact" 
                     className="bg-nesty-darker text-white px-8 py-4 rounded-full font-bold shadow-xl hover:bg-white hover:text-nesty-darker transition-all duration-300 flex items-center gap-2 text-lg"
                   >
                     {t.contact.schedule_btn} <ArrowRight size={20} />
                   </Link>
                </div>
             </div>
          </AnimatedSection>
        </div>

        {/* FAQ Section */}
        <section className="mt-20 pt-10 border-t border-gray-100">
            <AnimatedSection>
               <SectionHeader 
                 title={t.contact.faq_title}
                 subtitle={t.contact.faq_subtitle}
                 center={false}
               />
               
               <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                  {t.contact.faqs.map((item, idx) => (
                    <FaqItem 
                      key={idx}
                      question={item.q}
                      answer={item.a}
                    />
                  ))}
               </div>
            </AnimatedSection>
        </section>
      </div>
    </div>
  );
};

export default Contact;