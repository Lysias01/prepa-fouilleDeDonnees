/* ===================== FICHES ===================== */
const fState = { ch: 'all', mode: 'cards', only: false, i: 0, deck: null };

function buildFicheDeck() {
  let d = CARDS.filter((c) => fState.ch === 'all' || c.ch === fState.ch);
  if (fState.only) d = d.filter((c) => store.data.cards[c.id] !== 'ok');
  fState.deck = d;
  if (fState.i >= d.length) fState.i = 0;
}

const ficheListHTML = (d) =>
  `<div class="sheet margin"><div class="deflist">${d.map((c) => `<div class="defitem"><div><b>${c.t}</b>${c.hc ? ' <span class="tag hc">Hors cours</span>' : ''}<div class="small muted">${chName(c.ch)}</div></div><div>${c.d}${c.m ? `<div class="hand" style="font-size:1.15rem;margin-top:4px">${c.m}</div>` : ''}</div></div>`).join('')}</div></div>`;

function renderFicheCard(body, rerender) {
  const d = fState.deck;
  const c = d[fState.i];
  const card = h(`<div class="stack">
      <div class="flip" id="flip" tabindex="0" role="button" aria-label="Retourner la carte">
        <div class="flip-in">
          <div class="face"><span class="eyebrow">${chName(c.ch)} · ${fState.i + 1}/${d.length}</span><div class="term">${c.t}</div><span class="muted small">Touchez ou appuyez sur Espace pour voir la définition</span></div>
          <div class="face back"><span class="eyebrow">${c.t}</span><div class="def">${c.d}</div>${c.m ? `<div class="hand">${c.m}</div>` : ''}${c.hc ? '<span class="tag hc">Hors cours</span>' : ''}</div>
        </div>
      </div>
      <div class="fnav">
        <button class="btn ghost" id="prev" aria-label="Fiche précédente">←</button>
        <button class="btn ko" id="rev">À revoir</button><button class="btn ok" id="ok">Je sais ✓</button>
        <button class="btn ghost" id="next" aria-label="Fiche suivante">→</button>
      </div></div>`);
  body.append(card);
  const flip = $('#flip', card);
  const toggle = () => flip.classList.toggle('on');
  flip.onclick = toggle;
  flip.onkeydown = (e) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      toggle();
    }
  };
  const go = (k) => {
    fState.i = (fState.i + k + d.length) % d.length;
    rerender();
  };
  $('#prev', card).onclick = () => go(-1);
  $('#next', card).onclick = () => go(1);
  $('#ok', card).onclick = () => {
    store.data.cards[c.id] = 'ok';
    store.save();
    if (fState.only) rerender();
    else go(1);
  };
  $('#rev', card).onclick = () => {
    store.data.cards[c.id] = 'rev';
    store.save();
    go(1);
  };
  flip.focus({ preventScroll: true });
}

VIEWS.fiches = (main) => {
  const render = () => {
    buildFicheDeck();
    const d = fState.deck;
    const known = d.filter((c) => store.data.cards[c.id] === 'ok').length;
    const v = h(`<div class="view">
      <div class="stack"><span class="eyebrow">Définitions à retenir</span><h1>Fiches</h1><p class="lead">Lis le terme, dis la définition à voix haute, puis retourne la carte. Sois honnête : « À revoir » la fait revenir.</p></div>
      <div class="stack">
        ${chapterChips(fState.ch)}
        <div class="row"><div class="chips" role="group" aria-label="Affichage"><button class="chip" data-mode="cards" aria-pressed="${fState.mode === 'cards'}">Cartes</button><button class="chip" data-mode="list" aria-pressed="${fState.mode === 'list'}">Liste complète</button></div>
        <label class="row small" style="gap:6px"><input type="checkbox" id="onlyRev" ${fState.only ? 'checked' : ''}> Seulement les fiches pas encore sues</label>
        <span class="mono small muted">${known}/${d.length} sues</span></div>
      </div>
      <div id="fbody"></div></div>`);
    main.innerHTML = '';
    main.append(v);
    $$('[data-ch]', v).forEach(
      (b) =>
        (b.onclick = () => {
          fState.ch = b.dataset.ch;
          fState.i = 0;
          render();
        })
    );
    $$('[data-mode]', v).forEach(
      (b) =>
        (b.onclick = () => {
          fState.mode = b.dataset.mode;
          render();
        })
    );
    $('#onlyRev', v).onchange = (e) => {
      fState.only = e.target.checked;
      fState.i = 0;
      render();
    };
    const body = $('#fbody', v);
    if (!d.length)
      body.append(
        h('<div class="empty">Toutes les fiches de ce filtre sont sues. Décoche le filtre ou change de chapitre.</div>')
      );
    else if (fState.mode === 'list') body.append(h(ficheListHTML(d)));
    else renderFicheCard(body, render);
  };
  render();
};
