/* ===================== PROGRAMME DE RATTRAPAGE ===================== */
/* Séances à suivre dans l'ordre. Une tâche est faite quand le site le constate (done ou progress),
   ou quand l'étudiant la coche lui-même (store.data.checks). */
const cardsSeenIn = (ch) => CARDS.filter((c) => c.ch === ch && store.data.seenCards[c.id]).length;
const answeredIn = (ch) => QUESTIONS.filter((q) => q.ch === ch && store.data.q[q.id]).length;
const chapterOf = (ch) => CHAPTERS.find((c) => c.id === ch);

const cardsTask = (ch) => ({
  id: 'cards-' + ch,
  kind: 'Fiches',
  label: `Lire toutes les fiches « ${chapterOf(ch).short} »`,
  href: '#fiches-' + ch,
  progress: () => [cardsSeenIn(ch), CARDS.filter((c) => c.ch === ch).length]
});
const tutoTask = (id) => ({
  id: 'tuto-' + id,
  kind: 'Méthode',
  label: TUTOS.find((t) => t.id === id).title,
  note: 'jusqu’à la dernière étape',
  href: '#methode-' + id,
  done: () => !!store.data.tutos[id]
});
const exoTask = (id) => ({
  id: 'ex-' + id,
  kind: 'Exercice',
  label: EXOS.find((e) => e.id === id).title,
  note: 'clique sur « Vérifier », puis lis la correction',
  href: '#exercice-' + id,
  done: () => store.data.ex[id] != null
});
const questionsTask = (ch, n = 10) => {
  const want = Math.min(n, QUESTIONS.filter((q) => q.ch === ch).length);
  return {
    id: 'q-' + ch,
    kind: 'Questions',
    label: `${want} questions de cours « ${chapterOf(ch).short} »`,
    href: '#questions-' + ch,
    progress: () => [Math.min(answeredIn(ch), want), want]
  };
};
const examTask = (id, note) => {
  const x = EXAMS.find((e) => e.id === id);
  return {
    id: 'exam-' + id,
    kind: 'Simulation 2 h',
    label: x.title,
    note,
    href: '#examen-' + id,
    done: () => store.data.exams.some((r) => r.s === x.title)
  };
};
const manualTask = (id, kind, label, href, note) => ({ id, kind, label, href, note });

