import LegalLayout from './LegalLayout.jsx';
import { SITE } from '../data/site.js';

export default function ImpressumPage() {
  return (
    <LegalLayout title="Impressum">
      <h2>Angaben gemäß § 5 DDG</h2>
      <p>
        {SITE.name}
        <br />
        Inhaber: Nertil Hoxhaj
        <br />
        Hirschbachstraße 20
        <br />
        85414 Kirchdorf an der Amper
      </p>

      <h2>Kontakt</h2>
      <p>
        E-Mail: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
        <br />
        WhatsApp / Mobil: {SITE.whatsappDisplay}
      </p>

      <h2>Steuerliche Angaben</h2>
      <p>Umsatzsteuer: 115/231/01317</p>

      <h2>Eintragungen und berufsrechtliche Angaben</h2>
      <p>7248294-0 – HWK München und Oberbayern</p>

      <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
      <p>
        Nertil Hoxhaj
        <br />
        Hirschbachstraße 20
        <br />
        85414 Kirchdorf an der Amper
      </p>

      <h2>Verbraucherstreitbeilegung</h2>
    </LegalLayout>
  );
}
