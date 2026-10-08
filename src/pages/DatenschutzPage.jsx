import LegalLayout, { Placeholder } from './LegalLayout.jsx';
import { SITE } from '../data/site.js';
import { openConsentSettings } from '../consent/consentStore.js';

export default function DatenschutzPage() {
  return (
    <LegalLayout title="Datenschutzerklärung">
      <h2>1. Verantwortlicher</h2>
      <p>
        Verantwortlich für die Datenverarbeitung auf dieser Website ist:
        <br />
        {SITE.name}
        <br />
        <Placeholder>Name des Inhabers, Straße, PLZ</Placeholder> Freising
        <br />
        E-Mail: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
      </p>

      <h2>2. Hosting über GitHub Pages</h2>
      <p>
        Diese Website wird über GitHub Pages bereitgestellt (Anbieter: GitHub Inc. bzw. Microsoft, USA). Beim Aufruf
        der Seite werden technisch notwendige Daten, insbesondere Ihre IP-Adresse, Datum und Uhrzeit, die aufgerufene
        Seite sowie Browserinformationen, verarbeitet, um die Website auszuliefern und die Sicherheit zu gewährleisten.
        Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer sicheren und effizienten
        Bereitstellung des Angebots).
      </p>
      <p>
        <Placeholder>Angaben zur Übermittlung in Drittländer (USA), zu Standardvertragsklauseln bzw. Zertifizierung nach dem EU-US Data Privacy Framework – bitte rechtlich prüfen lassen</Placeholder>
      </p>

      <h2>3. Cookies und Ihre Einwilligung</h2>
      <p>
        Diese Website verwendet technisch notwendige Cookies bzw. lokale Speicherung sowie – nur mit Ihrer
        Einwilligung – Cookies und vergleichbare Technologien für Statistik und Marketing. Beim ersten Besuch werden
        Sie dazu über einen Cookie-Banner gefragt.
      </p>
      <ul>
        <li>
          <strong>Notwendig</strong> (keine Einwilligung erforderlich, Rechtsgrundlage § 25 Abs. 2 Nr. 2 TTDSG): Ihre
          getroffene Cookie-Auswahl wird in Ihrem Browser (lokaler Speicher, „localStorage“) gespeichert, damit sie
          bei weiteren Seitenaufrufen nicht erneut abgefragt werden muss.
        </li>
        <li>
          <strong>Statistik</strong> (nur mit Einwilligung): Google Analytics 4 – siehe Abschnitt 4.
        </li>
        <li>
          <strong>Marketing</strong> (nur mit Einwilligung): Google Ads zur Erfolgsmessung von Anzeigen – siehe
          Abschnitt 4.
        </li>
      </ul>
      <p>
        Die verwendeten Schriftarten (Montserrat und Inter) werden lokal von unserem Webspace geladen; es wird dafür
        keine Verbindung zu Servern von Google oder anderen Dritten aufgebaut.
      </p>
      <p>
        Sie können Ihre Auswahl jederzeit mit Wirkung für die Zukunft ändern oder widerrufen: über{' '}
        <button type="button" className="legal__inline-button" onClick={openConsentSettings}>
          Datenschutz-Einstellungen
        </button>{' '}
        (auch im Footer dieser Seite verlinkt).
      </p>

      <h2>4. Google Analytics 4 und Google Ads</h2>
      <p>
        Nur wenn Sie im Cookie-Banner der Kategorie „Statistik“ zustimmen, binden wir Google Analytics 4 ein, einen
        Webanalysedienst der Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland
        („Google“). Verantwortlich für die Verarbeitung durch Google LLC, 1600 Amphitheatre Parkway, Mountain View,
        CA 94043, USA, ist nach Angaben von Google deren irische Niederlassung für Nutzer aus der EU/dem EWR.{' '}
        <Placeholder>
          Genaue Verantwortlichkeits-/Auftragsverarbeitungssituation anhand der aktuellen Google-Analytics-Bedingungen
          und der eigenen GA4-Property-Einstellungen rechtlich prüfen und hier konkretisieren
        </Placeholder>
      </p>
      <p>
        Stimmen Sie zusätzlich der Kategorie „Marketing“ zu, dürfen die gleichen bzw. vergleichbare Technologien auch
        für Google Ads genutzt werden, um die Wirksamkeit von Anzeigen zu messen (Conversion-Messung, ggf.
        Remarketing). <Placeholder>Sobald ein konkretes Google-Ads-Conversion-Tag eingerichtet ist, hier Zweck, Anbieter und Funktionsweise (z. B. Remarketing-Zielgruppen) ergänzen</Placeholder>
      </p>
      <p>
        <strong>Zweck:</strong> Analyse der Websitenutzung (z. B. aufgerufene Seiten, Verweildauer, ungefähre
        Herkunft auf Stadt-/Regionsebene, verwendetes Gerät/Browser) zur Reichweitenmessung und Verbesserung der
        Website sowie – bei Einwilligung in „Marketing“ – zur Erfolgsmessung von Werbeanzeigen.
      </p>
      <p>
        <strong>Rechtsgrundlage:</strong> Ihre Einwilligung (Art. 6 Abs. 1 lit. a DSGVO i. V. m. § 25 Abs. 1 TTDSG).
        Die Einwilligung ist freiwillig und kann jederzeit mit Wirkung für die Zukunft über die
        Datenschutz-Einstellungen widerrufen werden. Bis zu Ihrer Einwilligung werden alle hierfür relevanten
        Google-Consent-Signale (Google Consent Mode) technisch auf „abgelehnt“ gesetzt; es wird keine Verbindung zu
        Google-Analytics-/Google-Ads-Servern aufgebaut und kein entsprechendes Cookie gesetzt, bevor Sie zugestimmt
        haben.
      </p>
      <p>
        <strong>Kategorien verarbeiteter Daten (nach Einwilligung):</strong> IP-Adresse (wird von Google nicht in
        voller Länge gespeichert), pseudonyme Kennungen (z. B. Client-/Cookie-ID), Geräte- und Browserinformationen,
        aufgerufene Seiten und Interaktionen, Verweildauer, ungefährer Standort auf Stadt-/Regionsebene.{' '}
        <Placeholder>
          Prüfen und ergänzen, ob in der GA4-Property zusätzliche Funktionen aktiviert sind (z. B. Google Signals,
          erweiterte Conversion-Messung, verknüpfte Google-Ads-Konten) – das ändert die verarbeiteten Datenkategorien
        </Placeholder>
      </p>
      <p>
        <strong>Speicherdauer:</strong> Ihre Cookie-Auswahl selbst bleibt in Ihrem Browser gespeichert, bis Sie sie
        ändern oder Ihre Browserdaten löschen. Wie lange Google die über Google Analytics/Google Ads erhobenen Daten
        serverseitig speichert, legen die Kontoeinstellungen des Google-Analytics-Kontos fest.{' '}
        <Placeholder>Tatsächlich eingestellte Aufbewahrungsdauer im GA4-Konto prüfen (Standardoptionen laut Google: 2 oder 14 Monate) und hier eintragen</Placeholder>
      </p>
      <p>
        <strong>Übermittlung in Drittländer:</strong> Google verarbeitet Daten auch in den USA. Google gibt an, nach
        dem EU-U.S. Data Privacy Framework zertifiziert zu sein.{' '}
        <Placeholder>Aktuellen Zertifizierungsstatus und ggf. zusätzliche Garantien (Standardvertragsklauseln) rechtlich prüfen</Placeholder>
      </p>
      <p>
        <strong>Widerspruch/Opt-out:</strong> Sie können Ihre Einwilligung jederzeit über die{' '}
        <button type="button" className="legal__inline-button" onClick={openConsentSettings}>
          Datenschutz-Einstellungen
        </button>{' '}
        widerrufen. Unabhängig davon bietet Google ein Browser-Add-on zur Deaktivierung von Google Analytics an:{' '}
        <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">
          tools.google.com/dlpage/gaoptout
        </a>
        .
      </p>

      <h2>5. Kontaktaufnahme</h2>
      <h3>Kontaktformular</h3>
      <p>
        Wenn Sie uns über das Kontaktformular eine Anfrage senden, verarbeiten wir Ihre Angaben (Name, E-Mail-Adresse,
        optional Telefonnummer, gewünschte Leistung, Nachricht) ausschließlich zur Bearbeitung Ihrer Anfrage.
        Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen) bzw. Art. 6 Abs. 1 lit. f DSGVO.
      </p>
      <p>
        <Placeholder>Hier den tatsächlich genutzten Versandweg beschreiben: entweder Versand über das E-Mail-Programm des Nutzers (mailto) oder Name, Sitz und Datenschutzhinweise des eingesetzten Formular-Dienstes (z. B. Formspree) inkl. Auftragsverarbeitungsvertrag</Placeholder>
      </p>
      <h3>E-Mail und WhatsApp</h3>
      <p>
        Wenn Sie uns per E-Mail schreiben oder den WhatsApp-Link nutzen, verarbeiten wir die von Ihnen übermittelten
        Angaben zur Bearbeitung Ihrer Anfrage. Beim Öffnen von WhatsApp gelten die Datenschutzbestimmungen des
        Anbieters (WhatsApp Ireland Limited / Meta). Auf unserer Website wird keine Verbindung zu WhatsApp
        hergestellt, solange Sie den Link nicht anklicken.
      </p>

      <h2>6. Speicherdauer</h2>
      <p>
        Wir speichern Ihre Anfragedaten nur so lange, wie es für die Bearbeitung Ihrer Anfrage erforderlich ist bzw.
        gesetzliche Aufbewahrungsfristen bestehen. <Placeholder>Konkrete Löschfristen festlegen</Placeholder> Zur
        Speicherdauer von Google Analytics/Google Ads siehe Abschnitt 4.
      </p>

      <h2>7. Ihre Rechte</h2>
      <p>
        Sie haben das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung der
        Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) sowie Widerspruch (Art. 21 DSGVO). Soweit eine
        Verarbeitung auf Ihrer Einwilligung beruht (z. B. Google Analytics, Google Ads), können Sie diese jederzeit
        mit Wirkung für die Zukunft widerrufen, siehe Abschnitt 3. Zudem haben Sie das Recht, sich bei einer
        Datenschutz-Aufsichtsbehörde zu beschweren, z. B. beim Bayerischen Landesamt für Datenschutzaufsicht (BayLDA).{' '}
        <Placeholder>Zuständige Aufsichtsbehörde prüfen und ggf. Kontaktdaten ergänzen</Placeholder>
      </p>

      <h2>8. Aktualität</h2>
      <p>
        Stand: <Placeholder>Datum der Veröffentlichung</Placeholder>. Wir passen diese Erklärung an, wenn sich die
        Website oder die rechtlichen Vorgaben ändern.
      </p>
    </LegalLayout>
  );
}
