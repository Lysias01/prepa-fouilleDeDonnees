function toast(msg) {
  const t = h(`<div class="toast" role="status">${msg}</div>`);
  document.body.append(t);
  setTimeout(() => t.remove(), 3000);
}

/* ===== Tableaux génériques ===== */
function table(head, rows, opt = {}) {
  const th = head.map((x, i) => `<th class="${i === 0 && opt.leftFirst !== false ? 'l' : ''}">${x}</th>`).join('');
  const tr = rows
    .map((r) => {
      const cls = r._cls ? ` class="${r._cls}"` : '';
      const cells = (r.cells || r)
        .map((c, i) => {
          if (c && typeof c === 'object')
            return `<td class="${c.cls || ''}${i === 0 && opt.leftFirst !== false ? ' l' : ''}">${c.v}</td>`;
          return `<td class="${i === 0 && opt.leftFirst !== false ? 'l' : ''}">${c}</td>`;
        })
        .join('');
      return `<tr${cls}>${cells}</tr>`;
    })
    .join('');
  return `<div class="tbl"><table><thead><tr>${th}</tr></thead><tbody>${tr}</tbody></table></div>`;
}
const stepsHTML = (steps) =>
  steps
    .map(
      (s, i) =>
        `<div class="stack"><h3><span class="mono" style="color:var(--margin)">${i + 1}.</span> ${s.t}</h3>${s.h}</div>`
    )
    .join('<hr style="border:0;border-top:1px dashed var(--line);width:100%">');
const transTable = (T, prefix = 'T') =>
  table(
    ['N°', 'Items'],
    T.map((t, i) => [prefix + (i + 1), t.join(', ')])
  );
const ptsTable = (P) =>
  table(
    ['Point', 'V1 (x)', 'V2 (y)'],
    P.map((p) => [p.n, p.c[0], p.c[1]])
  );
const LOGTABLE =
  '<div class="formula">log₂(1/2) = −1     log₂(1/4) = −2     log₂(3/4) ≈ −0,415\nlog₂(1/3) ≈ −1,585  log₂(2/3) ≈ −0,585\nlog₂(1/5) ≈ −2,322  log₂(4/5) ≈ −0,322  log₂(2/5) ≈ −1,322  log₂(3/5) ≈ −0,737</div>';

/* ===== Listes par chapitre (fiches, questions, méthodes, exercices) ===== */
const chStyle = (id) => `--ch:var(--ch-${id})`;
const ring = (pct, label) =>
  `<span class="ring"><svg viewBox="0 0 36 36" aria-hidden="true"><circle cx="18" cy="18" r="15.9"/><circle class="fg" cx="18" cy="18" r="15.9" pathLength="100" stroke-dasharray="${pct} 100"/></svg><b>${label}</b></span>`;
const chapterChips = (active) =>
  `<div class="chips" role="group" aria-label="Chapitre"><button class="chip" data-ch="all" aria-pressed="${active === 'all'}">Tous</button>${CHAPTERS.map((c) => `<button class="chip" style="${chStyle(c.id)}" data-ch="${c.id}" aria-pressed="${active === c.id}">${c.short}</button>`).join('')}</div>`;
const chapterSections = (items, itemHTML) =>
  CHAPTERS.filter((c) => items.some((x) => x.ch === c.id))
    .map(
      (c) =>
        `<section class="stack" style="${chStyle(c.id)}"><h2 class="ch-title">${c.name}</h2><div class="grid g2">${items
          .filter((x) => x.ch === c.id)
          .map(itemHTML)
          .join('')}</div></section>`
    )
    .join('');
