// src/components/common/LoginModal.jsx
import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  EyeIcon,
  EyeOffIcon,
  AlertTriangleIcon,
  ArrowLeftIcon,
} from "lucide-react";

export default function LoginModal({ isOpen, onClose }) {
  const { login, resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("login"); // "login" ou "reset"
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    if (!email.includes("@")) {
      setError("Veuillez entrer une adresse email valide.");
      setLoading(false);
      return;
    }

    try {
      if (mode === "login") {
        await login(email, password, remember);
        onClose();
      } else {
        await resetPassword(email);
        setMessage("Un email de réinitialisation a été envoyé.");
      }
    } catch (err) {
      setError("Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}>
          <motion.div
            className="bg-white rounded-lg shadow-xl p-6 w-[90%] max-w-sm"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title">
            <h2
              id="modal-title"
              className="text-xl font-bold text-center text-primary-dark mb-4">
              {mode === "login" ? "Connexion" : "Mot de passe oublié"}
            </h2>

            {error && (
              <p className="flex items-center text-red-600 text-sm mb-3">
                <AlertTriangleIcon className="w-4 h-4 mr-1" /> {error}
              </p>
            )}

            {message && (
              <p className="text-green-600 text-sm mb-3 text-center">
                {message}
              </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium">
                  Adresse email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lisBlue"
                />
              </div>

              {mode === "login" && (
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium">
                    Mot de passe
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lisBlue pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute top-2 right-3 text-gray-500">
                      {showPassword ? (
                        <EyeOffIcon className="w-5 h-5" />
                      ) : (
                        <EyeIcon className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              )}

              {mode === "login" && (
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={remember}
                      onChange={() => setRemember(!remember)}
                    />
                    Se souvenir de moi
                  </label>
                  <button
                    type="button"
                    onClick={() => setMode("reset")}
                    className="text-lisBlue hover:underline">
                    Mot de passe oublié ?
                  </button>
                </div>
              )}

              {mode === "reset" && (
                <button
                  type="button"
                  onClick={() => setMode("login")}
                  className="flex items-center gap-2 text-sm text-lisBlue hover:underline">
                  <ArrowLeftIcon className="w-4 h-4" /> Retour à la connexion
                </button>
              )}

              <button
                disabled={loading}
                type="submit"
                aria-busy={loading}
                className="w-full py-2 px-4 bg-lisBlue text-white rounded-md hover:bg-primary-dark transition disabled:opacity-50 disabled:cursor-not-allowed">
                {loading
                  ? mode === "login"
                    ? "Connexion..."
                    : "Envoi..."
                  : mode === "login"
                    ? "Se connecter"
                    : "Envoyer le lien"}
              </button>
            </form>

            <button
              onClick={onClose}
              className="mt-4 text-sm text-gray-600 hover:underline w-full text-center">
              Annuler
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
