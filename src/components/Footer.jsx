import Logo from './Logo.jsx';
import WhatsAppIcon from './WhatsAppIcon.jsx';
import { BASE, NAV, SITE } from '../data/site.js';
import { openConsentSettings } from '../consent/consentStore.js';

export default function Footer({ isHome = true }) {
  const href = (id) => (isHome ? `#${id}` : `${BASE}#${id}`);

  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div className="site-footer__brand">
          <a className="site-footer__logo" href={href('start')} aria-label={`${SITE.name} – nach oben`}>
            <Logo />
          </a>
          <p>
            {SITE.name} – Innenabbruch, Demontage, Rückbau und Entrümpelung in {SITE.city} und im Umkreis von{' '}
            {SITE.radius}.
          </p>
        </div>

        <nav aria-label="Footer-Navigation">
          <h2 className="site-footer__heading">Navigation</h2>
          <ul>
            {NAV.map((item) => (
              <li key={item.id}>
                <a href={href(item.id)}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="site-footer__heading">Kontakt</h2>
          <ul>
            <li>
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </li>
            <li>
              <a className="site-footer__wa" href={SITE.whatsappUrl} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon size={16} />
                WhatsApp: {SITE.whatsappDisplay}
              </a>
            </li>
            <li>{SITE.city}, Deutschland</li>
          </ul>
        </div>

        <nav aria-label="Rechtliches">
          <h2 className="site-footer__heading">Rechtliches</h2>
          <ul>
            <li>
              <a href={`${BASE}impressum.html`}>Impressum</a>
            </li>
            <li>
              <a href={`${BASE}datenschutz.html`}>Datenschutzerklärung</a>
            </li>
            <li>
              <button type="button" className="site-footer__link-button" onClick={openConsentSettings}>
                Datenschutz-Einstellungen
              </button>
            </li>
          </ul>
        </nav>
      </div>

      <div className="site-footer__bottom">
        <div className="container">
          <p>© {new Date().getFullYear()} {SITE.name}. Alle Rechte vorbehalten.</p>
        </div>
      </div>
    </footer>
  );
}
