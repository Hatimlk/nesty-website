import React from 'react';
import { useData } from '@/context/DataContext';
import { Home, MessageSquare, TrendingUp, Users, ArrowUpRight, DollarSign, Activity, Calendar, PlusCircle, BellRing } from 'lucide-react';
import { Link } from 'react-router-dom';

interface StatCardProps {
   title: string;
   value: string | number;
   icon: React.ElementType;
   color: 'blue' | 'purple' | 'red' | 'teal';
   trend?: string;
   trendUp?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, color, trend, trendUp = true }) => {
   const colorStyles = {
      blue: { bg: 'bg-blue-50', text: 'text-blue-600', iconBg: 'bg-blue-500' },
      purple: { bg: 'bg-purple-50', text: 'text-purple-600', iconBg: 'bg-purple-500' },
      red: { bg: 'bg-red-50', text: 'text-red-500', iconBg: 'bg-red-500' },
      teal: { bg: 'bg-teal-50', text: 'text-teal-600', iconBg: 'bg-nesty-accent' },
   };

   const style = colorStyles[color];

   return (
      <div className="bg-white p-6 rounded-3xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] border border-gray-100 flex items-center justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
         <div className="flex items-center gap-5">
            <div className={`p-4 rounded-2xl ${style.iconBg} text-white shadow-lg shadow-${color}-200 group-hover:scale-110 transition-transform duration-300`}>
               <Icon size={26} strokeWidth={2.5} />
            </div>
            <div>
               <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1.5">{title}</h3>
               <p className="text-3xl font-extrabold text-nesty-dark font-display">{value}</p>
            </div>
         </div>
         {trend && (
            <div className="flex flex-col items-end">
               <span className={`${trendUp ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'} text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5`}>
                  <TrendingUp size={14} className={!trendUp ? 'rotate-180' : ''} /> {trend}
               </span>
               <span className="text-gray-300 text-[10px] mt-1.5 font-medium">vs mois dernier</span>
            </div>
         )}
      </div>
   );
};

