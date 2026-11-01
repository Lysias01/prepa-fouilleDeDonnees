/* ===================== EXERCICES (parties réutilisables) ===================== */
function partsBiblio(p = [0.5, 1, 1.5, 1.5, 0.5]) {
  const corr = () =>
    stepsHTML(
      aprioriSteps({
        T: DS.biblio.T,
        order: DS.biblio.order,
        minCount: 3,
        minsupRaw: 0.5,
        minConf: 0.7,
        sup: '50 %',
        conf: '70 %'
      }).steps
    );
  return [
    {
      q: 'Quel est le support minimal exprimé en nombre de transactions ?',
      pts: p[0],
      fields: [{ k: 'num', label: 'Nombre minimal de transactions', ans: 3, tol: 0.01 }],
      corr: '<p>50 % × 6 = <b>3</b> transactions.</p>'
    },
    {
      q: 'Donnez L1, l’ensemble des 1-itemsets fréquents, et le support de S.',
      pts: p[1],
      fields: [
        { k: 'items', label: 'L1 (ex. : R, P)', ans: ['R', 'P', 'B'] },
        { k: 'num', label: 'support(S) (fraction ou %)', ans: 2 / 6, tol: 0.01 }
      ],
      corr: '<p>R : 5, P : 5, B : 4, S : 2, H : 1. <b>L1 = {R, P, B}</b>. sup(S) = 2/6 ≈ 33 % &lt; 50 %.</p>'
    },
    {
      q: 'Donnez L2, puis le seul candidat de taille 3 et son support. Est-il fréquent ?',
      pts: p[2],
      fields: [
        {
          k: 'sets',
          label: 'L2 (ex. : {R,P}, {R,B})',
          ans: [
            ['R', 'P'],
            ['R', 'B'],
            ['P', 'B']
          ]
        },
        { k: 'items', label: 'Candidat C3', ans: ['R', 'P', 'B'] },
        { k: 'num', label: 'support du candidat', ans: 2 / 6, tol: 0.01 },
        { k: 'choice', label: 'Fréquent ?', opts: ['Oui', 'Non'], ans: 1 }
      ],
      corr: '<p>{R, P} : 4 ; {R, B} : 3 ; {P, B} : 3 → <b>L2 = {R, P}, {R, B}, {P, B}</b>. Candidat {R, P, B} : ses trois sous-ensembles sont dans L2, il n’est donc pas élagué ; mais il n’apparaît que dans T1 et T5 : support 2/6 &lt; 3 → <b>non fréquent</b>. L3 = ∅.</p>'
    },
    {
      q: 'Cochez les règles valides (minconf = 70 %) et donnez la confiance de R → B.',
      pts: p[3],
      fields: [
        {
          k: 'multi',
          label: 'Règles valides',
          opts: ['R → P', 'P → R', 'R → B', 'B → R', 'P → B', 'B → P'],
          ans: [0, 1, 3, 5]
        },
        { k: 'num', label: 'conf(R → B)', ans: 0.6, tol: 0.01 }
      ],
      corr: '<p>R → P = 4/5 = 80 % ✓ ; P → R = 4/5 ✓ ; R → B = 3/5 = 60 % ✗ ; B → R = 3/4 = 75 % ✓ ; P → B = 3/5 ✗ ; B → P = 3/4 ✓. <b>4 règles valides.</b></p>'
    },
    {
      q: 'Interprétez la règle B → P.',
      pts: p[4],
      fields: [
        {
          k: 'open',
          model:
            '<p>Support 3/6 = 50 % : la moitié des emprunts contiennent à la fois une BD et un policier. Confiance 75 % : <b>75 % des emprunts qui contiennent une BD contiennent aussi un policier</b>. C’est une co-occurrence, pas une causalité.</p>'
        }
      ]
    },
    { q: 'Correction complète (Apriori pas à pas)', pts: 0, fields: [], corr }
  ];
}
function partsPanier(p = [0.5, 2, 2, 0.5]) {
  return [
    {
      q: 'Support minimal en nombre de transactions ?',
      pts: p[0],
      fields: [{ k: 'num', label: 'Nombre', ans: 3, tol: 0.01 }],
      corr: '<p>50 % × 6 = 3.</p>'
    },
    {
      q: 'Vérifiez lesquels de ces itemsets sont fréquents, et donnez le support de {Café, Sucre, Lait}.',
      pts: p[1],
      fields: [
        {
          k: 'multi',
          label: 'Cochez les itemsets fréquents',
          opts: ['{Café, Sucre}', '{Café, Sucre, Lait}', '{Thé, Pain}', '{Café, Lait}'],
          ans: [0, 3]
        },
        { k: 'num', label: 'support({Café, Sucre, Lait})', ans: 2 / 6, tol: 0.01 }
      ],
      corr:
        table(
          ['Itemset', 'Transactions', 'Support', 'Fréquent ?'],
          [
            ['{Café, Sucre}', '1, 2, 4', '3/6', { v: 'Oui', cls: 'yes' }],
            ['{Café, Sucre, Lait}', '1, 4', '2/6', { v: 'Non', cls: 'no' }],
            ['{Thé, Pain}', '3', '1/6', { v: 'Non', cls: 'no' }],
            ['{Café, Lait}', '1, 4, 6', '3/6', { v: 'Oui', cls: 'yes' }]
          ]
        ) +
        '<p>Justification rapide : {Sucre, Lait} (2/6) et {Thé} (2/6) ne sont pas fréquents, donc par antimonotonie {Café, Sucre, Lait} et {Thé, Pain} ne peuvent pas l’être.</p>'
    },
    {
      q: 'Vérifiez lesquelles de ces règles sont valides (minsup 50 %, minconf 75 %) et donnez la confiance de Café, Sucre → Lait.',
      pts: p[2],
      fields: [
        {
          k: 'multi',
          label: 'Cochez les règles valides',
          opts: ['Café → Sucre', 'Lait → Café', 'Sucre → Lait', 'Café, Sucre → Lait'],
          ans: [0, 1]
        },
        { k: 'num', label: 'conf(Café, Sucre → Lait)', ans: 2 / 3, tol: 0.01 }
      ],
      corr: table(
        ['Règle', 'Support', 'Confiance', 'Valide ?'],
        [
          ['Café → Sucre', '3/6', '3/4 = 75 %', { v: 'Oui', cls: 'yes' }],
          ['Lait → Café', '3/6', '3/4 = 75 %', { v: 'Oui', cls: 'yes' }],
          ['Sucre → Lait', '2/6', '2/4', { v: 'Non', cls: 'no' }],
          ['Café, Sucre → Lait', '2/6', '2/3', { v: 'Non', cls: 'no' }]
        ]
      )
    },
    {
      q: 'Que signifie « Café → Sucre a une confiance de 75 % » ?',
      pts: p[3],
      fields: [
        {
          k: 'choice',
          opts: [
            '75 % des clients achètent du café et du sucre',
            '75 % des paniers qui contiennent du café contiennent aussi du sucre',
            '75 % des paniers qui contiennent du sucre contiennent aussi du café',
            'Le café cause l’achat de sucre dans 75 % des cas'
          ],
          ans: 1
        }
      ],
      corr: '<p>La confiance est une probabilité <b>conditionnelle</b> P(Sucre | Café). Le support est 3/6 = 50 % (réponse A fausse).</p>'
    }
  ];
}
function partsKmeansNew(p = [0.5, 1.5, 2, 0.5, 0.5]) {
  const P = DS.P16;
  const corr = () => stepsHTML(kmeansSteps({ P, init: [P[0].c, P[1].c], initNames: ['P1', 'P2'] }).steps);
  return [
    {
      q: 'Quelle distance utilisez-vous ? Donnez sa formule et d²(P4, P1).',
      pts: p[0],
      fields: [
        {
          k: 'open',
          model:
            '<p>Distance <b>euclidienne</b> : d(i, j) = √((xi − xj)² + (yi − yj)²). d²(P4, P1) = (1 − 7)² + (6 − 5)² = 36 + 1 = <b>37</b>.</p>'
        },
        { k: 'num', label: 'd²(P4, P1)', ans: 37, tol: 0.01 }
      ]
    },
    {
      q: 'Itération 1 : affectez chaque point (C1 = cluster de P1, C2 = cluster de P2) et donnez les nouveaux centres.',
      pts: p[1],
      fields: [
        {
          k: 'assign',
          pts: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6'],
          opts: ['C1', 'C2'],
          ans: { P1: 'C1', P2: 'C2', P3: 'C2', P4: 'C1', P5: 'C1', P6: 'C1' }
        },
        { k: 'num', label: 'c1 : x', ans: 4, tol: 0.01 },
        { k: 'num', label: 'c1 : y', ans: 5.5, tol: 0.01 },
        { k: 'num', label: 'c2 : x', ans: 8, tol: 0.01 },
        { k: 'num', label: 'c2 : y', ans: 7.5, tol: 0.01 }
      ],
      corr: '<p>C1 = {P1, P4, P5, P6} → c1 = (16/4 ; 22/4) = (4 ; 5,5). C2 = {P2, P3} → c2 = (8 ; 7,5).</p>'
    },
    {
      q: 'Poursuivez jusqu’à la convergence. Donnez les clusters finaux.',
      pts: p[2],
      fields: [
        {
          k: 'assign',
          pts: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6'],
          opts: ['C1', 'C2'],
          ans: { P1: 'C2', P2: 'C2', P3: 'C2', P4: 'C1', P5: 'C2', P6: 'C1' },
          partition: true
        }
      ],
      corr: '<p>Itération 2 : P1 (d² 9,25 contre 7,25) et P5 (9,25 contre 3,25) passent dans C2. C1 = {P4, P6}, c1 = (1 ; 5,5) ; C2 = {P1, P2, P3, P5}, c2 = (7,5 ; 6,5). Itération 3 : rien ne change → arrêt.</p>'
    },
    {
      q: 'À quel cluster affectez-vous le nouveau point N(2, 6) ?',
      pts: p[3],
      fields: [{ k: 'choice', opts: ['C1 = {P4, P6}', 'C2 = {P1, P2, P3, P5}'], ans: 0 }],
      corr: '<p>d²(N, c1) = 1 + 0,25 = 1,25 ; d²(N, c2) = 30,25 + 0,25 = 30,5 → <b>C1</b>.</p>'
    },
    {
      q: 'Que montre cet exercice sur l’initialisation de K-means ?',
      pts: p[4],
      fields: [
        {
          k: 'open',
          model:
            '<p>Les centres initiaux P1 et P2 étaient tous les deux dans le même groupe naturel : la 1ʳᵉ itération donne des clusters peu pertinents, et il faut plusieurs itérations pour converger. Le résultat de K-means <b>dépend des centres initiaux</b> (et il faut fixer k).</p>'
        }
      ]
    },
    { q: 'Correction complète (tableaux et graphiques)', pts: 0, fields: [], corr }
  ];
}
function partsCah(p = [1.5, 1, 1, 1, 0.5]) {
  const corr = () => stepsHTML(cahSteps({ P: DS.PT, cutK: 3 }).steps);
  return [
    {
      q: 'Calculez les carrés des distances euclidiennes d²(P, Q), d²(Q, R) et d²(R, T).',
      pts: p[0],
      fields: [
        { k: 'num', label: 'd²(P, Q)', ans: 1, tol: 0.01 },
        { k: 'num', label: 'd²(Q, R)', ans: 18, tol: 0.01 },
        { k: 'num', label: 'd²(R, T)', ans: 32, tol: 0.01 }
      ],
      corr: '<p>d²(P,Q) = 1 + 0 = 1 ; d²(Q,R) = 9 + 9 = 18 ; d²(R,T) = 16 + 16 = 32.</p>'
    },
    {
      q: 'Avec le saut minimal, quelles sont les deux premières fusions ?',
      pts: p[1],
      fields: [
        { k: 'choice', label: '1ʳᵉ fusion', opts: ['P et Q', 'R et S', 'Q et R', 'S et T'], ans: 0 },
        { k: 'choice', label: '2ᵉ fusion', opts: ['P et Q', 'R et S', '{P,Q} et R', 'T et S'], ans: 1 }
      ],
      corr: '<p>Plus petit d² : P-Q = 1 (h = 1), puis R-S = 2 (h = √2 ≈ 1,41).</p>'
    },
    {
      q: 'Quelle est la distance (d²) entre {P, Q} et {R, S} avec le saut minimal ?',
      pts: p[2],
      fields: [{ k: 'num', label: 'd² minimal', ans: 18, tol: 0.01 }],
      corr: '<p>min(d²(P,R) = 25, d²(P,S) = 41, d²(Q,R) = 18, d²(Q,S) = 32) = <b>18</b> → fusion à h = √18 ≈ 4,24. T rejoint en dernier à √32 ≈ 5,66 (via R).</p>'
    },
    {
      q: 'Coupez le dendrogramme pour obtenir 3 clusters.',
      pts: p[3],
      fields: [
        {
          k: 'assign',
          pts: ['P', 'Q', 'R', 'S', 'T'],
          opts: ['C1', 'C2', 'C3'],
          ans: { P: 'C1', Q: 'C1', R: 'C2', S: 'C2', T: 'C3' },
          partition: true
        }
      ],
      corr: '<p>Coupe entre 1,41 et 4,24 : <b>{P, Q}, {R, S}, {T}</b>.</p>'
    },
    {
      q: "Expliquez linkage(X, method='single', metric='euclidean') et écrivez la ligne qui crée un K-means à 3 clusters.",
      pts: p[4],
      fields: [
        {
          k: 'open',
          model:
            '<p>linkage calcule la CAH avec le <b>saut minimal</b> et la <b>distance euclidienne</b> (renvoie la matrice des fusions Z). <code>kmeans = cluster.KMeans(n_clusters=3)</code> puis <code>kmeans.fit(X)</code>.</p>'
        }
      ]
    },
    { q: 'Correction complète (matrices et dendrogramme)', pts: 0, fields: [], corr }
  ];
}
function partsPromo(p = [2, 1, 1]) {
  const after = [];
  const corr = () =>
    stepsHTML(
      gainSteps({ rows: DS.promo, attrs: ['Âge', 'Revenu', 'Carte'], cls: 'Achète', pos: 'Oui', neg: 'Non' }).steps
    );
  return [
    {
      q: 'Calculez I(p, n), puis le gain de chaque attribut (3 décimales).',
      pts: p[0],
      fields: [
        { k: 'num', label: 'I(p, n)', ans: 1, tol: 0.01 },
        { k: 'num', label: 'Gain(Âge)', ans: 0.549, tol: 0.012 },
        { k: 'num', label: 'Gain(Revenu)', ans: 0.311, tol: 0.012 },
        { k: 'num', label: 'Gain(Carte)', ans: 0, tol: 0.01 }
      ],
      corr: '<p>4 Oui / 4 Non → I = 1. Âge : Jeune (0,3) → 0 ; Adulte (4,1) → 0,8×0,322 + 0,2×2,322 = 0,722 ; E = 5/8 × 0,722 = 0,451 → <b>Gain 0,549</b>. Revenu : Élevé (4,2) → 0,918 ; Faible (0,2) → 0 ; E = 6/8 × 0,918 = 0,689 → <b>Gain 0,311</b>. Carte : (2,2) et (2,2) → E = 1 → <b>Gain 0</b>.</p>',
      corrFull: corr
    },
    {
      q: 'Quel attribut placez-vous à la racine ? Dessinez l’arbre final.',
      pts: p[1],
      fields: [
        { k: 'choice', label: 'Racine', opts: ['Âge', 'Revenu', 'Carte'], ans: 0 },
        {
          k: 'open',
          model:
            '<pre class="code">Âge ?\n├ Jeune  → Non\n└ Adulte → Revenu ?\n           ├ Élevé  → Oui\n           └ Faible → Non</pre><p>La branche Jeune est pure (Non) ; la branche Adulte (4 Oui, 1 Non) est séparée parfaitement par Revenu.</p>'
        }
      ]
    },
    {
      q: 'Test : (Jeune, Élevé, Oui) réel Non ; (Adulte, Faible, Oui) réel Oui ; (Adulte, Élevé, Non) réel Oui. Donnez le pourcentage de bien classés.',
      pts: p[2],
      fields: [{ k: 'num', label: 'Bien classés (fraction ou %)', ans: 2 / 3, tol: 0.01 }],
      corr: '<p>Prédictions : Non ✓ ; Non ✗ (réel Oui) ; Oui ✓ → <b>2/3 ≈ 66,7 %</b>.</p>'
    },
    { q: 'Correction complète (calculs détaillés)', pts: 0, fields: [], corr }
  ];
}

