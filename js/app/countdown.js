/* ===================== Compte à rebours ===================== */
const EXAM_DATE = new Date('2026-11-02T18:00:00Z');

function countdownText() {
  const ms = EXAM_DATE - new Date();
  if (ms <= 0) return 'Devoir : bonne chance !';
  const hTot = Math.floor(ms / 3600000),
    m = Math.floor((ms % 3600000) / 60000);
  const d = Math.floor(hTot / 24),
    hh = hTot % 24;
  return 'Devoir dans ' + (d ? d + ' j ' : '') + hh + ' h ' + String(m).padStart(2, '0');
}

function startCountdown() {
  const cd = $('#cd');
  const upd = () => {
    cd.textContent = countdownText();
    const b = $('#bigclock');
    if (b) b.textContent = countdownText();
  };
  upd();
  setInterval(upd, 30000);
}
