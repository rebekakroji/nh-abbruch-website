import { ArrowRight, MapPin } from 'lucide-react';
import { ALT, photo } from '../data/images.js';
import { CTA_LABEL, SITE } from '../data/site.js';

const hero = photo('rueckbau');

export default function Hero() {
  return (
    <section id="start" className="hero" aria-labelledby="hero-title">
      <img
        className="hero__img"
        src={hero.src}
        srcSet={hero.srcSet}
        sizes="100vw"
        width={hero.width}
        height={hero.height}
        alt={ALT.rueckbau}
        fetchPriority="high"
        decoding="async"
      />
      <div className="hero__overlay" aria-hidden="true" />
      <div className="container hero__content">
        <p className="hero__eyebrow">
          <MapPin size={16} aria-hidden="true" />
          {SITE.city} und Umgebung · {SITE.radius}
        </p>
        <h1 id="hero-title" className="hero__title">
          Abbruch &amp; Renovierung mit Kompetenz und Präzision
        </h1>
        <p className="hero__lead">
          Ihr zuverlässiger Partner für Innenabbruch, Demontage und Renovierungsvorbereitung in Freising und Umgebung.
        </p>
        <div className="hero__actions">
          <a className="btn btn--primary btn--lg" href="#kontakt">
            {CTA_LABEL}
          </a>
          <a className="btn btn--outline-light btn--lg" href="#leistungen">
            Unsere Leistungen entdecken
            <ArrowRight size={18} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
