// src/components/common/LoginModal.jsx
import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { EyeIcon, EyeOffIcon, AlertTriangleIcon } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";

export default function LoginModal({ isOpen, onClose }) {
  const { login, resetPassword } = useAuth();
  const [tab, setTab] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

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
      if (tab === "login") {
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
            <Tabs defaultValue="login" value={tab} onValueChange={setTab}>
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="login">Connexion</TabsTrigger>
                <TabsTrigger value="reset">Mot de passe oublié ?</TabsTrigger>
              </TabsList>

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
                <TabsContent value="login">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium">
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
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute top-2 right-3 text-gray-500">
                        {showPassword ? (
                          <EyeOffIcon className="w-5 h-5" />
                        ) : (
                          <EyeIcon className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center text-sm gap-2">
                    <input
                      type="checkbox"
                      id="remember"
                      checked={remember}
                      onChange={() => setRemember(!remember)}
                      className="accent-lisBlue"
                    />
                    <label htmlFor="remember" className="text-gray-700">
                      Se souvenir de moi
                    </label>
                  </div>
                </TabsContent>

                <TabsContent value="reset">
                  <div>
                    <label
                      htmlFor="email-reset"
                      className="block text-sm font-medium">
                      Adresse email
                    </label>
                    <input
                      id="email-reset"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lisBlue"
                    />
                  </div>
                </TabsContent>

                <button
                  disabled={loading}
                  type="submit"
                  aria-busy={loading}
                  className="w-full py-2 px-4 bg-lisBlue text-white rounded-md hover:bg-primary-dark transition disabled:opacity-50 disabled:cursor-not-allowed">
                  {loading
                    ? tab === "login"
                      ? "Connexion..."
                      : "Envoi..."
                    : tab === "reset"
                      ? "Se connecter"
                      : "Envoyer le lien"}
                </button>
              </form>
            </Tabs>
            <div className="mt-2 text-center">
              <button
                variant="primary"
                onClick={() => setTab("login")}
                className="text-sm text-lisBlue hover:underline">
                Se connecter
              </button>
            </div>
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
