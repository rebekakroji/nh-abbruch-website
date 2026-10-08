// Erzeugt die optimierten Web-Bilder aus den Originalen in /source-images
// nach /public/images und schreibt src/data/images.generated.json.
//
// Aufruf:  npm run images
//
// Die Originale bleiben unverändert. Schwarze Balken oben/unten (Bildschirmaufnahmen)
// werden abgeschnitten, das Logo wird nur von überflüssigem Weißraum befreit.

import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';

const SRC = 'source-images/';
const OUT = 'public/images/';
const WIDTHS = [640, 1000, 1600];

// Zeilen der schwarzen Balken (bei 942x2048 Bildschirmaufnahmen): Inhalt liegt ca. zwischen 186 und 1860
const BARS = { top: 190, height: 1666 };

const photos = [
  { key: 'rueckbau', file: 'Rückbau.jpg' },
  { key: 'bodenbelaege-entfernen', file: 'Bodenentfernen.jpg', crop: BARS },
  { key: 'demontage', file: 'Demontage.jpg', crop: BARS },
  { key: 'kuechenabbau', file: 'Küchenabbau.jpg', crop: BARS },
  { key: 'trennwand-entfernen', file: 'Trennwand-entfernen.jpg' },
  { key: 'entruempelung-vorher-nachher', file: 'Entrümpelung.jpg' },
  // Kleine Vorschaubilder für die drei neuen Leistungskarten (werden dort anstelle eines Icons verwendet).
  { key: 'trockenbau', file: 'Trockenbau.jpeg' },
  { key: 'bodenleger', file: 'Bodenleger.jpeg' },
  { key: 'pflasterarbeiten-galabau', file: 'Pflasterarbeiten & GaLaBau.jpeg' },
];

await mkdir(OUT, { recursive: true });
const manifest = { photos: {} };

for (const p of photos) {
  let img = sharp(SRC + p.file).rotate();
  const meta = await img.metadata();
  let width = meta.width;
  let height = meta.height;
  if (p.crop) {
    img = img.extract({ left: 0, top: p.crop.top, width, height: p.crop.height });
    height = p.crop.height;
  }
  const buffer = await img.toBuffer();
  const widths = [...WIDTHS.filter((w) => w < width), width];
  const variants = [];
  for (const w of widths) {
    const name = `${p.key}-${w}.webp`;
    await sharp(buffer).resize({ width: w, withoutEnlargement: true }).webp({ quality: 80 }).toFile(OUT + name);
    variants.push({ w, h: Math.round((w * height) / width), src: name });
  }
  manifest.photos[p.key] = { width, height, variants };
  console.log(p.key, variants.map((v) => v.w).join('/'));
}

// Logo: nur Weißraum entfernen, Design und Proportionen bleiben erhalten
// Der JPG-Hintergrund ist (254,254,254). Ein minimaler Gain macht ihn reinweiß, damit kein
// Kasten im weißen Header sichtbar ist; das Logo selbst wird dabei nicht verändert.
const trimmed = await sharp(SRC + 'nh-logo.jpg')
  .trim({ threshold: 12 })
  .linear(255 / 253, 0)
  .png()
  .toBuffer();
const tm = await sharp(trimmed).metadata();
const pad = 6;
const logoBuf = await sharp(trimmed)
  .extend({ top: pad, bottom: pad, left: pad, right: pad, background: '#ffffff' })
  .resize({ width: 900 })
  .webp({ quality: 92 })
  .toBuffer({ resolveWithObject: true });
await writeFile(OUT + 'nh-logo.webp', logoBuf.data);
manifest.logo = { src: 'nh-logo.webp', w: logoBuf.info.width, h: logoBuf.info.height };
console.log('logo', manifest.logo, 'trimmed from', tm.width, 'x', tm.height);

// Favicon / Apple-Touch-Icon: NH-Bildmarke (linker Teil des Logos)
const mark = await sharp(SRC + 'nh-logo.jpg')
  .extract({ left: 125, top: 20, width: 700, height: 560 })
  .extend({ top: 70, bottom: 70, background: '#ffffff' })
  .toBuffer();
await sharp(mark).resize(64, 64).png().toFile(OUT + 'favicon-64.png');
await sharp(mark).resize(180, 180).png().toFile(OUT + 'apple-touch-icon.png');

// Open-Graph-Bild 1200x630 (Logo auf Weiß)
const ogLogo = await sharp(trimmed).resize({ width: 980 }).toBuffer();
await sharp({ create: { width: 1200, height: 630, channels: 3, background: '#ffffff' } })
  .composite([{ input: ogLogo, gravity: 'center' }])
  .jpeg({ quality: 88 })
  .toFile(OUT + 'og-image.jpg');

await writeFile('src/data/images.generated.json', JSON.stringify(manifest, null, 2) + '\n');
console.log('Fertig.');
