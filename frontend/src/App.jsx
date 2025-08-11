import Header from "./components/Header";
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import QuizApp from './components/QuizApp';
import Dashboard from './components/Dashboard';
import ResultsPage from './components/ResultsPage';
import NotFound from './components/NotFound';
import { useAuth } from './context/AuthContext';

function App() {
  const { token } = useAuth();

  return (
    <>
      <Header />
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/quiz" element={token ? <QuizApp /> : <Navigate to="/login" />} />
        <Route path="/results" element={token ? <ResultsPage /> : <Navigate to="/login" />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;