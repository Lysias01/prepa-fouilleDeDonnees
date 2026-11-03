/* ===================== EXERCICES ===================== */
VIEWS.exercices = (main) => {
  const best = store.data.ex;
  main.append(
    h(`<div class="view">
    <div class="stack"><span class="eyebrow">Comme au devoir</span><h1>Exercices</h1><p class="lead">Réponds sur papier ou dans les cases, clique sur « Vérifier », puis lis la correction détaillée. Les fractions (3/7), décimaux (0,43) et pourcentages (43 %) sont acceptés.</p></div>
    ${chapterSections(EXOS, (e) => `<a class="mode" href="#exercice-${e.id}"><span class="k">${e.tag}${best[e.id] != null ? ' · meilleur : ' + fmt(best[e.id], 1) + '/20' : ''}</span><b>${e.title}</b><span class="muted">Méthode associée : ${(TUTOS.find((t) => t.id === e.tuto) || {}).title || ''}</span></a>`)}
  </div>`)
  );
};
VIEWS.exercice = (main, arg) => renderExo(main, arg);
function renderExo(main, id) {
  const e = EXOS.find((x) => x.id === id);
  if (!e) {
    location.hash = '#exercices';
    return;
  }
  const parts = e.parts();
  const tot = parts.reduce((s, p) => s + (p.pts || 0), 0);
  const v = h(`<div class="view">
    <div class="stack"><a href="#exercices" class="small">← Tous les exercices</a><div class="row" style="gap:8px"><span class="tag">${chName(e.ch)}</span><span class="tag ${e.tag.startsWith('Annale') ? 'dv' : ''}">${e.tag}</span></div><h1>${e.title}</h1></div>
    <div class="sheet stack" id="intro"><div class="row between"><h3>Énoncé</h3>${listenIcon('exo-intro')}</div><div class="prose" style="max-width:none">${e.intro()}</div></div>
    <div class="sheet" id="parts"></div>
    <div class="sheet row" style="justify-content:space-between"><span>Score : <b class="mono" id="sc">0</b> / ${fmt(tot)} <span class="muted small">(sur 20 : <span id="sc20">0</span>)</span></span><div class="row"><a class="btn ghost" href="#methode-${e.tuto}">Revoir la méthode</a><button class="btn" id="reset">Recommencer</button></div></div>
  </div>`);
  main.append(v);
  const upd = () => {
    const s = parts.reduce((a, p) => a + (partScore(p) || 0), 0);
    $('#sc', v).textContent = fmt(s, 2);
    const s20 = tot ? (s / tot) * 20 : 0;
    $('#sc20', v).textContent = fmt(s20, 1);
    if (store.data.ex[id] == null || s20 > store.data.ex[id]) {
      store.data.ex[id] = Math.round(s20 * 10) / 10;
      store.save();
    }
  };
  bindListen(v, 'exo-intro', () => Reader.play(Reader.blocks($('#intro', v)), { owner: 'exo-intro' }));
  renderParts($('#parts', v), parts, 'exo', upd);
  $('#reset', v).onclick = () => route();
}
