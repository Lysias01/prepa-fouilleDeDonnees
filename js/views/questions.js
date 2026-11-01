/* ===================== QUESTIONS ===================== */
const qState = { ch: 'all', mode: 'mix', deck: null, i: 0, score: { ok: 0, mid: 0, ko: 0 } };
const QUESTION_MODES = [
  ['mix', 'Tout mélangé'],
  ['qcm', 'QCM'],
  ['libre', 'Réponse rédigée'],
  ['dv', 'Tombé en devoir'],
  ['new', 'Jamais vues'],
  ['rev', 'À revoir']
];

function buildDeck() {
  let d = QUESTIONS.filter((q) => qState.ch === 'all' || q.ch === qState.ch);
  if (qState.mode === 'qcm') d = d.filter((q) => q.type === 'qcm');
  if (qState.mode === 'libre') d = d.filter((q) => q.type === 'libre');
  if (qState.mode === 'dv') d = d.filter((q) => q.src);
  if (qState.mode === 'rev') d = d.filter((q) => store.data.q[q.id] && store.data.q[q.id].r !== 'ok');
  if (qState.mode === 'new') d = d.filter((q) => !store.data.q[q.id]);
  qState.deck = shuffle(d);
  qState.i = 0;
  qState.score = { ok: 0, mid: 0, ko: 0 };
}

function record(q, r) {
  const prev = store.data.q[q.id] || { n: 0 };
  store.data.q[q.id] = { r, n: prev.n + 1, t: Date.now() };
  store.save();
  qState.score[r]++;
}

VIEWS.questions = (main) => {
  if (!qState.deck) buildDeck();
  const shell = h(`<div class="view">
    <div class="stack"><span class="eyebrow">Questions de cours</span><h1>Questions</h1><p class="lead">Pour les réponses rédigées, écris comme sur ta copie, puis compare avec la réponse modèle et note-toi honnêtement.</p></div>
    <div class="stack">
      ${chapterChips(qState.ch)}
      <div class="chips" role="group" aria-label="Type">${QUESTION_MODES.map((m) => `<button class="chip" data-mode="${m[0]}" aria-pressed="${qState.mode === m[0]}">${m[1]}</button>`).join('')}</div>
    </div>
    <div id="qbody"></div></div>`);
  main.append(shell);
  $$('[data-ch]', shell).forEach(
    (b) =>
      (b.onclick = () => {
        qState.ch = b.dataset.ch;
        buildDeck();
        route();
      })
  );
  $$('[data-mode]', shell).forEach(
    (b) =>
      (b.onclick = () => {
        qState.mode = b.dataset.mode;
        buildDeck();
        route();
      })
  );
  renderQuestion($('#qbody', shell));
};

function renderSeriesEnd(body) {
  const sc = qState.score;
  const tot = sc.ok + sc.mid + sc.ko;
  body.append(
    h(
      `<div class="sheet margin stack"><h2>Série terminée</h2><p class="note20">${tot ? Math.round(((sc.ok + sc.mid / 2) / tot) * 20 * 2) / 2 : 0}<span class="muted" style="font-size:.4em">/20</span></p><p>${sc.ok} juste(s) · ${sc.mid} à moitié · ${sc.ko} à revoir</p><div class="row"><button class="btn primary" id="again">Recommencer (nouveau mélange)</button><button class="btn" id="torev">Revoir mes erreurs</button></div></div>`
    )
  );
  $('#again', body).onclick = () => {
    buildDeck();
    renderQuestion(body);
  };
  $('#torev', body).onclick = () => {
    qState.mode = 'rev';
    buildDeck();
    route();
  };
}

function renderQcm(q, zone, onAnswered) {
  const multi = Array.isArray(q.a);
  const order = shuffle(q.o.map((_, i) => i));
  const opts = h(
    `<div class="opts">${order.map((i, k) => `<button class="opt" data-i="${i}"><span class="l">${String.fromCharCode(65 + k)}</span><span>${q.o[i]}</span></button>`).join('')}</div>`
  );
  zone.append(opts);
  const finish = (chosen) => {
    const good = multi ? q.a : [q.a];
    $$('.opt', opts).forEach((b) => {
      const i = +b.dataset.i;
      b.disabled = true;
      if (good.includes(i)) b.classList.add('good');
      else if (chosen.includes(i)) b.classList.add('bad');
    });
    const ok = chosen.length === good.length && chosen.every((c) => good.includes(c));
    record(q, ok ? 'ok' : 'ko');
    zone.append(
      h(
        `<div class="feedback ${ok ? 'ok' : 'ko'}"><span class="verdict">${ok ? 'Juste !' : 'Pas tout à fait.'}</span><div>${q.e}</div></div>`
      )
    );
    onAnswered();
  };
  if (multi) {
    zone.append(h('<p class="small muted">Plusieurs réponses possibles : sélectionne puis valide.</p>'));
    $$('.opt', opts).forEach((b) => (b.onclick = () => b.classList.toggle('sel')));
    const val = h('<button class="btn primary" style="align-self:flex-start">Valider</button>');
    val.onclick = () => {
      val.remove();
      finish($$('.opt.sel', opts).map((b) => +b.dataset.i));
    };
    zone.append(val);
  } else {
    $$('.opt', opts).forEach((b) => (b.onclick = () => finish([+b.dataset.i])));
  }
}

