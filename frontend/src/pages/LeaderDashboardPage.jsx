// import React, { useState } from "react";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getFileUrl } from "../utils/fileUrl";
import Layout from "../components/common/Layout";
import { useAuth } from "../contexts/AuthContext";
// import { mockEquipes, mockArticles, mockUtilisateurs } from "../data/mockData";
import { getAllTeams, addMemberToTeam, removeMemberFromTeam } from "../services/teamService";
import { getAllArticles } from "../services/articleService";
import { getAllUsers } from "../services/userService";
import {
  approveArticle,
  deleteArticle,
  returnArticleToPending,
} from "../services/articleService";

import ArticleDetail from "../components/Article/ArticleDetail";


// -----------------------------------------------------------------------Pagination utilitaire
function paginate(array, pageSize, pageNumber) {
  return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
}

//----------------------------------------------------------------------------- Modal 3D stylée
function Modal3D({ open, onClose, children, title }) {
  if (!open) return null;
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[3px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}>
        <motion.div
          className="relative bg-white rounded-2xl shadow-2xl p-6 min-w-[320px] max-w-[96vw] w-[350px]"
          initial={{ scale: 0.75, rotateY: -30, opacity: 0 }}
          animate={{ scale: 1, rotateY: 0, opacity: 1 }}
          exit={{ scale: 0.85, rotateY: 20, opacity: 0 }}
          transition={{ type: "spring", stiffness: 150, damping: 19 }}>
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-2xl text-gray-500 hover:bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center"
            aria-label="Fermer">
            ×
          </button>
          {title && (
            <h3 className="text-lg font-bold text-blue-900 mb-4">{title}</h3>
          )}
          <div>{children}</div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// --------------------------------------------------------------------------------Pagination simple
function Pagination({ page, pageCount, onPageChange }) {
  return (
    <div className="flex items-center gap-2 mt-4 justify-center">
      <button
        className="px-3 py-1 rounded border bg-white shadow active:scale-90 transition"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}>
        ←
      </button>
      <span>
        Page {page} / {pageCount}
      </span>
      <button
        className="px-3 py-1 rounded border bg-white shadow active:scale-90 transition"
        disabled={page === pageCount}
        onClick={() => onPageChange(page + 1)}>
        →
      </button>
    </div>
  );
}

