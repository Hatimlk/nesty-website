import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, Bot, MapPin } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{
    role: 'user' | 'model', 
    text: string, 
    groundingChunks?: any[] 
  }[]>([
    { role: 'model', text: "Bonjour ! Je suis l'assistant virtuel Nesty. Comment puis-je vous aider concernant nos services de conciergerie ou d'investissement à Agadir ?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userLocation, setUserLocation] = useState<{latitude: number, longitude: number} | undefined>(undefined);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  // Request user location for better map grounding
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          console.debug("Geolocation denied or error:", error);
        }
      );
    }
  }, []);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      // Use import.meta.env.VITE_API_KEY for Vite compatibility
      const apiKey = import.meta.env.VITE_API_KEY;
      
      if (!apiKey) {
        throw new Error("API Key is missing. Please configure VITE_API_KEY or API_KEY in your environment.");
      }

      const ai = new GoogleGenAI({ apiKey });
      
      // Construct history for context
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      // Configure tools and location
      const config: any = {
        systemInstruction: "You are Nesty AI, a helpful and professional virtual assistant for Nesty (nesty.ma). Nesty is a premier short-term rental management and real estate investment agency in Agadir, Morocco. \n\nKey Information:\n- Services: Concierge (20% commission on revenue), Investment Support (Sourcing, Renovation, Setup), and Consulting (Training for owners).\n- Concierge Benefits: Yield management, pro photos, 24/7 guest communication, cleaning & linen, maintenance.\n- Location: Agadir (Marina, Talborjt, Sonaba, etc.).\n- Contact: contact@nesty.ma, +212 690 87 97 77.\n\nGuidelines:\n- Answer in the same language as the user (default to French if unsure).\n- Be concise, polite, and encouraging.\n- If you don't know specific details, suggest contacting the team.\n- Do not invent false property listings.",
        tools: [{ googleMaps: {} }],
      };

      // Add location context if available
      if (userLocation) {
        config.toolConfig = {
          retrievalConfig: {
            latLng: {
              latitude: userLocation.latitude,
              longitude: userLocation.longitude
            }
          }
        };
      }

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [...history, { role: 'user', parts: [{ text: userMessage }] }],
        config: config
      });

      const text = response.text;
      const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;

      if (text) {
         setMessages(prev => [...prev, { role: 'model', text: text, groundingChunks }]);
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Désolé, je rencontre des difficultés techniques (API Key manquante ou erreur réseau). Veuillez réessayer plus tard." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Toggle Button - MOVED TO LEFT */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 left-6 z-50 p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center ${isOpen ? 'bg-gray-200 text-gray-800 rotate-90' : 'bg-nesty-darker text-nesty-accent border border-nesty-accent/30'}`}
        aria-label="Open Chat"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={28} />}
      </button>

      {/* Chat Window - MOVED TO LEFT */}
      {isOpen && (
        <div className="fixed bottom-24 left-6 z-50 w-[90%] md:w-[380px] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col h-[500px] animate-fade-in-up">
          {/* Header */}
          <div className="bg-nesty-darker text-white p-4 flex items-center gap-3 shadow-md">
            <div className="bg-nesty-accent p-1.5 rounded-full text-nesty-darker">
              <Sparkles size={18} />
            </div>
            <div>
              <h3 className="font-bold text-sm">Nesty Assistant</h3>
              <p className="text-xs text-nesty-accent flex items-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> En ligne (IA)
              </p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-grow overflow-y-auto p-4 bg-slate-50 space-y-4 custom-scrollbar">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-nesty-accent text-nesty-darker rounded-tr-none' 
                    : 'bg-white border border-gray-200 text-gray-700 rounded-tl-none'
                }`}>
                  {msg.text}
                  
                  {/* Grounding Chunks (Maps) */}
                  {msg.groundingChunks && msg.groundingChunks.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3 pt-2 border-t border-gray-100/50">
                      {msg.groundingChunks.map((chunk: any, i: number) => {
                        // Handle Google Maps grounding structure
                        const mapData = chunk.maps || (chunk.web?.uri?.includes("google.com/maps") ? chunk.web : null);
                        
                        if (mapData) {
                           // Some responses put data in sourcePlace, others at root of map object
                           const uri = mapData.sourcePlace?.uri || mapData.uri;
                           const title = mapData.sourcePlace?.name || mapData.title || "Voir la carte";
                           
                           if (uri) {
                             return (
                               <a 
                                 key={i}
                                 href={uri}
                                 target="_blank"
                                 rel="noreferrer"
                                 className="inline-flex items-center gap-1.5 text-xs bg-gray-50 border border-gray-200 text-nesty-darker hover:text-nesty-accent px-2.5 py-1.5 rounded-full hover:bg-white hover:shadow-sm transition font-medium"
                               >
                                 <MapPin size={12} className="text-nesty-accent" />
                                 {title}
                               </a>
                             );
                           }
                        }
                        return null;
                      })}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 p-3 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2 text-gray-400 text-xs">
                  <Bot size={14} />
                  <span className="animate-pulse">Rédaction...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-100 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Posez votre question..."
              className="flex-grow bg-gray-50 border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-nesty-accent focus:ring-1 focus:ring-nesty-accent/50 transition"
            />
            <button 
              type="submit" 
              disabled={isLoading || !input.trim()}
              className="bg-nesty-darker text-white p-2 rounded-full hover:bg-nesty-accent hover:text-nesty-darker transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatBot;