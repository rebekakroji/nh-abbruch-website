import { MapPin, Route, FileText } from 'lucide-react';
import Reveal from './Reveal.jsx';
import { CTA_LABEL } from '../data/site.js';

export default function ServiceArea() {
  return (
    <section id="einsatzgebiet" className="section section--warm" aria-labelledby="einsatzgebiet-title">
      <div className="container area">
        <Reveal className="area__body">
          <p className="eyebrow">Einsatzgebiet</p>
          <h2 id="einsatzgebiet-title">Für Sie im Einsatz: Freising und Umgebung</h2>
          <p className="section__lead">Wir sind in Freising und im Umkreis von ca. 100 km für Sie im Einsatz.</p>
          <ul className="area__facts">
            <li>
              <MapPin size={20} strokeWidth={1.75} aria-hidden="true" />
              <span>
                <strong>Standort:</strong> Freising
              </span>
            </li>
            <li>
              <Route size={20} strokeWidth={1.75} aria-hidden="true" />
              <span>
                <strong>Umkreis:</strong> ca. 100 km
              </span>
            </li>
            <li>
              <FileText size={20} strokeWidth={1.75} aria-hidden="true" />
              <span>
                <strong>Angebot:</strong> kostenlos anfragen
              </span>
            </li>
          </ul>
          <p>
            Liegt Ihr Objekt am Rand unseres Einsatzgebiets oder etwas darüber hinaus? Fragen Sie uns einfach an – wir
            prüfen gerne, ob wir Ihr Projekt übernehmen können.
          </p>
          <a className="btn btn--primary" href="#kontakt">
            {CTA_LABEL}
          </a>
        </Reveal>

        <Reveal className="area__visual" delay={100}>
          <svg
            viewBox="0 0 400 400"
            role="img"
            aria-label="Schema des Einsatzgebiets: Freising im Zentrum, Einsatzradius von ca. 100 Kilometern"
          >
            <circle cx="200" cy="200" r="180" className="area__ring area__ring--outer" />
            <circle cx="200" cy="200" r="120" className="area__ring" />
            <circle cx="200" cy="200" r="60" className="area__ring" />
            <line x1="200" y1="200" x2="327" y2="73" className="area__radius" />
            <circle cx="200" cy="200" r="14" className="area__dot-halo" />
            <circle cx="200" cy="200" r="7" className="area__dot" />
            <text x="200" y="236" textAnchor="middle" className="area__label">
              Freising
            </text>
            <g transform="translate(276 128) rotate(-45)">
              <rect x="-42" y="-14" width="84" height="26" rx="3" className="area__tag" />
              <text x="0" y="4" textAnchor="middle" className="area__tag-text">
                ca. 100 km
              </text>
            </g>
          </svg>
          <p className="area__note">Schematische Darstellung, keine Karte.</p>
        </Reveal>
      </div>
    </section>
  );
}
