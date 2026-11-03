/* ===================== LECTURE AUDIO ===================== */
/* Lecture à voix haute (synthèse vocale du navigateur) avec surlignage du passage et du mot prononcés.
   Clé de la fluidité : toute une partie est mise en file d'un coup, par plusieurs speak() sans cancel() entre eux.
   Le surlignage suit la voix (onstart, onboundary) au lieu de la piloter. */
const Reader = (() => {
  const synth = window.speechSynthesis;
  const supported = !!synth && typeof window.SpeechSynthesisUtterance === 'function';
  const RATES = [0.6, 0.7, 0.8, 0.9, 1, 1.1, 1.25, 1.5, 1.75, 2];
  const CHARS_PER_SEC = 14.5; // pour estimer la position quand la voix n'envoie pas onboundary
  const MAX_CHARS = 900; // voix Microsoft / Edge
  const MAX_CHARS_GOOGLE = 220; // les voix Google se coupent au-delà d'environ 15 s
  const SLOW_START_MS = 2500;
  const DEAD_START_MS = 6000;
  const MAX_RETRIES = 2;
  /* Edge : un speak() juste après un cancel() qui coupe la voix ne démarre jamais et bloque la synthèse. On laisse le cancel aboutir. */
  const CANCEL_SETTLE_MS = 250;
  let settleUntil = 0;

  const PASSAGES = 'h1,h2,h3,p,li,blockquote,tr,.opt,.tip,.trap,.formula,pre';
  const SKIP =
    '.tag,.pts,.eyebrow,button:not(.opt),select,textarea,input,svg,script,style,[hidden],[aria-hidden="true"],[data-noread],' +
    '.path-num,.steptitle .n,.listen-group,.listen-icon,.dots,.progress,.selfgrade,.actions,.chips,.stepnav,.fnav,.examsticky,.ring,.kw';
  const SAY = [
    [/→/g, ', puis '],
    [/÷/g, ' divisé par '],
    [/≈/g, ' environ '],
    [/²/g, ' au carré'],
    [/√/g, ' racine de '],
    [/×/g, ' fois '],
    [/±/g, ' plus ou moins '],
    [/≤/g, ' inférieur ou égal à '],
    [/≥/g, ' supérieur ou égal à '],
    [/≠/g, ' différent de '],
    [/∪/g, ' union '],
    [/∩/g, ' inter '],
    [/∅/g, ' ensemble vide '],
    [/−/g, '-'],
    [/₂/g, ' 2'],
    [/[★✔✓✗✘☐☑•▸▾⋈←↑↓½]/g, ' ']
  ];

  /* ---------- Découpage de la page en passages ---------- */
  const skipped = (el) => el.matches(SKIP) || (el.isConnected && !el.getClientRects().length);
  const hasDirectText = (el) => [...el.childNodes].some((n) => n.nodeType === 3 && n.data.trim());

  function collect(el, out) {
    if (skipped(el)) return;
    const leaf = el.matches(PASSAGES) && !el.querySelector(PASSAGES);
    if (leaf || hasDirectText(el)) {
      if (textOf(el).text) out.push(el);
      return;
    }
    for (const c of el.children) collect(c, out);
  }
  function blocks(root) {
    const out = [];
    if (root) collect(root, out);
    return out;
  }

  const say = (s) => SAY.reduce((t, [re, w]) => t.replace(re, w), s);

  /* Texte à prononcer, et pour chaque nœud texte sa place dans ce texte : {node, start, len, raw}. */
  function textOf(el) {
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, {
      acceptNode(n) {
        for (let p = n.parentElement; p && p !== el; p = p.parentElement)
          if (skipped(p)) return NodeFilter.FILTER_REJECT;
        return n.data.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    let text = '';
    const pieces = [];
    let lastCell = null;
    for (let n = walker.nextNode(); n; n = walker.nextNode()) {
      const parent = n.parentElement;
      let s = say(n.data).replace(/\s+/g, ' ');
      if (parent.classList.contains('l') && parent.closest('.opt')) s = s.trim() + '. ';
      const cell = parent.closest('td,th,li,p,div,dd,dt,label');
      if (lastCell && cell !== lastCell && text.trim() && !/[.,;:!?]\s*$/.test(text)) text = text.replace(/\s*$/, ', ');
      lastCell = cell;
      if (!text || /\s$/.test(text)) s = s.replace(/^\s+/, '');
      if (!s) continue;
      pieces.push({ node: n, start: text.length, len: s.length, raw: n.data });
      text += s;
    }
    return { text: text.trim(), pieces };
  }

  /* Énoncés longs, coupés de préférence à une fin de phrase. */
  function chunks(G, from, max) {
    const out = [];
    let pos = from;
    while (pos < G.length) {
      while (G[pos] === ' ') pos++;
      if (pos >= G.length) break;
      let end = Math.min(G.length, pos + max);
      if (end < G.length) {
        const win = G.slice(pos, end);
        let cut = Math.max(win.lastIndexOf('. '), win.lastIndexOf('? '), win.lastIndexOf('! '), win.lastIndexOf(': '));
        if (cut < max * 0.3) cut = win.lastIndexOf(', ');
        if (cut < max * 0.3) cut = win.lastIndexOf(' ');
        if (cut > 0) end = pos + cut + 1;
      }
      out.push({ text: G.slice(pos, end), start: pos });
      pos = end;
    }
    return out;
  }
  const sentenceStart = (G, pos) => {
    const before = G.slice(0, pos);
    const m = Math.max(
      before.lastIndexOf('. '),
      before.lastIndexOf('? '),
      before.lastIndexOf('! '),
      before.lastIndexOf(': ')
    );
    return m < 0 ? 0 : m + 2;
  };

  /* ---------- Voix ---------- */
  const avoid = new Set();
  let preferLocal = false;
  function pickVoice() {
    const voices = synth.getVoices().filter((v) => /^fr\b/i.test(v.lang.replace('_', '-')));
    const score = (v) =>
      (/natural|online|neural/i.test(v.name)
        ? 0
        : /google/i.test(v.name)
          ? 1
          : /fr-FR/i.test(v.lang.replace('_', '-'))
            ? 2
            : 3) +
      (/fr-FR/i.test(v.lang.replace('_', '-')) ? 0 : 0.5) +
      (preferLocal && !v.localService ? 10 : 0) +
      (avoid.has(v.voiceURI) ? 100 : 0);
    return voices.sort((a, b) => score(a) - score(b))[0] || null;
  }
  const maxChars = (voice) => (voice && /google/i.test(voice.name) ? MAX_CHARS_GOOGLE : MAX_CHARS);

  /* ---------- Vitesse ---------- */
  const rate = () => (RATES.includes(store.data.rate) ? store.data.rate : 1);
  function stepRate(dir) {
    const i = RATES.indexOf(rate());
    store.data.rate = RATES[Math.max(0, Math.min(RATES.length - 1, i + dir))];
    store.save();
    if (run) restart();
    emit();
  }

  /* ---------- Lecture ---------- */
  let run = null;
  let token = 0;
  const emit = () => document.dispatchEvent(new Event('reader:change'));

  /* Les options ne se lisent que sur un objet de configuration : un élément HTML a déjà une méthode before(). */
  const toConfig = (x) => (x instanceof Element ? { el: x } : x);

  function buildSegment(cfgs) {
    let G = '';
    const passages = [];
    cfgs.forEach((c) => {
      const t = textOf(c.el);
      if (!t.text) return;
      if (G) G += ' ';
      const start = G.length;
      G += t.text;
      if (!/[.!?:;…]$/.test(t.text)) G += '.';
      passages.push({
        el: c.el,
        start,
        end: G.length,
        pieces: t.pieces.map((p) => ({ ...p, start: p.start + start }))
      });
    });
    return { G, passages };
  }

  /* Une partie (une étape, une carte…) = des segments ; un segment commence à chaque passage qui demande
     une pause ou une action avant lui (ex. retourner la carte). */
  function addPart(items, enter) {
    const part = { enter, entered: !enter };
    const segs = [];
    items.map(toConfig).forEach((c) => {
      if (!segs.length || c.pause || c.before)
        segs.push({ part, cfgs: [], pre: c.pause || c.before ? { pause: c.pause || 0, before: c.before } : null });
      segs[segs.length - 1].cfgs.push(c);
    });
    segs.forEach((s) => Object.assign(s, buildSegment(s.cfgs), { from: 0 }));
    const useful = segs.filter((s) => s.G || s.pre);
    run.segs.push(...useful);
    return useful.length;
  }

  function play(items, opts = {}) {
    if (!supported) return;
    const prev = run;
    halt();
    run = null;
    if (prev && prev.opts.owner !== opts.owner && prev.opts.onStop) prev.opts.onStop();
    run = { opts, segs: [], qi: 0, chainAsked: false, retries: 0, cur: null, pos: 0, timers: [] };
    if (!addPart(items || [], null)) {
      run = null;
      emit();
      return;
    }
    begin();
    emit();
  }

  function begin() {
    const r = run;
    r.token = token;
    r.voice = pickVoice();
    r.started = false;
    r.boundary = false;
    const delay = settleUntil - performance.now();
    if (delay > 0) r.timers.push(setTimeout(() => run === r && queueFrom(), delay));
    else queueFrom();
    r.timers.push(
      setTimeout(() => {
        /* Voix en ligne lente : on la garde pour cette lecture (lente n'est pas muette), on préférera une voix locale ensuite */
        if (run === r && !r.started && r.voice && !r.voice.localService) {
          avoid.add(r.voice.voiceURI);
          preferLocal = true;
        }
      }, SLOW_START_MS),
      setTimeout(() => {
        if (run === r && !r.started) fallback();
      }, DEAD_START_MS),
      setInterval(() => estimate(r), 150)
    );
  }

  /* Met en file tout ce qui peut l'être. Les segments qui se suivent sans pause sont réunis dans un même flux,
     et si la fin connue arrive avant d'avoir rempli un énoncé, on demande déjà la partie suivante :
     le passage d'une partie à l'autre tombe alors au milieu d'un énoncé, donc sans aucun blanc. */
  function queueFrom() {
    const r = run;
    const limit = maxChars(r.voice);
    while (r.qi < r.segs.length) {
      const first = r.segs[r.qi];
      if (first.pre && !first.preDone) {
        const prev = r.segs[r.qi - 1];
        if (!first.preStarted && (!prev || prev.ended)) startPre(first);
        return;
      }
      const stream = [first];
      let len = first.G.length - first.from;
      let j = r.qi + 1;
      for (;;) {
        if (j >= r.segs.length) {
          if (len < limit && !r.chainAsked && askChain()) continue;
          break;
        }
        if (r.segs[j].pre) break;
        stream.push(r.segs[j]);
        len += r.segs[j].G.length + 1;
        j++;
      }
      r.qi = j;
      queueStream(stream, limit);
      if (run !== r) return;
    }
    if (r.segs.every((s) => s.ended)) {
      if (!r.chainAsked) askChain();
      if (run === r && r.chainAsked && r.segs.every((s) => s.ended)) finish();
    }
  }

  function startPre(seg) {
    const r = run;
    seg.preStarted = true;
    r.timers.push(
      setTimeout(() => {
        if (run !== r) return;
        if (seg.part.enter && !seg.part.entered) enterPart(seg.part);
        if (seg.pre.before) seg.pre.before();
        seg.preDone = true;
        queueFrom();
      }, seg.pre.pause)
    );
  }

  /* Un flux = un texte unique S ; chaque segment y occupe [off + from, fin[ (off : décalage du segment dans S). */
  function queueStream(stream, limit) {
    let S = '';
    stream.forEach((s) => {
      const t = s.G.slice(s.from);
      if (S && t) S += ' ';
      s.off = S.length - s.from;
      S += t;
    });
    const utts = chunks(S, 0, limit);
    if (!utts.length) {
      stream.forEach((s) => (s.ended = true));
      return;
    }
    utts.forEach((u, k) => speakUtt(stream, u, k === utts.length - 1));
  }

  const segAt = (stream, p) => stream.filter((s) => s.off + s.from <= p).pop() || stream[0];

  function speakUtt(stream, u, isLast) {
    const r = run,
      t = r.token;
    const ut = new SpeechSynthesisUtterance(u.text);
    ut.lang = 'fr-FR';
    if (r.voice) ut.voice = r.voice;
    ut.rate = rate();
    ut.onstart = () => {
      if (t !== token) return;
      r.started = true;
      r.cur = { stream, u };
      r.uttT0 = performance.now();
      at(stream, u.start);
      /* Dernier énoncé connu : on demande la suite tout de suite, elle sera en file avant la fin de celui-ci */
      if (isLast && stream[stream.length - 1] === r.segs[r.segs.length - 1] && !r.chainAsked && askChain()) queueFrom();
    };
    ut.onboundary = (e) => {
      if (t !== token || (e.name && e.name !== 'word')) return;
      r.boundary = true;
      at(stream, u.start + e.charIndex);
    };
    ut.onend = () => {
      if (t !== token || !isLast) return;
      stream.forEach((s) => (s.ended = true));
      queueFrom();
    };
    ut.onerror = (e) => {
      if (t !== token || e.error === 'interrupted' || e.error === 'canceled') return;
      fallback();
    };
    synth.speak(ut);
  }

  /* Position p dans le flux → segment, passage et mot à surligner ; entre dans la partie suivante quand la voix l'atteint. */
  function at(stream, p) {
    const seg = segAt(stream, p);
    if (seg.part.enter && !seg.part.entered) enterPart(seg.part);
    run.seg = seg;
    setPos(seg, p - seg.off);
  }

  function enterPart(part) {
    part.entered = true;
    part.enter();
  }

  /* Demande la partie suivante. Renvoie vrai si de nouveaux segments ont été ajoutés. */
  function askChain() {
    const r = run;
    r.chainAsked = true;
    const next = r.opts.chain && r.opts.chain();
    if (next && next.items && next.items.length && addPart(next.items, next.enter)) {
      r.chainAsked = false;
      return true;
    }
    return false;
  }

  function finish() {
    const o = run.opts;
    halt();
    run = null;
    emit();
    if (o.onEnd) o.onEnd();
  }

  /* Le son ne doit jamais disparaître : on passe sur une voix locale et on reprend au début de la phrase. */
  function fallback() {
    const r = run;
    if (!r || r.retries >= MAX_RETRIES) return;
    r.retries++;
    if (r.voice) avoid.add(r.voice.voiceURI);
    preferLocal = true;
    restart();
  }

  /* Relance depuis le début de la phrase en cours (changement de vitesse, changement de voix). */
  function restart() {
    const r = run;
    let idx = r.seg ? r.segs.indexOf(r.seg) : r.segs.findIndex((s) => !s.ended);
    if (idx < 0) idx = 0;
    let pos = r.seg ? sentenceStart(r.segs[idx].G, r.pos) : r.segs[idx].from;
    /* Arrêt pendant une pause prévue : on reprend au passage suivant, pause comprise */
    const moved = !!(r.seg && r.seg.ended && idx + 1 < r.segs.length);
    if (moved) {
      idx++;
      pos = 0;
    }
    const inside = !!r.seg && !moved;
    halt(true);
    r.segs.forEach((s, k) => {
      if (k < idx) return;
      s.ended = false;
      s.from = k === idx ? pos : 0;
      s.preStarted = false;
      s.preDone = k === idx && inside;
    });
    r.qi = idx;
    r.cur = null;
    r.timers = [];
    begin();
  }

  function halt(keepHighlight) {
    token++;
    if (run) run.timers.forEach((id) => (clearTimeout(id), clearInterval(id)));
    if (supported) {
      if (synth.speaking || synth.pending) settleUntil = performance.now() + CANCEL_SETTLE_MS;
      synth.cancel();
      if (synth.paused) synth.resume();
    }
    if (!keepHighlight) clearHighlight();
  }

  function stop() {
    if (!run) return;
    const o = run.opts;
    halt();
    run = null;
    emit();
    if (o.onStop) o.onStop();
  }

  /* ---------- Surlignage ---------- */
  const canHighlight = typeof window.Highlight === 'function' && window.CSS && CSS.highlights;
  let readingEl = null;

  function clearHighlight() {
    if (readingEl) readingEl.classList.remove('reading');
    readingEl = null;
    if (canHighlight) CSS.highlights.delete('reading-word');
  }

  function estimate(r) {
    if (run !== r || !r.cur || r.boundary) return;
    const { stream, u } = r.cur;
    const done = ((performance.now() - r.uttT0) / 1000) * CHARS_PER_SEC * rate();
    at(stream, u.start + Math.min(u.text.length - 1, done));
  }

  function setPos(seg, pos) {
    run.pos = pos;
    const p = seg.passages.filter((x) => x.start <= pos).pop() || seg.passages[0];
    if (!p) return;
    if (p.el !== readingEl) {
      if (readingEl) readingEl.classList.remove('reading');
      readingEl = p.el;
      readingEl.classList.add('reading');
      keepVisible(readingEl);
    }
    if (!canHighlight) return;
    const piece = p.pieces.filter((x) => x.start <= pos).pop();
    if (!piece || !piece.node.isConnected) return;
    const raw = piece.raw;
    const i = Math.min(raw.length - 1, Math.round(((pos - piece.start) / piece.len) * raw.length));
    let a = Math.max(0, i),
      b = a;
    while (a > 0 && !/\s/.test(raw[a - 1])) a--;
    while (b < raw.length && !/\s/.test(raw[b])) b++;
    if (b <= a) return;
    const range = new Range();
    range.setStart(piece.node, a);
    range.setEnd(piece.node, b);
    CSS.highlights.set('reading-word', new Highlight(range));
  }

  function keepVisible(el) {
    const r = el.getBoundingClientRect();
    const css = getComputedStyle(document.documentElement);
    const top = parseFloat(css.getPropertyValue('--header-h')) + 12;
    const bottom = innerHeight - parseFloat(css.getPropertyValue('--nav-h')) - 70;
    if (r.top >= top && r.bottom <= bottom) return;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollIntoView({ block: r.height > bottom - top ? 'start' : 'center', behavior: reduce ? 'auto' : 'smooth' });
  }

  if (supported) {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && run) stop();
    });
    /* Certains navigateurs chargent la liste des voix plus tard */
    synth.getVoices();
    if ('onvoiceschanged' in synth) synth.onvoiceschanged = () => synth.getVoices();
  } else document.documentElement.classList.add('no-tts');

  return {
    supported,
    play,
    stop,
    blocks,
    textOf,
    rate,
    stepRate,
    owner: () => (run ? run.opts.owner : null),
    voice: () => (run ? run.voice : null)
  };
})();

