import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Logo from './Logo';

const LoginForm = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Något gick fel');

      login(data.token);
      onLoginSuccess?.(data);
      navigate('dashboard'); // Uppdatera sökvägen om du vill gå till en annan sida
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white/90 backdrop-blur-md rounded-3xl shadow-xl p-8 border border-white/20">
        <div className="flex flex-col items-center mb-6">
          <Logo size={180} />
          <h2 className="text-3xl font-extrabold text-gray-800">Logga in</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <input
            type="email"
            name="email"
            autoFocus
            autoComplete="email"
            placeholder="E-post"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            placeholder="Lösenord"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-xl transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Loggar in...' : 'Logga in'}
          </button>
          <p className="text-sm text-center text-gray-600">
            Har du inget konto?{' '}
            <Link to="register" className="text-purple-600 hover:underline font-semibold">
              Skapa ett konto
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;