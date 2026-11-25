/* =====================================================================
   PROGRESS for all games.

   Remembers the last results on this device (localStorage, one key per
   game + list/level + mode, starting with 'progress-'), so the end screen
   can say "8 seconden sneller dan vorige keer!" and show a small chart of
   the last games. Nothing is sent anywhere.
   ===================================================================== */
const PROGRESS_KEEP = 10;   // how many results are kept per game/list

// a result: good = right the first time, n = number of questions,
// secs = time in seconds (null when the game has no timer), score = points
function progressBetter(a, b) {
  const ra = a.good / Math.max(1, a.n), rb = b.good / Math.max(1, b.n);
  if (ra !== rb) return ra > rb;                                   // more right always wins
  if (a.secs != null && b.secs != null) return a.secs < b.secs;    // then faster
  return a.score > b.score;                                        // no timer: more points
}

// stores a finished game and returns { history, line }; line is null when this
// game was not better than the last one (the game then shows its usual encouragement)
function recordResult(key, r) {
  const k = 'progress-' + key;
  let list = [];
  try { list = JSON.parse(localStorage.getItem(k) || '[]'); if (!Array.isArray(list)) list = []; } catch (e) { list = []; }
  list.push({ good: r.good | 0, n: Math.max(1, r.n | 0), secs: r.secs == null ? null : Math.round(r.secs), score: r.score | 0, at: Date.now() });
  list = list.slice(-PROGRESS_KEEP);
  try { localStorage.setItem(k, JSON.stringify(list)); } catch (e) {}
  return { history: list, line: progressLine(list) };
}

function progressLine(list) {
  const cur = list[list.length - 1], prev = list[list.length - 2];
  if (!prev) return 'Je eerste keer gespeeld! 🌱';
  let run = 0;
  for (let i = list.length - 1; i > 0 && progressBetter(list[i], list[i - 1]); i--) run++;
  const extra = run >= 2 ? `  🔥 ${run} keer op rij beter!` : '';
  const rc = cur.good / cur.n, rp = prev.good / prev.n;
  if (rc > rp) {
    const d = cur.good - prev.good;
    return (cur.n === prev.n && d > 0 ? `${d} meer goed dan vorige keer! 🎯` : 'Meer goed dan vorige keer! 🎯') + extra;
  }
  if (rc < rp) return null;
  if (cur.secs != null && prev.secs != null) {
    const d = prev.secs - cur.secs;
    if (d > 0) return `${d} ${d === 1 ? 'seconde' : 'seconden'} sneller dan vorige keer! ⚡` + extra;
    return d === 0 ? 'Precies even snel als vorige keer! 👍' : null;
  }
  const d = cur.score - prev.score;
  if (d > 0) return `${d} punten meer dan vorige keer! ⭐` + extra;
  return d === 0 ? 'Net zo goed als vorige keer! 👍' : null;
}

// a small bar chart of the last games inside the box x, y, w, h of a canvas.
// Taller = faster (or more points without a timer); the colour shows how many were right
// first time: green = all, yellow = most, pink = fewer. The newest bar has a white edge.
function drawProgress(ctx, x, y, w, h, history, look) {
  if (!history || history.length < 2) return;
  const font = look.font, timed = history.every(r => r.secs != null);
  const size = Math.round(h * 0.13);
  ctx.save();
  ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';
  ctx.fillStyle = look.muted; ctx.font = `800 ${size}px ${font}`;
  ctx.fillText('📈 Vorige keren', x + w / 2, y + size);
  const top = y + size * 1.6, bottom = y + h - size * 1.3, slot = w / PROGRESS_KEEP, bw = slot * 0.7;
  const vals = history.map(r => timed ? -r.secs : r.score), hi = Math.max(...vals), lo = Math.min(...vals);
  const x0 = x + (w - slot * history.length) / 2;
  ctx.strokeStyle = look.line; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(x, bottom + 1); ctx.lineTo(x + w, bottom + 1); ctx.stroke();
  history.forEach((r, i) => {
    const frac = hi === lo ? 1 : 0.25 + 0.75 * (vals[i] - lo) / (hi - lo), ratio = r.good / r.n;
    const bh = (bottom - top) * frac, bx = x0 + i * slot + (slot - bw) / 2;
    ctx.fillStyle = ratio >= 1 ? '#46e591' : ratio >= 0.75 ? look.accent : '#ff9a9d';
    ctx.fillRect(bx, bottom - bh, bw, bh);
    if (i === history.length - 1) { ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 3; ctx.strokeRect(bx, bottom - bh, bw, bh); }
  });
  ctx.fillStyle = look.muted; ctx.font = `700 ${Math.round(size * 0.85)}px ${font}`;
  ctx.fillText(timed ? 'hoger = sneller' : 'hoger = meer punten', x + w / 2, y + h);
  ctx.restore();
}
