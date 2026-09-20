import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

// Eigene Domain (nhabbruch.de) => die Seite liegt im Root, daher base: '/'.
// Falls die Seite stattdessen unter https://<user>.github.io/<repo>/ ausgeliefert wird,
// beim Build VITE_BASE=/<repo>/ setzen (siehe README).
// Warnt beim Produktions-Build, wenn kein Formular-Endpunkt gesetzt ist
// (dann fällt das Kontaktformular auf mailto: zurück).
const formEndpointWarning = () => ({
  name: 'form-endpoint-warning',
  apply: 'build',
  buildStart() {
    if (!process.env.VITE_FORM_ENDPOINT) {
      this.warn(
        'VITE_FORM_ENDPOINT ist nicht gesetzt: Das Kontaktformular öffnet nur das E-Mail-Programm (mailto). ' +
          'Siehe README, Abschnitt "Kontaktformular".',
      );
    }
  },
});

export default defineConfig({
  base: process.env.VITE_BASE || '/',
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
