/* ===== CAH saut minimal ===== */
function cah(P) {
  const d2 = (a, b) => a.c.reduce((s, v, j) => s + (v - b.c[j]) ** 2, 0);
  let clusters = P.map((p) => ({ m: [p.n], id: p.n }));
  const merges = [];
  const snaps = [];
  while (clusters.length > 1) {
    const M = clusters.map((A) =>
      clusters.map((B) => {
        if (A === B) return 0;
        let mn = Infinity;
        A.m.forEach((a) =>
          B.m.forEach((b) => {
            mn = Math.min(
              mn,
              d2(
                P.find((p) => p.n === a),
                P.find((p) => p.n === b)
              )
            );
          })
        );
        return mn;
      })
    );
    let best = Infinity,
      bi = -1,
      bj = -1;
    for (let i = 0; i < clusters.length; i++)
      for (let j = i + 1; j < clusters.length; j++)
        if (M[i][j] < best - 1e-9) {
          best = M[i][j];
          bi = i;
          bj = j;
        }
    snaps.push({ clusters: clusters.map((c) => c.m.slice()), M, bi, bj, d2: best });
    const nc = {
      m: [...clusters[bi].m, ...clusters[bj].m],
      left: clusters[bi],
      right: clusters[bj],
      hgt: Math.sqrt(best),
      d2: best
    };
    merges.push(nc);
    clusters = clusters.filter((_, k) => k !== bi && k !== bj);
    clusters.push(nc);
  }
  return { merges, snaps, root: clusters[0] };
}
function dendroSVG(root, opt = {}) {
  const leaves = [];
  (function walk(n) {
    if (!n.left) leaves.push(n);
    else {
      walk(n.left);
      walk(n.right);
    }
  })(root);
  const W = 360,
    H = 230,
    pad = 36,
    top = 14;
  const maxH = opt.maxH || root.hgt * 1.08;
  const sx = (i) => pad + 14 + (i * (W - pad - 28)) / Math.max(1, leaves.length - 1);
  const sy = (v) => H - 28 - (v / maxH) * (H - 28 - top);
  const pos = new Map();
  leaves.forEach((l, i) => pos.set(l, { x: sx(i), y: sy(0) }));
  let lines = '';
  const shown = new Set(opt.upto != null ? opt.mergesShown : null);
  (function draw(n) {
    if (!n.left) return pos.get(n);
    const a = draw(n.left),
      b = draw(n.right);
    const y = sy(n.hgt);
    const vis = opt.upto == null || shown.has(n);
    const p = { x: (a.x + b.x) / 2, y };
    if (vis)
      lines += `<path d="M${a.x} ${a.y}V${y}H${b.x}V${b.y}" fill="none" stroke="var(--accent)" stroke-width="2"/>`;
    pos.set(n, vis ? p : { x: p.x, y: Math.min(a.y, b.y), hidden: true });
    return vis ? p : { x: p.x, y: Math.min(a.y, b.y) };
  })(root);
  let ax = `<line class="axis" x1="${pad}" y1="${sy(0)}" x2="${pad}" y2="${sy(maxH)}"/>`;
  const step = opt.tick || (maxH > 4 ? 1 : 0.5);
  for (let v = 0; v <= maxH + 1e-9; v += step)
    ax += `<line class="gridl" x1="${pad}" y1="${sy(v)}" x2="${W - 6}" y2="${sy(v)}"/><text x="${pad - 6}" y="${sy(v) + 3}" text-anchor="end" font-size="10">${fmt(v, 1)}</text>`;
  const labels = leaves
    .map(
      (l, i) => `<text x="${sx(i)}" y="${H - 10}" text-anchor="middle" font-size="12" font-weight="700">${l.id}</text>`
    )
    .join('');
  const cut =
    opt.cut != null
      ? `<line x1="${pad}" y1="${sy(opt.cut)}" x2="${W - 6}" y2="${sy(opt.cut)}" stroke="var(--margin)" stroke-width="2" stroke-dasharray="6 4"/><text x="${W - 8}" y="${sy(opt.cut) - 5}" text-anchor="end" font-size="11" style="fill:var(--margin)" font-weight="700">coupe h = ${fmt(opt.cut, 2)}</text>`
      : '';
  return `<svg class="plot" viewBox="0 0 ${W} ${H}" role="img" aria-label="Dendrogramme">${ax}${lines}${labels}${cut}</svg>`;
}
function cahSteps(cfg) {
  const { P, cutK } = cfg;
  const R = cah(P);
  const steps = [];
  const n = P.length;
  const first = R.snaps[0];
  steps.push({
    t: 'Les données et la matrice des distances',
    h: `<p>Au départ, <b>chaque point forme un cluster</b>. On calcule toutes les distances deux à deux (ici les <b>carrés</b> des distances euclidiennes, puis la racine pour la hauteur du dendrogramme).</p>
    ${table(
      ['d²', ...P.map((p) => p.n)],
      P.map((p, i) => [
        p.n,
        ...P.map((q, j) =>
          j > i
            ? ''
            : i === j
              ? '0'
              : {
                  v: String(first.M[i][j]),
                  cls: (first.bi === j && first.bj === i) || (first.bi === i && first.bj === j) ? 'min' : ''
                }
        )
      ])
    )}
    <p class="small muted">Matrice triangulaire : d(i,j) = d(j,i) et d(i,i) = 0.</p>`
  });
  R.snaps.forEach((s, k) => {
    const A = s.clusters[s.bi],
      B = s.clusters[s.bj];
    const names = s.clusters.map((c) => (c.length > 1 ? '(' + c.join(' ') + ')' : c[0]));
    const rows = s.clusters.map((c, i) => [
      names[i],
      ...s.clusters.map((_, j) =>
        j >= i
          ? i === j
            ? '0'
            : ''
          : { v: String(s.M[i][j]), cls: (i === s.bj && j === s.bi) || (i === s.bi && j === s.bj) ? 'min' : '' }
      )
    ]);
    const shown = R.merges.slice(0, k + 1);
    steps.push({
      t: `Fusion ${k + 1} : ${A.length > 1 ? '(' + A.join(' ') + ')' : A[0]} + ${B.length > 1 ? '(' + B.join(' ') + ')' : B[0]}`,
      h: `<div class="twocol"><div class="stack">${k > 0 ? table(['d² min', ...names], rows) : ''}
      <p>Plus petite distance entre deux clusters : <b>d² = ${s.d2}</b>, soit d = √${s.d2} ≈ <b>${fmt(Math.sqrt(s.d2), 3)}</b>.</p>
      <p>On fusionne <b>{${A.join(', ')}}</b> et <b>{${B.join(', ')}}</b> à la hauteur ${fmt(Math.sqrt(s.d2), 3)}.</p>
      ${k === 0 ? '' : '<p class="small muted">Saut minimal : la distance entre deux groupes est la plus petite distance entre un point de l\'un et un point de l\'autre.</p>'}</div>
      <div>${dendroSVG(R.root, { upto: k, mergesShown: shown })}</div></div>`
    });
  });
  const hs = R.merges.map((m) => m.hgt);
  const kk = cutK || 3;
  const cut = (hs[n - kk - 1] + hs[n - kk]) / 2;
  const groups = [];
  (function g(nd) {
    if (!nd.left || nd.hgt < cut) groups.push(nd.m);
    else {
      g(nd.left);
      g(nd.right);
    }
  })(R.root);
  steps.push({
    t: `Couper le dendrogramme pour obtenir ${kk} clusters`,
    h: `<div class="twocol"><div class="stack"><p>On trace une ligne horizontale qui coupe <b>exactement ${kk} branches verticales</b> : entre la hauteur ${fmt(hs[n - kk - 1], 3)} et la hauteur ${fmt(hs[n - kk], 3)}.</p>
    <p><b>Clusters :</b> ${groups.map((g, i) => `C${i + 1} = {${g.join(', ')}}`).join(' ; ')}</p>
    <div class="tip"><span class="hand">Méthode :</span> compte les traits verticaux traversés par ta ligne de coupe. 3 traits = 3 clusters. Chaque trait regroupe toutes les feuilles situées en dessous.</div></div>
    <div>${dendroSVG(R.root, { cut })}</div></div>`
  });
  return { steps, R };
}
