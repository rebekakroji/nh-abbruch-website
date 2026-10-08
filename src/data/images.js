import manifest from './images.generated.json';
import { BASE } from './site.js';

// Bilddaten stammen aus `npm run images` (scripts/optimize-images.mjs).
export const asset = (name) => `${BASE}images/${name}`;

export const logo = {
  src: asset(manifest.logo.src),
  width: manifest.logo.w,
  height: manifest.logo.h,
};

export function photo(key) {
  const p = manifest.photos[key];
  if (!p) throw new Error(`Unbekanntes Bild: ${key}`);
  const v = p.variants;
  const mid = v[Math.min(1, v.length - 1)];
  return {
    src: asset(mid.src),
    srcSet: v.map((x) => `${asset(x.src)} ${x.w}w`).join(', '),
    full: asset(v[v.length - 1].src),
    width: mid.w,
    height: mid.h,
  };
}

export const ALT = {
  rueckbau:
    'Zurückgebauter Raum im Dachgeschoss mit freiliegenden Holzbalken, Dachfenster, abgeschlagenen Wandfliesen und offenen Leitungen',
  'bodenbelaege-entfernen':
    'Wohnbereich nach dem Entfernen des Bodenbelags, auf dem Boden sind Kleberreste sichtbar',
  demontage: 'Türöffnung in einer weißen Wand mit freigelegten Ziegelkanten und Blick in den Flur',
  kuechenabbau:
    'Abgebaute Küche mit freigelegten Wandflächen, offenen Anschlüssen und Blick durch die Tür in den Raum',
  'trennwand-entfernen':
    'Durchbruch einer entfernten Trennwand mit sichtbaren Ziegelkanten und Blick in einen hellen Raum',
  'entruempelung-vorher-nachher':
    'Vorher-nachher-Vergleich einer Entrümpelung: links ein Zimmer voller Müll und Flaschen, rechts dasselbe Zimmer leer mit Holzboden',
  trockenbau:
    'Flur mit neu errichteten Trockenbauwänden, sichtbaren Holzständern in den Türöffnungen und abgedecktem Boden',
  bodenleger: 'Wohnraum mit frisch verlegtem Laminatboden, Blick zur Balkontür und Heizkörper an der Wand',
  'pflasterarbeiten-galabau':
    'Gepflasterter Weg im Fischgrätmuster mit Einfassung, angelegt im Rahmen von Garten- und Landschaftsbauarbeiten',
};
