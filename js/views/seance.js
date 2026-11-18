/* ===================== SÉANCE DU PROGRAMME ===================== */
const seanceStatus = (s) =>
  seanceDone(s) ? 'done' : s === currentSeance() ? 'current' : seanceDoneCount(s) ? 'started' : 'todo';

const taskRowHTML = (s, t, isNext) => {
  const done = taskDone(s, t);
  const p = taskProgress(t);
  return `<div class="task ${done ? 'done' : ''} ${isNext ? 'next' : ''}">
    <label class="task-check" title="Cocher si tu l’as fait"><input type="checkbox" data-check="${checkKey(s, t)}" ${done ? 'checked' : ''}><span class="sr">Fait</span></label>
    <div class="stack" style="gap:2px;min-width:0"><span class="task-kind">${t.kind}</span><b>${t.label}</b>${t.note ? `<span class="small muted">${t.note}</span>` : ''}${p ? `<span class="task-progress"><span class="progress"><i style="width:${(p[0] / p[1]) * 100}%"></i></span><span class="mono small">${p[0]}/${p[1]}</span></span>` : ''}</div>
    <a class="btn ${isNext ? 'primary' : ''}" href="${t.href}">${done ? 'Revoir' : isNext ? 'Commencer' : 'Ouvrir'}</a>
  </div>`;
};

VIEWS.seance = (main, arg) => {
  const s = RATTRAPAGE[+arg - 1];
  if (!s) {
    location.hash = '#accueil';
    return;
  }
  store.data.activeSeance = s.n;
  store.save();
  const next = s.tasks.find((t) => !taskDone(s, t));
  const prev = RATTRAPAGE[s.n - 2],
    after = RATTRAPAGE[s.n];
  const v = h(`<div class="view">
    <div class="stack"><a href="#accueil" class="small">← Mon programme</a><span class="eyebrow">Séance ${s.n} sur ${RATTRAPAGE.length} · ${s.time}</span><h1>${s.title}</h1><p class="lead">${s.why}</p></div>
    ${seanceDone(s) ? `<div class="feedback ok"><span class="verdict">Séance terminée. Bravo !</span>${after ? `<a class="btn primary" style="align-self:flex-start" href="#seance-${after.n}">Passer à la séance ${after.n} : ${after.title} →</a>` : '<span>Tu as terminé tout le programme. Garde le rythme avec le mémo et tes erreurs.</span>'}</div>` : ''}
    <section class="sheet stack"><h3>Comment faire</h3><ol class="prose">${s.how.map((x) => `<li>${x}</li>`).join('')}</ol></section>
    <section class="sheet stack"><div class="row between"><h2>À faire</h2><span class="mono small muted">${seanceDoneCount(s)}/${s.tasks.length} faites</span></div>
      <div class="tasks">${s.tasks.map((t) => taskRowHTML(s, t, t === next)).join('')}</div>
      <p class="small muted">Les tâches se cochent toutes seules quand tu les termines. Tu peux aussi les cocher toi-même.</p>
    </section>
    <div class="row between">${prev ? `<a class="btn ghost" href="#seance-${prev.n}">← Séance ${prev.n}</a>` : '<span></span>'}${after ? `<a class="btn" href="#seance-${after.n}">Séance ${after.n} →</a>` : ''}</div>
  </div>`);
  main.append(v);
  $$('[data-check]', v).forEach((c) => {
    c.onchange = () => {
      if (c.checked) store.data.checks[c.dataset.check] = 1;
      else delete store.data.checks[c.dataset.check];
      store.save();
      route();
    };
  });
};

/* Bandeau de retour vers la séance en cours, sur les pages ouvertes depuis le programme */
function seanceBarHTML() {
  const s = RATTRAPAGE[(store.data.activeSeance || 0) - 1];
  if (!s) return '';
  return `<a class="seance-bar" href="#seance-${s.n}"><span>← Séance ${s.n} : ${s.title}</span><span class="mono small">${seanceDoneCount(s)}/${s.tasks.length}</span></a>`;
}
