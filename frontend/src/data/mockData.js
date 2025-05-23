// src/data/mockData.js

export const mockLaboratoire = {
  id: 1,
  nom: "Laboratoire d’Informatique et Systèmes",
  description:
    "Un pôle de recherche avancée en informatique, IA, systèmes et sécurité.",
  dateCreation: "2010-01-15",
};

export const mockAxesRecherche = [
  {
    id: 1,
    titre: "Intelligence Artificielle",
    description: "Modèles d’apprentissage automatique et applications IA.",
  },
  {
    id: 2,
    titre: "Sécurité des Réseaux",
    description: "Protocoles de sécurité, intrusion, chiffrement.",
  },
];

export const mockUtilisateurs = [
  {
    id: 1,
    nom: "Fatiha Doula",
    email: "fatiha@lis.ma",
    role: "DIRECTEUR",
    motDePasseHash: "hashed_password_1",
  },
  {
    id: 2,
    nom: "Anas Ouizzane",
    email: "anas@lis.ma",
    role: "RESPONSABLE",
    motDePasseHash: "hashed_password_2",
    avatar: "/avatars/anas.jpg",
    speciality: "Systèmes Embarqués",
    articles: [1, 2],
  },
  {
    id: 3,
    nom: "Yassmine headache",
    email: "yasmine@lis.ma",
    role: "MEMBRE",
    motDePasseHash: "hashed_password_3",
    avatar: "/avatars/yasmine.jpg",
    speciality: "Machine Learning",
    articles: [3],
  },
  {
    id: 4,
    nom: "Sami Tazi",
    email: "sami@lis.ma",
    role: "DOCTORANT",
    motDePasseHash: "hashed_password_4",
    avatar: "/avatars/sami.jpg",
    speciality: "Cybersécurité",
    articles: [],
  },
];

export const mockArticles = [
  {
    id: 1,
    titre: "Optimisation des capteurs intelligents",
    resume: "Un article sur l’optimisation des capteurs IoT",
    contenu: "Contenu détaillé ici...",
    dateSoumission: "2024-04-12",
    statut: "APPROVED",
  },
  {
    id: 2,
    titre: "Temps réel et systèmes embarqués",
    resume: "Systèmes embarqués pour drones médicaux",
    contenu: "Contenu détaillé ici...",
    dateSoumission: "2024-01-08",
    statut: "APPROVED",
  },
  {
    id: 3,
    titre: "Analyse prédictive appliquée aux soins",
    resume: "Utilisation du ML pour l’optimisation des soins médicaux",
    contenu: "Contenu détaillé ici...",
    dateSoumission: "2023-11-22",
    statut: "PENDING",
  },
];

export const mockEquipes = [
  {
    id: 1,
    nom: "Équipe Systèmes Embarqués",
    specialite: "IoT, capteurs intelligents, temps réel",
    objectif:
      "Développer des systèmes embarqués pour la santé et l’environnement",
    dateCreation: "2015-03-10",
    leaderId: 2, // Anas Ouizzane
    membres: [2, 4], // Anas, Sami
    articles: [1, 2],
    axeRechercheId: 1,
  },
  {
    id: 2,
    nom: "Équipe Data Science",
    specialite: "Big Data, ML, Deep Learning",
    objectif:
      "Créer des modèles d’IA appliqués aux domaines médicaux et sociaux",
    dateCreation: "2016-06-21",
    leaderId: 3, // Yasmine
    membres: [3], // Yasmine
    articles: [3],
    axeRechercheId: 1,
  },
  {
    id: 3,
    nom: "Équipe Sécurité Réseaux",
    specialite: "Chiffrement, sécurité IoT, VPN",
    objectif:
      "Protéger les systèmes distribués et les infrastructures critiques",
    dateCreation: "2014-10-02",
    leaderId: null,
    membres: [4], // Sami
    articles: [],
    axeRechercheId: 2,
  },
];

export const mockTheseSoutenues = [
  {
    id: 1,
    titre: "Systèmes embarqués dans la télésanté",
    abstract: "Une thèse sur l’usage de capteurs pour le monitoring patient.",
    dateSoutenance: "2023-07-10",
    doctorantId: 4, // Sami
    jury: [1, 2],
  },
];

export const mockEvenements = [
  {
    id: 1,
    titre: "Conférence IA & Santé",
    type: "INTERNE",
    date: "2024-06-15",
    lieu: "Université Hassan II",
    description: "Événement sur les applications médicales de l’IA",
  },
  {
    id: 2,
    titre: "Séminaire cybersécurité",
    type: "EXTERNE",
    date: "2024-04-10",
    lieu: "ENSA Marrakech",
    description: "Table ronde sur la sécurité dans les objets connectés",
  },
];

export const mockActualites = [
  {
    id: 1,
    titre: "Partenariat avec l’Université de Lyon",
    contenu: "Signature d’un accord de recherche IA appliquée",
    datePublication: "2024-03-15",
  },
  {
    id: 2,
    titre: "Appel à contribution - Revue LIS",
    contenu: "Publication ouverte pour la revue scientifique LIS 2024",
    datePublication: "2024-05-01",
  },
];
