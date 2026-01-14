import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Home, MessageSquare, LogOut, ExternalLink, Menu, X, Bell, User, Search, Settings } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import logoDash from '@/assets/images/nesty-logodash.png';

const AdminLayout: React.FC = () => {
  const { logout } = useAuth();
  const { adminProfile } = useData();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/admin/dashboard': return 'Tableau de Bord';
      case '/admin/properties': return 'Gestion des Propriétés';
      case '/admin/messages': return 'Messagerie';
      case '/admin/settings': return 'Paramètres';
      default: return 'Administration';
    }
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans selection:bg-nesty-accent/30">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-nesty-darker/60 backdrop-blur-sm z-40 lg:hidden transition-opacity" onClick={() => setSidebarOpen(false)}></div>
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-nesty-darker text-white transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} flex flex-col shadow-2xl overflow-hidden`}>
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
          <div className="absolute -top-[10%] -right-[30%] w-[80%] pt-[80%] rounded-full bg-nesty-accent blur-[80px]"></div>
          <div className="absolute top-[40%] -left-[20%] w-[60%] pt-[60%] rounded-full bg-blue-600 blur-[80px]"></div>
        </div>

        <div className="p-8 flex justify-center items-center relative z-10">
          <img src={logoDash} alt="Nesty Admin" className="h-12 w-auto object-contain" />
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden absolute right-6 text-gray-400 hover:text-white transition"><X size={20} /></button>
        </div>

        <nav className="flex-grow px-4 py-6 space-y-2 overflow-y-auto relative z-10 custom-scrollbar">
          <div className="text-[10px] font-extrabold text-white/40 uppercase tracking-[0.2em] mb-4 px-4 font-heading">Menu Principal</div>

          <NavLink
            to="/admin/dashboard"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) => `flex items-center gap-3.5 px-4 py-3.5 rounded-2xl transition-all duration-300 group ${isActive ? 'bg-nesty-accent text-nesty-darker font-bold shadow-[0_0_25px_rgba(45,212,191,0.4)] translate-x-1' : 'text-gray-400 hover:text-white hover:bg-white/5 hover:translate-x-1'}`}
          >
            {({ isActive }) => (
              <>
                <LayoutDashboard size={20} className={isActive ? 'fill-nesty-darker stroke-none' : 'group-hover:scale-110 transition-transform stroke-current'} />
                <span className="tracking-wide">Dashboard</span>
                {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-nesty-darker animate-pulse"></div>}
              </>
            )}
          </NavLink>

          <NavLink
            to="/admin/properties"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) => `flex items-center gap-3.5 px-4 py-3.5 rounded-2xl transition-all duration-300 group ${isActive ? 'bg-nesty-accent text-nesty-darker font-bold shadow-[0_0_25px_rgba(45,212,191,0.4)] translate-x-1' : 'text-gray-400 hover:text-white hover:bg-white/5 hover:translate-x-1'}`}
          >
            {({ isActive }) => (
              <>
                <Home size={20} className={isActive ? 'fill-nesty-darker stroke-none' : 'group-hover:scale-110 transition-transform stroke-current'} />
                <span className="tracking-wide">Propriétés</span>
              </>
            )}
          </NavLink>

          <NavLink
            to="/admin/messages"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) => `flex items-center gap-3.5 px-4 py-3.5 rounded-2xl transition-all duration-300 group ${isActive ? 'bg-nesty-accent text-nesty-darker font-bold shadow-[0_0_25px_rgba(45,212,191,0.4)] translate-x-1' : 'text-gray-400 hover:text-white hover:bg-white/5 hover:translate-x-1'}`}
          >
            {({ isActive }) => (
              <>
                <MessageSquare size={20} className={isActive ? 'fill-nesty-darker stroke-none' : 'group-hover:scale-110 transition-transform stroke-current'} />
                <span className="tracking-wide">Messages</span>
              </>
            )}
          </NavLink>
        </nav>

        <div className="mx-4 mb-6 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md relative z-10 shadow-2xl group transition-all duration-300 hover:bg-white/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-nesty-accent to-blue-500 p-[2px] ring-2 ring-white/10 shadow-lg overflow-hidden">
              {adminProfile.avatar ? (
                <img src={adminProfile.avatar} alt="Profile" className="w-full h-full rounded-full object-cover" />
              ) : (
                <div className="w-full h-full rounded-full bg-nesty-darker flex items-center justify-center text-white text-xs font-bold">
                  {adminProfile.firstName.charAt(0)}{adminProfile.lastName.charAt(0)}
                </div>
              )}
            </div>
            <div className="overflow-hidden">
              <p className="text-white text-sm font-bold truncate group-hover:text-nesty-accent transition-colors">{adminProfile.firstName} {adminProfile.lastName}</p>
              <p className="text-gray-400 text-[10px] uppercase tracking-wider font-medium">Super Admin</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2.5 text-red-300 hover:text-white hover:bg-red-500/80 rounded-xl transition-all text-xs font-bold uppercase tracking-wider shadow-sm hover:shadow-red-500/20"
          >
            <LogOut size={14} /> Déconnexion
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-grow flex flex-col h-screen overflow-hidden relative">
        {/* Top Header */}
        <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200/60 h-20 flex items-center justify-between px-6 lg:px-10 z-20 sticky top-0">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 text-gray-500 hover:text-nesty-dark hover:bg-gray-100 rounded-lg transition">
              <Menu size={24} />
            </button>
            <h1 className="text-2xl font-bold text-nesty-dark hidden sm:block tracking-tight">{getPageTitle()}</h1>
          </div>

          <div className="flex items-center gap-4 lg:gap-8">
            <div className="hidden md:flex items-center relative">
              <Search size={16} className="absolute left-3 text-gray-400" />
              <input
                type="text"
                placeholder="Recherche rapide..."
                className="pl-9 pr-4 py-2 bg-gray-50 border-none rounded-full text-sm font-medium text-gray-600 focus:ring-2 focus:ring-nesty-accent/50 focus:bg-white outline-none transition-all w-64"
              />
            </div>

            <div className="flex items-center gap-3 border-l border-gray-200 pl-6 relative">
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className={`relative p-2 transition rounded-full ${showNotifications ? 'text-nesty-dark bg-gray-100' : 'text-gray-400 hover:text-nesty-dark hover:bg-gray-50'}`}
                >
                  <Bell size={20} />
                  <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
                </button>

                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 z-50 animate-fade-in-up">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-50">
                      <h4 className="font-bold text-nesty-dark text-sm">Notifications</h4>
                      <span className="text-xs text-nesty-accent font-bold">Marquer tout comme lu</span>
                    </div>
                    <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
                      <div className="p-3 hover:bg-gray-50 rounded-xl transition cursor-pointer flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0"><MessageSquare size={14} /></div>
                        <div>
                          <p className="text-xs font-bold text-gray-800">Nouveau message reçu</p>
                          <p className="text-[10px] text-gray-500 mt-1">Sarah a envoyé une demande pour 'Villa Sunset'</p>
                          <p className="text-[9px] text-gray-400 mt-1">Il y a 2 min</p>
                        </div>
                      </div>
                      <div className="p-3 hover:bg-gray-50 rounded-xl transition cursor-pointer flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0"><User size={14} /></div>
                        <div>
                          <p className="text-xs font-bold text-gray-800">Nouvelle réservation</p>
                          <p className="text-[10px] text-gray-500 mt-1">Réservation confirmée pour le 12 Fév</p>
                          <p className="text-[9px] text-gray-400 mt-1">Il y a 1h</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-2 border-t border-gray-50 text-center">
                      <button className="text-xs font-bold text-gray-500 hover:text-nesty-dark transition">Voir tout</button>
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={() => navigate('/admin/settings')}
                className={`p-2 transition rounded-full ${location.pathname === '/admin/settings' ? 'text-nesty-dark bg-gray-100' : 'text-gray-400 hover:text-nesty-dark hover:bg-gray-50'}`}
              >
                <Settings size={20} />
              </button>
              <a
                href="/"
                target="_blank"
                className="ml-2 hidden sm:flex items-center gap-2 px-4 py-2 bg-nesty-darker text-white text-xs font-bold rounded-full hover:bg-nesty-accent hover:text-nesty-darker transition shadow-lg shadow-nesty-darker/20"
              >
                <ExternalLink size={14} /> Voir le site
              </a>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-grow overflow-auto p-4 lg:p-8 custom-scrollbar">
          <div className="max-w-[1600px] mx-auto animate-fade-in-up">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;