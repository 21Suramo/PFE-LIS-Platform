import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import FocusTrap from "focus-trap-react";

export default function TeamFormModal({
  isOpen,
  onClose,
  onSave,
  initialTeam,
  leaders = [],
}) {
  const [form, setForm] = useState({
    // nom: "",
    name: "",
    description: "",
    specialite: "",
    // leaderId: leaders[0]?.id || "",
    leader: leaders[0]?._id || "",
    image: null,
  });
  const firstRef = useRef(null);

  // Reset & autofocus
  useEffect(() => {
    if (isOpen) {
      setForm(
        // initialTeam || {
        //   nom: "",
        //   specialite: "",
        //   leaderId: leaders[0]?.id || "",
        // }
        initialTeam
          ? {
              name: initialTeam.name || "",
              description: initialTeam.description || "",
              specialite: initialTeam.specialite || "",
              leader: initialTeam.leader?._id || initialTeam.leader || "",
              image: null,
            }
          : {
              name: "",
              description: "",
              specialite: "",
              leader: leaders[0]?._id || "",
              image: null,
            }
      );
      setTimeout(() => firstRef.current?.focus(), 200);
    }
  }, [isOpen, initialTeam, leaders]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <FocusTrap active={isOpen}>
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}>
          <motion.div
            role="dialog"
            aria-modal="true"
            className="relative bg-white rounded-2xl shadow-2xl w-11/12 md:w-3/4 lg:w-1/2 p-6"
            style={{ perspective: 800 }}
            initial={{ scale: 0.8, rotateX: -15, opacity: 0 }}
            animate={{ scale: 1, rotateX: 0, opacity: 1 }}
            exit={{ scale: 0.8, rotateX: -15, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            onClick={(e) => e.stopPropagation()}>
            <button
              aria-label="Fermer"
              className="absolute top-3 right-3 text-2xl text-gray-500 hover:text-red-500"
              onClick={onClose}>
              ×
            </button>
            <h2 className="text-xl font-bold text-blue-900 mb-4">
              {initialTeam ? "Modifier" : "Ajouter"} une équipe
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onSave(form);
              }}
              className="flex flex-col gap-4">
              <div>
                <label htmlFor="team-name" className="block text-sm font-medium">
                  Nom de l’équipe
                </label>
                <input
                  ref={firstRef}
                  id="team-name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                  className="mt-1 w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label
                  htmlFor="team-specialite"
                  className="block text-sm font-medium">
                  Spécialité
                </label>
                <input
                  id="team-specialite"
                  type="text"
                  required
                  value={form.specialite}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, specialite: e.target.value }))
                  }
                  className="mt-1 w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label htmlFor="team-description" className="block text-sm font-medium">
                  Description
                </label>
                <textarea
                  id="team-description"
                  required
                  value={form.description}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, description: e.target.value }))
                  }
                  className="mt-1 w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label htmlFor="team-image" className="block text-sm font-medium">
                  Image (optionnelle)
                </label>
                <input
                  id="team-image"
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setForm((f) => ({ ...f, image: e.target.files[0] }))
                  }
                  className="mt-1 w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label
                  htmlFor="team-leader"
                  className="block text-sm font-medium">
                  Responsable
                </label>
                <select
                  id="team-leader"
                  required
                  value={form.leader}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, leader: e.target.value }))
                  }
                  className="mt-1 w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400">
                  {leaders.map((l) => (
                    <option key={l._id} value={l._id}>
                      {l.nom}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                {initialTeam ? "Sauvegarder" : "Ajouter"}
              </button>
            </form>
          </motion.div>
        </motion.div>
      </FocusTrap>
    </AnimatePresence>
  );
}
