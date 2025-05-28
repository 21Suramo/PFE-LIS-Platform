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
    avatar: "/avatars/fatiha.jpg",
    speciality: "Administration",
    articles: [],
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
    nom: "Yassmine Headache",
    email: "yasmine@lis.ma",
    role: "MEMBRE",
    motDePasseHash: "hashed_password_3",
    avatar: "/avatars/yasmine.jpg",
    speciality: "Machine Learning",
    articles: [3, 4],
  },
  {
    id: 4,
    nom: "Sami Tazi",
    email: "sami@lis.ma",
    role: "DOCTORANT",
    motDePasseHash: "hashed_password_4",
    avatar: "/avatars/sami.jpg",
    speciality: "Cybersécurité",
    articles: [5],
  },
];

export const mockArticles = [
  // Anas Ouizzane, Systèmes Embarqués
  {
    id: 1,
    titre: "Optimisation des capteurs intelligents",
    resume: "Un article sur l’optimisation des capteurs IoT.",
    contenu: "Détail de la recherche sur les réseaux de capteurs.",
    dateSoumission: "2024-04-12",
    statut: "APPROVED",
    equipe: "Équipe Systèmes Embarqués",
    auteur: "Anas Ouizzane",
  },
  {
    id: 2,
    titre: "Temps réel et systèmes embarqués",
    resume: "Systèmes embarqués pour drones médicaux.",
    contenu: "Étude sur les systèmes embarqués temps réel pour la santé.",
    dateSoumission: "2024-01-08",
    statut: "APPROVED",
    equipe: "Équipe Systèmes Embarqués",
    auteur: "Anas Ouizzane",
  },
  {
    id: 6,
    titre: "Automatisation de l'industrie par IoT",
    resume: "Étude de l'impact de l'IoT sur la production industrielle.",
    contenu: "Retour d'expérience sur la maintenance prédictive.",
    dateSoumission: "2024-04-29",
    statut: "PENDING",
    equipe: "Équipe Systèmes Embarqués",
    auteur: "Anas Ouizzane",
  },
  {
    id: 7,
    titre: "Surveillance environnementale intelligente",
    resume: "Détection en temps réel de la pollution par réseaux de capteurs.",
    contenu: "Méthodes et résultats des déploiements terrain.",
    dateSoumission: "2024-03-30",
    statut: "APPROVED",
    equipe: "Équipe Systèmes Embarqués",
    auteur: "Anas Ouizzane",
  },

  // Yassmine Headache, Data Science
  {
    id: 3,
    titre: "Analyse prédictive appliquée aux soins",
    resume: "Utilisation du ML pour l’optimisation des soins médicaux.",
    contenu: "Exploration de modèles ML en santé.",
    dateSoumission: "2023-11-22",
    statut: "PENDING",
    equipe: "Équipe Data Science",
    auteur: "Yassmine Headache",
  },
  {
    id: 4,
    titre: "Apprentissage fédéré pour données médicales",
    resume: "Protection des données patients par apprentissage fédéré.",
    contenu: "Algorithmes, expériences et limites.",
    dateSoumission: "2024-02-18",
    statut: "PENDING",
    equipe: "Équipe Data Science",
    auteur: "Yassmine Headache",
  },
  {
    id: 8,
    titre: "Classification automatique de documents",
    resume: "Réseaux de neurones pour la catégorisation de rapports.",
    contenu: "Comparaison d'architectures, résultats expérimentaux.",
    dateSoumission: "2024-04-02",
    statut: "APPROVED",
    equipe: "Équipe Data Science",
    auteur: "Yassmine Headache",
  },
  {
    id: 9,
    titre: "Détection de fraudes bancaires par IA",
    resume: "Système expert d'analyse d'opérations suspectes.",
    contenu: "Méthodologie et cas d'usages réels.",
    dateSoumission: "2024-05-14",
    statut: "APPROVED",
    equipe: "Équipe Data Science",
    auteur: "Yassmine Headache",
  },
  {
    id: 10,
    titre: "Évaluation d'algorithmes de clustering",
    resume: "Étude comparative sur des données hospitalières.",
    contenu: "Présentation des métriques, visualisation des résultats.",
    dateSoumission: "2024-03-20",
    statut: "PENDING",
    equipe: "Équipe Data Science",
    auteur: "Yassmine Headache",
  },

  // Sami Tazi, Sécurité Réseaux
  {
    id: 5,
    titre: "Cryptographie quantique appliquée",
    resume: "Sécurité accrue par protocoles quantiques.",
    contenu: "Défis, applications, expériences en environnement IoT.",
    dateSoumission: "2024-03-22",
    statut: "APPROVED",
    equipe: "Équipe Sécurité Réseaux",
    auteur: "Sami Tazi",
  },
  {
    id: 11,
    titre: "Détection d'intrusions dans les réseaux industriels",
    resume: "Systèmes IDS adaptés à l'industrie 4.0.",
    contenu: "Propositions d'architectures sécurisées.",
    dateSoumission: "2024-02-18",
    statut: "APPROVED",
    equipe: "Équipe Sécurité Réseaux",
    auteur: "Sami Tazi",
  },
  {
    id: 12,
    titre: "Chiffrement homomorphe pour le cloud",
    resume: "Protection des données lors de traitements cloud.",
    contenu: "Implémentations, benchmarks, recommandations.",
    dateSoumission: "2024-01-11",
    statut: "PENDING",
    equipe: "Équipe Sécurité Réseaux",
    auteur: "Sami Tazi",
  },
  {
    id: 13,
    titre: "Sécurité de l'edge computing",
    resume: "Approche décentralisée de la cybersécurité.",
    contenu: "Cas d'usages IoT et mobile.",
    dateSoumission: "2024-06-02",
    statut: "APPROVED",
    equipe: "Équipe Sécurité Réseaux",
    auteur: "Sami Tazi",
  },

  // Autres membres, diversité
  {
    id: 14,
    titre: "Gestion intelligente de l'énergie dans les smart grids",
    resume: "Optimisation IA de la consommation électrique.",
    contenu: "Résultats sur des micro-réseaux pilotes.",
    dateSoumission: "2024-05-20",
    statut: "APPROVED",
    equipe: "Équipe Systèmes Embarqués",
    auteur: "Fatiha Doula",
  },
  {
    id: 15,
    titre: "Vision par ordinateur pour la santé",
    resume: "Diagnostic médical assisté par Deep Learning.",
    contenu: "Détection automatique sur imagerie médicale.",
    dateSoumission: "2024-03-08",
    statut: "PENDING",
    equipe: "Équipe Data Science",
    auteur: "Yassmine Headache",
  },
  {
    id: 16,
    titre: "Analyse de la résilience des réseaux face aux cyberattaques",
    resume: "Expérimentation de scénarios de cyber-crise.",
    contenu: "Résultats de simulations et recommandations.",
    dateSoumission: "2024-05-01",
    statut: "APPROVED",
    equipe: "Équipe Sécurité Réseaux",
    auteur: "Sami Tazi",
  },
  {
    id: 17,
    titre: "Intégration des agents intelligents dans les smart buildings",
    resume: "Automatisation et monitoring avancés.",
    contenu: "Cas pratiques sur campus universitaire.",
    dateSoumission: "2024-02-28",
    statut: "PENDING",
    equipe: "Équipe Systèmes Embarqués",
    auteur: "Anas Ouizzane",
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
    membres: [2, 4],
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
    leaderId: 3, // Yassmine
    membres: [3],
    articles: [3, 4],
    axeRechercheId: 1,
  },
  {
    id: 3,
    nom: "Équipe Sécurité Réseaux",
    specialite: "Chiffrement, sécurité IoT, VPN",
    objectif:
      "Protéger les systèmes distribués et les infrastructures critiques",
    dateCreation: "2014-10-02",
    leaderId: 4, // Sami
    membres: [4],
    articles: [5],
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
    origine: "INTERNE",
    date: "2024-06-15",
    lieu: "Université Hassan II",
    categorie: "Conférence en présentiel",
    description:
      "Applications de l’intelligence artificielle dans le domaine de la santé.",
    imageUrl: "/evenements/iasante.jpg",
  },
  {
    id: 2,
    titre: "Séminaire interne Deep Learning",
    type: "INTERNE",
    origine: "INTERNE",
    date: "2024-07-12",
    lieu: "LIS",
    categorie: "Séminaire",
    description:
      "Formation avancée sur le Deep Learning pour les membres du laboratoire.",
    imageUrl: "/evenements/deeplearning.jpg",
  },
  {
    id: 3,
    titre: "Soutenance de thèse - Sami Tazi",
    type: "INTERNE",
    origine: "INTERNE",
    date: "2024-06-28",
    lieu: "Amphi 1",
    categorie: "Soutenance",
    description: "Systèmes embarqués et télésanté : cas d’usage réels.",
    imageUrl: "/evenements/soutenance.jpg",
  },
  {
    id: 4,
    titre: "Atelier cybersécurité",
    type: "INTERNE",
    origine: "INTERNE",
    date: "2024-05-20",
    lieu: "Salle 204",
    categorie: "Atelier",
    description: "Protéger les objets connectés dans l'industrie 4.0.",
    imageUrl: "/evenements/cybersecurite.jpg",
  },
  {
    id: 5,
    titre: "Conférence Data Science en ligne",
    type: "INTERNE",
    origine: "INTERNE",
    date: "2024-07-02",
    lieu: "En ligne",
    categorie: "Conférence en ligne",
    description:
      "Conférence interactive autour des modèles prédictifs et de la santé numérique.",
    imageUrl: "/evenements/datascience-stream.jpg",
    streamingUrl: "https://www.youtube.com/live/DSConf2024",
  },
  {
    id: 6,
    titre: "Webinar sécurité IoT",
    type: "INTERNE",
    origine: "INTERNE",
    date: "2024-06-22",
    lieu: "En ligne",
    categorie: "Conférence en ligne",
    description: "Table ronde sur les bonnes pratiques de sécurité pour l’IoT.",
    imageUrl: "/evenements/iot-stream.jpg",
    streamingUrl: "https://zoom.us/j/1234567890",
  },
  {
    id: 7,
    titre: "Journée porte ouverte LIS",
    type: "INTERNE",
    origine: "INTERNE",
    date: "2024-06-10",
    lieu: "LIS",
    categorie: "Journée porte ouverte",
    description:
      "Venez découvrir les projets de nos équipes et rencontrer les membres du laboratoire.",
    imageUrl: "/evenements/openlis.jpg",
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
  {
    id: 3,
    titre: "Projet labellisé au Maroc Digital",
    contenu: "Le LIS est lauréat du concours national pour la digitalisation.",
    datePublication: "2024-06-01",
  },
];
