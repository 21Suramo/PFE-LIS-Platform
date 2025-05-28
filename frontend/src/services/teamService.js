import api from "./api";

/* ---------- liste & création : inchangés ---------- */
export const getAllTeams   = () => api.get("/teams").then(r => r.data);
export const createTeam    = (formData) => api.post("/teams", formData).then(r => r.data);

/* ---------- mise à jour : récupère l'id dans le FormData ---------- */
export const updateTeam = (formData) => {
  const id = formData instanceof FormData ? formData.get("_id") : formData._id;
  if (!id) throw new Error("updateTeam : _id manquant !");
  return api.put(`/teams/${id}`, formData).then(r => r.data);
};

/* ---------- suppression : inchangée ---------- */
export const deleteTeam = (id) => api.delete(`/teams/${id}`).then(r => r.data);
