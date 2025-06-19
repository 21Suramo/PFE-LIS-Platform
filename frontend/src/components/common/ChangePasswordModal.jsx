import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MailIcon,
  LockIcon,
  EyeIcon,
  EyeOffIcon,
  Loader2Icon,
  AlertTriangleIcon,
  XIcon,
} from "lucide-react";
import { changePassword } from "../../services/authService";

const spring3D = {
  type: "spring",
  stiffness: 140,
  damping: 14,
};

export default function ChangePasswordModal({ isOpen, onClose }) {
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    if (!email.includes("@")) {
      setError("Veuillez entrer une adresse email valide.");
      return;
    }
    if (newPassword.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }
    if (newPassword !== confirm) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }
    setLoading(true);
    try {
      await changePassword(email, oldPassword, newPassword, confirm);
      setMessage("Mot de passe mis à jour avec succès.");
    } catch (err) {
      const msg = err?.response?.data?.message || err.message ||
        "Une erreur est survenue. Veuillez réessayer.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-[3px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative bg-white/85 dark:bg-base-alt-dark/80 backdrop-blur-xl rounded-2xl shadow-2xl p-7 w-[92vw] max-w-sm"
            initial={{ scale: 0.82, opacity: 0, rotateY: -40 }}
            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
            exit={{ scale: 0.85, opacity: 0, rotateY: 20 }}
            transition={spring3D}
            role="dialog"
            aria-modal="true"
            style={{ boxShadow: "0 8px 48px 0 rgba(0,0,0,0.18)" }}
          >
            <motion.button
              onClick={onClose}
              whileTap={{ scale: 0.8, rotate: 90 }}
              className="absolute top-3 right-3 p-2 rounded-full bg-white/70 dark:bg-base-dark/70 shadow hover:bg-red-100 dark:hover:bg-red-400/30 transition"
              aria-label="Fermer"
            >
              <XIcon className="w-5 h-5 text-gray-600 dark:text-gray-200" />
            </motion.button>

            <h2 className="text-xl font-semibold text-center mb-4">Changer le mot de passe</h2>
            {error && (
              <div className="flex items-center text-red-600 text-sm mb-3">
                <AlertTriangleIcon className="w-4 h-4 mr-1" /> {error}
              </div>
            )}
            {message && (
              <div className="text-green-600 text-sm mb-3 text-center">{message}</div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white/80 dark:bg-base-dark/60 focus-within:ring-2 focus-within:ring-lisBlue">
                <MailIcon className="text-gray-500 w-5 h-5 mr-2" />
                <input
                  type="email"
                  placeholder="Adresse email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-transparent border-none focus:outline-none text-base"
                />
              </div>
              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white/80 dark:bg-base-dark/60 focus-within:ring-2 focus-within:ring-lisBlue">
                <LockIcon className="text-gray-500 w-5 h-5 mr-2" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Ancien mot de passe"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  required
                  className="w-full bg-transparent border-none focus:outline-none text-base"
                />
              </div>
              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white/80 dark:bg-base-dark/60 focus-within:ring-2 focus-within:ring-lisBlue">
                <LockIcon className="text-gray-500 w-5 h-5 mr-2" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Nouveau mot de passe"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="w-full bg-transparent border-none focus:outline-none text-base"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="text-gray-500 ml-2"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOffIcon className="w-5 h-5" />
                  ) : (
                    <EyeIcon className="w-5 h-5" />
                  )}
                </button>
              </div>
              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white/80 dark:bg-base-dark/60 focus-within:ring-2 focus-within:ring-lisBlue">
                <LockIcon className="text-gray-500 w-5 h-5 mr-2" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirmer le mot de passe"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  required
                  className="w-full bg-transparent border-none focus:outline-none text-base"
                />
              </div>
              <motion.button
                disabled={loading}
                type="submit"
                whileTap={{ scale: 0.96 }}
                className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-lisBlue text-white font-semibold rounded-lg hover:bg-primary-dark transition disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
              >
                {loading && <Loader2Icon className="animate-spin w-5 h-5" />}
                <span>{loading ? "Envoi…" : "Changer le mot de passe"}</span>
              </motion.button>
            </form>
            <button
              onClick={onClose}
              className="mt-4 text-sm text-gray-600 dark:text-gray-400 hover:underline w-full text-center"
            >
              Annuler
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}