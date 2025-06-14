import React, { createContext, useContext, useState, useEffect } from "react";
// import { mockUtilisateurs } from "../data/mockData";
// import { loginUser } from "../services/authService";
import { loginUser, resetPassword as resetPasswordRequest } from "../services/authService";

const AuthContext = createContext({
  user: null,
  loading: false,
  login: () => {},
  logout: () => {},
  resetPassword: () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Correction du mock login : recherche dans le mock par email (ou rôle pour dev)
  // const login = (emailOrRole = "membre@lis.ma", password) => {
    const login = async (email, password) => {
    setLoading(true);
    // setTimeout(() => {
    //   // Trouver l'utilisateur dans le mock
    //   let utilisateur;
    //   // 1. Si email, cherche par email
    //   if (emailOrRole.includes("@")) {
    //     utilisateur = mockUtilisateurs.find((u) => u.email === emailOrRole);
    //   } else {
    //     // 2. Sinon, prend le premier utilisateur du rôle voulu
    //     utilisateur = mockUtilisateurs.find(
    //       (u) => u.role === emailOrRole.toUpperCase()
    //     );
    //   }
    //   if (utilisateur) {
    //     localStorage.setItem("user", JSON.stringify(utilisateur));
    //     setUser(utilisateur);
    //   } else {
    //     setUser(null);
    //   }
    try {
      const { token, user: loggedUser } = await loginUser({ email, password });
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(loggedUser));
      setUser(loggedUser);
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    // }, 500);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  const resetPassword = async (email) => {
    await resetPasswordRequest(email);
  };


  return (
    <AuthContext.Provider value={{ user, loading, login, logout, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
