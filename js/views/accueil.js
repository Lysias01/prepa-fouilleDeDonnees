/* ===================== ACCUEIL : LE PROGRAMME DE RATTRAPAGE ===================== */
/* Question du jour : la même toute la journée, une nouvelle chaque jour (QCM à une seule réponse). */
function questionOfTheDay() {
  const qcms = QUESTIONS.filter((q) => q.type === 'qcm' && !Array.isArray(q.a));
  const [y, m, d] = dayKey().split('-').map(Number);
  return qcms[Math.floor(Date.UTC(y, m - 1, d) / 86400000) % qcms.length];
}

function renderQuestionOfTheDay(box) {
  const doneHTML = '<p class="muted">Faite pour aujourd’hui. Une nouvelle t’attend demain.</p>';
  if (store.data.qday === dayKey()) {
    box.append(h(doneHTML));
    return;
  }
  const q = questionOfTheDay();
  box.append(h(`<p class="qtext">${q.q}</p>`));
  const zone = h('<div class="stack"></div>');
  box.append(zone);
  renderQcm(q, zone, () => {
    store.data.qday = dayKey();
    store.save();
  });
}

const chapterCardHTML = (c) => {
  const v = mastery(c.id);
  return `<div class="chap-card" style="${chStyle(c.id)}">${ring(v * 100, Math.round(v * 100) + '%')}<div class="stack" style="gap:2px"><b class="name">${c.name}</b><div class="chap-links"><a href="#fiches-${c.id}">Fiches</a><a href="#questions-${c.id}">Questions</a></div></div></div>`;
};

function resumeBannerHTML() {
  const draft = store.data.examDraft;
  if (!draft) return '';
  const x = EXAMS.find((e) => e.id === draft.id);
  return `<div class="resume"><span><b>Simulation en cours :</b> ${x.title}, il reste ${fmtClock(examTimeLeft(draft))}.</span><a class="btn primary" href="#examen-${draft.id}">Reprendre ma copie</a></div>`;
}

const STATUS_LABEL = { done: 'Terminée', current: 'À faire maintenant', started: 'Commencée', todo: 'À venir' };
const seanceRowHTML = (s) => {
  const st = seanceStatus(s);
  return `<a class="plan-step ${st}" href="#seance-${s.n}"><span class="plan-num">${st === 'done' ? '✓' : s.n}</span><span class="stack" style="gap:1px;min-width:0"><b>${s.title}</b><span class="small muted">${s.time} · ${seanceDoneCount(s)}/${s.tasks.length} tâches</span></span><span class="plan-status">${STATUS_LABEL[st]}</span></a>`;
};

