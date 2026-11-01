/* ===== APRIORI ===== */
function apriori(T, minCount, minConf, order) {
  const items = order || [...new Set(T.flat())];
  const idx = (x) => items.indexOf(x);
  const sortSet = (s) => s.slice().sort((a, b) => idx(a) - idx(b));
  const count = (s) => T.filter((t) => s.every((x) => t.includes(x))).length;
  const which = (s) => T.map((t, i) => (s.every((x) => t.includes(x)) ? i + 1 : null)).filter(Boolean);
  const key = (s) => sortSet(s).join('|');
  const levels = [];
  let C = items.map((x) => ({ set: [x] }));
  let k = 1,
    Lprev = null;
  while (true) {
    let joined = C,
      pruned = [];
    if (k > 1) {
      joined = [];
      const Lk = Lprev.map((x) => x.set);
      for (let i = 0; i < Lk.length; i++)
        for (let j = i + 1; j < Lk.length; j++) {
          const a = Lk[i],
            b = Lk[j];
          if (sameArr(a.slice(0, k - 2), b.slice(0, k - 2))) {
            const u = sortSet([...new Set([...a, ...b])]);
            if (u.length === k && !joined.some((c) => key(c.set) === key(u))) joined.push({ set: u, from: [a, b] });
          }
        }
      const Lkeys = new Set(Lk.map(key));
      joined.forEach((c) => {
        const bad = c.set.map((_, r) => c.set.filter((__, q) => q !== r)).find((sub) => !Lkeys.has(key(sub)));
        if (bad) {
          c.pruned = true;
          c.prunedBy = bad;
          pruned.push(c);
        }
      });
    }
    const kept = joined.filter((c) => !c.pruned);
    kept.forEach((c) => {
      c.count = count(c.set);
      c.tids = which(c.set);
      c.freq = c.count >= minCount;
    });
    const L = kept.filter((c) => c.freq);
    levels.push({ k, C: joined, kept, L, pruned });
    if (!L.length) break;
    Lprev = L;
    k++;
    if (k > items.length) break;
    C = null;
  }
  const freqAll = levels.flatMap((l) => l.L);
  const cnt = (s) => count(s);
  const rules = [];
  freqAll
    .filter((f) => f.set.length > 1)
    .forEach((f) => {
      const n = f.set.length;
      const subsets = [];
      for (let m = 1; m < (1 << n) - 1; m++) subsets.push(f.set.filter((_, i) => m & (1 << i)));
      subsets.sort((a, b) => a.length - b.length);
      subsets.forEach((A) => {
        const B = f.set.filter((x) => !A.includes(x));
        const den = cnt(A);
        rules.push({ A, B, num: f.count, den, conf: f.count / den, ok: f.count / den >= minConf - 1e-9, from: f.set });
      });
    });
  return { items, levels, rules, freqAll, count: cnt, which };
}

