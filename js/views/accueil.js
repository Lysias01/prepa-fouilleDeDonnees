/* ===================== ACCUEIL ===================== */
VIEWS.accueil = (main) => {
  const tot = mastery();
  main.append(
    h(`<div class="view">
    <section class="hero">
      <div class="sheet margin stack">
        <span class="eyebrow">Fouille de données et apprentissage automatique · M1 IBAM</span>
        <div class="hero-date">Lundi 2 novembre<small>18 h · sans documents, sans calculatrice</small></div>
        <p class="bigclock" id="bigclock">${countdownText()}</p>
        <p class="lead">Révise par questions-réponses, comprends les méthodes pas à pas, puis entraîne-toi comme au devoir. Ta progression est gardée sur cet appareil.</p>
        <div class="row"><a class="btn primary" href="#questions">Commencer les questions de cours</a><a class="btn" href="#fiches">Revoir les définitions</a></div>
      </div>
      <div class="sheet stack">
        <div class="row" style="justify-content:space-between"><h3>Ta maîtrise</h3><span class="mono">${Math.round(tot * 100)} %</span></div>
        <div class="progress" aria-hidden="true"><i style="width:${tot * 100}%"></i></div>
        <div class="stack" style="gap:8px">${CHAPTERS.map((c) => {
          const v = mastery(c.id);
          return `<div class="chap-row"><span>${c.name}</span><div class="progress"><i style="width:${v * 100}%"></i></div><span class="mono small">${Math.round(v * 100)} %</span></div>`;
        }).join('')}</div>
        <p class="small muted">${seenCount()} question(s) travaillée(s) sur ${QUESTIONS.length} · ${Object.values(store.data.cards).filter((v) => v === 'ok').length} fiche(s) sue(s) sur ${CARDS.length}</p>
      </div>
    </section>
    <section class="grid g3">
      <a class="mode" href="#fiches"><span class="k">${CARDS.length} fiches</span><b>Définitions</b><span class="muted">Courtes, faciles à retenir, en cartes recto-verso.</span></a>
      <a class="mode" href="#questions"><span class="k">${QUESTIONS.length} questions</span><b>Questions de cours</b><span class="muted">QCM et réponses rédigées, dont celles déjà tombées en devoir.</span></a>
      <a class="mode" href="#methodes"><span class="k">${TUTOS.length} méthodes</span><b>Pas à pas</b><span class="muted">Apriori, K-means, CAH, gain, Bayes… expliqués étape par étape.</span></a>
      <a class="mode" href="#exercices"><span class="k">${EXOS.length} exercices</span><b>Mode devoir</b><span class="muted">Réponds, vérifie, puis lis la correction détaillée.</span></a>
      <a class="mode" href="#examen"><span class="k">2 sujets · 2 h</span><b>Examen blanc</b><span class="muted">Chronométré, noté sur 20 avec barème.</span></a>
      <a class="mode" href="#memo"><span class="k">1 page</span><b>Mémo et pièges</b><span class="muted">Toutes les formules et les erreurs à éviter.</span></a>
    </section>
    <section class="sheet margin stack">
      <h2>Ton plan jusqu’au devoir</h2>
      <div class="stack">${REVISION_PLAN.map((p, i) => `<div class="row" style="align-items:flex-start;gap:14px;flex-wrap:nowrap"><span class="hand" style="min-width:1.4em">${i + 1}.</span><div class="stack" style="gap:2px;min-width:0"><b>${p[0]}</b><span class="muted">${p[1]} <a href="${p[2]}">Ouvrir</a></span></div></div>`).join('')}</div>
      <div class="tip"><span class="hand">Ce qui tombe à chaque devoir :</span> questions de cours (3 à 6 pts), règles d’association (6 pts), clustering (4 à 8 pts), arbre de décision (7 à 8 pts) et une question de code Python.</div>
    </section>
  </div>`)
  );
};
