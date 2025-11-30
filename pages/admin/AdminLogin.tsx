import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminLogin: React.FC = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      navigate('/admin/dashboard');
    } else {
      setError('Mot de passe incorrect');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md text-center">
         <div className="w-16 h-16 bg-nesty-darker rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Lock className="text-nesty-accent" size={32} />
         </div>
         <h1 className="text-2xl font-bold text-nesty-dark mb-2">Administration</h1>
         <p className="text-gray-500 mb-8">Accès sécurisé réservé à l'équipe Nesty.</p>

         <form onSubmit={handleSubmit} className="space-y-4">
            <div>
               <input 
                 type="password"
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-nesty-accent focus:ring-2 focus:ring-nesty-accent/20 outline-none text-center tracking-widest text-lg"
                 placeholder="Mot de passe"
                 autoFocus
               />
            </div>
            {error && <p className="text-red-500 text-sm font-bold">{error}</p>}
            
            <button 
              type="submit"
              className="w-full bg-nesty-accent text-nesty-darker font-bold py-3 rounded-lg hover:bg-nesty-accentDark hover:text-white transition-all shadow-lg"
            >
              Connexion
            </button>
         </form>
         
         <div className="mt-6 pt-6 border-t border-gray-100">
            <p className="text-xs text-gray-400">Pour la démo : mot de passe = <code className="bg-gray-100 px-1 rounded">admin123</code></p>
         </div>
      </div>
    </div>
  );
};

export default AdminLogin;
