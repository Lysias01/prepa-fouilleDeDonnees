/* ===================== FICHES ===================== */
const fState = { ch: 'all', mode: 'cards', search: '', shuffled: false, i: 0, deck: [] };

function buildFicheDeck() {
  const q = norm(fState.search);
  let d = CARDS.filter((c) => fState.ch === 'all' || c.ch === fState.ch);
  if (q) d = d.filter((c) => norm(c.t + ' ' + c.d).includes(q));
  fState.deck = fState.shuffled ? shuffle(d) : d;
  fState.i = 0;
}

const ficheListHTML = (d) =>
  `<div class="sheet"><div class="deflist">${d.map((c) => `<div class="defitem"><div><b>${c.t}</b>${c.hc ? ' <span class="tag hc">Hors cours</span>' : ''}<div class="small muted">${chName(c.ch)}</div></div><div>${c.d}${c.m ? `<div class="hand" style="font-size:1.15rem;margin-top:4px">${c.m}</div>` : ''}</div></div>`).join('')}</div></div>`;

function renderFicheCard(body) {
  const d = fState.deck;
  const c = d[fState.i];
  store.data.seenCards[c.id] = 1;
  store.save();
  const card = h(`<div class="stack" style="${chStyle(c.ch)}">
      <div class="flip" id="flip" tabindex="0" role="button" aria-label="Retourner la carte">
        <div class="flip-in">
          <div class="face"><span class="eyebrow">${chName(c.ch)}</span><div class="term">${c.t}</div><span class="muted small">Touche la carte pour voir la définition</span></div>
          <div class="face back"><span class="eyebrow">${c.t}</span><div class="def">${c.d}</div>${c.m ? `<div class="hand">${c.m}</div>` : ''}${c.hc ? '<span class="tag hc" style="align-self:flex-start">Hors cours</span>' : ''}</div>
        </div>
      </div>
      <div class="fnav">
        <button class="btn" id="prev" aria-label="Fiche précédente">←</button>
        <div class="fcount"><span>${fState.i + 1} / ${d.length}</span><div class="progress"><i style="width:${((fState.i + 1) / d.length) * 100}%"></i></div></div>
        <button class="btn primary" id="next" aria-label="Fiche suivante">→</button>
      </div></div>`);
  body.append(card);
  const flip = $('#flip', card);
  flip.onclick = () => flip.classList.toggle('on');
  $('#prev', card).onclick = () => goFiche(-1);
  $('#next', card).onclick = () => goFiche(1);
  /* Glisser à gauche ou à droite sur téléphone */
  let startX = null;
  flip.ontouchstart = (e) => {
    startX = e.changedTouches[0].clientX;
  };
  flip.ontouchend = (e) => {
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50) {
      e.preventDefault();
      goFiche(dx < 0 ? 1 : -1);
    }
  };
}

function renderFicheBody() {
  const body = $('#fbody');
  body.innerHTML = '';
  const d = fState.deck;
  if (!d.length) body.append(h('<div class="empty">Aucune fiche ne correspond à cette recherche.</div>'));
  else if (fState.mode === 'list') body.append(h(ficheListHTML(d)));
  else renderFicheCard(body);
}

function goFiche(k) {
  const n = fState.deck.length;
  if (!n) return;
  fState.i = (fState.i + k + n) % n;
  renderFicheBody();
}

VIEWS.fiches = (main, arg) => {
  if (arg) {
    fState.ch = arg;
    fState.search = '';
    buildFicheDeck();
  }
  const render = () => {
    const v = h(`<div class="view">
      <div class="stack"><span class="eyebrow">Définitions à retenir</span><h1>Fiches</h1><p class="lead desk-only">Lis le terme, dis la définition à voix haute, puis retourne la carte. Les flèches passent à la fiche suivante ou précédente.</p></div>
      <div class="filters">
        ${chapterChips(fState.ch)}
        <div class="row"><div class="chips" role="group" aria-label="Affichage"><button class="chip" data-mode="cards" aria-pressed="${fState.mode === 'cards'}">Cartes</button><button class="chip" data-mode="list" aria-pressed="${fState.mode === 'list'}">Liste complète</button><button class="chip" id="shuffle" aria-pressed="${fState.shuffled}">Mélanger</button></div></div>
        <input type="search" id="fsearch" placeholder="Chercher un terme : support, entropie, dendrogramme…" aria-label="Chercher dans les fiches" value="${fState.search.replace(/"/g, '&quot;')}">
      </div>
      <div id="fbody"></div></div>`);
    main.innerHTML = '';
    main.append(v);
    $$('[data-ch]', v).forEach((b) => {
      b.onclick = () => {
        fState.ch = b.dataset.ch;
        buildFicheDeck();
        if (location.hash === '#fiches') render();
        else location.hash = '#fiches';
      };
    });
    $$('[data-mode]', v).forEach((b) => {
      b.onclick = () => {
        fState.mode = b.dataset.mode;
        render();
      };
    });
    $('#shuffle', v).onclick = () => {
      fState.shuffled = !fState.shuffled;
      buildFicheDeck();
      render();
    };
    $('#fsearch', v).oninput = (e) => {
      fState.search = e.target.value;
      buildFicheDeck();
      renderFicheBody();
    };
    renderFicheBody();
  };
  if (!fState.deck.length && !fState.search) buildFicheDeck();
  render();

  const key = (e) => {
    if (e.target.closest('input,textarea,select')) return;
    if (e.key === 'ArrowRight') goFiche(1);
    else if (e.key === 'ArrowLeft') goFiche(-1);
    else if ((e.key === ' ' || e.key === 'Enter') && !e.target.closest('button,a')) {
      const flip = $('#flip');
      if (flip) {
        e.preventDefault();
        flip.classList.toggle('on');
      }
    }
  };
  document.addEventListener('keydown', key);
  onViewLeave(() => document.removeEventListener('keydown', key));
};
