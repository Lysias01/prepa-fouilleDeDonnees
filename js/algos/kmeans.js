/* ===== K-MEANS ===== */
function kmeans(P, init, maxIt = 12) {
  const dim = P[0].c.length;
  let C = init.map((c) => c.slice());
  const it = [];
  let prev = null;
  for (let n = 0; n < maxIt; n++) {
    const D = P.map((p) => C.map((c) => c.reduce((s, v, j) => s + (p.c[j] - v) ** 2, 0)));
    const assign = D.map((row) => row.indexOf(Math.min(...row)));
    const newC = C.map((c, k) => {
      const m = P.filter((_, i) => assign[i] === k);
      if (!m.length) return c;
      return Array.from({ length: dim }, (_, j) => m.reduce((s, p) => s + p.c[j], 0) / m.length);
    });
    const changed = prev ? assign.some((a, i) => a !== prev[i]) : true;
    it.push({ C, D, assign, newC, changed });
    if (prev && !changed) break;
    prev = assign;
    C = newC;
  }
  return it;
}
const COLORS = ['var(--c1)', 'var(--c2)', 'var(--c3)', 'var(--c4)'];
function plot2D(P, opt = {}) {
  const xs = P.map((p) => p.c[0]),
    ys = P.map((p) => p.c[1]);
  const xmax = Math.max(...xs, ...(opt.centers || []).map((c) => c[0])) + 1,
    ymax = Math.max(...ys, ...(opt.centers || []).map((c) => c[1])) + 1;
  const x0 = 0,
    y0 = 0,
    W = 320,
    H = 260,
    pad = 34;
  const sx = (x) => pad + ((x - x0) / (xmax - x0)) * (W - pad - 12);
  const sy = (y) => H - pad - ((y - y0) / (ymax - y0)) * (H - pad - 12);
  let g = '';
  for (let x = 0; x <= xmax; x++)
    g += `<line class="gridl" x1="${sx(x)}" y1="${sy(0)}" x2="${sx(x)}" y2="${sy(ymax)}"/><text x="${sx(x)}" y="${H - pad + 16}" text-anchor="middle" font-size="10">${x}</text>`;
  for (let y = 0; y <= ymax; y++)
    g += `<line class="gridl" x1="${sx(0)}" y1="${sy(y)}" x2="${sx(xmax)}" y2="${sy(y)}"/><text x="${pad - 8}" y="${sy(y) + 3}" text-anchor="end" font-size="10">${y}</text>`;
  g += `<line class="axis" x1="${sx(0)}" y1="${sy(0)}" x2="${sx(xmax)}" y2="${sy(0)}"/><line class="axis" x1="${sx(0)}" y1="${sy(0)}" x2="${sx(0)}" y2="${sy(ymax)}"/>`;
  const pts = P.map((p, i) => {
    const col = opt.assign ? COLORS[opt.assign[i]] : 'var(--ink-soft)';
    return `<circle cx="${sx(p.c[0])}" cy="${sy(p.c[1])}" r="6" fill="${col}" stroke="var(--card)" stroke-width="1.5"/><text x="${sx(p.c[0]) + 8}" y="${sy(p.c[1]) - 7}" font-size="11" font-weight="700">${p.n}</text>`;
  }).join('');
  const cs = (opt.centers || [])
    .map((c, k) => {
      const x = sx(c[0]),
        y = sy(c[1]);
      return `<g><path d="M${x - 7} ${y - 7}L${x + 7} ${y + 7}M${x - 7} ${y + 7}L${x + 7} ${y - 7}" stroke="${COLORS[k]}" stroke-width="3.2" stroke-linecap="round"/><text x="${x + 9}" y="${y + 14}" font-size="10.5" fill="${COLORS[k]}" style="fill:${COLORS[k]}" font-weight="800">c${k + 1}</text></g>`;
    })
    .join('');
  return `<svg class="plot" viewBox="0 0 ${W} ${H}" role="img" aria-label="Nuage de points">${g}${pts}${cs}</svg>`;
}
function plot1D(P, opt = {}) {
  const xs = P.map((p) => p.c[0]);
  const xmax = Math.max(...xs) + 1;
  const W = 360,
    H = 90,
    pad = 16;
  const sx = (x) => pad + (x / xmax) * (W - 2 * pad);
  let g = `<line class="axis" x1="${sx(0)}" y1="50" x2="${sx(xmax)}" y2="50"/>`;
  for (let x = 0; x <= xmax; x++) g += `<line class="gridl" x1="${sx(x)}" y1="46" x2="${sx(x)}" y2="54"/>`;
  const pts = P.map(
    (p, i) =>
      `<circle cx="${sx(p.c[0])}" cy="50" r="6" fill="${opt.assign ? COLORS[opt.assign[i]] : 'var(--ink-soft)'}"/><text x="${sx(p.c[0])}" y="34" text-anchor="middle" font-size="11" font-weight="700">${p.n}</text>`
  ).join('');
  const cs = (opt.centers || [])
    .map(
      (c, k) =>
        `<path d="M${sx(c[0])} 60 l-6 12 h12z" fill="${COLORS[k]}"/><text x="${sx(c[0])}" y="86" text-anchor="middle" font-size="10" font-weight="800" style="fill:${COLORS[k]}">M${k + 1}</text>`
    )
    .join('');
  return `<svg class="plot" viewBox="0 0 ${W} ${H}" role="img" aria-label="Points sur un axe">${g}${pts}${cs}</svg>`;
}
const cfmt = (c) => '(' + c.map((v) => fmt(v, 2)).join(' ; ') + ')';
function kmeansSteps(cfg) {
  const { P, init, initNames } = cfg;
  const dim = P[0].c.length;
  const it = kmeans(P, init);
  const K = init.length;
  const plot = (o) => (dim === 2 ? plot2D(P, o) : plot1D(P, o));
  const steps = [];
  steps.push({
    t: 'Les données et les centres initiaux',
    h: `<div class="twocol"><div class="stack">
      ${table(
        ['Point', ...(dim === 2 ? ['V1 (x)', 'V2 (y)'] : ['Valeur'])],
        P.map((p) => [p.n, ...p.c])
      )}
      <p>k = <b>${K}</b>. Centres initiaux : ${init.map((c, k) => `c${k + 1} = ${initNames ? initNames[k] + ' ' : ''}${cfmt(c)}`).join(' ; ')}.</p></div>
      <div>${plot({ centers: init })}</div></div>
      <div class="tip"><span class="hand">Sans calculatrice :</span> pour savoir quel centre est le plus proche, compare les <b>distances au carré</b> (dx² + dy²). La racine carrée ne change pas l'ordre : inutile de la calculer. C'est ce que le professeur a fait au tableau le 29 octobre.</div>`
  });
  it.forEach((s, n) => {
    const head = [
      'Point',
      ...s.C.map((c, k) => `d²(·, c${k + 1})<br><span class="muted small">${cfmt(c)}</span>`),
      'Cluster'
    ];
    const rows = P.map((p, i) => {
      const mn = Math.min(...s.D[i]);
      return [p.n, ...s.D[i].map((d) => ({ v: fmt(d, 2), cls: d === mn ? 'min' : '' })), `C${s.assign[i] + 1}`];
    });
    const groups = s.C.map(
      (_, k) =>
        `C${k + 1} = {${P.filter((_, i) => s.assign[i] === k)
          .map((p) => p.n)
          .join(', ')}}`
    ).join(' ; ');
    steps.push({
      t: `Itération ${n + 1} : affectation au centre le plus proche`,
      h: `<div class="twocol"><div class="stack">${table(head, rows)}</div><div>${plot({ assign: s.assign, centers: s.C })}</div></div>
      <p><b>${groups}</b></p>
      ${n > 0 ? (s.changed ? '<p>Des points ont changé de cluster : on continue.</p>' : "<p><b>Aucun point n'a changé de cluster → l'algorithme s'arrête.</b></p>") : ''}`
    });
    if (n === 0 || s.changed) {
      const calc = s.newC
        .map((c, k) => {
          const m = P.filter((_, i) => s.assign[i] === k);
          const comp = (j) => `(${m.map((p) => p.c[j]).join(' + ')}) / ${m.length} = ${fmt(c[j], 2)}`;
          return `c${k + 1} = ${dim === 2 ? `( ${comp(0)} ; ${comp(1)} )` : comp(0)}`;
        })
        .join('\n');
      steps.push({
        t: `Itération ${n + 1} : recalcul des centres (moyennes)`,
        h: `<p>Le nouveau centre de chaque cluster est son <b>centre de gravité</b> : la moyenne des coordonnées de ses points.</p><div class="formula">${calc}</div>${plot({ assign: s.assign, centers: s.newC })}`
      });
    }
  });
  const last = it[it.length - 1];
  steps.push({
    t: 'Résultat final et rédaction',
    h: `<p><b>Clusters finaux :</b> ${last.C.map(
      (_, k) =>
        `C${k + 1} = {${P.filter((_, i) => last.assign[i] === k)
          .map((p) => p.n)
          .join(', ')}}`
    ).join(' ; ')}.</p>
    <p>Centres finaux : ${last.C.map((c, k) => `c${k + 1} = ${cfmt(c)}`).join(' ; ')}.</p>
    <div class="tip"><span class="hand">Dans la copie :</span> (1) nommer la distance (euclidienne) ; (2) un tableau des distances par itération ; (3) les clusters obtenus ; (4) les nouveaux centres ; (5) la phrase d'arrêt « aucune affectation ne change ».</div>`
  });
  return { steps, it };
}
