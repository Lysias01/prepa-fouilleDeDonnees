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
    <div class="stack"><a href="#methodes" class="small">← Toutes les méthodes</a><span class="eyebrow">${chName(t.ch)}</span><h1>${t.title}</h1><p class="lead">${t.sub}</p></div>
    <div class="sheet stepper"><div class="dots" id="dots"></div><div id="stepbody" class="stack"></div></div>
    <div class="stepnav"><button class="btn" id="prev">← Précédent</button><span class="mono small" id="cnt" style="align-self:center"></span><button class="btn primary" id="next">Suivant →</button></div>
  </div>`);
  main.append(v);
  const dots = $('#dots', v),
    sb = $('#stepbody', v),
    prev = $('#prev', v),
    next = $('#next', v),
    cnt = $('#cnt', v);
  steps.forEach((_, k) => {
    const b = h(`<button aria-label="Étape ${k + 1}"></button>`);
    b.onclick = () => {
      i = k;
      show();
    };
    dots.append(b);
  });
  const show = () => {
    const s = steps[i];
    if (i === steps.length - 1) {
      store.data.tutos[t.id] = 1;
      store.save();
    }
    sb.innerHTML = '';
    sb.append(
      h(
        `<div class="stack fade"><div class="steptitle"><span class="n">${i + 1}/${steps.length}</span><h2>${s.t}</h2></div><div class="stack">${s.h}</div></div>`
      )
    );
    if (i === steps.length - 1 && t.ex)
      sb.append(
        h(
          `<div class="row"><a class="btn primary" href="#exercice-${t.ex}">S’exercer maintenant →</a><a class="btn" href="#methodes">Autre méthode</a></div>`
        )
      );
    $$('button', dots).forEach((b, k) => {
      b.className = k === i ? 'on' : k < i ? 'done' : '';
    });
    prev.disabled = i === 0;
    next.disabled = i === steps.length - 1;
    cnt.textContent = `Étape ${i + 1} sur ${steps.length}`;
  };
  prev.onclick = () => {
    if (i > 0) {
      i--;
      show();
      window.scrollTo({ top: 0 });
    }
  };
  next.onclick = () => {
    if (i < steps.length - 1) {
      i++;
      show();
      window.scrollTo({ top: 0 });
    }
  };
  v.tabIndex = -1;
  const key = (e) => {
    if (e.target.closest('input,textarea,select')) return;
    if (e.key === 'ArrowRight') next.click();
    if (e.key === 'ArrowLeft') prev.click();
  };
  document.addEventListener('keydown', key);
  onViewLeave(() => document.removeEventListener('keydown', key));
  show();
}
