import { ShieldCheck, Sparkles, Gauge, MapPin } from 'lucide-react';

// Die ersten drei Werte entsprechen dem Claim im Logo ("Zuverlässig. Sauber. Effizient.").
const ITEMS = [
  { icon: ShieldCheck, title: 'Zuverlässig', text: 'Klare Absprachen und verbindliche Kommunikation.' },
  { icon: Sparkles, title: 'Sauber', text: 'Strukturiertes und ordentliches Arbeiten.' },
  { icon: Gauge, title: 'Effizient', text: 'Durchdachte Planung spart Zeit und Aufwand.' },
  { icon: MapPin, title: 'Freising & Umgebung', text: 'Im Einsatz im Umkreis von ca. 100 km.' },
];

export default function TrustBar() {
  return (
    <section className="trust" aria-label="Unsere Werte">
      <ul className="container trust__list">
        {ITEMS.map(({ icon: Icon, title, text }) => (
          <li key={title} className="trust__item">
            <Icon className="trust__icon" size={26} aria-hidden="true" />
            <div>
              <p className="trust__title">{title}</p>
              <p className="trust__text">{text}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
