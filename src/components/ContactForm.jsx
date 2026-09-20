import { useEffect, useState } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { BASE, FORM_ENDPOINT, SITE } from '../data/site.js';
import { SERVICE_OPTIONS } from '../data/services.js';

const EMPTY = { name: '', email: '', phone: '', service: '', message: '', consent: false };

// Versand:
//  - Ist VITE_FORM_ENDPOINT gesetzt (z. B. Formspree), wird die Anfrage per fetch dorthin gesendet.
//  - Andernfalls wird das E-Mail-Programm mit vorausgefüllter Nachricht geöffnet (mailto:).
// In beiden Fällen wird dem Nutzer ehrlich angezeigt, was passiert ist.
export default function ContactForm({ preselectedService }) {
  const [values, setValues] = useState(EMPTY);
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  useEffect(() => {
    if (preselectedService) setValues((v) => ({ ...v, service: preselectedService }));
  }, [preselectedService]);

  const update = (e) => {
    const { name, type, checked, value } = e.target;
    setValues((v) => ({ ...v, [name]: type === 'checkbox' ? checked : value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;
    // Honeypot: Bots füllen dieses versteckte Feld aus
    if (new FormData(form).get('_gotcha')) return;

    const subject = `Anfrage über nhabbruch.de${values.service ? `: ${values.service}` : ''}`;

    if (FORM_ENDPOINT) {
      setStatus({ state: 'sending', message: 'Ihre Anfrage wird gesendet …' });
      try {
        const res = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: values.name,
            email: values.email,
            phone: values.phone,
            service: values.service,
            message: values.message,
            _subject: subject,
          }),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        setValues(EMPTY);
        setStatus({
          state: 'success',
          message: 'Vielen Dank! Ihre Anfrage wurde gesendet. Wir melden uns so schnell wie möglich bei Ihnen.',
        });
      } catch {
        setStatus({
          state: 'error',
          message: `Das Senden hat leider nicht geklappt. Bitte schreiben Sie uns direkt an ${SITE.email} oder per WhatsApp.`,
        });
      }
      return;
    }

    const body = [
      `Name: ${values.name}`,
      `E-Mail: ${values.email}`,
      `Telefon: ${values.phone || '–'}`,
      `Leistung: ${values.service || '–'}`,
      '',
      values.message,
    ].join('\n');
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus({
      state: 'mailto',
      message: `Ihr E-Mail-Programm wurde mit Ihrer Anfrage geöffnet. Bitte senden Sie die Nachricht dort ab. Falls sich nichts öffnet, schreiben Sie uns direkt an ${SITE.email}.`,
    });
  };

  const busy = status.state === 'sending';

  return (
    <form className="form" onSubmit={submit} aria-describedby="form-status">
      <div className="form__row">
        <div className="field">
          <label htmlFor="cf-name">Name *</label>
          <input id="cf-name" name="name" type="text" autoComplete="name" required value={values.name} onChange={update} />
        </div>
        <div className="field">
          <label htmlFor="cf-email">E-Mail *</label>
          <input id="cf-email" name="email" type="email" autoComplete="email" required value={values.email} onChange={update} />
        </div>
      </div>

      <div className="form__row">
        <div className="field">
          <label htmlFor="cf-phone">
            Telefon <span className="field__optional">(optional)</span>
          </label>
          <input id="cf-phone" name="phone" type="tel" autoComplete="tel" value={values.phone} onChange={update} />
        </div>
        <div className="field">
          <label htmlFor="cf-service">Gewünschte Leistung *</label>
          <select id="cf-service" name="service" required value={values.service} onChange={update}>
            <option value="" disabled>
              Bitte auswählen
            </option>
            {SERVICE_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="field">
        <label htmlFor="cf-message">Ihre Nachricht *</label>
        <textarea
          id="cf-message"
          name="message"
          rows={5}
          required
          placeholder="Worum geht es? Z. B. Objekt, Ort, gewünschter Zeitraum."
          value={values.message}
          onChange={update}
        />
      </div>

      {/* Honeypot gegen Spam-Bots, für Menschen unsichtbar */}
      <div className="form__hp" aria-hidden="true">
        <label htmlFor="cf-hp">Bitte leer lassen</label>
        <input id="cf-hp" name="_gotcha" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="field field--check">
        <input id="cf-consent" name="consent" type="checkbox" required checked={values.consent} onChange={update} />
        <label htmlFor="cf-consent">
          Ich habe die <a href={`${BASE}datenschutz.html`}>Datenschutzerklärung</a> gelesen und bin damit einverstanden,
          dass meine Angaben zur Bearbeitung meiner Anfrage verwendet werden. *
        </label>
      </div>

      <button type="submit" className="btn btn--primary btn--lg form__submit" disabled={busy}>
        <Send size={18} aria-hidden="true" />
        {busy ? 'Wird gesendet …' : 'Anfrage senden'}
      </button>

      <div id="form-status" className={`form__status form__status--${status.state}`} role="status" aria-live="polite">
        {status.message && (
          <>
            {status.state === 'error' ? (
              <AlertCircle size={18} aria-hidden="true" />
            ) : (
              <CheckCircle2 size={18} aria-hidden="true" />
            )}
            <span>{status.message}</span>
          </>
        )}
      </div>
    </form>
  );
}