VIEWS.accueil = (main) => {
  const cur = currentSeance();
  const doneSeances = RATTRAPAGE.filter(seanceDone).length;
  const started = RATTRAPAGE.some((s) => seanceDoneCount(s));
  const nextTasks = cur.tasks.filter((t) => !taskDone(cur, t)).slice(0, 3);
  const today = todayCount(),
    streak = streakDays(),
    best = bestExamNote();
  const v = h(`<div class="view">
    ${resumeBannerHTML()}
    <section class="hero">
      <div class="hero-main">
        <span class="hero-glyphs" aria-hidden="true">Σ∪→</span>
        <span class="eyebrow">Session de rattrapage · Fouille de données et apprentissage automatique</span>
        <h1>${started ? 'On reprend là où tu en étais.' : 'On prépare ton rattrapage, étape par étape.'}</h1>
        <p class="lead">Suis les séances dans l’ordre : chacune te dit quoi faire, pourquoi, et combien de temps ça prend. Tu n’as rien à choisir.</p>
        <div class="hero-progress"><div class="progress"><i style="width:${(doneSeances / RATTRAPAGE.length) * 100}%"></i></div><span class="small">${doneSeances} séance${doneSeances > 1 ? 's' : ''} terminée${doneSeances > 1 ? 's' : ''} sur ${RATTRAPAGE.length}</span></div>
        <div class="row"><a class="btn" href="#seance-${cur.n}">${started ? 'Continuer' : 'Commencer'} : séance ${cur.n} →</a></div>
      </div>
      <div class="sheet now">
        <span class="eyebrow">À faire maintenant</span>
        <h3>Séance ${cur.n} · ${cur.title}</h3>
        <div class="stack" style="gap:8px">${nextTasks.map((t, i) => `<a class="now-task ${i ? '' : 'first'}" href="${t.href}"><span class="task-kind">${t.kind}</span><span>${t.label}</span></a>`).join('') || '<p class="muted">Tout est fait pour cette séance.</p>'}</div>
        <a class="small" href="#seance-${cur.n}">Voir toute la séance</a>
      </div>
    </section>
    <details class="sheet howto" ${started ? '' : 'open'}><summary><b>Comment utiliser ce site</b></summary>
      <ol class="prose">
        <li><b>Ouvre la séance proposée</b> (bouton jaune ci-dessus) et fais ses tâches de haut en bas.</li>
        <li>Chaque tâche ouvre une fiche, une méthode expliquée pas à pas, un exercice corrigé ou des questions. Un bandeau en haut de la page te ramène à ta séance.</li>
        <li>Les tâches se cochent toutes seules. Quand la séance est finie, la suivante s’affiche.</li>
        <li>Pas envie de lire ? Le bouton <b>Écouter</b> lit les pages à voix haute.</li>
      </ol>
    </details>
    <section class="sheet stack"><h2>Ton programme en ${RATTRAPAGE.length} séances</h2><div class="plan">${RATTRAPAGE.map(seanceRowHTML).join('')}</div></section>
    <section class="sheet stack n25">
      <span class="eyebrow">Ton devoir de la session normale (2025-2026)</span>
      <p>Les quatre parties, avec l’énoncé et un corrigé détaillé, plus la possibilité de le refaire en 2 h.</p>
      <div class="row"><a class="btn primary" href="#exercice-n25-cours">Voir le corrigé guidé</a><a class="btn" href="#examen-N25">Le refaire en 2 h</a></div>
    </section>
    <section class="grid g2">
      <div class="sheet today">
        <div class="today-top">${ring(Math.min(today / DAILY_GOAL, 1) * 100, `${today}/${DAILY_GOAL}`)}<div class="stack" style="gap:2px"><h3>Objectif du jour</h3><span class="small muted">${today >= DAILY_GOAL ? 'Atteint. Tout ce que tu fais en plus est du bonus.' : `Encore ${DAILY_GOAL - today} question${DAILY_GOAL - today > 1 ? 's' : ''} aujourd’hui.`}</span></div></div>
        <div class="stats">
          <div class="stat"><b>${streak}</b><span>jour${streak > 1 ? 's' : ''} d’affilée</span></div>
          <div class="stat"><b>${Math.round(mastery() * 100)} %</b><span>du cours maîtrisé</span></div>
          <div class="stat"><b>${best == null ? '–' : fmt(best, 1)}</b><span>meilleure note /20</span></div>
        </div>
      </div>
      <section class="sheet qday"><div class="row between"><span class="eyebrow">Question du jour</span>${listenIcon('qday')}</div><div class="stack" id="qday"></div></section>
    </section>
    <section class="stack"><h2>Par chapitre</h2><div class="chap-grid">${CHAPTERS.map(chapterCardHTML).join('')}</div></section>
    <div class="tip"><span class="hand">Ce qui tombe au devoir :</span> 4 parties de 5 points : questions de cours, clustering, règles d’association, classification avec une question de code Python. Durée : 2 h, sans document ni calculatrice.</div>
  </div>`);
  main.append(v);
  renderQuestionOfTheDay($('#qday', v));
  bindListen(v, 'qday', () => Reader.play(Reader.blocks($('#qday', v)), { owner: 'qday' }));
};