function renderOpenQuestion(q, zone, onRevealed, goNext) {
  const ta = h(
    `<textarea id="ans-${q.id}" placeholder="Écris ta réponse comme sur ta copie (ou dans ta tête, puis clique)…"></textarea>`
  );
  const show = h('<button class="btn primary" style="align-self:flex-start">Voir la réponse modèle</button>');
  zone.append(ta, show);
  show.onclick = () => {
    show.remove();
    const txt = norm(ta.value);
    const kw = q.kw || [];
    const hits = kw.filter((k) => txt.includes(norm(k)));
    zone.append(h(`<div class="answer"><b>Réponse modèle</b>${q.r}</div>`));
    if (ta.value.trim() && kw.length)
      zone.append(
        h(
          `<div class="stack" style="gap:6px"><span class="small muted">Mots-clés attendus (${hits.length}/${kw.length} trouvés dans ta réponse) :</span><div class="kw">${kw.map((k) => `<span class="${hits.includes(k) ? 'hit' : 'miss'}">${k}</span>`).join('')}</div></div>`
        )
      );
    const sg = h(
      '<div class="selfgrade"><span class="small">Je me note :</span><button class="btn ok" data-r="ok">Je savais</button><button class="btn warn" data-r="mid">À moitié</button><button class="btn ko" data-r="ko">Je ne savais pas</button></div>'
    );
    zone.append(sg);
    $$('[data-r]', sg).forEach(
      (b) =>
        (b.onclick = () => {
          record(q, b.dataset.r);
          goNext();
        })
    );
    onRevealed();
  };
}

function renderQuestion(body) {
  body.innerHTML = '';
  const d = qState.deck;
  const sc = qState.score;
  if (!d.length) {
    body.append(
      h(
        `<div class="empty">${qState.mode === 'rev' ? 'Aucune question à revoir pour ce filtre. Bravo !' : 'Aucune question pour ce filtre.'}</div>`
      )
    );
    return;
  }
  if (qState.i >= d.length) {
    renderSeriesEnd(body);
    return;
  }
  const q = d[qState.i];
  const card = h(`<div class="sheet margin qcard">
    <div class="row" style="justify-content:space-between"><div class="row" style="gap:6px"><span class="tag">${chName(q.ch)}</span><span class="tag">${q.type === 'qcm' ? (Array.isArray(q.a) ? 'Plusieurs réponses' : 'QCM') : 'Réponse rédigée'}</span>${q.src ? `<span class="tag dv">${SRC[q.src]}</span>` : ''}</div>
    <span class="scorebar"><span>${qState.i + 1}/${d.length}</span><span style="color:var(--ok)">✓ ${sc.ok}</span><span style="color:var(--warn)">½ ${sc.mid}</span><span style="color:var(--ko)">✗ ${sc.ko}</span></span></div>
    <div class="progress"><i style="width:${(qState.i / d.length) * 100}%"></i></div>
    <p class="qtext">${q.q}</p><div id="zone" class="stack"></div>
    <div class="row" style="justify-content:space-between"><button class="btn ghost" id="skip">Passer</button><button class="btn primary" id="next" hidden>Question suivante →</button></div>
  </div>`);
  body.append(card);
  const zone = $('#zone', card),
    next = $('#next', card),
    skip = $('#skip', card);
  const goNext = () => {
    qState.i++;
    renderQuestion(body);
  };
  next.onclick = goNext;
  skip.onclick = goNext;
  if (q.type === 'qcm')
    renderQcm(q, zone, () => {
      next.hidden = false;
      skip.hidden = true;
      next.focus();
    });
  else
    renderOpenQuestion(
      q,
      zone,
      () => {
        skip.hidden = true;
      },
      goNext
    );
}
