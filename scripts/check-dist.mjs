// Schlägt fehl, wenn dist/*.html Pfade enthält, die nur unter einer bestimmten URL funktionieren
// (wurzel-absolute Pfade wie "/assets/..." oder "/repo/assets/..."). Genau das hatte die Seite leer gemacht.
// Wird übersprungen, wenn absichtlich ein absoluter Basispfad über VITE_BASE gesetzt wurde.

import { readdir, readFile, access } from 'node:fs/promises';

if (process.env.VITE_BASE) {
  console.log(`check-dist: übersprungen (VITE_BASE=${process.env.VITE_BASE})`);
  process.exit(0);
}

const pages = (await readdir('dist')).filter((f) => f.endsWith('.html'));
const problems = [];

for (const page of pages) {
  const html = await readFile(`dist/${page}`, 'utf8');
  const refs = [...html.matchAll(/\b(?:src|href)="([^"]+)"/g)].map((m) => m[1]);
  for (const ref of refs) {
    if (/^(https?:|mailto:|tel:|data:|#)/.test(ref)) continue;
    if (ref.startsWith('/')) {
      problems.push(`${page}: wurzel-absoluter Pfad "${ref}"`);
      continue;
    }
    try {
      await access(`dist/${ref}`);
    } catch {
      problems.push(`${page}: Datei fehlt in dist/: "${ref}"`);
    }
  }
}

if (problems.length) {
  console.error('check-dist: FEHLER\n' + problems.map((p) => ' - ' + p).join('\n'));
  process.exit(1);
}
console.log(`check-dist: OK (${pages.length} Seiten, alle Pfade relativ und vorhanden)`);
