/* ===================== CHAMPS DE RÉPONSE (exercices et examens) ===================== */
/* Un champ est décrit dans les données par { k: type, label, ans, ... }.
   FIELD_KINDS donne pour chaque type son HTML et sa correction (check renvoie un score entre 0 et 1). */
let UID = 0;

const markField = (node, ok) => {
  node.classList.remove('good', 'bad');
  node.classList.add(ok ? 'good' : 'bad');
};
const scoreField = (node, ok) => {
  markField(node, ok);
  return ok ? 1 : 0;
};
const fieldCaption = (f) => (f.label ? `<span class="small muted">${f.label}</span>` : '');
const textFieldHTML = (f, attrs) =>
  `<div class="field" data-f="${f._id}">${f.label ? `<label for="${f._id}">${f.label}</label>` : ''}<input type="text" id="${f._id}" ${attrs}></div>`;

const permutations = (a) =>
  a.length <= 1 ? [a] : a.flatMap((x, i) => permutations([...a.slice(0, i), ...a.slice(i + 1)]).map((p) => [x, ...p]));

/* Les numéros de clusters sont interchangeables : on garde le renommage le plus favorable à l'étudiant. */
function bestRelabeling(f, got) {
  let best = -1,
    map = (x) => x;
  permutations(f.opts).forEach((p) => {
    const m = (x) => (x ? p[f.opts.indexOf(x)] : x);
    const s = f.pts.filter((pt) => m(got[pt]) === f.ans[pt]).length;
    if (s > best) {
      best = s;
      map = m;
    }
  });
  return map;
}

const FIELD_KINDS = {
  num: {
    html: (f) => textFieldHTML(f, 'inputmode="decimal" autocomplete="off" placeholder="ex. 3/7 · 0,43 · 43 %"'),
    check: (f, el) => scoreField(el, Math.abs(parseNum($('input', el).value) - f.ans) <= (f.tol ?? 0.011))
  },
  items: {
    html: (f) => textFieldHTML(f, 'autocomplete="off" placeholder="éléments séparés par des virgules"'),
    check: (f, el) => scoreField(el, sameArr(parseItems($('input', el).value), f.ans.map(norm).sort()))
  },
  sets: {
    html: (f) => textFieldHTML(f, 'autocomplete="off" placeholder="{a, b}, {a, c}"'),
    check: (f, el) => {
      const expected = [...new Set(f.ans.map((s) => s.map(norm).sort().join('|')))].sort();
      return scoreField(el, sameArr(parseSets($('input', el).value), expected));
    }
  },
  select: {
    html: (f) =>
      `<div class="field" data-f="${f._id}"><label for="${f._id}">${f.label}</label><select id="${f._id}"><option value="">— choisir —</option>${f.opts.map((o, i) => `<option value="${i}">${o}</option>`).join('')}</select></div>`,
    check: (f, el) => scoreField(el, $('select', el).value === String(f.ans))
  },
  radio: {
    html: (f) =>
      `<div class="checks" data-f="${f._id}">${f.opts.map((o, i) => `<label><input type="radio" name="${f._id}" value="${i}"> <span>${o}</span></label>`).join('')}</div>`,
    check: (f, el) => {
      const c = $('input:checked', el);
      $$('label', el).forEach((l, i) => {
        l.classList.remove('good', 'bad');
        if (i === f.ans) l.classList.add('good');
        else if (c && +c.value === i) l.classList.add('bad');
      });
      return c && +c.value === f.ans ? 1 : 0;
    }
  },
  multi: {
    html: (f) =>
      `<div class="stack" style="gap:6px">${fieldCaption(f)}<div class="checks" data-f="${f._id}">${f.opts.map((o, i) => `<label><input type="checkbox" value="${i}"> <span>${o}</span></label>`).join('')}</div></div>`,
    check: (f, el) => {
      const chosen = $$('input', el)
        .filter((x) => x.checked)
        .map((x) => +x.value);
      let good = 0;
      $$('label', el).forEach((l, i) => {
        const want = f.ans.includes(i),
          got = chosen.includes(i);
        l.classList.remove('good', 'bad');
        if (want === got) good++;
        if (want) l.classList.add('good');
        else if (got) l.classList.add('bad');
      });
      return good === f.opts.length ? 1 : Math.max(0, (good - (f.opts.length - good)) / f.opts.length);
    }
  },
  assign: {
    html: (f) =>
      `<div class="stack" style="gap:6px">${fieldCaption(f)}<div class="assign" data-f="${f._id}">${f.pts.map((p) => `<label data-p="${p}"><b>${p}</b><select aria-label="Cluster de ${p}"><option value="">?</option>${f.opts.map((o) => `<option>${o}</option>`).join('')}</select></label>`).join('')}</div>${f.partition ? '<span class="small muted">Les numéros de clusters peuvent être permutés : seul le regroupement compte.</span>' : ''}</div>`,
    check: (f, el) => {
      const got = {};
      $$('label', el).forEach((l) => {
        got[l.dataset.p] = $('select', l).value;
      });
      const map = f.partition ? bestRelabeling(f, got) : (x) => x;
      let n = 0;
      $$('label', el).forEach((l) => {
        const ok = map(got[l.dataset.p]) === f.ans[l.dataset.p];
        if (ok) n++;
        markField(l, ok);
      });
      return n / f.pts.length;
    }
  },
  /* Réponse rédigée : pas de correction automatique, voir revealOpen. */
  open: {
    html: (f) =>
      `<div class="stack" data-f="${f._id}"><textarea id="${f._id}" placeholder="Rédige ta réponse comme sur ta copie…"></textarea><div class="openres"></div></div>`,
    check: () => null
  }
};

