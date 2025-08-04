import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';
import logo from "../assets/ai_quiz_logo.png";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Registreringen misslyckades');
      }

      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4">
      <div className="bg-white rounded-xl shadow-lg p-10 max-w-md w-full">
        <div className="flex justify-center mb-6">
        <Logo size={180} />
        </div>
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Skapa Konto</h1>
        {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Namn"
            autoComplete="name"
            required
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-post"
            autoComplete="email"
            required
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Lösenord"
            autoComplete="new-password"
            required
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-md hover:bg-purple-700 transition duration-300"
          >
            {loading ? 'Skapar konto...' : 'Skapa Konto'}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Har du redan ett konto? <a href="/login" className="text-purple-600 hover:underline">Logga in här</a>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;