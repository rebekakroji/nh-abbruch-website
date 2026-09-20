import { ArrowRight } from 'lucide-react';
import Reveal from './Reveal.jsx';
import { SERVICES } from '../data/services.js';

export default function Services({ onSelectService }) {
  return (
    <section id="leistungen" className="section section--warm" aria-labelledby="leistungen-title">
      <div className="container">
        <Reveal className="section__head">
          <p className="eyebrow">Leistungen</p>
          <h2 id="leistungen-title">Abbruch, Demontage und Rückbau aus einer Hand</h2>
          <p className="section__lead">
            Von der Entrümpelung bis zum Innenabbruch: Wir bereiten Ihre Räume so vor, dass die nächsten Arbeitsschritte
            sofort beginnen können.
          </p>
        </Reveal>

        <ul className="services-grid">
          {SERVICES.map(({ title, text, icon: Icon }, i) => (
            <Reveal as="li" key={title} className="service-card" delay={(i % 3) * 70}>
              <span className="service-card__icon">
                <Icon size={24} strokeWidth={1.75} aria-hidden="true" />
              </span>
              <h3 className="service-card__title">{title}</h3>
              <p className="service-card__text">{text}</p>
              <a
                className="service-card__link"
                href="#kontakt"
                onClick={() => onSelectService?.(title)}
                aria-label={`${title} anfragen`}
              >
                Anfragen
                <ArrowRight size={16} aria-hidden="true" />
              </a>
            </Reveal>
          ))}

          <Reveal as="li" className="service-card service-card--cta">
            <h3 className="service-card__title">Ihr Vorhaben ist nicht dabei?</h3>
            <p className="service-card__text">
              Beschreiben Sie uns kurz, worum es geht – wir sagen Ihnen gerne, ob und wie wir Sie unterstützen können.
            </p>
            <a className="btn btn--primary" href="#kontakt" onClick={() => onSelectService?.('Sonstiges')}>
              Jetzt Angebot anfragen
            </a>
          </Reveal>
        </ul>
      </div>
    </section>
  );
}
