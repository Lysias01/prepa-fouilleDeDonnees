/* ===================== Routage ===================== */
/* Chaque vue s'enregistre dans VIEWS sous le nom de sa route : #nom ou #nom-argument. */
const VIEWS = {};
const TAB_OF_VIEW = {
  accueil: 'accueil',
  fiches: 'fiches',
  questions: 'questions',
  methodes: 'methodes',
  methode: 'methodes',
  exercices: 'exercices',
  exercice: 'exercices',
  examen: 'examen',
  memo: 'memo'
};

/* Une vue qui lance un minuteur ou un écouteur global le déclare ici pour qu'il s'arrête quand on la quitte. */
let leaveView = null;
function onViewLeave(fn) {
  leaveView = fn;
}

function route() {
  const raw = (location.hash || '#accueil').slice(1);
  let name = raw,
    arg = null;
  const m = raw.match(/^(methode|exercice|examen)-(.+)$/);
  if (m) {
    name = m[1];
    arg = m[2];
  }
  const fn = VIEWS[name] || VIEWS.accueil;
  const main = $('#main');
  main.innerHTML = '';
  if (leaveView) {
    leaveView();
    leaveView = null;
  }
  fn(main, arg);
  const tab = TAB_OF_VIEW[name] || 'accueil';
  $$('.tabs a').forEach((a) => a.setAttribute('aria-current', a.dataset.tab === tab ? 'page' : 'false'));
  window.scrollTo(0, 0);
}
