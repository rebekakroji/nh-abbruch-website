import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

// Warnt beim Produktions-Build, wenn kein Formular-Endpunkt gesetzt ist
// (dann fällt das Kontaktformular auf mailto: zurück). Berücksichtigt .env und Umgebungsvariablen.
const formEndpointWarning = () => {
  let endpoint = '';
  return {
    name: 'form-endpoint-warning',
    apply: 'build',
    configResolved(config) {
      endpoint = config.env.VITE_FORM_ENDPOINT || '';
    },
    buildStart() {
      if (!endpoint) {
        this.warn(
          'VITE_FORM_ENDPOINT ist nicht gesetzt: Das Kontaktformular öffnet nur das E-Mail-Programm (mailto). ' +
            'Siehe README, Abschnitt "Kontaktformular".',
        );
      }
    },
  };
};

export default defineConfig({
  // Relativer Basispfad: derselbe Build funktioniert unter https://nhabbruch.de/ (Domain-Root) UND unter
  // https://<user>.github.io/<repo>/ (Projekt-URL). Alle drei Seiten liegen im selben Ordner, daher
  // lösen sich "./assets/..." und "./images/..." immer korrekt auf. Nur bei Bedarf über VITE_BASE überschreiben.
  base: process.env.VITE_BASE || './',
  plugins: [react(), formEndpointWarning()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        impressum: resolve(import.meta.dirname, 'impressum.html'),
        datenschutz: resolve(import.meta.dirname, 'datenschutz.html'),
      },
    },
  },
});
