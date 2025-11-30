import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Home, MessageSquare, LogOut, ExternalLink, Menu, X, Bell, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminLayout: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const getPageTitle = () => {
    switch(location.pathname) {
      case '/admin/dashboard': return 'Tableau de Bord';
      case '/admin/properties': return 'Gestion des Propriétés';
      case '/admin/messages': return 'Messagerie';
      default: return 'Administration';
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)}></div>
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-nesty-darker text-white transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} flex flex-col shadow-2xl`}>
        <div className="p-6 border-b border-gray-800 flex justify-between items-center">
          <div className="flex items-center gap-3">
             <div className="bg-nesty-accent p-1.5 rounded-lg shadow-lg shadow-nesty-accent/20">
                <svg width="24" height="24" viewBox="0 0 100 100" fill="none">
                  <path d="M20 80V40L50 15L80 40V80H60V55C60 50 55 45 50 45C45 45 40 50 40 55V80H20Z" fill="#1E293B" />
                  <circle cx="50" cy="65" r="4" fill="#1E293B" />
                </svg>
             </div>
             <span className="text-xl font-bold tracking-tight text-white">nesty<span className="text-nesty-accent">admin</span></span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-400"><X size={20}/></button>
        </div>

        <nav className="flex-grow p-4 space-y-2 overflow-y-auto">
          <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 px-4 mt-4">Menu Principal</div>
          <NavLink 
            to="/admin/dashboard" 
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive ? 'bg-nesty-accent text-nesty-darker font-bold shadow-lg shadow-nesty-accent/20' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
          >
            <LayoutDashboard size={20} /> Dashboard
          </NavLink>
          <NavLink 
            to="/admin/properties" 
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive ? 'bg-nesty-accent text-nesty-darker font-bold shadow-lg shadow-nesty-accent/20' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
          >
            <Home size={20} /> Propriétés
          </NavLink>
          <NavLink 
            to="/admin/messages" 
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive ? 'bg-nesty-accent text-nesty-darker font-bold shadow-lg shadow-nesty-accent/20' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
          >
            <MessageSquare size={20} /> Messages
          </NavLink>
        </nav>

        <div className="p-4 border-t border-gray-800 space-y-2 bg-gray-900/50">
           <a href="/" target="_blank" className="flex items-center gap-3 px-4 py-2 text-gray-400 hover:text-white text-sm transition-colors rounded-lg hover:bg-white/5">
             <ExternalLink size={16} /> Voir le site public
           </a>
           <button 
             onClick={handleLogout}
             className="w-full flex items-center gap-3 px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors text-sm"
           >
             <LogOut size={16} /> Déconnexion
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-grow flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 lg:px-8 z-10 shadow-sm">
           <div className="flex items-center gap-4">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-500 hover:text-nesty-dark">
                <Menu size={24} />
              </button>
              <h1 className="text-xl font-bold text-nesty-dark hidden sm:block">{getPageTitle()}</h1>
           </div>
           
           <div className="flex items-center gap-6">
              <button className="relative text-gray-400 hover:text-nesty-accent transition">
                 <Bell size={20} />
                 <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              </button>
              <div className="flex items-center gap-3 border-l border-gray-100 pl-6">
                 <div className="text-right hidden md:block">
                    <div className="text-sm font-bold text-nesty-dark">Admin Nesty</div>
                    <div className="text-xs text-gray-500">Super Admin</div>
                 </div>
                 <div className="w-10 h-10 bg-nesty-darker rounded-full flex items-center justify-center text-white shadow-md cursor-pointer hover:bg-nesty-accent transition">
                    <User size={20} />
                 </div>
              </div>
           </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-grow overflow-auto p-4 lg:p-8 custom-scrollbar">
           <div className="max-w-7xl mx-auto animate-fade-in-up">
             <Outlet />
           </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;