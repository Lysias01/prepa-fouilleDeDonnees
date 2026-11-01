/* ===================== Parcours de révision (page d'accueil) ===================== */
/* Chaque étape avance toute seule : count et total disent où en est l'étudiant. */
const REVISION_PATH = [
  {
    title: 'Apprendre les définitions',
    desc: 'Retourne les fiches, une par une.',
    href: '#fiches',
    cta: 'Continuer les fiches',
    count: () => Object.keys(store.data.seenCards).length,
    total: () => CARDS.length
  },
  {
    title: 'Comprendre les méthodes',
    desc: 'Apriori, K-means, CAH, gain, Bayes : suis chaque méthode jusqu’à la dernière étape.',
    href: '#methodes',
    cta: 'Continuer les méthodes',
    count: () => Object.keys(store.data.tutos).length,
    total: () => TUTOS.length
  },
  {
    title: 'Répondre aux questions de cours',
    desc: 'QCM et réponses rédigées, dont celles déjà tombées en devoir.',
    href: '#questions',
    cta: 'Continuer les questions',
    count: () => Object.keys(store.data.q).length,
    total: () => QUESTIONS.length
  },
  {
    title: 'S’entraîner sur les exercices',
    desc: 'Réponds, vérifie, puis lis la correction détaillée.',
    href: '#exercices',
    cta: 'Continuer les exercices',
    count: () => Object.keys(store.data.ex).length,
    total: () => EXOS.length
  },
  {
    title: 'Passer les simulations de devoir',
    desc: 'En temps réel, sans document ni calculatrice, notées sur 20.',
    href: '#examen',
    cta: 'Passer une simulation',
    count: () => Math.min(store.data.exams.length, EXAMS.length),
    total: () => EXAMS.length
  }
];
