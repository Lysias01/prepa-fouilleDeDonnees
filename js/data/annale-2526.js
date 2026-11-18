/* ===================== DEVOIR 2025-2026 (session normale) ===================== */
/* Devoir n° 1, 2 h, quatre parties de 5 points. Repris tel qu'imprimé pour le refaire en exercices corrigés
   (une page par partie) et en simulation chronométrée. Deux erreurs de l'énoncé sont signalées dans le corrigé. */
const N25_TAG = 'Devoir 2025-26';
const N25_TITLE = 'Devoir 2025-2026 (session normale)';

DS.hta = [
  ['Jeune', 'Non', 'Non'],
  ['Jeune', 'Oui', 'Oui'],
  ['Jeune', 'Non', 'Non'],
  ['Jeune', 'Non', 'Non'],
  ['Moyen', 'Non', 'Non'],
  ['Moyen', 'Oui', 'Oui'],
  ['Moyen', 'Oui', 'Oui'],
  ['Senior', 'Non', 'Oui'],
  ['Senior', 'Oui', 'Oui'],
  ['Senior', 'Oui', 'Oui'],
  ['Senior', 'Non', 'Oui'],
  ['Senior', 'Non', 'Oui']
].map((r) => ({ Âge: r[0], Fumeur: r[1], Hypertension: r[2] }));

const manhattan = (a, b) => a.reduce((s, v, j) => s + Math.abs(v - b[j]), 0);

/* Table des distances telle qu'imprimée dans l'énoncé (ligne A2 : deux valeurs inversées, voir le corrigé) */
const N25_PRINTED = [
  [0, 5, 12, 5, 10, 10, 9, 3],
  [null, 0, 7, 6, 5, 4, 5, 6],
  [null, null, 0, 7, 2, 2, 9, 9],
  [null, null, null, 0, 5, 5, 10, 2],
  [null, null, null, null, 0, 2, 9, 7],
  [null, null, null, null, null, 0, 7, 7],
  [null, null, null, null, null, null, 0, 10],
  [null, null, null, null, null, null, null, 0]
];

/* ---------- Énoncés ---------- */
const n25CoursIntro = () =>
  '<p><b>Question de cours (5 points)</b></p><ol><li>Vous êtes un spécialiste en science de données : quel est l’objectif principal des techniques d’apprentissage automatique suivantes : règle d’association, clustering, classification ?</li><li>Une tâche importante dans la préparation des données est le traitement des données manquantes. On distingue trois catégories de données manquantes. Citez-les.</li><li>Soit le tableau ci-dessous, qui contient des données manquantes (NA). Proposez deux méthodes pour supprimer ces données manquantes. Pour chaque méthode, donnez le tableau en sortie.</li></ol>' +
  table(
    ['Ligne', 'Valeur'],
    DS.na.map((v, i) => [i + 1, v == null ? 'NA' : v])
  );

const n25ClustIntro = () =>
  '<p><b>Exercice 1 : clustering (5 points).</b> On dispose de 8 points, de A1 à A8. On utilise la <b>distance de Manhattan</b> : d(Ai, Aj) = |xi − xj| + |yi − yj|.</p>' +
  ptsTable(DS.A18) +
  '<p>Distances de Manhattan données dans l’énoncé :</p>' +
  table(
    ['', ...DS.A18.map((p) => p.n)],
    DS.A18.map((p, i) => [p.n, ...N25_PRINTED[i].map((v) => (v == null ? '' : v))])
  ) +
  '<ol type="a"><li>Avec K = 3, C1 = {A1}, C2 = {A4}, C3 = {A7} : donnez les clusters des points A2, A3, A4, A5, A6, A8 pour la première itération.</li><li>Après cette itération, donnez les nouveaux clusters C1, C2, C3.</li><li>À partir de ces trois clusters, donnez le cluster des points A9 = (3, 10) et A10 = (8, 2), avec la distance de Manhattan.</li></ol>';