const EXOS = [
  {
    id: 'ex-biblio',
    ch: 'assoc',
    tag: 'Nouveau',
    title: 'Apriori complet : la bibliothèque',
    tuto: 'apriori',
    intro: () =>
      '<p>Une bibliothèque enregistre les genres empruntés ensemble : R = Roman, P = Policier, B = BD, S = Science, H = Histoire. minsup = <b>50 %</b>, minconf = <b>70 %</b>.</p>' +
      transTable(DS.biblio.T),
    parts: () => partsBiblio()
  },
  {
    id: 'ex-patients',
    ch: 'assoc',
    tag: 'Annale 2024-25',
    title: 'Symptômes de 7 patients',
    tuto: 'apriori',
    intro: () =>
      '<p>Règles d’association sur des données médicales (devoir 2024-2025, exercice 2, 6 points).</p>' +
      table(
        ['Patient', 'Symptômes'],
        DS.patients.map((t, i) => [i + 1, t.join(', ')])
      ),
    parts: () => [
      {
        q: 'Quel est le support de {Nausée, Douleur abdominale} ?',
        pts: 1,
        fields: [{ k: 'num', label: 'Support', ans: 2 / 7, tol: 0.01 }],
        corr: '<p>Patients 3 et 7 → 2/7 ≈ 28,6 %.</p>'
      },
      {
        q: 'Calculez la confiance de {Nausée, Douleur abdominale} → {Vertiges}.',
        pts: 1,
        fields: [{ k: 'num', label: 'Confiance', ans: 1, tol: 0.01 }],
        corr: '<p>{Nausée, D. abdominale, Vertiges} : patients 3, 7 (2/7). Confiance = (2/7)/(2/7) = <b>100 %</b>.</p>'
      },
      {
        q: 'Lequel est fréquent pour minsup = 3/7 ? A) {Fièvre, Toux} B) {Nausée, Vertiges} C) {Douleur thoracique, Sport} D) {Nausée, Douleur abdominale}',
        pts: 1,
        fields: [{ k: 'choice', opts: ['A', 'B', 'C', 'D', 'Aucun'], ans: 4 }],
        corr:
          table(
            ['Ensemble', 'Patients', 'Support'],
            [
              ['A', '1', '1/7'],
              ['B', '3, 7', '2/7'],
              ['C', '5, 7', '2/7'],
              ['D', '3, 7', '2/7']
            ]
          ) + '<p><b>Aucun</b> : tous ont un support ≤ 2/7 &lt; 3/7.</p>'
      },
      {
        q: 'Lesquelles de ces règles ont une confiance de 100 % ?',
        pts: 1.5,
        fields: [
          {
            k: 'multi',
            opts: [
              'A) {D. thoracique, D. abdominale} → {Vertiges}',
              'B) {Fièvre, Fatigue} → {Toux}',
              'C) {Nausée, Maux de tête} → {Fièvre}',
              'D) {Vertiges, Sport} → {D. abdominale}'
            ],
            ans: [0, 3]
          }
        ],
        corr: table(
          ['Règle', 'Antécédent', 'Antécédent + conséquent', 'Confiance'],
          [
            ['A', '5, 7', '5, 7', '2/2'],
            ['B', '1, 4', '1', '1/2'],
            ['C', '2, 6', '2', '1/2'],
            ['D', '3, 5, 7', '3, 5, 7', '3/3']
          ]
        )
      },
      {
        q: 'La règle A a un support de 2/7 et une confiance de 100 %. Que peut-on en déduire ?',
        pts: 1.5,
        fields: [
          {
            k: 'choice',
            opts: [
              'Tous les patients avec ces deux douleurs ont des vertiges',
              'La majorité des patients ont des vertiges',
              'La règle n’est pas intéressante, le support est trop faible',
              'Les vertiges sont toujours causés par ces deux douleurs'
            ],
            ans: 0
          }
        ],
        corr: '<p>Confiance 100 % → A. B : 2 patients sur 7 seulement. C : pas de seuil fixé. D : co-occurrence ≠ causalité (le patient 3 a des vertiges sans douleur thoracique).</p>'
      }
    ]
  },
  {
    id: 'ex-panier',
    ch: 'assoc',
    tag: 'Nouveau',
    title: 'Vérifier des itemsets et des règles',
    tuto: 'apriori',
    intro: () =>
      '<p>Style du devoir 2 (« vérifier que… »). minsup = <b>50 %</b>, minconf = <b>75 %</b>.</p>' +
      transTable(DS.panier.T),
    parts: () => partsPanier()
  },
  {
    id: 'ex-textes',
    ch: 'assoc',
    tag: 'Annale D3 + TD',
    title: 'Text mining : les 7 textes',
    tuto: 'textes',
    intro: () => '<p>minsup ≥ <b>40 %</b>, minconf ≥ <b>75 %</b>.</p>' + transTable(DS.textes.T, 'Texte '),
    parts: () => [
      {
        q: 'Donnez L1 (mots-clés fréquents).',
        pts: 1,
        fields: [
          {
            k: 'items',
            label: 'L1',
            ans: ['Finance', 'Economie', 'Ouverture', 'Assemblée', 'Handball', 'Sport', 'Directeur']
          }
        ],
        corr: '<p>Seuil 3 textes. Marché (2) et Budget (2) sont éliminés.</p>'
      },
      {
        q: 'Donnez L2 et L3.',
        pts: 1.5,
        fields: [
          {
            k: 'sets',
            label: 'L2',
            ans: [
              ['Finance', 'Economie'],
              ['Assemblée', 'Handball'],
              ['Assemblée', 'Sport'],
              ['Handball', 'Sport']
            ]
          },
          { k: 'sets', label: 'L3', ans: [['Assemblée', 'Handball', 'Sport']] }
        ],
        corr: '<p>L2 = {Finance, Economie}, {Assemblée, Handball}, {Assemblée, Sport}, {Handball, Sport} ; L3 = {Assemblée, Handball, Sport}.</p>'
      },
      {
        q: 'Combien de règles vérifient les deux seuils ?',
        pts: 1,
        fields: [{ k: 'num', label: 'Nombre de règles', ans: 14, tol: 0.01 }],
        corr: '<p>2 règles depuis {Finance, Economie} (100 % et 75 %), 6 depuis les trois paires sportives, 6 depuis le 3-itemset : <b>14</b>.</p>'
      },
      {
        q: 'Prédisez la classe d’un texte qui contient respectivement « Assemblée », « Sport », « Finance ».',
        pts: 1.5,
        fields: [
          { k: 'choice', label: '« Assemblée »', opts: ['Sport', 'Economie'], ans: 0 },
          { k: 'choice', label: '« Sport »', opts: ['Sport', 'Economie'], ans: 0 },
          { k: 'choice', label: '« Finance »', opts: ['Sport', 'Economie'], ans: 1 }
        ],
        corr: '<p>Assemblée → Sport (100 %) ; Sport → Assemblée, Handball (100 %) : thème Sport ; Finance → Economie (100 %).</p>'
      },
      {
        q: 'Correction complète',
        pts: 0,
        fields: [],
        corr: () =>
          stepsHTML(
            aprioriSteps({
              T: DS.textes.T,
              order: DS.textes.order,
              minCount: 3,
              minsupRaw: 0.4,
              minConf: 0.75,
              sup: '40 %',
              conf: '75 %'
            }).steps
          )
      }
    ]
  },
  {
    id: 'ex-kmeans-annale',
    ch: 'clust',
    tag: 'Annale D3',
    title: 'K-means sur A1 à A8',
    tuto: 'kmeans',
    intro: () =>
      '<p>k = 3. Centres initiaux : <b>A1, A4 et A7</b> (C1 = cluster de A1, C2 = de A4, C3 = de A7). Distance euclidienne.</p>' +
      ptsTable(DS.A18),
    parts: () => [
      {
        q: 'Itération 1 : affectez chaque point.',
        pts: 1.5,
        fields: [
          {
            k: 'assign',
            pts: DS.A18.map((p) => p.n),
            opts: ['C1', 'C2', 'C3'],
            ans: { A1: 'C1', A2: 'C3', A3: 'C2', A4: 'C2', A5: 'C2', A6: 'C2', A7: 'C3', A8: 'C2' }
          }
        ],
        corr: '<p>C1 = {A1} ; C2 = {A3, A4, A5, A6, A8} ; C3 = {A2, A7}. (A8 : d² 5 à A1 contre 2 à A4.)</p>'
      },
      {
        q: 'Nouveau centre c2 après l’itération 1 ?',
        pts: 1,
        fields: [
          { k: 'num', label: 'x', ans: 6, tol: 0.01 },
          { k: 'num', label: 'y', ans: 6, tol: 0.01 }
        ],
        corr: '<p>c2 = ((8+5+7+6+4)/5 ; (4+8+5+4+9)/5) = (6 ; 6).</p>'
      },
      {
        q: 'Clusters finaux ?',
        pts: 2,
        fields: [
          {
            k: 'assign',
            pts: DS.A18.map((p) => p.n),
            opts: ['C1', 'C2', 'C3'],
            ans: { A1: 'C1', A2: 'C3', A3: 'C2', A4: 'C1', A5: 'C2', A6: 'C2', A7: 'C3', A8: 'C1' },
            partition: true
          }
        ],
        corr: '<p>It. 2 : A8 rejoint C1. It. 3 : A4 rejoint C1. It. 4 : rien ne change. <b>C1 = {A1, A4, A8} ; C2 = {A3, A5, A6} ; C3 = {A2, A7}.</b></p>'
      },
      {
        q: 'Correction complète',
        pts: 0,
        fields: [],
        corr: () => {
          const P = DS.A18;
          return stepsHTML(kmeansSteps({ P, init: [P[0].c, P[3].c, P[6].c], initNames: ['A1', 'A4', 'A7'] }).steps);
        }
      }
    ]
  },
  {
    id: 'ex-kmeans-new',
    ch: 'clust',
    tag: 'Nouveau',
    title: 'K-means : l’effet des centres initiaux',
    tuto: 'kmeans',
    intro: () => '<p>k = 2, centres initiaux <b>P1 et P2</b>. Distance euclidienne.</p>' + ptsTable(DS.P16),
    parts: () => partsKmeansNew()
  },
  {
    id: 'ex-cah',
    ch: 'clust',
    tag: 'Nouveau',
    title: 'CAH à la main',
    tuto: 'cah',
    intro: () => '<p>CAH avec le <b>saut minimal</b> et la distance euclidienne.</p>' + ptsTable(DS.PT),
    parts: () => partsCah()
  },
  {
    id: 'ex-dendro',
    ch: 'clust',
    tag: 'Annale 2024-25',
    title: 'Dendrogramme et nouveaux points',
    tuto: 'dendro',
    intro: () => {
      const R = cah(DS.A18);
      return (
        '<p>Méthode hiérarchique sur A1 à A8 (devoir 2024-2025, exercice 1, 4 points).</p><div class="twocol"><div>' +
        ptsTable(DS.A18) +
        '</div><div>' +
        dendroSVG(R.root) +
        '</div></div>'
      );
    },
    parts: () => [
      {
        q: 'Quelle métrique utilise-t-on pour créer des clusters ? Donnez un exemple.',
        pts: 1,
        fields: [
          {
            k: 'open',
            model:
              '<p>Une mesure de <b>distance</b> (dissimilarité) ; exemple : la distance <b>euclidienne</b> (Minkowski q = 2) ou Manhattan (q = 1).</p>'
          }
        ]
      },
      {
        q: 'Identifiez 3 clusters à partir du dendrogramme.',
        pts: 1,
        fields: [
          {
            k: 'assign',
            pts: DS.A18.map((p) => p.n),
            opts: ['C1', 'C2', 'C3'],
            ans: { A2: 'C1', A7: 'C1', A3: 'C2', A5: 'C2', A6: 'C2', A1: 'C3', A4: 'C3', A8: 'C3' },
            partition: true
          }
        ],
        corr: '<p>Coupe entre 3,16 et 3,61 : C1 = {A2, A7} ; C2 = {A3, A5, A6} ; C3 = {A1, A4, A8}.</p>'
      },
      {
        q: 'Donnez le centre de gravité G2 de {A3, A5, A6}.',
        pts: 0.5,
        fields: [
          { k: 'num', label: 'x', ans: 7, tol: 0.01 },
          { k: 'num', label: 'y', ans: 13 / 3, tol: 0.02 }
        ],
        corr: '<p>G2 = (21/3 ; 13/3) = (7 ; 4,33).</p>'
      },
      {
        q: 'Dans quel cluster vont A9 = (3, 10) et A10 = (8, 2) ?',
        pts: 1.5,
        fields: [
          { k: 'choice', label: 'A9', opts: ['C1 {A2, A7}', 'C2 {A3, A5, A6}', 'C3 {A1, A4, A8}'], ans: 2 },
          { k: 'choice', label: 'A10', opts: ['C1 {A2, A7}', 'C2 {A3, A5, A6}', 'C3 {A1, A4, A8}'], ans: 1 }
        ],
        corr: () =>
          stepsHTML(
            TUTOS.find((t) => t.id === 'dendro')
              .steps()
              .slice(1)
          )
      }
    ]
  },
  {
    id: 'ex-arbre',
    ch: 'classif',
    tag: 'Nouveau',
    title: 'Arbre de décision : la promo',
    tuto: 'gain',
    intro: () =>
      '<p>Un magasin veut prédire si un client achète la promotion.</p>' +
      table(
        ['N°', 'Âge', 'Revenu', 'Carte', 'Achète'],
        DS.promo.map((r, i) => [i + 1, r['Âge'], r.Revenu, r.Carte, r['Achète']])
      ) +
      '<p>Valeurs utiles :</p>' +
      LOGTABLE,
    parts: () => partsPromo()
  },
  {
    id: 'ex-arbre-miage',
    ch: 'classif',
    tag: 'Annale D3',
    title: 'Étudiants de MIAGE : deux arbres possibles',
    tuto: 'gain',
    intro: () =>
      '<p>Gains fournis : Gain(Doublant) = 0,34 ; Gain(Série) = 0,04 ; Gain(Mention) = 0,69. Lignes 1 à 12 = apprentissage ; 13 à 15 = test.</p>' +
      table(
        ['N°', 'Doublant', 'Série', 'Mention', 'Classe'],
        [
          ...DS.miage.map((r, i) => [i + 1, r.Doublant, r['Série'], r.Mention, r.Classe]),
          ['13 (test)', 'Oui', 'C', 'Bien', 'Admis'],
          ['14 (test)', 'Non', 'D', 'ABien', 'Non Admis'],
          ['15 (test)', 'Non', 'C', 'TBien', 'Admis']
        ]
      ),
    parts: () => [
      {
        q: 'Quel attribut à la racine ? Quelle branche n’est pas pure ?',
        pts: 1,
        fields: [
          { k: 'choice', label: 'Racine', opts: ['Doublant', 'Série', 'Mention'], ans: 2 },
          { k: 'choice', label: 'Branche impure', opts: ['Bien', 'ABien', 'Passable', 'TBien'], ans: 1 }
        ],
        corr: '<p>Mention (0,69). La branche ABien (lignes 1, 2, 3) contient 2 Admis et 1 Non Admis.</p>'
      },
      {
        q: 'Proposez les deux arbres possibles.',
        pts: 2,
        fields: [
          {
            k: 'open',
            model:
              '<p><b>Arbre A</b> : Mention puis, pour ABien, Doublant (Non → Admis ; Oui → Non Admis). <b>Arbre B</b> : Mention puis, pour ABien, Série (C → Admis ; F → Admis ; D → Non Admis). Les autres branches sont des feuilles : Bien → Admis ; Passable → Non Admis ; TBien → Admis.</p>'
          }
        ]
      },
      {
        q: 'Testez les lignes 13 à 15 : précision (bien classés / total) de chaque arbre, puis le meilleur arbre.',
        pts: 2,
        fields: [
          { k: 'num', label: 'Précision arbre A', ans: 2 / 3, tol: 0.01 },
          { k: 'num', label: 'Précision arbre B', ans: 1, tol: 0.01 },
          { k: 'choice', label: 'Meilleur arbre', opts: ['A (Doublant)', 'B (Série)'], ans: 1 }
        ],
        corr: () =>
          TUTOS.find((t) => t.id === 'gain')
            .steps()
            .slice(-1)[0].h
      }
    ]
  },
  {
    id: 'ex-arbre-hyper',
    ch: 'classif',
    tag: 'Annale 2024-25',
    title: 'Hypertension : gains donnés + programme Python',
    tuto: 'gain',
    intro: () =>
      '<p>Données : I(p, n) = 0,940 ; E(Âge) = 0,693 ; E(IMC) = 0,910 ; E(Fumeur) = 0,787. Pour Âge = Jeune, Fumeur sépare en deux branches pures ; pour Âge = Senior, la classe est « Oui ».</p>' +
      table(
        ['N°', 'Âge', 'IMC', 'Fumeur', 'Hypertension'],
        [
          [1, 'Jeune', 'Normal', 'Non', 'Non'],
          [2, 'Jeune', 'Élevé', 'Oui', 'Oui'],
          [3, 'Jeune', 'Normal', 'Non', 'Non'],
          [4, 'Jeune', 'Élevé', 'Non', 'Non'],
          [5, 'Moyen', 'Normal', 'Non', 'Non'],
          [6, 'Moyen', 'Élevé', 'Oui', 'Oui'],
          [7, 'Moyen', 'Élevé', 'Oui', 'Oui'],
          [8, 'Senior', 'Normal', 'Non', 'Oui'],
          [9, 'Senior', 'Élevé', 'Oui', 'Oui'],
          [10, 'Senior', 'Élevé', 'Oui', 'Oui'],
          [11, 'Senior', 'Normal', 'Non', 'Oui'],
          [12, 'Senior', 'Élevé', 'Non', 'Oui']
        ]
      ),
    parts: () => [
      {
        q: 'Calculez les trois gains et choisissez la racine.',
        pts: 2,
        fields: [
          { k: 'num', label: 'Gain(Âge)', ans: 0.247, tol: 0.006 },
          { k: 'num', label: 'Gain(IMC)', ans: 0.03, tol: 0.006 },
          { k: 'num', label: 'Gain(Fumeur)', ans: 0.153, tol: 0.006 },
          { k: 'choice', label: 'Racine', opts: ['Âge', 'IMC', 'Fumeur'], ans: 0 }
        ],
        corr: '<p>0,940 − 0,693 = 0,247 ; 0,940 − 0,910 = 0,030 ; 0,940 − 0,787 = 0,153 → <b>Âge</b>.</p><div class="tip"><span class="hand">Remarque :</span> ces valeurs viennent de l’exemple du cours (9 Oui / 5 Non). Calculées sur ce tableau (8 / 4), on trouve Gain(Âge) = 0,418 &gt; Fumeur 0,344 &gt; IMC 0,169 : même conclusion. À l’examen, utilise les valeurs données.</div>'
      },
      {
        q: 'Prédisez la classe d’un patient (Moyen, Normal, Fumeur = Oui) avec l’arbre obtenu.',
        pts: 1,
        fields: [{ k: 'choice', opts: ['Oui', 'Non'], ans: 0 }],
        corr: '<pre class="code">Âge ?\n├ Senior → Oui\n├ Jeune  → Fumeur ? (Oui → Oui ; Non → Non)\n└ Moyen  → Fumeur ? (Oui → Oui ; Non → Non)</pre><p>Moyen puis Fumeur = Oui → <b>Oui</b>.</p>'
      },
      {
        q: 'Écrivez le programme Python : charger dataset.csv, arbre de décision, accuracy/précision/rappel, sauvegarde modelISIE.pkl, prédiction sur Xt.',
        pts: 4,
        fields: [{ k: 'open', model: QUESTIONS.find((q) => q.src === 'D1' && q.ch === 'code').r }]
      }
    ]
  },
  {
    id: 'ex-bayes',
    ch: 'classif',
    tag: 'Nouveau',
    title: 'Naïve Bayes : accorder un prêt ?',
    tuto: 'bayes',
    intro: () =>
      table(
        ['N°', 'Salaire', 'Dettes', 'Prêt'],
        DS.pret.map((r, i) => [i + 1, r.Salaire, r.Dettes, r['Prêt']])
      ) + '<p>On veut classer X = &lt;Salaire = Stable, Dettes = Oui&gt;.</p>',
    parts: () => [
      {
        q: 'Probabilités a priori.',
        pts: 0.5,
        fields: [
          { k: 'num', label: 'P(Oui)', ans: 5 / 8, tol: 0.01 },
          { k: 'num', label: 'P(Non)', ans: 3 / 8, tol: 0.01 }
        ],
        corr: '<p>5 « Oui » et 3 « Non » sur 8.</p>'
      },
      {
        q: 'Probabilités conditionnelles.',
        pts: 1,
        fields: [
          { k: 'num', label: 'P(Stable | Oui)', ans: 4 / 5, tol: 0.01 },
          { k: 'num', label: 'P(Dettes=Oui | Oui)', ans: 1 / 5, tol: 0.01 },
          { k: 'num', label: 'P(Stable | Non)', ans: 1 / 3, tol: 0.01 },
          { k: 'num', label: 'P(Dettes=Oui | Non)', ans: 1, tol: 0.01 }
        ],
        corr: '<p>Parmi les 5 Oui : 4 Stable, 1 avec dettes. Parmi les 3 Non : 1 Stable, 3 avec dettes.</p>'
      },
      {
        q: 'Calculez P(X | C)·P(C) pour chaque classe et concluez.',
        pts: 1,
        fields: [
          { k: 'num', label: 'Valeur pour Oui', ans: 0.1, tol: 0.005 },
          { k: 'num', label: 'Valeur pour Non', ans: 0.125, tol: 0.005 },
          { k: 'choice', label: 'Classe de X', opts: ['Oui', 'Non'], ans: 1 }
        ],
        corr: '<p>Oui : 4/5 × 1/5 × 5/8 = 4/40 = 0,1. Non : 1/3 × 1 × 3/8 = 1/8 = 0,125. <b>X → Non</b>.</p>'
      },
      {
        q: 'Et X2 = <Instable, Dettes = Non> ? Que remarquez-vous ?',
        pts: 0.5,
        fields: [
          { k: 'choice', label: 'Classe de X2', opts: ['Oui', 'Non'], ans: 0 },
          {
            k: 'open',
            model:
              '<p>Oui : 1/5 × 4/5 × 5/8 = 0,1 ; Non : 2/3 × 0 × 3/8 = 0 → <b>Oui</b>. P(Dettes = Non | Non) = 0 annule tout le produit : une seule fréquence nulle suffit à exclure une classe (on corrige en pratique par le lissage de Laplace, hors cours).</p>'
          }
        ]
      },
      {
        q: 'Correction détaillée',
        pts: 0,
        fields: [],
        corr: () =>
          stepsHTML(
            bayesSteps({
              rows: DS.pret,
              attrs: ['Salaire', 'Dettes'],
              cls: 'Prêt',
              classes: ['Oui', 'Non'],
              X: { Salaire: 'Stable', Dettes: 'Oui' }
            }).steps
          )
      }
    ]
  },
  {
    id: 'ex-metriques',
    ch: 'classif',
    tag: 'Nouveau',
    title: 'Matrice de confusion et métriques',
    tuto: 'gain',
    intro: () =>
      '<p>Un modèle de détection de fraude est testé sur 50 dossiers (classe positive = fraude).</p>' +
      table(
        ['Réel \\ Prédit', 'Fraude', 'Non fraude'],
        [
          ['Fraude', 'VP = 24', 'FN = 6'],
          ['Non fraude', 'FP = 6', 'VN = 14']
        ]
      ),
    parts: () => [
      {
        q: 'Calculez l’accuracy, la précision, le rappel et la F-mesure.',
        pts: 2,
        fields: [
          { k: 'num', label: 'Accuracy', ans: 0.76, tol: 0.006 },
          { k: 'num', label: 'Précision', ans: 0.8, tol: 0.006 },
          { k: 'num', label: 'Rappel', ans: 0.8, tol: 0.006 },
          { k: 'num', label: 'F1', ans: 0.8, tol: 0.006 }
        ],
        corr: '<div class="formula">Accuracy = (24 + 14)/50 = 0,76\nPrécision = 24/(24 + 6) = 0,8\nRappel = 24/(24 + 6) = 0,8\nF1 = 2 × 0,8 × 0,8 / 1,6 = 0,8</div>'
      },
      {
        q: 'Que mesure le rappel ici, en une phrase ?',
        pts: 0.5,
        fields: [
          {
            k: 'open',
            model:
              '<p>La part des <b>vraies fraudes</b> que le modèle détecte : 80 % des fraudes sont trouvées, 20 % passent inaperçues (FN).</p>'
          }
        ]
      }
    ]
  },
  {
    id: 'ex-normal',
    ch: 'prep',
    tag: 'Nouveau + TD',
    title: 'Normalisation à la main',
    tuto: 'normalisation',
    intro: () => '<p>Variable X : 2, 4, 6, 8. Puis la colonne « Taille » du TD : 175, 170, 200, 160, 150.</p>',
    parts: () => [
      {
        q: 'Pour X : moyenne, écart absolu moyen (formule du cours), z-score de 2 et de 8.',
        pts: 2,
        fields: [
          { k: 'num', label: 'm', ans: 5, tol: 0.01 },
          { k: 'num', label: 's', ans: 2, tol: 0.01 },
          { k: 'num', label: 'z(2)', ans: -1.5, tol: 0.01 },
          { k: 'num', label: 'z(8)', ans: 1.5, tol: 0.01 }
        ],
        corr: '<p>m = 20/4 = 5 ; s = (3 + 1 + 1 + 3)/4 = 2 ; z(2) = −3/2 = −1,5 ; z(8) = 1,5.</p>'
      },
      {
        q: 'Pour X : valeur min-max de 4.',
        pts: 0.5,
        fields: [{ k: 'num', label: 'x′(4)', ans: 1 / 3, tol: 0.01 }],
        corr: '<p>(4 − 2)/(8 − 2) = 2/6 = 1/3 ≈ 0,33.</p>'
      },
      {
        q: 'TD : pour la taille, donnez m, s et le z-score de Personne3 (200 cm).',
        pts: 1.5,
        fields: [
          { k: 'num', label: 'm', ans: 171, tol: 0.01 },
          { k: 'num', label: 's', ans: 13.2, tol: 0.02 },
          { k: 'num', label: 'z(200)', ans: 29 / 13.2, tol: 0.02 }
        ],
        corr: '<p>m = 855/5 = 171 ; écarts 4, 1, 29, 11, 21 → s = 66/5 = 13,2 ; z = 29/13,2 ≈ 2,20. (Les autres : 0,30 ; −0,08 ; −0,83 ; −1,59.)</p>'
      }
    ]
  },
  {
    id: 'ex-distances',
    ch: 'clust',
    tag: 'Nouveau',
    title: 'Calculs de distances',
    tuto: 'distances',
    intro: () =>
      '<p>X = (1, 2) et Y = (4, 6). u = (1, 0, 1, 1, 0, 0) et v = (1, 1, 0, 1, 0, 0) sont binaires asymétriques.</p>',
    parts: () => [
      {
        q: 'Distances euclidienne et de Manhattan entre X et Y.',
        pts: 1,
        fields: [
          { k: 'num', label: 'Euclidienne', ans: 5, tol: 0.01 },
          { k: 'num', label: 'Manhattan', ans: 7, tol: 0.01 }
        ],
        corr: '<p>√(9 + 16) = 5 ; 3 + 4 = 7.</p>'
      },
      {
        q: 'Pour u et v : a, b, c, d puis Jaccard et appariement simple.',
        pts: 1.5,
        fields: [
          { k: 'num', label: 'a', ans: 2, tol: 0.01 },
          { k: 'num', label: 'b', ans: 1, tol: 0.01 },
          { k: 'num', label: 'c', ans: 1, tol: 0.01 },
          { k: 'num', label: 'd', ans: 2, tol: 0.01 },
          { k: 'num', label: 'Jaccard', ans: 0.5, tol: 0.01 },
          { k: 'num', label: 'Appariement simple', ans: 1 / 3, tol: 0.01 }
        ],
        corr: '<p>a = 2 (positions 1, 4) ; b = 1 (position 3) ; c = 1 (position 2) ; d = 2. Jaccard = 2/4 = 0,5 ; simple = 2/6 ≈ 0,33.</p>'
      },
      {
        q: 'Variable ordinale Faible < Moyen < Fort < Très fort : valeur normalisée de « Fort ». Deux individus, 5 variables nominales, 2 identiques : distance ?',
        pts: 1,
        fields: [
          { k: 'num', label: 'y(Fort)', ans: 2 / 3, tol: 0.01 },
          { k: 'num', label: 'd nominale', ans: 3 / 5, tol: 0.01 }
        ],
        corr: '<p>(3 − 1)/(4 − 1) = 2/3 ; (5 − 2)/5 = 3/5.</p>'
      }
    ]
  },
  {
    id: 'ex-manquantes',
    ch: 'prep',
    tag: 'TD',
    title: 'Données manquantes du TD',
    tuto: 'manquantes',
    intro: () =>
      table(
        ['Ligne', 'Valeur'],
        DS.na.map((v, i) => [i + 1, v == null ? 'NA' : v])
      ),
    parts: () => [
      {
        q: 'Combien de valeurs manquantes ? Combien de lignes restent après suppression ?',
        pts: 1,
        fields: [
          { k: 'num', label: 'Nombre de NA', ans: 4, tol: 0.01 },
          { k: 'num', label: 'Lignes restantes', ans: 10, tol: 0.01 }
        ]
      },
      {
        q: 'Valeur d’imputation par la moyenne, puis par le mode.',
        pts: 1,
        fields: [
          { k: 'num', label: 'Moyenne', ans: 1.6, tol: 0.01 },
          { k: 'num', label: 'Mode', ans: 2, tol: 0.01 }
        ],
        corr: '<p>Somme = 16 sur 10 valeurs → 1,6. Six « 2 » et quatre « 1 » → mode 2.</p>'
      },
      {
        q: 'Proposez deux méthodes et justifiez votre choix.',
        pts: 1,
        fields: [
          {
            k: 'open',
            model:
              '<p>(1) <b>Supprimer</b> les 4 lignes (10 lignes restantes) : simple, sans biais si MCAR, mais perte de 29 % des données. (2) <b>Imputer</b> par une valeur unique : le mode (2), adapté à une variable à deux valeurs (ou la moyenne 1,6, ou la médiane 2). Autres : moyenne de la même classe, valeur la plus probable, Hot Deck.</p>'
          }
        ]
      }
    ]
  },
  {
    id: 'ex-code',
    ch: 'code',
    tag: 'Annale D2',
    title: 'Le code fromage.txt',
    tuto: 'code',
    intro: () =>
      TUTOS.find((t) => t.id === 'code')
        .steps()[4]
        .h.split('<ul>')[0],
    parts: () => [
      {
        q: 'Expliquez le rôle des lignes 24, 27, 31 et 34.',
        pts: 2,
        fields: [
          {
            k: 'open',
            model:
              '<ul><li><b>24</b> : charge fromage.txt dans un DataFrame (tabulation, 1ʳᵉ ligne = noms des variables, 1ʳᵉ colonne = index = noms des fromages).</li><li><b>27</b> : trace le dendrogramme de la CAH avec les noms en étiquettes ; branches colorées sous la hauteur 7.</li><li><b>31</b> : crée un modèle K-means à 4 clusters.</li><li><b>34</b> : affiche chaque fromage avec son cluster, triés par cluster.</li></ul>'
          }
        ]
      },
      {
        q: 'Quelle distance est utilisée dans ce code ?',
        pts: 1,
        fields: [{ k: 'choice', opts: ['Manhattan', 'Euclidienne', 'Jaccard', 'Cosinus'], ans: 1 }],
        corr: "<p>metric='euclidean' (ligne 25), avec le saut minimal (method='single'). K-means utilise aussi l’euclidienne.</p>"
      },
      {
        q: 'Proposez le code qui forme 3 clusters avec K-means.',
        pts: 3,
        fields: [{ k: 'open', model: QUESTIONS.find((q) => q.src === 'D2' && q.ch === 'code').r }]
      }
    ]
  }
];
