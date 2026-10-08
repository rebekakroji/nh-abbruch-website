// Speicherung der Cookie-Einwilligung im Browser (localStorage), damit die Wahl über alle drei
// Einstiegsseiten (index.html, impressum.html, datenschutz.html) und künftige Besuche hinweg gilt.

export const CONSENT_STORAGE_KEY = 'nh-cookie-consent';
export const CONSENT_VERSION = 1;

// "necessary" ist immer true und wird nicht einzeln gespeichert. Das Speichern der Wahl selbst
// ist technisch notwendig (§ 25 Abs. 2 Nr. 2 TTDSG) und erfordert daher selbst keine Einwilligung.
export const DEFAULT_CHOICE = { statistics: false, marketing: false };

export function loadStoredConsent() {
  try {
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed.version !== CONSENT_VERSION) return null;
    return { statistics: !!parsed.statistics, marketing: !!parsed.marketing, savedAt: parsed.savedAt || null };
  } catch {
    // z. B. privater Modus ohne localStorage, oder beschädigter Eintrag: Banner wird dann erneut angezeigt.
    return null;
  }
}

export function persistConsent({ statistics, marketing }) {
  const value = {
    version: CONSENT_VERSION,
    statistics: !!statistics,
    marketing: !!marketing,
    savedAt: new Date().toISOString(),
  };
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(value));
  } catch {
    // Speichern fehlgeschlagen (z. B. privater Modus): Die Wahl gilt nur für die aktuelle Seite,
    // der Banner erscheint beim nächsten Aufruf erneut.
  }
  return value;
}
