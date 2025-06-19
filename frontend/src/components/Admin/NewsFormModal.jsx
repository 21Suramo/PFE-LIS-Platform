import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import FocusTrap from "focus-trap-react";

export default function NewsFormModal({ isOpen, onClose, onSave, initialNews }) {
  const [form, setForm] = useState({ titre: "", contenu: "", pinned: false });
  const [imageFile, setImageFile] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const firstInputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setForm(initialNews || { titre: "", contenu: "", pinned: false });
      setImageFile(null);
      setPdfFile(null);
      setTimeout(() => firstInputRef.current?.focus(), 200);
    }
  }, [initialNews, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("titre", form.titre);
    fd.append("contenu", form.contenu);
    fd.append("pinned", form.pinned);
    if (imageFile) fd.append("image", imageFile);
    if (pdfFile) fd.append("pdf", pdfFile);
    onSave(fd);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <FocusTrap>
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              className="relative bg-white rounded-2xl shadow-2xl w-11/12 md:w-3/4 lg:w-1/2 p-6"
              style={{ perspective: 800 }}
              initial={{ scale: 0.8, rotateX: -15, opacity: 0 }}
              animate={{ scale: 1, rotateX: 0, opacity: 1 }}
              exit={{ scale: 0.8, rotateX: -15, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                aria-label="Fermer"
                className="absolute top-3 right-3 text-2xl text-gray-500 hover:text-red-500"
                onClick={onClose}
              >
                &times;
              </button>
              <h2 className="text-xl font-bold text-blue-900 mb-4">
                {initialNews ? "Modifier" : "Ajouter"} une actualité
              </h2>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label htmlFor="news-titre" className="block text-sm font-medium">
                    Titre
                  </label>
                  <input
                    id="news-titre"
                    ref={firstInputRef}
                    type="text"
                    required
                    value={form.titre}
                    onChange={(e) => setForm((f) => ({ ...f, titre: e.target.value }))}
                    className="mt-1 w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div>
                  <label htmlFor="news-contenu" className="block text-sm font-medium">
                    Contenu
                  </label>
                  <textarea
                    id="news-contenu"
                    required
                    rows={5}
                    value={form.contenu}
                    onChange={(e) => setForm((f) => ({ ...f, contenu: e.target.value }))}
                    className="mt-1 w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <label className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={form.pinned}
                    onChange={(e) => setForm((f) => ({ ...f, pinned: e.target.checked }))}
                  />
                  <span>Épingler</span>
                </label>
                <div>
                  <label htmlFor="news-image" className="block text-sm font-medium">
                    Image (optionnelle)
                  </label>
                  <input
                    id="news-image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files[0])}
                    className="mt-1 w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div>
                  <label htmlFor="news-pdf" className="block text-sm font-medium">
                    Fichier PDF (optionnel)
                  </label>
                  <input
                    id="news-pdf"
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => setPdfFile(e.target.files[0])}
                    className="mt-1 w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                  {initialNews ? "Sauvegarder" : "Ajouter"}
                </button>
              </form>
            </motion.div>
          </motion.div>
        </FocusTrap>
      )}
    </AnimatePresence>
  );
}
