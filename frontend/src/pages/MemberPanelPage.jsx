// import React, { useState } from "react";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "../components/common/Layout";
import { useAuth } from "../contexts/AuthContext";
// import { mockArticles } from "../data/mockData";
import {
  getAllTeams,
} from "../services/teamService";
import {
  createArticle,
  updateArticle,
  deleteArticle,
  getArticlesByTeam,
} from "../services/articleService";

// Modal 3D propre et scrollable si besoin
function Modal3D({ open, onClose, title, children }) {
  if (!open) return null;
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}>
        <motion.div
          className="bg-white rounded-2xl shadow-2xl w-[95vw] max-w-xl p-6 relative flex flex-col"
          initial={{ scale: 0.93, rotateY: -24, opacity: 0 }}
          animate={{ scale: 1, rotateY: 0, opacity: 1 }}
          exit={{ scale: 0.97, rotateY: 8, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}>
          <button
            className="absolute top-3 right-4 text-gray-400 hover:text-red-600 text-2xl"
            onClick={onClose}
            aria-label="Fermer"
            tabIndex={0}>
            &times;
          </button>
          <h2 className="text-xl font-bold mb-6 text-blue-900">{title}</h2>
          <div className="overflow-y-auto max-h-[65vh] px-1">{children}</div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function MemberPanelPage() {
  const { user } = useAuth();
  // Mes articles PENDING uniquement
  // const [localArticles, setLocalArticles] = useState(
  //   mockArticles.filter(
  //     (a) => a.auteurId === user?.id && a.statut === "PENDING"
  //   )
  // );
  const [localArticles, setLocalArticles] = useState([]);
  const [team, setTeam] = useState(null);

  useEffect(() => {
    async function fetchTeam() {
      try {
        const teams = await getAllTeams();
        const myTeam = teams.find(
          (t) =>
            t.leader?._id === user?._id ||
            (t.membres || []).some((m) => m._id === user?._id)
        );
        setTeam(myTeam || null);
      } catch (err) {
        console.error("Failed to load teams:", err);
      }
    }
    if (user) fetchTeam();
  }, [user]);

  useEffect(() => {
    async function loadArticles() {
      if (!team) return;
      try {
        const articles = await getArticlesByTeam(team._id);
        const mine = articles.filter(
          (a) => (a.author?._id || a.author) === user._id && a.statut === "PENDING"
        );
        setLocalArticles(mine);
      } catch (err) {
        console.error("Failed to load articles:", err);
      }
    }
    loadArticles();
  }, [team, user]);

  // Modal état
  const [modalOpen, setModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editingId, setEditingId] = useState(null);
  // Form state
  const [form, setForm] = useState({
    titre: "",
    description: "",
    pdf: null,
    pdfName: "",
    image: null,
    imageUrl: "",
  });

  // Ouvrir modal (ajout ou édition)
  function openAddModal() {
    setForm({
      titre: "",
      description: "",
      pdf: null,
      pdfName: "",
      image: null,
      imageUrl: "",
    });
    setIsEdit(false);
    setEditingId(null);
    setModalOpen(true);
  }
  function openEditModal(article) {
    setForm({
      // titre: article.titre,
      // description: article.description || "",
      titre: article.title || article.titre,
      description: article.content || article.description || "",
      pdf: null,
      pdfName: article.pdfName || "",
      image: null,
      imageUrl: article.imageUrl || "",
    });
    setIsEdit(true);
    // setEditingId(article.id);
    setEditingId(article._id || article.id);
    setModalOpen(true);
  }
  // PDF handler
  function handlePDF(e) {
    const file = e.target.files[0];
    setForm((prev) => ({
      ...prev,
      pdf: file,
      pdfName: file ? file.name : "",
    }));
  }
  // Image handler (affichage preview)
  function handleImage(e) {
    const file = e.target.files[0];
    setForm((prev) => ({
      ...prev,
      image: file,
      imageUrl: file ? URL.createObjectURL(file) : "",
    }));
  }
  // Soumission
  // function handleSubmit(e) {
    async function handleSubmit(e) {
    e.preventDefault();
    if (!form.titre.trim()) return alert("Titre requis !");
    try {
      const formData = new FormData();
      formData.append('title', form.titre);
      formData.append('content', form.description);
      formData.append('resume', form.description);
      if (form.pdf) formData.append('pdf', form.pdf);
      if (team) formData.append('equipe', team._id);

      if (isEdit) {
      const updated = await updateArticle(editingId, formData);
        setLocalArticles((prev) =>
          prev.map((a) => (a._id === updated._id ? updated : a))
        );
      } else {
        if (!team) return;
        const { article } = await createArticle(formData);
        setLocalArticles((prev) => [...prev, article]);
      }
      setModalOpen(false);
    } catch (err) {
      console.error("Failed to submit article:", err);
    }
    // setModalOpen(false);
  }
  // Suppression
  // function handleDelete(id) {
  //   setLocalArticles((prev) => prev.filter((a) => a.id !== id));
  async function handleDelete(id) {
    try {
      await deleteArticle(id);
      setLocalArticles((prev) => prev.filter((a) => a._id !== id));
    } catch (err) {
      console.error("Failed to delete article:", err);
    }
  }

  // Effets 3D sur les cards
  const card3d = {
    whileHover: { scale: 1.022, rotateY: 4, boxShadow: "0 6px 32px #bdd8ff70" },
    whileTap: { scale: 0.96, rotateY: -5 },
    transition: { type: "spring", stiffness: 150, damping: 20 },
  };

  return (
    <Layout>
      <div className="mx-auto py-10 px-2 w-[96%] md:w-[85%] lg:w-[75%] max-w-3xl flex flex-col min-h-[70vh]">
        <h1 className="text-2xl md:text-3xl font-bold text-blue-900 mb-7">
          Mes articles en attente de validation
        </h1>
        <div className="flex justify-end mb-6">
          <button
            onClick={openAddModal}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold shadow hover:bg-blue-800 active:scale-95 transition">
            + Ajouter un article
          </button>
        </div>
        {/* Liste des articles pending */}
        <div className="space-y-5">
          {localArticles.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-gray-500 italic py-10 text-center">
              Aucun article en attente.
            </motion.div>
          ) : (
            localArticles.map((a) => (
              <motion.div
                {...card3d}
                key={a._id || a.id}
                className="flex items-center gap-5 border rounded-xl bg-white shadow-lg p-5">
                {a.imageUrl && (
                  <img
                    src={a.imageUrl}
                    alt="Aperçu"
                    className="w-20 h-20 rounded-lg object-cover border"
                  />
                )}
                <div className="flex-1">
                  <div className="font-bold text-lg text-blue-900">
                  {a.title || a.titre}
                  </div>
                  <div className="text-sm text-gray-700">
                  {(a.content || a.description)?.slice(0, 150) || (
                      <span className="italic text-gray-400">
                        Pas de description
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2 items-center mt-2 text-xs">
                    {a.pdfName && (
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded">
                        PDF: {a.pdfName}
                      </span>
                    )}
                    <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
                      {a.statut}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => openEditModal(a)}
                    className="px-4 py-1 rounded bg-blue-100 text-blue-800 hover:bg-blue-200 text-sm font-semibold shadow">
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(a._id || a.id)}
                    className="px-4 py-1 rounded bg-red-100 text-red-700 hover:bg-red-200 text-sm font-semibold shadow">
                    Supprimer
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Modal ajout/édition article */}
        <Modal3D
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          title={isEdit ? "Modifier l'article" : "Ajouter un article"}>
          <form
            className="flex flex-col gap-5"
            onSubmit={handleSubmit}
            encType="multipart/form-data">
            <label className="font-semibold">
              Titre
              <input
                type="text"
                value={form.titre}
                onChange={(e) =>
                  setForm((f) => ({ ...f, titre: e.target.value }))
                }
                className="w-full mt-1 px-3 py-2 border rounded focus:outline-blue-400"
                required
              />
            </label>
            <label className="font-semibold">
              Description
              <textarea
                rows={3}
                value={form.description}
                onChange={(e) =>
                  setForm((f) => ({ ...f, description: e.target.value }))
                }
                className="w-full mt-1 px-3 py-2 border rounded focus:outline-blue-400"
                required
              />
            </label>
            <label className="font-semibold">
              PDF de l’article -
              <input
                type="file"
                accept="application/pdf"
                onChange={handlePDF}
                className="mt-1"
              />
              {form.pdfName && (
                <span className="text-xs mt-1 text-gray-600">
                  Fichier sélectionné : {form.pdfName}
                </span>
              )}
            </label>
            <label className="font-semibold">
              Image -
              <input
                type="file"
                accept="image/*"
                onChange={handleImage}
                className="mt-1"
              />
              {form.imageUrl && (
                <img
                  src={form.imageUrl}
                  alt="Preview"
                  className="w-32 h-24 object-cover rounded mt-2 border"
                />
              )}
            </label>
            <div className="flex justify-end gap-4 mt-2">
              <button
                type="button"
                className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
                onClick={() => setModalOpen(false)}>
                Annuler
              </button>
              <motion.button
                whileTap={{ scale: 0.95, rotate: -6 }}
                type="submit"
                className="px-6 py-2 rounded bg-blue-600 text-white font-bold hover:bg-blue-700 shadow">
                {isEdit ? "Modifier" : "Créer"}
              </motion.button>
            </div>
          </form>
        </Modal3D>
      </div>
    </Layout>
  );
}
