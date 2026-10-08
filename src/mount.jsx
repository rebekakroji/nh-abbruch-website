// Setzt die Google-Consent-Mode-Standardwerte (alles "denied"), bevor irgendetwas anderes lädt.
// Dieser Import muss als Erstes stehen, da ES-Module ihre Top-Level-Anweisungen in Importreihenfolge
// ausführen (siehe src/consent/consentStore.js).
import './consent/consentStore.js';

import '@fontsource-variable/montserrat/wght.css';
import '@fontsource-variable/inter/wght.css';
import './styles/index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import ConsentBanner from './consent/ConsentBanner.jsx';

// mount() wird von allen drei Einstiegspunkten aufgerufen (main.jsx, impressum.jsx, datenschutz.jsx),
// daher reicht dieser eine Ort, um den Cookie-Banner auf jeder Seite verfügbar zu machen.
export function mount(Page) {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <Page />
      <ConsentBanner />
    </StrictMode>,
  );
}
