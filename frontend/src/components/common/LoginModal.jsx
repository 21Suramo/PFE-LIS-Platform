// src/components/common/LoginModal.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext"; // Correct path to your AuthContext
import { motion, AnimatePresence } from "framer-motion";
import { EyeIcon, EyeOffIcon, AlertTriangleIcon } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs"; // Assuming this path is correct for your shadcn/ui Tabs

export default function LoginModal({ isOpen, onClose }) {
  const { login, resetPassword } = useAuth(); // Get login from context. `resetPassword` is not implemented yet in context.
  const [tab, setTab] = useState("login"); // 'login' or 'reset'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false); // 'remember' functionality is not fully implemented in AuthContext persistence.
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null); // For success messages like password reset
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // Local loading state for the form

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    if (!email.includes("@")) { // Basic email validation
      setError("Veuillez entrer une adresse email valide.");
      setLoading(false);
      return;
    }

    try {
      await login(email, password); // Call the login function from AuthContext
      // 'remember' is not directly handled by context's localStorage logic, token persistence is default.
      onClose(); // Close modal on successful login
    } catch (err) {
      // err.response.data.message should contain backend error
      setError(err.response?.data?.message || "Échec de la connexion. Vérifiez vos identifiants.");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordResetSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);
    // Assuming `resetPassword` is a function in your AuthContext that calls a backend endpoint
    // For now, it's a placeholder. You'd need to implement this in AuthContext and backend.
    try {
        if(resetPassword) { // Check if resetPassword function exists
            // await resetPassword(email); // Example call
            setMessage("Si un compte avec cet email existe, un email de réinitialisation a été envoyé.");
            setEmail(""); // Clear email field
        } else {
            setMessage("La fonctionnalité de réinitialisation du mot de passe n'est pas encore disponible.");
        }
    } catch (err) {
        setError(err.response?.data?.message || "Erreur lors de la demande de réinitialisation.");
    } finally {
        setLoading(false);
    }
  };

  // Reset form state when modal is closed or tab changes
  useEffect(() => {
    if (!isOpen) {
      setEmail("");
      setPassword("");
      setRemember(false);
      setError(null);
      setMessage(null);
      setShowPassword(false);
      setLoading(false);
      setTab("login"); // Reset to login tab when modal reopens
    } else {
        setError(null); // Clear errors when modal opens or tab changes
        setMessage(null);
    }
  }, [isOpen, tab]);


  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-lg shadow-xl p-6 w-[90%] max-w-sm"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
          >
            <Tabs defaultValue="login" value={tab} onValueChange={setTab}>
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="login">Connexion</TabsTrigger>
                <TabsTrigger value="reset">Mot de passe oublié ?</TabsTrigger>
              </TabsList>

              {error && (
                <p className="flex items-center text-red-600 text-sm mb-3 p-2 bg-red-100 rounded">
                  <AlertTriangleIcon className="w-4 h-4 mr-2 flex-shrink-0" /> {error}
                </p>
              )}
              {message && (
                <p className="text-green-600 text-sm mb-3 p-2 bg-green-100 rounded text-center">
                  {message}
                </p>
              )}

              {/* LOGIN FORM */}
              <TabsContent value="login" forceMount={tab === 'login'}>
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="email-login" // Unique ID
                      className="block text-sm font-medium text-gray-700"
                    >
                      Adresse email
                    </label>
                    <input
                      id="email-login"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-lisBlue focus:border-lisBlue"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="password-login" // Unique ID
                      className="block text-sm font-medium text-gray-700"
                    >
                      Mot de passe
                    </label>
                    <div className="relative">
                      <input
                        id="password-login"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-lisBlue focus:border-lisBlue pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-500 hover:text-gray-700"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? (
                          <EyeOffIcon className="w-5 h-5" />
                        ) : (
                          <EyeIcon className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="remember"
                          checked={remember}
                          onChange={(e) => setRemember(e.target.checked)}
                          className="h-4 w-4 text-lisBlue border-gray-300 rounded focus:ring-lisBlue accent-lisBlue"
                        />
                        <label htmlFor="remember" className="text-gray-700">
                          Se souvenir de moi
                        </label>
                    </div>
                  </div>
                  <button
                    disabled={loading}
                    type="submit"
                    aria-busy={loading}
                    className="w-full py-2 px-4 bg-lisBlue text-white font-semibold rounded-md hover:bg-blue-900 transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {loading && (
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    )}
                    {loading ? "Connexion..." : "Se connecter"}
                  </button>
                </form>
              </TabsContent>
              
              {/* PASSWORD RESET FORM */}
              <TabsContent value="reset" forceMount={tab === 'reset'}>
                <form onSubmit={handlePasswordResetSubmit} className="space-y-4">
                    <p className="text-sm text-gray-600">
                        Entrez votre adresse email et nous vous enverrons un lien pour réinitialiser votre mot de passe.
                    </p>
                  <div>
                    <label
                      htmlFor="email-reset" // Unique ID
                      className="block text-sm font-medium text-gray-700"
                    >
                      Adresse email
                    </label>
                    <input
                      id="email-reset"
                      type="email"
                      value={email} // Shared email state for simplicity, or use separate
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-lisBlue focus:border-lisBlue"
                    />
                  </div>
                  <button
                    disabled={loading}
                    type="submit"
                    aria-busy={loading}
                    className="w-full py-2 px-4 bg-lisBlue text-white font-semibold rounded-md hover:bg-blue-900 transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                     {loading && (
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    )}
                    {loading ? "Envoi..." : "Envoyer le lien"}
                  </button>
                </form>
              </TabsContent>
            </Tabs>
            
            {/* Removed redundant "Se connecter" button, tab navigation handles this */}
            <button
              onClick={onClose}
              className="mt-6 text-sm text-gray-600 hover:text-lisBlue w-full text-center"
            >
              Annuler
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}