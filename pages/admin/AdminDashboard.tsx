import React from 'react';
import { useData } from '../../context/DataContext';
import { Home, MessageSquare, TrendingUp, Users, ArrowUpRight, DollarSign, Activity, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const StatCard = ({ title, value, icon: Icon, color, trend }: any) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-lg transition-shadow duration-300">
    <div className="flex items-center gap-4">
      <div className={`p-4 rounded-xl ${color} text-white shadow-md`}>
        <Icon size={24} />
      </div>
      <div>
        <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">{title}</h3>
        <p className="text-2xl font-bold text-nesty-dark">{value}</p>
      </div>
    </div>
    {trend && (
      <div className="flex flex-col items-end">
         <span className="text-green-500 text-xs font-bold bg-green-50 px-2 py-1 rounded-full flex items-center gap-1">
            <TrendingUp size={12} /> {trend}
         </span>
         <span className="text-gray-300 text-[10px] mt-1">vs mois dernier</span>
      </div>
    )}
  </div>
);

const AdminDashboard: React.FC = () => {
  const { properties, messages } = useData();
  const unreadMessages = messages.filter(m => !m.read).length;

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
           <h1 className="text-3xl font-bold text-nesty-dark">Bonjour, Admin 👋</h1>
           <p className="text-gray-500">Voici un aperçu de vos performances aujourd'hui.</p>
        </div>
        <div className="flex gap-3">
           <Link to="/admin/properties" className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-50 transition">
             Gérer Propriétés
           </Link>
           <Link to="/admin/messages" className="px-4 py-2 bg-nesty-darker text-white rounded-lg text-sm font-bold hover:bg-nesty-accent hover:text-nesty-darker transition shadow-lg">
             Voir Messages
           </Link>
        </div>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Propriétés" 
          value={properties.length} 
          icon={Home} 
          color="bg-blue-500"
          trend="+12%"
        />
        <StatCard 
          title="Messages" 
          value={messages.length} 
          icon={MessageSquare} 
          color="bg-purple-500" 
          trend="+5%"
        />
        <StatCard 
          title="Non Lus" 
          value={unreadMessages} 
          icon={Activity} 
          color="bg-red-500" 
        />
        <StatCard 
          title="Revenu Est." 
          value="450k" 
          icon={DollarSign} 
          color="bg-nesty-accent" 
          trend="+8%"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Analytics & Quick View */}
        <div className="lg:col-span-2 space-y-8">
           {/* Revenue Chart Mockup */}
           <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                 <h3 className="text-lg font-bold text-nesty-dark">Revenus Mensuels</h3>
                 <select className="text-xs bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 outline-none text-gray-500">
                    <option>Cette année</option>
                    <option>L'année dernière</option>
                 </select>
              </div>
              <div className="h-64 flex items-end justify-between gap-2 px-2">
                 {[40, 65, 45, 70, 85, 60, 75, 90, 55, 80, 95, 100].map((h, i) => (
                    <div key={i} className="w-full bg-slate-100 rounded-t-lg relative group overflow-hidden">
                       <div className="absolute bottom-0 w-full bg-nesty-accent opacity-80 group-hover:opacity-100 transition-all duration-500 rounded-t-lg" style={{ height: `${h}%` }}></div>
                       {/* Tooltip */}
                       <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-nesty-darker text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                          {h}k
                       </div>
                    </div>
                 ))}
              </div>
              <div className="flex justify-between mt-4 text-xs text-gray-400 font-bold uppercase">
                 {['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'].map((m, i) => (
                    <span key={i}>{m}</span>
                 ))}
              </div>
           </div>

           {/* Properties Summary */}
           <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
               <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-nesty-dark">Biens Populaires</h3>
                  <Link to="/admin/properties" className="text-xs font-bold text-nesty-accent hover:underline flex items-center gap-1">
                     Tout voir <ArrowUpRight size={12} />
                  </Link>
               </div>
               <div className="space-y-4">
                  {properties.slice(0, 3).map(prop => (
                     <div key={prop.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition border border-transparent hover:border-slate-100">
                        <img src={prop.image} alt={prop.title} className="w-12 h-12 rounded-lg object-cover" />
                        <div className="flex-grow">
                           <h4 className="font-bold text-nesty-dark text-sm">{prop.title}</h4>
                           <p className="text-xs text-gray-500">{prop.location}</p>
                        </div>
                        <div className="text-right">
                           <p className="font-bold text-nesty-accent text-sm">{prop.displayPrice}</p>
                           <p className="text-[10px] text-green-500 font-bold bg-green-50 px-2 py-0.5 rounded-full inline-block mt-1">Actif</p>
                        </div>
                     </div>
                  ))}
               </div>
           </div>
        </div>

        {/* Right Column: Messages & Activity */}
        <div className="space-y-8">
           {/* Recent Messages */}
           <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                 <h3 className="text-lg font-bold text-nesty-dark">Messages</h3>
                 <span className="text-xs font-bold bg-red-100 text-red-500 px-2 py-1 rounded-full">{unreadMessages} nouveaux</span>
              </div>
              {messages.length === 0 ? (
                <p className="text-gray-400 text-center py-8 text-sm">Aucun message</p>
              ) : (
                <div className="space-y-3">
                   {messages.slice(0, 5).map(msg => (
                     <div key={msg.id} className={`p-3 rounded-xl border transition ${msg.read ? 'border-gray-50 bg-gray-50/50' : 'border-l-4 border-l-nesty-accent border-gray-100 bg-white shadow-sm'}`}>
                        <div className="flex justify-between items-start mb-1">
                           <p className="font-bold text-nesty-dark text-sm">{msg.name}</p>
                           <span className="text-[10px] text-gray-400">{new Date(msg.date).toLocaleDateString()}</span>
                        </div>
                        <p className="text-xs text-gray-500 truncate">{msg.subject}</p>
                     </div>
                   ))}
                </div>
              )}
              <Link to="/admin/messages" className="block text-center mt-6 text-sm font-bold text-gray-500 hover:text-nesty-accent transition">
                 Voir tous les messages
              </Link>
           </div>

           {/* Activity Feed (Mock) */}
           <div className="bg-nesty-darker text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-nesty-accent rounded-full blur-3xl opacity-10 -mr-10 -mt-10"></div>
               <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Activity size={18} className="text-nesty-accent" /> Activité Récente
               </h3>
               <div className="space-y-6 relative z-10">
                  <div className="flex gap-3">
                     <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center flex-shrink-0">
                        <Home size={14} />
                     </div>
                     <div>
                        <p className="text-sm font-medium">Nouveau bien ajouté</p>
                        <p className="text-xs text-gray-400 mt-1">Il y a 2 heures • "Villa Sonaba"</p>
                     </div>
                  </div>
                  <div className="flex gap-3">
                     <div className="w-8 h-8 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center flex-shrink-0">
                        <DollarSign size={14} />
                     </div>
                     <div>
                        <p className="text-sm font-medium">Revenu confirmé</p>
                        <p className="text-xs text-gray-400 mt-1">Il y a 5 heures • +12,500 MAD</p>
                     </div>
                  </div>
                  <div className="flex gap-3">
                     <div className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center flex-shrink-0">
                        <Calendar size={14} />
                     </div>
                     <div>
                        <p className="text-sm font-medium">Booking reçu</p>
                        <p className="text-xs text-gray-400 mt-1">Hier • Appartement Marina</p>
                     </div>
                  </div>
               </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;