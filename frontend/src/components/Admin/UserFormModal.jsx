import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FocusTrap from "focus-trap-react";

export default function UserFormModal({
  isOpen,
  onClose,
  onSave,
  initialUser,
}) {
  const [form, setForm] = useState({
    nom: "",
    email: "",
    speciality: "",
    role: "MEMBRE",
  });
  const firstInputRef = useRef(null);

  // Réinitialisation & focus à l’ouverture
  useEffect(() => {
    if (isOpen) {
      setForm(
        initialUser || { nom: "", email: "", speciality: "", role: "MEMBRE" }
      );
      setTimeout(() => firstInputRef.current?.focus(), 200);
    }
  }, [initialUser, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <FocusTrap>
          {/* backdrop */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}>
            {/* modal */}
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="user-modal-title"
              className="relative bg-white rounded-2xl shadow-2xl w-11/12 md:w-3/4 lg:w-1/2 xl:w-1/3 p-6"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              onClick={(e) => e.stopPropagation()}>
              {/* close */}
              <button
                aria-label="Fermer"
                className="absolute top-3 right-3 text-2xl text-gray-500 hover:text-red-500"
                onClick={onClose}>
                &times;
              </button>

              {/* titre */}
              <h2
                id="user-modal-title"
                className="text-lg font-bold text-blue-900 mb-4">
                {initialUser ? "Modifier" : "Ajouter"} un utilisateur
              </h2>

              {/* formulaire */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label
                    htmlFor="user-nom"
                    className="block text-sm font-medium text-gray-700">
                    Nom
                  </label>
                  <input
                    id="user-nom"
                    ref={firstInputRef}
                    type="text"
                    required
                    value={form.nom}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, nom: e.target.value }))
                    }
                    className="mt-1 w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <div>
                  <label
                    htmlFor="user-email"
                    className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    id="user-email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, email: e.target.value }))
                    }
                    className="mt-1 w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <div>
                  <label
                    htmlFor="user-speciality"
                    className="block text-sm font-medium text-gray-700">
                    Spécialité
                  </label>
                  <input
                    id="user-speciality"
                    type="text"
                    value={form.speciality}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, speciality: e.target.value }))
                    }
                    className="mt-1 w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <div>
                  <label
                    htmlFor="user-role"
                    className="block text-sm font-medium text-gray-700">
                    Rôle
                  </label>
                  <select
                    id="user-role"
                    required
                    value={form.role}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, role: e.target.value }))
                    }
                    className="mt-1 w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400">
                    <option value="MEMBRE">Membre</option>
                    <option value="DOCTORANT">Doctorant</option>
                    <option value="RESPONSABLE">Responsable</option>
                    <option value="DIRECTEUR">Directeur</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                  {initialUser ? "Sauvegarder" : "Ajouter"}
                </button>
              </form>
            </motion.div>
          </motion.div>
        </FocusTrap>
      )}
    </AnimatePresence>
  );
}
