import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
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

      localStorage.setItem('token', data.token);
      onLoginSuccess?.(data);
      navigate('/dashboard'); // Uppdatera sökvägen om du vill gå till en annan sida
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Logga in</h2>
      {error && <p className="text-red-600 mb-2">{error}</p>}
      <input
        type="email"
        name="email"
        autoFocus
        autoComplete="email"
        placeholder="E-post"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full mb-3 p-2 border rounded"
        required
      />
      <input
        type="password"
        name="password"
        autoComplete="current-password"
        placeholder="Lösenord"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full mb-4 p-2 border rounded"
        required
      />
      <button
        type="submit"
        disabled={loading}
        className={`w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {loading ? 'Loggar in...' : 'Logga in'}
      </button>
    </form>
  );
};

export default LoginForm;