const n25AssocIntro = () =>
  '<p><b>Exercice 2 : règles d’association (5 points).</b> Symptômes observés chez 7 patients.</p>' +
  table(
    ['Patient', 'Symptômes observés'],
    DS.patients.map((t, i) => [i + 1, t.join(', ')])
  ) +
  '<div class="formula">Support(X) = |{t ∈ D : X ⊆ t}| / |D|        Confiance(X → Y) = Support(X ∪ Y) / Support(X)</div>';

const N25_CODE = [
  ['data = pd.read_csv("dataset.csv")', 'import pandas as pd'],
  ['X = data[feature_cols]  # Features', 'from sklearn.tree import DecisionTreeClassifier'],
  ['y = data.label', 'from sklearn.model_selection import train_test_split'],
  ['', 'from sklearn import metrics'],
  ['X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=1)', ''],
  ['clf = DecisionTreeClassifier()', 'print("Accuracy:", metrics.accuracy_score(y_test, y_pred))'],
  ['clf = clf.fit(X_train, y_train)', 'print("Precision:", metrics.precision_score(y_test, y_pred))'],
  ['y_pred = clf.predict(X_test)', 'print("Rappel:", metrics.recall_score(y_test, y_pred))'],
  ['import joblib', 'model = joblib.load("model.pkl")'],
  ['joblib.dump(clf, "model.pkl")', 'predictions = model.predict(Xt)'],
  ['print(predictions)', '']
];

const n25ClassifIntro = () =>
  '<p><b>Exercice 3 : classification (5 points).</b> Ensemble d’apprentissage tiré d’une base de patients. On veut construire un arbre de décision pour prédire la classe (Hypertension = Oui ou Non).</p>' +
  table(
    ['N°', 'Âge', 'Fumeur', 'Hypertension'],
    DS.hta.map((r, i) => [i + 1, r['Âge'], r.Fumeur, { v: r.Hypertension, cls: r.Hypertension === 'Oui' ? 'yes' : '' }])
  ) +
  '<p><b>Question :</b> utilisez le gain d’information pour choisir l’attribut à la racine, puis déduisez l’arbre final sans calculs supplémentaires.</p><ul><li>Pour une branche Âge = Jeune ou Moyen, la séparation sur « Fumeur » donne deux branches qui prédisent Hypertension = Oui ou Non.</li><li>Pour la branche Âge = Senior, la classe choisie est « Oui ».</li></ul>' +
  '<div class="formula">I(p, n) = −p/(p+n)·log₂(p/(p+n)) − n/(p+n)·log₂(n/(p+n))      E(A) = Σ (pᵢ+nᵢ)/(p+n) · I(pᵢ, nᵢ)      Gain(A) = I(p, n) − E(A)\nValeurs données : I(p, n) = 0,940 · E(Âge) = 0,693 · E(Fumeur) = 0,787</div>' +
  '<p><b>1)</b> À partir des lignes d’instruction ci-dessous : <b>a)</b> donnez la ligne qui divise le jeu de données en données d’apprentissage et de test ; <b>b)</b> donnez les lignes qui construisent le modèle avec la base d’apprentissage et celles qui évaluent le modèle sur la base de test.</p>' +
  table(
    ['Colonne 1', 'Colonne 2'],
    N25_CODE.map((r) => r.map((c) => (c ? `<code>${c}</code>` : '')))
  );

/* ---------- Parties corrigées ---------- */
function partsN25Cours() {
  const kept = DS.na.map((v, i) => [i + 1, v]).filter((r) => r[1] != null);
  return [
    {
      q: 'Objectif principal : règles d’association, clustering, classification.',
      pts: 1.5,
      fields: [{ k: 'open', model: findQ('Vous êtes un spécialiste') }]
    },
    {
      q: 'Citez les trois catégories de données manquantes.',
      pts: 1.5,
      fields: [{ k: 'open', model: findQ('On distingue trois catégories') }]
    },
    {
      q: 'Deux méthodes pour traiter les NA, avec le tableau en sortie.',
      pts: 2,
      fields: [
        { k: 'num', label: 'Méthode 1, suppression : lignes restantes', ans: 10, tol: 0.01 },
        { k: 'num', label: 'Méthode 2, remplacement par le mode : valeur', ans: 2, tol: 0.01 },
        {
          k: 'open',
          model:
            '<p><b>Méthode 1 : supprimer les lignes incomplètes.</b> On retire les lignes 2, 7, 9 et 11 : il reste 10 lignes.</p>' +
            table(['Ligne', 'Valeur'], kept) +
            '<p><b>Méthode 2 : remplacer chaque NA par le mode</b> (valeur la plus fréquente). On compte six « 2 » et quatre « 1 » : le mode vaut 2. Les 14 lignes sont gardées.</p>' +
            table(
              ['Ligne', 'Valeur'],
              DS.na.map((v, i) => [i + 1, v == null ? { v: '2', cls: 'min' } : v])
            ) +
            '<p class="small">Autre remplacement accepté : la moyenne (16 / 10 = 1,6). Le mode convient mieux ici, car la variable ne prend que les valeurs 1 et 2.</p>'
        }
      ]
    }
  ];
}

