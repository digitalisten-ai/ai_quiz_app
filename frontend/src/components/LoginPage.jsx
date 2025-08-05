import React from "react";
import LoginForm from "./LoginForm";

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800 to-indigo-900 flex items-center justify-center">
      <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 md:p-12 w-full max-w-md text-center">
        <img src={logo} alt="AI Quiz Logo" className="w-28 h-28 mx-auto mb-6" />
        <h2 className="text-3xl font-extrabold text-purple-800 mb-4">Logga in till AI Quiz</h2>
        <p className="text-gray-600 mb-6">Välkommen tillbaka! Logga in för att fortsätta quizet.</p>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;