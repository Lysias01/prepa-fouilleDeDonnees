/* ===== Gain d'information ===== */
const Ival = (p, n) => {
  const t = p + n;
  let s = 0;
  [p, n].forEach((x) => {
    if (x) s -= (x / t) * LOG2(x / t);
  });
  return s;
};
function Iexpr(p, n) {
  const t = p + n;
  if (!p || !n) return `I(${p},${n}) = 0 <span class="muted">(une seule classe : aucun désordre)</span>`;
  const g = (a) => {
    const d = gcd(a, t);
    return `${a / d}/${t / d}`;
  };
  return `I(${p},${n}) = −${g(p)}·log₂(${g(p)}) − ${g(n)}·log₂(${g(n)}) = ${g(p)}×${fmt(-LOG2(p / t), 3)} + ${g(n)}×${fmt(-LOG2(n / t), 3)} ≈ <b>${fmt(Ival(p, n), 3)}</b>`;
}
function gainCompute(rows, attrs, cls, pos) {
  const p = rows.filter((r) => r[cls] === pos).length,
    n = rows.length - p;
  const I0 = Ival(p, n);
  const res = attrs.map((a) => {
    const vals = [...new Set(rows.map((r) => r[a]))];
    const parts = vals.map((v) => {
      const s = rows.filter((r) => r[a] === v);
      const pi = s.filter((r) => r[cls] === pos).length;
      return { v, pi, ni: s.length - pi, n: s.length };
    });
    const E = parts.reduce((s, q) => s + (q.n / rows.length) * Ival(q.pi, q.ni), 0);
    return { a, parts, E, G: I0 - E };
  });
  return { p, n, I0, res };
}
function gainSteps(cfg) {
  const { rows, attrs, cls, pos, neg, labels } = cfg;
  const C = gainCompute(rows, attrs, cls, pos);
  const N = rows.length;
  const steps = [];
  steps.push({
    t: "Les données d'apprentissage",
    h: `${table(
      ['N°', ...attrs, cls],
      rows.map((r, i) => [r._id || i + 1, ...attrs.map((a) => r[a]), { v: r[cls], cls: r[cls] === pos ? 'yes' : '' }])
    )}
    <p>Deux classes : P = « ${pos} » (p = <b>${C.p}</b>) et N = « ${neg} » (n = <b>${C.n}</b>).</p>`
  });
  steps.push({
    t: "Étape 1 : quantité d'information I(p, n) de tout l'ensemble",
    h: `<div class="formula">I(p,n) = − p/(p+n) · log₂(p/(p+n)) − n/(p+n) · log₂(n/(p+n))</div>
    <div class="formula">${Iexpr(C.p, C.n)}</div>
    <div class="tip"><span class="hand">Valeurs à connaître :</span> log₂(1/2) = −1 ; log₂(1/4) = −2 ; log₂(1/3) ≈ −1,585 ; log₂(2/3) ≈ −0,585 ; log₂(3/4) ≈ −0,415 ; log₂(1/5) ≈ −2,322 ; log₂(4/5) ≈ −0,322. À l'examen, le professeur donne en général ces valeurs ou directement I et E.</div>`
  });
  C.res.forEach((r) => {
    const lines = r.parts
      .map(
        (q) =>
          `<li><b>${r.a} = ${q.v}</b> : ${q.n} exemple(s), ${q.pi} « ${pos} » / ${q.ni} « ${neg} » → ${Iexpr(q.pi, q.ni)}</li>`
      )
      .join('');
    const sum = r.parts.map((q) => `${q.n}/${N}×${fmt(Ival(q.pi, q.ni), 3)}`).join(' + ');
    steps.push({
      t: `Étape 2 : entropie E(${r.a}) et gain`,
      h: `<ul>${lines}</ul>
      <div class="formula">E(${r.a}) = Σ (pᵢ+nᵢ)/(p+n) · I(pᵢ,nᵢ) = ${sum} ≈ ${fmt(r.E, 3)}
Gain(${r.a}) = I(p,n) − E(${r.a}) = ${fmt(C.I0, 3)} − ${fmt(r.E, 3)} ≈ <b>${fmt(r.G, 3)}</b></div>`
    });
  });
  const best = C.res.reduce((a, b) => (b.G > a.G ? b : a));
  steps.push({
    t: 'Étape 3 : choisir la racine',
    h: `${table(
      ['Attribut', 'E(A)', 'Gain(A)'],
      C.res.map((r) => [r.a, fmt(r.E, 3), { v: fmt(r.G, 3), cls: r === best ? 'min' : '' }])
    )}
    <p>L'attribut de <b>gain maximal</b> est <b>${best.a}</b> : il est placé à la <b>racine</b>.</p>
    <div class="trap"><b>Attention :</b> le support de cours de classification écrit I(p,n) sans diviser par (p+n) (ex. I(9,5) = 13,16 et I(2,2) = 4). Tous les gains sont alors multipliés par le nombre d'exemples, mais <b>le classement des attributs est le même</b>. Les devoirs utilisent la version normalisée (I(9,5) = 0,940).</div>`
  });
  if (cfg.after) cfg.after.forEach((s) => steps.push(s));
  return { steps, C };
}
