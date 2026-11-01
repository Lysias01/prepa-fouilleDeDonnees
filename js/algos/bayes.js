/* ===== Naïve Bayes ===== */
function bayesSteps(cfg) {
  const { rows, attrs, cls, classes, X } = cfg;
  const N = rows.length;
  const steps = [];
  const cnt = (c) => rows.filter((r) => r[cls] === c).length;
  steps.push({
    t: "Les données et l'objet X à classer",
    h: `${table(
      ['N°', ...attrs, cls],
      rows.map((r, i) => [i + 1, ...attrs.map((a) => r[a]), r[cls]])
    )}
    <p>On veut classer <b>X = &lt;${attrs.map((a) => X[a]).join(', ')}&gt;</b>.</p>
    <div class="formula">On affecte à X la classe C qui maximise P(X|C) · P(C)
avec l'hypothèse naïve : P(X|C) = P(x₁|C) × P(x₂|C) × … × P(xₖ|C)</div>`
  });
  steps.push({
    t: 'Étape 1 : probabilités a priori P(C)',
    h: `<div class="formula">${classes.map((c) => `P(${c}) = ${cnt(c)}/${N}`).join('\n')}</div>`
  });
  const res = classes.map((c) => {
    const nc = cnt(c);
    const terms = attrs.map((a) => {
      const k = rows.filter((r) => r[cls] === c && r[a] === X[a]).length;
      return { a, k, nc };
    });
    const val = (terms.reduce((s, t) => (s * t.k) / t.nc, 1) * nc) / N;
    return { c, nc, terms, val };
  });
  steps.push({
    t: 'Étape 2 : probabilités conditionnelles P(xᵢ | C)',
    h: `<p>Pour chaque classe, on compte la fréquence de la valeur de X parmi les exemples de cette classe.</p>
    ${table(
      ['', ...classes.map((c) => 'Classe ' + c)],
      attrs.map((a) => [
        `P(${a} = ${X[a]} | C)`,
        ...res.map((r) => {
          const t = r.terms.find((u) => u.a === a);
          return { v: `${t.k}/${t.nc}`, cls: t.k === 0 ? 'no' : '' };
        })
      ])
    )}`
  });
  const best = res.reduce((a, b) => (b.val > a.val ? b : a));
  steps.push({
    t: 'Étape 3 : produit et décision',
    h: `<div class="formula">${res.map((r) => `P(X|${r.c})·P(${r.c}) = ${r.terms.map((t) => `${t.k}/${t.nc}`).join(' × ')} × ${r.nc}/${N} = ${fmt(r.val, 4)}`).join('\n')}</div>
    <p>La plus grande valeur est pour <b>${best.c}</b> : X est classé <b>${best.c}</b>.</p>
    ${res.some((r) => r.terms.some((t) => t.k === 0)) ? '<div class="trap">Une probabilité conditionnelle nulle annule tout le produit. <span class="tag hc">Hors cours</span> En pratique on corrige ce problème avec le lissage de Laplace (ajouter 1 à chaque compte).</div>' : ''}`
  });
  return { steps, res, best };
}
