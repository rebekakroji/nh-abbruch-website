import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

export function Placeholder({ children }) {
  return <mark className="placeholder">[BITTE ERGÄNZEN: {children}]</mark>;
}

export default function LegalLayout({ title, children }) {
  return (
    <>
      <a className="skip-link" href="#inhalt">
        Zum Inhalt springen
      </a>
      <Header isHome={false} />
      <main id="inhalt">
        <section className="legal-hero">
          <div className="container">
            <h1>{title}</h1>
          </div>
        </section>
        <div className="container legal">
          <div className="legal__notice" role="note">
            <strong>Entwurf mit Platzhaltern – nicht zur Veröffentlichung geeignet.</strong> Gelb markierte Stellen müssen
            mit den echten Angaben ersetzt werden. Der Text ersetzt keine Rechtsberatung und muss vor dem Livegang
            rechtlich geprüft werden. Diesen Hinweis anschließend entfernen.
          </div>
          {children}
        </div>
      </main>
      <Footer isHome={false} />
    </>
  );
}
