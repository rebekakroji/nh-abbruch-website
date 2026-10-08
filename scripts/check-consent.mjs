// Verhindert, dass die Google-Analytics-Einbindung und die Consent-Mode-Logik unbemerkt
// auseinanderlaufen:
//  1. Prüft das Format von VITE_GA_MEASUREMENT_ID, falls gesetzt (erwartet "G-XXXXXXXXXX").
//  2. Durchsucht den gebauten Code (dist/assets/*.js) und bricht den Build ab, wenn GA4-Ladecode
//     gefunden wird, OHNE dass auch die Consent-Mode-"denied"-Standardwerte darin enthalten sind.
//     Das stellt sicher, dass ein künftiger Refactor nicht versehentlich das Consent-Gating aus dem
//     Bundle entfernen kann, ohne dass der Build fehlschlägt.
//
// Wird nach jedem Build automatisch ausgeführt (siehe package.json, "build"-Skript).

import { loadEnv } from 'vite';
import { readdir, readFile } from 'node:fs/promises';

const env = loadEnv('production', process.cwd(), 'VITE_');
const gaId = (env.VITE_GA_MEASUREMENT_ID || '').trim();

let failed = false;
function fail(message) {
  console.error(`check-consent: FEHLER – ${message}`);
  failed = true;
}

if (gaId && !/^G-[A-Z0-9]{6,15}$/.test(gaId)) {
  fail(
    `VITE_GA_MEASUREMENT_ID "${gaId}" sieht nicht wie eine gültige GA4-Measurement-ID aus ` +
      '(erwartetes Format: "G-" gefolgt von 6–15 Großbuchstaben/Ziffern, z. B. "G-9KNC71PL9R").',
  );
}

if (!gaId) {
  console.warn(
    'check-consent: Hinweis – VITE_GA_MEASUREMENT_ID ist nicht gesetzt. Google Analytics 4 bleibt deaktiviert ' +
      '(siehe README, Abschnitt "Google Analytics & Google Ads").',
  );
}

let jsFiles = [];
try {
  jsFiles = (await readdir('dist/assets')).filter((f) => f.endsWith('.js'));
} catch {
  fail('dist/assets wurde nicht gefunden. Bitte zuerst "vite build" ausführen.');
}

let gaLoaderFound = false;
let consentDefaultFound = false;
for (const file of jsFiles) {
  const code = await readFile(`dist/assets/${file}`, 'utf8');
  if (code.includes('googletagmanager.com/gtag/js')) gaLoaderFound = true;
  if (code.includes('analytics_storage') && code.includes('denied')) consentDefaultFound = true;
}

if (!consentDefaultFound) {
  fail(
    'Die Consent-Mode-Standardwerte ("denied" für analytics_storage u. a.) wurden im gebauten Code nicht gefunden. ' +
      'Das Consent-Gating (src/consent/gtag.js) scheint zu fehlen oder wurde verändert/entfernt.',
  );
}

if (gaLoaderFound && !consentDefaultFound) {
  fail(
    'GA4-Ladecode (googletagmanager.com/gtag/js) wurde im Build gefunden, aber keine Consent-Mode-Standardwerte. ' +
      'Damit könnte Tracking ohne vorherige Einwilligung laden – Build wird abgebrochen.',
  );
}

if (gaId && !gaLoaderFound) {
  fail(
    'VITE_GA_MEASUREMENT_ID ist gesetzt, aber im Build wurde kein GA4-Ladecode gefunden. ' +
      'Prüfen Sie, ob src/consent/gtag.js noch eingebunden ist (src/mount.jsx).',
  );
}

if (failed) {
  process.exit(1);
}

console.log(
  `check-consent: OK – Consent-Mode-Standardwerte vorhanden; GA4 ${
    gaId ? `konfiguriert (${gaId})` : 'nicht konfiguriert'
  }.`,
);
