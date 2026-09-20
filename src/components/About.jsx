import { ShieldCheck, ListChecks, MessageCircle, ClipboardList } from 'lucide-react';
import Reveal from './Reveal.jsx';
import { ALT, photo } from '../data/images.js';

const img = photo('trennwand-entfernen');

const VALUES = [
  { icon: ShieldCheck, title: 'Zuverlässig', text: 'Absprachen, auf die Sie sich verlassen können.' },
  { icon: ListChecks, title: 'Sauber & strukturiert', text: 'Ordentliche Abläufe von der ersten bis zur letzten Minute.' },
  { icon: MessageCircle, title: 'Klare Kommunikation', text: 'Direkter Kontakt per WhatsApp oder E-Mail.' },
  { icon: ClipboardList, title: 'Sorgfältige Planung', text: 'Wir klären Umfang und Ablauf, bevor es losgeht.' },
];

export default function About() {
  return (
    <section id="ueber-uns" className="section section--white" aria-labelledby="ueber-uns-title">
      <div className="container about">
        <Reveal className="about__media">
          <img
            src={img.src}
            srcSet={img.srcSet}
            sizes="(min-width: 900px) 40vw, 100vw"
            width={img.width}
            height={img.height}
            alt={ALT['trennwand-entfernen']}
            loading="lazy"
            decoding="async"
          />
        </Reveal>

        <div className="about__body">
          <Reveal>
            <p className="eyebrow">Über uns</p>
            <h2 id="ueber-uns-title">Sorgfältig geplant. Sauber ausgeführt.</h2>
            <p>
              NH Abbruch &amp; Renovierung ist Ihr Ansprechpartner für Abbruch-, Demontage- und Rückbauarbeiten im
              Innenbereich. Wir sind in Freising zuhause und im Umkreis von ca. 100 km für Sie im Einsatz.
            </p>
            <p>
              Uns ist wichtig, dass Sie von der Anfrage bis zur fertigen Arbeit gut aufgehoben sind: mit einem festen
              Ansprechpartner, verständlichen Absprachen und einer Ausführung, die Ihre Räume für den nächsten
              Arbeitsschritt sauber übergibt.
            </p>
          </Reveal>

          <ul className="about__values">
            {VALUES.map(({ icon: Icon, title, text }, i) => (
              <Reveal as="li" key={title} className="about__value" delay={i * 70}>
                <Icon size={22} strokeWidth={1.75} aria-hidden="true" />
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
