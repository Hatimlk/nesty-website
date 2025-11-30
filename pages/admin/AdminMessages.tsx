import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Mail, Check, Trash2, Clock, CheckCircle2, Filter } from 'lucide-react';

const AdminMessages: React.FC = () => {
  const { messages, markMessageRead, deleteMessage } = useData();
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const sortedMessages = [...messages].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  const filteredMessages = filter === 'all' 
     ? sortedMessages 
     : sortedMessages.filter(m => !m.read);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
           <h1 className="text-3xl font-bold text-nesty-dark">Messagerie</h1>
           <p className="text-gray-500 mt-1">Vos échanges avec les prospects.</p>
        </div>
        
        <div className="flex bg-white p-1 rounded-xl shadow-sm border border-gray-200">
           <button 
             onClick={() => setFilter('all')}
             className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${filter === 'all' ? 'bg-nesty-darker text-white shadow' : 'text-gray-500 hover:bg-gray-50'}`}
           >
             Tous
           </button>
           <button 
             onClick={() => setFilter('unread')}
             className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${filter === 'unread' ? 'bg-nesty-darker text-white shadow' : 'text-gray-500 hover:bg-gray-50'}`}
           >
             Non lus
             {messages.filter(m => !m.read).length > 0 && (
                <span className="bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
                   {messages.filter(m => !m.read).length}
                </span>
             )}
           </button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredMessages.length === 0 ? (
          <div className="bg-white p-16 rounded-2xl border border-dashed border-gray-300 text-center">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
               <Mail size={40} />
            </div>
            <h3 className="text-xl font-bold text-gray-700 mb-2">Tout est calme</h3>
            <p className="text-gray-500">Aucun message {filter === 'unread' ? 'non lu' : ''} pour le moment.</p>
          </div>
        ) : (
          filteredMessages.map(msg => (
            <div key={msg.id} className={`bg-white rounded-2xl shadow-sm border p-6 transition-all hover:shadow-md duration-300 relative group overflow-hidden ${msg.read ? 'border-gray-100 opacity-75 hover:opacity-100' : 'border-nesty-accent/30 ring-1 ring-nesty-accent/10'}`}>
               {!msg.read && (
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-nesty-accent/20 to-transparent pointer-events-none rounded-bl-full -mr-8 -mt-8"></div>
               )}
               
               <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 mb-4">
                  <div className="flex items-start gap-4">
                     <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold uppercase flex-shrink-0 ${msg.read ? 'bg-gray-100 text-gray-500' : 'bg-nesty-darker text-nesty-accent'}`}>
                        {msg.name.charAt(0)}
                     </div>
                     <div>
                        <div className="flex items-center gap-2">
                           <h3 className="font-bold text-lg text-nesty-dark">{msg.name}</h3>
                           {!msg.read && <span className="bg-red-500 w-2 h-2 rounded-full animate-pulse"></span>}
                        </div>
                        <div className="text-sm text-gray-500 flex flex-col md:flex-row md:items-center gap-1 md:gap-3">
                           <span>{msg.email}</span>
                           <span className="hidden md:block text-gray-300">•</span>
                           <span>{msg.phone}</span>
                        </div>
                     </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-400 bg-gray-50 px-3 py-1.5 rounded-full self-start">
                     <Clock size={12} />
                     {new Date(msg.date).toLocaleDateString()} • {new Date(msg.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </div>
               </div>
               
               <div className="bg-slate-50 p-5 rounded-xl mb-6 border border-gray-100/50">
                  <p className="text-xs font-bold uppercase text-gray-400 mb-2 tracking-wider flex items-center gap-2">
                     <span className="w-1 h-4 bg-nesty-accent rounded-full"></span>
                     Sujet: {msg.subject}
                  </p>
                  <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{msg.message}</p>
               </div>

               <div className="flex justify-end gap-3 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200">
                  {!msg.read ? (
                    <button 
                      onClick={() => markMessageRead(msg.id)}
                      className="text-xs font-bold text-nesty-darker hover:text-white flex items-center gap-2 bg-nesty-accent/20 hover:bg-nesty-accent px-4 py-2 rounded-full transition-colors"
                    >
                      <Check size={14} /> Marquer comme lu
                    </button>
                  ) : (
                     <span className="text-xs font-bold text-green-600 flex items-center gap-1 bg-green-50 px-3 py-2 rounded-full cursor-default border border-green-100">
                        <CheckCircle2 size={14} /> Lu
                     </span>
                  )}
                  <button 
                    onClick={() => deleteMessage(msg.id)}
                    className="text-xs font-bold text-gray-400 hover:text-red-500 flex items-center gap-2 hover:bg-red-50 px-4 py-2 rounded-full transition-colors"
                  >
                    <Trash2 size={14} /> Supprimer
                  </button>
               </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminMessages;