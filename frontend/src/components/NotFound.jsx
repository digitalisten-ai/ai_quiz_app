import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NotFound = () => {
  const navigate = useNavigate();
  const { token } = useAuth();

  const handleGoHome = () => {
    navigate(token ? "/dashboard" : "/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4">
      <div className="bg-white/50 backdrop-blur-md p-8 rounded-lg shadow-lg text-center max-w-md w-full">
        <h1 className="text-6xl font-bold text-red-400">404</h1>
        <p className="text-lg mb-6 text-white">
          Oops! Sidan du letar efter kunde inte hittas.
        </p>
        <button
          onClick={handleGoHome}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
        >
          Gå tillbaka till startsidan
        </button>
      </div>
    </div>
  );
};

export default NotFound;