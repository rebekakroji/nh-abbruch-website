# NH Abbruch & Renovierung – Website

Website der **NH Abbruch & Renovierung** (Freising) – React + Vite, statisch, für GitHub Pages mit der Domain `nhabbruch.de`.
Das Design folgt [design.md](design.md).

## Projektstruktur

```
index.html, impressum.html, datenschutz.html   Drei Seiten (Vite Multi-Page-Build)
src/
  components/    Header, Hero, Services, About, Gallery (+Lightbox), ServiceArea, Contact(+Form), Footer …
  consent/       gtag.js (Consent Mode + GA4-/Google-Ads-Loader), consentStore.js, ConsentBanner.jsx
  pages/         HomePage, ImpressumPage, DatenschutzPage, LegalLayout
  data/          site.js (Firmendaten), services.js, images.js, images.generated.json, consent.js (Speicherung)
  styles/        base.css (Design-Tokens), header/hero/sections/contact/footer/legal/consent.css
public/
  images/        Optimierte Bilder + Logo + Favicon + og-image (werden von `npm run images` erzeugt)
  CNAME          nhabbruch.de
  robots.txt, sitemap.xml
source-images/   Original-Fotos und Original-Logo (unverändert, Quelle für die Optimierung)
scripts/         optimize-images.mjs
.github/workflows/deploy.yml   Automatischer Deploy nach GitHub Pages
```

## Lokal arbeiten

Voraussetzung: Node.js 20 oder neuer.

```bash
npm install
npm run dev        # Entwicklungsserver
npm run build      # Produktions-Build nach dist/
npm run preview    # Build lokal ansehen (http://localhost:4173)
```

### Bilder

Die Originale liegen in `source-images/`. `npm run images` erzeugt daraus die WebP-Varianten in `public/images/`
(schneidet die schwarzen Balken der Bildschirmaufnahmen ab, entfernt Weißraum um das Logo, erzeugt Favicon und
Open-Graph-Bild) und schreibt `src/data/images.generated.json`. Neue Fotos: Datei nach `source-images/` legen,
in `scripts/optimize-images.mjs` eintragen, Skript ausführen und das Bild in der passenden Komponente einbinden.

Verwendung der Fotos: **Rückbau** (Hero, Galerie), **Trennwand-entfernen** (Über uns), Galerie: Entrümpelung
(Vorher/Nachher), Bodenbeläge, Küchenabbau, Demontage. Die Beschriftungen nennen nur die Leistungskategorie –
es werden keine Projektnamen, Orte oder Kundenangaben behauptet.

## Kontaktformular

Auf statischem Hosting gibt es keinen eigenen Server. Das Formular funktioniert deshalb so:

- **Ohne Konfiguration** öffnet „Anfrage senden“ das E-Mail-Programm des Besuchers mit vorausgefüllter Nachricht
  an `nhrenovierung@gmail.com` (`mailto:`). Die Seite weist den Besucher darauf hin. Das ist ehrlich und
  funktioniert ohne Dienst, setzt aber ein eingerichtetes E-Mail-Programm voraus.
