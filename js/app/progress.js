/* ===================== Progression ===================== */
const DAILY_GOAL = 15;

/* Date locale : une journée de révision se termine à minuit chez l'étudiant, pas à minuit UTC. */
const dayKey = (d = new Date()) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

/* Maîtrise d'un chapitre (ou de tout le cours) : juste = 1, à moitié = 0,5, sur toutes ses questions. */
function mastery(ch) {
  const qs = QUESTIONS.filter((q) => !ch || q.ch === ch);
  let s = 0;
  qs.forEach((q) => {
    const r = store.data.q[q.id];
    if (r) s += r.r === 'ok' ? 1 : r.r === 'mid' ? 0.5 : 0;
  });
  return qs.length ? s / qs.length : 0;
}

const errorCount = () => Object.values(store.data.q).filter((r) => r.r !== 'ok').length;
const todayCount = () => store.data.days[dayKey()] || 0;

function logActivity() {
  const k = dayKey();
  store.data.days[k] = (store.data.days[k] || 0) + 1;
  if (store.data.days[k] === DAILY_GOAL) toast('Objectif du jour atteint. Bravo !');
}

/* Jours consécutifs de révision. Aujourd'hui ne casse pas la série tant que la journée n'est pas finie. */
function streakDays() {
  const d = new Date();
  if (!store.data.days[dayKey(d)]) d.setDate(d.getDate() - 1);
  let n = 0;
  while (store.data.days[dayKey(d)]) {
    n++;
    d.setDate(d.getDate() - 1);
  }
  return n;
}

const bestExamNote = () => (store.data.exams.length ? Math.max(...store.data.exams.map((r) => r.n)) : null);