function partsN25Clust() {
  const P = DS.A18;
  const C0 = [P[0].c, P[3].c, P[6].c];
  const dist0 = (p) => C0.map((c) => manhattan(p.c, c));
  const centers = [
    [2, 10],
    [6, 6],
    [1.5, 3.5]
  ];
  const A9 = [3, 10],
    A10 = [8, 2];
  const rowFor = (name, pt, cs) => {
    const d = cs.map((c) => manhattan(pt, c));
    const mn = Math.min(...d);
    return [name, ...d.map((x) => ({ v: fmt(x, 2), cls: x === mn ? 'min' : '' })), 'C' + (d.indexOf(mn) + 1)];
  };
  return [
    {
      q: 'a) Première itération : cluster de A2, A3, A4, A5, A6, A8.',
      pts: 2,
      fields: [
        {
          k: 'assign',
          pts: ['A2', 'A3', 'A4', 'A5', 'A6', 'A8'],
          opts: ['C1', 'C2', 'C3'],
          ans: { A2: 'C3', A3: 'C2', A4: 'C2', A5: 'C2', A6: 'C2', A8: 'C2' }
        }
      ],
      corr: () =>
        '<p>Pour chaque point, on prend la distance de Manhattan au point de départ de chaque cluster (A1, A4, A7), et on choisit la plus petite.</p>' +
        table(
          ['Point', 'd(·, A1)', 'd(·, A4)', 'd(·, A7)', 'Cluster'],
          P.map((p) => rowFor(p.n, p.c, C0))
        ) +
        '<p><b>C1 = {A1} ; C2 = {A3, A4, A5, A6, A8} ; C3 = {A2, A7}.</b></p>' +
        `<div class="trap"><b>Piège de l’énoncé :</b> la ligne A2 de la table imprimée inverse deux valeurs. d(A2, A6) = |2 − 6| + |5 − 4| = <b>5</b> (et non 4), et d(A2, A7) = |2 − 1| + |5 − 2| = <b>4</b> (et non 5). Avec la table imprimée, A2 serait à égalité (5 et 5) entre C1 et C3. Dans ta copie : recalcule, écris d(A2, A7) = 4, puis place A2 dans C3. Vérifier une valeur douteuse rapporte des points.</div>`
    },
    {
      q: 'b) Nouveaux clusters : centre de C1, C2 et C3 après cette itération.',
      pts: 1.5,
      fields: [
        { k: 'num', label: 'C1 : x', ans: 2, tol: 0.01 },
        { k: 'num', label: 'C1 : y', ans: 10, tol: 0.01 },
        { k: 'num', label: 'C2 : x', ans: 6, tol: 0.01 },
        { k: 'num', label: 'C2 : y', ans: 6, tol: 0.01 },
        { k: 'num', label: 'C3 : x', ans: 1.5, tol: 0.01 },
        { k: 'num', label: 'C3 : y', ans: 3.5, tol: 0.01 }
      ],
      corr: '<p>Le nouveau centre d’un cluster est la <b>moyenne</b> des coordonnées de ses points.</p><div class="formula">C1 = {A1}                 → (2 ; 10)\nC2 = {A3, A4, A5, A6, A8} → ((8+5+7+6+4)/5 ; (4+8+5+4+9)/5) = (30/5 ; 30/5) = (6 ; 6)\nC3 = {A2, A7}             → ((2+1)/2 ; (5+2)/2) = (1,5 ; 3,5)</div>'
    },
    {
      q: 'c) Cluster de A9 = (3, 10) et de A10 = (8, 2).',
      pts: 1.5,
      fields: [
        { k: 'choice', label: 'A9 = (3, 10) va dans', opts: ['C1', 'C2', 'C3'], ans: 0 },
        { k: 'choice', label: 'A10 = (8, 2) va dans', opts: ['C1', 'C2', 'C3'], ans: 1 }
      ],
      corr: () =>
        '<p>Distances de Manhattan aux nouveaux centres C1 (2 ; 10), C2 (6 ; 6), C3 (1,5 ; 3,5) :</p>' +
        table(
          ['Point', 'd(·, C1)', 'd(·, C2)', 'd(·, C3)', 'Cluster'],
          [rowFor('A9', A9, centers), rowFor('A10', A10, centers)]
        ) +
        '<p>Exemple : d(A9, C1) = |3 − 2| + |10 − 10| = 1. <b>A9 → C1 ; A10 → C2.</b></p><p class="small muted">Même réponse si A2 avait été mis dans C1 : la question c) ne dépend pas de ce piège.</p>'
    }
  ];
}

