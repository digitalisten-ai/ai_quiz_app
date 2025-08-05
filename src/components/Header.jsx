import React from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { token, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/ai_quiz_app/login");
  };

  return (
    <header className="bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 shadow-md p-4 flex justify-between items-center">
      <Link to="/dashboard" className="text-xl font-bold text-white hover:underline">
        🧠 AI-Quiz
      </Link>
      {token && (
        <div className="flex items-center gap-4">
          <span className="text-white hidden sm:inline">
            Hej <strong>{user?.name || "okänd"}</strong>
          </span>
          <button
            onClick={handleLogout}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Logga ut
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;