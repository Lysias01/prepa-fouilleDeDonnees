/* ===================== Maîtrise ===================== */
function mastery(ch) {
  const qs = QUESTIONS.filter((q) => !ch || q.ch === ch);
  const cs = CARDS.filter((c) => !ch || c.ch === ch);
  let s = 0;
  qs.forEach((q) => {
    const r = store.data.q[q.id];
    if (r) s += r.r === 'ok' ? 1 : r.r === 'mid' ? 0.5 : 0;
  });
  cs.forEach((c) => {
    if (store.data.cards[c.id] === 'ok') s += 1;
  });
  const tot = qs.length + cs.length;
  return tot ? s / tot : 0;
}
function seenCount() {
  return Object.keys(store.data.q).length;
}