function aprioriSteps(cfg) {
  const { T, names, minCount, minConf, order, sup, conf } = cfg;
  const N = T.length;
  const R = apriori(T, minCount, minConf, order);
  const steps = [];
  const tlist = T.map((t, i) => [names ? names[i] : 'T' + (i + 1), t.join(', ')]);
  steps.push({
    t: 'Les données et le seuil de support',
    h: `<p>On dispose de <b>${N} transactions</b>. Chaque ligne est un ensemble d'items.</p>
    ${table(['Transaction', 'Items'], tlist)}
    <div class="formula">minsup = ${sup} → ${sup} × ${N} = ${fmt(cfg.minsupRaw * N)} → un itemset est fréquent s'il apparaît dans <b>au moins ${minCount} transaction${minCount > 1 ? 's' : ''}</b>.
minconf = ${conf}</div>
    <div class="tip"><span class="hand">Réflexe copie :</span> écris toujours la conversion du seuil en nombre de transactions. On arrondit <b>au-dessus</b> : ${fmt(cfg.minsupRaw * N)} → ${minCount}.</div>`
  });
  R.levels.forEach((lv) => {
    const k = lv.k;
    if (k === 1) {
      steps.push({
        t: 'Étape 1 : candidats de taille 1 (C1) → fréquents (L1)',
        h: `<p>On compte chaque item seul. On garde ceux dont le support ≥ ${minCount}.</p>
        ${table(
          ['Item', 'Transactions', 'Support', 'Fréquent ?'],
          lv.kept.map((c) => [
            c.set[0],
            c.tids.join(', ') || '—',
            frac(c.count, N),
            { v: c.freq ? 'Oui' : 'Non', cls: c.freq ? 'yes' : 'no' }
          ])
        )}
        <p><b>L1 = </b>${lv.L.map((c) => set(c.set)).join(', ') || '∅'}</p>`
      });
      return;
    }
    const joinTxt = lv.C.length
      ? lv.C.map(
          (c) =>
            `<li>${set(c.set)} ${c.from ? `<span class="muted small">(${set(c.from[0])} ⋈ ${set(c.from[1])})</span>` : ''}${c.pruned ? ` → <b style="color:var(--ko)">élagué</b> car ${set(c.prunedBy)} ∉ L${k - 1}` : ''}</li>`
        ).join('')
      : '<li>Aucun candidat possible</li>';
    steps.push({
      t: `Étape ${k} (a) : jointure et élagage → C${k}`,
      h: `<p><b>Jointure :</b> on combine deux itemsets de L${k - 1} qui ont les <b>${k - 2 === 0 ? '0 premier élément (toutes les paires)' : k - 2 + ' premier' + (k - 2 > 1 ? 's' : '') + ' élément' + (k - 2 > 1 ? 's' : '') + ' en commun'}</b>.</p>
      <p><b>Élagage :</b> on supprime tout candidat dont un sous-ensemble de taille ${k - 1} n'est pas dans L${k - 1} (antimonotonie). Cette étape se fait <b>sans lire les données</b>.</p>
      <ul>${joinTxt}</ul>
      <p><b>C${k} = </b>${lv.kept.map((c) => set(c.set)).join(', ') || '∅'}</p>`
    });
    if (!lv.kept.length) {
      steps.push({
        t: `Arrêt de l'algorithme`,
        h: `<p>C${k} est vide, donc L${k} est vide : <b>fin de la recherche des itemsets fréquents</b>.</p>`
      });
      return;
    }
    steps.push({
      t: `Étape ${k} (b) : comptage → L${k}`,
      h: `<p>Un seul passage sur les données pour compter les candidats restants.</p>
      ${table(
        ['Candidat', 'Transactions', 'Support', 'Fréquent ?'],
        lv.kept.map((c) => [
          set(c.set),
          c.tids.join(', ') || '—',
          frac(c.count, N),
          { v: c.freq ? 'Oui' : 'Non', cls: c.freq ? 'yes' : 'no' }
        ])
      )}
      <p><b>L${k} = </b>${lv.L.map((c) => set(c.set)).join(', ') || '∅'}</p>
      ${!lv.L.length ? '<p>L' + k + ' est vide : <b>arrêt</b> de la recherche des itemsets fréquents.</p>' : ''}`
    });
  });
  const big = R.freqAll.filter((f) => f.set.length > 1);
  if (big.length) {
    const rows = R.rules.map((r) => [
      set(r.from),
      `${r.A.join(', ')} → ${r.B.join(', ')}`,
      `${r.num}/${r.den} = ${pct(r.conf, 1)}`,
      { v: r.ok ? 'Retenue' : 'Rejetée', cls: r.ok ? 'yes' : 'no' }
    ]);
    steps.push({
      t: 'Génération des règles et calcul de la confiance',
      h: `<p>Pour chaque itemset fréquent X (taille ≥ 2) et chaque sous-ensemble non vide A ⊂ X, on forme <b>A → X − A</b>.</p>
      <div class="formula">confiance(A → B) = support(A ∪ B) / support(A)</div>
      ${table(['Itemset', 'Règle', 'Confiance', `≥ ${conf} ?`], rows)}
      <p><b>${R.rules.filter((r) => r.ok).length} règle(s) retenue(s).</b> Toutes ont un support ≥ minsup puisqu'elles viennent d'itemsets fréquents.</p>`
    });
  } else {
    steps.push({
      t: 'Génération des règles',
      h: '<p>Aucun itemset fréquent de taille ≥ 2 : aucune règle ne peut être générée.</p>'
    });
  }
  return { steps, R };
}
