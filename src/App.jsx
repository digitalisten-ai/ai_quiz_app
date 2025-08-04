import Header from "./components/Header";
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import QuizApp from './components/QuizApp';
import Dashboard from './components/Dashboard';
import ResultsPage from './components/ResultsPage';


function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/quiz" element={token ? <QuizApp /> : <Navigate to="/login" />} />
        <Route path="/results" element={token ? <ResultsPage /> : <Navigate to="/login" />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="*" element={<Navigate to={token ? "/dashboard" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;
