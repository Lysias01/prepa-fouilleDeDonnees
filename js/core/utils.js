/* ===== Utilitaires ===== */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const h = (html) => {
  const t = document.createElement('template');
  t.innerHTML = html.trim();
  return t.content.firstElementChild;
};
const fmt = (x, d = 2) => {
  if (Number.isInteger(x)) return String(x);
  let s = x.toFixed(d);
  s = s.replace(/0+$/, '').replace(/\.$/, '');
  return s.replace('.', ',');
};
const pct = (x, d = 1) => fmt(x * 100, d) + ' %';
const norm = (s) =>
  String(s)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
const shuffle = (a) => {
  a = a.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
const gcd = (a, b) => (b ? gcd(b, a % b) : a);
const frac = (a, b) => `${a}/${b}`;
const set = (arr) => '{' + arr.join(', ') + '}';
const LOG2 = (x) => Math.log(x) / Math.LN2;

function parseNum(str) {
  if (str == null) return NaN;
  let s = String(str).trim().replace(/\s/g, '').replace(/,/g, '.');
  if (!s) return NaN;
  let percent = false;
  if (s.endsWith('%')) {
    percent = true;
    s = s.slice(0, -1);
  }
  let v;
  if (/^-?\d*\.?\d+\/-?\d*\.?\d+$/.test(s)) {
    const [a, b] = s.split('/').map(Number);
    v = a / b;
  } else v = Number(s);
  if (percent) v /= 100;
  return v;
}
function parseItems(str) {
  return [
    ...new Set(
      String(str)
        .replace(/[{}()\[\]]/g, ' ')
        .split(/[,;]+/)
        .map(norm)
        .filter(Boolean)
    )
  ].sort();
}
function parseSets(str) {
  const out = [];
  const re = /\{([^}]*)\}/g;
  let m;
  while ((m = re.exec(String(str)))) {
    const it = parseItems(m[1]);
    if (it.length) out.push(it.join('|'));
  }
  return [...new Set(out)].sort();
}
function sameArr(a, b) {
  return a.length === b.length && a.every((x, i) => x === b[i]);
}
