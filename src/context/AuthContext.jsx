// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ token: null, user: null });

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      const user = jwtDecode(savedToken);
      console.log('Decoded user from saved token:', user);
      setAuth({ token: savedToken, user });
    }
  }, []);

  const login = (newToken) => {
    const user = jwtDecode(newToken);
    console.log('Decoded user from new token:', user);
    localStorage.setItem('token', newToken);
    setAuth({ token: newToken, user });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuth({ token: null, user: null });
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);