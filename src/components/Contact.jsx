import { Mail, MapPin } from 'lucide-react';
import Reveal from './Reveal.jsx';
import ContactForm from './ContactForm.jsx';
import WhatsAppIcon from './WhatsAppIcon.jsx';
import { SITE } from '../data/site.js';

export default function Contact({ selectedService }) {
  return (
    <section id="kontakt" className="section section--navy" aria-labelledby="kontakt-title">
      <div className="container contact">
        <Reveal className="contact__info">
          <p className="eyebrow eyebrow--light">Kontakt</p>
          <h2 id="kontakt-title">Kostenloses Angebot anfragen</h2>
          <p className="contact__lead">
            Schildern Sie uns kurz Ihr Vorhaben. Am schnellsten erreichen Sie uns per WhatsApp oder E-Mail.
          </p>

          <a className="btn btn--primary btn--lg contact__whatsapp" href={SITE.whatsappUrl} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon size={22} />
            Per WhatsApp schreiben
          </a>

          <ul className="contact__list">
            <li>
              <WhatsAppIcon size={22} />
              <div>
                <p className="contact__label">WhatsApp</p>
                <a href={SITE.whatsappUrl} target="_blank" rel="noopener noreferrer">
                  {SITE.whatsappDisplay}
                </a>
              </div>
            </li>
            <li>
              <Mail size={22} strokeWidth={1.75} aria-hidden="true" />
              <div>
                <p className="contact__label">E-Mail</p>
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              </div>
            </li>
            <li>
              <MapPin size={22} strokeWidth={1.75} aria-hidden="true" />
              <div>
                <p className="contact__label">Standort</p>
                <p>
                  {SITE.city}, Deutschland
                  <br />
                  <span className="contact__muted">Einsatzgebiet: Umkreis {SITE.radius}</span>
                </p>
              </div>
            </li>
          </ul>
        </Reveal>

        <Reveal className="contact__panel" delay={100}>
          <h3>Anfrage senden</h3>
          <p className="contact__panel-hint">Felder mit * sind Pflichtfelder.</p>
          <ContactForm preselectedService={selectedService} />
        </Reveal>
      </div>
    </section>
  );
}