/* Dans les données, 'choice' s'affiche en liste déroulante s'il a un libellé, en boutons radio sinon. */
const fieldKind = (f) => FIELD_KINDS[f.k === 'choice' ? (f.label ? 'select' : 'radio') : f.k];

function fieldHTML(f) {
  f._id = 'f' + ++UID;
  return fieldKind(f).html(f);
}
function checkField(f, root) {
  return fieldKind(f).check(f, $(`[data-f="${f._id}"]`, root));
}

/* Lecture et restauration des réponses, pour retrouver une copie après un rechargement. */
const fieldInputs = (f, root) => $$('input,select,textarea', $(`[data-f="${f._id}"]`, root));
const isToggle = (e) => e.type === 'radio' || e.type === 'checkbox';
const readField = (f, root) => fieldInputs(f, root).map((e) => (isToggle(e) ? e.checked : e.value));
const writeField = (f, root, values) =>
  fieldInputs(f, root).forEach((e, i) => {
    if (isToggle(e)) e.checked = !!values[i];
    else e.value = values[i] ?? '';
  });
const fieldAnswered = (f, root) => readField(f, root).some((v) => v === true || (typeof v === 'string' && v.trim()));

function revealOpen(f, root, onGrade) {
  const el = $(`[data-f="${f._id}"]`, root);
  const res = $('.openres', el);
  if (res.dataset.done) return;
  res.dataset.done = '1';
  res.append(h(`<div class="answer"><b>Réponse attendue</b>${f.model}</div>`));
  const sg = h(
    '<div class="selfgrade"><span class="small">Je me note :</span><button class="btn ok" data-v="1">Tout juste</button><button class="btn warn" data-v="0.5">À moitié</button><button class="btn ko" data-v="0">Faux / vide</button></div>'
  );
  res.append(sg);
  $$('[data-v]', sg).forEach(
    (b) =>
      (b.onclick = () => {
        $$('[data-v]', sg).forEach((x) => x.setAttribute('aria-pressed', 'false'));
        b.setAttribute('aria-pressed', 'true');
        f._self = +b.dataset.v;
        onGrade && onGrade();
      })
  );
}

function partScore(p) {
  if (!p.fields.length) return null;
  const s = p.fields.reduce((a, f) => a + (f.k === 'open' ? f._self || 0 : f._score || 0), 0);
  return (p.pts * s) / p.fields.length;
}

/* Boutons propres au mode exercice ; en examen, tout est corrigé d'un coup par p._finish. */
function addExerciseActions(p, blk, showCorr, onChange) {
  const act = $('.actions', blk);
  const hasAuto = p.fields.some((f) => f.k !== 'open');
  const hasOpen = p.fields.some((f) => f.k === 'open');
  if (hasAuto) {
    const b = h('<button class="btn primary">Vérifier</button>');
    b.onclick = () => {
      p.fields.forEach((f) => {
        if (f.k !== 'open') f._score = checkField(f, blk);
      });
      onChange && onChange();
    };
    act.append(b);
  }
  if (hasOpen) {
    const b = h('<button class="btn">Voir la réponse attendue</button>');
    b.onclick = () => {
      b.remove();
      p.fields.filter((f) => f.k === 'open').forEach((f) => revealOpen(f, blk, onChange));
    };
    act.append(b);
  }
  if (p.corr) {
    const b = h(`<button class="btn ghost">${p.fields.length ? 'Voir la correction' : 'Afficher'}</button>`);
    b.onclick = () => {
      b.remove();
      showCorr(true);
    };
    act.append(b);
  }
}

function renderParts(container, parts, mode, onChange) {
  parts.forEach((p, k) => {
    const blk = h(
      `<div class="exq"><div class="qhead"><b>${p.fields.length ? k + 1 + '. ' : ''}${p.q}</b>${p.pts ? `<span class="pts">${fmt(p.pts)} pt${p.pts > 1 ? 's' : ''}</span>` : ''}</div><div class="stack">${p.fields.map(fieldHTML).join('')}</div><div class="row actions"></div><div class="corrzone stack"></div></div>`
    );
    container.append(blk);
    const cz = $('.corrzone', blk);
    const corrHTML = () => (typeof p.corr === 'function' ? p.corr() : p.corr) || '';
    const showCorr = (open) => {
      if (cz.dataset.done || !p.corr) return;
      cz.dataset.done = '1';
      cz.append(
        h(
          `<details class="corr"${open ? ' open' : ''}><summary>Correction détaillée</summary><div>${corrHTML()}</div></details>`
        )
      );
    };
    if (mode === 'exo') addExerciseActions(p, blk, showCorr, onChange);
    p._finish = () => {
      p.fields.forEach((f) => {
        if (f.k === 'open') revealOpen(f, blk, onChange);
        else f._score = checkField(f, blk);
      });
      showCorr(false);
    };
  });
}
