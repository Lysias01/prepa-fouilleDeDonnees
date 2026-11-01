# Révision — Fouille de données et apprentissage automatique (M1)

Site statique de révision : fiches, questions de cours (QCM + réponses rédigées), méthodes pas à pas, exercices type devoir et examens blancs notés sur 20.

## Mettre en ligne avec GitHub Pages
1. Créer un dépôt public sur GitHub (ex. `revision-fouille`).
2. Y déposer `index.html`, `.nojekyll` et les dossiers `css/` et `js/` (bouton **Add file → Upload files**).
3. **Settings → Pages** : Source = *Deploy from a branch*, Branch = `main`, dossier `/ (root)`, puis **Save**.
4. Après 1 à 2 minutes, le site est disponible à l'adresse `https://<votre-nom>.github.io/revision-fouille/`.

Le site fonctionne aussi hors ligne : il suffit d'ouvrir `index.html` dans un navigateur (garder `css/` et `js/` à côté).
La progression est enregistrée dans le navigateur de chaque appareil.

## Organisation du code

```
index.html          squelette de la page et ordre de chargement des scripts
css/
  tokens.css        couleurs et polices (thèmes clair et sombre)
  base.css          styles de base
  layout.css        en-tête, page, pied de page
  components.css    boutons, tableaux, formulaires, graphiques…
  views/            styles propres à chaque page
js/
  core/             utilitaires, stockage local, thème
  ui/               composants HTML et champs de réponse corrigés automatiquement
  algos/            Apriori, K-means, CAH, gain d'information, Naïve Bayes : calcul et étapes expliquées
  data/             contenu : fiches, questions, jeux de données, méthodes, exercices, examens, pièges, plan
  app/              routeur, progression, compte à rebours, démarrage
  views/            une page par fichier ; chacune s'enregistre dans VIEWS
```

Où intervenir :
- **Corriger ou ajouter du contenu :** `js/data/`. Les fiches et les questions s'ajoutent **en fin de tableau** : leur identifiant est leur position, et la progression enregistrée y est liée.
- **Ajouter une page :** créer `js/views/ma-page.js` avec `VIEWS.mapage = (main) => { … }`, l'inclure dans `index.html` avant `js/app/main.js`, puis ajouter l'onglet dans `index.html` et dans `TAB_OF_VIEW` (`js/app/router.js`).
- **Ajouter un type de champ de réponse :** `FIELD_KINDS` dans `js/ui/answer-fields.js`.
- **Changer la date du devoir :** `EXAM_DATE` dans `js/app/countdown.js`.

Les scripts sont volontairement classiques (pas de modules ES ni d'étape de compilation) : les modules ne se chargent pas quand on ouvre le fichier directement (`file://`). Ils partagent donc la même portée globale, et l'ordre des balises dans `index.html` compte.
