import Header from "./components/Header";
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import QuizApp from './components/QuizApp';
import Dashboard from './components/Dashboard';
import ResultsPage from './components/ResultsPage';
import { useAuth } from './context/AuthContext';

function App() {
  const { token } = useAuth();

  return (
    <>
      <Header />
      <Routes>
        <Route path="/ai_quiz_app/login" element={<LoginForm />} />
        <Route path="/ai_quiz_app/dashboard" element={token ? <Dashboard /> : <Navigate to="/ai_quiz_app/login" />} />
        <Route path="/ai_quiz_app/quiz" element={token ? <QuizApp /> : <Navigate to="/ai_quiz_app/login" />} />
        <Route path="/ai_quiz_app/results" element={token ? <ResultsPage /> : <Navigate to="/ai_quiz_app/login" />} />
        <Route path="/ai_quiz_app/register" element={<RegisterForm />} />
        <Route path="*" element={<Navigate to={token ? "/ai_quiz_app/dashboard" : "/ai_quiz_app/login"} />} />
      </Routes>
    </>
  );
}

export default App;
