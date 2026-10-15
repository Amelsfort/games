/* =====================================================================
   INSTELLINGEN voor de startpagina en alle spellen.
   Instellingen voor één spel (aantal vragen, monstersnelheid, …) staan
   bovenin dat spel; de woordenlijsten staan in wordlists.js.
   ===================================================================== */

/* Bezoeken en scores bijhouden in je Google Sheet: de /exec-link van je
   Apps Script. Laat leeg ('') om niets bij te houden. */
const LOG_URL = 'https://script.google.com/macros/s/AKfycbwhsoE5YmSI8VH3hGZWrVssg2E4-1nP4ra5avCC7Hq3ytZ0p-3ZS7oY9imA7EJ5hinh/exec';

/* Welk thema? 'auto' kiest op datum (zie themes.js), of zet er vast een,
   bijv. 'winter' of 'halloween'. Een thema dat iemand op de startpagina
   kiest, of een link met ?thema=…, gaat hier altijd voor. */
const STANDAARD_THEMA = 'auto';


/* ---------- hieronder hoef je niets aan te passen ---------- */

// sends one line to the sheet: e = event, d = device, plus the game's own fields
function logEvent(e, extra) {
  if (!LOG_URL) return;
  const ua = navigator.userAgent;
  const d = /OculusBrowser|Quest/i.test(ua) ? 'Quest' : /Mobi|Android|iPhone|iPad/i.test(ua) ? 'Mobiel' : 'Computer';
  const q = new URLSearchParams(Object.assign({ e, d }, extra || {}));
  fetch(LOG_URL + '?' + q, { mode: 'no-cors' }).catch(() => {});
}
