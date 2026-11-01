/* ===================== Thème ===================== */
/* store.data.theme vaut 'dark', 'light' ou null (suit le système). */
const THEME_LABELS = { dark: 'sombre', light: 'clair', system: 'système' };
const THEME_ICONS = {
  dark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/></svg>',
  light:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
  system:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor"/></svg>'
};

function applyTheme() {
  const t = store.data.theme;
  if (t) document.documentElement.setAttribute('data-theme', t);
  else document.documentElement.removeAttribute('data-theme');
  const b = $('#themeBtn');
  if (!b) return; // premier appel depuis <head> : le bouton n'existe pas encore
  const name = t || 'system';
  b.innerHTML = THEME_ICONS[name];
  b.setAttribute('aria-label', 'Thème : ' + THEME_LABELS[name]);
}

function cycleTheme() {
  const t = store.data.theme;
  store.data.theme = !t ? 'dark' : t === 'dark' ? 'light' : null;
  store.save();
  applyTheme();
}

applyTheme();
