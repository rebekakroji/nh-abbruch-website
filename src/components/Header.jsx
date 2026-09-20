import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from './Logo.jsx';
import { BASE, CTA_LABEL, NAV, SITE } from '../data/site.js';

export default function Header({ isHome = true }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('start');

  const href = (id) => (isHome ? `#${id}` : `${BASE}#${id}`);

  // Aktiven Menüpunkt beim Scrollen hervorheben
  useEffect(() => {
    if (!isHome || !('IntersectionObserver' in window)) return undefined;
    const sections = NAV.map((n) => document.getElementById(n.id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [isHome]);

  // Menü mit Escape schließen
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className="site-header">
      <div className="container site-header__bar">
        <a className="site-header__logo" href={href('start')} onClick={close} aria-label={`${SITE.name} – zur Startseite`}>
          <Logo priority />
        </a>

        <nav
          id="hauptnavigation"
          className={`site-nav${open ? ' is-open' : ''}`}
          aria-label="Hauptnavigation"
        >
          <ul className="site-nav__list">
            {NAV.map((item) => (
              <li key={item.id}>
                <a
                  href={href(item.id)}
                  onClick={close}
                  className={`site-nav__link${isHome && active === item.id ? ' is-active' : ''}`}
                  aria-current={isHome && active === item.id ? 'true' : undefined}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a className="btn btn--primary site-nav__cta" href={href('kontakt')} onClick={close}>
            {CTA_LABEL}
          </a>
        </nav>

        <button
          type="button"
          className="site-header__toggle"
          aria-expanded={open}
          aria-controls="hauptnavigation"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={26} aria-hidden="true" /> : <Menu size={26} aria-hidden="true" />}
          <span className="visually-hidden">{open ? 'Menü schließen' : 'Menü öffnen'}</span>
        </button>
      </div>
    </header>
  );
}
