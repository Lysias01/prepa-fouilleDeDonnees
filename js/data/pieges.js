/* ===================== Pièges et mémo ===================== */
const TRAPS = [
  ['Seuil de support', 'minsup = 40 % de 7 = 2,8 → il faut <b>3</b> transactions (on arrondit au-dessus).'],
  [
    'Dénominateur de la confiance',
    'conf(X → Y) = sup(X ∪ Y) / sup(<b>X</b>) : toujours le support de la partie gauche.'
  ],
  [
    'Valide = deux conditions',
    'Une règle valide doit vérifier <b>support ≥ minsup ET confiance ≥ minconf</b>. Une confiance de 100 % ne suffit pas.'
  ],
  [
    'Antimonotonie',
    'Un sur-ensemble d’un non fréquent est non fréquent : utilise-le pour justifier vite (ex. Budget non fréquent → {Economie, Finance, Budget} non fréquent).'
  ],
  ['Corrélation ≠ causalité', 'Une règle à 100 % dit que les items apparaissent ensemble, pas que l’un cause l’autre.'],
  [
    'Supervisé ou non ?',
    'Le mot qui tranche : la <b>valeur cible</b> est-elle connue ? Clustering = classification <b>non</b> supervisée.'
  ],
  [
    'K-means sans calculatrice',
    'Compare les <b>carrés</b> des distances. Recalcule les centres (moyennes) à chaque itération. Écris la phrase d’arrêt.'
  ],
  [
    'Couper un dendrogramme',
    'Compte les traits verticaux coupés. Pour 3 clusters, la coupe doit être entre la 3ᵉ et la 2ᵉ fusion en partant du haut.'
  ],
  ['Saut minimal', 'Distance entre groupes = la <b>plus petite</b> distance point à point.'],
  [
    'Gain d’information',
    'On choisit le gain <b>maximal</b> (= entropie restante minimale). Gain = I − E, pas l’inverse.'
  ],
  [
    'Deux conventions pour I(p, n)',
    'Cours de classification : sans division (I(9,5) = 13,16). Devoirs : normalisée (0,940). Même attribut choisi.'
  ],
  [
    '« Précision » dans les devoirs',
    'Le devoir 3 appelle « précision » le % de bien classés. Suis la définition de l’énoncé.'
  ],
  ['Z-score du cours', 's = <b>écart absolu moyen</b> (on divise la somme des |x − m| par n), pas l’écart-type.'],
  ['Jaccard', 'On ignore d (les 0-0) pour les variables asymétriques ; l’appariement simple les compte.'],
  [
    'K-means : faiblesses',
    'Fixer k, numérique seulement, centres inexistants. La complexité <b>quadratique</b> concerne la CAH, pas K-means.'
  ]
];
