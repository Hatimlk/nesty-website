import React, { useState } from 'react';
import { useData } from '@/context/DataContext';
import { Mail, Check, Trash2, Clock, CheckCircle2, Filter, Search, MoreVertical, Archive } from 'lucide-react';

const AdminMessages: React.FC = () => {
   const { messages, markMessageRead, deleteMessage, isLoading } = useData();
   const [filter, setFilter] = useState<'all' | 'unread'>('all');
   const [searchTerm, setSearchTerm] = useState('');

   if (isLoading) {
      return (
         <div className="flex items-center justify-center min-h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-nesty-accent"></div>
         </div>
      );
   }

   const sortedMessages = [...messages].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

   const filteredMessages = sortedMessages.filter(m => {
      const matchesFilter = filter === 'all' || !m.read;
      const matchesSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
         m.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
         m.email.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesFilter && matchesSearch;
   });

   return (
      <div className="pb-10">
         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
            <div>
               <h1 className="text-3xl font-bold text-nesty-dark tracking-tight">Messagerie</h1>
               <div className="flex items-center gap-2 text-gray-500 mt-1">
                  <span className="bg-gray-200 text-xs font-bold px-2 py-0.5 rounded text-gray-600">{messages.length}</span>
                  <span>messages au total sur le site</span>
               </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
               <div className="relative group">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-nesty-accent transition-colors" size={18} />
                  <input
                     type="text"
                     placeholder="Rechercher un message..."
                     className="pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-nesty-accent/50 focus:border-nesty-accent w-full sm:w-64 transition-all shadow-sm"
                     value={searchTerm}
                     onChange={(e) => setSearchTerm(e.target.value)}
                  />
               </div>

               <div className="flex bg-white p-1 rounded-xl shadow-sm border border-gray-200">
                  <button
                     onClick={() => setFilter('all')}
                     className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${filter === 'all' ? 'bg-nesty-darker text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
                  >
                     Tous
                  </button>
                  <button
                     onClick={() => setFilter('unread')}
                     className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${filter === 'unread' ? 'bg-nesty-darker text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
                  >
                     Non lus
                     {messages.filter(m => !m.read).length > 0 && (
                        <span className={`text-[10px] w-5 h-5 flex items-center justify-center rounded-full ${filter === 'unread' ? 'bg-white text-nesty-darker' : 'bg-red-500 text-white'}`}>
                           {messages.filter(m => !m.read).length}
                        </span>
                     )}
                  </button>
               </div>
            </div>
         </div>

         <div className="space-y-4">
            {filteredMessages.length === 0 ? (
               <div className="bg-white p-20 rounded-3xl border border-dashed border-gray-300 text-center shadow-sm">
                  <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300 animate-pulse">
                     <Mail size={48} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-700 mb-2">Aucun message trouvé</h3>
                  <p className="text-gray-500 max-w-md mx-auto">Votre boîte de réception est vide pour cette sélection. Les nouveaux messages apparaîtront ici.</p>
                  {filter !== 'all' && (
                     <button onClick={() => setFilter('all')} className="mt-6 text-nesty-accent font-bold hover:underline">
                        Voir tous les messages
                     </button>
                  )}
               </div>
            ) : (
               <div className="grid gap-4">
                  {filteredMessages.map(msg => (
                     <div
                        key={msg.id}
                        className={`bg-white rounded-2xl shadow-sm border transition-all duration-300 hover:shadow-lg relative group ${msg.read ? 'border-gray-100 opacity-80 hover:opacity-100' : 'border-nesty-accent/30 ring-1 ring-nesty-accent/10 shadow-md'}`}
                     >
                        {/* New Indicator */}
                        {!msg.read && (
                           <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full ring-2 ring-white z-10"></div>
                        )}

                        <div className="p-6 md:p-8 flex flex-col lg:flex-row gap-6">
                           {/* Avatar & Sender Info */}
                           <div className="flex items-start gap-5 lg:w-1/4 min-w-[200px]">
                              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-bold uppercase flex-shrink-0 shadow-sm ${msg.read ? 'bg-gray-100 text-gray-500' : 'bg-gradient-to-br from-nesty-darker to-gray-800 text-nesty-accent'}`}>
                                 {msg.name.charAt(0)}
                              </div>
                              <div className="flex-grow min-w-0">
                                 <h3 className={`font-bold text-lg truncate ${msg.read ? 'text-gray-700' : 'text-nesty-dark'}`}>{msg.name}</h3>
                                 <p className="text-xs text-gray-500 truncate mb-1">{msg.email}</p>
                                 <p className="text-xs text-gray-400">{msg.phone}</p>
                              </div>
                           </div>

                           {/* Message Content */}
                           <div className="flex-grow border-l border-gray-100 pl-0 lg:pl-6 pt-4 lg:pt-0 border-t lg:border-t-0 mt-2 lg:mt-0">
                              <div className="flex justify-between items-start mb-3">
                                 <h4 className={`text-base font-bold ${msg.read ? 'text-gray-600' : 'text-nesty-dark flex items-center gap-2'}`}>
                                    {msg.subject}
                                    {!msg.read && <span className="bg-nesty-accent/10 text-nesty-accent text-[10px] uppercase tracking-wider px-2 py-0.5 rounded font-bold">Nouveau</span>}
                                 </h4>
                                 <div className="flex items-center gap-2 text-xs font-medium text-gray-400 whitespace-nowrap bg-gray-50 px-3 py-1 rounded-full">
                                    <Clock size={12} />
                                    {new Date(msg.date).toLocaleDateString()}
                                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                    {new Date(msg.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                 </div>
                              </div>

                              <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap font-medium">{msg.message}</p>
                           </div>

                           {/* Actions */}
                           <div className="flex lg:flex-col justify-end lg:justify-start gap-2 lg:pl-6 lg:border-l lg:border-gray-100 pt-4 lg:pt-0 border-t lg:border-t-0 mt-2 lg:mt-0 transition-opacity">
                              {!msg.read ? (
                                 <button
                                    onClick={() => markMessageRead(msg.id)}
                                    className="p-2 text-nesty-darker bg-white border border-gray-200 hover:border-nesty-accent hover:bg-nesty-accent hover:text-white rounded-xl transition-all shadow-sm group/btn"
                                    title="Marquer comme lu"
                                 >
                                    <Check size={18} />
                                 </button>
                              ) : (
                                 <div className="p-2 text-green-500 bg-green-50 rounded-xl cursor-default" title="Déjà lu">
                                    <CheckCircle2 size={18} />
                                 </div>
                              )}
                              <button
                                 onClick={() => deleteMessage(msg.id)}
                                 className="p-2 text-gray-400 bg-white border border-gray-200 hover:border-red-200 hover:bg-red-50 hover:text-red-500 rounded-xl transition-all shadow-sm"
                                 title="Supprimer"
                              >
                                 <Trash2 size={18} />
                              </button>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            )}
         </div>
      </div>
   );
};

export default AdminMessages;