import { useEffect, useState, useSyncExternalStore } from 'react';
import { ShieldCheck } from 'lucide-react';
import {
  acceptAll,
  closeConsentSettings,
  getConsentSnapshot,
  rejectAll,
  saveChoice,
  subscribeConsent,
} from './consentStore.js';
import { BASE } from '../data/site.js';

// Schlanke, nicht blockierende Leiste am unteren Bildschirmrand (kein Vollbild-Overlay):
// Besucher können die Seite weiterlesen, ohne eine Wahl treffen zu müssen. Getrackt wird trotzdem
// erst nach aktiver Einwilligung – siehe consentStore.js / gtag.js.
export default function ConsentBanner() {
  const consent = useSyncExternalStore(subscribeConsent, getConsentSnapshot);
  const [expanded, setExpanded] = useState(false);
  const [draft, setDraft] = useState({ statistics: consent.statistics, marketing: consent.marketing });

  // Entwurf zurücksetzen und wieder mit der kompakten Ansicht starten, sobald der Banner neu
  // geöffnet wird (Erstbesuch oder über den Footer-Link "Datenschutz-Einstellungen").
  useEffect(() => {
    if (consent.bannerOpen) {
      setDraft({ statistics: consent.statistics, marketing: consent.marketing });
      setExpanded(false);
    }
  }, [consent.bannerOpen, consent.statistics, consent.marketing]);

  if (!consent.bannerOpen) return null;

  return (
    <aside className="consent-banner" role="region" aria-label="Cookie-Einstellungen">
      <div className="consent-banner__inner">
        <div className="consent-banner__text">
          <p className="consent-banner__title">
            <ShieldCheck size={18} aria-hidden="true" />
            Ihre Privatsphäre ist uns wichtig
          </p>
          <p>
            Wir verwenden technisch notwendige Cookies, damit diese Website funktioniert. Mit Ihrer Einwilligung
            nutzen wir zusätzlich Statistik- und Marketing-Tools (Google Analytics, Google Ads), um die Website zu
            verbessern. Details in unserer <a href={`${BASE}datenschutz.html`}>Datenschutzerklärung</a>. Sie können
            Ihre Wahl jederzeit über „Datenschutz-Einstellungen“ im Footer ändern.
          </p>
        </div>

        {expanded && (
          <div className="consent-banner__options">
            <div className="field--check consent-banner__option">
              <input id="consent-necessary" type="checkbox" checked readOnly disabled />
              <label htmlFor="consent-necessary">
                <strong>Notwendig</strong> – immer aktiv. Erforderlich für den Betrieb der Website (z. B. Speichern
                dieser Auswahl).
              </label>
            </div>
            <div className="field--check consent-banner__option">
              <input
                id="consent-statistics"
                type="checkbox"
                checked={draft.statistics}
                onChange={(e) => setDraft((d) => ({ ...d, statistics: e.target.checked }))}
              />
              <label htmlFor="consent-statistics">
                <strong>Statistik</strong> – hilft uns zu verstehen, wie die Website genutzt wird (Google Analytics).
              </label>
            </div>
            <div className="field--check consent-banner__option">
              <input
                id="consent-marketing"
                type="checkbox"
                checked={draft.marketing}
                onChange={(e) => setDraft((d) => ({ ...d, marketing: e.target.checked }))}
              />
              <label htmlFor="consent-marketing">
                <strong>Marketing</strong> – ermöglicht die Erfolgsmessung von Anzeigen (Google Ads).
              </label>
            </div>
          </div>
        )}

        <div className="consent-banner__actions">
          {expanded ? (
            <button type="button" className="btn btn--primary" onClick={() => saveChoice(draft)}>
              Auswahl speichern
            </button>
          ) : (
            <>
              <button type="button" className="btn btn--outline-light" onClick={rejectAll}>
                Nur notwendige
              </button>
              <button type="button" className="consent-banner__link" onClick={() => setExpanded(true)}>
                Einstellungen
              </button>
              <button type="button" className="btn btn--primary" onClick={acceptAll}>
                Alle akzeptieren
              </button>
            </>
          )}
          {consent.status === 'decided' && (
            <button
              type="button"
              className="consent-banner__close"
              onClick={closeConsentSettings}
              aria-label="Schließen, ohne die Auswahl zu ändern"
            >
              Schließen
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}
