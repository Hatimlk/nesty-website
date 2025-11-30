import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Property, Testimonial, Message } from '../types';

// Initial Mock Data
const INITIAL_PROPERTIES: Property[] = [
  {
    id: 1,
    image: "https://picsum.photos/id/164/800/600",
    images: ["https://picsum.photos/id/164/800/600", "https://picsum.photos/id/165/800/600", "https://picsum.photos/id/166/800/600"],
    title: "Appartement Vue Mer",
    location: "Marina Agadir",
    type: "Apartment",
    rawPrice: 2800000,
    displayPrice: "2 800 000 MAD",
    specs: { surface: "95 m²", rooms: 2, roi: "~8% Rentabilité", roomsDisplay: "2 Chambres" },
    amenities: ['wifi', 'ac', 'pool', 'parking'],
    description: "Superbe appartement situé en plein cœur de la Marina d'Agadir. Offrant une vue imprenable sur l'océan et le port de plaisance, ce bien est idéal pour la location courte durée haut de gamme.\n\nEntièrement rénové avec des matériaux de qualité, il dispose d'un grand salon lumineux, d'une cuisine équipée, de deux chambres spacieuses et d'une terrasse aménagée.\n\nUn investissement clé en main avec un fort potentiel locatif et une demande constante toute l'année."
  },
  {
    id: 2,
    image: "https://picsum.photos/id/249/800/600",
    images: ["https://picsum.photos/id/249/800/600", "https://picsum.photos/id/250/800/600", "https://picsum.photos/id/251/800/600"],
    title: "Studio Centre Ville",
    location: "Talborjt, Agadir",
    type: "Studio",
    rawPrice: 850000,
    displayPrice: "850 000 MAD",
    specs: { surface: "45 m²", rooms: 1, roi: "~10% Rentabilité", roomsDisplay: "1 Chambre" },
    amenities: ['wifi', 'tv', 'ac'],
    description: "Charmant studio moderne situé dans le quartier historique de Talborjt. À proximité des commerces, restaurants et attractions locales.\n\nIdéal pour les couples ou les voyageurs d'affaires, ce studio a été optimisé pour offrir un confort maximal dans un espace compact.\n\nExcellente rentabilité locative grâce à sa position centrale et son prix attractif."
  },
  {
    id: 3,
    image: "https://picsum.photos/id/188/800/600",
    images: ["https://picsum.photos/id/188/800/600", "https://picsum.photos/id/190/800/600", "https://picsum.photos/id/190/800/600"],
    title: "Villa avec Piscine",
    location: "Sonaba, Agadir",
    type: "Villa",
    rawPrice: 4500000,
    displayPrice: "4 500 000 MAD",
    specs: { surface: "300 m²", rooms: 4, roi: "~7% Rentabilité", roomsDisplay: "4 Chambres" },
    amenities: ['wifi', 'pool', 'parking', 'ac', 'tv'],
    description: "Magnifique villa moderne dans le quartier résidentiel de Sonaba.\n\nElle se compose de 4 suites parentales, d'un vaste séjour ouvert sur le jardin et la piscine privée chauffée.\n\nFinitions de luxe, climatisation centralisée, cuisine américaine.\n\nUn produit rare sur le marché, parfait pour les familles en vacances cherchant intimité et confort."
  },
  {
    id: 4,
    image: "https://picsum.photos/id/49/800/600",
    images: ["https://picsum.photos/id/49/800/600", "https://picsum.photos/id/54/800/600", "https://picsum.photos/id/60/800/600"],
    title: "Penthouse Panoramique",
    location: "Founty, Agadir",
    type: "Apartment",
    rawPrice: 3200000,
    displayPrice: "3 200 000 MAD",
    specs: { surface: "120 m²", rooms: 3, roi: "~9% Rentabilité", roomsDisplay: "3 Chambres" },
    amenities: ['wifi', 'ac', 'parking', 'tv'],
    description: "Penthouse d'exception avec terrasse panoramique de 40m².\n\nSitué dans le quartier prisé de Founty, proche de la plage et des zones touristiques. Ce bien offre des prestations haut de gamme avec marbre au sol et cuisine italienne.\n\nLe bien est vendu meublé et équipé, prêt à la location immédiate."
  }
];

const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Sophie Martin",
    role: "Propriétaire - Villa Agadir",
    content: "Depuis que j'ai confié ma villa à Nesty, mes revenus ont augmenté de 40%. Je n'ai plus à me soucier du ménage ou des clés. Un vrai soulagement !",
    image: "https://picsum.photos/id/1011/150/150",
    rating: 5
  },
  {
    id: 2,
    name: "Karim Benjelloun",
    role: "Investisseur - Appartements Marina",
    content: "L'équipe est très professionnelle. Le système de tarification dynamique fonctionne à merveille. Mes appartements sont quasi complets toute l'année.",
    image: "https://picsum.photos/id/1005/150/150",
    rating: 5
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    role: "Propriétaire - Riad",
    content: "Une transparence totale sur les chiffres et une communication impeccable. Je recommande vivement Nesty pour tout propriétaire à Agadir.",
    image: "https://picsum.photos/id/1027/150/150",
    rating: 4
  }
];

interface DataContextType {
  properties: Property[];
  testimonials: Testimonial[];
  messages: Message[];
  addProperty: (property: Property) => void;
  updateProperty: (id: number, property: Property) => void;
  deleteProperty: (id: number) => void;
  addMessage: (message: Omit<Message, 'id' | 'date' | 'read'>) => void;
  markMessageRead: (id: number) => void;
  deleteMessage: (id: number) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [properties, setProperties] = useState<Property[]>(() => {
    const saved = localStorage.getItem('nesty_properties');
    return saved ? JSON.parse(saved) : INITIAL_PROPERTIES;
  });

  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    const saved = localStorage.getItem('nesty_testimonials');
    return saved ? JSON.parse(saved) : INITIAL_TESTIMONIALS;
  });

  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('nesty_messages');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('nesty_properties', JSON.stringify(properties));
  }, [properties]);

  useEffect(() => {
    localStorage.setItem('nesty_testimonials', JSON.stringify(testimonials));
  }, [testimonials]);

  useEffect(() => {
    localStorage.setItem('nesty_messages', JSON.stringify(messages));
  }, [messages]);

  const addProperty = (property: Property) => {
    setProperties([...properties, { ...property, id: Date.now() }]);
  };

  const updateProperty = (id: number, updatedProperty: Property) => {
    setProperties(properties.map(p => p.id === id ? updatedProperty : p));
  };

  const deleteProperty = (id: number) => {
    setProperties(properties.filter(p => p.id !== id));
  };

  const addMessage = (msg: Omit<Message, 'id' | 'date' | 'read'>) => {
    const newMessage: Message = {
      ...msg,
      id: Date.now(),
      date: new Date().toISOString(),
      read: false
    };
    setMessages([newMessage, ...messages]);
  };

  const markMessageRead = (id: number) => {
    setMessages(messages.map(m => m.id === id ? { ...m, read: true } : m));
  };

  const deleteMessage = (id: number) => {
    setMessages(messages.filter(m => m.id !== id));
  };

  return (
    <DataContext.Provider value={{ 
      properties, 
      testimonials, 
      messages,
      addProperty, 
      updateProperty, 
      deleteProperty,
      addMessage,
      markMessageRead,
      deleteMessage
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};