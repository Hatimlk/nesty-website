import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/admin/dashboard');
    } catch (err) {
      console.error(err);
      setError('Email ou mot de passe incorrect');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md text-center">
        <div className="w-16 h-16 bg-nesty-darker rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
          <Lock className="text-nesty-accent" size={32} />
        </div>
        <h1 className="text-2xl font-bold text-nesty-dark mb-2">Administration</h1>
        <p className="text-gray-500 mb-8">Accès sécurisé pour l'équipe Nesty.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 text-gray-400" size={20} />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:border-nesty-accent focus:ring-2 focus:ring-nesty-accent/20 outline-none"
              placeholder="Email"
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3.5 text-gray-400" size={20} />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:border-nesty-accent focus:ring-2 focus:ring-nesty-accent/20 outline-none"
              placeholder="Mot de passe"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm font-bold">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-nesty-accent text-nesty-darker font-bold py-3 rounded-lg hover:bg-nesty-accentDark hover:text-white transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Connexion...' : 'Connexion'}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-100">
          <p className="text-xs text-gray-400">
            Besoin d'aide ? Contactez le support technique.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