function partsN25Assoc() {
  const T = DS.patients;
  const sup = (s) => T.filter((t) => s.every((x) => t.includes(x))).length;
  const supRow = (s) => [
    `{${s.join(', ')}}`,
    `${sup(s)}/7`,
    { v: sup(s) >= 3 ? 'Oui' : 'Non', cls: sup(s) >= 3 ? 'yes' : 'no' }
  ];
  const conf = (A, B) => `${sup([...A, ...B])}/${sup(A)}`;
  return [
    {
      q: 'Support de {Nausée, Douleur abdominale} ?',
      pts: 1,
      fields: [{ k: 'num', label: 'Support', ans: 2 / 7, tol: 0.01 }],
      corr: '<p>Les deux symptômes ensemble : patients 3 et 7. Support = <b>2/7 ≈ 28,6 %</b>.</p>'
    },
    {
      q: 'Confiance de {Vertiges, Sport} → {Douleur abdominale} ?',
      pts: 1,
      fields: [{ k: 'num', label: 'Confiance', ans: 1, tol: 0.01 }],
      corr: '<p>{Vertiges, Sport} : patients 3, 5, 7 → support 3/7. {Vertiges, Sport, Douleur abdominale} : patients 3, 5, 7 → 3/7.</p><div class="formula">Confiance = (3/7) / (3/7) = 1 = 100 %</div><p>Chaque fois que Vertiges et Sport sont présents, Douleur abdominale l’est aussi.</p>'
    },
    {
      q: 'Lequel est fréquent avec un support minimal de 3/7 ? A) {Fièvre, Toux} B) {Nausée, Vertiges} C) {Douleur thoracique, Sport} D) {Nausée, Douleur abdominale}',
      pts: 1,
      fields: [{ k: 'choice', opts: ['A', 'B', 'C', 'D', 'Aucun'], ans: 4 }],
      corr: () =>
        table(
          ['Ensemble', 'Support', '≥ 3/7 ?'],
          [
            supRow(['Fièvre', 'Toux']),
            supRow(['Nausée', 'Vertiges']),
            supRow(['Douleur thoracique', 'Sport']),
            supRow(['Nausée', 'Douleur abdominale'])
          ]
        ) + '<p><b>Aucun</b> n’atteint 3 patients. Ose répondre « aucun » quand le calcul le dit.</p>'
    },
    {
      q: 'Lesquelles de ces règles ont une confiance de 100 % ?',
      pts: 1,
      fields: [
        {
          k: 'multi',
          opts: [
            'A) {Douleur thoracique, Douleur abdominale} → {Vertiges}',
            'B) {Fièvre, Fatigue} → {Toux}',
            'C) {Nausée, Maux de tête} → {Fièvre}',
            'D) {Vertiges, Sport} → {Douleur abdominale}'
          ],
          ans: [0, 3]
        }
      ],
      corr: () =>
        table(
          ['Règle', 'Confiance'],
          [
            [
              'A) {D. thoracique, D. abdominale} → {Vertiges}',
              { v: conf(['Douleur thoracique', 'Douleur abdominale'], ['Vertiges']) + ' = 100 %', cls: 'yes' }
            ],
            ['B) {Fièvre, Fatigue} → {Toux}', conf(['Fièvre', 'Fatigue'], ['Toux']) + ' = 50 %'],
            ['C) {Nausée, Maux de tête} → {Fièvre}', conf(['Nausée', 'Maux de tête'], ['Fièvre']) + ' = 50 %'],
            [
              'D) {Vertiges, Sport} → {D. abdominale}',
              { v: conf(['Vertiges', 'Sport'], ['Douleur abdominale']) + ' = 100 %', cls: 'yes' }
            ]
          ]
        ) + '<p><b>A et D.</b> Attention : il peut y avoir plusieurs bonnes réponses.</p>'
    },
    {
      q: 'La règle {Douleur thoracique, Douleur abdominale} → {Vertiges} a un support de 2/7 et une confiance de 100 %. Que peut-on en déduire ? A) Tous les patients avec ces deux douleurs ont des vertiges. B) La majorité des patients ont des vertiges. C) La règle n’est pas intéressante car le support est trop faible. D) Les vertiges sont toujours causés par ces deux douleurs.',
      pts: 1,
      fields: [{ k: 'choice', opts: ['A', 'B', 'C', 'D'], ans: 0 }],
      corr: '<p><b>A.</b> Une confiance de 100 % veut dire : <i>chaque fois</i> que les deux douleurs sont présentes (patients 5 et 7), il y a des vertiges.</p><ul><li>B est faux : le support (2/7) parle de 2 patients sur 7, pas de la majorité.</li><li>D est faux : une règle d’association mesure une co-occurrence, <b>pas une cause</b>.</li><li>C se discute seulement si on fixe un seuil : avec le seuil de 3/7 de la question 3, la règle ne serait pas retenue. Sans seuil donné, la déduction correcte reste A.</li></ul>'
    }
  ];
}

