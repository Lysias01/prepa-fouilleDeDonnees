/* ===================== TUTORIELS (méthodes pas à pas) ===================== */
const TUTOS = [
  {
    id: 'apriori',
    ch: 'assoc',
    title: 'Apriori, de A à Z',
    sub: 'Exemple du cours : Pain, Lait, Beurre, Sucre (minsup 2/5, minconf 3/4)',
    ex: 'ex-biblio',
    steps: () => {
      const s = aprioriSteps({
        T: DS.pain.T,
        order: DS.pain.order,
        minCount: 2,
        minsupRaw: 2 / 5,
        minConf: 0.75,
        sup: '2/5',
        conf: '3/4'
      }).steps;
      s.unshift({
        t: 'Ce qu’on cherche',
        h: '<p>Une <b>règle d’association</b> X → Y dit : « quand X est présent, Y l’est souvent aussi ». On la garde si :</p><div class="formula">support(X ∪ Y) ≥ minsup   ET   confiance(X → Y) ≥ minconf</div><p>Apriori travaille en <b>deux phases</b> : (1) trouver tous les itemsets <b>fréquents</b>, niveau par niveau ; (2) en tirer les <b>règles</b>.</p><div class="tip"><span class="hand">Idée clé :</span> si {Sucre, Beurre} n’est pas fréquent, aucun ensemble qui le contient ne peut l’être (antimonotonie). C’est ce qui permet d’éliminer des candidats sans compter.</div>'
      });
      s.push({
        t: 'Rédiger dans la copie',
        h: '<ol><li>Convertir minsup en nombre de transactions.</li><li>Tableau C1 → L1 (barrer les non fréquents).</li><li>Pour chaque k : jointure, élagage (justifier avec un sous-ensemble absent), comptage → Lk.</li><li>Phrase d’arrêt : « Ck est vide, l’algorithme s’arrête ».</li><li>Tableau des règles : règle, calcul de la confiance en fraction, retenue ou non.</li><li>Conclure : nombre de règles retenues.</li></ol>'
      });
      return s;
    }
  },
  {
    id: 'textes',
    ch: 'assoc',
    title: 'Règles et prédiction de classe',
    sub: 'TD et devoir 3 : les 7 textes (minsup 40 %, minconf 75 %)',
    ex: 'ex-textes',
    steps: () => {
      const s = aprioriSteps({
        T: DS.textes.T,
        order: DS.textes.order,
        minCount: 3,
        minsupRaw: 0.4,
        minConf: 0.75,
        sup: '40 %',
        conf: '75 %'
      }).steps;
      s.push({
        t: 'Utiliser les règles pour classer un texte',
        h:
          '<p>On ne garde que les règles dont la <b>conclusion est une classe</b> (Economie ou Sport) et dont la prémisse ne contient pas de classe :</p>' +
          table(
            ['Règle', 'Confiance'],
            [
              ['Finance → Economie', '100 %'],
              ['Assemblée → Sport', '100 %'],
              ['Handball → Sport', '100 %'],
              ['Assemblée, Handball → Sport', '100 %']
            ]
          ) +
          '<p>Pour un nouveau texte, on applique la règle dont la prémisse est contenue dans ses mots-clés, avec la plus forte confiance :</p><ul><li>« Assemblée » et/ou « Handball » → <b>Sport</b>.</li><li>« Sport » : Sport → Assemblée, Handball (100 %) → thème <b>Sport</b>.</li><li>« Finance » → <b>Economie</b>.</li></ul><div class="trap">Economie → Finance (75 %) ne sert pas à classer : Economie est la classe, pas un mot-clé indice.</div>'
      });
      return s;
    }
  },
  {
    id: 'kmeans',
    ch: 'clust',
    title: 'K-means en 2 dimensions',
    sub: 'Exercice fait au tableau le 29 octobre : A à G, k = 3, centres initiaux A, B, G',
    ex: 'ex-kmeans-annale',
    steps: () => {
      const P = DS.AG;
      const s = kmeansSteps({ P, init: [P[0].c, P[1].c, P[6].c], initNames: ['A', 'B', 'G'] }).steps;
      s.unshift({
        t: 'Le principe en une image',
        h: '<ol><li>On choisit <b>k centres</b> de départ.</li><li>Chaque point va au centre <b>le plus proche</b>.</li><li>Chaque centre se déplace au <b>milieu (moyenne)</b> de ses points.</li><li>On recommence 2 et 3 jusqu’à ce que <b>plus rien ne bouge</b>.</li></ol><div class="tip"><span class="hand">Image :</span> trois bergers (les centres) appellent les moutons (les points). Chaque mouton va vers le berger le plus proche ; chaque berger se place au milieu de son troupeau ; on recommence.</div>'
      });
      return s;
    }
  },
  {
    id: 'kmeans1d',
    ch: 'clust',
    title: 'K-means sur une seule variable',
    sub: 'Exemple du cours : A = {1, 2, 3, 6, 7, 8, 13, 15, 17}, k = 3',
    ex: 'ex-kmeans-new',
    steps: () => kmeansSteps({ P: DS.oneD, init: [[1], [2], [3]], initNames: ['1', '2', '3'] }).steps
  },
  {
    id: 'cah',
    ch: 'clust',
    title: 'CAH et dendrogramme',
    sub: 'Exemple du cours : A à G, saut minimal, distance euclidienne',
    ex: 'ex-cah',
    steps: () => {
      const s = cahSteps({ P: DS.AG, cutK: 3 }).steps;
      s.unshift({
        t: 'Le principe',
        h: '<p><b>CAH (AGNES)</b> = classification ascendante hiérarchique :</p><ol><li>Au départ, chaque point est seul dans son cluster.</li><li>On fusionne les <b>deux clusters les plus proches</b>.</li><li>On recommence jusqu’à n’avoir qu’un seul groupe.</li></ol><p>Avec le <b>saut minimal</b>, la distance entre deux groupes est la <b>plus petite</b> distance entre un point de l’un et un point de l’autre.</p><p>Le <b>dendrogramme</b> dessine chaque fusion à la hauteur de sa distance.</p>'
      });
      s.push({
        t: 'Ce que dit le cours',
        h: '<p>Le cours décrit exactement ces étapes : E-F d’abord (1,414), puis à 2,0 B-C, C-D et E-G, ce qui donne 3 groupes (A), (B C D), (E F G) ; puis (B C D) et (E F G) à 2,236 ; enfin A à 3,162.</p><div class="tip"><span class="hand">Sans calculatrice :</span> travaille avec les d² (2, 4, 5, 10…) pour trouver le minimum ; ne prends la racine que pour la hauteur du dendrogramme.</div>'
      });
      return s;
    }
  },
  {
    id: 'dendro',
    ch: 'clust',
    title: 'Lire un dendrogramme et affecter un point',
    sub: 'Annale 2024-2025 : A1 à A8, puis A9 et A10',
    ex: 'ex-dendro',
    steps: () => {
      const R = cah(DS.A18);
      const hs = R.merges.map((m) => m.hgt);
      return [
        {
          t: 'Le dendrogramme du devoir',
          h: `<div class="twocol"><div>${ptsTable(DS.A18)}</div><div>${dendroSVG(R.root)}</div></div><p>Les hauteurs de fusion sont : ${hs.map((x) => fmt(x, 2)).join(' ; ')}.</p>`
        },
        {
          t: 'Couper pour obtenir 3 clusters',
          h: `<div class="twocol"><div class="stack"><p>Il faut une ligne horizontale qui coupe <b>3 traits verticaux</b> : au-dessus de la fusion A2-A7 (≈ 3,16) et au-dessous de la fusion suivante (≈ 3,61). Par exemple <b>h = 3,4</b>.</p><p><b>C1 = {A2, A7}</b> ; <b>C2 = {A3, A5, A6}</b> ; <b>C3 = {A1, A4, A8}</b>.</p><div class="trap">Une coupe à h = 3 traverse 4 traits (A2 et A7 ne sont pas encore fusionnés) : on obtiendrait 4 clusters. Le document de corrigés écrit « h = 3 », mais la bonne coupe est entre 3,16 et 3,61. Les 3 clusters indiqués sont, eux, corrects.</div></div><div>${dendroSVG(R.root, { cut: 3.4 })}</div></div>`
        },
        {
          t: 'Calculer les centres de gravité',
          h: '<div class="formula">G1 = ((2+1)/2 ; (5+2)/2) = (1,5 ; 3,5)\nG2 = ((8+7+6)/3 ; (4+5+4)/3) = (7 ; 4,33)\nG3 = ((2+5+4)/3 ; (10+8+9)/3) = (3,67 ; 9)</div>'
        },
        {
          t: 'Affecter A9 (3, 10) et A10 (8, 2)',
          h:
            table(
              ['Point', 'd² à G1 (1,5 ; 3,5)', 'd² à G2 (7 ; 4,33)', 'd² à G3 (3,67 ; 9)', 'Cluster'],
              [
                ['A9 (3,10)', '2,25 + 42,25 = 44,5', '16 + 32,1 = 48,1', { v: '0,44 + 1 = 1,44', cls: 'min' }, 'C3'],
                ['A10 (8,2)', '42,25 + 2,25 = 44,5', { v: '1 + 5,43 = 6,43', cls: 'min' }, '18,8 + 49 = 67,8', 'C2']
              ]
            ) +
            '<p>A9 → <b>C3 = {A1, A4, A8}</b> ; A10 → <b>C2 = {A3, A5, A6}</b>. Les distances euclidiennes sont les racines : 1,20 et 2,54.</p>'
        }
      ];
    }
  },
  {
    id: 'gain',
    ch: 'classif',
    title: 'Arbre de décision par le gain d’information',
    sub: 'Devoir 3 : étudiants de MIAGE (lignes 1 à 12)',
    ex: 'ex-arbre',
    steps: () =>
      gainSteps({
        rows: DS.miage,
        attrs: ['Doublant', 'Série', 'Mention'],
        cls: 'Classe',
        pos: 'Admis',
        neg: 'Non Admis',
        after: [
          {
            t: 'Étape 4 : construire l’arbre branche par branche',
            h: '<p>Racine <b>Mention</b>. Sur l’apprentissage :</p><ul><li>Bien (4, 5, 6) → toutes Admis → <b>feuille Admis</b>.</li><li>Passable (7, 8, 9) → toutes Non Admis → <b>feuille Non Admis</b>.</li><li>TBien (10, 11, 12) → toutes Admis → <b>feuille Admis</b>.</li><li>ABien (1, 2, 3) → 2 Admis, 1 Non Admis → <b>il faut un 2ᵉ test</b>.</li></ul><p>Pour ABien, deux attributs séparent parfaitement : <b>Doublant</b> (Non → Admis ; Oui → Non Admis) ou <b>Série</b> (C, F → Admis ; D → Non Admis). D’où deux arbres A et B.</p><pre class="code">Arbre A                         Arbre B\nMention ?                       Mention ?\n├ Bien     → Admis              ├ Bien     → Admis\n├ Passable → Non Admis          ├ Passable → Non Admis\n├ TBien    → Admis              ├ TBien    → Admis\n└ ABien → Doublant ?            └ ABien → Série ?\n          ├ Non → Admis                   ├ C → Admis\n          └ Oui → Non Admis               ├ F → Admis\n                                          └ D → Non Admis</pre>'
          },
          {
            t: 'Étape 5 : tester sur les lignes 13 à 15',
            h:
              table(
                ['Ligne', 'Doublant / Série / Mention', 'Réel', 'Arbre A', 'Arbre B'],
                [
                  ['13', 'Oui / C / Bien', 'Admis', { v: 'Admis ✓', cls: 'yes' }, { v: 'Admis ✓', cls: 'yes' }],
                  ['14', 'Non / D / ABien', 'Non Admis', { v: 'Admis ✗', cls: 'no' }, { v: 'Non Admis ✓', cls: 'yes' }],
                  ['15', 'Non / C / TBien', 'Admis', { v: 'Admis ✓', cls: 'yes' }, { v: 'Admis ✓', cls: 'yes' }],
                  ['Précision', '', '', '2/3 ≈ 66,7 %', '3/3 = 100 %']
                ]
              ) +
              '<p>Le <b>meilleur arbre est B</b> (Mention puis Série).</p><div class="tip"><span class="hand">Méthode copie :</span> 1) gains → racine ; 2) branches pures = feuilles ; 3) branche impure → attribut suivant ; 4) dessiner l’arbre ; 5) tableau de test et précision.</div>'
          }
        ]
      }).steps
  },
  {
    id: 'bayes',
    ch: 'classif',
    title: 'Naïve Bayes',
    sub: 'Exemple du cours : jouer au tennis ? X = <pluie, chaud, élevée, faux>',
    ex: 'ex-bayes',
    steps: () =>
      bayesSteps({
        rows: DS.tennis,
        attrs: ['Temps', 'Température', 'Humidité', 'Vent'],
        cls: 'Classe',
        classes: ['P', 'N'],
        X: { Temps: 'pluie', Température: 'chaud', Humidité: 'élevée', Vent: 'faux' }
      }).steps
  },
  {
    id: 'normalisation',
    ch: 'prep',
    title: 'Normaliser : z-score et min-max',
    sub: 'Exemple du cours : âge et salaire de 4 personnes',
    ex: 'ex-normal',
    steps: () => [
      {
        t: 'Pourquoi normaliser ?',
        h:
          table(
            ['', 'Âge', 'Salaire'],
            [
              ['Personne 1', 50, 11000],
              ['Personne 2', 70, 11100],
              ['Personne 3', 60, 11122],
              ['Personne 4', 60, 11074]
            ]
          ) +
          '<p>Distance de Manhattan brute : d(p1, p2) = 20 + 100 = <b>120</b> ; d(p1, p3) = 10 + 122 = <b>132</b>. Conclusion : p1 ressemble plus à p2… mais seulement parce que le salaire (grands nombres) <b>écrase</b> l’âge.</p>'
      },
      {
        t: 'Étape 1 : moyenne mf de chaque variable',
        h: '<div class="formula">m(âge) = (50 + 70 + 60 + 60) / 4 = 240 / 4 = 60\nm(salaire) = (11000 + 11100 + 11122 + 11074) / 4 = 44296 / 4 = 11074</div>'
      },
      {
        t: 'Étape 2 : écart absolu moyen sf',
        h: '<div class="formula">s(âge) = (|50−60| + |70−60| + |60−60| + |60−60|) / 4 = (10 + 10 + 0 + 0) / 4 = 5\ns(salaire) = (74 + 26 + 48 + 0) / 4 = 148 / 4 = 37</div><div class="trap">Le cours utilise l’<b>écart absolu moyen</b>, pas l’écart-type. Dans les diapositives, la colonne salaire divise par 148 (la somme) au lieu de 37 : c’est une coquille. Applique la formule : divise bien par n.</div>'
      },
      {
        t: 'Étape 3 : z = (x − m) / s',
        h:
          table(
            ['', 'z(âge)', 'z(salaire)'],
            [
              ['Personne 1', '(50−60)/5 = −2', '(11000−11074)/37 = −2'],
              ['Personne 2', '(70−60)/5 = 2', '26/37 ≈ 0,70'],
              ['Personne 3', '0', '48/37 ≈ 1,30'],
              ['Personne 4', '0', '0']
            ]
          ) +
          '<p>Nouvelles distances de Manhattan : d(p1, p2) = 4 + 2,70 = 6,70 ; d(p1, p3) = 2 + 3,30 = 5,30. <b>p1 ressemble maintenant plus à p3</b> : la conclusion s’inverse, comme dans le cours.</p>'
      },
      {
        t: 'Min-max',
        h: '<div class="formula">x′ = (x − min) / (max − min)   → valeurs dans [0, 1]\nÂge : min 50, max 70 → 50 ↦ 0 ; 70 ↦ 1 ; 60 ↦ 10/20 = 0,5</div><div class="tip"><span class="hand">À retenir :</span> min-max ramène à [0, 1] ; z-score centre sur 0. En Python : MinMaxScaler et StandardScaler (ce dernier divise par l’écart-type).</div>'
      }
    ]
  },
  {
    id: 'distances',
    ch: 'clust',
    title: 'Distances pour tous les types de variables',
    sub: 'Binaires (Jaccard), nominales, ordinales, mixtes',
    ex: 'ex-distances',
    steps: () => [
      {
        t: 'Variables binaires : la table de contingence',
        h:
          '<p>Pour deux objets i et j, on compte les positions :</p>' +
          table(
            ['', 'j = 1', 'j = 0'],
            [
              ['i = 1', 'a', 'b'],
              ['i = 0', 'c', 'd']
            ]
          ) +
          '<p>Exemple : oi = (1,1,0,1,0) et oj = (1,0,0,0,1) → a = 1, b = 2, c = 1, d = 1.</p><div class="formula">Symétriques (appariement simple) : (b + c)/(a + b + c + d) = 3/5\nAsymétriques (Jaccard) :          (b + c)/(a + b + c)     = 3/4</div>'
      },
      {
        t: 'Exemple du cours : Jack, Mary, Ibra',
        h:
          table(
            ['Nom', 'Fièvre', 'Toux', 'Test-1', 'Test-2', 'Test-3', 'Test-4'],
            [
              ['Jack', 1, 0, 1, 0, 0, 0],
              ['Mary', 1, 0, 1, 0, 1, 0],
              ['Ibra', 1, 1, 0, 0, 0, 0]
            ]
          ) +
          '<p>Y et P → 1 ; N → 0. Le sexe (symétrique) est mis de côté ; on utilise Jaccard sur les attributs asymétriques.</p><div class="formula">d(Jack, Mary) = (0 + 1)/(2 + 0 + 1) = 0,33\nd(Jack, Ibra) = (1 + 1)/(1 + 1 + 1) = 0,67\nd(Ibra, Mary) = (1 + 2)/(1 + 1 + 2) = 0,75</div><p>Jack et Mary sont les plus proches : probablement atteints du même mal.</p>'
      },
      {
        t: 'Variables nominales et ordinales',
        h: '<div class="formula">Nominales : d(i, j) = (p − m) / p   (m = nombre de correspondances, p = nombre de variables)\nOrdinales : rang r ∈ {1…k}, puis y = (r − 1)/(k − 1)</div><p>Ex. : Insuffisant &lt; Passable &lt; Bien &lt; Très bien → Passable = (2−1)/3 = 1/3 ; Bien = 2/3.</p>'
      },
      {
        t: 'Types mixtes : Jean et Marie',
        h: '<div class="formula">d(i, j) = Σ δk · dk / Σ δk</div><ul><li>Âge : |30 − 28| / (100 − 0) = 0,02, δ = 1.</li><li>Poids : inconnu pour Marie → δ = 0.</li><li>Sexe : différent → d = 1, δ = 1.</li><li>Actif : non/non (0-0, asymétrique) → δ = 0.</li><li>Nationalité : différente → d = 1, δ = 1.</li></ul><div class="formula">d(Jean, Marie) = (0,02 + 1 + 1) / (1 + 1 + 1) = 2,02 / 3 ≈ 0,67</div>'
      }
    ]
  },
  {
    id: 'manquantes',
    ch: 'prep',
    title: 'Traiter des données manquantes',
    sub: 'TD préparation des données, question 4',
    ex: 'ex-manquantes',
    steps: () => [
      {
        t: 'Le tableau du TD',
        h:
          table(
            ['Ligne', 'Valeur'],
            DS.na.map((v, i) => [i + 1, v == null ? { v: 'NA', cls: 'no' } : v])
          ) + '<p>4 valeurs manquantes (lignes 2, 7, 9, 11) sur 14.</p>'
      },
      {
        t: 'Méthode 1 : supprimer les lignes',
        h: '<p>On ignore les tuples incomplets : il reste <b>10 lignes</b> (1, 3, 4, 5, 6, 8, 10, 12, 13, 14).</p><p>Sans biais si les données sont MCAR, mais on perd 4/14 ≈ 29 % des données : beaucoup ici.</p>'
      },
      {
        t: 'Méthode 2 : imputer par une valeur unique',
        h: '<div class="formula">Moyenne = (1+2+2+2+1+2+1+1+2+2) / 10 = 16 / 10 = 1,6\nMode (valeur la plus fréquente) = 2   (six « 2 », quatre « 1 »)\nMédiane de 1,1,1,1,2,2,2,2,2,2 = 2</div><p>La variable ne prend que deux valeurs : le <b>mode</b> (2) est le plus naturel. Le tableau de sortie remplace les 4 NA par 2 (ou 1,6 avec la moyenne).</p><div class="tip"><span class="hand">Autres méthodes à citer :</span> constante « inconnue », moyenne de la même classe, valeur la plus probable (arbre, Bayes), centre du groupe, Hot Deck.</div>'
      }
    ]
  },
  {
    id: 'code',
    ch: 'code',
    title: 'Lire et écrire le code des devoirs',
    sub: 'Classification sklearn + clustering (fromage.txt)',
    ex: 'ex-code',
    steps: () => [
      {
        t: 'Le squelette d’un programme de classification',
        h: '<pre class="code">import pandas as pd\nfrom sklearn.tree import DecisionTreeClassifier\nfrom sklearn.model_selection import train_test_split\nfrom sklearn import metrics\nimport joblib</pre><p>Cinq imports à connaître par cœur : pandas (données), l’arbre, le découpage, les métriques, joblib (sauvegarde).</p>'
      },
      {
        t: 'Charger et découper',
        h: '<pre class="code">data = pd.read_csv("dataset.csv")      # charge le fichier\nX = data[feature_cols]                  # variables explicatives\ny = data.label                          # classe cible\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.2, random_state=1)   # 80 % / 20 %, reproductible</pre>'
      },
      {
        t: 'Créer, entraîner, prédire, évaluer',
        h: '<pre class="code">clf = DecisionTreeClassifier()          # crée l’arbre (vide)\nclf = clf.fit(X_train, y_train)         # apprentissage\ny_pred = clf.predict(X_test)            # prédiction sur le test\nprint(metrics.accuracy_score(y_test, y_pred))   # bien classés / total\nprint(metrics.precision_score(y_test, y_pred))  # VP/(VP+FP)\nprint(metrics.recall_score(y_test, y_pred))     # VP/(VP+FN)</pre>'
      },
      {
        t: 'Sauvegarder et réutiliser',
        h: '<pre class="code">joblib.dump(clf, \'modelISIE.pkl\')       # sauvegarde\nmodel = joblib.load(\'modelISIE.pkl\')    # rechargement\nprint(model.predict(Xt))                # prédiction sur de nouvelles données</pre><div class="tip"><span class="hand">Mnémo :</span> Charger, Couper, Créer, Coacher (fit), Prédire, Évaluer, Sauver.</div>'
      },
      {
        t: 'Le code du clustering (devoir 2)',
        h: '<pre class="code">fromage = pandas.read_table("fromage.txt", sep="\\t", header=0, index_col=0)  # 24\nZ = linkage(fromage, method=\'single\', metric=\'euclidean\')                     # 25\ndendrogram(Z, labels=fromage.index, color_threshold=7)                         # 27\ngroupes_cah = fcluster(Z, t=7, criterion=\'distance\')                          # 29\nkmeans = cluster.KMeans(n_clusters=4)                                          # 31\nkmeans.fit(fromage)                                                            # 32\nidk = np.argsort(kmeans.labels_)                                               # 33\nprint(pandas.DataFrame(fromage.index[idk], kmeans.labels_[idk]))               # 34</pre><ul><li><b>24</b> : charge fromage.txt (tabulation ; 1ʳᵉ ligne = noms ; 1ʳᵉ colonne = index).</li><li><b>25</b> : CAH, saut minimal, distance euclidienne.</li><li><b>27</b> : trace le dendrogramme, couleurs sous la hauteur 7.</li><li><b>29</b> : coupe à la hauteur 7 → groupes.</li><li><b>31</b> : modèle K-means à 4 clusters ; <b>32</b> : apprentissage.</li><li><b>34</b> : affiche chaque fromage et son cluster, triés par cluster.</li></ul>'
      }
    ]
  }
];
