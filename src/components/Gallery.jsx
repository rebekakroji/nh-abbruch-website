import { useState } from 'react';
import { Maximize2 } from 'lucide-react';
import Reveal from './Reveal.jsx';
import Lightbox from './Lightbox.jsx';
import { ALT, photo } from '../data/images.js';

// Beschriftung = Leistungskategorie passend zum Bildinhalt, keine Projektangaben.
const ITEMS = [
  { key: 'entruempelung-vorher-nachher', label: 'Entrümpelung', wide: true },
  { key: 'rueckbau', label: 'Rückbau' },
  { key: 'bodenbelaege-entfernen', label: 'Bodenbeläge entfernen' },
  { key: 'kuechenabbau', label: 'Küchenabbau' },
  { key: 'demontage', label: 'Demontage' },
  { key: 'trockenbau', label: 'Trockenbau' },
  { key: 'bodenleger', label: 'Bodenleger' },
  { key: 'pflasterarbeiten-galabau', label: 'Pflasterarbeiten & GaLaBau' },
].map((item) => ({ ...item, ...photo(item.key), alt: ALT[item.key] }));

export default function Gallery() {
  const [current, setCurrent] = useState(null);

  return (
    <section id="referenzen" className="section section--dark" aria-labelledby="referenzen-title">
      <div className="container">
        <Reveal className="section__head">
          <p className="eyebrow">Referenzen</p>
          <h2 id="referenzen-title">Einblicke in unsere Arbeit</h2>
          <p className="section__lead">
            Eine Auswahl aus unseren Einsätzen – von der Entrümpelung bis zum Rückbau. Klicken Sie auf ein Bild, um es
            größer zu sehen.
          </p>
        </Reveal>

        <ul className="gallery">
          {ITEMS.map((item, i) => (
            <Reveal as="li" key={item.key} className={`gallery__item${item.wide ? ' gallery__item--wide' : ''}`} delay={(i % 3) * 70}>
              <button
                type="button"
                className="gallery__button"
                onClick={() => setCurrent(i)}
                aria-label={`${item.label}: Bild vergrößern`}
              >
                <img
                  src={item.src}
                  srcSet={item.srcSet}
                  sizes={item.wide ? '(min-width: 768px) 66vw, 100vw' : '(min-width: 768px) 33vw, 50vw'}
                  width={item.width}
                  height={item.height}
                  alt={item.alt}
                  loading="lazy"
                  decoding="async"
                />
                <span className="gallery__caption">
                  {item.label}
                  <Maximize2 size={16} aria-hidden="true" />
                </span>
              </button>
            </Reveal>
          ))}
        </ul>
      </div>

      {current !== null && (
        <Lightbox
          items={ITEMS}
          index={current}
          onIndexChange={setCurrent}
          onClose={() => setCurrent(null)}
        />
      )}
    </section>
  );
}