function partsN25Classif() {
  return [
    {
      q: 'Avec les valeurs données, calculez Gain(Âge) et Gain(Fumeur), puis choisissez la racine.',
      pts: 1.5,
      fields: [
        { k: 'num', label: 'Gain(Âge)', ans: 0.247, tol: 0.006 },
        { k: 'num', label: 'Gain(Fumeur)', ans: 0.153, tol: 0.006 },
        { k: 'choice', label: 'Racine', opts: ['Âge', 'Fumeur'], ans: 0 }
      ],
      corr: '<div class="formula">Gain(Âge)    = I(p, n) − E(Âge)    = 0,940 − 0,693 = 0,247\nGain(Fumeur) = I(p, n) − E(Fumeur) = 0,940 − 0,787 = 0,153</div><p>Le gain le plus grand est celui de <b>Âge</b> : c’est la racine.</p>'
    },
    {
      q: 'Déduisez l’arbre final, sans calculs supplémentaires.',
      pts: 1,
      fields: [
        {
          k: 'open',
          model:
            '<pre class="code">Âge ?\n├─ Senior → Hypertension = Oui\n├─ Jeune  → Fumeur ?\n│           ├─ Oui → Oui\n│           └─ Non → Non\n└─ Moyen  → Fumeur ?\n            ├─ Oui → Oui\n            └─ Non → Non</pre><p>On suit les deux remarques de l’énoncé : Senior est pur (que des « Oui »), et pour Jeune et Moyen, Fumeur sépare parfaitement les classes.</p>'
        }
      ]
    },
    {
      q: 'Code a) Quelle ligne divise le jeu de données en apprentissage et test ?',
      pts: 1,
      fields: [
        {
          k: 'open',
          model:
            '<pre class="code">X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=1)</pre><p>80 % des lignes servent à l’apprentissage, 20 % au test ; <code>random_state=1</code> rend le découpage reproductible. Elle a besoin de l’import <code>from sklearn.model_selection import train_test_split</code>.</p>'
        }
      ]
    },
    {
      q: 'Code b) Quelles lignes construisent le modèle, et lesquelles l’évaluent sur la base de test ?',
      pts: 1.5,
      fields: [
        {
          k: 'open',
          model:
            '<p><b>Construire le modèle</b> (sur la base d’apprentissage) :</p><pre class="code">from sklearn.tree import DecisionTreeClassifier\nclf = DecisionTreeClassifier()     # crée un arbre vide\nclf = clf.fit(X_train, y_train)    # l’entraîne</pre><p><b>Évaluer le modèle</b> (sur la base de test) :</p><pre class="code">from sklearn import metrics\ny_pred = clf.predict(X_test)       # prédit sur le test\nprint("Accuracy:", metrics.accuracy_score(y_test, y_pred))\nprint("Precision:", metrics.precision_score(y_test, y_pred))\nprint("Rappel:", metrics.recall_score(y_test, y_pred))</pre><p class="small muted">Les autres lignes servent à charger les données (read_csv, X, y), à sauvegarder le modèle (joblib.dump) et à le réutiliser (joblib.load, predict(Xt)) : elles ne font partie ni de la construction ni de l’évaluation.</p>'
        }
      ]
    },
    {
      q: 'Pour aller plus loin : les vrais calculs sur ce tableau',
      pts: 0,
      fields: [],
      corr: () =>
        '<div class="trap"><b>Les valeurs de l’énoncé ne correspondent pas au tableau.</b> 0,940, 0,693 et 0,787 viennent de l’exemple du cours (9 « Oui », 5 « Non »). Le tableau compte 8 « Oui » et 4 « Non », donc I(8, 4) ≈ 0,918. Le jour du devoir, <b>utilise les valeurs données</b> ; la racine est Âge dans les deux cas.</div>' +
        stepsHTML(
          gainSteps({ rows: DS.hta, attrs: ['Âge', 'Fumeur'], cls: 'Hypertension', pos: 'Oui', neg: 'Non' }).steps
        )
    }
  ];
}

