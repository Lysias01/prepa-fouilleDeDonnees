/* ===================== SIMULATION DE DEVOIR ===================== */
/* Durées relevées dans les anciens devoirs : 2 h pour trois d'entre eux, 2 h 30 pour celui de 2023-2024. */
const EXAM_DURATIONS = [
  { min: 120, label: '2 h', note: 'Comme 3 anciens devoirs sur 4' },
  { min: 150, label: '2 h 30', note: 'Comme le devoir 2023-2024' }
];
const TIME_ALERTS = [30, 10, 5, 1];
const WARN_BELOW_MIN = 30;
const DANGER_BELOW_MIN = 5;

/* La copie en cours (store.data.examDraft) survit à un rechargement : le temps continue comme dans une vraie salle,
   sauf si l'étudiant a mis en pause. elapsed = temps déjà écoulé, resumedAt = dernier départ du chrono (null en pause). */
const examElapsed = (s) => s.elapsed + (s.resumedAt ? Date.now() - s.resumedAt : 0);
const examTimeLeft = (s) => Math.max(0, s.dur * 60000 - examElapsed(s));
const fmtDuration = (min) =>
  min % 60 ? `${Math.floor(min / 60)} h ${String(min % 60).padStart(2, '0')}` : `${min / 60} h`;
const fmtClock = (ms) => {
  const hh = Math.floor(ms / 3600000),
    mm = Math.floor((ms % 3600000) / 60000),
    ss = Math.floor((ms % 60000) / 1000);
  return `${hh}:${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}`;
};

const histRowHTML = (r) =>
  `<div class="hist-row"><span>${new Date(r.d).toLocaleString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })} · ${r.s} · ${r.m} min</span><div class="progress"><i style="width:${(r.n / 20) * 100}%"></i></div><b>${fmt(r.n, 1)}/20</b></div>`;

VIEWS.examen = (main, arg) => {
  if (arg) return renderExam(main, arg);
  const hist = store.data.exams;
  const draft = store.data.examDraft;
  const v = h(`<div class="view">
    <div class="stack"><span class="eyebrow">Conditions réelles</span><h1>Simulation de devoir</h1><p class="lead">Sans document ni calculatrice. Rédige sur une feuille ou dans les cases. À la fin du temps, ta copie est rendue automatiquement : les calculs sont corrigés, et tu notes toi-même les réponses rédigées en les comparant au corrigé.</p></div>
    <section class="sheet stack"><h3>Durée du chrono</h3><div class="dur-pick">${EXAM_DURATIONS.map((d) => `<button class="dur" data-min="${d.min}" aria-pressed="${store.data.examDur === d.min}"><b>${d.label}</b><span class="small muted">${d.note}</span></button>`).join('')}</div></section>
    <div class="grid g2">${EXAMS.map((x) => {
      const mine = draft && draft.id === x.id;
      return `<div class="sheet stack"><h2>${x.title}</h2><p class="muted">${x.desc}</p>${mine ? `<p class="small"><b>En cours :</b> il reste ${fmtClock(examTimeLeft(draft))}.</p>` : ''}<div class="row"><a class="btn primary" data-start="${x.id}" href="#examen-${x.id}">${mine ? 'Reprendre ma copie' : `Commencer le ${x.title.toLowerCase()}`}</a>${mine ? '<button class="btn ghost" id="abandon">Abandonner</button>' : ''}</div></div>`;
    }).join('')}</div>
    <div class="sheet stack"><h3>Tes notes</h3>${hist.length ? `<div class="hist">${hist.slice().reverse().map(histRowHTML).join('')}</div>` : '<p class="muted">Aucune simulation terminée pour l’instant.</p>'}</div>
  </div>`);
  main.append(v);
  $$('.dur', v).forEach((b) => {
    b.onclick = () => {
      store.data.examDur = +b.dataset.min;
      store.save();
      route();
    };
  });
  $$('[data-start]', v).forEach((a) => {
    a.onclick = (e) => {
      if (draft && draft.id !== a.dataset.start && !confirm('Une autre simulation est en cours. La remplacer ?'))
        e.preventDefault();
      else if (draft && draft.id !== a.dataset.start) {
        store.data.examDraft = null;
        store.save();
      }
    };
  });
  const ab = $('#abandon', v);
  if (ab) {
    ab.onclick = () => {
      if (!confirm('Abandonner cette simulation ? Ta copie sera effacée.')) return;
      store.data.examDraft = null;
      store.save();
      route();
    };
  }
};

