/* ===================== MÉMO ===================== */
VIEWS.memo = (main) => {
  main.append(
    h(`<div class="view">
    <div class="stack"><span class="eyebrow">À relire juste avant le devoir</span><h1>Mémo et pièges</h1><div class="row no-print"><button class="btn" id="printMemo">Imprimer le mémo</button></div></div>
    <div class="grid g2">
      <div class="sheet stack"><h2>Règles d’association</h2><div class="formula">sup(X → Y) = P(X ∪ Y) = nb de transactions contenant X et Y / N
conf(X → Y) = sup(X ∪ Y) / sup(X) = P(Y | X)
Valide : sup ≥ minsup ET conf ≥ minconf
Nombre de règles d’un k-itemset : 2^k − 2</div><p><b>Apriori</b> : L1 → (jointure, élagage, comptage) → L2 → … jusqu’à Ck vide ; puis règles A → X − A.</p></div>
      <div class="sheet stack"><h2>Clustering</h2><div class="formula">Minkowski : (Σ |xi − xj|^q)^(1/q)
q = 1 Manhattan · q = 2 euclidienne
Jaccard = (b + c)/(a + b + c) · simple = (b + c)/(a + b + c + d)
Nominale = (p − m)/p · ordinale y = (r − 1)/(k − 1)
z = (x − m)/s, s = (1/n) Σ |x − m|</div><p><b>K-means</b> : affecter → recalculer les moyennes → recommencer jusqu’à stabilité. <b>CAH</b> : fusionner les 2 plus proches ; couper le dendrogramme.</p></div>
      <div class="sheet stack"><h2>Arbre de décision</h2><div class="formula">I(p,n) = −p/(p+n)·log₂(p/(p+n)) − n/(p+n)·log₂(n/(p+n))
E(A) = Σ (pi+ni)/(p+n) · I(pi,ni)
Gain(A) = I(p,n) − E(A) → racine = gain max</div>${LOGTABLE}<p class="small">I(1,1) = 1 · I(2,1) = 0,918 · I(3,1) = 0,811 · I(4,1) = 0,722 · I(3,2) = 0,971 · I(9,5) = 0,940</p></div>
      <div class="sheet stack"><h2>Évaluation et Bayes</h2><div class="formula">Accuracy = (VP + VN)/total
Précision = VP/(VP + FP) · Rappel = VP/(VP + FN)
F1 = 2PR/(P + R)
Naïve Bayes : classe = argmax P(C) · Π P(xi | C)</div><div class="formula">Min-max : (x − min)/(max − min)
Outlier : x < Q1 − 1,5·IQR ou x > Q3 + 1,5·IQR</div></div>
    </div>
    <div class="sheet stack"><h2>Les pièges qui coûtent des points</h2><div class="stack">${TRAPS.map((t) => `<div class="trap"><b>${t[0]}</b> : ${t[1]}</div>`).join('')}</div></div>
    <div class="sheet stack"><h2>Rédiger une question de cours</h2><ol class="prose"><li><b>Définir</b> avec les mots du cours (une phrase).</li><li><b>Expliquer</b> le principe ou les étapes (2 à 4 lignes).</li><li><b>Illustrer</b> par un exemple ou un algorithme.</li><li>Pour une comparaison : un tableau à deux colonnes.</li></ol></div>
  </div>`)
  );
  $('#printMemo', main).onclick = () => window.print();
};
