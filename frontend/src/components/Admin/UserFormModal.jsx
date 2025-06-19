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
    avatar: null,
    link1: "",
    link2: "",
  });
  const firstInputRef = useRef(null);

  // Réinitialisation & focus à l’ouverture
  useEffect(() => {
    if (isOpen) {
      setForm(
        // initialUser || { nom: "", email: "", speciality: "", role: "MEMBRE" }
        initialUser
            ? {
              nom: initialUser.nom || "",
                email: initialUser.email || "",
                speciality: initialUser.speciality || "",
                role: initialUser.role || "MEMBRE",
                avatar: null,
                link1: initialUser.link1 || "",
                link2: initialUser.link2 || "",
              }
            : {
                nom: "",
                email: "",
                speciality: "",
                role: "MEMBRE",
                avatar: null,
                link1: "",
                link2: "",
              }
      );
      setTimeout(() => firstInputRef.current?.focus(), 200);
    }
  // }, [initialUser, isOpen]);
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
            className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 backdrop-blur-sm p-4 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}>
            {/* modal */}
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="user-modal-title"
              className="bg-white rounded-2xl shadow-2xl w-11/12 md:w-3/4 lg:w-1/2 xl:w-1/3 mt-20 mb-10 overflow-hidden"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              onClick={(e) => e.stopPropagation()}>
               <div className="max-h-[71vh] overflow-y-auto p-6 relative">
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
                    htmlFor="user-link1"
                    className="block text-sm font-medium text-gray-700">
                    Lien 1
                  </label>
                  <input
                    id="user-link1"
                    type="text"
                    value={form.link1}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, link1: e.target.value }))
                    }
                    className="mt-1 w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <div>
                  <label
                    htmlFor="user-link2"
                    className="block text-sm font-medium text-gray-700">
                    Lien 2
                  </label>
                  <input
                    id="user-link2"
                    type="text"
                    value={form.link2}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, link2: e.target.value }))
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
                <div>
                  <label
                    htmlFor="user-avatar"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Avatar
                  </label>
                  <input
                    id="user-avatar"
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setForm((f) => ({ ...f, avatar: e.target.files[0] }))
                    }
                    className="mt-1 w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                  {initialUser ? "Sauvegarder" : "Ajouter"}
                </button>
              </form>
              </div>
            </motion.div>
          </motion.div>
        </FocusTrap>
      )}
    </AnimatePresence>
  );
}