/* ---------- Exercices (une page par partie) et simulation ---------- */
EXOS.push(
  {
    id: 'n25-cours',
    annale: true,
    ch: 'prep',
    tag: N25_TAG,
    title: 'Questions de cours',
    tuto: 'manquantes',
    intro: n25CoursIntro,
    parts: partsN25Cours
  },
  {
    id: 'n25-clust',
    annale: true,
    ch: 'clust',
    tag: N25_TAG,
    title: 'Exercice 1 : clustering avec la distance de Manhattan',
    tuto: 'kmeans',
    intro: n25ClustIntro,
    parts: partsN25Clust
  },
  {
    id: 'n25-assoc',
    annale: true,
    ch: 'assoc',
    tag: N25_TAG,
    title: 'Exercice 2 : règles d’association (7 patients)',
    tuto: 'apriori',
    intro: n25AssocIntro,
    parts: partsN25Assoc
  },
  {
    id: 'n25-classif',
    annale: true,
    ch: 'classif',
    tag: N25_TAG,
    title: 'Exercice 3 : arbre de décision et code Python',
    tuto: 'gain',
    intro: n25ClassifIntro,
    parts: partsN25Classif
  }
);

EXAMS.unshift({
  id: 'N25',
  title: N25_TITLE,
  desc: 'Ton devoir de la session normale, à l’identique : cours (5) · clustering (5) · règles d’association (5) · classification et Python (5).',
  sections: () => [
    { title: 'I. Questions de cours', pts: 5, intro: n25CoursIntro(), parts: partsN25Cours() },
    { title: 'II. Clustering', pts: 5, tuto: 'kmeans', intro: n25ClustIntro(), parts: partsN25Clust() },
    { title: 'III. Règles d’association', pts: 5, tuto: 'apriori', intro: n25AssocIntro(), parts: partsN25Assoc() },
    {
      title: 'IV. Classification',
      pts: 5,
      tuto: 'gain',
      intro: n25ClassifIntro(),
      parts: partsN25Classif().filter((p) => p.pts)
    }
  ]
});
