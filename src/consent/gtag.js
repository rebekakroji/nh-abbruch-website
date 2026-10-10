// Google Consent Mode v2 + bedingtes Laden von Google Analytics 4 und Google Ads über ein
// gemeinsames gtag.js-Skript und einen gemeinsamen dataLayer.
//
// Reihenfolge ist hier entscheidend: initConsentDefaults() MUSS laufen, bevor irgendein Google-Tag
// existiert, und setzt alle vier Signale auf "denied". Erst wenn eine Einwilligung vorliegt, wird
// updateGoogleConsent() mit "granted" aufgerufen bzw. das gemeinsame Skript überhaupt erst
// nachgeladen (syncGoogleTags). Ohne jede Einwilligung wird nie eine Verbindung zu
// googletagmanager.com aufgebaut – es fließen also keine Daten, bevor zugestimmt wurde.
//
// GA4 (Statistik) und Google Ads (Marketing) sind getrennte Einwilligungskategorien: Das Skript
// wird geladen, sobald für mindestens eine der beiden Kategorien zugestimmt wurde; die jeweilige
// gtag('config', …)-Aktivierung erfolgt aber unabhängig je nach tatsächlich erteilter Kategorie.
// Es wird nie ein zweites Skript nachgeladen (scriptRequested-Schutz), und es wird keine
// Conversion-ID/-Label erzeugt, da keine übergeben wurde.
import { GA_MEASUREMENT_ID, GOOGLE_ADS_ID } from '../data/site.js';

let scriptRequested = false;
let ga4Configured = false;
let adsConfigured = false;

function gtag() {
  // eslint-disable-next-line prefer-rest-params
  window.dataLayer.push(arguments);
}

function ensureDataLayer() {
  window.dataLayer = window.dataLayer || [];
}

// Muss so früh wie möglich beim Laden jeder Seite laufen (siehe consentStore.js), bevor irgendein
// Google-Tag eingebunden wird.
export function initConsentDefaults() {
  ensureDataLayer();
  gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    wait_for_update: 500,
  });
}

// Meldet eine getroffene Entscheidung an Google Consent Mode. Wird bei jeder Änderung der
// Einwilligung aufgerufen (Banner-Entscheidung oder bereits gespeicherte Wahl beim Seitenaufruf).
export function updateGoogleConsent({ statistics, marketing }) {
  ensureDataLayer();
  gtag('consent', 'update', {
    analytics_storage: statistics ? 'granted' : 'denied',
    ad_storage: marketing ? 'granted' : 'denied',
    ad_user_data: marketing ? 'granted' : 'denied',
    ad_personalization: marketing ? 'granted' : 'denied',
  });
}

function loadScriptOnce() {
  if (scriptRequested) return;
  scriptRequested = true;
  ensureDataLayer();
  const script = document.createElement('script');
  script.async = true;
  // Die ID im Skript-URL bestimmt nur, welche Konfiguration Google beim Laden ggf. automatisch
  // nachschlägt; zusätzliche gtag('config', …)-Aufrufe für weitere IDs sind damit kompatibel und
  // nutzen dasselbe geladene Skript (siehe Google-Dokumentation zu mehreren Tags über ein gtag.js).
  const primaryId = GA_MEASUREMENT_ID || GOOGLE_ADS_ID;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(primaryId)}`;
  document.head.appendChild(script);
  gtag('js', new Date());
}

// Aktiviert GA4 und/oder Google Ads entsprechend der aktuellen Einwilligung. Lädt das gemeinsame
// Skript höchstens einmal und aktiviert jede konfigurierte ID genau einmal, sobald die jeweils
// zugehörige Einwilligungskategorie vorliegt. Ohne jede Einwilligung bzw. ohne konfigurierte ID
// passiert nichts – es wird keine Verbindung zu Google aufgebaut.
export function syncGoogleTags({ statistics, marketing }) {
  const wantsAnalytics = statistics && GA_MEASUREMENT_ID && !ga4Configured;
  const wantsAds = marketing && GOOGLE_ADS_ID && !adsConfigured;
  if (!wantsAnalytics && !wantsAds) return;

  loadScriptOnce();

  if (wantsAnalytics) {
    ga4Configured = true;
    gtag('config', GA_MEASUREMENT_ID);
  }
  if (wantsAds) {
    adsConfigured = true;
    gtag('config', GOOGLE_ADS_ID);
  }
}
