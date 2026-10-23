/* =====================================================================
   SETTINGS for the home page and all games.
   Settings for a single game (number of questions, monster speed, …) are
   at the top of that game; the word lists are in wordlists.js.
   ===================================================================== */

/* Log visits and scores to your Google Sheet: the /exec link of your
   Apps Script. Leave empty ('') to log nothing. */
const LOG_URL = 'https://script.google.com/macros/s/AKfycbwhsoE5YmSI8VH3hGZWrVssg2E4-1nP4ra5avCC7Hq3ytZ0p-3ZS7oY9imA7EJ5hinh/exec';

/* Which theme? 'auto' picks by date (see themes.js), or set a fixed one,
   e.g. 'winter' or 'halloween'. A theme someone picks on the home page,
   or a link with ?theme=…, always wins over this. */
const DEFAULT_THEME = 'auto';


/* ---------- nothing to change below this line ---------- */

// sends one line to the sheet: e = event, d = device, plus the game's own fields
// (event names, field names and values like 'Mobiel' are the sheet's columns and data: keep them)
function logEvent(e, extra) {
  if (!LOG_URL) return;
  const ua = navigator.userAgent;
  const d = /OculusBrowser|Quest/i.test(ua) ? 'Quest' : /Mobi|Android|iPhone|iPad/i.test(ua) ? 'Mobiel' : 'Computer';
  const q = new URLSearchParams(Object.assign({ e, d }, extra || {}));
  fetch(LOG_URL + '?' + q, { mode: 'no-cors' }).catch(() => {});
}
