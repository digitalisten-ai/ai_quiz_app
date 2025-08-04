import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Logo from './Logo';

const ResultsPage = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get("http://localhost:5000/api/results", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setResults(res.data))
    .catch(err => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-5xl mx-auto">
        <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 md:p-12">
        <Logo size={180} />
          <h1 className="text-3xl font-bold mb-4">Dina Quizresultat</h1>
          <div className="grid gap-4">
            {results.map((r, idx) => (
              <div
                key={idx}
                className="bg-white/10 border border-white/20 rounded-xl p-4 shadow-md"
              >
                <p className="text-xl font-semibold text-green-300">
                  ✅ {r.percentage}% - {r.correctAnswers}/{r.totalQuestions}{" "}
                  rätt
                </p>
                <p className="text-sm text-gray-300">
                  Tid: {r.timeSpent} sekunder
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;