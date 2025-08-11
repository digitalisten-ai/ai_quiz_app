import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { API_ENDPOINTS, apiFetch } from '../utils/api';

const Dashboard = () => {
  const navigate = useNavigate();
  const { token } = useAuth();

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  useEffect(() => {
    if (token) {
      apiFetch(API_ENDPOINTS.results)
        .then(data => console.log('Fetched data:', data))
        .catch(err => console.error('API error:', err));
    }
  }, [token]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8 text-white">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center">
          <h1 className="text-5xl font-black mb-4 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
            🧠 Välkommen till AI-Quiz
          </h1>
          <p className="text-lg text-purple-100">Fördjupa dina kunskaper i statistik och maskininlärning.</p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => navigate('/quiz')}
            className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-xl font-semibold px-8 py-4 rounded-2xl shadow-lg transition-transform transform hover:scale-105"
          >
            🚀 Starta Quiz
          </button>
        </div>

        <div className="text-center mt-8 space-y-4">
          <button
            onClick={() => navigate('/results')}
            className="inline-block bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white text-xl font-semibold px-8 py-4 rounded-2xl shadow-lg transition-transform transform hover:scale-105"
          >
            📊 Visa dina resultat
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;