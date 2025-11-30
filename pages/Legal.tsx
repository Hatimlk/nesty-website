import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import AnimatedSection from '../components/AnimatedSection';
import SEO from '../components/SEO';

const Legal: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="pt-24 min-h-screen bg-white">
       <SEO title={`${t.footer.legal} - Nesty`} description="Mentions Légales de Nesty SARL AU" />
       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <AnimatedSection>
            <h1 className="text-3xl md:text-4xl font-bold text-nesty-dark mb-8">{t.footer.legal}</h1>
            
            <div className="bg-slate-50 p-8 rounded-2xl border border-gray-100 text-gray-600 space-y-8 shadow-sm">
              <section>
                 <h2 className="text-xl font-bold text-nesty-dark mb-3 flex items-center gap-2">
                    <div className="w-2 h-8 bg-nesty-accent rounded-full"></div>
                    1. Éditeur du site
                 </h2>
                 <p className="leading-relaxed">
                   Le présent site est la propriété de la société <strong>Nesty SARL AU</strong>.<br/>
                   <strong>Siège social :</strong> Avenue Hassan II, Agadir 80000, Maroc.<br/>
                   <strong>Email :</strong> contact@nesty.ma<br/>
                   <strong>Téléphone :</strong> +212 690 87 97 77
                 </p>
              </section>

              <section>
                 <h2 className="text-xl font-bold text-nesty-dark mb-3 flex items-center gap-2">
                    <div className="w-2 h-8 bg-nesty-accent rounded-full"></div>
                    2. Hébergement
                 </h2>
                 <p className="leading-relaxed">
                   Ce site est hébergé sur une infrastructure sécurisée garantissant la protection des données.
                 </p>
              </section>

              <section>
                 <h2 className="text-xl font-bold text-nesty-dark mb-3 flex items-center gap-2">
                    <div className="w-2 h-8 bg-nesty-accent rounded-full"></div>
                    3. Propriété intellectuelle
                 </h2>
                 <p className="leading-relaxed">
                   L'ensemble de ce site relève de la législation marocaine et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
                 </p>
                 <p className="mt-4 leading-relaxed">
                   La reproduction de tout ou partie de ce site sur un support électronique quel qu'il soit est formellement interdite sauf autorisation expresse du directeur de la publication.
                 </p>
              </section>

              <section>
                 <h2 className="text-xl font-bold text-nesty-dark mb-3 flex items-center gap-2">
                    <div className="w-2 h-8 bg-nesty-accent rounded-full"></div>
                    4. Protection des données personnelles
                 </h2>
                 <p className="leading-relaxed">
                   Conformément à la loi 09-08 relative à la protection des personnes physiques à l'égard du traitement des données à caractère personnel, vous disposez d'un droit d'accès et de rectification aux informations qui vous concernent.
                 </p>
              </section>
            </div>
          </AnimatedSection>
       </div>
    </div>
  );
};

export default Legal;