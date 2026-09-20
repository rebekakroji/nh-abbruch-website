import LegalLayout, { Placeholder } from './LegalLayout.jsx';
import { SITE } from '../data/site.js';

export default function ImpressumPage() {
  return (
    <LegalLayout title="Impressum">
      <h2>Angaben gemäß § 5 DDG</h2>
      <p>
        {SITE.name}
        <br />
        <Placeholder>Vollständiger Name des Inhabers bzw. Rechtsform und Vertretungsberechtigte</Placeholder>
        <br />
        <Placeholder>Straße und Hausnummer</Placeholder>
        <br />
        <Placeholder>PLZ</Placeholder> Freising
      </p>

      <h2>Kontakt</h2>
      <p>
        E-Mail: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
        <br />
        WhatsApp / Mobil: {SITE.whatsappDisplay}
        <br />
        <Placeholder>Weitere Telefonnummer, falls vorhanden</Placeholder>
      </p>

      <h2>Umsatzsteuer</h2>
      <p>
        <Placeholder>Umsatzsteuer-Identifikationsnummer nach § 27a UStG, falls vorhanden – oder Hinweis auf Kleinunternehmerregelung nach § 19 UStG</Placeholder>
      </p>

      <h2>Eintragungen und berufsrechtliche Angaben</h2>
      <p>
        <Placeholder>Handelsregister/Registernummer, zuständige Handwerkskammer bzw. Gewerbeanmeldung und weitere Pflichtangaben – nur falls zutreffend</Placeholder>
      </p>

      <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
      <p>
        <Placeholder>Name und Anschrift der verantwortlichen Person</Placeholder>
      </p>

      <h2>Verbraucherstreitbeilegung</h2>
      <p>
        <Placeholder>Erklärung zur Teilnahme oder Nichtteilnahme an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle – bitte prüfen lassen</Placeholder>
      </p>
    </LegalLayout>
  );
}
