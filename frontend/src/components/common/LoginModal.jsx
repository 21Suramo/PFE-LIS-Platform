// src/components/common/LoginModal.jsx
import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  EyeIcon,
  EyeOffIcon,
  AlertTriangleIcon,
  XIcon,
  MailIcon,
  LockIcon,
  Loader2Icon,
} from "lucide-react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../../components/ui/Tabs";

const spring3D = {
  type: "spring",
  stiffness: 140,
  damping: 14,
};

// export default function LoginModal({ isOpen, onClose }) {
export default function LoginModal({ isOpen, onClose, onChangePassword }) {
  const { login, resetPassword } = useAuth();
  const [tab, setTab] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const firstInputRef = useRef(null);

  // Reset on modal open
  useEffect(() => {
    if (isOpen) {
      setTab("login");
      setEmail("");
      setPassword("");
      setRemember(false);
      setError(null);
      setMessage(null);
      setShowPassword(false);
      setTimeout(() => firstInputRef.current?.focus(), 350);
    }
  }, [isOpen]);

  // Reset errors/messages when tab changes
  useEffect(() => {
    setError(null);
    setMessage(null);
    setPassword("");
  }, [tab]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    if (!email.includes("@")) {
      setError("Veuillez entrer une adresse email valide.");
      return;
    }
    setLoading(true);
    try {
      if (tab === "login") {
        // await login(email, password, remember);
        await login(email, password);
        onClose();
      } else {
        await resetPassword(email);
        setMessage("Un email de réinitialisation a été envoyé.");
      }
    // } catch {
    //   setError("Une erreur est survenue. Veuillez réessayer.");
  } catch (err) {
    const msg = err?.response?.data?.message || err.message ||
      "Une erreur est survenue. Veuillez réessayer.";
    setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const submitLabel = loading
    ? tab === "login"
      ? "Connexion…"
      : "Envoi…"
    : tab === "login"
      ? "Se connecter"
      : "Envoyer le lien";

  // 3D modal open/close animation + glassmorphism effect
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-[3px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}>
          <motion.div
            className="relative bg-white/85 dark:bg-base-alt-dark/80 backdrop-blur-xl rounded-2xl shadow-2xl p-7 w-[92vw] max-w-sm"
            initial={{ scale: 0.82, opacity: 0, rotateY: -40 }}
            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
            exit={{ scale: 0.85, opacity: 0, rotateY: 20 }}
            transition={spring3D}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            style={{ boxShadow: "0 8px 48px 0 rgba(0,0,0,0.18)" }}>
            {/* Bouton Fermer */}
            <motion.button
              onClick={onClose}
              whileTap={{ scale: 0.8, rotate: 90 }}
              className="absolute top-3 right-3 p-2 rounded-full bg-white/70 dark:bg-base-dark/70 shadow hover:bg-red-100 dark:hover:bg-red-400/30 transition"
              aria-label="Fermer">
              <XIcon className="w-5 h-5 text-gray-600 dark:text-gray-200" />
            </motion.button>

            {/* Tabs avec effet 3D */}
            <Tabs value={tab} onValueChange={setTab}>
              <TabsList
                className="grid grid-cols-2 mb-6 rounded-xl bg-gray-100 dark:bg-base-dark/60 overflow-hidden"
                role="tablist">
                <TabsTrigger
                  value="login"
                  className="data-[state=active]:bg-lisBlue data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:scale-105 py-2 transition-all">
                  Connexion
                </TabsTrigger>
                <TabsTrigger
                  value="reset"
                  className="data-[state=active]:bg-lisBlue data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:scale-105 py-2 transition-all">
                  Mot de passe oublié ?
                </TabsTrigger>
              </TabsList>

              {/* Animation feedback erreurs/messages */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, y: -6, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    className="flex items-center text-red-600 text-sm mb-3">
                    <AlertTriangleIcon className="w-4 h-4 mr-1" /> {error}
                  </motion.div>
                )}
                {message && (
                  <motion.div
                    key="msg"
                    initial={{ opacity: 0, y: -6, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    className="text-green-600 text-sm mb-3 text-center">
                    {message}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form */}
              <motion.form
                layout
                onSubmit={handleSubmit}
                className="space-y-5"
                initial={false}>
                <TabsContent value="login" forceMount>
                  {/* Email */}
                  <motion.div
                    layout
                    className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white/80 dark:bg-base-dark/60 focus-within:ring-2 focus-within:ring-lisBlue"
                    whileFocus={{
                      scale: 1.02,
                      boxShadow: "0 2px 12px rgba(30,64,175,0.08)",
                    }}>
                    <MailIcon className="text-gray-500 w-5 h-5 mr-2" />
                    <input
                      ref={firstInputRef}
                      type="email"
                      autoComplete="email"
                      placeholder="Adresse email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full bg-transparent border-none focus:outline-none text-base"
                    />
                  </motion.div>
                  {/* Password */}
                  <motion.div
                    layout
                    className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white/80 dark:bg-base-dark/60 mt-3 focus-within:ring-2 focus-within:ring-lisBlue"
                    whileFocus={{
                      scale: 1.02,
                      boxShadow: "0 2px 12px rgba(30,64,175,0.09)",
                    }}>
                    <LockIcon className="text-gray-500 w-5 h-5 mr-2" />
                    <input
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      placeholder="Mot de passe"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full bg-transparent border-none focus:outline-none text-base"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="text-gray-500 ml-2"
                      tabIndex={-1}
                      aria-label={
                        showPassword
                          ? "Masquer le mot de passe"
                          : "Afficher le mot de passe"
                      }>
                      {showPassword ? (
                        <EyeOffIcon className="w-5 h-5" />
                      ) : (
                        <EyeIcon className="w-5 h-5" />
                      )}
                    </button>
                  </motion.div>
                  {/* Remember */}
                  <div className="flex items-center gap-2 text-sm mt-2">
                    <input
                      type="checkbox"
                      id="remember"
                      checked={remember}
                      onChange={() => setRemember(!remember)}
                      className="accent-lisBlue rounded-md"
                    />
                    <label
                      htmlFor="remember"
                      className="text-gray-600 dark:text-gray-400">
                      Se souvenir de moi
                    </label>
                  </div>
                </TabsContent>

                <TabsContent value="reset" forceMount>
                  <motion.div
                    layout
                    className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white/80 dark:bg-base-dark/60 focus-within:ring-2 focus-within:ring-lisBlue"
                    whileFocus={{
                      scale: 1.02,
                      boxShadow: "0 2px 12px rgba(30,64,175,0.09)",
                    }}>
                    <MailIcon className="text-gray-500 w-5 h-5 mr-2" />
                    <input
                      ref={firstInputRef}
                      type="email"
                      placeholder="Adresse email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full bg-transparent border-none focus:outline-none text-base"
                    />
                  </motion.div>
                </TabsContent>

                {/* Bouton Submit */}
                <motion.button
                  disabled={loading}
                  type="submit"
                  aria-busy={loading}
                  whileTap={{ scale: 0.96 }}
                  className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-lisBlue text-white font-semibold rounded-lg hover:bg-primary-dark transition disabled:opacity-50 disabled:cursor-not-allowed shadow-md">
                  {loading && <Loader2Icon className="animate-spin w-5 h-5" />}
                  <span>{submitLabel}</span>
                </motion.button>
              </motion.form>
            </Tabs>

            {/* Raccourci retour à connexion depuis reset */}
            {tab === "reset" && (
              <div className="mt-2 text-center">
                <button
                  onClick={() => setTab("login")}
                  className="text-sm text-lisBlue font-medium hover:underline">
                  Se connecter
                </button>
              </div>
            )}

            {tab === "login" && (
              <div className="mt-2 text-center">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onChangePassword?.();
                  }}
                  className="text-sm text-lisBlue font-medium hover:underline"
                >
                  Changer le mot de passe
                </button>
              </div>
            )}

            {/* Lien Annuler */}
            <button
              onClick={onClose}
              className="mt-4 text-sm text-gray-600 dark:text-gray-400 hover:underline w-full text-center">
              Annuler
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
