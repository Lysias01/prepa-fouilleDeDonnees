/* ===================== Démarrage ===================== */
/* Dernier script chargé (defer) : le DOM et tous les autres scripts sont prêts. */
applyTheme();
$('#themeBtn').onclick = cycleTheme;
window.addEventListener('hashchange', route);
route();

/* Hors ligne : une fois en ligne, le site reste consultable sans connexion (voir sw.js). */
if ('serviceWorker' in navigator && location.protocol === 'https:') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(() => {});
    const files = performance
      .getEntriesByType('resource')
      .map((r) => r.name)
      .filter((u) => u.startsWith(location.origin));
    caches
      .open('fouille-aa-v2')
      .then((c) => c.addAll([location.pathname, ...files]))
      .catch(() => {});
  });
}
