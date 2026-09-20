export const BASE = import.meta.env.BASE_URL;

export const SITE = {
  name: 'NH Abbruch & Renovierung',
  city: 'Freising',
  radius: 'ca. 100 km',
  email: 'nhrenovierung@gmail.com',
  whatsappDisplay: '+49 178 6799969',
  whatsappUrl: 'https://wa.me/491786799969',
  domain: 'https://nhabbruch.de',
};

// Optionaler Endpunkt eines Formular-Dienstes (z. B. Formspree). Wird beim Build über
// die Umgebungsvariable VITE_FORM_ENDPOINT gesetzt – siehe README.
export const FORM_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT || '';

export const NAV = [
  { id: 'start', label: 'Startseite' },
  { id: 'leistungen', label: 'Leistungen' },
  { id: 'ueber-uns', label: 'Über uns' },
  { id: 'referenzen', label: 'Referenzen' },
  { id: 'einsatzgebiet', label: 'Einsatzgebiet' },
  { id: 'kontakt', label: 'Kontakt' },
];

export const CTA_LABEL = 'Kostenloses Angebot anfragen';
