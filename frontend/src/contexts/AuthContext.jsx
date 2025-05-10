// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext({
  user: null,
  loading: false,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Au montage, on peut vérifier un user/token stocké
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Mock de login : on stocke un user dans localStorage
  const login = (role = 'MEMBRE') => {
    setLoading(true);
    setTimeout(() => {
      const mockUser = { id: 1, name: 'Test User', role };
      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
      setLoading(false);
    }, 500);
  };

  // Logout : on supprime le user stocké
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook pour consommer facilement le contexte
export function useAuth() {
  return useContext(AuthContext);
}
