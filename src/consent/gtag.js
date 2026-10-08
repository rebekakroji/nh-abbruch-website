// Google Consent Mode v2 + bedingtes Laden von Google Analytics 4 (gtag.js).
//
// Reihenfolge ist hier entscheidend: initConsentDefaults() MUSS laufen, bevor irgendein Google-Tag
// existiert, und setzt alle vier Signale auf "denied". Erst wenn eine Einwilligung vorliegt, wird
// updateGoogleConsent() mit "granted" aufgerufen bzw. das GA4-Skript überhaupt erst nachgeladen
// (loadGoogleTagIfConsented). Ohne Statistik-Einwilligung wird nie eine Verbindung zu
// googletagmanager.com aufgebaut – es fließen also keine Daten, bevor zugestimmt wurde.
import { GA_MEASUREMENT_ID } from '../data/site.js';

let scriptRequested = false;

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

// Lädt das GA4-Skript erst, wenn (a) eine Measurement-ID konfiguriert ist UND (b) für die
// Statistik-Kategorie eingewilligt wurde. Ohne Einwilligung wird kein Request an Google gesendet.
export function loadGoogleTagIfConsented(statistics) {
  if (!statistics || !GA_MEASUREMENT_ID || scriptRequested) return;
  scriptRequested = true;

  ensureDataLayer();
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_MEASUREMENT_ID)}`;
  document.head.appendChild(script);

  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID);
}
