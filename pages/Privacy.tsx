import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import AnimatedSection from '../components/AnimatedSection';
import SEO from '../components/SEO';

const Privacy: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="pt-24 min-h-screen bg-white">
       <SEO title={`${t.footer.privacy} - Nesty`} description="Politique de Confidentialité de Nesty SARL AU" />
       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <AnimatedSection>
            <h1 className="text-3xl md:text-4xl font-bold text-nesty-dark mb-8">{t.footer.privacy}</h1>
            
            <div className="bg-slate-50 p-8 rounded-2xl border border-gray-100 text-gray-600 space-y-8 shadow-sm">
              <section>
                 <h2 className="text-xl font-bold text-nesty-dark mb-3 flex items-center gap-2">
                    <div className="w-2 h-8 bg-nesty-accent rounded-full"></div>
                    1. Collecte de l'information
                 </h2>
                 <p className="leading-relaxed">
                   Nous recueillons des informations lorsque vous utilisez notre formulaire de contact, lorsque vous nous appelez ou lorsque vous visitez notre site. Les informations recueillies incluent votre nom, votre adresse e-mail, votre numéro de téléphone, et toute autre information que vous choisissez de nous communiquer.
                 </p>
              </section>

              <section>
                 <h2 className="text-xl font-bold text-nesty-dark mb-3 flex items-center gap-2">
                    <div className="w-2 h-8 bg-nesty-accent rounded-full"></div>
                    2. Utilisation des informations
                 </h2>
                 <p className="leading-relaxed mb-2">
                   Toutes les informations que nous recueillons auprès de vous peuvent être utilisées pour :
                 </p>
                 <ul className="list-disc pl-5 space-y-1">
                    <li>Personnaliser votre expérience et répondre à vos besoins individuels</li>
                    <li>Fournir un contenu publicitaire personnalisé</li>
                    <li>Améliorer notre site Web</li>
                    <li>Améliorer le service client et vos besoins de prise en charge</li>
                    <li>Vous contacter par e-mail ou téléphone</li>
                 </ul>
              </section>

              <section>
                 <h2 className="text-xl font-bold text-nesty-dark mb-3 flex items-center gap-2">
                    <div className="w-2 h-8 bg-nesty-accent rounded-full"></div>
                    3. Confidentialité du commerce en ligne
                 </h2>
                 <p className="leading-relaxed">
                   Nous sommes les seuls propriétaires des informations recueillies sur ce site. Vos informations personnelles ne seront pas vendues, échangées, transférées, ou données à une autre société pour n'importe quelle raison, sans votre consentement, en dehors de ce qui est nécessaire pour répondre à une demande et / ou une transaction, comme par exemple pour expédier une commande.
                 </p>
              </section>

              <section>
                 <h2 className="text-xl font-bold text-nesty-dark mb-3 flex items-center gap-2">
                    <div className="w-2 h-8 bg-nesty-accent rounded-full"></div>
                    4. Divulgation à des tiers
                 </h2>
                 <p className="leading-relaxed">
                   Nous ne vendons, n'échangeons et ne transférons pas vos informations personnelles identifiables à des tiers. Cela ne comprend pas les tierce parties de confiance qui nous aident à exploiter notre site Web ou à mener nos affaires, tant que ces parties conviennent de garder ces informations confidentielles.
                 </p>
              </section>

              <section>
                 <h2 className="text-xl font-bold text-nesty-dark mb-3 flex items-center gap-2">
                    <div className="w-2 h-8 bg-nesty-accent rounded-full"></div>
                    5. Protection des informations
                 </h2>
                 <p className="leading-relaxed">
                   Nous mettons en œuvre une variété de mesures de sécurité pour préserver la sécurité de vos informations personnelles. Nous utilisons un cryptage à la pointe de la technologie pour protéger les informations sensibles transmises en ligne. Nous protégeons également vos informations hors ligne.
                 </p>
              </section>

              <section>
                 <h2 className="text-xl font-bold text-nesty-dark mb-3 flex items-center gap-2">
                    <div className="w-2 h-8 bg-nesty-accent rounded-full"></div>
                    6. Consentement
                 </h2>
                 <p className="leading-relaxed">
                   En utilisant notre site, vous consentez à notre politique de confidentialité.
                 </p>
              </section>
            </div>
          </AnimatedSection>
       </div>
    </div>
  );
};

export default Privacy;