const AdminDashboard: React.FC = () => {
   const { properties, messages } = useData();
   const unreadMessages = messages.filter(m => !m.read).length;

   // Mock Chart Data
   const chartData = [45, 65, 45, 75, 90, 60, 80, 95, 65, 85, 95, 100];
   const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];

   return (
      <div className=" pb-10">
         {/* Welcome Header */}
         <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
            <div>
               <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-4xl font-extrabold text-nesty-dark tracking-tight">Bonjour, Admin</h1>
                  <span className="text-3xl animate-wave">👋</span>
               </div>
               <p className="text-gray-500 text-lg font-medium">Voici ce qu'il se passe sur votre portefeuille aujourd'hui.</p>
            </div>

            <div className="flex gap-4">
               <Link to="/admin/properties" className="px-5 py-3 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-nesty-dark transition-all flex items-center gap-2 shadow-sm">
                  <PlusCircle size={18} /> Gérer Propriétés
               </Link>
               <Link to="/admin/messages" className="px-5 py-3 bg-nesty-darker text-white rounded-xl text-sm font-bold hover:bg-nesty-accent hover:text-nesty-darker transition-all shadow-lg shadow-nesty-darker/20 flex items-center gap-2 group">
                  <MessageSquare size={18} className="group-hover:animate-bounce" />
                  Voir Messages
                  {unreadMessages > 0 && <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">{unreadMessages}</span>}
               </Link>
            </div>
         </div>

         {/* Stats Grid */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <StatCard
               title="Total Propriétés"
               value={properties.length}
               icon={Home}
               color="blue"
               trend="+12%"
            />
            <StatCard
               title="Messages Reçus"
               value={messages.length}
               icon={MessageSquare}
               color="purple"
               trend="+5%"
            />
            <StatCard
               title="À Traiter"
               value={unreadMessages}
               icon={BellRing}
               color="red"
               trend={unreadMessages > 5 ? "Action requise" : undefined}
               trendUp={false}
            />
            <StatCard
               title="CA Estimé (YTD)"
               value="450k"
               icon={DollarSign}
               color="teal"
               trend="+24%"
            />
         </div>

         <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Left Column: Analytics & Quick View */}
            <div className="xl:col-span-2 space-y-8">

               {/* Revenue Chart */}
               <div className="bg-white p-8 rounded-3xl shadow-[0_2px_20px_-5px_rgba(0,0,0,0.05)] border border-gray-100">
                  <div className="flex justify-between items-center mb-8">
                     <div>
                        <h3 className="text-xl font-bold text-nesty-dark mb-1">Performance Financière</h3>
                        <p className="text-sm text-gray-400 font-medium">Revenus locatifs mensuels</p>
                     </div>
                     <select className="text-sm font-bold bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 outline-none text-gray-600 hover:border-gray-300 transition cursor-pointer">
                        <option>Cette année (2025)</option>
                        <option>L'année dernière (2024)</option>
                     </select>
                  </div>

                  <div className="h-72 flex items-end justify-between gap-3 sm:gap-4 px-2">
                     {chartData.map((h, i) => (
                        <div key={i} className="w-full flex flex-col items-center gap-3 group cursor-pointer">
                           <div className="w-full relative h-64 bg-gray-100/50 rounded-2xl overflow-hidden flex items-end transition-all duration-300 group-hover:bg-gray-100">
                              <div
                                 className="w-full bg-gradient-to-t from-nesty-accent to-teal-300 opacity-80 group-hover:opacity-100 transition-all duration-500 rounded-t-lg relative group-hover:shadow-[0_0_20px_rgba(45,212,191,0.5)]"
                                 style={{ height: `${h}%` }}
                              ></div>
                           </div>
                           <span className="text-xs font-bold text-gray-400 group-hover:text-nesty-dark transition-colors uppercase">{months[i]}</span>

                           {/* Floating Tooltip */}
                           <div className="absolute opacity-0 group-hover:opacity-100 -mt-12 transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 bg-nesty-darker text-white text-xs font-bold py-1.5 px-3 rounded-lg pointer-events-none shadow-xl z-20 whitespace-nowrap">
                              {h * 1.5}k MAD
                              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1 w-2 h-2 bg-nesty-darker rotate-45"></div>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>

               {/* Top Properties */}
               <div className="bg-white p-8 rounded-3xl shadow-[0_2px_20px_-5px_rgba(0,0,0,0.05)] border border-gray-100">
                  <div className="flex justify-between items-center mb-8">
                     <div>
                        <h3 className="text-xl font-bold text-nesty-dark mb-1">Nos Meilleurs Biens</h3>
                        <p className="text-sm text-gray-400 font-medium">Top performances du mois</p>
                     </div>
                     <Link to="/admin/properties" className="text-sm font-bold text-nesty-accent hover:text-nesty-dark transition flex items-center gap-1 group">
                        Voir tout <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                     </Link>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                     {properties.slice(0, 3).map((prop, idx) => (
                        <div key={prop.id} className="group cursor-pointer">
                           <div className="relative h-48 rounded-2xl overflow-hidden mb-4 shadow-md group-hover:shadow-xl transition-all duration-300">
                              <img src={prop.image} alt={prop.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-nesty-darker shadow-sm">
                                 Top #{idx + 1}
                              </div>
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                              <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end text-white">
                                 <div>
                                    <p className="text-xs font-medium opacity-90 mb-0.5">{prop.location}</p>
                                    <h4 className="font-bold text-lg leading-tight">{prop.title}</h4>
                                 </div>
                              </div>
                           </div>
                           <div className="flex justify-between items-center px-1">
                              <div>
                                 <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Prix Actuel</p>
                                 <p className="text-nesty-dark font-bold">{prop.displayPrice}</p>
                              </div>
                              <div className="text-right">
                                 <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">État</p>
                                 <span className="text-green-600 bg-green-50 px-2 py-0.5 rounded-md text-xs font-bold">Loué</span>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>

            {/* Right Column: Messages & Activity */}
            <div className="space-y-8">

               {/* Messages Widget */}
               <div className="bg-white p-8 rounded-3xl shadow-[0_2px_20px_-5px_rgba(0,0,0,0.05)] border border-gray-100">
                  <div className="flex justify-between items-center mb-6">
                     <h3 className="text-xl font-bold text-nesty-dark">Derniers Messages</h3>
                     <span className="text-xs font-bold bg-nesty-darker text-white px-2.5 py-1 rounded-full shadow-lg shadow-nesty-darker/20">{unreadMessages} nouveaux</span>
                  </div>

                  <div className="space-y-4">
                     {messages.length === 0 ? (
                        <div className="text-center py-10 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                           <MessageSquare className="mx-auto text-gray-300 mb-2" size={32} />
                           <p className="text-gray-400 text-sm font-medium">Boîte de réception vide</p>
                        </div>
                     ) : (
                        messages.slice(0, 4).map(msg => (
                           <div key={msg.id} className={`p-4 rounded-2xl transition-all hover:bg-gray-50 cursor-pointer group border ${msg.read ? 'border-transparent bg-white' : 'border-nesty-accent/30 bg-nesty-accent/5'}`}>
                              <div className="flex justify-between items-start mb-2">
                                 <div className="flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${msg.read ? 'bg-gray-100 text-gray-500' : 'bg-nesty-darker text-white'}`}>
                                       {msg.name.charAt(0)}
                                    </div>
                                    <div>
                                       <h5 className="font-bold text-nesty-dark text-sm leading-none">{msg.name}</h5>
                                       <span className="text-[10px] text-gray-400">{new Date(msg.date).toLocaleDateString()}</span>
                                    </div>
                                 </div>
                                 {!msg.read && <div className="w-2 h-2 bg-red-500 rounded-full"></div>}
                              </div>
                              <p className="text-xs text-gray-500 line-clamp-2 pl-11 group-hover:text-gray-700 transition-colors">{msg.message}</p>
                           </div>
                        ))
                     )}
                  </div>
                  <Link to="/admin/messages" className="block text-center mt-6 py-3 rounded-xl text-sm font-bold text-gray-500 hover:text-nesty-dark hover:bg-gray-50 transition border border-transparent hover:border-gray-200">
                     Ouvrir la messagerie
                  </Link>
               </div>

               {/* Activity Timeline */}
               <div className="bg-nesty-darker text-white p-8 rounded-3xl shadow-2xl relative overflow-hidden">
                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-nesty-accent rounded-full blur-[100px] opacity-10 -mr-20 -mt-20"></div>
                  <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-500 rounded-full blur-[80px] opacity-10"></div>

                  <h3 className="text-xl font-bold mb-8 flex items-center gap-3 relative z-10">
                     <span className="p-2 bg-white/10 rounded-lg"><Activity size={20} className="text-nesty-accent" /></span>
                     Activité Récente
                  </h3>

                  <div className="relative z-10 space-y-8 before:absolute before:left-3.5 before:top-2 before:bottom-4 before:w-[2px] before:bg-white/10">
                     {[
                        { icon: Home, color: 'text-blue-400', bg: 'bg-blue-400/20', title: 'Nouveau bien ajouté', desc: '"Villa Sonaba" est en ligne', time: '2h' },
                        { icon: DollarSign, color: 'text-green-400', bg: 'bg-green-400/20', title: 'Revenu confirmé', desc: '+12,500 MAD encaissés', time: '5h' },
                        { icon: Calendar, color: 'text-purple-400', bg: 'bg-purple-400/20', title: 'Booking reçu', desc: 'Appartement Marina (3 nuits)', time: '1j' },
                        { icon: Users, color: 'text-orange-400', bg: 'bg-orange-400/20', title: 'Nouveau prospect', desc: 'Karim B. a demandé une visite', time: '2j' }
                     ].map((item, i) => (
                        <div key={i} className="relative pl-12">
                           <div className={`absolute left-0 top-1 w-8 h-8 rounded-full ${item.bg} ${item.color} flex items-center justify-center border-4 border-nesty-darker ring-1 ring-white/10`}>
                              <item.icon size={14} strokeWidth={2.5} />
                           </div>
                           <div>
                              <div className="flex justify-between items-baseline mb-1">
                                 <p className="text-sm font-bold text-white leading-none">{item.title}</p>
                                 <span className="text-[10px] font-bold text-gray-500">{item.time}</span>
                              </div>
                              <p className="text-xs text-gray-400 font-medium leading-relaxed">{item.desc}</p>
                           </div>
                        </div>
                     ))}
                  </div>

                  <button className="w-full mt-8 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold text-gray-300 hover:text-white transition backdrop-blur-sm border border-white/5 hover:border-white/10">
                     Voir tout l'historique
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default AdminDashboard;