import React from "react";
import LoginForm from "./LoginForm";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-purple-800 to-indigo-900 text-white">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-purple-800 mb-6">Logga in</h2>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;