function renderExam(main, id) {
  const x = EXAMS.find((e) => e.id === id);
  if (!x) {
    location.hash = '#examen';
    return;
  }
  const secs = x.sections();
  const fields = secs.flatMap((s) => s.parts.flatMap((p) => p.fields));
  const totalPts = secs.reduce((a, s) => a + s.pts, 0);

  const resumed = store.data.examDraft && store.data.examDraft.id === id;
  if (!resumed) store.data.examDraft = { id, dur: store.data.examDur, elapsed: 0, resumedAt: Date.now(), answers: {} };
  const session = store.data.examDraft;
  store.save();

  let done = false;
  let usedMs = 0;
  let savedRecord = null;
  document.body.classList.add('exam-focus');

  const v = h(`<div class="view">
    <div class="stack"><a href="#examen" class="small no-print">← Quitter (ta copie reste enregistrée)</a><span class="eyebrow">IBAM · Master 1 · Fouille de données et apprentissage automatique</span><h1>Devoir blanc · ${x.title}</h1><p class="muted">Durée : ${fmtDuration(session.dur)}. Documents et calculatrice non autorisés. Le barème et un temps conseillé sont indiqués pour chaque partie.</p></div>
    <div class="examsticky" id="sticky">
      <div class="examsticky-row">
        <div class="timer-box"><span class="timer" id="timer" role="timer"></span><span class="small muted" id="examinfo"></span></div>
        <div class="row" style="gap:8px"><button class="btn ghost" id="pause">Pause</button><button class="btn primary" id="finish">Rendre ma copie</button></div>
      </div>
      <div class="timebar" aria-hidden="true"><i id="timebar"></i></div>
    </div>
    <div class="sheet paused-note" id="pausedNote" hidden><h2>Pause</h2><p class="muted">Le chrono est arrêté et ta copie est masquée. Le jour du devoir, il n’y aura pas de pause.</p></div>
    <div id="secs" class="stack"></div>
    <div id="result"></div>
  </div>`);
  main.append(v);
  const box = $('#secs', v),
    sticky = $('#sticky', v),
    tEl = $('#timer', v),
    info = $('#examinfo', v),
    bar = $('#timebar', v),
    pauseBtn = $('#pause', v),
    finishBtn = $('#finish', v);

  const sectionScore = (s) => s.parts.reduce((b, p) => b + (partScore(p) || 0), 0);
  const total = () => secs.reduce((a, s) => a + sectionScore(s), 0);

  const renderResult = () => {
    const n = total();
    const r = $('#result', v);
    r.innerHTML = '';
    const rows = secs.map((s) => {
      const ratio = sectionScore(s) / s.pts;
      return [
        s.title,
        `${fmt(sectionScore(s), 2)} / ${fmt(s.pts)}`,
        sectionVerdict(ratio),
        ratio >= 0.75
          ? ''
          : `<a href="${s.tuto ? '#methode-' + s.tuto : '#questions'}">${s.tuto ? 'Revoir la méthode' : 'Revoir le cours'}</a>`
      ];
    });
    r.append(
      h(
        `<div class="sheet stack fade"><span class="eyebrow">Résultat · ${Math.round(usedMs / 60000)} min sur ${session.dur}</span><div class="note20">${fmt(n, 1)}<span class="muted" style="font-size:.4em"> / 20</span></div><p class="muted">Note les réponses rédigées (boutons « Je me note ») : la note se met à jour.</p>${table(['Partie', 'Points', 'Bilan', 'À faire'], rows)}<p>${n >= 15 ? 'Objectif 15/20 atteint. Garde ce niveau avec le mémo et les questions « À revoir ».' : 'Objectif : 15/20. Reprends les parties « À retravailler », puis refais les exercices associés.'}</p><div class="row no-print"><button class="btn primary" id="save">Enregistrer cette note</button><a class="btn" href="#examen">Retour</a></div></div>`
      )
    );
    $('#save', r).onclick = () => {
      const note = Math.round(total() * 10) / 10;
      if (savedRecord) savedRecord.n = note;
      else {
        savedRecord = { s: x.title, n: note, d: Date.now(), m: Math.round(usedMs / 60000) };
        store.data.exams.push(savedRecord);
      }
      store.save();
      toast('Note enregistrée');
    };
  };

  secs.forEach((s) => {
    const advised = Math.round((s.pts / totalPts) * session.dur);
    const sh = h(
      `<section class="sheet stack"><div class="qhead"><h2>${s.title}</h2><span class="pts">${fmt(s.pts)} pts · ≈ ${advised} min</span></div>${s.intro ? `<div class="prose" style="max-width:none">${s.intro}</div>` : ''}<div class="pz"></div></section>`
    );
    box.append(sh);
    renderParts($('.pz', sh), s.parts, 'exam', () => {
      if (done) renderResult();
    });
  });

  const answeredCount = () => fields.filter((f) => fieldAnswered(f, box)).length;
  const showAnswered = () => {
    if (!done && session.resumedAt) info.textContent = `${answeredCount()} / ${fields.length} réponses`;
  };
  fields.forEach((f, i) => {
    if (session.answers[i]) writeField(f, box, session.answers[i]);
  });
  const saveAnswers = () => {
    if (done) return;
    fields.forEach((f, i) => {
      session.answers[i] = readField(f, box);
    });
    store.save();
    showAnswered();
  };
  box.addEventListener('input', saveAnswers);
  box.addEventListener('change', saveAnswers);

  let timer = null;
  const stop = () => {
    clearInterval(timer);
  };

  const finish = () => {
    done = true;
    usedMs = examElapsed(session);
    stop();
    store.data.examDraft = null;
    store.save();
    document.body.classList.remove('exam-focus');
    box.hidden = false;
    $('#pausedNote', v).hidden = true;
    secs.forEach((s) => s.parts.forEach((p) => p._finish()));
    renderResult();
    info.textContent = 'Copie rendue';
    pauseBtn.hidden = true;
    finishBtn.textContent = 'Voir ma note';
    $('#result', v).scrollIntoView({ behavior: 'smooth' });
  };

  let lastLeft = examTimeLeft(session);
  const tick = () => {
    const left = examTimeLeft(session);
    tEl.textContent = fmtClock(left);
    bar.style.width = `${(left / (session.dur * 60000)) * 100}%`;
    sticky.classList.toggle('warn', left <= WARN_BELOW_MIN * 60000 && left > DANGER_BELOW_MIN * 60000);
    sticky.classList.toggle('danger', left <= DANGER_BELOW_MIN * 60000);
    const crossed = TIME_ALERTS.find((m) => lastLeft > m * 60000 && left <= m * 60000);
    if (crossed) toast(`Plus que ${crossed} minute${crossed > 1 ? 's' : ''}`);
    lastLeft = left;
    if (left <= 0) {
      tEl.textContent = '0:00:00';
      toast('Temps écoulé : ta copie est rendue.');
      finish();
    }
  };

  pauseBtn.onclick = () => {
    const paused = !session.resumedAt;
    if (paused) session.resumedAt = Date.now();
    else {
      session.elapsed = examElapsed(session);
      session.resumedAt = null;
    }
    store.save();
    tick();
    pauseBtn.textContent = paused ? 'Pause' : 'Reprendre';
    box.hidden = !paused;
    $('#pausedNote', v).hidden = paused;
    info.textContent = paused ? '' : 'En pause';
    showAnswered();
  };
  if (!session.resumedAt) {
    pauseBtn.textContent = 'Reprendre';
    box.hidden = true;
    $('#pausedNote', v).hidden = false;
    info.textContent = 'En pause';
  }

  finishBtn.onclick = () => {
    if (done) {
      $('#result', v).scrollIntoView({ behavior: 'smooth' });
      return;
    }
    if (confirm(`Rendre ta copie maintenant ? Il reste ${fmtClock(examTimeLeft(session))}.`)) finish();
  };

  onViewLeave(() => {
    stop();
    document.body.classList.remove('exam-focus');
  });
  showAnswered();
  if (resumed) toast('Copie retrouvée : le temps a continué de tourner.');
  timer = setInterval(tick, 1000);
  tick();
}

const sectionVerdict = (ratio) =>
  ratio >= 0.75
    ? { v: 'Acquis', cls: 'yes' }
    : ratio >= 0.5
      ? { v: 'Fragile', cls: '' }
      : { v: 'À retravailler', cls: 'bad2' };
