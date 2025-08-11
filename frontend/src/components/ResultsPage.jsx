import React, { useEffect, useState } from 'react';
import Logo from './Logo';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { API_ENDPOINTS, apiFetch } from '../utils/api';

const ResultsPage = () => {
  const [results, setResults] = useState([]);
  const navigate = useNavigate();
  const { token } = useAuth();

useEffect(() => {
  if (token === undefined) return; // wait for token to resolve
  if (!token) navigate('/login');
}, [token, navigate]);

  useEffect(() => {
    if (!token) return;

    let cancelled = false;
    (async () => {
      try {
        const data = await apiFetch(API_ENDPOINTS.results, { token });
        if (!cancelled) setResults(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Kunde inte hämta resultat:', err);
      }
    })();

    return () => { cancelled = true; };
  }, [token]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 flex justify-center items-start">
      <div className="max-w-5xl">
        <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 md:p-12">
        <div className="flex flex-col items-center justify-center text-center mb-6">
          <Logo size={180} />
          <h1 className="text-3xl font-bold mt-4">Dina Quizresultat</h1>
        </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6 justify-items-center">
            <div className="bg-white-700/50 border border-black-400 rounded-xl p-4 shadow-md text-black text-center max-w-[150px] mx-auto">
              <p className="text-lg font-semibold">✅ Antal Quiz</p>
              <p className="text-xl">{results.length}</p>
            </div>
            <div className="bg-white-700/50 border border-black-400 rounded-xl p-4 shadow-md text-black text-center max-w-[150px] mx-auto">
              <p className="text-lg font-semibold">📈 Högsta resultat</p>
              <p className="text-xl">
                {results.length > 0 ? Math.max(...results.map(r => r.percentage)) + "%" : "–"}
              </p>
            </div>
            <div className="bg-white-700/50 border border-black-400 rounded-xl p-4 shadow-md text-black text-center max-w-[150px] mx-auto">
              <p className="text-lg font-semibold">📊 Snittresultat</p>
              <p className="text-xl">
                {results.length > 0 ? (results.reduce((acc, r) => acc + r.percentage, 0) / results.length).toFixed(1) + "%" : "–"}
              </p>
            </div>
            <div className="bg-white-700/50 border border-black-400 rounded-xl p-4 shadow-md text-black text-center max-w-[150px] mx-auto">
              <p className="text-lg font-semibold">📉 Lägsta resultat</p>
              <p className="text-xl">
                {results.length > 0 ? Math.min(...results.map(r => r.percentage)) + "%" : "–"}
              </p>
            </div>
            <div className="bg-white-700/50 border border-black-400 rounded-xl p-4 shadow-md text-black text-center max-w-[150px] mx-auto">
              <p className="text-lg font-semibold">⏱️ Total tid</p>
              <p className="text-xl">
                {results.length > 0 ? Math.round(results.reduce((acc, r) => acc + (r.timeSpent || 0), 0) / 60) + " min" : "–"}
              </p>
            </div>
            <div className="bg-white-700/50 border border-black-400 rounded-xl p-4 shadow-md text-black text-center max-w-[150px] mx-auto">
              <p className="text-lg font-semibold">🧠 Poäng/fråga</p>
              <p className="text-xl">
                {results.length > 0
                  ? (
                      results.reduce((acc, r) => acc + (r.score || 0), 0) /
                      Math.max(1, results.reduce((acc, r) => acc + (r.totalQuestions || 0), 0))
                    ).toFixed(2)
                  : "–"}
              </p>
            </div>
          </div>
          <div className="grid gap-4">
            {results.map((r, idx) => (
              <div
                key={idx}
                className="bg-green-400 border border-purple-400 rounded-xl p-3 shadow-md w-full max-w-[500px]"
              >
                <p className="text-xl font-semibold text-black-300">
                  ✅ {r.percentage}% - {r.correctAnswers}/{r.totalQuestions}{" "}
                  rätt
                </p>
                <p className="text-sm text-black-300">
                  Tid: {r.timeSpent} sekunder
                </p>
              </div>
            ))}
          </div>
          <button
            onClick={() => navigate('/dashboard')}
            className="mt-6 px-6 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition"
          >
            Tillbaka till Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;