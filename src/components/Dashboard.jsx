import React from 'react';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8 text-white">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center">
          <h1 className="text-5xl font-black mb-4 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
            🧠 Välkommen till Quizportalen
          </h1>
          <p className="text-lg text-purple-100">Fördjupa dina kunskaper i statistik och maskininlärning.</p>
        </div>

        <div className="flex justify-center">
          <a
            href="/quiz"
            className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-xl font-semibold px-8 py-4 rounded-2xl shadow-lg transition-transform transform hover:scale-105"
          >
            🚀 Starta Quiz
          </a>
        </div>

        <div className="text-center mt-8">
          <p className="text-purple-200 italic">
            Snart kommer du kunna se dina tidigare resultat och statistik här...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;