/* ---------- Boutons Écouter et réglage de vitesse ---------- */
const ICON_SPEAKER =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9z"/><path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"/></svg>';
const ICON_STOP =
  '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="6" width="12" height="12" rx="2" fill="currentColor"/></svg>';
const fmtRate = (r) => String(r).replace('.', ',') + '×';

const listenInner = (on, label) =>
  (on ? ICON_STOP : ICON_SPEAKER) + (label ? `<span>${on ? 'Arrêter' : label}</span>` : '');
const rateControl = () =>
  `<span class="rate" role="group" aria-label="Vitesse de lecture"><button type="button" data-rate="-1" aria-label="Plus lent">−</button><output>${fmtRate(Reader.rate())}</output><button type="button" data-rate="1" aria-label="Plus rapide">+</button></span>`;
/* Grand bouton « Écouter » + vitesse, pour une page ou une liste */
const listenGroup = (owner, label) =>
  `<span class="listen-group"><button type="button" class="btn listen" data-listen="${owner}" data-label="${label}" aria-pressed="${Reader.owner() === owner}">${listenInner(Reader.owner() === owner, label)}</button>${rateControl()}</span>`;
/* Icône haut-parleur, pour une petite zone */
const listenIcon = (owner) =>
  `<button type="button" class="listen-icon" data-listen="${owner}" aria-pressed="${Reader.owner() === owner}" aria-label="${Reader.owner() === owner ? 'Arrêter la lecture' : 'Écouter'}">${listenInner(Reader.owner() === owner)}</button>`;

function toggleListen(owner, start) {
  if (Reader.owner() === owner) Reader.stop();
  else start();
}
function bindListen(root, owner, start) {
  $$(`[data-listen="${owner}"]`, root).forEach((b) => {
    b.onclick = () => toggleListen(owner, start);
  });
}
function syncListen() {
  const owner = Reader.owner();
  $$('[data-listen]').forEach((b) => {
    const on = owner === b.dataset.listen;
    if (b.getAttribute('aria-pressed') === String(on)) return;
    b.setAttribute('aria-pressed', on);
    b.innerHTML = listenInner(on, b.dataset.label);
    if (!b.dataset.label) b.setAttribute('aria-label', on ? 'Arrêter la lecture' : 'Écouter');
  });
  $$('.rate output').forEach((o) => {
    o.textContent = fmtRate(Reader.rate());
  });
}
document.addEventListener('reader:change', syncListen);
document.addEventListener('click', (e) => {
  const b = e.target.closest('[data-rate]');
  if (b) Reader.stepRate(+b.dataset.rate);
});