const RATTRAPAGE = [
  {
    title: 'Comprendre ton devoir de la session normale',
    time: '≈ 1 h 30',
    why: 'Avant de réviser, regarde ce qui était demandé et où partent les points. Le rattrapage reprend les mêmes chapitres et le même type d’exercices.',
    how: [
      'Ouvre chaque partie, réponds dans les cases ou sur une feuille.',
      'Clique sur « Vérifier », puis lis la correction détaillée.',
      'Note sur une feuille ce que tu ne savais pas faire : les séances suivantes y répondent.'
    ],
    tasks: [exoTask('n25-cours'), exoTask('n25-clust'), exoTask('n25-assoc'), exoTask('n25-classif')]
  },
  {
    title: 'Règles d’association',
    time: '≈ 2 h',
    why: '5 à 6 points à chaque devoir, avec des calculs toujours les mêmes : support, confiance, Apriori.',
    how: [
      'Lis les fiches, puis suis la méthode Apriori jusqu’au bout.',
      'Fais les exercices sans regarder la correction, puis vérifie.'
    ],
    tasks: [
      cardsTask('assoc'),
      tutoTask('apriori'),
      exoTask('ex-biblio'),
      exoTask('ex-patients'),
      questionsTask('assoc')
    ]
  },
  {
    title: 'Clustering : K-means et distances',
    time: '≈ 2 h',
    why: 'Ton devoir utilisait la distance de Manhattan avec K-means. Il faut savoir calculer les distances, affecter les points et recalculer les centres.',
    how: [
      'Commence par la méthode des distances (Manhattan, euclidienne), puis K-means.',
      'Termine par la CAH, qui tombe aussi régulièrement.'
    ],
    tasks: [
      cardsTask('clust'),
      tutoTask('distances'),
      tutoTask('kmeans'),
      exoTask('ex-kmeans-annale'),
      tutoTask('cah'),
      exoTask('ex-cah'),
      questionsTask('clust')
    ]
  },
  {
    title: 'Classification : arbre de décision et Bayes',
    time: '≈ 2 h',
    why: 'Le gain d’information et l’arbre final reviennent à chaque devoir, souvent avec les valeurs I et E déjà données.',
    how: [
      'Suis la méthode du gain, puis refais l’exercice hypertension.',
      'Naïve Bayes complète le chapitre : une méthode et un exercice.'
    ],
    tasks: [
      cardsTask('classif'),
      tutoTask('gain'),
      exoTask('ex-arbre-hyper'),
      tutoTask('bayes'),
      exoTask('ex-bayes'),
      questionsTask('classif')
    ]
  },
  {
    title: 'Questions de cours et préparation des données',
    time: '≈ 1 h 30',
    why: '5 points de cours faciles à prendre : définitions, objectifs des techniques, données manquantes (MCAR, MAR, MNAR).',
    how: [
      'Lis les fiches à voix haute, ou écoute-les avec le bouton « Écouter ».',
      'Rédige les réponses comme sur ta copie avant de voir le modèle.'
    ],
    tasks: [
      cardsTask('intro'),
      cardsTask('prep'),
      tutoTask('manquantes'),
      exoTask('ex-manquantes'),
      questionsTask('intro'),
      questionsTask('prep')
    ]
  },
  {
    title: 'Le code Python',
    time: '≈ 1 h',
    why: 'Une question de code tombe à chaque devoir : reconnaître la ligne qui découpe les données, celle qui entraîne et celles qui évaluent.',
    how: ['Suis la méthode ligne par ligne, puis fais l’exercice.'],
    tasks: [tutoTask('code'), exoTask('ex-code'), questionsTask('code')]
  },
  {
    title: 'Premier devoir blanc',
    time: '2 h + correction',
    why: 'S’entraîner en temps réel, sans document ni calculatrice : c’est là qu’on voit ce qui tient vraiment.',
    how: [
      'Mets-toi au calme, lance le chrono et ne t’arrête pas avant la fin.',
      'Après la correction, revois tes erreurs.'
    ],
    tasks: [
      examTask('A'),
      manualTask('rev-1', 'Questions', 'Revoir mes erreurs', '#questions-rev', 'les questions marquées « à revoir »')
    ]
  },
  {
    title: 'Deuxième devoir blanc',
    time: '2 h + correction',
    why: 'Un autre sujet, avec la CAH et Naïve Bayes : tu couvres tout le programme.',
    how: ['Même conditions que le premier.', 'Pour chaque partie « À retravailler », ouvre la méthode proposée.'],
    tasks: [
      examTask('B'),
      manualTask('rev-2', 'Questions', 'Revoir mes erreurs', '#questions-rev', 'les questions marquées « à revoir »')
    ]
  },
  {
    title: 'Refaire ton devoir en conditions réelles',
    time: '2 h',
    why: 'Le test final : refaire le devoir de la session normale sans aide. Vise au moins 14/20 avant le rattrapage.',
    how: ['Chrono de 2 h, sans regarder les corrections.', 'Compare ta note avec celle de la séance 1.'],
    tasks: [examTask('N25', 'objectif : 14/20 ou plus')]
  },
  {
    title: 'La veille du rattrapage',
    time: '≈ 1 h',
    why: 'Pas de nouvelle notion : on consolide et on se repose.',
    how: ['Relis le mémo et les pièges.', 'Une dernière série sur tes erreurs, puis arrête-toi.'],
    tasks: [
      manualTask('memo', 'Mémo', 'Relire le mémo et les pièges', '#memo'),
      manualTask('rev-3', 'Questions', 'Dernière série sur mes erreurs', '#questions-rev')
    ]
  }
].map((s, i) => ({ ...s, n: i + 1 }));

/* ---------- État du programme ---------- */
const checkKey = (s, t) => `${s.n}:${t.id}`;
const taskProgress = (t) => (t.progress ? t.progress() : null);
function taskDone(s, t) {
  if (store.data.checks[checkKey(s, t)]) return true;
  if (t.done) return t.done();
  const p = taskProgress(t);
  return !!p && p[0] >= p[1];
}
const seanceDoneCount = (s) => s.tasks.filter((t) => taskDone(s, t)).length;
const seanceDone = (s) => seanceDoneCount(s) === s.tasks.length;
const currentSeance = () => RATTRAPAGE.find((s) => !seanceDone(s)) || RATTRAPAGE[RATTRAPAGE.length - 1];
