/* ===================== MÉTHODES ===================== */
VIEWS.methodes = (main) => {
  main.append(
    h(`<div class="view">
    <div class="stack"><span class="eyebrow">Comprendre avant de s’entraîner</span><h1>Méthodes pas à pas</h1><p class="lead">Chaque méthode se déroule comme une vidéo : une étape à la fois, avec les tableaux et les graphiques qui évoluent. Utilise les flèches ← → du clavier ou les boutons.</p></div>
    ${chapterSections(TUTOS, (t) => `<a class="mode" href="#methode-${t.id}"><span class="k">${t.steps().length} étapes${store.data.tutos[t.id] ? ' · <span class="done-mark">✓ suivie</span>' : ''}</span><b>${t.title}</b><span class="muted">${t.sub}</span></a>`)}
  </div>`)
  );
};
VIEWS.methode = (main, arg) => renderTuto(main, arg);
function renderTuto(main, id) {
  const t = TUTOS.find((x) => x.id === id);
  if (!t) {
    location.hash = '#methodes';
    return;
  }
  const steps = t.steps();
  let i = 0;
  const v = h(`<div class="view">
    <div class="stack"><a href="#methodes" class="small">← Toutes les méthodes</a><span class="eyebrow">${chName(t.ch)}</span><h1>${t.title}</h1><p class="lead">${t.sub}</p><div class="row">${listenGroup('steps', 'Écouter les étapes')}</div></div>
    <div class="sheet stepper"><div class="dots" id="dots"></div><div id="stepbody" class="stack"></div></div>
    <div class="stepnav"><button class="btn" id="prev">← Précédent</button><span class="mono small" id="cnt" style="align-self:center"></span><button class="btn primary" id="next">Suivant →</button></div>
  </div>`);
  main.append(v);
  const dots = $('#dots', v),
    sb = $('#stepbody', v),
    prev = $('#prev', v),
    next = $('#next', v),
    cnt = $('#cnt', v);

  const stepEl = (k) =>
    h(
      `<div class="stack"><div class="stack fade"><div class="steptitle"><span class="n">${k + 1}/${steps.length}</span><h2>${steps[k].t}</h2></div><div class="stack">${steps[k].h}</div></div>${
        k === steps.length - 1 && t.ex
          ? `<div class="row"><a class="btn primary" href="#exercice-${t.ex}">S’exercer maintenant →</a><a class="btn" href="#methodes">Autre méthode</a></div>`
          : ''
      }</div>`
    );
  /* el : étape déjà construite par la lecture audio (mêmes nœuds texte, le surlignage reste valide) */
  const show = (k, el) => {
    i = k;
    if (i === steps.length - 1) {
      store.data.tutos[t.id] = 1;
      store.save();
    }
    sb.innerHTML = '';
    sb.append(el || stepEl(k));
    $$('button', dots).forEach((b, n) => {
      b.className = n === i ? 'on' : n < i ? 'done' : '';
    });
    prev.disabled = i === 0;
    next.disabled = i === steps.length - 1;
    cnt.textContent = `Étape ${i + 1} sur ${steps.length}`;
  };

  /* Écoute : lit l'étape affichée puis enchaîne les suivantes sans blanc */
  const listen = () => {
    let queued = i;
    Reader.play(Reader.blocks(sb), {
      owner: 'steps',
      chain: () => {
        const k = queued + 1;
        if (k >= steps.length) return null;
        queued = k;
        const el = stepEl(k);
        return { items: Reader.blocks(el), enter: () => show(k, el) };
      }
    });
  };
  bindListen(v, 'steps', listen);
  /* Choisir une autre étape pendant l'écoute relance la lecture depuis celle-ci */
  const goTo = (k) => {
    show(k);
    if (Reader.owner() === 'steps') listen();
    else window.scrollTo({ top: 0 });
  };

  steps.forEach((_, k) => {
    const b = h(`<button aria-label="Étape ${k + 1}"></button>`);
    b.onclick = () => goTo(k);
    dots.append(b);
  });
  prev.onclick = () => {
    if (i > 0) goTo(i - 1);
  };
  next.onclick = () => {
    if (i < steps.length - 1) goTo(i + 1);
  };
  v.tabIndex = -1;
  const key = (e) => {
    if (e.target.closest('input,textarea,select')) return;
    if (e.key === 'ArrowRight') next.click();
    if (e.key === 'ArrowLeft') prev.click();
  };
  document.addEventListener('keydown', key);
  onViewLeave(() => document.removeEventListener('keydown', key));
  show(0);
}