- **Empfohlen:** ein Formular-Dienst, der die Nachricht direkt in Ihr Postfach zustellt, z. B. [Formspree](https://formspree.io):
  1. Auf formspree.io mit `nhrenovierung@gmail.com` ein Konto anlegen und die Bestätigungs-E-Mail bestätigen.
  2. *New Form* anlegen (Name z. B. „Website NH Abbruch“). Als Empfänger `nhrenovierung@gmail.com` eintragen.
  3. Die Formular-URL kopieren (`https://formspree.io/f/xxxxxxxx`). Sie steht im Formular unter *Integration*.
  4. **Lokal testen:** `.env.example` nach `.env` kopieren, die URL eintragen, den Entwicklungsserver neu starten (`Strg+C`, dann `npm run dev`).
  5. **Live schalten:** Im GitHub-Repository *Settings → Secrets and variables → Actions → Variables → New repository variable*:
     Name `VITE_FORM_ENDPOINT`, Wert = die Formular-URL. Danach *Actions → Deploy to GitHub Pages → Run workflow*.

  Die Formular-URL ist öffentlich sichtbar und für diesen Zweck vorgesehen. **Niemals** geheime API-Schlüssel eintragen.
  Beim Build (lokal und in GitHub Actions) erscheint eine Warnung, solange `VITE_FORM_ENDPOINT` fehlt.
  Wenn Sie einen Dienst nutzen, muss die Datenschutzerklärung ihn nennen (Platzhalter in `DatenschutzPage.jsx`).
  Prüfen Sie im Formspree-Dashboard aktuelle Limits und Preise (der kostenlose Tarif hat ein monatliches Kontingent).

### Empfang testen

1. Formular auf der lokalen Seite (`http://localhost:5173/#kontakt`) mit Testdaten ausfüllen und absenden.
   Erwartet: grüne Meldung „Vielen Dank! Ihre Anfrage wurde gesendet …“.
2. Formspree-Dashboard → Formular → Tab *Submissions*: Der Eintrag muss dort erscheinen.
   Bei der ersten Einsendung verlangt Formspree ggf. eine Bestätigung per E-Mail – diese zuerst bestätigen.
3. Im Postfach `nhrenovierung@gmail.com` (auch Spam-Ordner) muss die Mail mit dem Betreff
   „Anfrage über nhabbruch.de: <Leistung>“ ankommen. Absender-Antworten gehen an die im Formular angegebene E-Mail-Adresse.
4. Nach dem Deploy denselben Test auf `https://nhabbruch.de/#kontakt` wiederholen, da nur dort die GitHub-Variable greift.
5. Fehlerfall prüfen: Bei Netzwerk- oder Dienstfehler zeigt das Formular eine rote Meldung mit Verweis auf E-Mail und WhatsApp.

Das Formular enthält ein Honeypot-Feld gegen Spam und eine Pflicht-Checkbox zur Datenschutzerklärung.
Was der Browser sendet (JSON per POST): `name`, `email`, `phone`, `service`, `message`, `_subject`.

## Cookie-Banner, Google Analytics 4 & Google Ads

Die Website zeigt allen Besuchern einen Cookie-Banner (`src/consent/ConsentBanner.jsx`) mit drei Kategorien:
**Notwendig** (immer aktiv), **Statistik** (Google Analytics 4) und **Marketing** (Google Ads). Die Wahl wird im
Browser gespeichert (`localStorage`, siehe `src/data/consent.js`) und gilt seitenübergreifend für `index.html`,
`impressum.html` und `datenschutz.html`, da alle drei denselben `mount.jsx`-Einstiegspunkt verwenden.

**Google Consent Mode v2:** Auf jeder Seite werden beim Laden zuerst alle vier Consent-Signale
(`analytics_storage`, `ad_storage`, `ad_user_data`, `ad_personalization`) auf „denied“ gesetzt
(`src/consent/gtag.js`). Ein gemeinsames `gtag.js`-Skript (`googletagmanager.com/gtag/js`) und ein gemeinsamer
`dataLayer` bedienen sowohl GA4 als auch Google Ads – es wird nie ein zweites Skript nachgeladen. Das Skript wird erst
angefordert, sobald für mindestens eine der beiden Kategorien eingewilligt wurde; GA4 wird aktiviert
(`gtag('config', 'G-…')`), sobald „Statistik“ zugestimmt wurde, Google Ads (`gtag('config', 'AW-…')`) unabhängig
davon, sobald „Marketing“ zugestimmt wurde. Ohne jede Einwilligung wird keine Verbindung zu Google aufgebaut. Stimmt
ein Besucher später zu oder widerruft, wird der Consent-Status per `gtag('consent', 'update', …)` aktualisiert. Ein
Klick auf „Datenschutz-Einstellungen“ (Footer sowie in der Datenschutzerklärung) öffnet den Banner erneut.

Für Google Ads ist nur die Tag-ID (`AW-…`) hinterlegt – keine Conversion-ID/-Label. Damit erkennt Google Ads das Tag
als „verbunden“; es wird aber keine konkrete Conversion-Aktion (z. B. „Kontaktanfrage abgeschickt“) gemeldet. Soll
das ergänzt werden, braucht es die Conversion-ID/-Label aus Google Ads (Tools → Conversions) und einen zusätzlichen
`gtag('event', 'conversion', { send_to: 'AW-…/LABEL' })`-Aufruf an der passenden Stelle (z. B. nach erfolgreichem
Formularversand) – das ist bewusst nicht erfunden/ergänzt worden.

**Einrichtung:**

1. **Lokal:** `.env.example` nach `.env` kopieren (falls noch nicht vorhanden) und
   `VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX` bzw. `VITE_GOOGLE_ADS_ID=AW-XXXXXXXXX` mit den echten IDs eintragen, dann
   `npm run dev` neu starten.
2. **Live:** Im GitHub-Repository unter *Settings → Secrets and variables → Actions → Variables* die Variablen
   `VITE_GA_MEASUREMENT_ID` und `VITE_GOOGLE_ADS_ID` anlegen (gleiches Vorgehen wie bei `VITE_FORM_ENDPOINT`), danach
   *Actions → Deploy to GitHub Pages → Run workflow*. Beide IDs sind nicht geheim (im Browser sichtbar, sobald das
   Tag lädt) – trotzdem niemals andere, tatsächlich geheime Google-API-Schlüssel hier eintragen.

**Build-Absicherung:** `scripts/check-consent.mjs` läuft automatisch bei `npm run build` und bricht den Build ab,
wenn (a) `VITE_GA_MEASUREMENT_ID` bzw. `VITE_GOOGLE_ADS_ID` nicht wie eine gültige ID aussieht, oder (b) im gebauten
Code Google-Tag-Ladecode vorhanden wäre, ohne dass auch alle vier Consent-Mode-„denied“-Standardwerte darin
enthalten sind. So kann die Einwilligungslogik nicht unbemerkt von der Google-Integration getrennt werden.

**Testen:**

1. `npm run dev`, Seite öffnen → Banner erscheint. Im Browser-Netzwerktab prüfen: Es darf **keine** Anfrage an
   `googletagmanager.com` oder `google-analytics.com` stattfinden, solange nichts akzeptiert wurde.
2. Unter „Einstellungen“ nur „Statistik“ aktivieren und speichern → `gtag/js` lädt, GA4 wird konfiguriert, aber es
   erscheint (noch) keine Google-Ads-Anfrage. Im Netzwerktab sollte dafür kein Request mit `AW-18445001437`
   auftauchen.
3. Banner erneut öffnen, zusätzlich „Marketing“ aktivieren und speichern → jetzt wird Google Ads konfiguriert
   (`gtag('config', 'AW-18445001437')`), ohne das Skript ein zweites Mal zu laden.
4. „Alle akzeptieren“ testen → beide Kategorien werden in einem Schritt aktiviert.
5. Seite neu laden → Banner erscheint nicht erneut (Wahl wurde gespeichert), GA4/Ads laden sofort entsprechend der
   gespeicherten Wahl.
6. „Datenschutz-Einstellungen“ im Footer anklicken → Banner öffnet sich erneut mit der zuvor getroffenen Auswahl.
7. „Nur notwendige“ wählen → im Netzwerktab darf danach keine Google-Anfrage mehr stattfinden.

**Google Ads auf der Live-Website verifizieren (nachdem `VITE_GOOGLE_ADS_ID` gesetzt und deployt wurde):**

1. `https://nhabbruch.de/` öffnen, Cookie-Banner mit „Alle akzeptieren“ oder „Marketing“ bestätigen.
2. Browser-Entwicklertools → Netzwerk-Tab → nach `googletagmanager.com/gtag/js` und einem Request an
   `googleadservices.com` bzw. `google.com/ads/…` oder `google.com/pagead/…` filtern – nach der Zustimmung sollte
   ein solcher Request erscheinen.
3. In der Konsole `window.dataLayer` ausgeben – es sollte ein Eintrag `["config", "AW-18445001437"]` enthalten sein.
4. Alternativ die Browser-Erweiterung *Google Tag Assistant* (von Google) auf der Seite ausführen, nachdem der
   Einwilligung zugestimmt wurde; sie zeigt beide Tags (GA4 und Google Ads) als aktiv an.
5. Im Google-Ads-Konto unter *Tools und Einstellungen → Conversion-Tracking* bzw. *Google Tag* prüfen, ob der
   Status von „Nicht verbunden“ auf „Tag ist aktiv“/„Daten werden empfangen“ wechselt – das kann nach dem ersten
   echten Seitenaufruf mit erteilter Einwilligung einige Stunden dauern, bis Google es anzeigt.
6. Ohne Einwilligung (z. B. in einem privaten Fenster, „Nur notwendige“ wählen) darf keiner dieser Requests
   auftauchen – das ist der Beleg, dass Google Ads nicht vor Zustimmung feuert.

## Deployment auf GitHub Pages mit nhabbruch.de

Die Seite ist auf die eigene Domain im Root (`base: '/'`) eingestellt. `public/CNAME` enthält `nhabbruch.de`.

### 1. Repository und Deploy

1. Auf github.com ein neues Repository anlegen und den Projektordner hochladen (Branch `main`).
   `node_modules/` und `dist/` sind per `.gitignore` ausgeschlossen. `source-images/` bitte mit hochladen.
2. Im Repository: *Settings → Pages → Build and deployment → Source: **GitHub Actions***.
3. Ein Push auf `main` startet `.github/workflows/deploy.yml` (Build und Veröffentlichung). Fortschritt unter dem Tab *Actions*.

**Basispfad:** Der Build nutzt einen *relativen* Basispfad (`base: './'` in `vite.config.js`). Dadurch funktioniert derselbe Build
unter `https://nhabbruch.de/` und unter `https://<user>.github.io/<repo>/`; beim Umstellen der Domain ist kein neuer Build mit
anderen Einstellungen nötig. Nach dem Build prüft `scripts/check-dist.mjs`, dass `dist/` keine wurzel-absoluten Pfade
(z. B. `/assets/...`) enthält und alle referenzierten Dateien existieren. Sobald in *Settings → Pages* die eigene Domain gesetzt ist,
leitet GitHub die `github.io`-Projekt-URL automatisch auf `nhabbruch.de` um.

### 2. Domain bei Namecheap verbinden

Namecheap → *Domain List → nhabbruch.de → Manage → Advanced DNS*. Vorhandene Standard-Einträge (z. B. „URL Redirect Record“,
Parking-CNAME) für `@` und `www` löschen und anlegen:

| Typ | Host | Wert |
| --- | --- | --- |
| A Record | `@` | `185.199.108.153` |
| A Record | `@` | `185.199.109.153` |
| A Record | `@` | `185.199.110.153` |
| A Record | `@` | `185.199.111.153` |
| CNAME Record | `www` | `<IHR-GITHUB-BENUTZERNAME>.github.io.` |

Optional für IPv6 vier AAAA-Records für `@`: `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`.
Die Werte entsprechen der GitHub-Dokumentation zu Custom Domains; bitte vor dem Eintragen mit der aktuellen Doku abgleichen.

### 3. Domain in GitHub eintragen und HTTPS aktivieren

1. *Settings → Pages → Custom domain*: `nhabbruch.de` eintragen und speichern (die DNS-Prüfung kann einige Minuten bis Stunden dauern).
2. Sobald die Prüfung grün ist, **Enforce HTTPS** aktivieren (das Zertifikat wird automatisch ausgestellt, das kann bis zu einigen Stunden dauern).
3. Empfohlen: In den GitHub-Kontoeinstellungen unter *Pages* die Domain verifizieren (TXT-Eintrag), damit niemand anderes sie nutzen kann.

## Checkliste – was Sie noch tun müssen

- [ ] **Impressum** (`src/pages/ImpressumPage.jsx`): alle gelb markierten Platzhalter ersetzen (Name/Inhaber, Anschrift, ggf. USt-IdNr., Handwerkskammer/Gewerbeanmeldung, Verantwortlicher nach § 18 MStV, Streitbeilegung).
- [ ] **Datenschutzerklärung** (`src/pages/DatenschutzPage.jsx`): Platzhalter ersetzen, Formular-Variante beschreiben, Drittlandübermittlung (GitHub/USA) prüfen. Beide Rechtstexte von einer fachkundigen Stelle prüfen lassen.
- [ ] Den Hinweis-Kasten „Entwurf mit Platzhaltern“ (`src/pages/LegalLayout.jsx`) nach dem Ausfüllen entfernen.
- [ ] Formular-Dienst einrichten (siehe oben) oder bewusst beim `mailto:`-Verfahren bleiben.
- [ ] `VITE_GA_MEASUREMENT_ID` und `VITE_GOOGLE_ADS_ID` als Repository-Variablen setzen (siehe oben) und den Cookie-Banner/GA4-/Ads-Empfang gemäß „Testen“ prüfen.
- [ ] Datenschutzerklärung, Abschnitt 4 (Google Analytics/Google Ads): verbleibende Platzhalter prüfen, insbesondere Speicherdauer im GA4-Konto und – sobald in Google Ads eine konkrete Conversion-Aktion eingerichtet ist – deren Zweck und Funktionsweise ergänzen.
- [ ] GitHub-Repository anlegen, Pages auf „GitHub Actions“ stellen, DNS bei Namecheap setzen, Custom Domain eintragen, HTTPS aktivieren.
- [ ] Nach dem Livegang: Seite in der Google Search Console anmelden und `https://nhabbruch.de/sitemap.xml` einreichen; Google-Unternehmensprofil pflegen (wichtig für lokale Suche).
- [ ] Optional: weitere echte Fotos und – nur mit Einverständnis der Kunden und mit echten Angaben – Referenzen ergänzen.
- [ ] Inhalte, die ich bewusst nicht erfunden habe und die Sie ergänzen können: Firmengeschichte, Qualifikationen, Zertifikate, Kundenstimmen, Preise, konkrete Ortsliste.

## Hinweise

- Die Texte machen keine Aussagen zu Entsorgung, Versicherung, Festpreisen, Erfahrungsjahren oder Zertifikaten. Was Sie zusätzlich versprechen möchten, bitte selbst ergänzen.
- Schriften (Montserrat, Inter) sind lokal über `@fontsource` eingebunden – keine Verbindung zu Google-Servern.
- Die Website zeigt einen Cookie-Banner und lädt Google Analytics 4 (und vorbereitet: Google Ads) erst nach
  Einwilligung – siehe Abschnitt „Cookie-Banner, Google Analytics 4 & Google Ads“ oben.
