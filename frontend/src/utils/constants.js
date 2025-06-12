// src/utils/constants.js

// Définition centralisée des rôles utilisés dans l’application
export const ROLES = {
    MEMBER: 'MEMBRE',
    DOCTORANT: 'DOCTORANT',
    LEADER: 'RESPONSABLE',
    DIRECTOR: 'DIRECTEUR',
  };
  
  // Routes de l’application pour éviter les chaînes en dur
  export const ROUTES = {
    HOME: '/',
    TEAMS: '/teams',
    TEAM_DETAIL: (id) => `/teams/${id}`,
    ARTICLES: '/articles',
    NEWS: '/ews',
    EVENTS: '/events',
    MEMBER_PANEL: '/member-panel',
    LEADER_DASHBOARD: '/leader-dashboard',
    ADMIN_DASHBOARD: '/admin-dashboard',
  };
  
  // Couleurs réutilisables (doivent correspondre à tailwind.config.cjs)
  export const COLORS = {
    PRIMARY: 'lisBlue',       // #1A237E
    PRIMARY_DARK: 'primaryDark', // #003366
    LIGHT_BG: 'bgLight',      // #F8F9FA
    ACCENT: 'accentLight',    // #D6EAF8
  };
  
  // Exemple de configuration de pagination par défaut
  export const PAGINATION = {
    DEFAULT_PAGE_SIZE: 10,
    PAGE_SIZE_OPTIONS: [5, 10, 20, 50],
  };
  
  // Messages d’erreur ou de feedback global
  export const MESSAGES = {
    LOADING: 'Chargement en cours…',
    ERROR_GENERIC: 'Une erreur est survenue, réessayez plus tard.',
    NO_DATA: 'Aucun élément à afficher.',
  };
  