/* Fiches : t = terme, d = définition courte à retenir, m = moyen mnémotechnique, hc = hors cours */
const CARDS = [
  /* ---------- INTRO ---------- */
  {
    ch: 'intro',
    t: 'Fouille de données (data mining)',
    d: 'Extraction d’informations <b>intéressantes, non triviales, implicites, préalablement inconnues et potentiellement utiles</b> à partir de grandes quantités de données.',
    m: '4 adjectifs : non triviales · implicites · inconnues · utiles.'
  },
  {
    ch: 'intro',
    t: 'Data mining (2ᵉ définition du cours)',
    d: 'Ensemble d’algorithmes et de méthodes destinés à l’exploration et l’analyse de grandes quantités de données, <b>sans a priori</b>, pour détecter des règles, tendances ou structures cachées, en vue de <b>l’aide à la décision</b>.'
  },
  {
    ch: 'intro',
    t: 'Ce qui n’est PAS de la fouille',
    d: 'L’<b>analyse par requêtes</b> (SQL), les <b>bases de données déductives</b> et les <b>systèmes experts</b>. Une requête retrouve ce qu’on demande ; la fouille découvre ce qu’on ignorait.'
  },
  {
    ch: 'intro',
    t: 'ECD / KDD',
    d: 'Extraction de Connaissances à partir de Données : processus qui transforme des <b>données brutes en connaissances</b>, sous le contrôle d’un <b>expert du domaine</b>. La fouille n’en est qu’une étape.'
  },
  {
    ch: 'intro',
    t: 'Étapes du processus ECD',
    d: 'Données brutes → <b>Sélection</b> → <b>Prétraitement</b> (nettoyage) → <b>Transformation</b> → <b>Fouille</b> → <b>Interprétation / Évaluation</b> → Connaissances.',
    m: '« Si Pierre Trouve, Félicitez-le Immédiatement » : S-P-T-F-I.'
  },
  {
    ch: 'intro',
    t: 'Poids du prétraitement',
    d: 'Le nettoyage et le prétraitement des données peuvent représenter <b>60 % de l’effort</b> du processus ECD.'
  },
  {
    ch: 'intro',
    t: 'Apprentissage automatique',
    d: 'Programmer des algorithmes qui <b>apprennent automatiquement à partir de données et d’expériences passées</b> pour résoudre au mieux un problème dont on ne connaît pas de solution exacte.'
  },
  {
    ch: 'intro',
    t: 'Disciplines de l’AA',
    d: '<b>Statistiques</b> (inférence de modèles), <b>probabilités</b> (aléa), <b>intelligence artificielle</b> (reconnaissance de formes), <b>optimisation</b> (critère de performance), <b>informatique</b> (algorithmes).'
  },
  {
    ch: 'intro',
    t: 'Apprentissage supervisé',
    d: 'On dispose d’objets <b>avec une valeur cible</b> ; on apprend un modèle capable de <b>prédire la valeur cible d’un objet nouveau</b>. Ex. : classification, régression.'
  },
  {
    ch: 'intro',
    t: 'Apprentissage non supervisé',
    d: 'On dispose d’objets <b>sans valeur cible</b> ; on apprend un modèle qui <b>extrait les régularités</b> ou la structure des données. Ex. : clustering, règles d’association.'
  },
  {
    ch: 'intro',
    t: 'Apprentissage par renforcement',
    d: 'Séquences de décisions dans un environnement dynamique, avec une <b>récompense</b> pour chaque action ; on apprend à prédire la meilleure décision dans un état donné.'
  },
  {
    ch: 'intro',
    t: 'Apprentissage semi-supervisé',
    d: 'Un <b>petit</b> ensemble d’objets étiquetés et un <b>grand</b> ensemble non étiqueté ; on tire profit des deux.'
  },
  {
    ch: 'intro',
    t: 'Apprentissage actif',
    d: 'Peu d’objets étiquetés ; le système <b>interagit avec l’utilisateur</b> et lui demande la valeur cible de nouveaux objets.'
  },
  {
    ch: 'intro',
    t: 'Apprentissage par transfert',
    d: 'Réutiliser des connaissances et compétences apprises sur des <b>tâches antérieures</b> pour de nouvelles tâches ou domaines similaires.'
  },
  {
    ch: 'intro',
    t: 'Classification (objectif)',
    d: 'Prédire la <b>classe</b> d’un nouvel objet à partir d’exemples dont la classe est connue. <b>Supervisé</b>. Ex. : arbre de décision (ID3, C4.5).'
  },
  {
    ch: 'intro',
    t: 'Régression (objectif)',
    d: 'Prédire une <b>valeur numérique</b> (ex. : un prix). <b>Supervisé</b>. Ex. : régression linéaire.'
  },
  {
    ch: 'intro',
    t: 'Clustering (objectif)',
    d: 'Regrouper des objets <b>non étiquetés</b> en clusters homogènes. <b>Non supervisé</b>. Ex. : K-means, CAH, DBSCAN.'
  },
  {
    ch: 'intro',
    t: 'Règles d’association (objectif)',
    d: 'Trouver les items qui apparaissent <b>fréquemment ensemble</b> et en déduire des règles X → Y. <b>Non supervisé</b>. Ex. : Apriori.'
  },
  {
    ch: 'intro',
    t: 'Analyse des outliers',
    d: 'Détecter un objet qui <b>se distingue du comportement général</b> des données (bruit ou exception). Utile pour la <b>détection de fraudes</b> et d’événements rares.'
  },
  { ch: 'intro', t: 'Big data : les 4 V', d: '<b>Volume, Variété, Vélocité, Véracité</b>.' },
  {
    ch: 'intro',
    t: 'Science des données',
    d: 'Approche pluridisciplinaire pour extraire des connaissances à partir de <b>données hétérogènes</b>.'
  },

  /* ---------- RÈGLES D'ASSOCIATION ---------- */
  {
    ch: 'assoc',
    t: 'Règle d’association',
    d: 'Motif de la forme <b>Corps → Tête</b> (X → Y) qui exprime que la présence de X dans une transaction est associée à la présence de Y. Ex. : Lait → Sucre. Concept introduit par <b>Agrawal et al. (1993)</b>.'
  },
  {
    ch: 'assoc',
    t: 'Item, itemset, k-itemset',
    d: '<b>Item</b> : un article. <b>Itemset</b> : un ensemble d’items. <b>k-itemset</b> : itemset de k items (sa longueur).'
  },
  {
    ch: 'assoc',
    t: 'Transaction',
    d: 'Sous-ensemble d’items avec un identifiant (ex. : un ticket de caisse). La base D est l’ensemble des transactions.'
  },
  {
    ch: 'assoc',
    t: 'Support',
    d: 'sup(X → Y) = <b>P(X ∪ Y)</b> = proportion des transactions qui contiennent <b>à la fois X et Y</b>.',
    m: 'Support = « combien de fois on voit tout le panier ».'
  },
  {
    ch: 'assoc',
    t: 'Confiance',
    d: 'conf(X → Y) = <b>sup(X ∪ Y) / sup(X)</b> = P(Y | X) : proportion des transactions contenant X qui contiennent aussi Y.',
    m: 'Le dénominateur est toujours le support de la PARTIE GAUCHE.'
  },
  { ch: 'assoc', t: 'Itemset fréquent', d: 'Itemset dont le <b>support ≥ minsup</b>.' },
  {
    ch: 'assoc',
    t: 'Règle intéressante (valide)',
    d: 'Règle telle que <b>sup(X ∪ Y) ≥ minsup ET conf(X → Y) ≥ minconf</b>. Les deux seuils sont fixés a priori par l’utilisateur.'
  },
  {
    ch: 'assoc',
    t: 'Antimonotonie',
    d: 'Si X ⊆ Y alors sup(X) ≥ sup(Y). Donc <b>tout sous-ensemble d’un itemset fréquent est fréquent</b> et <b>tout sur-ensemble d’un itemset non fréquent est non fréquent</b>.'
  },
  {
    ch: 'assoc',
    t: 'Algorithme Apriori',
    d: 'Algorithme d’<b>Agrawal (1994)</b> en 2 phases : (1) calculer tous les itemsets fréquents niveau par niveau (L1, L2, …) ; (2) générer les règles et garder celles de confiance ≥ minconf.'
  },
  {
    ch: 'assoc',
    t: 'Jointure (génération des candidats)',
    d: 'C(k) = union de deux itemsets de L(k−1) qui ont <b>k−2 éléments en commun</b> (les mêmes premiers éléments). Se fait en mémoire, sans lire les données.'
  },
  {
    ch: 'assoc',
    t: 'Élagage',
    d: 'Supprimer de C(k) tout candidat dont <b>un sous-ensemble de taille k−1 n’est pas dans L(k−1)</b> (application de l’antimonotonie).'
  },
  {
    ch: 'assoc',
    t: 'Évaluation des candidats',
    d: 'Compter le support de chaque candidat en <b>une seule passe</b> sur les données ; L(k) = candidats de support ≥ minsup.'
  },
  {
    ch: 'assoc',
    t: 'Génération des règles',
    d: 'Pour chaque itemset fréquent X et chaque sous-ensemble non vide A ⊂ X : règle <b>A → X − A</b>, retenue si conf ≥ minconf. <b>Aucun accès aux données</b> n’est nécessaire.'
  },
  { ch: 'assoc', t: 'Phase la plus coûteuse d’Apriori', d: 'Le <b>calcul des itemsets fréquents</b> (phase 1).' },
  {
    ch: 'assoc',
    t: 'Problèmes d’Apriori',
    d: '<b>Trop de candidats</b> (10⁴ 1-itemsets → 10⁷ candidats de taille 2 ; 2¹⁰⁰ ≈ 10³⁰ pour un 100-itemset) et <b>plusieurs passages</b> sur la base (n + 1 passages pour les n-itemsets).'
  },
  {
    ch: 'assoc',
    t: 'Itemset maximal',
    d: 'Itemset fréquent dont <b>aucun sur-ensemble (immédiat) n’est fréquent</b>.'
  },
  {
    ch: 'assoc',
    t: 'Itemset fermé',
    d: 'Itemset dont <b>aucun sur-ensemble n’a le même support</b> : tous ses sur-ensembles ont un support strictement plus faible.'
  },
  {
    ch: 'assoc',
    t: 'Itemset générateur',
    d: 'Itemset dont <b>tous les sous-itemsets ont un support strictement supérieur</b>.'
  },
  {
    ch: 'assoc',
    t: 'Superset',
    d: 'Itemset défini par rapport à un autre qui le contient : {a, b, c} est un superset de {a, b}.'
  },
  {
    ch: 'assoc',
    t: 'Optimiser Apriori',
    d: 'Réduire le nombre de fréquents générés : ne chercher qu’une partie (les <b>maximaux</b> ou les <b>fermés</b>) et en déduire les autres.'
  },
  {
    ch: 'assoc',
    t: 'Autres algorithmes',
    d: 'AprioriTID, <b>FP-Growth</b>, <b>Eclat</b>, dEclat, Relim, H-Mine… Pour les fermés : Close (AprioriClose), Charm, FPClose, LCM.'
  },
  {
    ch: 'assoc',
    t: 'Applications',
    d: 'Rayonnage et mailing (supermarché), <b>médecine</b> (corrélations entre symptômes), puces à ADN (gènes co-exprimés), profils d’utilisateurs sur un site web, <b>fouille de textes</b>.'
  },
  {
    ch: 'assoc',
    t: 'Co-occurrence ≠ causalité',
    d: 'Une règle (même à 100 % de confiance) exprime que des items <b>apparaissent ensemble</b>, pas que l’un <b>cause</b> l’autre.'
  },
  {
    ch: 'assoc',
    t: 'Lift',
    hc: true,
    d: 'lift(X → Y) = conf(X → Y) / sup(Y). <b>&gt; 1</b> : association positive ; <b>= 1</b> : aucun lien ; <b>&lt; 1</b> : association négative. Vu en TP, pas dans les diapos.'
  },
  {
    ch: 'assoc',
    t: 'Classification associative',
    d: 'Utiliser les règles dont la <b>conclusion est une classe</b> (ex. : Finance → Economie) pour prédire la classe d’un nouveau texte : on applique la règle de plus forte confiance.'
  },

  /* ---------- CLUSTERING ---------- */
  {
    ch: 'clust',
    t: 'Clustering',
    d: '<b>Classification non supervisée</b> : organiser un ensemble d’objets en clusters tels que la similarité <b>intra-cluster soit forte</b> et la similarité <b>inter-cluster faible</b>. Les classes ne sont pas prédéfinies.'
  },
  {
    ch: 'clust',
    t: 'Qualités d’un bon clustering',
    d: 'Grande similarité <b>intra-groupe</b>, faible similarité <b>inter-groupe</b>. Elle dépend de la <b>mesure de similarité</b> et de son <b>implémentation</b>, et se juge à la capacité à découvrir des <b>patterns cachés</b>.'
  },
  {
    ch: 'clust',
    t: 'Applications du clustering',
    d: '<b>Marketing</b> (segmenter les clients), <b>environnement</b> (zones terrestres similaires), <b>assurance</b> (groupes d’assurés à forts sinistres), <b>urbanisme</b> (groupes d’habitations), <b>médecine</b> (localiser une tumeur dans le cerveau).'
  },
  {
    ch: 'clust',
    t: 'Métrique de similarité',
    d: 'La similarité s’exprime par une <b>mesure de distance</b> : plus la distance est petite, plus les objets se ressemblent. Ex. : distance euclidienne.'
  },
  {
    ch: 'clust',
    t: 'Matrice de données / de proximité',
    d: '<b>Données</b> : individus × variables (n × p). <b>Proximité</b> : individus × individus, contient les distances d(i, j) ; triangulaire, diagonale nulle.'
  },
  {
    ch: 'clust',
    t: 'Distance de Minkowski',
    d: 'd(i, j) = ( |xᵢ₁ − xⱼ₁|^q + … + |xᵢₚ − xⱼₚ|^q )^(1/q), q entier positif.'
  },
  {
    ch: 'clust',
    t: 'Distance de Manhattan',
    d: 'Minkowski avec <b>q = 1</b> : d(i, j) = |xᵢ₁ − xⱼ₁| + … + |xᵢₚ − xⱼₚ|.'
  },
  {
    ch: 'clust',
    t: 'Distance euclidienne',
    d: 'Minkowski avec <b>q = 2</b> : d(i, j) = √( (xᵢ₁ − xⱼ₁)² + … + (xᵢₚ − xⱼₚ)² ).'
  },
  {
    ch: 'clust',
    t: 'Propriétés d’une distance',
    d: 'd(i, j) ≥ 0 ; d(i, i) = 0 ; d(i, j) = d(j, i) ; d(i, j) ≤ d(i, k) + d(k, j) (inégalité triangulaire).'
  },
  {
    ch: 'clust',
    t: 'Standardisation (z-score) du cours',
    d: 'mf = moyenne ; <b>sf = écart absolu moyen</b> = (1/n)(|x₁f − mf| + … + |xₙf − mf|) ; <b>zif = (xif − mf) / sf</b>. But : ne pas favoriser certaines variables.'
  },
  {
    ch: 'clust',
    t: 'Variable binaire symétrique / asymétrique',
    d: '<b>Symétrique</b> : les deux états sont équivalents (sexe). <b>Asymétrique</b> : un état est plus important (test VIH positif) ; on code 1 la modalité la moins fréquente.'
  },
  {
    ch: 'clust',
    t: 'Table de contingence binaire',
    d: '<b>a</b> = positions (1,1) ; <b>b</b> = (1,0) ; <b>c</b> = (0,1) ; <b>d</b> = (0,0).'
  },
  {
    ch: 'clust',
    t: 'Coefficient d’appariement simple',
    d: 'd(i, j) = <b>(b + c) / (a + b + c + d)</b>. Pour les variables binaires <b>symétriques</b>.'
  },
  {
    ch: 'clust',
    t: 'Coefficient de Jaccard',
    d: 'd(i, j) = <b>(b + c) / (a + b + c)</b>. Pour les variables binaires <b>asymétriques</b> : on ignore d (les 0-0 ne sont pas significatifs).'
  },
  {
    ch: 'clust',
    t: 'Distance pour variables nominales',
    d: 'Matching simple : <b>d(i, j) = (p − m) / p</b>, m = nombre de correspondances, p = nombre de variables. Ou une variable binaire par modalité.'
  },
  {
    ch: 'clust',
    t: 'Distance pour variables ordinales',
    d: 'Remplacer chaque valeur par son <b>rang r</b> (1…k), puis <b>y = (r − 1) / (k − 1)</b> ∈ [0, 1], puis utiliser une distance numérique.'
  },
  {
    ch: 'clust',
    t: 'Variables de types mixtes',
    d: 'd(i, j) = Σ δk·dk / Σ δk. <b>δk = 0</b> si une valeur est inconnue ou si 0-0 sur une binaire asymétrique. dk = |xik − xjk| / (max − min) pour une variable numérique ; 0 ou 1 pour binaire/nominale.'
  },
  {
    ch: 'clust',
    t: 'Trois approches de clustering',
    d: '<b>Partitionnement</b> (K-means, K-medoids), <b>hiérarchiques</b> (AGNES/CAH, BIRCH), <b>basées sur la densité</b> (DBSCAN).'
  },
  {
    ch: 'clust',
    t: 'K-means',
    d: 'Méthode de partitionnement (MacQueen 1967) : une classe est représentée par son <b>centre de gravité</b> ; chaque objet va au centre le plus proche ; on recalcule les centres ; on répète <b>jusqu’à ce qu’aucun objet ne change</b> de cluster.'
  },
  {
    ch: 'clust',
    t: 'Étapes de K-means (cours)',
    d: '1) Découper en K sous-ensembles ; 2) calculer les centres de gravité ; 3) réaffecter chaque objet au centre le plus proche ; 4) retour en 2 si un sous-ensemble a changé.'
  },
  {
    ch: 'clust',
    t: 'K-medoids',
    d: '(Kaufman 1987) Une classe est représentée par son <b>élément le plus représentatif</b> (un objet réel, le médoïde). Accepte d’autres distances (Manhattan, cosinus).'
  },
  {
    ch: 'clust',
    t: 'Forces de K-means',
    d: 'Relativement <b>efficace</b> ; passe à l’échelle (<b>complexité linéaire</b> en nombre d’objets).'
  },
  {
    ch: 'clust',
    t: 'Faiblesses de K-means',
    d: 'Inapplicable aux attributs non numériques (moyenne ?) ; il faut <b>fixer k</b> ; les centres sont des <b>objets inexistants</b>. Résultat dépendant des centres initiaux.'
  },
  {
    ch: 'clust',
    t: 'CAH / AGNES',
    d: 'Méthode hiérarchique ascendante (Kaufmann et Rousseeuw, 1990) : au départ <b>un objet = une classe</b> ; à chaque étape on <b>fusionne les deux classes les plus proches</b> ; jusqu’à un seul groupe.'
  },
  {
    ch: 'clust',
    t: 'Dendrogramme',
    d: 'Arbre qui représente les fusions successives et leur <b>hauteur</b> (distance). <b>Le couper</b> horizontalement donne les clusters : autant de clusters que de traits verticaux coupés.'
  },
  {
    ch: 'clust',
    t: 'Saut minimal (single linkage)',
    d: "Distance entre deux groupes = <b>plus petite distance</b> entre un point de l’un et un point de l’autre. En Python : linkage(…, method='single')."
  },
  {
    ch: 'clust',
    t: 'Faiblesses des méthodes hiérarchiques',
    d: 'Passage à l’échelle difficile (<b>complexité quadratique</b>) ; <b>pas de remise en question</b> : deux classes fusionnées ne peuvent plus être séparées.'
  },
  {
    ch: 'clust',
    t: 'BIRCH',
    d: 'Algorithme hiérarchique (1996) qui représente une classe par ses <b>traits caractéristiques</b> pour passer à l’échelle.'
  },
  {
    ch: 'clust',
    t: 'Méthodes basées sur la densité (DBSCAN)',
    d: 'Regroupent selon un critère local de <b>densité</b> : découvrent des classes de <b>formes quelconques</b>, sont <b>insensibles au bruit</b>, un seul parcours des données. DBSCAN : Ester et al., 1996.'
  },
  {
    ch: 'clust',
    t: 'Affecter un nouveau point',
    d: 'Calculer sa distance au <b>centre de gravité</b> de chaque cluster et l’affecter au <b>plus proche</b>.'
  },

  /* ---------- CLASSIFICATION ---------- */
  {
    ch: 'classif',
    t: 'Classification supervisée',
    d: 'Technique d’apprentissage <b>supervisé</b> : à partir d’exemples (variables explicatives + variable expliquée connue), construire un modèle qui <b>prédit la classe</b> de futures observations.'
  },
  {
    ch: 'classif',
    t: 'Processus en deux étapes',
    d: '(1) <b>Construction du modèle</b> sur l’ensemble d’apprentissage (règles, arbre…) ; (2) <b>utilisation</b> : estimer sa pertinence sur l’ensemble de test (% de bien classés), puis prédire de nouveaux objets.'
  },
  {
    ch: 'classif',
    t: 'Applications de la classification',
    d: '<b>Diagnostic médical</b>, <b>accord de crédit</b>, <b>détection de fraudes fiscales</b>, marketing.'
  },
  {
    ch: 'classif',
    t: 'Arbre de décision',
    d: 'Classifieur supervisé qui classe les observations par <b>partitionnements hiérarchiques successifs</b> en sous-groupes de plus en plus homogènes. Se lit comme un ensemble de règles SI… ALORS.'
  },
  {
    ch: 'classif',
    t: 'Nœud, branche, feuille',
    d: '<b>Nœud</b> : test sur un attribut. <b>Branche</b> : un résultat possible du test. <b>Feuille</b> : la classe prédite (classe majoritaire du nœud).'
  },
  {
    ch: 'classif',
    t: 'Choix de l’attribut à la racine',
    d: 'On choisit l’attribut qui apporte le <b>plus d’information</b> : celui dont le <b>gain d’information est maximal</b>. But : classer en posant le moins de questions possible.'
  },
  {
    ch: 'classif',
    t: 'Quantité d’information I(p, n)',
    d: 'I(p,n) = −p/(p+n)·log₂(p/(p+n)) − n/(p+n)·log₂(n/(p+n)). Vaut 0 si une seule classe, 1 si 50/50.'
  },
  {
    ch: 'classif',
    t: 'Entropie E(A)',
    d: 'E(A) = Σᵢ (pᵢ+nᵢ)/(p+n) · I(pᵢ, nᵢ) : la <b>quantité de désordre</b> qui reste après avoir choisi A.'
  },
  {
    ch: 'classif',
    t: 'Gain d’information',
    d: '<b>Gain(A) = I(p, n) − E(A)</b>. On place au nœud l’attribut de plus grand gain.'
  },
  {
    ch: 'classif',
    t: 'Surapprentissage (overfitting)',
    d: 'L’arbre <b>colle trop</b> aux données d’apprentissage : aucune erreur sur elles, mais mauvaise généralisation. Remède : autoriser des erreurs, <b>élaguer</b>, utiliser un ensemble de validation.'
  },
  {
    ch: 'classif',
    t: 'Ensemble de validation (test)',
    d: 'Sert à vérifier l’arbre sur des exemples non vus ; généralement <b>le tiers des exemples</b> disponibles (cours).'
  },
  {
    ch: 'classif',
    t: 'Procédure générale d’apprentissage',
    d: '1) Collecter beaucoup d’exemples ; 2) les diviser en entraînement et test ; 3) apprendre l’hypothèse h ; 4) mesurer le % d’exemples de test bien classés ; 5) répéter avec d’autres tailles et tirages.'
  },
  {
    ch: 'classif',
    t: 'Accuracy (exactitude)',
    d: '(VP + VN) / total = nombre de prédictions correctes / nombre total de prédictions.'
  },
  {
    ch: 'classif',
    t: 'Précision',
    d: '<b>VP / (VP + FP)</b> : parmi les objets prédits positifs, la part de vrais positifs. ⚠ Dans les devoirs, « précision » désigne parfois le % de bien classés : suivre la définition de l’énoncé.'
  },
  {
    ch: 'classif',
    t: 'Rappel (sensibilité)',
    d: '<b>VP / (VP + FN)</b> : parmi les vrais positifs, la part retrouvée par le modèle.'
  },
  { ch: 'classif', t: 'F-mesure (F1)', d: 'F1 = 2·P·R / (P + R) : moyenne harmonique de la précision et du rappel.' },
  {
    ch: 'classif',
    t: 'Matrice de confusion',
    d: 'Tableau qui croise classes <b>réelles</b> (lignes) et <b>prédites</b> (colonnes) : VP, FN, FP, VN.'
  },
  {
    ch: 'classif',
    t: 'ID3, C4.5, CART',
    d: 'Algorithmes d’arbres : <b>ID3</b> (Quinlan, 1979), <b>C4.5</b> (Quinlan, amélioration d’ID3), <b>CART</b> (Breiman et al., 1984).'
  },
  {
    ch: 'classif',
    t: 'Extensions des arbres',
    d: 'Graphes de décision, <b>bagging</b>, <b>boosting</b>, <b>forêts aléatoires</b> (random forests).'
  },
  {
    ch: 'classif',
    t: 'Autres méthodes de classification',
    d: '<b>Naïve Bayes</b> (bayésienne), <b>k plus proches voisins</b> (k-NN), <b>SVM</b> (Support Vector Machines).'
  },
  {
    ch: 'classif',
    t: 'Classification bayésienne',
    d: 'Méthodes basées sur le <b>théorème de Bayes</b> : on affecte à X la classe C qui <b>maximise P(C | X)</b>.'
  },
  {
    ch: 'classif',
    t: 'Naïve Bayes',
    d: 'Hypothèse d’<b>indépendance des attributs</b> : P(x₁,…,xₖ | C) = P(x₁|C)·…·P(xₖ|C). On compare P(X|C)·P(C) pour chaque classe. Simple, rapide, efficace avec peu de données.'
  },
  {
    ch: 'classif',
    t: 'Variantes de Naïve Bayes',
    d: '<b>Gaussien</b> : données continues (loi normale). <b>Multinomial</b> : comptages (mots d’un texte). <b>Bernoulli</b> : binaires (présence/absence).'
  },
  {
    ch: 'classif',
    t: 'Réseaux bayésiens',
    d: 'Modélisent les <b>dépendances</b> entre variables (plus complexes que Naïve Bayes).'
  },
  {
    ch: 'classif',
    t: 'k-NN',
    d: 'Prédit à partir des <b>k exemples les plus proches</b> (vote majoritaire). Supervisé.'
  },
  {
    ch: 'classif',
    t: 'Test sur une variable',
    d: 'Binaire : X ? oui/non. <b>Quantitative</b> : X &lt; a ? Qualitative à M modalités : une branche par modalité.'
  },

  /* ---------- PRÉPARATION DES DONNÉES ---------- */
  {
    ch: 'prep',
    t: 'Données brutes de faible qualité',
    d: '<b>Incomplètes</b> (valeurs manquantes), <b>bruitées</b> (erronées ou aberrantes), <b>incohérentes</b> (divergences entre attributs).'
  },
  {
    ch: 'prep',
    t: 'Prétraitement des données',
    d: 'Traiter les données bruitées <b>en les supprimant ou en les modifiant</b> pour en tirer le meilleur profit. Étape cruciale de l’ECD : elle <b>conditionne la qualité des modèles</b>.'
  },
  {
    ch: 'prep',
    t: 'Données de qualité',
    d: 'Données <b>complètes, fiables, pertinentes, à jour et cohérentes</b> ; sans doublons, fautes ni omissions. Elles sont de qualité si elles satisfont les exigences de leurs utilisateurs.'
  },
  {
    ch: 'prep',
    t: 'Étapes préalables à la préparation',
    d: '<b>Compréhension du domaine</b> : besoins des utilisateurs et objectifs. <b>Compréhension des données</b> : identifier les données et variables pertinentes, leur sens, leurs statistiques (min, max, moyenne, corrélations) et leur type.'
  },
  {
    ch: 'prep',
    t: 'Fonctionnalités d’un algorithme de préparation',
    d: 'Traiter les <b>manquantes</b> par remplacement ; traiter <b>outliers et bruit</b> (lissage, clustering, régression) ; détecter la <b>redondance</b> (corrélation) ; <b>résumer</b> ; <b>normaliser</b> ; <b>réduire</b> (sélection d’attributs).'
  },
  {
    ch: 'prep',
    t: 'Étapes de la préparation',
    d: '<b>Nettoyage</b>, <b>intégration</b>, <b>transformation</b>, <b>réduction</b>, <b>discrétisation</b>.',
    m: 'N-I-T-R-D : « Nos Idées Tiennent la Route Demain ».'
  },
  {
    ch: 'prep',
    t: 'Causes des données manquantes',
    d: 'Équipement défaillant ; incohérence avec d’autres données (donc supprimées) ; non saisies car mal comprises ; jugées peu importantes lors de la saisie.'
  },
  {
    ch: 'prep',
    t: 'MCAR',
    d: '<b>Missing Completely At Random</b> : la probabilité d’absence est la même pour toutes les observations. p(M|X) = p(M). Ex. : on refuse de répondre si le dé tombe sur 1.'
  },
  {
    ch: 'prep',
    t: 'MAR',
    d: '<b>Missing At Random</b> : l’absence dépend de <b>variables observées</b>. p(M|X) = p(M|Xo). Ex. : on répond moins à Q2 selon sa réponse (enregistrée) à Q1.'
  },
  {
    ch: 'prep',
    t: 'MNAR',
    d: '<b>Missing Not At Random</b> : l’absence dépend de <b>variables non observées</b> ou de la valeur manquante elle-même. Ex. : une réponse gênante est souvent évitée.'
  },
  {
    ch: 'prep',
    t: 'Corriger les données manquantes (cours)',
    d: 'Ignorer le tuple ; compléter manuellement ; constante globale (« inconnue ») ; <b>moyenne de l’attribut</b> ; <b>moyenne de l’attribut pour la même classe</b> (mieux) ; <b>valeur la plus probable</b> (Bayes, arbre de décision).'
  },
  {
    ch: 'prep',
    t: 'Suppression des observations manquantes',
    d: 'Si <b>MCAR</b> : ne biaise pas (mais réduit les données). Si <b>MAR</b> ou <b>MNAR</b> : <b>biaise</b> les résultats → préférer l’imputation. Si ≤ 5 % de NA : on peut ne rien faire.'
  },
  {
    ch: 'prep',
    t: 'Méthodes d’imputation',
    d: 'Par une <b>valeur unique</b> (moyenne, médiane, mode) ; par le <b>centre du groupe</b> le plus proche ; par une <b>valeur prédite</b> ; méthode <b>Hot Deck</b>.'
  },
  {
    ch: 'prep',
    t: 'Hot Deck',
    d: 'Remplacer une valeur manquante par une valeur <b>tirée au hasard</b> parmi les valeurs observées du même attribut.'
  },
  {
    ch: 'prep',
    t: 'Moyenne ou médiane ?',
    d: 'La moyenne est <b>peu robuste</b> aux valeurs extrêmes ; la <b>médiane</b> est plus robuste. Le mode (valeur la plus fréquente) convient aux variables à peu de valeurs.'
  },
  {
    ch: 'prep',
    t: 'Bruit',
    d: '<b>Erreur ou variance aléatoire</b> d’une variable mesurée. Causes : instrument défectueux, saisie, transmission, limite technologique, conventions de nommage.'
  },
  {
    ch: 'prep',
    t: 'Corriger le bruit',
    d: '<b>Partitionnement</b> (trier, découper, lisser par moyenne/médiane/bornes), <b>clustering</b> (supprimer les exceptions), inspection humaine + machine, <b>régression</b>.'
  },
  {
    ch: 'prep',
    t: 'Équi-largeur / équi-profondeur',
    d: '<b>Équi-largeur</b> : n intervalles de même taille. <b>Équi-profondeur</b> : n intervalles contenant le même nombre de valeurs.'
  },
  {
    ch: 'prep',
    t: 'Lissage par la moyenne / par les bornes',
    d: '<b>Moyenne</b> : chaque valeur d’un bac est remplacée par la moyenne du bac. <b>Bornes</b> : chaque valeur est remplacée par la borne (min ou max du bac) la plus proche.'
  },
  {
    ch: 'prep',
    t: 'Intégration des données',
    d: 'Combiner plusieurs sources. Problèmes : <b>nommage</b> (num_client ≡ client_id), <b>conflits de valeurs</b> (cm / pouces), <b>redondance</b> (détectée par corrélation).'
  },
  {
    ch: 'prep',
    t: 'Transformation des données',
    d: '<b>Lissage</b>, <b>agrégation</b> (cubes), <b>généralisation</b> (hiérarchie de concepts), <b>normalisation</b> (min-max, z-score, mise à l’échelle décimale).'
  },
  {
    ch: 'prep',
    t: 'Normalisation',
    d: 'Ramener les colonnes numériques à une <b>échelle commune</b>, sans fausser les écarts ni perdre d’information. Certains algorithmes en ont besoin.'
  },
  {
    ch: 'prep',
    t: 'Min-Max',
    d: '<b>x′ = (x − min) / (max − min)</b> ∈ [0, 1]. Pour des données d’échelles différentes ; réduit l’espace de variation.'
  },
  {
    ch: 'prep',
    t: 'Z-score (standardisation)',
    d: '<b>z = (x − m) / s</b>. Pour des attributs de distributions normales de moyennes et écarts différents. Le cours prend s = écart absolu moyen.'
  },
  {
    ch: 'prep',
    t: 'Donnée aberrante (outlier)',
    d: 'Valeur <b>extrême</b>, anormalement différente de la distribution de la variable. Ex. : un salaire de 1 000 000 quand les salaires vont de 160 000 à 300 000.'
  },
  {
    ch: 'prep',
    t: 'Méfaits des outliers',
    d: 'Entraînement plus long, <b>apprentissage biaisé</b>, modèle moins performant ; faussent la moyenne et donc notre compréhension des données.'
  },
  {
    ch: 'prep',
    t: 'Détecter les outliers',
    d: 'Les anomalies sont <b>très différentes</b> et <b>rares</b>. Méthodes : <b>proximité</b> (plus proches voisins : distance ou densité ; clustering) et <b>box plot</b>.'
  },
  {
    ch: 'prep',
    t: 'Règle du box plot (IQR)',
    d: 'IQR = Q3 − Q1. Outlier si <b>x &lt; Q1 − 1,5·IQR</b> ou <b>x &gt; Q3 + 1,5·IQR</b>.'
  },
  {
    ch: 'prep',
    t: 'Réduction des données',
    d: 'Obtenir une représentation <b>plus petite</b> qui donne (presque) les mêmes résultats : agrégation (cubes), réduction de dimension, de numérosité, discrétisation.'
  },
  {
    ch: 'prep',
    t: 'Sélection d’attributs',
    d: 'Choisir un <b>sous-ensemble optimal d’attributs pertinents</b> selon un critère : mesures d’information (gain), de distance, de dépendance, de cohérence, de précision.'
  },
  {
    ch: 'prep',
    t: 'Incohérence (critère de cohérence)',
    d: 'Au moins deux exemples ont la <b>même description</b> mais des <b>classes différentes</b>.'
  },
  {
    ch: 'prep',
    t: 'Discrétisation',
    d: 'Diviser l’intervalle d’un attribut continu en <b>sous-intervalles</b> : certains algorithmes n’acceptent que des catégories ; réduit le volume. Méthodes : partitionnement, clustering, entropie, partitionnement naturel.'
  },
  {
    ch: 'prep',
    t: 'Types d’attributs',
    d: '<b>Nominal</b> (catégorie), <b>ordinal</b> (ensemble ordonné), <b>continu</b> (réels).'
  },

  /* ---------- CODE PYTHON ---------- */
  {
    ch: 'code',
    t: 'pd.read_csv / pd.read_table',
    d: 'Charger un fichier (CSV, texte) dans un <b>DataFrame</b> pandas. sep = séparateur, header = ligne des noms, index_col = colonne d’index.'
  },
  {
    ch: 'code',
    t: 'train_test_split',
    d: '<code>X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=1)</code> : partage aléatoire apprentissage / test ; random_state rend le tirage reproductible ; stratify=y garde les proportions de classes.'
  },
  {
    ch: 'code',
    t: 'DecisionTreeClassifier',
    d: '<code>clf = DecisionTreeClassifier()</code> crée un arbre non entraîné ; <code>clf.fit(X_train, y_train)</code> l’entraîne ; <code>clf.predict(X_test)</code> prédit.'
  },
  {
    ch: 'code',
    t: 'Métriques sklearn',
    d: '<code>metrics.accuracy_score(y_test, y_pred)</code>, <code>precision_score</code>, <code>recall_score</code>, <code>f1_score</code>, <code>confusion_matrix</code>. Classe non binaire : average="macro".'
  },
  {
    ch: 'code',
    t: 'joblib.dump / joblib.load',
    d: "<code>joblib.dump(clf, 'model.pkl')</code> sauvegarde le modèle ; <code>model = joblib.load('model.pkl')</code> le recharge pour prédire."
  },
  {
    ch: 'code',
    t: 'KMeans (sklearn)',
    d: '<code>kmeans = cluster.KMeans(n_clusters=3)</code> ; <code>kmeans.fit(X)</code> ; <code>kmeans.labels_</code> (cluster de chaque objet) ; <code>kmeans.cluster_centers_</code> (centres) ; <code>predict</code> pour un nouvel objet.'
  },
  {
    ch: 'code',
    t: 'linkage / dendrogram / fcluster',
    d: "<code>Z = linkage(X, method='single', metric='euclidean')</code> : CAH saut minimal ; <code>dendrogram(Z)</code> la dessine ; <code>fcluster(Z, t=7, criterion='distance')</code> coupe à la hauteur 7."
  },
  {
    ch: 'code',
    t: 'np.argsort(kmeans.labels_)',
    d: 'Donne les indices qui <b>trient les objets par numéro de cluster</b> (pour afficher chaque objet avec son cluster, regroupés).'
  },
  {
    ch: 'code',
    t: 'Scalers',
    d: '<b>StandardScaler</b> : z-score (moyenne 0, écart-type 1). <b>MinMaxScaler</b> : [0, 1]. <b>RobustScaler</b> : médiane et IQR, résiste aux outliers.'
  },
  {
    ch: 'code',
    t: 'Valeurs manquantes en Python',
    d: "<code>df.isna().sum()</code> compte ; <code>df.dropna()</code> supprime ; <code>SimpleImputer(strategy='mean')</code> impute par la moyenne (aussi 'median', 'most_frequent') ; KNNImputer."
  },
  {
    ch: 'code',
    t: 'Encodage des catégories',
    d: '<b>LabelEncoder</b> : une catégorie → un entier. <b>LabelBinarizer</b> / one-hot : une colonne 0/1 par modalité.'
  },
  {
    ch: 'code',
    t: 'Règles d’association en Python',
    d: '<b>efficient_apriori</b> : <code>itemsets, rules = apriori(transactions, min_support=0.5, min_confidence=0.8)</code>. <b>mlxtend</b> : TransactionEncoder (one-hot) → apriori(df, min_support, use_colnames=True) → association_rules(…, metric="confidence").'
  }
];
/* L'identifiant est la position : la progression enregistrée y est liée. Ajouter en fin de tableau, ne pas réordonner. */
CARDS.forEach((c, i) => {
  c.id = 'c' + i;
});
