/* ===================== EXAMEN BLANC ===================== */
VIEWS.examen = (main, arg) => {
  if (arg) return renderExam(main, arg);
  const hist = store.data.exams || [];
  main.append(
    h(`<div class="view">
    <div class="stack"><span class="eyebrow">Conditions réelles</span><h1>Examen blanc</h1><p class="lead">2 heures, sans document ni calculatrice. Rédige sur une feuille ou dans les cases. À la fin, clique sur « Terminer et corriger » : les calculs sont corrigés automatiquement, et tu notes toi-même les réponses rédigées en les comparant au corrigé.</p></div>
    <div class="grid g2">${EXAMS.map((x) => `<div class="sheet margin stack"><h2>${x.title}</h2><p class="muted">${x.desc}</p><p class="mono small">Durée : ${x.dur} min · noté sur 20</p><a class="btn primary" style="align-self:flex-start" href="#examen-${x.id}">Commencer le ${x.title.toLowerCase()}</a></div>`).join('')}</div>
    <div class="sheet stack"><h3>Tes notes</h3>${
      hist.length
        ? `<div class="hist">${hist
            .slice()
            .reverse()
            .map(
              (r) =>
                `<span>${new Date(r.d).toLocaleString('fr-FR', { weekday: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })} · ${r.s} · <b>${fmt(r.n, 1)}/20</b> · ${r.m} min</span>`
            )
            .join('')}</div>`
        : '<p class="muted">Aucun examen blanc terminé pour l’instant.</p>'
    }</div>
  </div>`)
  );
};
const sectionVerdict = (ratio) =>
  ratio >= 0.75
    ? { v: 'Acquis', cls: 'yes' }
    : ratio >= 0.5
      ? { v: 'Fragile', cls: '' }
      : { v: 'À retravailler', cls: 'bad2' };

function renderExam(main, id) {
  const x = EXAMS.find((e) => e.id === id);
  if (!x) {
    location.hash = '#examen';
    return;
  }
  const secs = x.sections();
  const start = Date.now();
  let done = false;
  const v = h(`<div class="view">
    <div class="stack"><a href="#examen" class="small">← Examens blancs</a><span class="eyebrow">IBAM · Master 1 · Fouille de données et apprentissage automatique</span><h1>Devoir blanc · ${x.title}</h1><p class="muted">Durée : 2 h. Documents et calculatrice non autorisés. Le barème est indiqué pour chaque question.</p></div>
    <div class="examsticky"><span class="timer" id="timer">2:00:00</span><span class="small muted" id="examinfo">Temps restant</span><button class="btn primary" id="finish">Terminer et corriger</button></div>
    <div id="secs" class="stack"></div>
    <div id="result"></div>
  </div>`);
  main.append(v);
  const box = $('#secs', v);
  const total = () => secs.reduce((a, s) => a + s.parts.reduce((b, p) => b + (partScore(p) || 0), 0), 0);
  const renderResult = () => {
    const n = total();
    const r = $('#result', v);
    r.innerHTML = '';
    const rows = secs.map((s) => {
      const sc = s.parts.reduce((b, p) => b + (partScore(p) || 0), 0);
      return [s.title, `${fmt(sc, 2)} / ${fmt(s.pts)}`, sectionVerdict(sc / s.pts)];
    });
    r.append(
      h(
        `<div class="sheet margin stack"><span class="eyebrow">Résultat</span><div class="note20">${fmt(n, 1)}<span class="muted" style="font-size:.4em"> / 20</span></div><p class="muted">Note les réponses rédigées (boutons « Je me note ») : la note se met à jour.</p>${table(['Partie', 'Points', 'Bilan'], rows)}<p>${n >= 15 ? 'Objectif 15/20 atteint. Garde ce niveau avec le mémo et les questions « À revoir ».' : 'Objectif : 15/20. Reprends les méthodes des parties « À retravailler », puis refais les exercices associés.'}</p><div class="row"><button class="btn primary" id="save">Enregistrer cette note</button><a class="btn" href="#examen">Retour</a></div></div>`
      )
    );
    $('#save', r).onclick = () => {
      store.data.exams = store.data.exams || [];
      store.data.exams.push({
        s: x.title,
        n: Math.round(total() * 10) / 10,
        d: Date.now(),
        m: Math.round((Date.now() - start) / 60000)
      });
      store.save();
      toast('Note enregistrée');
    };
  };
  secs.forEach((s) => {
    const sh = h(
      `<section class="sheet margin stack"><div class="qhead"><h2>${s.title}</h2><span class="pts">${fmt(s.pts)} pts</span></div>${s.intro ? `<div class="prose" style="max-width:none">${s.intro}</div>` : ''}<div class="pz"></div></section>`
    );
    box.append(sh);
    renderParts($('.pz', sh), s.parts, 'exam', () => {
      if (done) renderResult();
    });
  });
  const tEl = $('#timer', v);
  const tick = () => {
    const left = x.dur * 60000 - (Date.now() - start);
    if (left <= 0) {
      tEl.textContent = '0:00:00';
      $('#examinfo', v).textContent = 'Temps écoulé';
      return;
    }
    const hh = Math.floor(left / 3600000),
      mm = Math.floor((left % 3600000) / 60000),
      ss = Math.floor((left % 60000) / 1000);
    tEl.textContent = `${hh}:${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}`;
  };
  tick();
  const timer = setInterval(tick, 1000);
  onViewLeave(() => clearInterval(timer));
  $('#finish', v).onclick = () => {
    if (done) {
      $('#result', v).scrollIntoView({ behavior: 'smooth' });
      return;
    }
    done = true;
    clearInterval(timer);
    $('#examinfo', v).textContent = 'Copie rendue';
    secs.forEach((s) => s.parts.forEach((p) => p._finish()));
    renderResult();
    $('#finish', v).textContent = 'Voir ma note';
    $('#result', v).scrollIntoView({ behavior: 'smooth' });
  };
}
