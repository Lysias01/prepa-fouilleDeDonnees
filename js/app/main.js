/* ===================== Démarrage ===================== */
/* Dernier script chargé (defer) : le DOM et tous les autres scripts sont prêts. */
applyTheme();
$('#themeBtn').onclick = cycleTheme;
startCountdown();
window.addEventListener('hashchange', route);
route();
