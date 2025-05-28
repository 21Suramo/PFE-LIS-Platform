// src/services/teamService.js
import api from "./api";

/* ───────── READ ───────── */
export const getAllTeams   = () => api.get("/teams").then(r => r.data);
export const getTeamById   = (id) => api.get(`/teams/${id}`).then(r => r.data);

/* ───────── CREATE ───────── */
export const createTeam = (teamData) =>
  api.post("/teams", teamData, {
    headers:
      teamData instanceof FormData
        ? { "Content-Type": "multipart/form-data" }
        : undefined,
  }).then(r => r.data);

/* ───────── UPDATE ───────── */
export const updateTeam = (teamData) => {
  const id =
    teamData instanceof FormData ? teamData.get("_id") : teamData._id;
  if (!id) throw new Error("updateTeam: missing _id");

  return api.put(`/teams/${id}`, teamData, {
    headers:
      teamData instanceof FormData
        ? { "Content-Type": "multipart/form-data" }
        : undefined,
  }).then(r => r.data);
};

/* ───────── DELETE ───────── */
export const deleteTeam = (id) =>
  api.delete(`/teams/${id}`).then(r => r.data);
