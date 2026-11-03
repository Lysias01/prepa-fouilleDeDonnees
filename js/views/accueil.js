/* ===================== ACCUEIL ===================== */
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
    zone.append(
      h('<a class="btn primary" style="align-self:flex-start" href="#questions">Continuer avec une série →</a>')
    );
  });
}

const chapterCardHTML = (c) => {
  const v = mastery(c.id);
  return `<div class="chap-card" style="${chStyle(c.id)}">${ring(v * 100, Math.round(v * 100) + '%')}<div class="stack" style="gap:2px"><b class="name">${c.name}</b><div class="chap-links"><a href="#fiches-${c.id}">Fiches</a><a href="#questions-${c.id}">Questions</a></div></div></div>`;
};

const pathStepHTML = (s, i, current) => {
  const n = s.count(),
    tot = s.total(),
    done = n >= tot;
  return `<a class="path-step ${done ? 'done' : s === current ? 'current' : ''}" href="${s.href}"><span class="path-num">${done ? '✓' : i + 1}</span><span class="stack" style="gap:1px"><b>${s.title}</b><span class="small muted">${s.desc}</span></span><span class="path-count">${n}/${tot}</span></a>`;
};

function resumeBannerHTML() {
  const draft = store.data.examDraft;
  if (!draft) return '';
  const x = EXAMS.find((e) => e.id === draft.id);
  return `<div class="resume"><span><b>Simulation en cours :</b> ${x.title}, il reste ${fmtClock(examTimeLeft(draft))}.</span><a class="btn primary" href="#examen-${draft.id}">Reprendre ma copie</a></div>`;
}

VIEWS.accueil = (main) => {
  const next = REVISION_PATH.find((s) => s.count() < s.total()) || REVISION_PATH[REVISION_PATH.length - 1];
  const today = todayCount(),
    streak = streakDays(),
    errors = errorCount(),
    best = bestExamNote();
  const v = h(`<div class="view">
    ${resumeBannerHTML()}
    <section class="hero">
      <div class="hero-main">
        <span class="hero-glyphs" aria-hidden="true">Σ∪→</span>
        <span class="eyebrow">Fouille de données et apprentissage automatique · M1 IBAM</span>
        <h1>${today ? 'Belle lancée, on continue.' : 'On révise un peu ?'}</h1>
        <p class="lead">Dix minutes suffisent : quelques questions, une méthode, et ta progression avance.</p>
        <div class="row"><a class="btn" href="${next.href}">${next.cta} →</a>${errors ? `<button class="btn alt" id="reviewErrors">Revoir mes ${errors} erreur${errors > 1 ? 's' : ''}</button>` : `<a class="btn alt" href="#questions">Série de 10 questions</a>`}</div>
      </div>
      <div class="sheet today">
        <div class="today-top">${ring(Math.min(today / DAILY_GOAL, 1) * 100, `${today}/${DAILY_GOAL}`)}<div class="stack" style="gap:2px"><h3>Objectif du jour</h3><span class="small muted">${today >= DAILY_GOAL ? 'Atteint. Tout ce que tu fais en plus est du bonus.' : `Encore ${DAILY_GOAL - today} question${DAILY_GOAL - today > 1 ? 's' : ''} aujourd’hui.`}</span></div></div>
        <div class="stats">
          <div class="stat"><b>${streak}</b><span>jour${streak > 1 ? 's' : ''} d’affilée</span></div>
          <div class="stat"><b>${Math.round(mastery() * 100)} %</b><span>du cours maîtrisé</span></div>
          <div class="stat"><b>${best == null ? '–' : fmt(best, 1)}</b><span>meilleure note /20</span></div>
        </div>
      </div>
    </section>
    <section class="sheet qday"><div class="row between"><span class="eyebrow">Question du jour</span>${listenIcon('qday')}</div><div class="stack" id="qday"></div></section>
    <section class="stack"><h2>Par chapitre</h2><div class="chap-grid">${CHAPTERS.map(chapterCardHTML).join('')}</div></section>
    <section class="sheet stack">
      <h2>Ton parcours</h2>
      <div class="path">${REVISION_PATH.map((s, i) => pathStepHTML(s, i, next)).join('')}</div>
      <div class="tip"><span class="hand">Ce qui tombe à chaque devoir :</span> questions de cours (3 à 6 pts), règles d’association (6 pts), clustering (4 à 8 pts), arbre de décision (7 à 8 pts) et une question de code Python.</div>
    </section>
  </div>`);
  main.append(v);
  renderQuestionOfTheDay($('#qday', v));
  bindListen(v, 'qday', () => Reader.play(Reader.blocks($('#qday', v)), { owner: 'qday' }));
  const rev = $('#reviewErrors', v);
  if (rev) {
    rev.onclick = () => {
      qState.ch = 'all';
      qState.mode = 'rev';
      buildDeck();
      location.hash = '#questions';
    };
  }
};
