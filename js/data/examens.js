/* ===================== EXAMENS BLANCS ===================== */
const openQ = (q, pts, model) => ({ q, pts, fields: [{ k: 'open', model }] });
const findQ = (start) => QUESTIONS.find((x) => x.type === 'libre' && x.q.startsWith(start)).r;
const EXAMS = [
  {
    id: 'A',
    title: 'Sujet A',
    dur: 120,
    desc: 'Cours (6) · Règles d’association (5) · K-means (5) · Arbre de décision (4)',
    sections: () => [
      {
        title: 'I. Questions de cours',
        pts: 6,
        intro: '',
        parts: [
          openQ(
            '1) Expliquez la différence entre apprentissage supervisé et non supervisé. Donnez un algorithme de chaque.',
            1.5,
            findQ('Expliquez le principe de l’apprentissage automatique supervisé') +
              '<p>Exemples : arbre de décision (supervisé) ; K-means ou Apriori (non supervisé).</p>'
          ),
          openQ(
            '2) Quelles sont les qualités d’un bon clustering ?',
            1,
            findQ('Quelles sont les qualités d’un bon clustering')
          ),
          openQ(
            '3) Quels problèmes doit-on affronter pour implémenter une méthode de règles d’association ?',
            1.5,
            findQ('Quels problèmes doit-on affronter si l’on veut implémenter une méthode de règles')
          ),
          openQ(
            '4) Qu’est-ce que le surapprentissage et comment l’éviter ?',
            1,
            findQ('Qu’est-ce que le surapprentissage')
          ),
          openQ(
            '5) Représentez sous forme d’arbre de décision l’expression (A ou B) et C.',
            1,
            '<pre class="code">C ?\n├─ Faux → Faux\n└─ Vrai → A ?\n          ├─ Vrai → Vrai\n          └─ Faux → B ?\n                    ├─ Vrai → Vrai\n                    └─ Faux → Faux</pre><p>Autre arbre correct : tester A, puis B, puis C. L’essentiel : chaque chemin donne la bonne valeur de vérité.</p>'
          )
        ]
      },
      {
        title: 'II. Règles d’association',
        pts: 5,
        intro:
          '<p>R = Roman, P = Policier, B = BD, S = Science, H = Histoire. minsup = 50 %, minconf = 70 %.</p>' +
          transTable(DS.biblio.T),
        parts: partsBiblio().filter((p) => p.pts)
      },
      {
        title: 'III. Clustering',
        pts: 5,
        intro: '<p>k = 2, centres initiaux P1 et P2, distance euclidienne.</p>' + ptsTable(DS.P16),
        parts: partsKmeansNew().filter((p) => p.pts)
      },
      {
        title: 'IV. Classification',
        pts: 4,
        intro:
          table(
            ['N°', 'Âge', 'Revenu', 'Carte', 'Achète'],
            DS.promo.map((r, i) => [i + 1, r['Âge'], r.Revenu, r.Carte, r['Achète']])
          ) + LOGTABLE,
        parts: partsPromo().filter((p) => p.pts)
      }
    ]
  },
  {
    id: 'B',
    title: 'Sujet B',
    dur: 120,
    desc: 'Cours (5) · Règles (5) · CAH (5) · Naïve Bayes, métriques et Python (5)',
    sections: () => [
      {
        title: 'I. Questions de cours',
        pts: 5,
        intro: '',
        parts: [
          openQ('1) Définissez la fouille de données.', 1, findQ('Définissez la fouille de données')),
          openQ(
            '2) Objectif principal et un exemple d’algorithme : règles d’association, clustering, classification.',
            1.5,
            findQ('Vous êtes un spécialiste')
          ),
          openQ(
            '3) Quels problèmes doit-on affronter pour implémenter une classification par arbres de décision ?',
            1,
            findQ('Quels problèmes doit-on affronter si l’on veut implémenter une classification')
          ),
          openQ(
            '4) Citez et expliquez les trois catégories de données manquantes.',
            1,
            findQ('On distingue trois catégories')
          ),
          openQ(
            '5) Qu’est-ce qu’une donnée aberrante ? Citez une méthode de détection.',
            0.5,
            findQ('Qu’est-ce qu’une donnée aberrante')
          )
        ]
      },
      {
        title: 'II. Règles d’association',
        pts: 5,
        intro: '<p>minsup = 50 %, minconf = 75 %.</p>' + transTable(DS.panier.T),
        parts: partsPanier()
      },
      {
        title: 'III. Clustering hiérarchique',
        pts: 5,
        intro: '<p>Saut minimal, distance euclidienne.</p>' + ptsTable(DS.PT),
        parts: partsCah().filter((p) => p.pts)
      },
      {
        title: 'IV. Classification',
        pts: 5,
        intro:
          table(
            ['N°', 'Salaire', 'Dettes', 'Prêt'],
            DS.pret.map((r, i) => [i + 1, r.Salaire, r.Dettes, r['Prêt']])
          ) + '<p>X = &lt;Stable, Dettes = Oui&gt;. Puis la matrice : VP = 24, FN = 6, FP = 6, VN = 14.</p>',
        parts: [
          {
            q: 'Naïve Bayes : calculez P(X|C)·P(C) pour chaque classe et classez X.',
            pts: 2,
            fields: [
              { k: 'num', label: 'Valeur pour Oui', ans: 0.1, tol: 0.005 },
              { k: 'num', label: 'Valeur pour Non', ans: 0.125, tol: 0.005 },
              { k: 'choice', label: 'Classe', opts: ['Oui', 'Non'], ans: 1 }
            ],
            corr: '<p>Oui : 4/5 × 1/5 × 5/8 = 0,1 ; Non : 1/3 × 3/3 × 3/8 = 0,125 → Non.</p>'
          },
          {
            q: 'Quelle hypothèse fait Naïve Bayes ?',
            pts: 0.5,
            fields: [
              {
                k: 'open',
                model:
                  '<p>L’<b>indépendance des attributs</b> (conditionnellement à la classe) : P(x₁, …, xₖ | C) = Π P(xᵢ | C).</p>'
              }
            ]
          },
          {
            q: 'Avec la matrice donnée : accuracy et précision.',
            pts: 1,
            fields: [
              { k: 'num', label: 'Accuracy', ans: 0.76, tol: 0.006 },
              { k: 'num', label: 'Précision', ans: 0.8, tol: 0.006 }
            ],
            corr: '<p>38/50 = 0,76 ; 24/30 = 0,8.</p>'
          },
          {
            q: 'Écrivez les lignes Python qui partagent X, y (20 % test), entraînent un arbre, affichent l’accuracy et sauvegardent le modèle sous model.pkl.',
            pts: 1.5,
            fields: [
              {
                k: 'open',
                model:
                  '<pre class="code">X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=1)\nclf = DecisionTreeClassifier()\nclf.fit(X_train, y_train)\ny_pred = clf.predict(X_test)\nprint(metrics.accuracy_score(y_test, y_pred))\njoblib.dump(clf, \'model.pkl\')</pre>'
              }
            ]
          }
        ]
      }
    ]
  }
];