export default function LeaderDashboardPage() {
  const { user } = useAuth();

  // ----------------------------------------------------------------------------RESPONSABLE & EQUIPE
  // const leader = mockUtilisateurs.find((u) => u.email === user?.email);
  // const team = mockEquipes.find((eq) => eq.leaderId === leader?.id);
  const [users, setUsers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [articles, setArticles] = useState([]);
  const [allArticles, setAllArticles] = useState([]);

  // ----------------------------------------------------------------------MEMBRES dynamique
  // const [teamMembers, setTeamMembers] = useState(
  //   team
  //     ? team.membres.map((uid) => mockUtilisateurs.find((u) => u.id === uid))
  //     : []
  // );
  // const availableUsers = mockUtilisateurs.filter(
    useEffect(() => {
      getAllUsers()
        .then(setUsers)
        .catch((err) => console.error(err));
      getAllTeams()
        .then(setTeams)
        .catch((err) => console.error(err));
      getAllArticles()
        .then(setArticles)
        .catch((err) => console.error(err));
    }, []);
  
    const leader = users.find((u) => u.email === user?.email);
    const team = teams.find((eq) => eq.leader?._id === leader?._id);
  
    const [teamMembers, setTeamMembers] = useState([]);
  
    useEffect(() => {
      if (team) {
        // setTeamMembers(team.membres || []);
        const members = [team.leader, ...(team.membres || [])].filter(Boolean);
        const unique = [];
        members.forEach((m) => {
          if (!unique.some((u) => u._id === m._id)) unique.push(m);
        });
        setTeamMembers(unique);
      }
    }, [team]);
  
    useEffect(() => {
      if (team) {
        setAllArticles(
          articles.filter(
            (a) =>
              (a.equipe?._id || a.equipe) === team._id
          )
        );
      }
    }, [team, articles]);
  
    const availableUsers = users.filter((u) => {
      if (teamMembers.some((m) => m._id === u._id)) return false;
      if (u._id === leader?._id) return false;
      const inOther = teams.some(
        (t) =>
          t._id !== team?._id &&
          ((t.leader && t.leader._id === u._id) ||
            (t.membres || []).some((m) => m._id === u._id))
      );
      return !inOther;
    });

  // ---------------------------------------------------------------------Recherche membres
  const [searchMember, setSearchMember] = useState("");
  const filteredMembers = teamMembers.filter((member) =>
    (member.nom + " " + (member.speciality ?? ""))
      .toLowerCase()
      .includes(searchMember.toLowerCase())
  );

  //-------------------------------------------------------------------------------- ARTICLES
  // const [allArticles, setAllArticles] = useState(
  //   mockArticles.filter((a) => a.equipe === team?.nom)
  // );
  const [tab, setTab] = useState("PENDING");
  // --------------------------------------------------------------------------Recherche articles
  const [searchArticle, setSearchArticle] = useState("");
  const filteredArticles = allArticles.filter(
    (a) =>
      (tab === "PENDING" ? a.statut === "PENDING" : a.statut === "APPROVED") &&
      ((a.titre ?? "").toLowerCase().includes(searchArticle.toLowerCase()) ||
        (a.auteur ?? "").toLowerCase().includes(searchArticle.toLowerCase()))
  );

  // --------------------------------------------------------------------------------PAGINATION articles
  const ARTICLES_PER_PAGE = 2;
  const [articlePage, setArticlePage] = useState(1);
  const articlePageCount = Math.max(
    1,
    Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE)
  );
  const articlesToShow = paginate(
    filteredArticles,
    ARTICLES_PER_PAGE,
    articlePage
  );

  //---------------------------------------------------------------------------- PAGINATION membres
  const MEMBERS_PER_PAGE = 2;
  const [memberPage, setMemberPage] = useState(1);
  const memberPageCount = Math.max(
    1,
    Math.ceil(filteredMembers.length / MEMBERS_PER_PAGE)
  );
  const membersToShow = paginate(filteredMembers, MEMBERS_PER_PAGE, memberPage);

  // ----------------------------------------------------------------------------MODAL état
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  // ----------------------------------------------------------------------ARTICLES LOGIC
  // function handleApproveArticle(id) {
  //   setAllArticles((prev) =>
  //     prev.map((a) => (a.id === id ? { ...a, statut: "APPROVED" } : a))
  //   );
  // }
  async function handleApproveArticle(id) {
    try {
      await approveArticle(id);
      setAllArticles((prev) =>
        prev.map((a) => (a._id === id ? { ...a, statut: "APPROVED" } : a))
      );
      window.dispatchEvent(new Event("articlesUpdated"));
    } catch (err) {
      console.error("Error approving article:", err);
    }
  }

  // function handleDeleteArticle(id) {
  //   setAllArticles((prev) => prev.filter((a) => a.id !== id));
  // }
  async function handleDeleteArticle(id) {
    try {
      await deleteArticle(id);
      setAllArticles((prev) => prev.filter((a) => a._id !== id));
      window.dispatchEvent(new Event("articlesUpdated"));
    } catch (err) {
      console.error("Error deleting article:", err);
    }
  }

  // function handleReturnPending(id) {
  //   setAllArticles((prev) =>
  //     prev.map((a) => (a.id === id ? { ...a, statut: "PENDING" } : a))
  //   );
  //   setTab("PENDING");
  // }

  async function handleReturnPending(id) {
    try {
      await returnArticleToPending(id);
      setAllArticles((prev) =>
        prev.map((a) => (a._id === id ? { ...a, statut: "PENDING" } : a))
      );
      setTab("PENDING");
      window.dispatchEvent(new Event("articlesUpdated"));
    } catch (err) {
      console.error("Error returning article to pending:", err);
    }
  }

  // -----------------------------------------------------------------------------MEMBRES LOGIC
  // function handleAddMember(user) {
  //   setTeamMembers((prev) => [...prev, user]);
  //   setModalOpen(false);
  //   if (
  //     (teamMembers.length + 1) % MEMBERS_PER_PAGE === 1 &&
  //     membersToShow.length === MEMBERS_PER_PAGE
  //   ) {
  //     setMemberPage(memberPageCount + 1);
  async function handleAddMember(user) {
    if (!team) return;
    try {
      const updatedTeam = await addMemberToTeam(team._id, user._id);
      // setTeamMembers(updatedTeam.membres || []);
      const members = [
        updatedTeam.leader,
        ...(updatedTeam.membres || [])
      ].filter(Boolean);
      const unique = [];
      members.forEach((m) => {
        if (!unique.some((u) => u._id === m._id)) unique.push(m);
      });
      setTeamMembers(unique);
      setTeams((prev) => prev.map((t) => (t._id === updatedTeam._id ? updatedTeam : t)));
      setModalOpen(false);
      if (
        updatedTeam.membres.length % MEMBERS_PER_PAGE === 1 &&
        membersToShow.length === MEMBERS_PER_PAGE
      ) {
        setMemberPage(memberPageCount + 1);
      }

       // Notify other interfaces that team membership changed
       window.dispatchEvent(new Event('teamsUpdated'));

    } catch (err) {
      console.error('Failed to add member:', err);
    }
  }
  async function handleRemoveMember(id) {
    if (!team) return;
    try {
      const updatedTeam = await removeMemberFromTeam(team._id, id);
      const members = [
        updatedTeam.leader,
        ...(updatedTeam.membres || [])
      ].filter(Boolean);
      const unique = [];
      members.forEach((m) => {
        if (!unique.some((u) => u._id === m._id)) unique.push(m);
      });
      setTeamMembers(unique);
      setTeams((prev) => prev.map((t) => (t._id === updatedTeam._id ? updatedTeam : t)));
      if (
        memberPage > 1 &&
        updatedTeam.membres.length % MEMBERS_PER_PAGE === 0 &&
        membersToShow.length === 1
      ) {
        setMemberPage(memberPage - 1);
      }
    } catch (err) {
      console.error('Failed to remove member:', err);
    }
  }

  // 3D FX
  const card3d = {
    // whileHover: { scale: 1.025, rotateY: 5, boxShadow: "0 6px 32px #bdd8ff70" },
    // whileTap: { scale: 0.97, rotateY: -4 },
    whileHover: { scale: 1.025, boxShadow: "0 6px 32px #bdd8ff70" },
    whileTap: { scale: 0.97 },
    transition: { type: "spring", stiffness: 150, damping: 20 },
  };

  return (
    <Layout>
      <div
        className="
      mx-auto px-2
      w-[96%] md:w-[85%] lg:w-[75%] max-w-6xl
      flex flex-col
    "
        style={{
          paddingTop: "var(--header-height)",
          paddingBottom: "var(--footer-height)",
          minHeight: "100vh",
          boxSizing: "border-box",
        }}>
        {/* ---- MEMBRES ---- */}
        <section className="mb-14">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold text-blue-900 tracking-tight">
              Membres de l’équipe
            </h2>
            <button
              onClick={() => setModalOpen(true)}
              className="bg-blue-600 shadow-md text-white px-4 py-2 rounded hover:bg-blue-800 hover:shadow-xl active:scale-95 transition">
              + Ajouter membre
            </button>
          </div>
          <input
            type="text"
            placeholder="Rechercher un membre…"
            value={searchMember}
            onChange={(e) => {
              setSearchMember(e.target.value);
              setMemberPage(1);
            }}
            className="border rounded-md px-3 py-1 mb-3 w-full max-w-sm focus:outline-blue-400"
          />
          {membersToShow.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {membersToShow.map((member) => (
                    <motion.div
                      {...card3d}
                      key={member._id}
                      className="flex items-center border rounded-xl shadow-lg p-3 bg-white">
                    <img
                      src={getFileUrl(member.avatar)}
                      alt={member.nom}
                      className="w-12 h-12 rounded-full object-cover mr-3 border"
                    />
                    <div className="flex-1">
                      <div className="font-bold text-blue-900">
                        {member.nom}
                      </div>
                      <div className="text-xs text-gray-600">
                        {member.speciality}
                      </div>
                      <div className="text-xs text-gray-500">
                        Rôle : {member.role}
                      </div>
                    </div>
                    {member._id !== leader?._id && (
                      <motion.button
                        whileTap={{ scale: 0.87, rotate: -4 }}
                        className="ml-4 px-3 py-1 text-sm text-red-600 rounded hover:bg-red-50 font-medium transition"
                        onClick={() => handleRemoveMember(member._id)}>
                        Retirer
                      </motion.button>
                    )}
                  </motion.div>
                ))}
              </div>
              <Pagination
                page={memberPage}
                pageCount={memberPageCount}
                onPageChange={setMemberPage}
              />
            </>
          ) : (
            <p className="text-gray-500 italic">Aucun membre trouvé.</p>
          )}
        </section>

        {/* --- MODAL AJOUT MEMBRE --- */}
        <Modal3D
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Ajouter un membre">
          {availableUsers.length === 0 ? (
            <div className="text-gray-500">
              Aucun membre disponible à ajouter.
            </div>
          ) : (
            <div className="space-y-3">
              {availableUsers.map((u) => (
                <motion.div
                  {...card3d}
                  key={u.id}
                  className="flex items-center border rounded p-2 bg-blue-50">
                  <img
                    src={getFileUrl(u.avatar)}
                    alt={u.nom}
                    className="w-9 h-9 rounded-full object-cover mr-2 border"
                  />
                  <div className="flex-1">
                    <div className="font-medium">{u.nom}</div>
                    <div className="text-xs text-gray-500">{u.speciality}</div>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.92, rotate: -6 }}
                    onClick={() => handleAddMember(u)}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm font-medium shadow">
                    Ajouter
                  </motion.button>
                </motion.div>
              ))}
            </div>
          )}
        </Modal3D>

        {/* ---- ARTICLES ---- */}
        <section>
          <div className="flex gap-4 mb-2">
            <button
              className={`py-2 px-5 rounded-t-lg font-bold ${
                tab === "PENDING"
                  ? "bg-blue-700 text-white shadow-2xl scale-105"
                  : "bg-blue-100 text-blue-900"
              } transition`}
              onClick={() => {
                setTab("PENDING");
                setArticlePage(1);
              }}>
              Articles en attente
            </button>
            <button
              className={`py-2 px-5 rounded-t-lg font-bold ${
                tab === "APPROVED"
                  ? "bg-green-700 text-white shadow-2xl scale-105"
                  : "bg-green-50 text-green-900"
              } transition`}
              onClick={() => {
                setTab("APPROVED");
                setArticlePage(1);
              }}>
              Articles publiés
            </button>
          </div>
          <input
            type="text"
            placeholder="Rechercher un article…"
            value={searchArticle}
            onChange={(e) => {
              setSearchArticle(e.target.value);
              setArticlePage(1);
            }}
            className="border rounded-md px-3 py-1 mb-3 w-full max-w-sm focus:outline-blue-400"
          />
          {articlesToShow.length > 0 ? (
            <>
              <div className="space-y-4 min-h-[150px]">
                {articlesToShow.map((article) => (
                  <motion.div
                    {...card3d}
                    key={article._id}
                    className="flex items-center justify-between border rounded-xl p-4 shadow-xl bg-white">
                    <div>
                      <h3 className="text-lg font-bold text-blue-900">
                        {article.titre}
                      </h3>
                      <p className="text-sm text-gray-600">
                      Auteur :
                        {" "}
                        {article.author?.nom || article.author || article.auteur || "—"}
                      </p>
                      <p
                        className={`text-sm ${
                          article.statut === "PENDING"
                            ? "text-yellow-700"
                            : "text-green-700"
                        }`}>
                        Statut : {article.statut}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                    <motion.button
                        whileTap={{ scale: 0.92 }}
                        onClick={() => setSelectedArticle(article)}
                        className="bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-800 transition shadow text-sm font-semibold">
                        Voir
                      </motion.button>
                      {tab === "PENDING" && (
                        <motion.button
                          whileTap={{ scale: 0.92, rotate: -6 }}
                          onClick={() => handleApproveArticle(article._id)}
                          className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-800 transition shadow font-bold">
                          Valider
                        </motion.button>
                      )}
                      {tab === "APPROVED" && (
                        <>
                          <motion.button
                            whileTap={{ scale: 0.92, rotate: -6 }}
                            onClick={() => handleDeleteArticle(article._id)}
                            className="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-800 transition shadow text-sm font-semibold">
                            Supprimer
                          </motion.button>
                          <motion.button
                            whileTap={{ scale: 0.92, rotate: 6 }}
                            onClick={() => handleReturnPending(article._id)}
                            className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600 transition shadow text-sm font-semibold">
                            Retourner en attente
                          </motion.button>
                        </>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
              <Pagination
                page={articlePage}
                pageCount={articlePageCount}
                onPageChange={setArticlePage}
              />
            </>
          ) : (
            <p className="italic text-gray-500 min-h-[120px] flex items-center">
              Aucun article à afficher.
            </p>
          )}
        </section>
        <AnimatePresence>
          {selectedArticle && (
            <motion.div
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedArticle(null)}>
              <motion.div
                className="bg-white rounded-2xl shadow-2xl max-w-xl w-full p-8 relative"
                initial={{ scale: 0.93, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ type: 'spring', duration: 0.23 }}
                onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-lisBlue text-2xl font-bold"
                  aria-label="Fermer">
                  &times;
                </button>
                <ArticleDetail article={selectedArticle} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
}
