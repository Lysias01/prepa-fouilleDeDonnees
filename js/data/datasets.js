/* ===================== Jeux de données ===================== */
const DS = {
  pain: {
    T: [
      ['Pain', 'Lait', 'Beurre'],
      ['Pain', 'Lait', 'Sucre'],
      ['Pain'],
      ['Pain', 'Lait'],
      ['Pain', 'Lait', 'Beurre', 'Sucre']
    ],
    order: ['Pain', 'Lait', 'Sucre', 'Beurre']
  },
  textes: {
    T: [
      ['Finance', 'Marché', 'Budget', 'Economie'],
      ['Ouverture', 'Finance', 'Economie'],
      ['Ouverture', 'Assemblée', 'Handball', 'Sport'],
      ['Directeur', 'Budget', 'Finance', 'Economie'],
      ['Directeur', 'Assemblée', 'Handball', 'Sport'],
      ['Ouverture', 'Marché', 'Economie'],
      ['Ouverture', 'Assemblée', 'Directeur', 'Handball', 'Sport']
    ],
    order: ['Finance', 'Marché', 'Budget', 'Economie', 'Ouverture', 'Assemblée', 'Handball', 'Sport', 'Directeur']
  },
  biblio: {
    T: [
      ['R', 'P', 'B'],
      ['R', 'P'],
      ['R', 'B', 'S'],
      ['P', 'B'],
      ['R', 'P', 'B', 'H'],
      ['R', 'P', 'S']
    ],
    order: ['R', 'P', 'B', 'S', 'H']
  },
  panier: {
    T: [
      ['Café', 'Sucre', 'Lait'],
      ['Café', 'Sucre'],
      ['Thé', 'Sucre', 'Pain'],
      ['Café', 'Sucre', 'Lait', 'Pain'],
      ['Thé', 'Lait'],
      ['Café', 'Lait', 'Pain']
    ],
    order: ['Café', 'Sucre', 'Lait', 'Pain', 'Thé']
  },
  patients: [
    ['Fièvre', 'Toux', 'Fatigue', 'Maux de tête'],
    ['Nausée', 'Fièvre', 'Maux de tête'],
    ['Nausée', 'Douleur abdominale', 'Vertiges', 'Sport'],
    ['Douleur thoracique', 'Fièvre', 'Fatigue'],
    ['Douleur thoracique', 'Douleur abdominale', 'Vertiges', 'Sport'],
    ['Nausée', 'Toux', 'Maux de tête'],
    ['Nausée', 'Douleur abdominale', 'Douleur thoracique', 'Vertiges', 'Sport']
  ],
  AG: [
    { n: 'A', c: [3, 2] },
    { n: 'B', c: [4, 5] },
    { n: 'C', c: [4, 7] },
    { n: 'D', c: [2, 7] },
    { n: 'E', c: [6, 6] },
    { n: 'F', c: [7, 7] },
    { n: 'G', c: [6, 4] }
  ],
  A18: [
    { n: 'A1', c: [2, 10] },
    { n: 'A2', c: [2, 5] },
    { n: 'A3', c: [8, 4] },
    { n: 'A4', c: [5, 8] },
    { n: 'A5', c: [7, 5] },
    { n: 'A6', c: [6, 4] },
    { n: 'A7', c: [1, 2] },
    { n: 'A8', c: [4, 9] }
  ],
  P16: [
    { n: 'P1', c: [7, 5] },
    { n: 'P2', c: [8, 7] },
    { n: 'P3', c: [8, 8] },
    { n: 'P4', c: [1, 6] },
    { n: 'P5', c: [7, 6] },
    { n: 'P6', c: [1, 5] }
  ],
  PT: [
    { n: 'P', c: [1, 1] },
    { n: 'Q', c: [2, 1] },
    { n: 'R', c: [5, 4] },
    { n: 'S', c: [6, 5] },
    { n: 'T', c: [1, 8] }
  ],
  oneD: [1, 2, 3, 6, 7, 8, 13, 15, 17].map((v) => ({ n: String(v), c: [v] })),
  miage: [
    ['Non', 'C', 'ABien', 'Admis'],
    ['Non', 'F', 'ABien', 'Admis'],
    ['Oui', 'D', 'ABien', 'Non Admis'],
    ['Oui', 'D', 'Bien', 'Admis'],
    ['Non', 'C', 'Bien', 'Admis'],
    ['Non', 'F', 'Bien', 'Admis'],
    ['Oui', 'D', 'Passable', 'Non Admis'],
    ['Oui', 'C', 'Passable', 'Non Admis'],
    ['Oui', 'F', 'Passable', 'Non Admis'],
    ['Oui', 'C', 'TBien', 'Admis'],
    ['Oui', 'F', 'TBien', 'Admis'],
    ['Non', 'D', 'TBien', 'Admis']
  ].map((r) => ({ Doublant: r[0], Série: r[1], Mention: r[2], Classe: r[3] })),
  promo: [
    ['Adulte', 'Élevé', 'Oui', 'Oui'],
    ['Adulte', 'Élevé', 'Oui', 'Oui'],
    ['Adulte', 'Élevé', 'Non', 'Oui'],
    ['Adulte', 'Élevé', 'Non', 'Oui'],
    ['Jeune', 'Élevé', 'Oui', 'Non'],
    ['Jeune', 'Élevé', 'Non', 'Non'],
    ['Jeune', 'Faible', 'Oui', 'Non'],
    ['Adulte', 'Faible', 'Non', 'Non']
  ].map((r) => ({ Âge: r[0], Revenu: r[1], Carte: r[2], Achète: r[3] })),
  tennis: [
    ['soleil', 'chaud', 'élevée', 'faux', 'N'],
    ['soleil', 'chaud', 'élevée', 'vrai', 'N'],
    ['couvert', 'chaud', 'élevée', 'faux', 'P'],
    ['pluie', 'tiède', 'élevée', 'faux', 'P'],
    ['pluie', 'froid', 'normale', 'faux', 'P'],
    ['pluie', 'froid', 'normale', 'vrai', 'N'],
    ['couvert', 'froid', 'normale', 'vrai', 'P'],
    ['soleil', 'tiède', 'élevée', 'faux', 'N'],
    ['soleil', 'froid', 'normale', 'faux', 'P'],
    ['pluie', 'tiède', 'normale', 'faux', 'P'],
    ['soleil', 'tiède', 'normale', 'vrai', 'P'],
    ['couvert', 'tiède', 'élevée', 'vrai', 'P'],
    ['couvert', 'chaud', 'normale', 'faux', 'P'],
    ['pluie', 'tiède', 'élevée', 'vrai', 'N']
  ].map((r) => ({ Temps: r[0], Température: r[1], Humidité: r[2], Vent: r[3], Classe: r[4] })),
  pret: [
    ['Stable', 'Non', 'Oui'],
    ['Stable', 'Non', 'Oui'],
    ['Stable', 'Oui', 'Oui'],
    ['Instable', 'Non', 'Oui'],
    ['Stable', 'Non', 'Oui'],
    ['Instable', 'Oui', 'Non'],
    ['Instable', 'Oui', 'Non'],
    ['Stable', 'Oui', 'Non']
  ].map((r) => ({ Salaire: r[0], Dettes: r[1], Prêt: r[2] })),
  na: [1, null, 2, 2, 2, 1, null, 2, null, 1, null, 1, 2, 2]
};
