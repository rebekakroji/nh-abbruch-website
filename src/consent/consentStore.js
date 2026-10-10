// Kleiner, framework-loser Store für die Cookie-Einwilligung. Wird über useSyncExternalStore in
// ConsentBanner.jsx gelesen und zusätzlich direkt vom Footer-Link (Öffnen der Einstellungen)
// verwendet, ohne dass Banner und Footer eine gemeinsame Elternkomponente brauchen.
//
// Die Nebenwirkungen (Consent Mode aktualisieren, GA4 ggf. nachladen) laufen zentral in apply(),
// damit sie unabhängig davon greifen, ob der Banner gerade überhaupt gerendert ist.
import { DEFAULT_CHOICE, loadStoredConsent, persistConsent } from '../data/consent.js';
import { initConsentDefaults, syncGoogleTags, updateGoogleConsent } from './gtag.js';

const stored = loadStoredConsent();

let state = stored
  ? { status: 'decided', statistics: stored.statistics, marketing: stored.marketing, bannerOpen: false }
  : { status: 'pending', ...DEFAULT_CHOICE, bannerOpen: true };

const listeners = new Set();

function emit() {
  listeners.forEach((listener) => listener());
}

export function subscribeConsent(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getConsentSnapshot() {
  return state;
}

// Consent-Mode-Standardwerte (alles "denied") so früh wie möglich setzen – vor jedem weiteren Tag,
// unabhängig davon, ob für diesen Besuch bereits eine Entscheidung gespeichert ist.
initConsentDefaults();

// Falls aus einem früheren Besuch bereits eine Entscheidung vorliegt, sofort anwenden (z. B. GA4
// und/oder Google Ads laden), ohne den Banner erneut zu zeigen.
if (state.status === 'decided') {
  updateGoogleConsent(state);
  syncGoogleTags(state);
}

function apply(next) {
  state = next;
  updateGoogleConsent(state);
  syncGoogleTags(state);
  emit();
}

export function acceptAll() {
  const saved = persistConsent({ statistics: true, marketing: true });
  apply({ status: 'decided', statistics: saved.statistics, marketing: saved.marketing, bannerOpen: false });
}

export function rejectAll() {
  const saved = persistConsent({ statistics: false, marketing: false });
  apply({ status: 'decided', statistics: saved.statistics, marketing: saved.marketing, bannerOpen: false });
}

export function saveChoice({ statistics, marketing }) {
  const saved = persistConsent({ statistics, marketing });
  apply({ status: 'decided', statistics: saved.statistics, marketing: saved.marketing, bannerOpen: false });
}

// Vom "Datenschutz-Einstellungen"-Link im Footer aufgerufen, um den Banner erneut zu öffnen.
export function openConsentSettings() {
  state = { ...state, bannerOpen: true };
  emit();
}

// Schließen ohne neue Entscheidung ist nur erlaubt, wenn bereits einmal entschieden wurde
// (Opt-in-Pflicht: beim allerersten Aufruf bleibt der Banner sichtbar, bis eine Wahl getroffen wurde).
export function closeConsentSettings() {
  if (state.status !== 'decided') return;
  state = { ...state, bannerOpen: false };
  emit();
}
