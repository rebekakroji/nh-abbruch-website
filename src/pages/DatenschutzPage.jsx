import LegalLayout, { Placeholder } from './LegalLayout.jsx';
import { SITE } from '../data/site.js';

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

      <h2>3. Cookies, Tracking und Schriftarten</h2>
      <p>
        Diese Website setzt keine Cookies und verwendet keine Analyse- oder Tracking-Werkzeuge. Die verwendeten
        Schriftarten (Montserrat und Inter) werden lokal von unserem Webspace geladen; es wird dafür keine Verbindung
        zu Servern von Google oder anderen Dritten aufgebaut.
      </p>

      <h2>4. Kontaktaufnahme</h2>
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

      <h2>5. Speicherdauer</h2>
      <p>
        Wir speichern Ihre Anfragedaten nur so lange, wie es für die Bearbeitung Ihrer Anfrage erforderlich ist bzw.
        gesetzliche Aufbewahrungsfristen bestehen. <Placeholder>Konkrete Löschfristen festlegen</Placeholder>
      </p>

      <h2>6. Ihre Rechte</h2>
      <p>
        Sie haben das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung der
        Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) sowie Widerspruch (Art. 21 DSGVO). Zudem haben Sie das
        Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren, z. B. beim Bayerischen Landesamt für
        Datenschutzaufsicht (BayLDA). <Placeholder>Zuständige Aufsichtsbehörde prüfen und ggf. Kontaktdaten ergänzen</Placeholder>
      </p>

      <h2>7. Aktualität</h2>
      <p>
        Stand: <Placeholder>Datum der Veröffentlichung</Placeholder>. Wir passen diese Erklärung an, wenn sich die
        Website oder die rechtlichen Vorgaben ändern.
      </p>
    </LegalLayout>
  );
}
