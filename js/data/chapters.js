const CHAPTERS = [
  { id: 'intro', name: 'Introduction et types d’apprentissage', short: 'Intro' },
  { id: 'assoc', name: 'Règles d’association', short: 'Règles' },
  { id: 'clust', name: 'Clustering', short: 'Clustering' },
  { id: 'classif', name: 'Classification', short: 'Classif.' },
  { id: 'prep', name: 'Qualité et préparation des données', short: 'Données' },
  { id: 'code', name: 'Code Python (lecture et écriture)', short: 'Python' }
];
const chName = (id) => (CHAPTERS.find((c) => c.id === id) || {}).short || id;
