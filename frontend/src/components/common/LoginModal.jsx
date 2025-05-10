// src/components/common/LoginModal.jsx
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

export default function LoginModal({ isOpen, onClose }) {
  const { login, loading } = useAuth();
  const [role, setRole] = useState('MEMBRE');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(role);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-sm p-6">
        <h2 className="text-2xl font-semibold text-primaryDark mb-4 text-center">
          Se connecter
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Choisissez votre rôle
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-1 block w-full border rounded p-2"
            >
              <option value="MEMBRE">Membre</option>
              <option value="DOCTORANT">Doctorant</option>
              <option value="RESPONSABLE">Responsable</option>
              <option value="DIRECTEUR">Directeur</option>
            </select>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="py-2 px-4 rounded border"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className="py-2 px-4 bg-lisBlue text-white rounded disabled:opacity-50"
            >
              {loading ? 'Connexion…' : 'Se connecter'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
