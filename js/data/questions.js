/* type 'qcm' : o = options, a = index ou tableau d'index (plusieurs réponses), e = explication
   type 'libre' : r = réponse modèle (HTML), kw = mots-clés attendus (vérification automatique indicative)
   src : D1 = devoir 2024-2025, D2 = devoir M1 Master Informatique, D3 = devoir Master 1, D4 = devoir 2023-2024, TD = TD */
const SRC = { D1: 'Devoir 2024-25', D2: 'Devoir M1', D3: 'Devoir Master 1', D4: 'Devoir 2023-24', TD: 'TD' };

const QUESTIONS = [
  /* =================== INTRO =================== */
  {
    ch: 'intro',
    type: 'qcm',
    q: 'La fouille de données consiste à extraire des informations…',
    o: [
      'triviales et explicites, déjà connues',
      'non triviales, implicites, préalablement inconnues et potentiellement utiles',
      'stockées dans une base, obtenues par une requête SQL',
      'certaines et définitives, sans aucune incertitude'
    ],
    a: 1,
    e: 'Définition du cours : informations intéressantes, <b>non triviales, implicites, préalablement inconnues et potentiellement utiles</b>, à partir de grandes quantités de données.'
  },
  {
    ch: 'intro',
    type: 'qcm',
    q: 'Selon le cours, lequel de ces exemples n’est PAS de la fouille de données ?',
    o: [
      'Regrouper automatiquement les clients en profils',
      'Une requête SQL qui liste les clients ayant acheté du lait en octobre',
      'Chercher les produits souvent achetés ensemble',
      'Construire un arbre de décision pour accorder un crédit'
    ],
    a: 1,
    e: 'L’<b>analyse par requêtes</b> ne découvre rien : elle retrouve ce qu’on demande. Le cours cite aussi les BD déductives et les systèmes experts.'
  },
  {
    ch: 'intro',
    type: 'qcm',
    q: 'Dans le processus ECD, quelle étape peut représenter jusqu’à 60 % de l’effort ?',
    o: [
      'La fouille de données',
      'Le nettoyage et le prétraitement des données',
      'L’interprétation des résultats',
      'La présentation des patterns'
    ],
    a: 1,
    e: 'Le cours : « Nettoyage et pré-traitement des données (peut prendre 60 % de l’effort) ».'
  },
  {
    ch: 'intro',
    type: 'qcm',
    q: 'Quel est l’ordre correct des étapes du processus ECD ?',
    o: [
      'Fouille → Sélection → Prétraitement → Transformation → Interprétation',
      'Sélection → Prétraitement → Transformation → Fouille → Interprétation/Évaluation',
      'Prétraitement → Sélection → Fouille → Transformation → Interprétation',
      'Sélection → Fouille → Prétraitement → Interprétation → Transformation'
    ],
    a: 1,
    e: 'Données brutes → sélection → prétraitement → transformation → <b>fouille</b> → interprétation/évaluation → connaissances.'
  },
  {
    ch: 'intro',
    type: 'qcm',
    q: 'Le processus ECD est placé sous le contrôle…',
    o: [
      'de l’administrateur de la base de données',
      'd’un expert du domaine',
      'de l’algorithme de fouille lui-même',
      'du client final'
    ],
    a: 1,
    e: 'Le cours : « Le processus d’ECD est placé sous le contrôle d’un <b>expert du domaine</b> ».'
  },
  {
    ch: 'intro',
    type: 'qcm',
    q: 'En apprentissage supervisé, on dispose…',
    o: [
      'd’objets sans valeur cible',
      'd’objets et, pour chacun, d’une valeur cible associée',
      'de séquences de décisions et de récompenses',
      'de quelques objets étiquetés et de nombreux objets non étiquetés'
    ],
    a: 1,
    e: 'Supervisé : chaque objet a une <b>valeur cible</b> ; on apprend à prédire la cible d’un objet nouveau.'
  },
  {
    ch: 'intro',
    type: 'qcm',
    q: 'Détecter si un courriel est un spam à partir de courriels déjà marqués « spam » / « non spam » relève de…',
    o: [
      'l’apprentissage non supervisé (clustering)',
      'l’apprentissage supervisé (classification)',
      'des règles d’association',
      'l’apprentissage par renforcement'
    ],
    a: 1,
    e: 'Les exemples ont une <b>étiquette connue</b> (spam / non spam) et on prédit une catégorie : classification supervisée.'
  },
  {
    ch: 'intro',
    type: 'qcm',
    q: 'Regrouper des patients selon leurs symptômes, sans diagnostic connu, relève de…',
    o: ['la classification supervisée', 'la régression', 'le clustering (non supervisé)', 'l’apprentissage actif'],
    a: 2,
    e: 'Aucune valeur cible : on découvre des groupes. C’est du <b>clustering</b>, non supervisé.'
  },
  {
    ch: 'intro',
    type: 'qcm',
    q: 'Trouver les produits souvent achetés ensemble au supermarché relève de…',
    o: [
      'la classification',
      'la régression',
      'les règles d’association (non supervisé)',
      'l’apprentissage par transfert'
    ],
    a: 2,
    e: 'Recherche de co-occurrences dans des transactions : <b>règles d’association</b>, non supervisé.'
  },
  {
    ch: 'intro',
    type: 'qcm',
    q: 'Prédire le prix d’une maison à partir de sa surface et de son quartier relève de…',
    o: ['la classification', 'la régression (supervisé)', 'le clustering', 'les règles d’association'],
    a: 1,
    e: 'On prédit une <b>valeur numérique</b> connue dans les exemples : régression, supervisée.'
  },
  {
    ch: 'intro',
    type: 'qcm',
    q: 'Le clustering est aussi appelé…',
    o: ['classification supervisée', 'classification non supervisée', 'régression', 'apprentissage par renforcement'],
    a: 1,
    e: 'Clustering = <b>classification non supervisée</b> : pas de classes prédéfinies. Ne pas confondre avec la classification (supervisée).'
  },
  {
    ch: 'intro',
    type: 'qcm',
    q: 'Un programme apprend à jouer aux échecs en recevant une récompense à chaque coup gagnant. C’est de l’apprentissage…',
    o: ['supervisé', 'non supervisé', 'par renforcement', 'semi-supervisé'],
    a: 2,
    e: 'Séquences de décisions + <b>récompense</b> par action : apprentissage par renforcement.'
  },
  {
    ch: 'intro',
    type: 'qcm',
    q: 'On a 100 images étiquetées et 100 000 non étiquetées, et on veut utiliser les deux. C’est de l’apprentissage…',
    o: ['actif', 'semi-supervisé', 'par transfert', 'non supervisé'],
    a: 1,
    e: '<b>Semi-supervisé</b> : petit ensemble étiqueté + grand ensemble non étiqueté.'
  },
  {
    ch: 'intro',
    type: 'qcm',
    q: 'Le système demande à l’utilisateur d’étiqueter les nouveaux objets les plus utiles pour améliorer son modèle. C’est de l’apprentissage…',
    o: ['actif', 'par renforcement', 'non supervisé', 'par transfert'],
    a: 0,
    e: '<b>Actif</b> : interaction avec l’utilisateur pour obtenir la valeur cible de nouveaux objets.'
  },
  {
    ch: 'intro',
    type: 'qcm',
    q: 'Cochez les algorithmes d’apprentissage SUPERVISÉ.',
    o: [
      'Arbre de décision (ID3, C4.5)',
      'K-means',
      'Apriori',
      'Naïve Bayes',
      'CAH / AGNES',
      'k plus proches voisins (k-NN)'
    ],
    a: [0, 3, 5],
    e: 'Supervisés : arbres de décision, Naïve Bayes, k-NN (et régression, SVM). Non supervisés : K-means, CAH, Apriori, DBSCAN.',
    src: 'D3'
  },
  {
    ch: 'intro',
    type: 'qcm',
    q: 'Quel algorithme est un exemple typique de règles d’association ?',
    o: ['ID3', 'Apriori', 'K-means', 'DBSCAN'],
    a: 1,
    e: '<b>Apriori</b> (Agrawal, 1994).',
    src: 'D1'
  },
  {
    ch: 'intro',
    type: 'qcm',
    q: 'Quel algorithme est un exemple typique de clustering ?',
    o: ['C4.5', 'Apriori', 'K-means', 'Naïve Bayes'],
    a: 2,
    e: '<b>K-means</b> (aussi CAH/AGNES, DBSCAN, K-medoids).',
    src: 'D1'
  },
  {
    ch: 'intro',
    type: 'qcm',
    q: 'Les 4 « V » du Big data sont :',
    o: [
      'Volume, Variété, Vélocité, Véracité',
      'Volume, Valeur, Vitesse, Visualisation',
      'Variété, Validité, Vélocité, Virtualité',
      'Volume, Vecteur, Variance, Validation'
    ],
    a: 0,
    e: 'Le cours : volume, variété, vélocité, véracité.'
  },
  {
    ch: 'intro',
    type: 'qcm',
    q: 'Laquelle de ces disciplines n’est PAS citée par le cours comme composante de l’apprentissage automatique ?',
    o: ['Statistiques', 'Optimisation', 'Comptabilité', 'Probabilités'],
    a: 2,
    e: 'Le cours cite : statistiques, probabilités, intelligence artificielle, optimisation, informatique.'
  },
  {
    ch: 'intro',
    type: 'qcm',
    q: 'L’analyse des outliers est surtout utile pour…',
    o: [
      'la segmentation de marché',
      'la détection de fraudes et d’événements rares',
      'le calcul du support',
      'la normalisation'
    ],
    a: 1,
    e: 'Un outlier se distingue du comportement général : utile pour la <b>détection de fraudes</b> et d’événements rares.'
  },
  {
    ch: 'intro',
    type: 'qcm',
    q: 'Pourquoi a-t-on besoin de l’apprentissage automatique pour reconnaître des chiffres écrits à la main ?',
    o: [
      'Parce qu’on ne connaît pas de solution exacte à programmer, mais qu’on a beaucoup d’exemples',
      'Parce que le problème est trop simple',
      'Parce qu’une requête SQL suffit',
      'Parce qu’il n’existe aucune donnée'
    ],
    a: 0,
    e: 'Le cours : pour certains problèmes, on ne sait pas écrire la solution, mais on dispose de nombreuses instances. L’algorithme <b>apprend</b> à partir de ces données.'
  },
  {
    ch: 'intro',
    type: 'qcm',
    q: 'Les règles d’association sont-elles supervisées ?',
    o: [
      'Oui, car on peut ensuite s’en servir pour prédire une classe',
      'Non, ce sont des méthodes non supervisées : aucune valeur cible n’est nécessaire',
      'Oui, car on fixe minsup et minconf',
      'Cela dépend de l’algorithme utilisé'
    ],
    a: 1,
    e: 'Les règles d’association découvrent des co-occurrences <b>sans cible</b>. Les utiliser ensuite pour classer (TD des textes) ne les rend pas supervisées.'
  },

  {
    ch: 'intro',
    type: 'libre',
    src: 'D1',
    q: 'Vous êtes un spécialiste en science des données. Quel est l’objectif principal des techniques suivantes ? Donner un exemple d’algorithme pour chacune : 1) règles d’association ; 2) clustering ; 3) classification.',
    r: '<ol><li><b>Règles d’association</b> (non supervisé) : découvrir, dans une base de transactions, les items qui apparaissent fréquemment ensemble et en déduire des règles X → Y dont le support et la confiance dépassent des seuils. <i>Ex. : Apriori.</i></li><li><b>Clustering</b> (non supervisé) : regrouper des objets non étiquetés en clusters homogènes (forte similarité intra, faible inter). <i>Ex. : K-means (ou CAH, DBSCAN).</i></li><li><b>Classification</b> (supervisé) : à partir d’exemples dont la classe est connue, construire un modèle qui prédit la classe d’un nouvel objet. <i>Ex. : arbre de décision (ID3, C4.5).</i></li></ol>',
    kw: ['apriori', 'k-means', 'arbre', 'ensemble', 'groupe', 'predire', 'classe']
  },
  {
    ch: 'intro',
    type: 'libre',
    src: 'D2',
    q: 'Expliquez le principe de l’apprentissage automatique supervisé et la différence avec l’apprentissage non supervisé.',
    r: '<p><b>Supervisé</b> : on dispose d’objets accompagnés d’une <b>valeur cible</b> (classe ou valeur). On apprend un modèle capable de <b>prédire la valeur cible d’un objet nouveau</b> (classification, régression).</p><p><b>Différence</b> : en non supervisé, les objets <b>n’ont pas de valeur cible</b> ; on cherche à <b>extraire les régularités</b> ou la structure des données (clustering, règles d’association).</p>',
    kw: ['valeur cible', 'predire', 'nouveau', 'sans', 'regularites', 'clustering']
  },
  {
    ch: 'intro',
    type: 'libre',
    q: 'Définissez la fouille de données (data mining).',
    r: '<p>Extraction d’informations <b>intéressantes, non triviales, implicites, préalablement inconnues et potentiellement utiles</b> à partir de grandes quantités de données, sans a priori, en vue de l’aide à la décision. C’est un processus qui transforme des données en connaissances ; elle s’inscrit dans le processus ECD.</p>',
    kw: ['non triviales', 'implicites', 'inconnues', 'utiles', 'grandes quantites']
  },
  {
    ch: 'intro',
    type: 'libre',
    q: 'Qu’est-ce que le processus ECD ? Citez ses étapes dans l’ordre.',
    r: '<p>ECD = Extraction de Connaissances à partir de Données (KDD) : processus qui transforme des données brutes en connaissances, sous le contrôle d’un expert du domaine.</p><p>Étapes : données brutes → <b>sélection</b> → <b>prétraitement</b> (nettoyage) → <b>transformation</b> → <b>fouille de données</b> → <b>interprétation / évaluation</b> → connaissances.</p>',
    kw: ['selection', 'pretraitement', 'transformation', 'fouille', 'interpretation', 'connaissances']
  },
  {
    ch: 'intro',
    type: 'libre',
    src: 'D4',
    q: 'Donnez deux exemples d’algorithmes d’apprentissage supervisé.',
    r: '<p>Les <b>arbres de décision</b> (ID3, C4.5, CART) pour la classification et la <b>régression</b> linéaire. Autres réponses acceptées : Naïve Bayes, k-NN, SVM.</p>',
    kw: ['arbre', 'regression', 'bayes', 'k-nn', 'svm']
  },
  {
    ch: 'intro',
    type: 'libre',
    src: 'D3',
    q: 'Parmi les algorithmes présentés en cours, précisez ceux qui sont supervisés et ceux qui sont non supervisés.',
    r: '<p><b>Supervisés</b> : arbres de décision (ID3, C4.5, CART), régression, Naïve Bayes, k-NN, SVM.</p><p><b>Non supervisés</b> : Apriori (règles d’association), K-means et K-medoids (partitionnement), AGNES/CAH et BIRCH (hiérarchiques), DBSCAN (densité).</p>',
    kw: ['arbre', 'apriori', 'k-means', 'agnes', 'dbscan', 'bayes']
  },
  {
    ch: 'intro',
    type: 'libre',
    q: 'Citez et définissez brièvement les types d’apprentissage automatique autres que supervisé et non supervisé.',
    r: '<ul><li><b>Par renforcement</b> : séquences de décisions avec une récompense par action ; prédire la meilleure décision.</li><li><b>Semi-supervisé</b> : peu d’objets étiquetés et beaucoup de non étiquetés.</li><li><b>Actif</b> : le système demande à l’utilisateur d’étiqueter de nouveaux objets.</li><li><b>Par transfert</b> : réutiliser des connaissances apprises sur des tâches antérieures similaires.</li></ul>',
    kw: ['renforcement', 'recompense', 'semi', 'actif', 'transfert']
  },
  {
    ch: 'intro',
    type: 'libre',
    q: 'Quelle est la motivation de la fouille de données et de l’apprentissage automatique ?',
    r: '<p>L’<b>explosion des données</b> : les outils de collecte automatique remplissent les bases (transactions de supermarché, génomes…). On a <b>beaucoup de données mais peu de connaissances</b>. La fouille permet d’en extraire des connaissances intéressantes (règles, régularités, patterns).</p>',
    kw: ['explosion', 'beaucoup de donnees', 'peu de connaissances', 'extraire']
  },
  {
    ch: 'intro',
    type: 'libre',
    q: 'Donnez deux exemples d’application de la fouille de données en gestion commerciale.',
    r: '<ul><li><b>Analyse clientèle (CRM)</b> : grouper les clients en classes homogènes, profiler qui achète quoi.</li><li><b>Marketing ciblé et vente croisée</b> : associations entre produits vendus, placement en rayon, ciblage du mailing.</li><li>Usage du web : préférences des clients, optimisation du site.</li></ul>',
    kw: ['client', 'association', 'marketing', 'rayon']
  },

  /* =================== RÈGLES D'ASSOCIATION =================== */
  {
    ch: 'assoc',
    type: 'qcm',
    q: 'Le support de la règle X → Y est…',
    o: [
      'la proportion des transactions contenant X',
      'la proportion des transactions contenant à la fois X et Y',
      'sup(X ∪ Y) / sup(X)',
      'la proportion des transactions contenant Y mais pas X'
    ],
    a: 1,
    e: 'sup(X → Y) = P(X ∪ Y) : la part des transactions qui contiennent <b>tous</b> les items de X et de Y.'
  },
  {
    ch: 'assoc',
    type: 'qcm',
    q: 'La confiance de la règle X → Y est…',
    o: ['sup(X ∪ Y)', 'sup(X ∪ Y) / sup(Y)', 'sup(X ∪ Y) / sup(X)', 'sup(X) / sup(Y)'],
    a: 2,
    e: 'conf(X → Y) = sup(X ∪ Y) / sup(<b>X</b>) = P(Y | X). Le dénominateur est le support de la partie gauche.'
  },
  {
    ch: 'assoc',
    type: 'qcm',
    q: 'T1 = {Pain, Lait, Beurre}, T2 = {Pain, Lait, Sucre}, T3 = {Pain}, T4 = {Pain, Lait}, T5 = {Pain, Lait, Beurre, Sucre}. Que vaut sup({Pain, Beurre}) ?',
    o: ['1/5', '2/5', '3/5', '2/4'],
    a: 1,
    e: 'Pain et Beurre ensemble : T1 et T5 → <b>2/5</b>.'
  },
  {
    ch: 'assoc',
    type: 'qcm',
    q: 'Même base (T1 à T5 du cours). Que vaut conf(Pain, Lait → Sucre) ?',
    o: ['2/5', '2/4', '4/5', '2/2'],
    a: 1,
    e: '{Pain, Lait, Sucre} : T2, T5 (2). {Pain, Lait} : T1, T2, T4, T5 (4). Confiance = <b>2/4</b> = 50 %.'
  },
  {
    ch: 'assoc',
    type: 'qcm',
    q: 'Avec 7 transactions et minsup = 40 %, un itemset est fréquent s’il apparaît dans au moins…',
    o: ['2 transactions', '2,8 transactions', '3 transactions', '4 transactions'],
    a: 2,
    e: '40 % × 7 = 2,8 ; un nombre de transactions est entier, donc il faut <b>au moins 3</b>.'
  },
  {
    ch: 'assoc',
    type: 'qcm',
    q: 'Si {A, B} n’est pas fréquent, alors…',
    o: ['{A} n’est pas fréquent', '{A, B, C} n’est pas fréquent', '{B} n’est pas fréquent', 'on ne peut rien conclure'],
    a: 1,
    e: 'Antimonotonie : <b>tout sur-ensemble d’un itemset non fréquent est non fréquent</b>. Les sous-ensembles {A} ou {B} peuvent, eux, être fréquents.'
  },
  {
    ch: 'assoc',
    type: 'qcm',
    q: 'Si {A, B, C} est fréquent, alors…',
    o: [
      '{A, B, C, D} est fréquent',
      'tous ses sous-ensembles ({A, B}, {A}, …) sont fréquents',
      'aucun de ses sous-ensembles n’est fréquent',
      'sa confiance est de 100 %'
    ],
    a: 1,
    e: '<b>Tout sous-ensemble d’un itemset fréquent est fréquent</b>, car sup(sous-ensemble) ≥ sup(ensemble).'
  },
  {
    ch: 'assoc',
    type: 'qcm',
    q: 'L3 = {abc, abd, acd, ace, bcd}. Que vaut C4 après jointure et élagage ?',
    o: ['{abcd, acde}', '{abcd}', '{acde}', '∅'],
    a: 1,
    e: 'Jointure : abcd (abc ⋈ abd) et acde (acd ⋈ ace). Élagage : acde est supprimé car <b>ade ∉ L3</b>. C4 = {abcd}.'
  },
  {
    ch: 'assoc',
    type: 'qcm',
    q: 'Lors de la jointure pour former C(k), on combine deux itemsets de L(k−1) qui…',
    o: [
      'n’ont aucun élément en commun',
      'ont exactement k−2 éléments en commun (les mêmes premiers éléments)',
      'ont le même support',
      'ont k éléments en commun'
    ],
    a: 1,
    e: 'Deux (k−1)-itemsets qui partagent les <b>k−2 premiers éléments</b> donnent un k-itemset.'
  },
  {
    ch: 'assoc',
    type: 'qcm',
    q: 'Quelle est la phase la plus coûteuse d’Apriori ?',
    o: [
      'La génération des règles',
      'Le calcul des itemsets fréquents',
      'Le calcul de la confiance',
      'Le tri des règles'
    ],
    a: 1,
    e: 'Le cours : « la phase (1) est la phase la plus coûteuse » (nombreux candidats, plusieurs passages sur la base).'
  },
  {
    ch: 'assoc',
    type: 'qcm',
    q: 'La génération des règles à partir des itemsets fréquents nécessite-t-elle de relire les données ?',
    o: [
      'Oui, une passe par règle',
      'Oui, une passe par itemset',
      'Non, les supports sont déjà connus',
      'Seulement pour les règles à 100 %'
    ],
    a: 2,
    e: 'Le cours : « cette phase ne nécessite aucun accès aux données » : la confiance se calcule avec les supports déjà comptés.'
  },
  {
    ch: 'assoc',
    type: 'qcm',
    q: 'Une règle X → Y est intéressante (valide) si…',
    o: ['sup ≥ minsup OU conf ≥ minconf', 'sup ≥ minsup ET conf ≥ minconf', 'conf = 100 %', 'sup(X) ≥ minsup'],
    a: 1,
    e: 'Les <b>deux</b> conditions sont nécessaires.'
  },
  {
    ch: 'assoc',
    type: 'qcm',
    q: 'Base du cours (T1 à T5), minsup = 2/5, minconf = 3/4. La règle Lait, Beurre, Sucre → Pain est…',
    o: [
      'intéressante : conf = 1',
      'non intéressante : support 1/5 < minsup',
      'non intéressante : conf = 1/4',
      'intéressante : support 2/5'
    ],
    a: 1,
    e: 'Confiance 1/1 ≥ minconf, mais {Lait, Beurre, Sucre, Pain} n’apparaît que dans T5 : <b>support 1/5 &lt; 2/5</b>.'
  },
  {
    ch: 'assoc',
    type: 'qcm',
    q: 'Base du cours, minsup = 2/5, minconf = 3/4. La règle Pain, Lait → Beurre est…',
    o: [
      'intéressante',
      'non intéressante : support trop faible',
      'non intéressante : confiance 2/4 < 3/4',
      'non intéressante : les deux seuils échouent'
    ],
    a: 2,
    e: 'Support {Pain, Lait, Beurre} = 2/5 ≥ minsup, mais confiance = 2/4 = 0,5 &lt; 0,75.'
  },
  {
    ch: 'assoc',
    type: 'qcm',
    q: 'Combien de règles peut-on générer à partir d’un 3-itemset fréquent {A, B, C} ?',
    o: ['3', '6', '8', '9'],
    a: 1,
    e: 'Sous-ensembles non vides stricts : 2³ − 2 = <b>6</b> (A → BC, B → AC, C → AB, AB → C, AC → B, BC → A).'
  },
  {
    ch: 'assoc',
    type: 'qcm',
    src: 'D1',
    q: 'La règle {Douleur thoracique, Douleur abdominale} → {Vertiges} a un support de 2/7 et une confiance de 100 %. Que peut-on en déduire ?',
    o: [
      'Tous les patients ayant ces deux douleurs ont des vertiges',
      'La majorité des patients ont des vertiges',
      'La règle n’est pas intéressante car le support est trop faible',
      'Les vertiges sont toujours causés par ces deux douleurs'
    ],
    a: 0,
    e: 'Confiance 100 % : tous ceux qui ont l’antécédent ont aussi le conséquent. B est faux (2 patients sur 7), C dépend d’un seuil non donné, D confond <b>co-occurrence et causalité</b>.'
  },
  {
    ch: 'assoc',
    type: 'qcm',
    q: 'Une règle d’association de confiance 100 % prouve-t-elle une relation de cause à effet ?',
    o: [
      'Oui, toujours',
      'Oui, si le support est élevé',
      'Non : elle traduit une co-occurrence, pas une causalité',
      'Oui, si minconf = 100 %'
    ],
    a: 2,
    e: 'Une règle dit que des items <b>apparaissent ensemble</b>. La causalité demande d’autres analyses.'
  },
  {
    ch: 'assoc',
    type: 'qcm',
    q: 'Un itemset fréquent est dit maximal si…',
    o: [
      'aucun de ses sur-ensembles (immédiats) n’est fréquent',
      'aucun de ses sur-ensembles n’a le même support',
      'tous ses sous-itemsets ont un support plus grand',
      'son support vaut 100 %'
    ],
    a: 0,
    e: '<b>Maximal</b> : aucun sur-ensemble fréquent. (B = fermé, C = générateur.)'
  },
  {
    ch: 'assoc',
    type: 'qcm',
    q: 'Un itemset est dit fermé si…',
    o: [
      'aucun de ses sur-ensembles n’est fréquent',
      'aucun de ses sur-ensembles n’a le même support que lui',
      'il contient tous les items',
      'sa confiance vaut 1'
    ],
    a: 1,
    e: '<b>Fermé</b> : tous ses sur-ensembles ont un support strictement plus faible.'
  },
  {
    ch: 'assoc',
    type: 'qcm',
    q: 'Combien de passages sur la base Apriori fait-il pour trouver les n-itemsets fréquents ?',
    o: ['1', 'n', 'n + 1', '2ⁿ'],
    a: 2,
    e: 'Le cours : « on doit faire (n + 1) scans pour trouver les n-itemsets fréquents ».'
  },
  {
    ch: 'assoc',
    type: 'qcm',
    q: 'Qui a introduit le concept de règles d’association, en 1993 ?',
    o: ['Quinlan', 'Agrawal et al.', 'MacQueen', 'Kaufman et Rousseeuw'],
    a: 1,
    e: '<b>Agrawal et al.</b> (1993), puis l’algorithme Apriori (Agrawal, 1994). Quinlan = ID3 ; MacQueen = K-means ; Kaufman = K-medoids/AGNES.'
  },
  {
    ch: 'assoc',
    type: 'qcm',
    q: 'Lequel n’est PAS un algorithme de recherche de motifs fréquents ?',
    o: ['FP-Growth', 'Eclat', 'K-medoids', 'AprioriTID'],
    a: 2,
    e: 'K-medoids est un algorithme de <b>clustering</b>.'
  },
  {
    ch: 'assoc',
    type: 'qcm',
    src: 'D2',
    q: 'Textes du TD (minsup 40 %, 7 textes). L’itemset {Economie, Finance, Budget} est-il fréquent ?',
    o: [
      'Oui : support 3/7',
      'Non : Budget n’est présent que dans 2 textes, donc tout sur-ensemble de {Budget} est non fréquent',
      'Oui : Economie est présent dans 4 textes',
      'On ne peut pas savoir sans tout recalculer'
    ],
    a: 1,
    e: 'Support = 2/7 (textes 1 et 4) &lt; 3. Plus rapide : {Budget} n’est pas fréquent, donc par <b>antimonotonie</b> aucun sur-ensemble ne l’est.'
  },
  {
    ch: 'assoc',
    type: 'qcm',
    src: 'D2',
    q: 'Textes du TD. Que vaut la confiance de Economie → Finance ?',
    o: ['3/3 = 100 %', '3/4 = 75 %', '3/7 ≈ 43 %', '4/7 ≈ 57 %'],
    a: 1,
    e: '{Economie, Finance} : textes 1, 2, 4 (3) ; {Economie} : textes 1, 2, 4, 6 (4). Confiance = <b>3/4 = 75 %</b>, juste au seuil.'
  },
  {
    ch: 'assoc',
    type: 'qcm',
    q: 'Quel problème apparaît si minsup est fixé trop bas ?',
    o: [
      'On ne trouve aucune règle',
      'Explosion du nombre d’itemsets fréquents et de règles',
      'Les confiances deviennent nulles',
      'L’algorithme ne termine pas'
    ],
    a: 1,
    e: 'Seuil trop bas → <b>trop de règles</b>, souvent peu intéressantes ; seuil trop haut → on perd des règles intéressantes.'
  },
  {
    ch: 'assoc',
    type: 'qcm',
    q: 'Sous quel format représente-t-on la base pour extraire des règles d’association ?',
    o: [
      'Une matrice de distances',
      'Une base de transactions (ou un tableau binaire 0/1 objets × items)',
      'Un arbre de décision',
      'Un dendrogramme'
    ],
    a: 1,
    e: 'Le cours montre les deux : liste de transactions ou tableau binaire Client × Items. En Python : TransactionEncoder (one-hot).'
  },
  {
    ch: 'assoc',
    type: 'qcm',
    src: 'D1',
    q: 'Patients (D1). Lequel de ces ensembles est fréquent pour minsup = 3/7 ? {Fièvre, Toux} (1 patient) ; {Nausée, Vertiges} (2) ; {Douleur thoracique, Sport} (2) ; {Nausée, Douleur abdominale} (2).',
    o: ['{Fièvre, Toux}', '{Nausée, Vertiges}', '{Nausée, Douleur abdominale}', 'Aucun'],
    a: 3,
    e: 'Tous ont un support ≤ 2/7 &lt; 3/7 : <b>aucun</b> n’est fréquent. Piège : ne pas choisir « le plus grand ».'
  },
  {
    ch: 'assoc',
    type: 'qcm',
    q: 'Dans l’élagage d’Apriori, on supprime un candidat de taille k si…',
    o: [
      'son support est inférieur à minsup',
      'un de ses sous-ensembles de taille k−1 n’est pas dans L(k−1)',
      'il contient un item rare',
      'sa confiance est inférieure à minconf'
    ],
    a: 1,
    e: 'L’élagage se fait <b>avant</b> le comptage, sans lire les données, grâce à l’antimonotonie.'
  },
  {
    ch: 'assoc',
    type: 'qcm',
    q: 'Le lift d’une règle (vu en TP) vaut 1. Cela signifie…',
    o: [
      'une association forte',
      'que X et Y sont indépendants : la règle n’apporte aucune information',
      'une association négative',
      'une confiance de 100 %'
    ],
    a: 1,
    e: '<span class="tag hc">Hors diapos, vu en TP</span> lift = conf / sup(Y). 1 = indépendance ; &gt; 1 = association positive ; &lt; 1 = négative.'
  },

  {
    ch: 'assoc',
    type: 'libre',
    q: 'Définissez le support et la confiance d’une règle X → Y (avec les formules).',
    r: '<p><b>Support</b> : sup(X → Y) = P(X ∪ Y) = proportion des transactions qui contiennent à la fois X et Y.</p><p><b>Confiance</b> : conf(X → Y) = sup(X ∪ Y) / sup(X) = P(Y | X) = proportion des transactions contenant X qui contiennent aussi Y.</p>',
    kw: ['proportion', 'transactions', 'x et y', 'sup(x', 'conditionnelle']
  },
  {
    ch: 'assoc',
    type: 'libre',
    q: 'Énoncez la propriété d’antimonotonie du support et expliquez son intérêt dans Apriori.',
    r: '<p>Si X ⊆ Y alors sup(X) ≥ sup(Y). Donc <b>tout sous-ensemble d’un itemset fréquent est fréquent</b> et <b>tout sur-ensemble d’un itemset non fréquent est non fréquent</b>.</p><p>Intérêt : Apriori construit les candidats de taille k uniquement à partir des fréquents de taille k−1 et <b>élague</b> ceux qui ont un sous-ensemble non fréquent, sans les compter. Cela réduit fortement le nombre de candidats.</p>',
    kw: ['sous-ensemble', 'frequent', 'sur-ensemble', 'non frequent', 'elag']
  },
  {
    ch: 'assoc',
    type: 'libre',
    q: 'Décrivez les deux grandes étapes de l’extraction des règles d’association.',
    r: '<ol><li><b>Extraire tous les itemsets fréquents</b> (support ≥ minsup), niveau par niveau : L1, puis C2 → L2, etc. (génération des candidats par jointure + élagage, puis comptage).</li><li><b>Générer les règles</b> : pour chaque itemset fréquent X et chaque sous-ensemble non vide A ⊂ X, former A → X − A et garder celles dont la confiance ≥ minconf.</li></ol>',
    kw: ['itemsets frequents', 'minsup', 'generer', 'regles', 'confiance', 'minconf']
  },
  {
    ch: 'assoc',
    type: 'libre',
    src: 'D2',
    q: 'Quels problèmes doit-on affronter si l’on veut implémenter une méthode de règles d’association ?',
    r: '<ul><li><b>Choisir minsup et minconf</b> : trop bas → explosion du nombre de règles ; trop haut → perte de règles intéressantes.</li><li><b>Coût de calcul</b> : le nombre de candidats croît exponentiellement (2ⁿ) et il faut plusieurs passages sur la base.</li><li><b>Mettre les données au format transactionnel</b> (encodage binaire, discrétisation des variables numériques).</li><li><b>Interpréter et filtrer</b> les règles (trop de règles, règles redondantes ou triviales).</li></ul>',
    kw: ['minsup', 'minconf', 'candidats', 'passages', 'format', 'trop de regles']
  },
  {
    ch: 'assoc',
    type: 'libre',
    src: 'D2',
    q: 'Sur un tableau de mots-clés extraits de textes, quel problème traitent les règles d’association ?',
    r: '<p>Un problème de <b>fouille de textes (text mining)</b> : découvrir les mots-clés qui apparaissent fréquemment ensemble, puis s’en servir pour <b>classer (catégoriser) un texte</b> dans un thème (Economie ou Sport) à partir de ses mots-clés.</p>',
    kw: ['text mining', 'mots-cles', 'ensemble', 'classer', 'theme']
  },
  {
    ch: 'assoc',
    type: 'libre',
    q: 'Expliquez la jointure et l’élagage dans Apriori, avec l’exemple L3 = {abc, abd, acd, ace, bcd}.',
    r: '<p><b>Jointure</b> : on unit deux itemsets de L(k−1) qui ont les k−2 premiers éléments en commun. Ici : abc ⋈ abd → abcd ; acd ⋈ ace → acde.</p><p><b>Élagage</b> : on supprime un candidat si l’un de ses sous-ensembles de taille k−1 n’est pas dans L(k−1). acde est supprimé car <b>ade ∉ L3</b>. Donc <b>C4 = {abcd}</b>.</p>',
    kw: ['abcd', 'acde', 'ade', 'sous-ensemble', 'k-2']
  },
  {
    ch: 'assoc',
    type: 'libre',
    q: 'Définissez un itemset fréquent, maximal, fermé et générateur.',
    r: '<ul><li><b>Fréquent</b> : support ≥ minsup.</li><li><b>Maximal</b> : aucun de ses sur-ensembles n’est fréquent.</li><li><b>Fermé</b> : aucun de ses sur-ensembles n’a le même support (tous ont un support strictement plus faible).</li><li><b>Générateur</b> : tous ses sous-itemsets ont un support strictement supérieur.</li></ul>',
    kw: ['minsup', 'sur-ensembles', 'meme support', 'sous-itemsets', 'strictement']
  },
  {
    ch: 'assoc',
    type: 'libre',
    q: 'Citez trois applications des règles d’association.',
    r: '<ul><li><b>Supermarché</b> : produits achetés ensemble → rayonnage, promotions, mailing.</li><li><b>Médecine</b> : corrélations entre symptômes ou informations sur les patients.</li><li><b>Puces à ADN</b> : gènes co-exprimés ; <b>web</b> : profils d’utilisateurs ; <b>texte</b> : mots-clés associés.</li></ul>',
    kw: ['supermarche', 'rayon', 'medecine', 'adn', 'web', 'texte']
  },
  {
    ch: 'assoc',
    type: 'libre',
    q: 'Quels sont les inconvénients de l’algorithme Apriori et comment l’optimiser ?',
    r: '<p><b>Inconvénients</b> : génération d’un très grand nombre de candidats (10⁴ 1-itemsets fréquents → 10⁷ candidats de taille 2 ; 2¹⁰⁰ candidats pour un 100-itemset) et <b>plusieurs passages</b> sur la base (n + 1 pour les n-itemsets).</p><p><b>Optimisations</b> : ne calculer qu’une partie des fréquents (<b>maximaux</b> ou <b>fermés</b>) et en déduire les autres ; autres algorithmes (FP-Growth, Eclat).</p>',
    kw: ['candidats', 'passages', 'scans', 'maximaux', 'fermes']
  },
  {
    ch: 'assoc',
    type: 'libre',
    q: 'Comment utiliser des règles d’association pour prédire la classe (Economie ou Sport) d’un nouveau texte ?',
    r: '<p>On garde les règles dont la <b>conclusion est une classe</b> et dont la prémisse ne contient pas de classe. Pour un nouveau texte, on sélectionne les règles dont la <b>prémisse est contenue dans ses mots-clés</b>, puis on attribue la classe de la règle de <b>plus forte confiance</b> (puis de plus fort support). Ex. : « Finance » → Finance → Economie (100 %) → classe Economie.</p>',
    kw: ['conclusion', 'classe', 'premisse', 'confiance', 'finance']
  },

  /* =================== CLUSTERING =================== */
  {
    ch: 'clust',
    type: 'qcm',
    q: 'Le clustering est…',
    o: [
      'une classification supervisée',
      'une classification non supervisée : les classes ne sont pas prédéfinies',
      'une méthode de régression',
      'une méthode de sélection d’attributs'
    ],
    a: 1,
    e: 'Le cours : « Clustering = classification non supervisée : pas de classes prédéfinies, à découvrir automatiquement ».'
  },
  {
    ch: 'clust',
    type: 'qcm',
    src: 'D3',
    q: 'Un bon clustering garantit…',
    o: [
      'une faible similarité intra-groupe et une grande similarité inter-groupe',
      'une grande similarité intra-groupe et une faible similarité inter-groupe',
      'des groupes de même taille',
      'un nombre de groupes égal au nombre de variables'
    ],
    a: 1,
    e: 'Les objets d’un même cluster se ressemblent ; ceux de clusters différents se ressemblent peu.'
  },
  {
    ch: 'clust',
    type: 'qcm',
    src: 'D1',
    q: 'Quelle métrique utilise-t-on pour créer des clusters ?',
    o: ['Le support', 'Une mesure de distance (dissimilarité)', 'Le gain d’information', 'La confiance'],
    a: 1,
    e: 'La similarité est exprimée par une <b>distance</b> ; exemple : la distance euclidienne.'
  },
  {
    ch: 'clust',
    type: 'qcm',
    q: 'La distance de Minkowski avec q = 1 est la distance…',
    o: ['euclidienne', 'de Manhattan', 'de Jaccard', 'de Tchebychev'],
    a: 1,
    e: 'q = 1 : <b>Manhattan</b> (somme des écarts absolus) ; q = 2 : euclidienne.'
  },
  {
    ch: 'clust',
    type: 'qcm',
    q: 'Distance euclidienne entre A1(2, 10) et A4(5, 8) ?',
    o: ['5', '√13 ≈ 3,61', '13', '√5 ≈ 2,24'],
    a: 1,
    e: '(5 − 2)² + (8 − 10)² = 9 + 4 = 13 → d = <b>√13 ≈ 3,61</b>.'
  },
  {
    ch: 'clust',
    type: 'qcm',
    q: 'Distance de Manhattan entre A(3, 2) et G(6, 4) ?',
    o: ['5', '√13', '13', '3'],
    a: 0,
    e: '|6 − 3| + |4 − 2| = 3 + 2 = <b>5</b>.'
  },
  {
    ch: 'clust',
    type: 'qcm',
    q: 'Pourquoi standardise-t-on les variables numériques avant un clustering ?',
    o: [
      'Pour accélérer l’algorithme',
      'Pour ne pas favoriser les variables qui ont de grandes valeurs (échelles différentes)',
      'Pour supprimer les outliers',
      'Pour obtenir des entiers'
    ],
    a: 1,
    e: 'Sinon une variable comme le salaire (en milliers) écrase l’âge dans la distance. Le cours montre que la conclusion peut s’inverser.'
  },
  {
    ch: 'clust',
    type: 'qcm',
    q: 'Dans la formule du z-score du cours, sf est…',
    o: ['l’écart-type', 'l’écart absolu moyen : (1/n) Σ |xif − mf|', 'le maximum moins le minimum', 'la médiane'],
    a: 1,
    e: 'Le cours utilise l’<b>écart absolu moyen</b> (pas l’écart-type). zif = (xif − mf) / sf.'
  },
  {
    ch: 'clust',
    type: 'qcm',
    q: 'Âges : 50, 70, 60, 60. Moyenne 60, écart absolu moyen 5. Quel est le z-score de 50 ?',
    o: ['−10', '−2', '−0,5', '2'],
    a: 1,
    e: '(50 − 60) / 5 = <b>−2</b>.'
  },
  {
    ch: 'clust',
    type: 'qcm',
    q: 'oi = (1, 1, 0, 1, 0) et oj = (1, 0, 0, 0, 1), variables asymétriques. Distance de Jaccard ?',
    o: ['3/5', '3/4', '1/4', '2/5'],
    a: 1,
    e: 'a = 1, b = 2, c = 1, d = 1. Jaccard = (b + c)/(a + b + c) = <b>3/4</b>. (Appariement simple : 3/5.)'
  },
  {
    ch: 'clust',
    type: 'qcm',
    q: 'Pourquoi le coefficient de Jaccard ignore-t-il d (les positions 0-0) ?',
    o: [
      'Parce que d est toujours nul',
      'Parce que pour une variable asymétrique, partager un 0 (ex. deux tests négatifs) n’est pas significatif',
      'Pour simplifier le calcul',
      'Parce que d est réservé aux variables nominales'
    ],
    a: 1,
    e: 'Deux personnes négatives à un test ne se ressemblent pas pour autant ; deux positives, si.'
  },
  {
    ch: 'clust',
    type: 'qcm',
    q: 'Deux individus décrits par 4 variables nominales ont 3 valeurs identiques. Distance (matching simple) ?',
    o: ['3/4', '1/4', '1/3', '4/3'],
    a: 1,
    e: 'd = (p − m)/p = (4 − 3)/4 = <b>1/4</b>.'
  },
  {
    ch: 'clust',
    type: 'qcm',
    q: 'Variable ordinale Insuffisant < Passable < Bien < Très bien. Quelle valeur normalisée pour « Bien » ?',
    o: ['3', '3/4', '2/3', '1/2'],
    a: 2,
    e: 'Rang r = 3, k = 4 modalités : y = (r − 1)/(k − 1) = <b>2/3</b>.'
  },
  {
    ch: 'clust',
    type: 'qcm',
    q: 'Dans K-means, une classe est représentée par…',
    o: [
      'son élément le plus représentatif',
      'son centre de gravité (la moyenne de ses points)',
      'son point le plus éloigné',
      'la racine d’un arbre'
    ],
    a: 1,
    e: 'K-means : <b>centre de gravité</b>. K-medoids : élément le plus représentatif (médoïde).'
  },
  {
    ch: 'clust',
    type: 'qcm',
    q: 'Quand l’algorithme K-means s’arrête-t-il ?',
    o: [
      'Après exactement k itérations',
      'Quand plus aucun objet ne change de cluster',
      'Quand tous les clusters ont la même taille',
      'Quand la distance devient nulle'
    ],
    a: 1,
    e: 'Étape 4 du cours : on recommence tant qu’au moins un sous-ensemble a été modifié.'
  },
  {
    ch: 'clust',
    type: 'qcm',
    q: 'Cochez les faiblesses de K-means citées dans le cours.',
    o: [
      'Il faut spécifier k à l’avance',
      'Inapplicable si les attributs ne sont pas numériques (moyenne ?)',
      'Complexité quadratique',
      'Les centres sont des objets inexistants'
    ],
    a: [0, 1, 3],
    e: 'La complexité <b>quadratique</b> est la faiblesse des méthodes <b>hiérarchiques</b> ; K-means est linéaire.'
  },
  {
    ch: 'clust',
    type: 'qcm',
    q: 'Quelle est la complexité de K-means en nombre d’objets ?',
    o: ['Linéaire', 'Quadratique', 'Exponentielle', 'Logarithmique'],
    a: 0,
    e: 'K-means passe à l’échelle (<b>linéaire</b>). La CAH est quadratique.'
  },
  {
    ch: 'clust',
    type: 'qcm',
    q: 'Au départ de l’algorithme AGNES (CAH)…',
    o: [
      'tous les objets sont dans un seul groupe',
      'chaque objet forme un cluster',
      'on choisit k centres au hasard',
      'on trie les objets par densité'
    ],
    a: 1,
    e: 'Méthode <b>ascendante</b> : un objet = une classe, puis fusions successives des deux classes les plus proches.'
  },
  {
    ch: 'clust',
    type: 'qcm',
    q: 'Avec le saut minimal (single linkage), la distance entre deux groupes est…',
    o: [
      'la distance entre leurs centres de gravité',
      'la plus grande distance entre un point de l’un et un point de l’autre',
      'la plus petite distance entre un point de l’un et un point de l’autre',
      'la moyenne de toutes les distances'
    ],
    a: 2,
    e: "C’est la méthode de l’exemple du cours et du code des devoirs : linkage(…, method='single')."
  },
  {
    ch: 'clust',
    type: 'qcm',
    q: 'Dans une méthode hiérarchique, peut-on séparer deux classes déjà fusionnées ?',
    o: [
      'Oui, à l’étape suivante',
      'Non : pas de remise en question possible',
      'Oui, si on change de distance',
      'Oui, avec le saut minimal'
    ],
    a: 1,
    e: 'Faiblesse du cours : deux classes agglomérées à un niveau ne peuvent plus être séparées.'
  },
  {
    ch: 'clust',
    type: 'qcm',
    q: 'Quelle méthode découvre des clusters de forme quelconque et est insensible au bruit ?',
    o: ['K-means', 'AGNES', 'DBSCAN (méthode basée sur la densité)', 'K-medoids'],
    a: 2,
    e: 'Méthodes basées sur la <b>densité</b> : formes quelconques, insensibles au bruit, un seul parcours des données.'
  },
  {
    ch: 'clust',
    type: 'qcm',
    q: 'Pour obtenir 3 clusters à partir d’un dendrogramme, on…',
    o: [
      'garde les 3 premières feuilles',
      'coupe horizontalement à une hauteur qui traverse exactement 3 branches',
      'coupe à la hauteur 3',
      'prend les 3 fusions les plus hautes'
    ],
    a: 1,
    e: 'On trace une ligne horizontale qui coupe <b>3 traits verticaux</b> ; chaque trait regroupe les feuilles situées sous lui.'
  },
  {
    ch: 'clust',
    type: 'qcm',
    src: 'D1',
    q: 'Comment affecter un nouvel élément à l’un des clusters obtenus ?',
    o: [
      'Au cluster le plus grand',
      'Au cluster dont le centre de gravité est le plus proche',
      'Au hasard',
      'Au cluster du dernier point ajouté'
    ],
    a: 1,
    e: 'On calcule la distance (euclidienne) du point au <b>centre de gravité</b> de chaque cluster, et on prend le plus proche.'
  },
  {
    ch: 'clust',
    type: 'qcm',
    q: 'Exemple du cours : A = {1, 2, 3, 6, 7, 8, 13, 15, 17}, k = 3, centres initiaux 1, 2, 3. Résultat final ?',
    o: [
      '{1}, {2, 3}, {6, …, 17}',
      '{1, 2, 3}, {6, 7, 8}, {13, 15, 17}',
      '{1, 2}, {3, 6, 7}, {8, 13, 15, 17}',
      '{1, 2, 3, 6}, {7, 8}, {13, 15, 17}'
    ],
    a: 1,
    e: 'Après plusieurs itérations : C1 = {1, 2, 3} (M = 2), C2 = {6, 7, 8} (M = 7), C3 = {13, 15, 17} (M = 15). Plus rien ne bouge.'
  },
  {
    ch: 'clust',
    type: 'qcm',
    q: 'Exercice fait en classe (29/10) : points A(3,2), B(4,5), C(4,7), D(2,7), E(6,6), F(7,7), G(6,4), k = 3, centres initiaux A, B, G. Clusters après la 1ʳᵉ affectation ?',
    o: [
      '{A}, {B, C, D}, {E, F, G}',
      '{A, B}, {C, D}, {E, F, G}',
      '{A, G}, {B, C, D}, {E, F}',
      '{A}, {B, C}, {D, E, F, G}'
    ],
    a: 0,
    e: 'Distances au carré : C → B (4) ; D → B (8) ; E → G (4) ; F → G (10). On obtient C1 = {A}, C2 = {B, C, D}, C3 = {E, F, G}, et rien ne change ensuite.'
  },
  {
    ch: 'clust',
    type: 'qcm',
    q: 'Centre de gravité de {B(4,5), C(4,7), D(2,7)} ?',
    o: ['(4 ; 6)', '(3,33 ; 6,33)', '(3 ; 6)', '(10 ; 19)'],
    a: 1,
    e: 'x = (4 + 4 + 2)/3 = 10/3 ≈ 3,33 ; y = (5 + 7 + 7)/3 = 19/3 ≈ 6,33.'
  },
  {
    ch: 'clust',
    type: 'qcm',
    q: 'Sans calculatrice, comment comparer rapidement des distances euclidiennes ?',
    o: [
      'On ne peut pas',
      'Comparer les carrés des distances : la racine ne change pas l’ordre',
      'Utiliser Manhattan à la place',
      'Arrondir chaque coordonnée'
    ],
    a: 1,
    e: 'Si d₁² &lt; d₂² alors d₁ &lt; d₂. C’est ce que le professeur a fait au tableau.'
  },
  {
    ch: 'clust',
    type: 'qcm',
    q: 'Une matrice de proximité est une matrice…',
    o: [
      'individus × variables',
      'individus × individus contenant les distances',
      'variables × variables contenant les corrélations',
      'transactions × items'
    ],
    a: 1,
    e: 'Triangulaire, diagonale nulle, d(i, j) = d(j, i).'
  },
  {
    ch: 'clust',
    type: 'qcm',
    q: 'Dans la formule des types mixtes, δk(i, j) = 0 lorsque…',
    o: [
      'les deux valeurs sont égales',
      'une valeur est inconnue, ou 0-0 sur une variable binaire asymétrique',
      'la variable est numérique',
      'la distance est nulle'
    ],
    a: 1,
    e: 'Ces variables ne comptent alors pas dans la moyenne pondérée.'
  },
  {
    ch: 'clust',
    type: 'qcm',
    q: 'Dans le TP, pourquoi utilise-t-on K-medoids (et non K-means) avec la distance de Manhattan ou cosinus ?',
    o: [
      'K-medoids est plus rapide',
      'Le barycentre de K-means est lié à la distance euclidienne ; le médoïde, objet réel, accepte n’importe quelle distance',
      'K-means n’accepte pas plus de 2 variables',
      'K-medoids ne nécessite pas k'
    ],
    a: 1,
    e: 'Tableau récapitulatif du TP clustering.'
  },
  {
    ch: 'clust',
    type: 'qcm',
    q: 'Localiser une tumeur dans le cerveau à partir d’un nuage de points est une application…',
    o: ['des règles d’association', 'du clustering', 'de la régression', 'de la discrétisation'],
    a: 1,
    e: 'Application médecine citée dans le cours de clustering.'
  },

  {
    ch: 'clust',
    type: 'libre',
    src: 'D3',
    q: 'Qu’est-ce que le clustering ?',
    r: '<p>Le clustering (classification non supervisée) consiste à organiser un ensemble d’objets en <b>groupes (clusters)</b> tels que les objets d’un même cluster soient <b>très similaires</b> et ceux de clusters différents <b>peu similaires</b>. Les classes ne sont <b>pas prédéfinies</b> : elles sont découvertes automatiquement.</p>',
    kw: ['non supervisee', 'groupes', 'similarite', 'intra', 'inter', 'predefinies']
  },
  {
    ch: 'clust',
    type: 'libre',
    src: 'D3',
    q: 'Quelles sont les qualités d’un bon clustering ?',
    r: '<ul><li>Une <b>grande similarité intra-cluster</b>.</li><li>Une <b>faible similarité inter-cluster</b>.</li><li>La qualité dépend de la <b>mesure de similarité</b> utilisée et de son <b>implémentation</b> ; elle se juge à la capacité à découvrir des <b>patterns cachés</b>.</li></ul>',
    kw: ['intra', 'inter', 'mesure', 'similarite', 'patterns']
  },
  {
    ch: 'clust',
    type: 'libre',
    src: 'D3',
    q: 'Donnez trois applications du clustering et expliquez-les.',
    r: '<ul><li><b>Marketing</b> : segmenter le marché en groupes de clients distincts à partir de leurs achats, pour cibler les offres.</li><li><b>Assurance</b> : identifier des groupes d’assurés associés à beaucoup de déclarations.</li><li><b>Médecine</b> : localiser une tumeur en regroupant les points d’une image du cerveau.</li><li>(Aussi : environnement, urbanisme.)</li></ul>',
    kw: ['marketing', 'clients', 'assurance', 'medecine', 'tumeur', 'urbanisme']
  },
  {
    ch: 'clust',
    type: 'libre',
    src: 'D2',
    q: 'Quels problèmes doit-on affronter si l’on veut implémenter une méthode de clustering ?',
    r: '<ul><li>Choisir une <b>mesure de distance</b> adaptée au type des variables (numériques, binaires, nominales, ordinales, mixtes).</li><li><b>Normaliser</b> les variables pour ne pas en favoriser certaines.</li><li>Fixer le <b>nombre de clusters k</b> et les centres initiaux (K-means), dont dépend le résultat.</li><li>Traiter le <b>bruit et les outliers</b>.</li><li><b>Passage à l’échelle</b> (CAH quadratique) et évaluation des clusters.</li></ul>',
    kw: ['distance', 'type', 'normaliser', 'nombre de clusters', 'bruit', 'echelle']
  },
  {
    ch: 'clust',
    type: 'libre',
    src: 'D1',
    q: 'Quelle est la métrique utilisée pour créer des clusters ? Donnez un exemple.',
    r: '<p>Une <b>mesure de distance</b> (dissimilarité) entre objets : plus la distance est petite, plus les objets sont similaires. Exemple : la <b>distance euclidienne</b> d(i,j) = √[(xᵢ₁ − xⱼ₁)² + … + (xᵢₚ − xⱼₚ)²] (Minkowski avec q = 2). Autre exemple : Manhattan (q = 1).</p>',
    kw: ['distance', 'euclidienne', 'minkowski', 'manhattan']
  },
  {
    ch: 'clust',
    type: 'libre',
    q: 'Expliquez le principe et les étapes de l’algorithme K-means.',
    r: '<p>Une classe est représentée par son <b>centre de gravité</b> ; un objet appartient à la classe du centre le plus proche.</p><ol><li>Choisir k et découper les données en k sous-ensembles (ou choisir k centres initiaux).</li><li>Calculer le centre de gravité de chaque sous-ensemble.</li><li>Réaffecter chaque objet au centre de gravité le plus proche.</li><li>Revenir à l’étape 2 si un sous-ensemble a changé ; sinon arrêt.</li></ol>',
    kw: ['centre de gravite', 'plus proche', 'recalcul', 'change', 'k']
  },
  {
    ch: 'clust',
    type: 'libre',
    q: 'Donnez les forces et les faiblesses de K-means.',
    r: '<p><b>Forces</b> : relativement efficace ; passe à l’échelle (complexité linéaire en nombre d’objets).</p><p><b>Faiblesses</b> : inapplicable si les attributs ne sont pas numériques (la moyenne n’a pas de sens) ; il faut spécifier k ; les clusters sont construits autour d’objets inexistants (les centres) ; le résultat dépend des centres initiaux.</p>',
    kw: ['efficace', 'lineaire', 'numerique', 'k', 'inexistants']
  },
  {
    ch: 'clust',
    type: 'libre',
    q: 'Expliquez le principe des méthodes hiérarchiques (AGNES / CAH) et leurs faiblesses.',
    r: '<p><b>Principe</b> : au départ chaque objet forme une classe ; à chaque étape on <b>fusionne les deux classes les plus proches</b> ; on s’arrête quand tout est dans un seul groupe. Le résultat se lit sur un <b>dendrogramme</b>.</p><p><b>Faiblesses</b> : passage à l’échelle difficile (<b>complexité quadratique</b>) ; <b>pas de remise en question</b> : deux classes fusionnées ne peuvent plus être séparées.</p>',
    kw: ['chaque objet', 'fusion', 'plus proches', 'dendrogramme', 'quadratique', 'remise en question']
  },
  {
    ch: 'clust',
    type: 'libre',
    q: 'Quelle différence entre K-means et K-medoids ?',
    r: '<p><b>K-means</b> représente un cluster par son <b>centre de gravité</b> (moyenne, souvent un point qui n’existe pas). <b>K-medoids</b> le représente par son <b>élément le plus représentatif</b> (un objet réel, le médoïde) ; il est plus robuste et accepte d’autres distances (Manhattan, cosinus).</p>',
    kw: ['centre de gravite', 'moyenne', 'representatif', 'objet reel', 'medoide']
  },
  {
    ch: 'clust',
    type: 'libre',
    q: 'Citez les trois approches de clustering du cours, avec un algorithme pour chacune.',
    r: '<ul><li><b>Partitionnement</b> : K-means, K-medoids.</li><li><b>Hiérarchiques</b> (par agglomération ou division) : AGNES / CAH, BIRCH.</li><li><b>Basées sur la densité</b> : DBSCAN.</li></ul>',
    kw: ['partitionnement', 'k-means', 'hierarchique', 'agnes', 'densite', 'dbscan']
  },
  {
    ch: 'clust',
    type: 'libre',
    q: 'Comment mesurer la distance entre deux individus décrits par des variables binaires asymétriques ? Donnez la formule.',
    r: '<p>On construit la table de contingence (a = 1-1, b = 1-0, c = 0-1, d = 0-0) et on utilise le <b>coefficient de Jaccard</b> : <b>d(i, j) = (b + c) / (a + b + c)</b>. On ignore d car les correspondances 0-0 ne sont pas significatives pour une variable asymétrique.</p>',
    kw: ['jaccard', 'b + c', 'a + b + c', 'contingence']
  },
  {
    ch: 'clust',
    type: 'libre',
    q: 'Pourquoi et comment standardiser des variables numériques (formule du cours) ?',
    r: '<p><b>Pourquoi</b> : pour ne pas favoriser les variables qui ont de grandes valeurs ou unités.</p><p><b>Comment</b> : mf = (1/n)(x₁f + … + xₙf) ; sf = (1/n)(|x₁f − mf| + … + |xₙf − mf|) (écart absolu moyen) ; <b>zif = (xif − mf) / sf</b>.</p>',
    kw: ['favoriser', 'moyenne', 'ecart absolu', 'z']
  },

  /* =================== CLASSIFICATION =================== */
  {
    ch: 'classif',
    type: 'qcm',
    q: 'La classification est une technique d’apprentissage…',
    o: ['non supervisé', 'supervisé', 'par renforcement', 'semi-supervisé'],
    a: 1,
    e: 'On dispose d’exemples dont la classe (variable expliquée) est connue.'
  },
  {
    ch: 'classif',
    type: 'qcm',
    q: 'Quelles sont les deux étapes du processus de classification ?',
    o: [
      'Jointure puis élagage',
      'Construction du modèle (apprentissage) puis utilisation (test et prédiction)',
      'Normalisation puis clustering',
      'Sélection puis interprétation'
    ],
    a: 1,
    e: 'Le modèle est construit sur le 1ᵉʳ sous-ensemble, puis évalué sur le 2ᵉ (% de bien classés) avant de prédire.'
  },
  {
    ch: 'classif',
    type: 'qcm',
    q: 'Dans un arbre de décision, une feuille représente…',
    o: ['un test sur un attribut', 'un résultat possible d’un test', 'la classe prédite', 'l’ensemble d’apprentissage'],
    a: 2,
    e: 'Nœud = test ; branche = résultat du test ; <b>feuille = classe prédite</b> (classe majoritaire).'
  },
  {
    ch: 'classif',
    type: 'qcm',
    q: 'Dans un arbre de décision, un nœud interne représente…',
    o: ['la classe prédite', 'un test effectué sur un attribut', 'une probabilité', 'une transaction'],
    a: 1,
    e: 'Ex. : « Âge &gt; 30 ? ».'
  },
  {
    ch: 'classif',
    type: 'qcm',
    q: 'Quel attribut place-t-on à la racine de l’arbre ?',
    o: [
      'Celui qui a le plus de valeurs',
      'Celui dont le gain d’information est maximal',
      'Celui dont l’entropie E(A) est maximale',
      'Le premier attribut du tableau'
    ],
    a: 1,
    e: 'Gain maximal (donc entropie restante E(A) <b>minimale</b>).'
  },
  {
    ch: 'classif',
    type: 'qcm',
    src: 'D1',
    q: 'I(p,n) = 0,940 ; E(Âge) = 0,693 ; E(IMC) = 0,910 ; E(Fumeur) = 0,787. Quel attribut est à la racine ?',
    o: ['IMC', 'Fumeur', 'Âge', 'Aucun'],
    a: 2,
    e: 'Gain(Âge) = 0,247 ; Gain(Fumeur) = 0,153 ; Gain(IMC) = 0,030. <b>Âge</b> a le plus grand gain.'
  },
  {
    ch: 'classif',
    type: 'qcm',
    src: 'D3',
    q: 'Gain(Doublant) = 0,34 ; Gain(Série) = 0,04 ; Gain(Mention) = 0,69. Racine ?',
    o: ['Doublant', 'Série', 'Mention', 'Classe'],
    a: 2,
    e: '<b>Mention</b> : plus grand gain.'
  },
  {
    ch: 'classif',
    type: 'qcm',
    q: 'Que vaut I(p, n) quand tous les exemples sont de la même classe (n = 0) ?',
    o: ['1', '0', '0,5', 'Infini'],
    a: 1,
    e: 'Aucun désordre : I(p, 0) = 0. On obtient une feuille.'
  },
  {
    ch: 'classif',
    type: 'qcm',
    q: 'Que vaut I(2, 2) dans la version normalisée (celle des devoirs) ?',
    o: ['0', '0,5', '1', '4'],
    a: 2,
    e: '−½·log₂(½) − ½·log₂(½) = ½ + ½ = <b>1</b>. Dans le cours de classification (version non divisée), on trouve 4 = 4 × 1.'
  },
  {
    ch: 'classif',
    type: 'qcm',
    q: 'Le cours de classification trouve I(9,5) = 13,16 et les devoirs donnent I(9,5) = 0,940. Que faut-il en penser ?',
    o: [
      'L’une des deux valeurs est fausse',
      'Le cours ne divise pas par (p+n) : 13,16 = 14 × 0,940 ; le choix de l’attribut reste le même',
      'Le cours utilise le logarithme népérien',
      'Il faut toujours utiliser 13,16'
    ],
    a: 1,
    e: 'Les deux conventions donnent des gains proportionnels (× 14) : <b>même racine</b>. Utilise la convention de l’énoncé.'
  },
  {
    ch: 'classif',
    type: 'qcm',
    q: 'Qu’est-ce que le surapprentissage (overfitting) ?',
    o: [
      'L’arbre fait beaucoup d’erreurs sur l’ensemble d’apprentissage',
      'L’arbre colle trop aux données d’apprentissage et généralise mal sur de nouveaux exemples',
      'L’apprentissage est trop long',
      'Il manque des attributs'
    ],
    a: 1,
    e: 'Aucune erreur sur l’apprentissage, mais rien ne garantit l’efficacité sur les autres exemples.'
  },
  {
    ch: 'classif',
    type: 'qcm',
    q: 'Cochez les moyens de limiter le surapprentissage d’un arbre.',
    o: [
      'Autoriser des erreurs sur l’ensemble d’apprentissage',
      'Élaguer l’arbre',
      'Évaluer sur un ensemble de validation (test)',
      'Ajouter des branches jusqu’à 0 erreur'
    ],
    a: [0, 1, 2],
    e: 'Le cours : autoriser des erreurs pour obtenir des arbres plus généraux, élaguer, vérifier avec un ensemble de validation.'
  },
  {
    ch: 'classif',
    type: 'qcm',
    q: 'Selon le cours, l’ensemble de validation représente généralement…',
    o: ['10 % des exemples', 'le tiers des exemples disponibles', 'la moitié des exemples', 'tous les exemples'],
    a: 1,
    e: '« L’ensemble de validation est généralement le tiers des exemples disponibles pour l’apprentissage. »'
  },
  {
    ch: 'classif',
    type: 'qcm',
    q: 'VP = 40, FP = 10, FN = 20, VN = 30. Quelle est la précision VP/(VP+FP) ?',
    o: ['0,70', '0,80', '0,67', '0,57'],
    a: 1,
    e: '40 / (40 + 10) = <b>0,8</b>. Accuracy = 70/100 = 0,7 ; rappel = 40/60 ≈ 0,67.'
  },
  {
    ch: 'classif',
    type: 'qcm',
    q: 'VP = 40, FP = 10, FN = 20, VN = 30. Quel est le rappel ?',
    o: ['0,80', '0,40', '≈ 0,67', '0,75'],
    a: 2,
    e: 'Rappel = VP/(VP + FN) = 40/60 ≈ <b>0,67</b>.'
  },
  {
    ch: 'classif',
    type: 'qcm',
    q: 'Modèle : « SI Grade = professeur OU Années > 6 ALORS Titulaire = oui ». Test : Tom (Assistant, 2, non), Elise (Assistant, 7, non), George (Professeur, 5, oui), Josephe (Assistant, 7, oui). Pourcentage de bien classés ?',
    o: ['100 %', '75 %', '50 %', '25 %'],
    a: 1,
    e: 'Tom → non ✓ ; Elise → oui ✗ (réel non) ; George → oui ✓ ; Josephe → oui ✓. <b>3/4 = 75 %</b>, taux d’erreur 25 %.'
  },
  {
    ch: 'classif',
    type: 'qcm',
    q: 'Hypothèse de Naïve Bayes ?',
    o: [
      'Les classes sont équiprobables',
      'Les attributs sont indépendants (conditionnellement à la classe)',
      'Les attributs suivent une loi uniforme',
      'Il n’y a que deux classes'
    ],
    a: 1,
    e: 'P(x₁, …, xₖ | C) = P(x₁|C) × … × P(xₖ|C).'
  },
  {
    ch: 'classif',
    type: 'qcm',
    q: 'Exemple tennis du cours : P(X|p)·P(p) = 0,010582 et P(X|n)·P(n) = 0,018286. X est classé…',
    o: ['P (jouer)', 'N (ne pas jouer)', 'On ne peut pas conclure', 'Dans les deux classes'],
    a: 1,
    e: 'On prend la plus grande valeur : <b>N</b>.'
  },
  {
    ch: 'classif',
    type: 'qcm',
    q: 'Quelle variante de Naïve Bayes pour des attributs continus ?',
    o: ['Multinomial', 'Bernoulli', 'Gaussien', 'Aucune'],
    a: 2,
    e: 'Gaussien : loi normale. Multinomial : comptages. Bernoulli : binaires.'
  },
  {
    ch: 'classif',
    type: 'qcm',
    q: 'Qui a proposé ID3 et C4.5 ?',
    o: ['Agrawal', 'Quinlan', 'Breiman', 'MacQueen'],
    a: 1,
    e: 'Quinlan (ID3 1979, C4.5 amélioration d’ID3). Breiman = CART.'
  },
  {
    ch: 'classif',
    type: 'qcm',
    src: 'D2',
    q: 'Représenter A et (B ou C) en arbre de décision : quel attribut tester en premier ?',
    o: ['B', 'C', 'A', 'Peu importe'],
    a: 2,
    e: 'On teste <b>A</b> : s’il est faux, l’expression est fausse. Sinon on teste B (vrai → Vrai), sinon C décide.'
  },
  {
    ch: 'classif',
    type: 'qcm',
    q: 'Pour une variable quantitative X dans un arbre, le test prend la forme…',
    o: ['X ∈ {oui, non} ?', 'X < a ?', 'X = moyenne ?', 'Une branche par valeur possible'],
    a: 1,
    e: 'Le cours : variable quantitative → test « X &lt; a ? » à deux branches.'
  },
  {
    ch: 'classif',
    type: 'qcm',
    q: 'Cochez les applications de la classification citées dans le cours.',
    o: [
      'Diagnostic médical',
      'Accord de crédit',
      'Détection de fraudes fiscales',
      'Rangement des produits en rayon par co-achat'
    ],
    a: [0, 1, 2],
    e: 'Le rangement en rayon par co-achat relève des règles d’association.'
  },
  {
    ch: 'classif',
    type: 'qcm',
    q: 'Gain(A) = 0 signifie que…',
    o: [
      'A sépare parfaitement les classes',
      'A n’apporte aucune information pour la classification',
      'A doit être à la racine',
      'A a une seule valeur'
    ],
    a: 1,
    e: 'E(A) = I(p, n) : choisir A ne réduit pas le désordre. Exemple du cours : Gain(B) = 0.'
  },
  {
    ch: 'classif',
    type: 'qcm',
    q: 'L’entropie E(A) mesure…',
    o: [
      'le nombre de branches',
      'la quantité de désordre qui reste après le choix de A',
      'le nombre d’erreurs',
      'la confiance de la règle'
    ],
    a: 1,
    e: 'Plus E(A) est faible, plus A sépare bien les classes, plus le gain est grand.'
  },
  {
    ch: 'classif',
    type: 'qcm',
    q: 'Dans le devoir 3, la « précision » est définie comme « nombre de résultats corrects / nombre de résultats attendus ». Avec 2 bonnes prédictions sur 3 lignes de test, elle vaut…',
    o: ['100 %', '≈ 66,7 %', '33,3 %', '50 %'],
    a: 1,
    e: 'Suis la définition de l’énoncé : 2/3 ≈ <b>66,7 %</b> (c’est en fait l’accuracy).'
  },
  {
    ch: 'classif',
    type: 'qcm',
    q: 'k-NN classe un nouvel objet…',
    o: [
      'avec la classe majoritaire de ses k plus proches voisins',
      'avec la classe du centre de gravité le plus proche',
      'avec la règle de plus forte confiance',
      'au hasard parmi k classes'
    ],
    a: 0,
    e: 'Méthode supervisée basée sur les distances aux exemples étiquetés.'
  },

  {
    ch: 'classif',
    type: 'libre',
    src: 'D3',
    q: 'Expliquez le principe d’une classification supervisée et la différence avec une classification non supervisée.',
    r: '<p>Processus en <b>deux étapes</b> : (1) <b>construction d’un modèle</b> (arbre de décision, règles…) à partir d’un ensemble d’apprentissage dont la classe de chaque exemple est connue ; (2) <b>utilisation</b> : évaluation sur un ensemble de test (pourcentage de bien classés), puis prédiction de la classe de nouveaux objets.</p><p><b>Différence</b> : en classification non supervisée (clustering), les classes <b>ne sont pas connues</b> : elles sont découvertes à partir de la similarité entre objets.</p>',
    kw: ['deux etapes', 'modele', 'apprentissage', 'test', 'classe connue', 'clustering']
  },
  {
    ch: 'classif',
    type: 'libre',
    src: 'D2',
    q: 'Quels problèmes doit-on affronter si l’on veut implémenter une classification par arbres de décision ?',
    r: '<ul><li>Choisir le <b>critère de partitionnement</b> (gain d’information, Gini) pour sélectionner l’attribut à chaque nœud.</li><li><b>Discrétiser</b> les attributs continus.</li><li>Éviter le <b>surapprentissage</b> : critère d’arrêt, <b>élagage</b>.</li><li>Gérer les <b>valeurs manquantes et le bruit</b>.</li><li>Disposer de <b>données étiquetées</b> suffisantes et les partager en apprentissage / test.</li></ul>',
    kw: ['gain', 'discretiser', 'surapprentissage', 'elagage', 'manquantes', 'test']
  },
  {
    ch: 'classif',
    type: 'libre',
    src: 'D2',
    q: 'Représentez sous forme d’arbre de décision l’expression logique : A et (B ou C).',
    r: '<pre class="code">A ?\n├─ Faux → Faux\n└─ Vrai → B ?\n          ├─ Vrai → Vrai\n          └─ Faux → C ?\n                    ├─ Vrai → Vrai\n                    └─ Faux → Faux</pre><p>On teste A ; s’il est faux, l’expression est fausse. Sinon on teste B ; s’il est vrai, c’est vrai, sinon le résultat est celui de C.</p>',
    kw: ['a ?', 'faux', 'b ?', 'c ?', 'vrai']
  },
  {
    ch: 'classif',
    type: 'libre',
    q: 'Définissez nœud, branche et feuille d’un arbre de décision.',
    r: '<ul><li><b>Nœud</b> (interne) : un test effectué sur un attribut (ex. « Âge &gt; 30 ? ») ; le premier est la racine.</li><li><b>Branche</b> : un résultat possible du test (« oui », « non », une modalité).</li><li><b>Feuille</b> : nœud terminal qui indique la classe prédite (classe majoritaire).</li></ul>',
    kw: ['test', 'attribut', 'resultat', 'classe', 'racine']
  },
  {
    ch: 'classif',
    type: 'libre',
    q: 'Donnez les formules de I(p, n), E(A) et Gain(A) et le rôle de chacune.',
    r: '<div class="formula">I(p,n) = −p/(p+n)·log₂(p/(p+n)) − n/(p+n)·log₂(n/(p+n))\nE(A) = Σᵢ (pᵢ+nᵢ)/(p+n) · I(pᵢ,nᵢ)\nGain(A) = I(p,n) − E(A)</div><p><b>I</b> : information nécessaire pour décider si un élément est dans P ou N. <b>E(A)</b> : désordre restant après le choix de A. <b>Gain</b> : information gagnée ; on place au nœud l’attribut de gain maximal.</p>',
    kw: ['log', 'p/(p+n)', 'somme', 'desordre', 'gain', 'maximal']
  },
  {
    ch: 'classif',
    type: 'libre',
    q: 'Qu’est-ce que le surapprentissage et comment l’éviter ?',
    r: '<p>Lorsque l’arbre <b>colle trop</b> à l’ensemble d’apprentissage (aucune erreur), il risque de mal classer les nouveaux exemples : il généralise mal.</p><p>Remèdes : <b>autoriser des erreurs</b> sur l’apprentissage pour obtenir un arbre plus général, <b>élaguer</b>, utiliser un <b>ensemble de validation / test</b> (environ un tiers des exemples).</p>',
    kw: ['colle', 'apprentissage', 'generalis', 'elag', 'validation']
  },
  {
    ch: 'classif',
    type: 'libre',
    q: 'Décrivez la procédure générale d’apprentissage (5 étapes du cours).',
    r: '<ol><li>Collecter un grand ensemble d’exemples.</li><li>Les diviser en un ensemble d’entraînement et un ensemble de test.</li><li>Générer l’hypothèse h à partir de l’ensemble d’entraînement.</li><li>Mesurer le pourcentage d’exemples de test correctement classés par h.</li><li>Répéter pour différentes tailles d’entraînement et différents tirages aléatoires.</li></ol>',
    kw: ['collecte', 'entrainement', 'test', 'hypothese', 'pourcentage', 'repeter']
  },
  {
    ch: 'classif',
    type: 'libre',
    q: 'Expliquez le principe de la classification Naïve Bayes.',
    r: '<p>Méthode basée sur le <b>théorème de Bayes</b> : on affecte à X = &lt;x₁, …, xₖ&gt; la classe C qui maximise P(C | X), c’est-à-dire P(X | C)·P(C).</p><p>Hypothèse <b>naïve</b> : les attributs sont indépendants, donc P(X | C) = P(x₁|C) × … × P(xₖ|C). Chaque P(xᵢ|C) est estimée par la fréquence relative (attribut qualitatif) ou par une loi de Gauss (continu).</p>',
    kw: ['bayes', 'maximise', 'independance', 'produit', 'frequence']
  },
  {
    ch: 'classif',
    type: 'libre',
    q: 'Citez les métriques d’évaluation d’un modèle de classification et leurs formules.',
    r: '<ul><li><b>Accuracy</b> = (VP + VN) / total.</li><li><b>Précision</b> = VP / (VP + FP).</li><li><b>Rappel</b> = VP / (VP + FN).</li><li><b>F-mesure</b> = 2·P·R / (P + R).</li><li>Matrice de confusion : réel × prédit.</li></ul>',
    kw: ['accuracy', 'precision', 'rappel', 'f', 'vp']
  },
  {
    ch: 'classif',
    type: 'libre',
    q: 'Citez trois algorithmes d’arbres de décision et trois autres méthodes de classification.',
    r: '<p><b>Arbres</b> : ID3 (Quinlan, 1979), C4.5 (Quinlan, amélioration d’ID3), CART (Breiman et al., 1984). Extensions : bagging, boosting, forêts aléatoires.</p><p><b>Autres</b> : Naïve Bayes, k plus proches voisins (k-NN), SVM.</p>',
    kw: ['id3', 'c4.5', 'cart', 'bayes', 'k-nn', 'svm']
  },

  /* =================== PRÉPARATION DES DONNÉES =================== */
  {
    ch: 'prep',
    type: 'qcm',
    q: 'Les données brutes sont souvent de faible qualité. Cochez les trois défauts cités dans le cours.',
    o: ['Incomplètes', 'Bruitées', 'Incohérentes', 'Normalisées'],
    a: [0, 1, 2],
    e: 'Incomplètes (manquantes), bruitées (erronées, aberrantes), incohérentes (divergences entre attributs).'
  },
  {
    ch: 'prep',
    type: 'qcm',
    q: 'Une donnée est manquante de façon complètement aléatoire (MCAR) quand…',
    o: [
      'l’absence dépend d’une variable observée',
      'la probabilité d’absence est la même pour toutes les observations',
      'l’absence dépend de la valeur manquante elle-même',
      'il y a plus de 5 % de NA'
    ],
    a: 1,
    e: 'MCAR : p(M | X) = p(M). Exemple du dé.'
  },
  {
    ch: 'prep',
    type: 'qcm',
    q: 'Un participant répond moins à la question 2 selon sa réponse (enregistrée) à la question 1. C’est…',
    o: ['MCAR', 'MAR', 'MNAR', 'du bruit'],
    a: 1,
    e: 'L’absence dépend d’une <b>variable observée</b> : MAR.'
  },
  {
    ch: 'prep',
    type: 'qcm',
    q: 'Une réponse gênante à une question de sondage est souvent évitée. C’est…',
    o: ['MCAR', 'MAR', 'MNAR', 'un outlier'],
    a: 2,
    e: 'L’absence dépend de la valeur manquante elle-même : MNAR.'
  },
  {
    ch: 'prep',
    type: 'qcm',
    q: 'Supprimer les observations à données manquantes ne biaise pas les résultats si les données sont…',
    o: ['MCAR', 'MAR', 'MNAR', 'aberrantes'],
    a: 0,
    e: 'Si MCAR, on garde un échantillon aléatoire (mais on perd des données). Si MAR ou MNAR, la suppression biaise.'
  },
  {
    ch: 'prep',
    type: 'qcm',
    q: 'Selon le cours, quelle méthode de remplacement d’une valeur manquante est meilleure que la moyenne globale de l’attribut ?',
    o: [
      'Une constante « inconnue »',
      'La moyenne de l’attribut pour la même classe',
      'Supprimer l’attribut',
      'Remplacer par 0'
    ],
    a: 1,
    e: 'La moyenne calculée sur les exemples de la <b>même classe</b> est plus fidèle.'
  },
  {
    ch: 'prep',
    type: 'qcm',
    q: 'La méthode Hot Deck remplace une valeur manquante par…',
    o: [
      'la moyenne',
      'une valeur tirée au hasard parmi les valeurs observées du même attribut',
      'la valeur prédite par un arbre',
      'la médiane du groupe'
    ],
    a: 1,
    e: 'Tirage aléatoire parmi les autres observations du même attribut.'
  },
  {
    ch: 'prep',
    type: 'qcm',
    q: 'Pourquoi préférer la médiane à la moyenne pour imputer en présence de valeurs extrêmes ?',
    o: [
      'Elle est plus rapide',
      'Elle est plus robuste aux valeurs extrêmes',
      'Elle est toujours entière',
      'Elle est égale au mode'
    ],
    a: 1,
    e: 'La moyenne est tirée par les valeurs extrêmes.'
  },
  {
    ch: 'prep',
    type: 'qcm',
    q: 'Proportion de valeurs manquantes à partir de laquelle le cours dit qu’on peut « ne rien faire » ?',
    o: ['≤ 5 %', '≤ 20 %', '≤ 50 %', 'Jamais'],
    a: 0,
    e: '« Ne rien faire lorsque la proportion de NA de l’échantillon est faible (≤ 5 %). »'
  },
  {
    ch: 'prep',
    type: 'qcm',
    q: 'Données triées 4, 8, 9, 15 | 21, 21, 24, 25 | 26, 28, 29, 34 (équi-profondeur). Lissage par la moyenne du 1ᵉʳ bac ?',
    o: ['4, 4, 4, 15', '9, 9, 9, 9', '9, 8, 9, 15', '15, 15, 15, 15'],
    a: 1,
    e: '(4 + 8 + 9 + 15)/4 = 36/4 = <b>9</b>.'
  },
  {
    ch: 'prep',
    type: 'qcm',
    q: 'Même 1ᵉʳ bac (4, 8, 9, 15). Lissage par les bornes ?',
    o: ['4, 4, 4, 15', '4, 4, 15, 15', '9, 9, 9, 9', '4, 8, 9, 15'],
    a: 0,
    e: '8 et 9 sont plus proches de 4 que de 15 → <b>4, 4, 4, 15</b>.'
  },
  {
    ch: 'prep',
    type: 'qcm',
    q: 'Partitionnement en intervalles contenant le même nombre de valeurs : c’est…',
    o: ['l’équi-largeur', 'l’équi-profondeur', 'le z-score', 'la régression'],
    a: 1,
    e: 'Équi-profondeur = même effectif ; équi-largeur = même taille d’intervalle.'
  },
  {
    ch: 'prep',
    type: 'qcm',
    q: 'Min-max : valeurs 10, 20, 30, 50. Valeur normalisée de 30 ?',
    o: ['0,5', '0,6', '0,75', '0,3'],
    a: 0,
    e: '(30 − 10)/(50 − 10) = 20/40 = <b>0,5</b>.'
  },
  {
    ch: 'prep',
    type: 'qcm',
    q: 'Après une normalisation min-max, les valeurs sont dans…',
    o: ['[−1, 1]', '[0, 1]', '[0, 100]', 'ℝ'],
    a: 1,
    e: 'x′ = (x − min)/(max − min) ∈ [0, 1].'
  },
  {
    ch: 'prep',
    type: 'qcm',
    q: 'Avec la règle du box plot, une valeur est aberrante si…',
    o: ['elle dépasse la moyenne', 'x < Q1 − 1,5·IQR ou x > Q3 + 1,5·IQR', 'x > 2 × médiane', 'elle est manquante'],
    a: 1,
    e: 'IQR = Q3 − Q1, coefficient 1,5 en général.'
  },
  {
    ch: 'prep',
    type: 'qcm',
    q: 'Q1 = 20, Q3 = 40. À partir de quelle valeur une observation est-elle aberrante (côté haut) ?',
    o: ['> 40', '> 60', '> 70', '> 80'],
    a: 2,
    e: 'IQR = 20 ; Q3 + 1,5 × 20 = 40 + 30 = <b>70</b>.'
  },
  {
    ch: 'prep',
    type: 'qcm',
    q: 'Lors de l’intégration de sources, num_client et client_id désignent la même donnée. C’est un problème de…',
    o: ['bruit', 'nommage (intégration des schémas)', 'discrétisation', 'MNAR'],
    a: 1,
    e: 'Identifier les différents noms des mêmes données réelles.'
  },
  {
    ch: 'prep',
    type: 'qcm',
    q: 'Comment détecter la redondance entre attributs lors de l’intégration ?',
    o: ['Par une analyse de corrélation', 'Par un dendrogramme', 'Par Apriori', 'Par un z-score'],
    a: 0,
    e: 'Un attribut peut être déduit d’un autre ; la corrélation le révèle.'
  },
  {
    ch: 'prep',
    type: 'qcm',
    q: 'Cochez les étapes de la préparation des données selon le cours.',
    o: ['Nettoyage', 'Intégration', 'Transformation', 'Réduction', 'Discrétisation', 'Classification'],
    a: [0, 1, 2, 3, 4],
    e: 'La classification est une technique de fouille, pas une étape de préparation.'
  },
  {
    ch: 'prep',
    type: 'qcm',
    q: 'Une incohérence (critère de cohérence de la sélection d’attributs) survient quand…',
    o: [
      'un attribut est manquant',
      'deux exemples ont la même description mais des classes différentes',
      'deux attributs sont corrélés',
      'une valeur est aberrante'
    ],
    a: 1,
    e: 'On cherche un sous-ensemble minimal d’attributs qui maintient la cohérence.'
  },
  {
    ch: 'prep',
    type: 'qcm',
    q: 'Quel critère de sélection d’attributs reprend le gain d’information des arbres ?',
    o: ['Mesures d’information', 'Mesures de distance', 'Critère de cohérence', 'Mesures de précision'],
    a: 0,
    e: 'On sélectionne les attributs de gain d’information élevé.'
  },
  {
    ch: 'prep',
    type: 'qcm',
    q: 'Pourquoi discrétiser un attribut continu ?',
    o: [
      'Certains algorithmes n’acceptent que des attributs catégoriques et cela réduit le volume',
      'Pour augmenter le nombre de valeurs',
      'Pour créer des valeurs manquantes',
      'Pour calculer la confiance'
    ],
    a: 0,
    e: 'Diviser l’intervalle en sous-intervalles : moins de valeurs, préparation à d’autres analyses.'
  },
  {
    ch: 'prep',
    type: 'qcm',
    q: 'Les outliers sont détectés en s’appuyant sur deux propriétés. Lesquelles ?',
    o: [
      'Ils sont fréquents et proches',
      'Leur comportement est très différent et ils sont rares',
      'Ils sont toujours négatifs',
      'Ils sont manquants'
    ],
    a: 1,
    e: 'Comportement très différent des autres et rareté.'
  },
  {
    ch: 'prep',
    type: 'qcm',
    q: 'Les méthodes de détection d’outliers « basées sur la proximité » regroupent…',
    o: [
      'les plus proches voisins et le clustering',
      'le box plot et l’IQR',
      'Apriori et FP-Growth',
      'le min-max et le z-score'
    ],
    a: 0,
    e: 'Plus proches voisins (approches distance et densité) et clustering (le cluster le plus éloigné ou le moins peuplé).'
  },

  {
    ch: 'prep',
    type: 'libre',
    src: 'TD',
    q: 'Les étapes préalables à la préparation des données sont la compréhension du domaine et la compréhension des données. Donnez l’objectif de ces étapes.',
    r: '<p><b>Compréhension du domaine</b> : comprendre les <b>besoins des utilisateurs</b> et les <b>objectifs</b>.</p><p><b>Compréhension des données</b> : identifier les <b>données et variables pertinentes</b> et leur signification ; analyser les variables et leurs interdépendances (min/max, moyenne, variance, corrélations) ; caractériser leur <b>type</b> (quantitatives, qualitatives).</p>',
    kw: ['besoins', 'objectifs', 'pertinentes', 'signification', 'correlations', 'type']
  },
  {
    ch: 'prep',
    type: 'libre',
    src: 'TD',
    q: 'On vous donne un jeu de données brutes pour un algorithme d’apprentissage. Quelles sont les principales fonctionnalités de votre algorithme de préparation ?',
    r: '<ul><li>Identifier et traiter les <b>données manquantes</b> par remplacement.</li><li>Identifier les <b>données aberrantes</b> et éliminer le <b>bruit</b> (lissage, clustering hiérarchique, régression).</li><li>Identifier les données <b>redondantes</b> (analyse de corrélation).</li><li><b>Résumer</b> les données à différents niveaux de granularité.</li><li><b>Normaliser</b> les données.</li><li><b>Réduire</b> les données (sélection d’attributs).</li></ul>',
    kw: ['manquantes', 'aberrantes', 'bruit', 'redondantes', 'normaliser', 'reduire']
  },
  {
    ch: 'prep',
    type: 'libre',
    src: 'TD',
    q: 'On distingue trois catégories de données manquantes. Citez-les et expliquez-les.',
    r: '<ul><li><b>MCAR</b> (Missing Completely At Random) : probabilité d’absence identique pour toutes les observations ; p(M|X) = p(M).</li><li><b>MAR</b> (Missing At Random) : l’absence dépend de variables observées ; p(M|X) = p(M|Xo).</li><li><b>MNAR</b> (Missing Not At Random) : l’absence dépend de variables non observées ou de la valeur manquante elle-même.</li></ul>',
    kw: ['mcar', 'mar', 'mnar', 'aleatoire', 'observees']
  },
  {
    ch: 'prep',
    type: 'libre',
    src: 'TD',
    q: 'Qu’est-ce qu’une donnée aberrante (outlier) ? Citez au moins une méthode pour la traiter.',
    r: '<p>Une valeur <b>extrême</b>, anormalement différente de la distribution de la variable (ex. un salaire de 1 000 000 quand les salaires vont de 160 000 à 300 000).</p><p>Méthodes : <b>box plot</b> (outlier si x &lt; Q1 − 1,5·IQR ou x &gt; Q3 + 1,5·IQR) ; méthodes de <b>proximité</b> (plus proches voisins, clustering) ; puis suppression, lissage ou remplacement.</p>',
    kw: ['extreme', 'distribution', 'box plot', 'iqr', 'voisins', 'clustering']
  },
  {
    ch: 'prep',
    type: 'libre',
    q: 'Citez les méthodes de correction des données manquantes données dans le cours.',
    r: '<ul><li>Ignorer le tuple (peu efficace si beaucoup de NA).</li><li>Compléter manuellement (laborieux).</li><li>Utiliser une constante globale (« inconnue »).</li><li>Utiliser la moyenne de l’attribut.</li><li>Utiliser la moyenne de l’attribut pour la même classe (mieux).</li><li>Utiliser la valeur la plus probable (Bayes, arbre de décision).</li><li>Imputation : valeur unique, centre du groupe, valeur prédite, Hot Deck.</li></ul>',
    kw: ['ignorer', 'manuellement', 'constante', 'moyenne', 'meme classe', 'probable']
  },
  {
    ch: 'prep',
    type: 'libre',
    q: 'Qu’est-ce que la normalisation ? Donnez les formules min-max et z-score.',
    r: '<p>Modifier les valeurs des colonnes numériques pour utiliser une <b>échelle commune</b>, sans fausser les écarts ni perdre d’information.</p><div class="formula">Min-max : x′ = (x − min) / (max − min) ∈ [0, 1]\nZ-score : z = (x − m) / s   (cours : s = écart absolu moyen)</div>',
    kw: ['echelle commune', 'min', 'max', 'z', 'moyenne']
  },
  {
    ch: 'prep',
    type: 'libre',
    q: 'Quelles sont les causes et les méthodes de correction du bruit ?',
    r: '<p><b>Causes</b> : instrument de mesure défectueux, problème de saisie, de transmission, limitation technologique, incohérence des conventions de nommage.</p><p><b>Correction</b> : partitionnement (trier, découper en bacs, lisser par la moyenne, la médiane ou les bornes) ; clustering (supprimer les exceptions) ; inspection humaine et informatique ; régression.</p>',
    kw: ['instrument', 'saisie', 'transmission', 'partitionnement', 'lissage', 'regression']
  },
  {
    ch: 'prep',
    type: 'libre',
    q: 'En quoi consiste la réduction des données et quelles stratégies existent ?',
    r: '<p>Obtenir une représentation <b>plus petite en volume</b> qui produit (presque) les mêmes résultats analytiques.</p><p>Stratégies : agrégation par cubes de données, réduction de dimension (<b>sélection d’attributs</b>), réduction de numérosité, discrétisation et hiérarchies de concepts.</p>',
    kw: ['plus petite', 'memes resultats', 'cubes', 'dimension', 'selection', 'discretisation']
  },

  /* =================== CODE PYTHON =================== */
  {
    ch: 'code',
    type: 'qcm',
    src: 'D3',
    q: 'Que fait clf = tree.DecisionTreeClassifier() ?',
    o: [
      'Entraîne un arbre',
      'Crée un classifieur de type arbre de décision, non encore entraîné',
      'Prédit les classes',
      'Affiche l’arbre'
    ],
    a: 1,
    e: 'L’entraînement se fait ensuite avec clf.fit(X_train, Y_train).'
  },
  {
    ch: 'code',
    type: 'qcm',
    src: 'D3',
    q: 'Dans train_test_split(X, y, test_size=0.2, random_state=seed), à quoi sert random_state ?',
    o: [
      'À fixer la taille du test',
      'À rendre le découpage aléatoire reproductible',
      'À mélanger les colonnes',
      'À choisir l’algorithme'
    ],
    a: 1,
    e: 'Même graine → même découpage à chaque exécution. test_size = proportion de test.'
  },
  {
    ch: 'code',
    type: 'qcm',
    src: 'D3',
    q: 'Que fait clf.fit(X_train, Y_train) ?',
    o: [
      'Prédit les classes de X_train',
      'Construit (entraîne) l’arbre sur les données d’apprentissage',
      'Calcule l’accuracy',
      'Sauvegarde le modèle'
    ],
    a: 1,
    e: 'fit = apprentissage ; predict = prédiction.'
  },
  {
    ch: 'code',
    type: 'qcm',
    src: 'D3',
    q: 'print(accuracy_score(Y_test, predictions)) affiche…',
    o: [
      'le rappel',
      'la proportion de prédictions correctes sur l’ensemble de test',
      'le nombre de nœuds',
      'la matrice de confusion'
    ],
    a: 1,
    e: 'Accuracy = bonnes prédictions / total.'
  },
  {
    ch: 'code',
    type: 'qcm',
    src: 'D1',
    q: 'Quelle instruction sauvegarde le modèle sous le nom modelISIE.pkl ?',
    o: [
      "joblib.load(clf, 'modelISIE.pkl')",
      "joblib.dump(clf, 'modelISIE.pkl')",
      "clf.save('modelISIE.pkl')",
      "pd.to_pickle('modelISIE.pkl')"
    ],
    a: 1,
    e: "dump = sauvegarder ; load = recharger : model = joblib.load('modelISIE.pkl')."
  },
  {
    ch: 'code',
    type: 'qcm',
    src: 'D2',
    q: "Ligne : Z = linkage(fromage, method='single', metric='euclidean'). Quelle distance et quel critère ?",
    o: ['Manhattan, saut maximal', 'Euclidienne, saut minimal', 'Euclidienne, Ward', 'Jaccard, moyenne'],
    a: 1,
    e: "metric = 'euclidean' ; method = 'single' = saut minimal."
  },
  {
    ch: 'code',
    type: 'qcm',
    src: 'D2',
    q: 'Ligne : kmeans = cluster.KMeans(n_clusters=4). Rôle ?',
    o: [
      'Entraîne K-means',
      'Crée un modèle K-means chargé de former 4 clusters',
      'Affiche 4 clusters',
      'Coupe le dendrogramme en 4'
    ],
    a: 1,
    e: 'L’apprentissage se fait avec kmeans.fit(fromage).'
  },
  {
    ch: 'code',
    type: 'qcm',
    src: 'D2',
    q: 'Ligne : fromage = pandas.read_table("fromage.txt", sep="\\t", header=0, index_col=0). Rôle ?',
    o: [
      'Crée un fichier',
      'Charge le fichier dans un DataFrame : séparateur tabulation, 1ʳᵉ ligne = noms des variables, 1ʳᵉ colonne = index (noms des fromages)',
      'Affiche le fichier',
      'Normalise les données'
    ],
    a: 1,
    e: 'header=0 : la ligne 0 contient les noms ; index_col=0 : la colonne 0 sert d’index.'
  },
  {
    ch: 'code',
    type: 'qcm',
    src: 'D2',
    q: 'Ligne : dendrogram(Z, labels=fromage.index, color_threshold=7). Rôle ?',
    o: [
      'Calcule les clusters',
      'Trace le dendrogramme avec les noms des fromages, en colorant les groupes sous la hauteur 7',
      'Coupe en 7 clusters',
      'Supprime 7 points'
    ],
    a: 1,
    e: 'color_threshold colore les branches situées sous la hauteur 7.'
  },
  {
    ch: 'code',
    type: 'qcm',
    q: "fcluster(Z, t=7, criterion='distance') sert à…",
    o: [
      'tracer le dendrogramme',
      'découper la CAH en groupes en coupant à la hauteur 7',
      'calculer 7 centres',
      'normaliser'
    ],
    a: 1,
    e: 'On obtient un numéro de groupe par objet.'
  },
  {
    ch: 'code',
    type: 'qcm',
    src: 'D2',
    q: 'Lignes : idk = np.argsort(kmeans.labels_) ; print(pandas.DataFrame(fromage.index[idk], kmeans.labels_[idk])). Rôle ?',
    o: [
      'Affiche chaque fromage avec son numéro de cluster, triés par cluster',
      'Trie les fromages par calories',
      'Supprime les doublons',
      'Calcule les centres'
    ],
    a: 0,
    e: 'argsort donne l’ordre qui trie les objets par label de cluster.'
  },
  {
    ch: 'code',
    type: 'qcm',
    q: 'Quel scaler résiste le mieux aux valeurs aberrantes ?',
    o: ['MinMaxScaler', 'StandardScaler', 'RobustScaler', 'LabelEncoder'],
    a: 2,
    e: 'RobustScaler utilise la médiane et l’écart interquartile.'
  },
  {
    ch: 'code',
    type: 'qcm',
    q: 'Quelle instruction impute les valeurs manquantes par la moyenne ?',
    o: [
      "SimpleImputer(missing_values=np.nan, strategy='mean')",
      'df.dropna(axis=1)',
      'LabelBinarizer()',
      'MinMaxScaler()'
    ],
    a: 0,
    e: 'dropna supprime les lignes (axis=0) ou colonnes (axis=1) qui contiennent des NA.'
  },
  {
    ch: 'code',
    type: 'qcm',
    q: 'Quel est l’ordre logique des instructions d’un programme de classification ?',
    o: [
      'fit → train_test_split → read_csv → predict',
      'read_csv → train_test_split → DecisionTreeClassifier → fit → predict → accuracy_score → joblib.dump',
      'joblib.load → fit → read_csv',
      'predict → fit → read_csv'
    ],
    a: 1,
    e: 'Charger, découper, créer, entraîner, prédire, évaluer, sauvegarder.'
  },
  {
    ch: 'code',
    type: 'qcm',
    q: 'À quoi sert stratify=y dans train_test_split (TP classification) ?',
    o: [
      'À trier les données',
      'À conserver approximativement la proportion des classes dans l’apprentissage et le test',
      'À supprimer une classe',
      'À fixer la graine'
    ],
    a: 1,
    e: 'Utile quand les classes sont déséquilibrées.'
  },
  {
    ch: 'code',
    type: 'qcm',
    q: 'Dans mlxtend, à quoi sert TransactionEncoder ?',
    o: [
      'À calculer les règles',
      'À transformer les transactions en tableau one-hot (True/False)',
      'À sauvegarder les règles',
      'À calculer le lift'
    ],
    a: 1,
    e: 'apriori de mlxtend attend un DataFrame binaire.'
  },

  {
    ch: 'code',
    type: 'libre',
    src: 'D1',
    q: 'Écrivez un programme Python qui : (1) charge dataset.csv ; (2) construit un arbre de décision ; (3) l’évalue (accuracy, précision, rappel) ; (4) le sauvegarde sous modelISIE.pkl ; (5) l’utilise sur un jeu Xt.',
    r: '<pre class="code">import pandas as pd\nfrom sklearn.tree import DecisionTreeClassifier\nfrom sklearn.model_selection import train_test_split\nfrom sklearn import metrics\nimport joblib\n\ndata = pd.read_csv("dataset.csv")                       # (1)\nX = data.drop(columns="label"); y = data.label\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=1)\nclf = DecisionTreeClassifier()                          # (2)\nclf = clf.fit(X_train, y_train)\ny_pred = clf.predict(X_test)\nprint("Accuracy:", metrics.accuracy_score(y_test, y_pred))   # (3)\nprint("Precision:", metrics.precision_score(y_test, y_pred))\nprint("Rappel:", metrics.recall_score(y_test, y_pred))\njoblib.dump(clf, \'modelISIE.pkl\')                      # (4)\nmodel = joblib.load(\'modelISIE.pkl\')                   # (5)\nprint(model.predict(Xt))</pre>',
    kw: [
      'read_csv',
      'train_test_split',
      'decisiontreeclassifier',
      'fit',
      'predict',
      'accuracy_score',
      'precision_score',
      'recall_score',
      'joblib.dump',
      'joblib.load'
    ]
  },
  {
    ch: 'code',
    type: 'libre',
    src: 'D2',
    q: 'Proposez le code qui forme 3 clusters avec K-means sur le DataFrame fromage et affiche chaque fromage avec son cluster.',
    r: '<pre class="code">from sklearn import cluster\nimport numpy as np\nkmeans3 = cluster.KMeans(n_clusters=3, n_init=10, random_state=0)\nkmeans3.fit(fromage)\nidk = np.argsort(kmeans3.labels_)\nprint(pandas.DataFrame(fromage.index[idk], kmeans3.labels_[idk]))\nprint(kmeans3.cluster_centers_)</pre>',
    kw: ['kmeans', 'n_clusters=3', 'fit', 'labels_', 'argsort']
  },
  {
    ch: 'code',
    type: 'libre',
    src: 'D3',
    q: 'Expliquez chaque ligne : 1. clf = tree.DecisionTreeClassifier() 2. X_train, X_test, Y_train, Y_test = model_selection.train_test_split(X, y, test_size=test_size, random_state=seed) 3. clf.fit(X_train, Y_train) 4. predictions = clf.predict(X_test) 5. print(accuracy_score(Y_test, predictions))',
    r: '<ol><li>Crée un classifieur arbre de décision (non encore entraîné).</li><li>Partage aléatoirement (X, y) en apprentissage et test ; test_size = proportion de test ; random_state = graine pour un découpage reproductible.</li><li>Entraîne (construit) l’arbre sur les données d’apprentissage.</li><li>Prédit la classe des exemples de test.</li><li>Affiche l’accuracy : proportion de prédictions correctes par rapport aux vraies classes Y_test.</li></ol>',
    kw: ['cree', 'partage', 'reproductible', 'entraine', 'predit', 'proportion']
  },
  {
    ch: 'code',
    type: 'libre',
    q: 'Écrivez les instructions qui normalisent les colonnes numériques d’un DataFrame df avec la méthode min-max, puis z-score.',
    r: "<pre class=\"code\">from sklearn.preprocessing import MinMaxScaler, StandardScaler\ncols = df.select_dtypes(include=['int', 'float']).columns\ndf[cols] = MinMaxScaler().fit_transform(df[cols])    # min-max dans [0, 1]\n# ou\ndf[cols] = StandardScaler().fit_transform(df[cols])  # z-score</pre>",
    kw: ['minmaxscaler', 'standardscaler', 'fit_transform', 'select_dtypes']
  },
  {
    ch: 'code',
    type: 'libre',
    q: 'Écrivez une fonction Python qui impute les valeurs manquantes d’une colonne par la moyenne.',
    r: '<pre class="code">import numpy as np\nfrom sklearn.impute import SimpleImputer\n\ndef imputer_moyenne(df, col):\n    imp = SimpleImputer(missing_values=np.nan, strategy=\'mean\')\n    df[[col]] = imp.fit_transform(df[[col]])\n    return df\n# variante pandas : df[col] = df[col].fillna(df[col].mean())</pre>',
    kw: ['simpleimputer', 'mean', 'fit_transform', 'fillna']
  }
];
/* L'identifiant est la position : la progression enregistrée y est liée. Ajouter en fin de tableau, ne pas réordonner. */
QUESTIONS.forEach((q, i) => {
  q.id = 'q' + i;
});
