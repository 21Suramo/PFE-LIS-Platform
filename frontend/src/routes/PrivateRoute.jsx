// src/routes/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function PrivateRoute({ children, roles }) {
  const { user, loading } = useAuth();

  // Affiche un message de chargement pendant la vérification du token
  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        Chargement…
      </div>
    );
  }

  // Si pas connecté, renvoyer vers l’accueil
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Si rôle non autorisé, renvoyer vers l’accueil
  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  // Sinon, afficher le composant enfant (la page protégée)
  return children;
}
